"use client";

import { useMemo, useState } from "react";
import type { BookingData } from "./BookingWizard";
import { isDateBlocked, blockedReason } from "@/lib/availability";

const DELIVERY_WINDOWS = [
  { id: "morning", emoji: "🌅", label: "Morning", time: "7:00 AM - 12:00 PM" },
  { id: "afternoon", emoji: "🌆", label: "Afternoon", time: "1:00 PM - 6:00 PM" },
] as const;

function getWindowLabel(windowId: string): string {
  const w = DELIVERY_WINDOWS.find((w) => w.id === windowId);
  return w ? `${w.label} (${w.time})` : "";
}

interface Props {
  booking: BookingData;
  updateBooking: (updates: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

/* Marca de campo obligatorio (mismo criterio que AddressStep). */
function Req() {
  return (
    <>
      <span className="text-tp-red font-bold" aria-hidden="true"> *</span>
      <span className="sr-only"> (required)</span>
    </>
  );
}

function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr + "T12:00:00");
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function daysBetween(start: string, end: string): number {
  const s = new Date(start + "T12:00:00");
  const e = new Date(end + "T12:00:00");
  return Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
}

export default function DateStep({ booking, updateBooking, onNext, onBack }: Props) {
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

  // Inline error for unavailable delivery dates (yard fully booked).
  const [deliveryError, setDeliveryError] = useState("");

  // When delivery date changes, auto-set pickup to minimum and reset window
  const handleDeliveryChange = (date: string) => {
    if (date && isDateBlocked(date)) {
      setDeliveryError(blockedReason(date));
      // Don't propagate the blocked date; force the user to pick again.
      updateBooking({ deliveryDate: "", deliveryWindow: "", pickupDate: "" });
      return;
    }
    setDeliveryError("");
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

  const handlePickupChange = (date: string) => {
    if (!booking.deliveryDate) return;
    const totalDays = daysBetween(booking.deliveryDate, date);
    const extra = Math.max(0, totalDays - baseDays);
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
  if (!booking.deliveryDate) missing.push("a delivery date");
  else if (!booking.deliveryWindow) missing.push("a delivery time window");
  if (booking.deliveryDate && (!booking.pickupDate || totalDays < 1))
    missing.push("a valid pickup date");

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
        Choose your dates
      </h2>
      <p className="text-sm text-[#888] mb-4 font-[var(--font-poppins)]">
        {booking.service?.serviceType} — {booking.service?.size} includes{" "}
        <strong>{baseDays} days</strong> of rental.
      </p>
      <p className="text-xs text-[#888] mb-4 font-[var(--font-poppins)]">
        Fields marked <span className="text-tp-red font-bold">*</span> are required.
      </p>

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
        <p className="text-sm text-blue-800 font-[var(--font-poppins)]">
          ℹ️ <strong>Pickup date is set automatically</strong> based on your rental period ({baseDays} days).
          Done early? You can pick an <strong>earlier pickup date</strong> — same price, the {baseDays} days are always included.
          Need more time? Pick a later date — extra days are <strong>$75/day</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {/* Delivery date */}
        <div>
          <label className="block text-sm font-semibold text-[#333] mb-2 font-[var(--font-poppins)]">
            📅 Delivery date<Req />
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
              ⚠️ Pick the day you want the dumpster delivered
            </p>
          )}
          {booking.deliveryDate && (
            <p className="text-xs text-[#888] mt-1.5">
              {formatDate(booking.deliveryDate)}
              {booking.deliveryWindow && (
                <span className="text-tp-red font-semibold ml-1">
                  — {getWindowLabel(booking.deliveryWindow)}
                </span>
              )}
            </p>
          )}
          {deliveryError && (
            <p className="text-xs text-tp-red font-semibold mt-1.5 font-[var(--font-poppins)]">
              {deliveryError}
            </p>
          )}
          {/* Asaí, 9-sep-2026: el dumpster llega a cualquier hora del día y el
              driver no puede esperar; si el lugar está obstruido, $149. */}
          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <p className="text-xs text-amber-800 leading-relaxed font-[var(--font-poppins)]">
              ⚠️ We deliver <strong>any time during the day</strong>. Have the spot
              clear and accessible — our driver can&apos;t wait. Blocked spot:
              <strong> $149 fee</strong>.
            </p>
          </div>
        </div>

        {/* Pickup date */}
        <div>
          <label className="block text-sm font-semibold text-[#333] mb-2 font-[var(--font-poppins)]">
            📅 Pickup date
            <span className="text-xs text-green-600 font-normal ml-2">✓ Auto-set</span>
          </label>
          <input
            type="date"
            min={minPickupDate}
            value={booking.pickupDate}
            onChange={(e) => handlePickupChange(e.target.value)}
            disabled={!booking.deliveryDate}
            className={`w-full px-4 py-3 border-2 rounded-xl text-base font-[var(--font-poppins)] focus:border-tp-red focus:outline-none transition-colors ${
              !booking.deliveryDate
                ? "border-gray-100 bg-gray-50 text-gray-300"
                : "border-gray-200 bg-white"
            }`}
          />
          {booking.pickupDate && (
            <p className="text-xs text-[#888] mt-1.5">
              {formatDate(booking.pickupDate)}
              {booking.extraDays > 0 && (
                <span className="text-amber-600 font-semibold ml-1">
                  (+{booking.extraDays} extra day{booking.extraDays > 1 ? "s" : ""} = +${booking.extraDays * booking.extraDayFee})
                </span>
              )}
            </p>
          )}
          {/* Asaí, 9-sep-2026: se recoge a cualquier hora de ese día, el área
              debe estar libre ($149 si no), y los días extra se avisan 24h antes. */}
          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <p className="text-xs text-amber-800 leading-relaxed font-[var(--font-poppins)]">
              ⚠️ We pick up <strong>any time during the day</strong>. Keep the area
              clear or a <strong>$149 fee</strong> applies. Need more days? Tell us
              <strong> 24 hours ahead</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Delivery window selector */}
      {booking.deliveryDate && (
        <div className="mb-8">
          <label className="block text-sm font-semibold text-[#333] mb-1 font-[var(--font-poppins)]">
            🕐 Choose a delivery time window<Req />
          </label>
          <p className="text-xs text-[#888] mb-3 font-[var(--font-poppins)]">
            Time windows are a guide, not a guaranteed hour — the exact time can
            shift with routing, logistics and traffic.
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
                  <span className="text-2xl mb-1">{w.emoji}</span>
                  <span className={`font-semibold text-sm ${isSelected ? "text-tp-red" : "text-[#333]"}`}>
                    {w.label}
                  </span>
                  <span className={`text-xs mt-0.5 ${isSelected ? "text-tp-red/70" : "text-[#888]"}`}>
                    {w.time}
                  </span>
                </button>
              );
            })}
          </div>
          {attempted && !booking.deliveryWindow && (
            <p className="text-xs text-red-500 mt-1.5 font-[var(--font-poppins)]">
              ⚠️ Pick a time window — morning or afternoon
            </p>
          )}
        </div>
      )}

      {/* Pricing breakdown */}
      {booking.deliveryDate && booking.pickupDate && (
        <div className="bg-gray-50 rounded-xl p-5 mb-8">
          <h3 className="font-[var(--font-poppins)] font-semibold text-[#333] mb-3">
            📊 Price breakdown
          </h3>
          <div className="space-y-2 text-sm font-[var(--font-poppins)]">
            <div className="flex justify-between">
              <span className="text-[#666]">
                {booking.service?.serviceType} — {booking.service?.size}
              </span>
              <span className="font-semibold">${booking.service?.basePrice}</span>
            </div>
            <div className="flex justify-between text-[#888]">
              <span>Included rental: {baseDays} days</span>
              <span>Included</span>
            </div>
            {booking.extraDays > 0 && (
              <div className="flex justify-between text-amber-600">
                <span>
                  Extra days: {booking.extraDays} × ${booking.extraDayFee}/day
                </span>
                <span className="font-semibold">
                  +${booking.extraDays * booking.extraDayFee}
                </span>
              </div>
            )}
            {booking.onlineDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>💰 Online booking discount ($50 OFF)</span>
                <span className="font-semibold">-${booking.onlineDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span className="font-bold text-[#333] text-base">Total</span>
              <div className="text-right">
                {booking.onlineDiscount > 0 && (
                  <span className="text-sm text-[#999] line-through mr-2">${booking.subtotal}</span>
                )}
                <span className="font-bold text-tp-red text-xl font-[var(--font-oswald)]">
                  ${booking.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-[#aaa] mt-3">
            Total rental: {totalDays} days. Extra weight charged at $199/ton (prorated).
          </p>
        </div>
      )}

      {!canProceed && attempted && (
        <div role="alert" aria-live="polite" className="rounded-xl border-2 border-amber-300 bg-amber-50 px-4 py-3 mb-4">
          <p className="text-sm font-semibold text-amber-800 font-[var(--font-poppins)]">
            ⚠️ Before you continue, please choose: {missing.join(" and ")}.
          </p>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg font-[var(--font-poppins)] font-semibold text-sm text-[#666] bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          ← Back
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
          Next: Delivery address →
        </button>
      </div>
    </div>
  );
}
