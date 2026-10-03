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
} from "react-icons/fa6";
import { trackBookingCompleted } from "@/lib/tracking";
import { BookingLangProvider, BookingLangToggle, useBookingLang } from "@/lib/i18n/useBookingLang";
import { formatBookingDate, money, serviceName, sizeName, type Lang } from "@/lib/i18n/booking";

// Dates arrive from Stripe metadata as yyyy-mm-dd; English shows them as
// always (raw), Spanish formats them. Anything else is shown untouched.
function showDate(lang: Lang, d: string): string {
  return lang === "es" && /^\d{4}-\d{2}-\d{2}$/.test(d) ? formatBookingDate(lang, d) : d;
}

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
  hostedInvoiceUrl: string | null;
  invoicePdf: string | null;
};

// Same EN/ES choice as the wizard (remembered in localStorage, or ?lang=es).
export default function SuccessContent() {
  return (
    <BookingLangProvider>
      <SuccessInner />
    </BookingLangProvider>
  );
}

function SuccessInner() {
  const { lang, t } = useBookingLang();
  const searchParams = useSearchParams();
  const bookingIdParam = searchParams.get("booking_id") || "N/A";
  const sessionId = searchParams.get("session_id");
  const [info, setInfo] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [tracked, setTracked] = useState(false);

  // Payment is done — drop the saved wizard progress so the next visit to
  // /booking starts clean instead of resuming a paid session. Key mirrors
  // WIZARD_STORAGE_KEY in BookingWizard (kept as a literal: importing the
  // wizard bundle here just for a constant isn't worth it).
  useEffect(() => {
    try {
      localStorage.removeItem("tp_wizard_v1");
    } catch {
      /* storage blocked — harmless, restore has its own staleness guard */
    }
  }, []);

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
        trackBookingCompleted(
          data?.bookingId || bookingIdParam,
          data?.amountTotal || 0
        );
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

  return (
    <section lang={lang} className="min-h-screen bg-[#f5f5f5] py-12">
      <div className="w-[92%] sm:w-[85%] max-w-[700px] mx-auto">
        <div className="flex justify-end mb-4">
          <BookingLangToggle />
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
          {/* TP logo — same asset as the site header (Asaí, 28-jul) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo/TP.png"
            alt="TP Dumpsters"
            className="h-14 w-auto mx-auto mb-5"
          />
          {/* Success icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCircleCheck className="text-tp-green text-4xl" />
          </div>

          <h1 className="font-[var(--font-poppins)] text-3xl font-bold text-[#333] mb-2">
            {t.success.title}
          </h1>
          <p className="font-[var(--font-poppins)] text-[#666] mb-2">
            {t.success.subtitle}
          </p>
          {info?.customerEmail && (
            <p className="font-[var(--font-poppins)] text-xs text-[#888] mb-2">
              {t.success.inboxBefore}
              <strong>{info.customerEmail}</strong>
              {t.success.inboxAfter}
            </p>
          )}

          {/* Booking ID */}
          <div className="bg-gray-50 rounded-xl p-4 inline-block my-6">
            <p className="font-[var(--font-poppins)] text-xs text-[#888] uppercase tracking-wider mb-1">
              {t.success.reference}
            </p>
            <p className="font-[var(--font-oswald)] text-3xl font-bold text-tp-red tracking-wider">
              {bookingId}
            </p>
            {info?.amountTotal != null && (
              <p className="font-[var(--font-poppins)] text-sm text-[#666] mt-2">
                {t.success.totalPaid}
                <strong>{money(lang, info.amountTotal, true)}</strong>
              </p>
            )}
          </div>

          {/* Booking details (if loaded) */}
          {info && (info.deliveryDate || fullAddress || info.dumpsterSize) && (
            <div className="text-left bg-white border border-gray-200 rounded-xl p-5 mb-6">
              <h3 className="font-[var(--font-poppins)] font-bold text-[#333] mb-3 text-sm uppercase tracking-wider">
                {t.success.yourBooking}
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {info.dumpsterSize && (
                  <>
                    <dt className="text-[#888]">{t.success.dumpster}</dt>
                    <dd className="text-[#333] font-medium">
                      {sizeName(lang, info.dumpsterSize)}
                      {info.serviceType ? ` — ${serviceName(lang, info.serviceType)}` : ""}
                    </dd>
                  </>
                )}
                {info.deliveryDate && (
                  <>
                    <dt className="text-[#888]">{t.success.delivery}</dt>
                    <dd className="text-[#333] font-medium">
                      {showDate(lang, info.deliveryDate)}
                      {info.deliveryWindow ? ` — ${info.deliveryWindow}` : ""}
                    </dd>
                  </>
                )}
                {info.pickupDate && (
                  <>
                    <dt className="text-[#888]">{t.success.pickup}</dt>
                    <dd className="text-[#333] font-medium">{showDate(lang, info.pickupDate)}</dd>
                  </>
                )}
                {fullAddress && (
                  <>
                    <dt className="text-[#888]">{t.success.address}</dt>
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
                  <FaMapLocationDot /> {t.success.viewMap}
                </a>
              )}
            </div>
          )}

          {/* Recibo y factura, PARA DESCARGAR AQUÍ.
              Asaí, 17-sep-2026: antes esto prometía "2 emails on the way" y los
              clientes no los recibían, así que quedaban esperando un correo que
              no llegaba. Ahora el recibo y la factura se toman de esta misma
              pantalla — que es donde Stripe los deja — y no se promete ningún
              envío. La página de Stripe (hosted_invoice_url) ya trae su propio
              botón de descarga e impresión. */}
          <div className="text-left bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
            <h3 className="font-[var(--font-poppins)] font-bold text-[#333] mb-3 text-sm flex items-center gap-2">
              <FaFileInvoice className="text-blue-600" /> {t.success.receiptTitle}
            </h3>
            {info?.hostedInvoiceUrl || info?.invoicePdf ? (
              <>
                <p className="text-sm text-[#444]">
                  {t.success.receiptBody}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {info?.hostedInvoiceUrl && (
                    <a
                      href={info.hostedInvoiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-300 rounded-lg text-blue-700 text-sm font-semibold hover:bg-blue-100 transition-colors"
                    >
                      <FaFileInvoice /> {t.success.viewReceipt}
                    </a>
                  )}
                  {info?.invoicePdf && (
                    <a
                      href={info.invoicePdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-300 rounded-lg text-blue-700 text-sm font-semibold hover:bg-blue-100 transition-colors"
                    >
                      <FaFileInvoice /> {t.success.downloadPdf}
                    </a>
                  )}
                </div>
              </>
            ) : (
              /* Stripe tarda un instante en emitir la factura. Nunca dejar la
                 frase colgando ni prometer un correo: se dice qué hacer. */
              <p className="text-sm text-[#444]">
                {t.success.invoicePendingBefore}
                <a href="tel:+15106502083" className="font-semibold text-blue-700">
                  (510) 650-2083
                </a>
                {t.success.invoicePendingAfter}
              </p>
            )}
          </div>

          {/* What happens next */}
          <div className="text-left bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="font-[var(--font-poppins)] font-bold text-[#333] mb-4">
              {t.success.whatNext}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaCreditCard className="text-tp-green flex-shrink-0 mt-1" />
                <div>
                  <p className="font-[var(--font-poppins)] text-sm font-semibold text-[#333]">{t.success.paidTitle}</p>
                  <p className="font-[var(--font-poppins)] text-xs text-[#888]">
                    {t.success.paidBody}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaCalendarDays className="text-tp-red flex-shrink-0 mt-1" />
                <div>
                  <p className="font-[var(--font-poppins)] text-sm font-semibold text-[#333]">{t.success.scheduledTitle}</p>
                  <p className="font-[var(--font-poppins)] text-xs text-[#888]">
                    {t.success.scheduledBody}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaLocationDot className="text-tp-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="font-[var(--font-poppins)] text-sm font-semibold text-[#333]">{t.success.placementTitle}</p>
                  <p className="font-[var(--font-poppins)] text-xs text-[#888]">
                    {t.success.placementBody}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaPhone className="text-tp-green flex-shrink-0 mt-1" />
                <div>
                  <p className="font-[var(--font-poppins)] text-sm font-semibold text-[#333]">{t.success.changeTitle}</p>
                  <p className="font-[var(--font-poppins)] text-xs text-[#888]">
                    {t.success.changeBefore}
                    <strong>{bookingId}</strong>
                    {t.success.changeAfter}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Cancellation policy */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-left">
            <p className="font-[var(--font-poppins)] text-xs text-amber-800">
              <strong>{t.success.policyLabel}</strong>
              {t.success.policyText}
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-lg font-[var(--font-poppins)] font-semibold text-sm bg-tp-red text-white hover:bg-tp-red-dark transition-colors"
            >
              {t.success.backHome}
            </Link>
            <a
              href="tel:+15106502083"
              className="px-6 py-3 rounded-lg font-[var(--font-poppins)] font-semibold text-sm bg-gray-100 text-[#333] hover:bg-gray-200 transition-colors"
            >
              {t.success.call}
            </a>
          </div>

          {loading && (
            <p className="text-xs text-[#aaa] mt-6">{t.success.loadingDetails}</p>
          )}
        </div>
      </div>
    </section>
  );
}
