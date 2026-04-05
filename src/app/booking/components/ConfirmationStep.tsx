"use client";

import { FaPhone, FaCalendarCheck } from "react-icons/fa6";
import type { BookingData } from "./BookingWizard";

interface Props {
  booking: BookingData;
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

export default function ConfirmationStep({ booking }: Props) {
  return (
    <div className="w-[92%] sm:w-[85%] max-w-[600px] mx-auto py-10 text-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
        {/* Success icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCalendarCheck className="text-green-600 text-3xl" />
        </div>

        <h2 className="font-[var(--font-poppins)] text-2xl sm:text-3xl font-bold text-[#333] mb-3">
          Booking request received!
        </h2>
        <p className="text-sm text-[#888] mb-8 font-[var(--font-poppins)] max-w-md mx-auto">
          We&apos;ll confirm your booking shortly. You&apos;ll receive a call or text
          at <strong>{booking.customerPhone}</strong> to finalize the details.
        </p>

        {/* Summary card */}
        <div className="bg-gray-50 rounded-xl p-5 text-left mb-8">
          <div className="space-y-2 text-sm font-[var(--font-poppins)]">
            <div className="flex justify-between">
              <span className="text-[#888]">Service:</span>
              <span className="font-semibold">
                {booking.service?.serviceType} — {booking.service?.size}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888]">Delivery:</span>
              <span className="font-semibold">{formatDate(booking.deliveryDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888]">Pickup:</span>
              <span className="font-semibold">{formatDate(booking.pickupDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888]">Address:</span>
              <span className="font-semibold text-right">
                {booking.address}, {booking.city}
              </span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span className="font-bold text-[#333]">Estimated total:</span>
              <span className="font-bold text-tp-red text-lg font-[var(--font-oswald)]">
                ${booking.totalPrice}
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#aaa] mb-6 font-[var(--font-poppins)]">
          Questions? Call us anytime — we&apos;re bilingual (English & Spanish)
        </p>

        <a
          href="tel:+15106502083"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-[var(--font-poppins)] font-bold text-base bg-tp-red text-white hover:bg-tp-red-dark shadow-lg transition-all duration-200"
        >
          <FaPhone /> Call (510) 650-2083
        </a>
      </div>
    </div>
  );
}
