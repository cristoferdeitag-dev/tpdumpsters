"use client";

import dynamic from "next/dynamic";
import { BookingLangProvider, useBookingLang } from "@/lib/i18n/useBookingLang";

function LoadingForm() {
  const { t } = useBookingLang();
  return (
    <div className="w-[92%] sm:w-[85%] max-w-[900px] mx-auto py-10">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-tp-red border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-[#888] font-[var(--font-poppins)]">{t.common.loadingForm}</p>
        </div>
      </div>
    </div>
  );
}

const BookingWizard = dynamic(
  () => import("./BookingWizard"),
  {
    ssr: false,
    loading: () => <LoadingForm />,
  }
);

// The language provider wraps the wizard (and its loader) so the EN/ES
// choice is shared by every step without touching the booking state.
export default function DynamicBookingWizard() {
  return (
    <BookingLangProvider>
      <BookingWizard />
    </BookingLangProvider>
  );
}
