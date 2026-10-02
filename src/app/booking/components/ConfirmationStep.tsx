"use client";

import { FaPhone, FaCalendarCheck } from "react-icons/fa6";
import type { BookingData } from "./BookingWizard";
import { useBookingLang } from "@/lib/i18n/useBookingLang";
import { formatBookingDate, money, serviceName, sizeName } from "@/lib/i18n/booking";

interface Props {
  booking: BookingData;
}

export default function ConfirmationStep({ booking }: Props) {
  const { lang, t } = useBookingLang();
  const formatDate = (iso: string) => formatBookingDate(lang, iso);
  return (
    <div lang={lang} className="w-[92%] sm:w-[85%] max-w-[600px] mx-auto py-10 text-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
        {/* Success icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCalendarCheck className="text-green-600 text-3xl" />
        </div>

        <h2 className="font-[var(--font-poppins)] text-2xl sm:text-3xl font-bold text-[#333] mb-3">
          {t.confirmation.title}
        </h2>
        <p className="text-sm text-[#888] mb-8 font-[var(--font-poppins)] max-w-md mx-auto">
          {t.confirmation.bodyBefore}
          <strong>{booking.customerPhone}</strong>
          {t.confirmation.bodyAfter}
        </p>

        {/* Summary card */}
        <div className="bg-gray-50 rounded-xl p-5 text-left mb-8">
          <div className="space-y-2 text-sm font-[var(--font-poppins)]">
            <div className="flex justify-between">
              <span className="text-[#888]">{t.confirmation.service}</span>
              <span className="font-semibold">
                {serviceName(lang, booking.service?.serviceType)} — {sizeName(lang, booking.service?.size)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888]">{t.confirmation.delivery}</span>
              <span className="font-semibold">{formatDate(booking.deliveryDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888]">{t.confirmation.pickup}</span>
              <span className="font-semibold">{formatDate(booking.pickupDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888]">{t.confirmation.address}</span>
              <span className="font-semibold text-right">
                {booking.address}, {booking.city}
              </span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span className="font-bold text-[#333]">{t.confirmation.estimatedTotal}</span>
              <span className="font-bold text-tp-red text-lg font-[var(--font-oswald)]">
                {money(lang, booking.totalPrice)}
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#aaa] mb-6 font-[var(--font-poppins)]">
          {t.confirmation.bilingual}
        </p>

        <a
          href="tel:+15106502083"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-[var(--font-poppins)] font-bold text-base bg-tp-red text-white hover:bg-tp-red-dark shadow-lg transition-all duration-200"
        >
          <FaPhone /> {t.confirmation.call}
        </a>
      </div>
    </div>
  );
}
