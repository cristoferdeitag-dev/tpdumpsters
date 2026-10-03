"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import type { BookingData } from "./BookingWizard";
import { isDateBlocked, blockedReason, blockedReasonKind } from "@/lib/availability";
import { MAX_EXTRA_DAYS } from "@/lib/rental-limits";
import { IconCalendar, IconReceipt } from "@/components/MaterialIcons";
import { useBookingLang, rich } from "@/lib/i18n/useBookingLang";
import {
  formatBookingDate,
  money,
  serviceName,
  sizeName,
  windowLabel,
  windowName,
  windowTime,
  type BookingDict,
  type Lang,
} from "@/lib/i18n/booking";

// Labels/times live in the dictionary helpers (windowName / windowTime).
const DELIVERY_WINDOWS = [{ id: "morning" }, { id: "afternoon" }] as const;

// What the delivery-date error is about, so it re-renders in the current
// language. "server" = the /api/day-capacity message, shown as sent (English).
type DeliveryError =
  | { kind: "blocked"; iso: string; size?: string }
  | { kind: "server"; msg: string }
  | null;

function deliveryErrorText(err: DeliveryError, lang: Lang, t: BookingDict): string {
  if (!err) return "";
  if (err.kind === "server") return err.msg;
  // English keeps the exact original text (including per-date custom notes).
  if (lang === "en") return blockedReason(err.iso, err.size);
  const kind = blockedReasonKind(err.iso, err.size);
  if (kind === "size") return t.date.blocked.size(sizeName(lang, err.size));
  if (kind === "") return "";
  return t.date.blocked[kind];
}

interface Props {
  booking: BookingData;
  updateBooking: (updates: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

/* Marca de campo obligatorio (mismo criterio que AddressStep). */
function Req() {
  const { t } = useBookingLang();
  return (
    <>
      <span className="text-tp-red font-bold" aria-hidden="true"> *</span>
      <span className="sr-only">{t.common.required}</span>
    </>
  );
}

function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr + "T12:00:00");
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

function daysBetween(start: string, end: string): number {
  const s = new Date(start + "T12:00:00");
  const e = new Date(end + "T12:00:00");
  return Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
}

export default function DateStep({ booking, updateBooking, onNext, onBack }: Props) {
  const { lang, t } = useBookingLang();
  const baseDays = booking.service?.baseDays || 7;

  // Minimum delivery date = tomorrow
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  // Minimum pickup date = day after delivery (customers may pick up early;
  // price stays the same up to the included rental period).
  const minPickupDate = booking.deliveryDate
    ? addDays(booking.deliveryDate, 1)
    : "";

  // Tope de renta (Asaí, 17-sep-2026): los días incluidos + 2 semanas extra.
  // Antes el campo sólo tenía `min`, así que se podía elegir cualquier día del
  // futuro y el servidor recortaba el cobro sin avisar.
  const maxPickupDate = booking.deliveryDate
    ? addDays(booking.deliveryDate, baseDays + MAX_EXTRA_DAYS)
    : "";

  // Inline error for unavailable delivery dates (yard fully booked).
  const [deliveryError, setDeliveryError] = useState<DeliveryError>(null);
  // Last date the customer picked — a slow capacity answer for an older pick
  // must not wipe a newer one.
  const lastPickedRef = useRef("");

  // Re-validate a previously-picked delivery date if the customer goes back
  // and changes the size (Step 1 runs before Step 2, so a date that was fine
  // for the old size can become blocked for the new one). The checkout API
  // rejects this too, but catching it here avoids a dead-end at payment.
  useEffect(() => {
    if (booking.deliveryDate && isDateBlocked(booking.deliveryDate, booking.service?.size)) {
      setDeliveryError({ kind: "blocked", iso: booking.deliveryDate, size: booking.service?.size });
      updateBooking({ deliveryDate: "", deliveryWindow: "", pickupDate: "" });
    }
    // Only re-check when the selected size changes — handleDeliveryChange
    // already validates on every date pick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking.service?.size]);

  // When delivery date changes, auto-set pickup to minimum and reset window
  const handleDeliveryChange = (date: string) => {
    if (date && isDateBlocked(date, booking.service?.size)) {
      setDeliveryError({ kind: "blocked", iso: date, size: booking.service?.size });
      // Don't propagate the blocked date; force the user to pick again.
      updateBooking({ deliveryDate: "", deliveryWindow: "", pickupDate: "" });
      return;
    }
    setDeliveryError(null);
    // Daily online cap (6 deliveries + swaps): ask the server, since only it
    // can read the calendar. Fails open — the checkout API re-checks anyway.
    if (date) {
      const picked = date;
      lastPickedRef.current = picked;
      fetch(`/api/day-capacity?date=${picked}&size=${encodeURIComponent(booking.service?.size || "")}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((res) => {
          if (res?.full && lastPickedRef.current === picked) {
            setDeliveryError({ kind: "server", msg: res.message });
            updateBooking({ deliveryDate: "", deliveryWindow: "", pickupDate: "" });
          }
        })
        .catch(() => {});
    }
    const autoPickup = addDays(date, baseDays);
    const totalDays = baseDays;
    const extra = Math.max(0, totalDays - baseDays);
    updateBooking({
      deliveryDate: date,
      deliveryWindow: "",
      pickupDate: autoPickup,
      extraDays: extra,
    });
  };

  const [pickupError, setPickupError] = useState(false);

  const handlePickupChange = (date: string) => {
    if (!booking.deliveryDate) return;
    const totalDays = daysBetween(booking.deliveryDate, date);
    const extra = Math.max(0, totalDays - baseDays);
    // El `max` del input no basta: escribiendo la fecha a mano el navegador la
    // deja pasar. Se recorta al tope y se DICE por qué, en vez de mover la
    // fecha en silencio.
    if (extra > MAX_EXTRA_DAYS) {
      setPickupError(true);
      updateBooking({ pickupDate: maxPickupDate, extraDays: MAX_EXTRA_DAYS });
      return;
    }
    setPickupError(false);
    updateBooking({
      pickupDate: date,
      extraDays: extra,
    });
  };

  const totalDays = booking.deliveryDate && booking.pickupDate
    ? daysBetween(booking.deliveryDate, booking.pickupDate)
    : 0;

  const canProceed = booking.deliveryDate && booking.deliveryWindow && booking.pickupDate && totalDays >= 1;

  // Mismo criterio que en el paso de dirección (9-sep-2026): el botón nunca se
  // queda mudo. Faltaba sobre todo la ventana horaria — se elige la fecha, se
  // sigue de largo y el botón quedaba gris sin decir por qué.
  const [attempted, setAttempted] = useState(false);
  const missing: string[] = [];
  if (!booking.deliveryDate) missing.push(t.date.missDelivery);
  else if (!booking.deliveryWindow) missing.push(t.date.missWindow);
  if (booking.deliveryDate && (!booking.pickupDate || totalDays < 1))
    missing.push(t.date.missPickup);

  const handleNext = () => {
    if (canProceed) {
      onNext();
      return;
    }
    setAttempted(true);
  };

  return (
    <div>
      <h2 className="font-[var(--font-poppins)] text-2xl font-bold text-[#333] mb-2">
        {t.date.title}
      </h2>
      <p className="text-sm text-[#888] mb-4 font-[var(--font-poppins)]">
        {rich(
          t.date.includes(
            `${serviceName(lang, booking.service?.serviceType)} — ${sizeName(lang, booking.service?.size)}`,
            baseDays
          ),
          ""
        )}
      </p>
      <p className="text-xs text-[#888] mb-4 font-[var(--font-poppins)]">
        {t.common.requiredPrefix} <span className="text-tp-red font-bold">*</span> {t.date.requiredSuffix}
      </p>

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
        <p className="text-sm text-blue-800 font-[var(--font-poppins)]">
          {rich(t.date.infoBanner(baseDays), "")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {/* Delivery date */}
        <div>
          <label className="block text-sm font-semibold text-[#333] mb-2 font-[var(--font-poppins)]">
            <IconCalendar size={17} className="text-[#4b5156]" /> {t.date.deliveryDate}<Req />
          </label>
          <input
            type="date"
            min={tomorrow}
            value={booking.deliveryDate}
            onChange={(e) => handleDeliveryChange(e.target.value)}
            aria-required="true"
            className={`w-full px-4 py-3 border-2 rounded-xl text-base font-[var(--font-poppins)] focus:outline-none transition-colors ${
              attempted && !booking.deliveryDate
                ? "border-red-400 bg-red-50 focus:border-red-500"
                : "border-gray-200 focus:border-tp-red"
            }`}
          />
          {attempted && !booking.deliveryDate && (
            <p className="text-xs text-red-500 mt-1.5 font-[var(--font-poppins)]">
              {t.date.deliveryMissing}
            </p>
          )}
          {booking.deliveryDate && (
            <p className="text-xs text-[#888] mt-1.5">
              {formatBookingDate(lang, booking.deliveryDate)}
              {booking.deliveryWindow && (
                <span className="text-tp-red font-semibold ml-1">
                  — {windowLabel(lang, booking.deliveryWindow)}
                </span>
              )}
            </p>
          )}
          {deliveryError && (
            <p className="text-xs text-tp-red font-semibold mt-1.5 font-[var(--font-poppins)]">
              {deliveryErrorText(deliveryError, lang, t)}
            </p>
          )}
          {/* Asaí, 9-sep-2026: el dumpster llega a cualquier hora del día y el
              driver no puede esperar; si el lugar está obstruido, $149. */}
          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <p className="text-xs text-amber-800 leading-relaxed font-[var(--font-poppins)]">
              {rich(t.date.deliveryNote, "")}
            </p>
          </div>
        </div>

        {/* Pickup date */}
        <div>
          <label className="block text-sm font-semibold text-[#333] mb-2 font-[var(--font-poppins)]">
            <IconCalendar size={17} className="text-[#4b5156]" /> {t.date.pickupDate}
            <span className="text-xs text-green-600 font-normal ml-2">{t.date.autoSet}</span>
          </label>
          <input
            type="date"
            min={minPickupDate}
            max={maxPickupDate}
            value={booking.pickupDate}
            onChange={(e) => handlePickupChange(e.target.value)}
            disabled={!booking.deliveryDate}
            className={`w-full px-4 py-3 border-2 rounded-xl text-base font-[var(--font-poppins)] focus:border-tp-red focus:outline-none transition-colors ${
              !booking.deliveryDate
                ? "border-gray-100 bg-gray-50 text-gray-300"
                : "border-gray-200 bg-white"
            }`}
          />
          {pickupError && (
            <p className="text-xs text-tp-red font-semibold mt-1.5 font-[var(--font-poppins)]">
              {t.date.maxRental(baseDays, MAX_EXTRA_DAYS)}
            </p>
          )}
          {booking.pickupDate && (
            <p className="text-xs text-[#888] mt-1.5">
              {formatBookingDate(lang, booking.pickupDate)}
              {booking.extraDays > 0 && (
                <span className="text-amber-600 font-semibold ml-1">
                  {t.date.extraDaysNote(booking.extraDays, money(lang, booking.extraDays * booking.extraDayFee))}
                </span>
              )}
            </p>
          )}
          {/* Asaí, 9-sep-2026: se recoge a cualquier hora de ese día, el área
              debe estar libre ($149 si no), y los días extra se avisan 24h antes. */}
          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <p className="text-xs text-amber-800 leading-relaxed font-[var(--font-poppins)]">
              {rich(t.date.pickupNote, "")}
            </p>
          </div>
        </div>
      </div>

      {/* Delivery window selector */}
      {booking.deliveryDate && (
        <div className="mb-8">
          <label className="block text-sm font-semibold text-[#333] mb-1 font-[var(--font-poppins)]">
            <IconCalendar size={17} className="text-[#4b5156]" /> {t.date.windowTitle}<Req />
          </label>
          <p className="text-xs text-[#888] mb-3 font-[var(--font-poppins)]">
            {t.date.windowHelp}
          </p>
          <div
            className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${
              attempted && !booking.deliveryWindow
                ? "rounded-xl border-2 border-red-400 bg-red-50 p-3"
                : ""
            }`}
          >
            {DELIVERY_WINDOWS.map((w) => {
              const isSelected = booking.deliveryWindow === w.id;
              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => updateBooking({ deliveryWindow: w.id })}
                  className={`flex flex-col items-center justify-center px-4 py-4 rounded-xl border-2 transition-all duration-200 font-[var(--font-poppins)] cursor-pointer ${
                    isSelected
                      ? "border-tp-red bg-red-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-2xl mb-1"></span>
                  <span className={`font-semibold text-sm ${isSelected ? "text-tp-red" : "text-[#333]"}`}>
                    {windowName(lang, w.id)}
                  </span>
                  <span className={`text-xs mt-0.5 ${isSelected ? "text-tp-red/70" : "text-[#888]"}`}>
                    {windowTime(lang, w.id)}
                  </span>
                </button>
              );
            })}
          </div>
          {attempted && !booking.deliveryWindow && (
            <p className="text-xs text-red-500 mt-1.5 font-[var(--font-poppins)]">
              {t.date.windowMissing}
            </p>
          )}
        </div>
      )}

      {/* Pricing breakdown */}
      {booking.deliveryDate && booking.pickupDate && (
        <div className="bg-gray-50 rounded-xl p-5 mb-8">
          <h3 className="font-[var(--font-poppins)] font-semibold text-[#333] mb-3">
            <IconReceipt size={17} className="text-[#4b5156]" /> {t.date.breakdown}
          </h3>
          <div className="space-y-2 text-sm font-[var(--font-poppins)]">
            <div className="flex justify-between">
              <span className="text-[#666]">
                {serviceName(lang, booking.service?.serviceType)} — {sizeName(lang, booking.service?.size)}
              </span>
              <span className="font-semibold">{money(lang, booking.service?.basePrice ?? 0)}</span>
            </div>
            <div className="flex justify-between text-[#888]">
              <span>{t.date.includedRental(baseDays)}</span>
              <span>{t.date.included}</span>
            </div>
            {booking.extraDays > 0 && (
              <div className="flex justify-between text-amber-600">
                <span>
                  {t.date.extraDaysLine(booking.extraDays, money(lang, booking.extraDayFee))}
                </span>
                <span className="font-semibold">
                  +{money(lang, booking.extraDays * booking.extraDayFee)}
                </span>
              </div>
            )}
            {booking.onlineDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>{t.date.onlineDiscount}</span>
                <span className="font-semibold">-{money(lang, booking.onlineDiscount, true)}</span>
              </div>
            )}
            {booking.rescueDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>{t.date.rescueBonus}</span>
                <span className="font-semibold">-{money(lang, booking.rescueDiscount, true)}</span>
              </div>
            )}
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span className="font-bold text-[#333] text-base">{t.date.total}</span>
              <div className="text-right">
                {booking.onlineDiscount > 0 && (
                  <span className="text-sm text-[#999] line-through mr-2">{money(lang, booking.subtotal)}</span>
                )}
                <span className="font-bold text-tp-red text-xl font-[var(--font-oswald)]">
                  {money(lang, booking.totalPrice, true)}
                </span>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-[#aaa] mt-3">
            {t.date.totalRental(totalDays)}
          </p>
        </div>
      )}

      {!canProceed && attempted && (
        <div role="alert" aria-live="polite" className="rounded-xl border-2 border-amber-300 bg-amber-50 px-4 py-3 mb-4">
          <p className="text-sm font-semibold text-amber-800 font-[var(--font-poppins)]">
            {t.date.beforeContinue(missing)}
          </p>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg font-[var(--font-poppins)] font-semibold text-sm text-[#666] bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          {t.common.back}
        </button>
        {/* Sin `disabled`: si falta algo, el clic lo dice (ver AddressStep). */}
        <button
          onClick={handleNext}
          aria-disabled={!canProceed}
          className={`px-8 py-3 rounded-lg font-[var(--font-poppins)] font-semibold text-base transition-all duration-200 ${
            canProceed
              ? "bg-tp-red text-white hover:bg-tp-red-dark shadow-md"
              : "bg-gray-200 text-gray-500 hover:bg-gray-300"
          }`}
        >
          {t.date.next}
        </button>
      </div>
    </div>
  );
}
