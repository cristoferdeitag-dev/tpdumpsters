import type { Metadata } from "next";
import Header from "@/components/Header";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import DynamicBookingWizardV2 from "./components/DynamicBookingWizardV2";

export const metadata: Metadata = {
  title: "Book a Dumpster — TP Dumpsters",
  description:
    "Book your dumpster rental online. Industrial-grade service, instant pricing, same-day delivery in the Bay Area. Call (510) 650-2083.",
  robots: { index: false, follow: false },
};

export default function BookingV2Page() {
  return (
    <>
      <Header />

      {/* Hero — Stitch industrial style */}
      <section className="relative pt-24 sm:pt-28 pb-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/dumpsters/worker-action.jpg')" }}
        />
        <div className="absolute inset-0 bg-tp-red/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 w-[92%] sm:w-[85%] max-w-[900px] mx-auto text-center">
          <div className="inline-block bg-white text-tp-red px-4 py-1.5 mb-4 rounded-full font-[var(--font-poppins)] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-lg">
            💰 Save $50 booking online
          </div>
          <h1 className="font-[var(--font-oswald)] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tighter mb-3">
            Book Your Dumpster
          </h1>
          <p className="font-[var(--font-poppins)] text-sm sm:text-base text-white/90 max-w-md mx-auto">
            Industrial-grade service. Instant pricing. Same-day delivery in the Bay Area.
          </p>
          <a
            href="tel:+15106502083"
            className="inline-flex items-center gap-2 mt-4 text-white/90 hover:text-white text-xs sm:text-sm font-[var(--font-poppins)]"
          >
            Or call us: <span className="font-bold underline">(510) 650-2083</span>
          </a>
        </div>
      </section>

      <section className="bg-[#f5f5f5] min-h-screen pb-20">
        <DynamicBookingWizardV2 />
      </section>

      <FloatingButtons />
      <Footer />
    </>
  );
}
