import type { Metadata } from "next";
import Header from "@/components/Header";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import DynamicBookingWizard from "./components/DynamicBookingWizard";

export const metadata: Metadata = {
  title: "Book a Dumpster Online | TP Dumpsters - Bay Area",
  description:
    "Book your dumpster rental online. Choose your size, pick your dates, and get an instant quote. Same-day delivery available in the Bay Area. Call (510) 650-2083",
  robots: {
    index: true,
    follow: true,
  },
};

export default function BookingPage() {
  return (
    <>
      <Header />

      {/* ── Savings ribbon — Stitch-style red bar above the hero ── */}
      <div className="bg-tp-red text-white text-center py-2.5 text-[12px] font-bold tracking-[0.18em] uppercase font-[var(--font-poppins)] mt-[80px]">
        💰 Save $50 when you book online · Same-day delivery available
      </div>

      {/* ── Hero — bold charcoal slab, industrial language ── */}
      <section className="relative bg-[#1a1a1a] text-white overflow-hidden">
        {/* subtle red diagonal accent */}
        <div
          aria-hidden
          className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #E02B20 0%, transparent 60%)" }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 py-14 sm:py-20 text-center">
          <p className="text-tp-gold text-[11px] sm:text-xs font-bold tracking-[0.3em] uppercase font-[var(--font-poppins)] mb-3">
            Bay Area's Most Trusted Hauler
          </p>
          <h1 className="font-[var(--font-oswald)] text-[42px] sm:text-[64px] lg:text-[80px] font-extrabold uppercase leading-[0.95] tracking-tight">
            Book Your<br />
            <span className="text-tp-red">Dumpster</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-[15px] sm:text-base text-white/70 font-[var(--font-poppins)]">
            Choose your size, pick your dates, get a price — done in under 3 minutes.
          </p>
          <a
            href="tel:+15106502083"
            className="inline-flex items-center gap-2 mt-7 text-white/60 hover:text-tp-gold text-[13px] font-[var(--font-poppins)] transition-colors"
          >
            <span>Or call</span>
            <span className="font-bold underline underline-offset-2 decoration-1">(510) 650-2083</span>
          </a>
        </div>
      </section>

      {/* ── Booking wizard — sits on warm cream background, like Stitch ── */}
      <section className="bg-[#fbf9f8] min-h-screen pb-24">
        <DynamicBookingWizard />
      </section>

      <FloatingButtons />
      <Footer />
    </>
  );
}
