import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicBookingWizardV2 from "./components/DynamicBookingWizardV2";

export const metadata: Metadata = {
  title: "Book a Dumpster — TP Dumpsters",
  description:
    "Book your dumpster rental online. Industrial-grade service, instant pricing, same-day delivery in the Bay Area. Call (510) 650-2083.",
  robots: { index: false, follow: false },
};

// Literal port of the Stitch "Industrial Integrity" landing template
// (see /docs/stitch-booking-v2/), adapted for desktop. The Stitch source is
// mobile-only; on lg+ we keep the same chrome but let the grid grow to a
// 1200px container and lay the size cards out 3-up.
export default function BookingV2Page() {
  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-[var(--font-inter)] antialiased min-h-screen">
      <Header />

      {/* Hero — Stitch's compact red block. The dumpster photo sits behind a
          deep-red overlay (mix-blend-overlay opacity-60) so it reads as
          texture, not focal subject. */}
      <section className="relative pt-24 sm:pt-28">
        <div className="relative h-48 sm:h-64 lg:h-72 flex items-center justify-center overflow-hidden bg-[#c8202f]">
          <img
            src="/images/dumpsters/worker-action.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
          />
          <div className="relative z-10 text-center px-4 max-w-[1200px] mx-auto">
            <div className="inline-block bg-white text-[#a2001c] px-3 py-1 mb-3 rounded-full font-[var(--font-inter)] text-[11px] sm:text-xs uppercase tracking-widest font-bold shadow-lg">
              Save $50 Online
            </div>
            <h1 className="font-[var(--font-work-sans)] text-white uppercase tracking-tighter text-3xl sm:text-5xl lg:text-6xl font-black">
              Book Your Dumpster
            </h1>
          </div>
        </div>
      </section>

      <DynamicBookingWizardV2 />

      <Footer />
    </div>
  );
}
