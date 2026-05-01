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
      {/* Hero banner with background image */}
      <section className="relative pt-28 pb-12 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/dumpsters/worker-action.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 w-[92%] sm:w-[80%] max-w-[900px] mx-auto">
          <h1 className="font-[var(--font-oswald)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase mb-3 tracking-wide">
            Book Your Dumpster
          </h1>
          <p className="font-[var(--font-poppins)] text-sm sm:text-base text-white/80 max-w-lg mx-auto">
            Choose your service, pick your dates, and get an instant quote.
            <br />
            <span className="text-tp-gold font-semibold">Same-day delivery available!</span>
          </p>
          <div className="mt-4 inline-block bg-green-500/90 text-white px-5 py-2 rounded-full font-[var(--font-poppins)] text-sm font-bold">
            💰 Save $50 when you book online!
          </div>
          <div className="mt-3">
            <a
              href="tel:+15106502083"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-[var(--font-poppins)] transition-colors"
            >
              Or call us now: <span className="font-semibold underline">(510) 650-2083</span>
            </a>
          </div>
        </div>
      </section>

      {/* Booking wizard — client-only render (no SSR = no hydration issues) */}
      <section className="bg-[#f5f5f5] min-h-screen pb-20">
        <DynamicBookingWizard />
      </section>

      <Footer />
    </>
  );
}
