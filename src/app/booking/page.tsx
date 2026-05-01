import type { Metadata } from "next";
import Header from "@/components/Header";
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

      {/* ── Hero — real worker photo with strong overlay (restored per Cris) ── */}
      <section className="relative pt-28 pb-14 sm:pb-16 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/dumpsters/worker-action.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70" />

        <div className="relative z-10 w-[92%] sm:w-[80%] max-w-[900px] mx-auto">
          <p className="text-tp-gold text-[11px] sm:text-xs font-bold tracking-[0.3em] uppercase font-[var(--font-poppins)] mb-3">
            Bay Area's Most Trusted Hauler
          </p>
          <h1 className="font-[var(--font-oswald)] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase mb-4 tracking-tight leading-[0.95]">
            Book Your Dumpster
          </h1>
          <p className="font-[var(--font-poppins)] text-sm sm:text-base text-white/85 max-w-lg mx-auto">
            Choose your service, pick your dates, get an instant quote.
          </p>
          <div className="mt-5 inline-block bg-tp-red text-white px-5 py-2 rounded-full font-[var(--font-poppins)] text-sm font-bold shadow-lg">
            💰 Save $50 when you book online · Same-day delivery available
          </div>
          <div className="mt-3">
            <a
              href="tel:+15106502083"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-[var(--font-poppins)] transition-colors"
            >
              Or call us: <span className="font-semibold underline">(510) 650-2083</span>
            </a>
          </div>
        </div>
      </section>

      {/* Booking wizard — no FloatingButtons on this page (they obstruct the
          flow; Rent Now/Call Now CTAs aren't needed here since the user is
          already booking). */}
      <section className="bg-[#f5f5f5] min-h-screen pb-20">
        <DynamicBookingWizard />
      </section>

      <Footer />
    </>
  );
}
