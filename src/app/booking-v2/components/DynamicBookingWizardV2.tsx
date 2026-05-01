"use client";

import dynamic from "next/dynamic";

const BookingWizardV2 = dynamic(() => import("./BookingWizardV2"), {
  ssr: false,
  loading: () => (
    <div className="w-[92%] sm:w-[85%] max-w-[900px] mx-auto py-10">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-tp-red border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-[#888] font-[var(--font-poppins)]">Loading booking form...</p>
        </div>
      </div>
    </div>
  ),
});

export default function DynamicBookingWizardV2() {
  return <BookingWizardV2 />;
}
