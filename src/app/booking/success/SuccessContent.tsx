"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaCircleCheck,
  FaPhone,
  FaCalendarDays,
  FaLocationDot,
  FaCreditCard,
  FaFileInvoice,
  FaMapLocationDot,
  FaEnvelope,
} from "react-icons/fa6";
import { trackBookingCompleted } from "@/lib/tracking";

type SessionInfo = {
  bookingId: string | null;
  customerName: string | null;
  customerEmail: string | null;
  address: string | null;
  city: string | null;
  zipCode: string | null;
  deliveryDate: string | null;
  deliveryWindow: string | null;
  pickupDate: string | null;
  dumpsterSize: string | null;
  serviceType: string | null;
  amountTotal: number | null;
  paymentStatus?: string | null;
  hostedInvoiceUrl: string | null;
  invoicePdf: string | null;
};

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingIdParam = searchParams.get("booking_id") || "N/A";
  const sessionId = searchParams.get("session_id");
  const [info, setInfo] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [tracked, setTracked] = useState(false);

  // Fire the booking conversion ONCE, with the real amount paid (revenue) so
  // Google optimizes toward actual sales value — not a $0 placeholder.
  useEffect(() => {
    if (tracked) return;

    if (!sessionId) {
      // No checkout session to read the amount from — still record the booking.
      trackBookingCompleted(bookingIdParam, 0);
      setTracked(true);
      setLoading(false);
      return;
    }

    fetch(`/api/checkout/session?id=${encodeURIComponent(sessionId)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: SessionInfo | null) => {
        setInfo(data);
        // Only count (and celebrate) PAID sessions — an open/abandoned
        // session reaching this URL must not fire a false Ads conversion.
        const paid = !data || data.paymentStatus == null || data.paymentStatus === "paid";
        if (paid) {
          trackBookingCompleted(
            data?.bookingId || bookingIdParam,
            data?.amountTotal || 0
          );
        }
        setTracked(true);
      })
      .catch(() => setInfo(null))
      .finally(() => setLoading(false));
  }, [sessionId, bookingIdParam, tracked]);

  const bookingId = info?.bookingId || bookingIdParam;
  const fullAddress =
    info?.address && info?.city
      ? `${info.address}, ${info.city}${info.zipCode ? ` ${info.zipCode}` : ""}`
      : null;
  const mapsUrl = fullAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`
    : null;

  const unpaid = info != null && info.paymentStatus != null && info.paymentStatus !== "paid";

  if (unpaid) {
    return (
      <section className="min-h-screen bg-[#f5f5f5] py-12">
        <div className="w-[92%] sm:w-[85%] max-w-[700px] mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
            <h1 className="font-[var(--font-poppins)] text-2xl font-bold text-[#333] mb-2">
              Payment not completed
            </h1>
            <p className="font-[var(--font-poppins)] text-[#666] mb-6">
              This booking hasn&apos;t been paid yet. If you just paid, give it a minute and refresh —
              otherwise you can restart your booking or call us.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href="/booking" className="px-6 py-3 rounded-lg font-[var(--font-poppins)] font-bold text-sm bg-tp-red text-white hover:bg-tp-red-dark transition-colors">
                Restart booking
              </a>
              <a href="tel:+15106502083" className="px-6 py-3 rounded-lg font-[var(--font-poppins)] font-semibold text-sm border-2 border-tp-red text-tp-red hover:bg-tp-red hover:text-white transition-colors">
                (510) 650-2083
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
          {info?.customerEmail && (
            <p className="font-[var(--font-poppins)] text-xs text-[#888] mb-2">
              Check your inbox at <strong>{info.customerEmail}</strong> for both emails below.
            </p>
          )}

          {/* Booking ID */}
          <div className="bg-gray-50 rounded-xl p-4 inline-block my-6">
            <p className="font-[var(--font-poppins)] text-xs text-[#888] uppercase tracking-wider mb-1">
              Booking Reference
            </p>
            <p className="font-[var(--font-oswald)] text-3xl font-bold text-tp-red tracking-wider">
              {bookingId}
            </p>
            {info?.amountTotal != null && (
              <p className="font-[var(--font-poppins)] text-sm text-[#666] mt-2">
                Total paid: <strong>${info.amountTotal.toFixed(2)}</strong>
              </p>
            )}
          </div>

          {/* Booking details (if loaded) */}
          {info && (info.deliveryDate || fullAddress || info.dumpsterSize) && (
            <div className="text-left bg-white border border-gray-200 rounded-xl p-5 mb-6">
              <h3 className="font-[var(--font-poppins)] font-bold text-[#333] mb-3 text-sm uppercase tracking-wider">
                Your Booking
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {info.dumpsterSize && (
                  <>
                    <dt className="text-[#888]">Dumpster</dt>
                    <dd className="text-[#333] font-medium">
                      {info.dumpsterSize}
                      {info.serviceType ? ` — ${info.serviceType}` : ""}
                    </dd>
                  </>
                )}
                {info.deliveryDate && (
                  <>
                    <dt className="text-[#888]">Delivery</dt>
                    <dd className="text-[#333] font-medium">
                      {info.deliveryDate}
                      {info.deliveryWindow ? ` — ${info.deliveryWindow}` : ""}
                    </dd>
                  </>
                )}
                {info.pickupDate && (
                  <>
                    <dt className="text-[#888]">Pickup</dt>
                    <dd className="text-[#333] font-medium">{info.pickupDate}</dd>
                  </>
                )}
                {fullAddress && (
                  <>
                    <dt className="text-[#888]">Address</dt>
                    <dd className="text-[#333] font-medium">{fullAddress}</dd>
                  </>
                )}
              </dl>
              {mapsUrl && (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-tp-red text-sm font-semibold hover:underline"
                >
                  <FaMapLocationDot /> View delivery location on Google Maps
                </a>
              )}
            </div>
          )}

          {/* Emails coming */}
          <div className="text-left bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
            <h3 className="font-[var(--font-poppins)] font-bold text-[#333] mb-3 text-sm flex items-center gap-2">
              <FaEnvelope className="text-blue-600" /> 2 emails on the way (1-2 min)
            </h3>
            <ul className="space-y-2 text-sm text-[#444]">
              <li>
                📧 <strong>Payment receipt</strong> from Stripe — confirms your charge with date and amount.
              </li>
              <li>
                📄 <strong>Invoice PDF</strong> — full rental terms, dates, and your booking ID for your records.
              </li>
            </ul>
            <p className="text-xs text-[#666] mt-3">
              Don&apos;t see them? Check your spam folder or
              {info?.hostedInvoiceUrl ? (
                <>
                  {" "}view your invoice now:
                </>
              ) : null}
            </p>
            {info?.hostedInvoiceUrl && (
              <a
                href={info.hostedInvoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-white border border-blue-300 rounded-lg text-blue-700 text-sm font-semibold hover:bg-blue-100 transition-colors"
              >
                <FaFileInvoice /> View Invoice
              </a>
            )}
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
                  <p className="font-[var(--font-poppins)] text-xs text-[#888]">
                    Your card has been charged successfully. Receipt and invoice arrive by email.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaCalendarDays className="text-tp-red flex-shrink-0 mt-1" />
                <div>
                  <p className="font-[var(--font-poppins)] text-sm font-semibold text-[#333]">Delivery scheduled</p>
                  <p className="font-[var(--font-poppins)] text-xs text-[#888]">
                    Our team will deliver on your selected date and window. We&apos;ll text you 30 min before arrival.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaLocationDot className="text-tp-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="font-[var(--font-poppins)] text-sm font-semibold text-[#333]">Placement</p>
                  <p className="font-[var(--font-poppins)] text-xs text-[#888]">
                    Our driver will place the dumpster at your specified location. Make sure the area is clear and accessible.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaPhone className="text-tp-green flex-shrink-0 mt-1" />
                <div>
                  <p className="font-[var(--font-poppins)] text-sm font-semibold text-[#333]">Need to change or cancel?</p>
                  <p className="font-[var(--font-poppins)] text-xs text-[#888]">
                    Call (510) 650-2083 or email info@tpdumpsters.com. Quote your booking ID <strong>{bookingId}</strong>.
                  </p>
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

          {loading && (
            <p className="text-xs text-[#aaa] mt-6">Loading booking details…</p>
          )}
        </div>
      </div>
    </section>
  );
}
