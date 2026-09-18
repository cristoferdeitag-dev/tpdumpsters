"use client";

import { useState } from "react";
import { FaCreditCard } from "react-icons/fa6";
import type { BookingData } from "./BookingWizard";
import { IconCalendar, IconReceipt, IconAlert, IconPin } from "@/components/MaterialIcons";

interface Props {
  booking: BookingData;
  updateBooking: (updates: Partial<BookingData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Display lookup: includes midday for legacy bookings made before the
// 2-window switch, even though new bookings can only select morning/afternoon.
const WINDOW_LABELS: Record<string, string> = {
  morning: "Morning (7:00 AM - 12:00 PM)",
  midday: "Midday (11:00 AM - 3:00 PM)",
  afternoon: "Afternoon (1:00 PM - 6:00 PM)",
};

export default function SummaryStep({ booking, updateBooking, onBack, onSubmit, isSubmitting }: Props) {
  // Mirrors booking.authorizedCharges so the consent actually reaches
  // /api/checkout and lands in the Stripe metadata as dispute evidence —
  // before (Hermes A4, 4-ago) this lived only in local state and every
  // booking shipped authorized_charges:"false" no matter what the customer
  // checked. Initialized from the booking so a restored session keeps it.
  const [authorizedCharges, setAuthorizedCharges] = useState(booking.authorizedCharges || false);
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
        Review &amp; pay
      </h2>
      <p className="text-[13.5px] text-[#4b5156] mb-5 font-[var(--font-poppins)]">
        Delivery, pickup and disposal are included in the price.
      </p>

      {/* ── Total, arriba y a la vista ── */}
      <div className="rounded-xl border border-[#d7dadd] bg-white p-4 mb-3">
        <div className="flex items-baseline justify-between">
          <span className="font-[var(--font-poppins)] text-[13px] font-medium text-[#4b5156]">
            Total today
          </span>
          <span className="text-right">
            {booking.onlineDiscount > 0 && (
              <s className="text-[13px] text-[#9aa0a6] mr-2">${booking.subtotal}</s>
            )}
            <span className="font-[var(--font-oswald)] text-[30px] font-semibold text-[#1d2329]">
              ${booking.totalPrice.toFixed(2)}
            </span>
          </span>
        </div>

        <details className="mt-3 group">
          <summary className="cursor-pointer list-none font-[var(--font-poppins)] text-[13px] font-medium text-[#4b5156] underline decoration-[#c9ccd0]">
            See price breakdown
          </summary>
          <div className="mt-3 space-y-1.5 font-[var(--font-poppins)] text-[13.5px]">
            <div className="flex justify-between">
              <span className="text-[#4b5156]">
                {booking.service?.size} · {booking.service?.serviceType}
              </span>
              <span className="text-[#1d2329]">${booking.service?.basePrice}</span>
            </div>
            {extra > 0 && (
              <div className="flex justify-between">
                <span className="text-[#4b5156]">
                  {booking.extraDays} extra day{booking.extraDays > 1 ? "s" : ""} × ${booking.extraDayFee}
                </span>
                <span className="text-[#1d2329]">+${extra}</span>
              </div>
            )}
            {booking.onlineDiscount > 0 && (
              <div className="flex justify-between">
                <span className="text-[#4b5156]">Online booking discount</span>
                <span className="text-[#1a7f37] font-medium">−${booking.onlineDiscount.toFixed(2)}</span>
              </div>
            )}
          </div>
        </details>
      </div>

      {/* ── Lo que incluye: mismo dato que antes, en positivo ── */}
      <div className="rounded-xl border-l-[3px] border-tp-gold bg-[#fffdf5] px-4 py-3 mb-3">
        <p className="font-[var(--font-poppins)] text-[13px] text-[#1d2329] leading-relaxed">
          <strong className="font-semibold">Your rental includes</strong>{" "}
          {booking.service?.weightLimit || "the weight allowance"} and {baseDays} days.
          Need more? Extra weight is <strong className="font-semibold">$179</strong>/ton and each
          extra day <strong className="font-semibold">${booking.extraDayFee}</strong>.
        </p>
      </div>

      {/* ── El detalle de la reserva, a un toque ── */}
      <details className="rounded-xl border border-[#d7dadd] bg-white mb-3">
        <summary className="cursor-pointer list-none px-4 py-3 font-[var(--font-poppins)] text-[13.5px] font-medium text-[#1d2329] flex items-center justify-between">
          <span className="flex items-center gap-2">
            <IconReceipt size={16} className="text-[#4b5156]" />
            {booking.service?.size} · {formatDate(booking.deliveryDate)}
          </span>
          <span className="text-[#4b5156] underline decoration-[#c9ccd0]">Review</span>
        </summary>
        <div className="px-4 pb-4 pt-1 font-[var(--font-poppins)] text-[13.5px] space-y-3">
          <div>
            <p className="text-[11.5px] uppercase tracking-wider text-[#8a8f94] font-semibold mb-1">Dumpster</p>
            <p className="text-[#1d2329]">
              {booking.service?.serviceType} · {booking.service?.size} · {booking.service?.dimensions}
            </p>
            <p className="text-[#4b5156]">{booking.service?.weightLimit} included</p>
          </div>
          <div>
            <p className="text-[11.5px] uppercase tracking-wider text-[#8a8f94] font-semibold mb-1 flex items-center gap-1.5">
              <IconCalendar size={14} /> Dates
            </p>
            <p className="text-[#1d2329]">
              Drop-off {formatDate(booking.deliveryDate)}
              {booking.deliveryWindow && (
                <span className="text-[#4b5156]"> · {WINDOW_LABELS[booking.deliveryWindow] || booking.deliveryWindow}</span>
              )}
            </p>
            <p className="text-[#1d2329]">Pick-up {formatDate(booking.pickupDate)}</p>
          </div>
          <div>
            <p className="text-[11.5px] uppercase tracking-wider text-[#8a8f94] font-semibold mb-1 flex items-center gap-1.5">
              <IconPin size={14} /> Delivery to
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
            Something to fix? Go back
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
            I agree to pay today’s total and authorize charges for extra weight, extra days or
            prohibited items, per the{" "}
            <span className="underline decoration-[#c9ccd0]">rental terms</span>.
          </span>
        </label>

        <details className="mt-2 ml-[30px]">
          <summary className="cursor-pointer list-none font-[var(--font-poppins)] text-[12px] text-[#4b5156] underline decoration-[#c9ccd0]">
            Read the rental terms
          </summary>
          <div className="mt-2 font-[var(--font-poppins)] text-[12px] text-[#4b5156] leading-relaxed space-y-2">
            <p>
              I authorize TP Dumpsters to charge my card for any additional fees incurred during the
              rental period, including but not limited to: extra weight ($179/ton prorated),
              additional rental days (${booking.extraDayFee}/day), and prohibited or hazardous items
              found in the dumpster ($20–$60 per item). I understand these charges may be processed
              after the dumpster is picked up.
            </p>
            <p>
              <strong className="font-semibold text-[#1d2329]">Cancellation:</strong> 24-hour notice
              required; a $150 cancellation fee applies. Overloaded loads (above the top edge) add a
              $149 fee, charged at pickup.
            </p>
            <p>
              <strong className="font-semibold text-[#1d2329]">What happens next:</strong> once the
              booking is confirmed, someone from our team contacts you within 24 hours to confirm
              delivery details and placement.
            </p>
          </div>
        </details>

        {attempted && !authorizedCharges && (
          <p role="alert" aria-live="polite" className="text-[12.5px] text-[#8a1c14] font-semibold mt-2 ml-[30px] font-[var(--font-poppins)]">
            Check the box to authorize the charges — we can’t take the payment without it.
          </p>
        )}
      </div>

      {/* ── Total y pago anclados abajo: nunca hay que buscarlos ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#e2e4e7] bg-white/95 backdrop-blur px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="flex-none">
            <p className="font-[var(--font-poppins)] text-[11px] text-[#8a8f94] leading-none mb-0.5">
              Total today
            </p>
            <p className="font-[var(--font-oswald)] text-[22px] font-semibold text-[#1d2329] leading-none">
              ${booking.totalPrice.toFixed(2)}
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
            {isSubmitting ? "Preparing payment…" : "Pay & confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
