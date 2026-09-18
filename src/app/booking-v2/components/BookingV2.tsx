"use client";

/**
 * Booking v2 — el flujo con agente, aprobado por Cris el 18-sep-2026 (maqueta
 * v9, msgs 22038-22052). Vive en /booking-v2 y NO toca /booking: la idea es
 * medir los dos contra las ventas reales de Stripe antes de reemplazar nada.
 *
 * Reglas del dueño que este flujo respeta (msgs 21672-21686, 22038-22040):
 *  1. El precio NO se muestra antes de elegir tamaño.
 *  2. Los datos de contacto se capturan antes de cerrar (y se guardan en
 *     cuanto se escriben — pendiente el endpoint, ver TODO al final).
 *  3. Dos caminos desde el arranque: "ya sé qué quiero" / "ayúdame a elegir".
 *
 * Y dos correcciones que salieron del Consejo IA del 14-sep:
 *  - La DIRECCIÓN va antes de los datos, para avisar de la zona a tiempo en
 *    vez de dejar que el cliente llene media reserva para nada.
 *  - Las reglas deciden el tamaño, no un modelo: `recommendSize()` es código.
 *
 * Los precios salen de `@/lib/pricing` — la misma tabla que cobra
 * /api/checkout, para que la pantalla no pueda decir otra cosa.
 */

import { useMemo, useState } from "react";
import type { BookingData } from "../../booking/components/BookingWizard";
import DateStep from "../../booking/components/DateStep";
import EmbeddedPayment from "../../booking/components/EmbeddedPayment";
import { isOutsideServiceArea } from "@/lib/service-area";
import {
  EXTRA_DAY_FEE,
  LIST_PREMIUM,
  OVERWEIGHT_PER_TON,
  SIZE_SPECS,
  onlinePriceFor,
} from "@/lib/pricing";

/* ── Catálogo visible ───────────────────────────────────────────────────
   Sólo los tres tamaños de "General Debris" salen en el camino rápido: es
   el 90% de lo que se reserva. Los materiales pesados (tierra, concreto,
   ladrillo) llevan aviso aparte y sólo existen en 10 yd, así que el agente
   los manda a llamar en vez de cobrarlos mal. */
const FAST_SERVICE = "General Debris";
const FAST_SIZES = ["10", "20", "30"] as const;

/* ── Motor de reglas ────────────────────────────────────────────────────
   Decide el tamaño en CÓDIGO, no en el modelo (Consejo IA 14-sep: el LLM
   redacta, las reglas deciden). Tres estados: recomendado, con advertencia,
   o "hay que llamar". */
type Recommendation =
  | { kind: "size"; size: string; why: string; warn?: string }
  | { kind: "call"; why: string };

const HEAVY = /(dirt|soil|concrete|brick|asphalt|tile|stone|rock|tierra|concreto|ladrillo)/i;
const ROOF = /(roof|shingle|techo|tejado)/i;
const BIG = /(whole house|entire house|demolition|demoli|casa completa|construction site)/i;
const SMALL = /(garage|closet|shed|small|yard waste|garden|jardin|jard[íi]n|poda|mattress|furniture)/i;

export function recommendSize(text: string): Recommendation {
  const t = (text || "").trim();
  if (t.length < 3) return { kind: "call", why: "Tell us a bit more about the job." };

  // Materiales pesados: el precio y el límite de peso cambian por completo y
  // un error aquí es un sobrepeso de cientos de dólares. Va a llamada.
  if (HEAVY.test(t)) {
    return {
      kind: "call",
      why: "Dirt, concrete, brick and asphalt need a 10-yard heavy load — and the price depends on the material. One quick call and we quote it right.",
    };
  }
  if (ROOF.test(t)) {
    return {
      kind: "size",
      size: "20",
      why: "Roof tear-offs are heavy for their volume, so a 20-yard with 2 tons included is the safe pick.",
      warn: "Shingles add up fast: over 2 tons is $" + OVERWEIGHT_PER_TON + " per extra ton.",
    };
  }
  if (BIG.test(t)) {
    return {
      kind: "size",
      size: "30",
      why: "For a full-house or demo job the 30-yard saves you a second haul.",
    };
  }
  if (SMALL.test(t)) {
    return {
      kind: "size",
      size: "10",
      why: "For a garage, a shed or yard waste the 10-yard is plenty — and it's the cheapest.",
      warn: "The 10-yard includes 1 ton and 3 days.",
    };
  }
  // Caso medio (remodelación de cocina o baño, mudanza, limpieza general).
  return {
    kind: "size",
    size: "20",
    why: "For a room-sized remodel the 20-yard fits cabinets, countertops and drywall with room to spare.",
  };
}

/* ── Utilidades de fecha ─────────────────────────────────────────────── */
function addDays(iso: string, n: number): string {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}
function tomorrowISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

type Step = "start" | "fast" | "agent" | "zone" | "contact" | "price" | "dates" | "pay";

const emptyBooking: BookingData = {
  service: null,
  deliveryDate: "",
  deliveryWindow: "",
  pickupDate: "",
  extraDays: 0,
  extraDayFee: EXTRA_DAY_FEE,
  totalPrice: 0,
  subtotal: 0,
  onlineDiscount: LIST_PREMIUM,
  address: "",
  city: "",
  zipCode: "",
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  notes: "",
  billingAddress: null,
  authorizedCharges: false,
};

export default function BookingV2() {
  const [step, setStep] = useState<Step>("start");
  const [booking, setBooking] = useState<BookingData>(emptyBooking);
  const [projectText, setProjectText] = useState("");
  const [rec, setRec] = useState<Recommendation | null>(null);
  const [size, setSize] = useState<string>("");
  const [payment, setPayment] = useState<{
    clientSecret: string;
    publishableKey: string;
    stripeAccount?: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (u: Partial<BookingData>) => setBooking((b) => ({ ...b, ...u }));

  const online = size ? onlinePriceFor(FAST_SERVICE, size) : null;
  const list = online == null ? null : online + LIST_PREMIUM;
  const specs = size ? SIZE_SPECS[size] : null;
  const outside = useMemo(
    () => (booking.zipCode || booking.city ? isOutsideServiceArea(booking.city, booking.zipCode) : false),
    [booking.city, booking.zipCode]
  );

  /** Fija el tamaño elegido en el booking con su precio y especificaciones. */
  function chooseSize(s: string) {
    const price = onlinePriceFor(FAST_SERVICE, s);
    const sp = SIZE_SPECS[s];
    if (price == null || !sp) return;
    setSize(s);
    update({
      service: {
        serviceType: FAST_SERVICE,
        size: `${s} Yard`,
        basePrice: price,
        baseDays: sp.days,
        weightLimit: `${sp.tons} ton${sp.tons > 1 ? "s" : ""}`,
        dimensions: sp.dims,
      },
      subtotal: price + LIST_PREMIUM,
      onlineDiscount: LIST_PREMIUM,
      totalPrice: price,
    });
    setStep("zone");
  }

  /** Recalcula el total cuando cambian los días extra (el servidor manda igual). */
  function syncTotal(b: BookingData): number {
    const base = b.service?.basePrice ?? 0;
    return base + (b.extraDays || 0) * EXTRA_DAY_FEE;
  }

  async function startPayment() {
    setSubmitting(true);
    setError(null);
    try {
      const body = { ...booking, totalPrice: syncTotal(booking) };
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "We couldn't start the payment. Call (510) 650-2083 and we'll take it from here.");
        return;
      }
      setPayment({
        clientSecret: json.clientSecret,
        publishableKey: json.publishableKey,
        stripeAccount: json.stripeAccount,
      });
      setStep("pay");
    } catch {
      setError("Network error. Call (510) 650-2083 and we'll book it for you.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Pantallas ──────────────────────────────────────────────────────── */

  if (step === "pay" && payment) {
    return (
      <EmbeddedPayment
        clientSecret={payment.clientSecret}
        publishableKey={payment.publishableKey}
        stripeAccount={payment.stripeAccount}
        booking={booking}
        onBack={() => setStep("price")}
      />
    );
  }

  if (step === "dates") {
    return (
      <DateStep
        booking={booking}
        updateBooking={(u) => {
          setBooking((b) => {
            const next = { ...b, ...u };
            return { ...next, totalPrice: syncTotal(next) };
          });
        }}
        onNext={startPayment}
        onBack={() => setStep("price")}
      />
    );
  }

  return (
    <div className="w-[92%] max-w-[460px] mx-auto pb-12">
      {/* ── Arranque: los dos caminos ── */}
      {step === "start" && (
        <div className="-mt-7 relative z-10 bg-white rounded-[22px] p-[18px] shadow-[0_18px_42px_-18px_rgba(0,0,0,0.28)]">
          <h2 className="text-[21px] font-semibold tracking-[-0.03em]">Let&apos;s get you a dumpster</h2>
          <p className="text-[14.5px] text-[#6b6b73] mt-1 mb-4">Two ways to start — pick whichever fits you.</p>
          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => setStep("fast")}
              className="flex items-center gap-3 text-left bg-[#0e0e10] text-white rounded-2xl p-3.5"
            >
              <span className="flex-none w-9 h-9 rounded-xl bg-white/10 grid place-items-center">✓</span>
              <span>
                <b className="block text-[16px] font-semibold">I know what I need</b>
                <small className="text-[13px] text-white/70">Pick your size and see the price now</small>
              </span>
            </button>
            <button
              onClick={() => setStep("agent")}
              className="flex items-center gap-3 text-left bg-white border-[1.5px] border-[#e7e7ea] rounded-2xl p-3.5"
            >
              <span className="flex-none w-9 h-9 rounded-xl bg-[#f7f7f8] grid place-items-center">✦</span>
              <span>
                <b className="block text-[16px] font-semibold">Help me choose</b>
                <small className="text-[13px] text-[#6b6b73]">Tell us what you&apos;re tossing — we&apos;ll size it</small>
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ── Camino rápido: tamaños CON precio (ya eligió tamaño) ── */}
      {step === "fast" && (
        <div className="pt-6">
          <button onClick={() => setStep("start")} className="text-[13.5px] text-[#6b6b73] mb-3">
            ← I know what I need · <span className="underline">change</span>
          </button>
          <h3 className="text-[25px] font-semibold tracking-[-0.03em]">Pick your size</h3>
          <p className="text-[15px] text-[#6b6b73] mt-1 mb-4">
            Prices shown are the online rate — ${LIST_PREMIUM} off the list price.
          </p>
          {FAST_SIZES.map((s) => {
            const p = onlinePriceFor(FAST_SERVICE, s);
            const sp = SIZE_SPECS[s];
            if (p == null || !sp) return null;
            return (
              <button
                key={s}
                onClick={() => chooseSize(s)}
                className="w-full flex items-center gap-3 bg-white border-[1.5px] border-[#e7e7ea] rounded-[18px] p-3 mb-2.5 text-left"
              >
                <span className="flex-1 min-w-0">
                  <b className="block text-[17px] font-semibold">{s} Yard</b>
                  <small className="block text-[12.5px] text-[#6b6b73] mt-0.5">
                    {sp.tons} ton{sp.tons > 1 ? "s" : ""} · {sp.days} days · {sp.dims}
                  </small>
                </span>
                <span className="text-right">
                  <s className="block text-[12px] text-[#a3a3ab]">${p + LIST_PREMIUM}</s>
                  <b className="text-[20px] font-semibold">${p}</b>
                </span>
              </button>
            );
          })}
          <p className="mt-3 pl-3 border-l-2 border-[#e7e7ea] text-[13.5px] text-[#5b5b64] leading-relaxed">
            Extra weight <b>${OVERWEIGHT_PER_TON}</b>/ton · extra days <b>${EXTRA_DAY_FEE}</b> each, up to <b>14</b>.
          </p>
        </div>
      )}

      {/* ── Camino agente: recomendación SIN precio ── */}
      {step === "agent" && (
        <div className="pt-6">
          <button onClick={() => setStep("start")} className="text-[13.5px] text-[#6b6b73] mb-3">
            ← Help me choose · <span className="underline">change</span>
          </button>
          {!rec && (
            <>
              <h3 className="text-[25px] font-semibold tracking-[-0.03em]">What are you getting rid of?</h3>
              <p className="text-[15px] text-[#6b6b73] mt-1 mb-4">
                Describe the job and we&apos;ll match you with the right dumpster.
              </p>
              <div className="bg-white border border-[#e7e7ea] rounded-[22px] p-4 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.14)]">
                <textarea
                  value={projectText}
                  onChange={(e) => setProjectText(e.target.value)}
                  placeholder="e.g. Tearing out an old deck and some yard waste"
                  className="w-full min-h-[78px] outline-none resize-none text-[17px] leading-snug"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => setRec(recommendSize(projectText))}
                    disabled={projectText.trim().length < 3}
                    className="w-10 h-10 rounded-full bg-[#0e0e10] text-white disabled:bg-[#e4e4e8] disabled:text-[#a3a3ab]"
                    aria-label="Send"
                  >
                    ↑
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3.5">
                {["Kitchen remodel", "Roof tear-off", "Garage cleanout", "Yard waste", "Dirt & concrete"].map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setProjectText(c);
                      setRec(recommendSize(c));
                    }}
                    className="text-[14px] font-medium bg-white border border-[#e7e7ea] rounded-[10px] px-3 py-2.5"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </>
          )}

          {rec && (
            <>
              <div className="ml-auto max-w-[82%] bg-[#0e0e10] text-white rounded-[20px_20px_6px_20px] px-4 py-3 text-[15.5px] mb-3.5">
                {projectText}
              </div>
              {rec.kind === "call" ? (
                <div className="bg-white border border-[#e7e7ea] rounded-[22px] p-4">
                  <p className="text-[15.5px] leading-relaxed">{rec.why}</p>
                  <a
                    href="tel:+15106502083"
                    className="mt-4 flex items-center justify-center h-[52px] rounded-[14px] bg-[#E02B20] text-white font-semibold"
                  >
                    Call (510) 650-2083
                  </a>
                  <button onClick={() => setRec(null)} className="w-full h-11 text-[15px] font-medium mt-1">
                    Describe it differently
                  </button>
                </div>
              ) : (
                <div className="bg-white border border-[#e7e7ea] rounded-[22px] p-4">
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-[#E02B20]">Best fit</span>
                  <h2 className="text-[23px] font-semibold tracking-[-0.03em] mt-1 mb-2">{rec.size} Yard Dumpster</h2>
                  <p className="text-[14.5px] text-[#44444c] leading-relaxed">{rec.why}</p>
                  <p className="mt-3 pl-3 border-l-2 border-[#e7e7ea] text-[13.5px] text-[#5b5b64] leading-relaxed">
                    {rec.warn ? <>{rec.warn}<br /></> : null}
                    Appliances with Freon (fridges, A/C) carry a <b>$40–$80</b> fee.
                  </p>
                  <button
                    onClick={() => chooseSize(rec.size)}
                    className="w-full h-[52px] rounded-[14px] bg-[#E02B20] text-white font-semibold mt-3.5"
                  >
                    Continue with the {rec.size} Yard
                  </button>
                  <button onClick={() => setStep("fast")} className="w-full h-11 text-[15px] font-medium">
                    Compare all sizes
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ── Zona: la dirección ANTES de los datos ── */}
      {step === "zone" && (
        <div className="pt-6">
          <h3 className="text-[25px] font-semibold tracking-[-0.03em]">Where should we drop it?</h3>
          <p className="text-[15px] text-[#6b6b73] mt-1 mb-4">
            We&apos;ll confirm we serve your area before you fill anything else.
          </p>
          <div className="flex flex-col gap-2.5 mb-4">
            <label className="bg-white border border-[#e7e7ea] rounded-2xl px-3.5 py-2.5 block">
              <span className="block text-[12.5px] text-[#6b6b73] font-medium">Street address</span>
              <input
                value={booking.address}
                onChange={(e) => update({ address: e.target.value })}
                placeholder="2118 Oakley Rd"
                className="w-full outline-none text-[17px]"
              />
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <label className="bg-white border border-[#e7e7ea] rounded-2xl px-3.5 py-2.5 block">
                <span className="block text-[12.5px] text-[#6b6b73] font-medium">City</span>
                <input
                  value={booking.city}
                  onChange={(e) => update({ city: e.target.value })}
                  placeholder="Antioch"
                  className="w-full outline-none text-[17px]"
                />
              </label>
              <label className="bg-white border border-[#e7e7ea] rounded-2xl px-3.5 py-2.5 block">
                <span className="block text-[12.5px] text-[#6b6b73] font-medium">ZIP</span>
                <input
                  value={booking.zipCode}
                  onChange={(e) => update({ zipCode: e.target.value.replace(/[^0-9]/g, "").slice(0, 5) })}
                  placeholder="94509"
                  inputMode="numeric"
                  className="w-full outline-none text-[17px]"
                />
              </label>
            </div>
          </div>

          {booking.zipCode.length === 5 && !outside && (
            <p className="flex gap-2 text-[13.5px] text-[#1a7f37] bg-[#e9f7ee] rounded-xl px-3 py-2.5 mb-3.5">
              ✓ <span><b>We deliver there.</b> Pick your dates on the next steps.</span>
            </p>
          )}
          {outside && (
            <p className="flex gap-2 text-[13.5px] text-[#8a1c14] bg-[#fdecea] rounded-xl px-3 py-2.5 mb-3.5">
              <span>
                <b>We don&apos;t serve that area online yet.</b> Call{" "}
                <a href="tel:+15106502083" className="underline">(510) 650-2083</a> — sometimes we can still make it work.
              </span>
            </p>
          )}

          <button
            onClick={() => setStep("contact")}
            disabled={!booking.address.trim() || !booking.city.trim() || booking.zipCode.length !== 5 || outside}
            className="w-full h-[52px] rounded-[14px] bg-[#E02B20] text-white font-semibold disabled:bg-[#e4e4e8] disabled:text-[#a3a3ab]"
          >
            Continue
          </button>
        </div>
      )}

      {/* ── Datos: el precio sigue tapado ── */}
      {step === "contact" && (
        <div className="pt-6">
          <h3 className="text-[25px] font-semibold tracking-[-0.03em]">Who&apos;s this for?</h3>
          <p className="text-[15px] text-[#6b6b73] mt-1 mb-4">
            We&apos;ll hold your ${LIST_PREMIUM} online discount while you finish.
          </p>
          <div className="flex flex-col gap-2.5 mb-4">
            <label className="bg-white border border-[#e7e7ea] rounded-2xl px-3.5 py-2.5 block">
              <span className="block text-[12.5px] text-[#6b6b73] font-medium">Full name</span>
              <input
                value={booking.customerName}
                onChange={(e) => update({ customerName: e.target.value })}
                className="w-full outline-none text-[17px]"
              />
            </label>
            <label className="bg-white border border-[#e7e7ea] rounded-2xl px-3.5 py-2.5 block">
              <span className="block text-[12.5px] text-[#6b6b73] font-medium">Phone</span>
              <input
                value={booking.customerPhone}
                onChange={(e) => update({ customerPhone: e.target.value })}
                inputMode="tel"
                className="w-full outline-none text-[17px]"
              />
            </label>
            <label className="bg-white border border-[#e7e7ea] rounded-2xl px-3.5 py-2.5 block">
              <span className="block text-[12.5px] text-[#6b6b73] font-medium">
                Email <span className="text-[#b4b4bb] font-normal">· optional</span>
              </span>
              <input
                value={booking.customerEmail}
                onChange={(e) => update({ customerEmail: e.target.value })}
                inputMode="email"
                placeholder="you@email.com"
                className="w-full outline-none text-[17px]"
              />
            </label>
          </div>
          <button
            onClick={() => setStep("price")}
            disabled={!booking.customerName.trim() || booking.customerPhone.replace(/[^0-9]/g, "").length < 10}
            className="w-full h-[52px] rounded-[14px] bg-[#E02B20] text-white font-semibold disabled:bg-[#e4e4e8] disabled:text-[#a3a3ab]"
          >
            See my price
          </button>
          <p className="text-center text-[13px] text-[#6b6b73] mt-3">No payment yet · (510) 650-2083</p>
        </div>
      )}

      {/* ── Precio, ya con los datos dentro ── */}
      {step === "price" && online != null && list != null && specs && (
        <div className="pt-6">
          <h3 className="text-[25px] font-semibold tracking-[-0.03em]">Your price</h3>
          <p className="text-[15px] text-[#6b6b73] mt-1 mb-4">Delivery, pickup and disposal included.</p>
          <div className="bg-white border border-[#e7e7ea] rounded-[20px] p-4 mb-3.5">
            <div className="flex justify-between py-1.5 text-[15px] text-[#44444c]">
              <span>
                {size} Yard Dumpster · {specs.days} days
              </span>
              <b className="font-medium text-[#0e0e10]">${list}</b>
            </div>
            <div className="flex justify-between py-1.5 text-[15px] text-[#44444c]">
              <span>Online booking discount</span>
              <b className="font-medium text-[#1a7f37]">−${LIST_PREMIUM}</b>
            </div>
            <div className="flex justify-between items-baseline border-t border-[#e7e7ea] mt-2 pt-3">
              <span className="text-[15px] text-[#6b6b73]">Total today</span>
              <b className="text-[28px] font-semibold tracking-[-0.02em]">${online}</b>
            </div>
          </div>
          <p className="pl-3 border-l-2 border-[#e7e7ea] text-[13.5px] text-[#5b5b64] leading-relaxed mb-4">
            Includes {specs.tons} ton{specs.tons > 1 ? "s" : ""}. Extra weight <b>${OVERWEIGHT_PER_TON}</b>/ton. Extra
            days <b>${EXTRA_DAY_FEE}</b> each, up to <b>14</b>.
          </p>
          {error && <p className="text-[14px] text-[#8a1c14] bg-[#fdecea] rounded-xl px-3 py-2.5 mb-3">{error}</p>}
          <button
            onClick={() => {
              if (!booking.deliveryDate) {
                const d = tomorrowISO();
                update({ deliveryDate: d, pickupDate: addDays(d, specs.days) });
              }
              setStep("dates");
            }}
            disabled={submitting}
            className="w-full h-[52px] rounded-[14px] bg-[#E02B20] text-white font-semibold"
          >
            Pick a delivery date
          </button>
          <p className="text-center text-[13px] text-[#6b6b73] mt-3">Change size anytime · (510) 650-2083</p>
        </div>
      )}
    </div>
  );
}

/* TODO (segunda tanda, acordado con Cris):
   1. Guardar el lead en cuanto se escriben nombre y teléfono, sin esperar al
      pago — hoy el contacto sólo se guarda al llegar a /api/checkout. Necesita
      endpoint propio y una fila con estado 'lead'.
   2. Poner el agente de verdad (LLM) encima de `recommendSize()`: el modelo
      redacta el porqué y hace como máximo 2 preguntas, pero el tamaño lo
      sigue decidiendo el código.
   3. Autocompletado de dirección (el de AddressStep) en el paso de zona.
   4. Medir v1 vs v2 con ventas de Stripe antes de reemplazar /booking. */
