"use client";

import { useState } from "react";
import { FaCreditCard } from "react-icons/fa6";
import type { BookingData } from "./BookingWizard";
import { IconCalendar, IconReceipt, IconAlert, IconPin } from "@/components/MaterialIcons";
import { useBookingLang, rich } from "@/lib/i18n/useBookingLang";
import {
  dimensionsName,
  formatBookingDate,
  money,
  serviceName,
  sizeName,
  weightIncluded,
  weightPhrase,
  windowLabel,
} from "@/lib/i18n/booking";

interface Props {
  booking: BookingData;
  updateBooking: (updates: Partial<BookingData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

// Window labels (incl. legacy "midday") come from windowLabel() in the
// booking dictionary.

export default function SummaryStep({ booking, updateBooking, onBack, onSubmit, isSubmitting }: Props) {
  const { lang, t } = useBookingLang();
  const formatDate = (iso: string) => formatBookingDate(lang, iso, "short");
  // Mirrors booking.authorizedCharges so the consent actually reaches
  // /api/checkout and lands in the Stripe metadata as dispute evidence —
  // before (Hermes A4, 4-ago) this lived only in local state and every
  // booking shipped authorized_charges:"false" no matter what the customer
  // checked. Initialized from the booking so a restored session keeps it.
  const [authorizedCharges, setAuthorizedCharges] = useState(booking.authorizedCharges || false);
  // Opcional: no bloquea el pago, sólo viaja a la metadata de Stripe.
  const [smsConsent, setSmsConsent] = useState(booking.smsConsent || false);
  // El cliente ya intentó pagar: a partir de aquí se le señala la casilla.
  const [attempted, setAttempted] = useState(false);

  const handleSubmit = () => {
    if (!authorizedCharges) {
      setAttempted(true);
      return;
    }
    onSubmit();
  };
  const baseDays = booking.service?.baseDays || 7;

  const extra = booking.extraDays > 0 ? booking.extraDays * booking.extraDayFee : 0;

  return (
    /* ── Paso 4 reconstruido el 18-sep-2026 ──────────────────────────────
       Medido antes: esta pantalla ocupaba 9,216 px en móvil — casi 8 pantallas
       de scroll justo donde el cliente decide pagar $599 o más. El benchmark
       de Prisma (reports/consejo/bench_booking_prisma.md) dio el patrón que
       usan los que lo hacen bien (Airbnb, Uber, renta de autos):
         · el total arriba y el botón anclado abajo, nunca hay que buscarlos
         · el desglose y el detalle de la reserva detrás de un "ver", no
           desplegados en la pantalla
         · UN solo consentimiento, con el texto completo a un toque
         · y los cargos redactados como lo que INCLUYE, no como amenaza
       Lo que NO cambió: la casilla de autorización sigue siendo obligatoria y
       sigue viajando a la metadata de Stripe como evidencia de disputa, y el
       botón sigue explicando qué falta en vez de quedarse muerto. */
    <div className="pb-40">
      <h2 className="font-[var(--font-oswald)] uppercase text-[24px] font-semibold text-[#1d2329] mb-1">
        {t.summary.title}
      </h2>
      <p className="text-[13.5px] text-[#4b5156] mb-5 font-[var(--font-poppins)]">
        {t.summary.subtitle}
      </p>

      {/* ── Total, arriba y a la vista ── */}
      <div className="rounded-xl border border-[#d7dadd] bg-white p-4 mb-3">
        <div className="flex items-baseline justify-between">
          <span className="font-[var(--font-poppins)] text-[13px] font-medium text-[#4b5156]">
            {t.summary.totalToday}
          </span>
          <span className="text-right">
            {booking.onlineDiscount > 0 && (
              <s className="text-[13px] text-[#9aa0a6] mr-2">{money(lang, booking.subtotal)}</s>
            )}
            <span className="font-[var(--font-oswald)] text-[30px] font-semibold text-[#1d2329]">
              {money(lang, booking.totalPrice, true)}
            </span>
          </span>
        </div>

        <details className="mt-3 group">
          <summary className="cursor-pointer list-none font-[var(--font-poppins)] text-[13px] font-medium text-[#4b5156] underline decoration-[#c9ccd0]">
            {t.summary.seeBreakdown}
          </summary>
          <div className="mt-3 space-y-1.5 font-[var(--font-poppins)] text-[13.5px]">
            <div className="flex justify-between">
              <span className="text-[#4b5156]">
                {sizeName(lang, booking.service?.size)} · {serviceName(lang, booking.service?.serviceType)}
              </span>
              <span className="text-[#1d2329]">{money(lang, booking.service?.basePrice ?? 0)}</span>
            </div>
            {extra > 0 && (
              <div className="flex justify-between">
                <span className="text-[#4b5156]">
                  {t.summary.extraDaysLine(booking.extraDays, money(lang, booking.extraDayFee))}
                </span>
                <span className="text-[#1d2329]">+{money(lang, extra)}</span>
              </div>
            )}
            {booking.onlineDiscount > 0 && (
              <div className="flex justify-between">
                <span className="text-[#4b5156]">{t.summary.onlineDiscount}</span>
                <span className="text-[#1a7f37] font-medium">−{money(lang, booking.onlineDiscount, true)}</span>
              </div>
            )}
            {booking.rescueDiscount > 0 && (
              <div className="flex justify-between">
                <span className="text-[#4b5156]">{t.summary.rescueBonus}</span>
                <span className="text-[#1a7f37] font-medium">−{money(lang, booking.rescueDiscount, true)}</span>
              </div>
            )}
          </div>
        </details>
      </div>

      {/* ── Lo que incluye: mismo dato que antes, en positivo ── */}
      <div className="rounded-xl border-l-[3px] border-tp-gold bg-[#fffdf5] px-4 py-3 mb-3">
        <p className="font-[var(--font-poppins)] text-[13px] text-[#1d2329] leading-relaxed">
          {rich(
            t.summary.includes(
              weightPhrase(lang, booking.service?.weightLimit) || t.summary.weightFallback,
              baseDays,
              money(lang, booking.extraDayFee)
            )
          )}
        </p>
      </div>

      {/* ── El detalle de la reserva, a un toque ── */}
      <details className="rounded-xl border border-[#d7dadd] bg-white mb-3">
        <summary className="cursor-pointer list-none px-4 py-3 font-[var(--font-poppins)] text-[13.5px] font-medium text-[#1d2329] flex items-center justify-between">
          <span className="flex items-center gap-2">
            <IconReceipt size={16} className="text-[#4b5156]" />
            {sizeName(lang, booking.service?.size)} · {formatDate(booking.deliveryDate)}
          </span>
          <span className="text-[#4b5156] underline decoration-[#c9ccd0]">{t.summary.review}</span>
        </summary>
        <div className="px-4 pb-4 pt-1 font-[var(--font-poppins)] text-[13.5px] space-y-3">
          <div>
            <p className="text-[11.5px] uppercase tracking-wider text-[#8a8f94] font-semibold mb-1">{t.summary.dumpster}</p>
            <p className="text-[#1d2329]">
              {serviceName(lang, booking.service?.serviceType)} · {sizeName(lang, booking.service?.size)} ·{" "}
              {dimensionsName(lang, booking.service?.dimensions)}
            </p>
            <p className="text-[#4b5156]">{weightIncluded(lang, booking.service?.weightLimit)}</p>
          </div>
          <div>
            <p className="text-[11.5px] uppercase tracking-wider text-[#8a8f94] font-semibold mb-1 flex items-center gap-1.5">
              <IconCalendar size={14} /> {t.summary.dates}
            </p>
            <p className="text-[#1d2329]">
              {t.summary.dropOff} {formatDate(booking.deliveryDate)}
              {booking.deliveryWindow && (
                <span className="text-[#4b5156]"> · {windowLabel(lang, booking.deliveryWindow)}</span>
              )}
            </p>
            <p className="text-[#1d2329]">{t.summary.pickUp} {formatDate(booking.pickupDate)}</p>
          </div>
          <div>
            <p className="text-[11.5px] uppercase tracking-wider text-[#8a8f94] font-semibold mb-1 flex items-center gap-1.5">
              <IconPin size={14} /> {t.summary.deliveryTo}
            </p>
            <p className="text-[#1d2329] font-medium">{booking.customerName}</p>
            <p className="text-[#4b5156]">{booking.address}, {booking.city} {booking.zipCode}</p>
            <p className="text-[#4b5156]">{booking.customerPhone}</p>
            {booking.customerEmail && <p className="text-[#4b5156]">{booking.customerEmail}</p>}
            {booking.notes && <p className="text-[#4b5156] italic mt-1">“{booking.notes}”</p>}
          </div>
          <button
            onClick={onBack}
            className="font-[var(--font-poppins)] text-[13px] font-medium text-[#4b5156] underline decoration-[#c9ccd0]"
          >
            {t.summary.fixBack}
          </button>
        </div>
      </details>

      {/* ── Un solo consentimiento, con el texto completo a un toque ── */}
      <div
        className={`rounded-xl p-4 border transition-colors ${
          attempted && !authorizedCharges ? "border-tp-red bg-[#fdecea]" : "border-[#d7dadd] bg-white"
        }`}
      >
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={authorizedCharges}
            onChange={(e) => {
              setAuthorizedCharges(e.target.checked);
              updateBooking({ authorizedCharges: e.target.checked });
            }}
            aria-required="true"
            className="mt-0.5 w-[18px] h-[18px] accent-tp-red flex-shrink-0"
          />
          <span className="text-[13px] text-[#1d2329] font-[var(--font-poppins)] leading-relaxed">
            {t.summary.consentBefore}
            <span className="underline decoration-[#c9ccd0]">{t.summary.consentLink}</span>
            {t.summary.consentAfter}
          </span>
        </label>

        <details className="mt-2 ml-[30px]">
          <summary className="cursor-pointer list-none font-[var(--font-poppins)] text-[12px] text-[#4b5156] underline decoration-[#c9ccd0]">
            {t.summary.readTerms}
          </summary>
          <div className="mt-2 font-[var(--font-poppins)] text-[12px] text-[#4b5156] leading-relaxed space-y-2">
            <p>{t.summary.terms1(money(lang, booking.extraDayFee))}</p>
            <p>
              <strong className="font-semibold text-[#1d2329]">{t.summary.cancelLabel}</strong>
              {t.summary.cancelText}
            </p>
            <p>
              <strong className="font-semibold text-[#1d2329]">{t.summary.nextLabel}</strong>
              {t.summary.nextText}
            </p>
          </div>
        </details>

        {attempted && !authorizedCharges && (
          <p role="alert" aria-live="polite" className="text-[12.5px] text-[#8a1c14] font-semibold mt-2 ml-[30px] font-[var(--font-poppins)]">
            {t.summary.consentMissing}
          </p>
        )}
      </div>

      {/* ── Consentimiento de SMS, aparte y OPCIONAL ──────────────────────
         Twilio rechazó la campaña A2P de TP con 30909 ("CTA no verificable"):
         el revisor necesita ver en el sitio una casilla de consentimiento de
         SMS, y la única que había era la de autorización de CARGOS. Requisitos
         del carrier que este bloque cumple y que NO se deben tocar:
           · arranca DESMARCADA y no bloquea el pago (marketing no puede ser
             condición de compra)
           · es su propia casilla, no va empaquetada con otro consentimiento
           · el texto dice quién manda, qué manda, la frecuencia, que aplican
             tarifas, y STOP/HELP
           · enlaza a /sms-policy y /privacy, que es lo que el revisor abre
         Viaja a la metadata de Stripe como sms_consent (28-sep-2026). */}
      <div className="rounded-xl p-4 border border-[#d7dadd] bg-white mt-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={smsConsent}
            onChange={(e) => {
              setSmsConsent(e.target.checked);
              updateBooking({ smsConsent: e.target.checked });
            }}
            className="mt-0.5 w-[18px] h-[18px] accent-tp-red flex-shrink-0"
          />
          <span className="text-[13px] text-[#1d2329] font-[var(--font-poppins)] leading-relaxed">
            <strong className="font-semibold">{t.summary.smsBold}</strong>
            {t.summary.smsText}
            <a href="/sms-policy" target="_blank" rel="noopener noreferrer" className="underline decoration-[#c9ccd0]">
              {t.summary.smsTerms}
            </a>
            {t.summary.and}
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline decoration-[#c9ccd0]">
              {t.summary.privacy}
            </a>
            .
          </span>
        </label>
      </div>

      {/* ── Total y pago anclados abajo: nunca hay que buscarlos ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#e2e4e7] bg-white/95 backdrop-blur px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="flex-none">
            <p className="font-[var(--font-poppins)] text-[11px] text-[#8a8f94] leading-none mb-0.5">
              {t.summary.totalToday}
            </p>
            <p className="font-[var(--font-oswald)] text-[22px] font-semibold text-[#1d2329] leading-none">
              {money(lang, booking.totalPrice, true)}
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            aria-disabled={!authorizedCharges}
            className={`flex-1 flex items-center justify-center gap-2 h-[52px] rounded-xl font-[var(--font-poppins)] font-semibold text-[15px] transition-colors ${
              authorizedCharges
                ? "bg-tp-red text-white"
                : "bg-[#e4e4e8] text-[#8a8f94]"
            }`}
          >
            <FaCreditCard />
            {isSubmitting ? t.summary.preparing : t.summary.pay}
          </button>
        </div>
      </div>
    </div>
  );
}
