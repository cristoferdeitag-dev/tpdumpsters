"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { FaCircleCheck, FaPhone, FaCalendarDays, FaLocationDot, FaCreditCard } from "react-icons/fa6";
import { trackBookingCompleted } from "@/lib/tracking";

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id") || "N/A";

  // Track booking completed
  useEffect(() => {
    trackBookingCompleted(bookingId, 0);
  }, [bookingId]);

  return (
    <section className="min-h-screen bg-[#f5f5f5] py-12">
      <div className="w-[92%] sm:w-[85%] max-w-[700px] mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
          {/* Success icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCircleCheck className="text-tp-green text-4xl" />
          </div>

          <h1 className="font-[var(--font-poppins)] text-3xl font-bold text-[#333] mb-2">
            Booking Confirmed! 🎉
          </h1>
          <p className="font-[var(--font-poppins)] text-[#666] mb-2">
            Payment received — your dumpster rental is confirmed.
          </p>

          {/* Booking ID */}
          <div className="bg-gray-50 rounded-xl p-4 inline-block my-6">
            <p className="font-[var(--font-poppins)] text-xs text-[#888] uppercase tracking-wider mb-1">
              Booking Reference
            </p>
            <p className="font-[var(--font-oswald)] text-3xl font-bold text-tp-red tracking-wider">
              {bookingId}
            </p>
          </div>

          {/* What happens next */}
          <div className="text-left bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="font-[var(--font-poppins)] font-bold text-[#333] mb-4">
              What happens next?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaCreditCard className="text-tp-green flex-shrink-0 mt-1" />
                <div>
                  <p className="font-[var(--font-poppins)] text-sm font-semibold text-[#333]">Payment confirmed</p>
                  <p className="font-[var(--font-poppins)] text-xs text-[#888]">Your receipt has been sent to your email.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaCalendarDays className="text-tp-red flex-shrink-0 mt-1" />
                <div>
                  <p className="font-[var(--font-poppins)] text-sm font-semibold text-[#333]">Delivery scheduled</p>
                  <p className="font-[var(--font-poppins)] text-xs text-[#888]">Our team will deliver the dumpster on your selected date between 7:00 AM – 6:00 PM.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaLocationDot className="text-tp-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="font-[var(--font-poppins)] text-sm font-semibold text-[#333]">Placement</p>
                  <p className="font-[var(--font-poppins)] text-xs text-[#888]">Our driver will place the dumpster at your specified location. Make sure the area is clear and accessible.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaPhone className="text-tp-green flex-shrink-0 mt-1" />
                <div>
                  <p className="font-[var(--font-poppins)] text-sm font-semibold text-[#333]">Need changes?</p>
                  <p className="font-[var(--font-poppins)] text-xs text-[#888]">Call us at (510) 650-2083 for any modifications.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Cancellation policy */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-left">
            <p className="font-[var(--font-poppins)] text-xs text-amber-800">
              <strong>Cancellation policy:</strong> Cancel more than 24 hours before delivery for a 90% refund. Cancellations within 24 hours of delivery are non-refundable.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-lg font-[var(--font-poppins)] font-semibold text-sm bg-tp-red text-white hover:bg-tp-red-dark transition-colors"
            >
              Back to Home
            </Link>
            <a
              href="tel:+15106502083"
              className="px-6 py-3 rounded-lg font-[var(--font-poppins)] font-semibold text-sm bg-gray-100 text-[#333] hover:bg-gray-200 transition-colors"
            >
              📞 Call (510) 650-2083
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
