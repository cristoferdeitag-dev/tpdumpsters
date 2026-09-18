import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingHero from "@/components/BookingHero";
import DynamicBookingWizard from "./components/DynamicBookingWizard";

export const metadata: Metadata = {
  title: "Book a Dumpster Online | TP Dumpsters - Bay Area",
  description:
    "Book your dumpster rental online. Choose your size, pick your dates, and get an instant quote. Same-day delivery available in the Bay Area. Call (510) 650-2083",
  alternates: {
    canonical: "https://tpdumpsters.com/booking",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BookingPage() {
  return (
    <>
      <Header />
      {/* Hero — "placa de especificación": el visitante que llega de un anuncio de
          "dumpster rental cost" ve tamaño y precio antes de hacer scroll. Los precios
          son los de reserva online de GENERAL_SIZES (ServiceStep); la lista es $50 más. */}
      <BookingHero />

      {/* Booking wizard — client-only render (no SSR = no hydration issues) */}
      <section id="booking" className="scroll-mt-20 bg-[#f5f5f5] min-h-screen pb-20">
        <DynamicBookingWizard />
      </section>

      <Footer />
    </>
  );
}
