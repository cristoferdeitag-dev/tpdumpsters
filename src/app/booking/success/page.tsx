import { Suspense } from "react";
import SuccessContent from "./SuccessContent";

export const metadata = {
  title: "Booking Confirmed | TP Dumpsters",
  description: "Your dumpster rental booking has been confirmed and paid.",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-tp-red border-t-transparent rounded-full mx-auto mb-4" />
            <p className="font-[var(--font-poppins)] text-[#666]">
              Loading confirmation...
            </p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
