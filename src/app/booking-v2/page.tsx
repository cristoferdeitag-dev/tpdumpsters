import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingHero from "@/components/BookingHero";
import BookingV2 from "./components/BookingV2";

/**
 * /booking-v2 — el flujo nuevo con agente (GO de Cris, 18-sep-2026 msg 22052).
 *
 * Vive APARTE de /booking a propósito: así se puede probar con tráfico real
 * sin tocar el que hoy cobra, y compararlos con ventas de Stripe antes de
 * reemplazar nada. Por eso va con `noindex`: no queremos que Google lo
 * indexe ni que compita con /booking en búsquedas mientras es un ensayo.
 */
export const metadata: Metadata = {
  title: "Book a Dumpster Online | TP Dumpsters - Bay Area",
  description:
    "Tell us what you're getting rid of and we'll match you with the right dumpster. Same-day delivery in the Bay Area. Call (510) 650-2083",
  alternates: { canonical: "https://tpdumpsters.com/booking" },
  robots: { index: false, follow: false },
};

export default function BookingV2Page() {
  return (
    <>
      <Header />
      <BookingHero cta="Two ways to start — pick yours below." />
      <section id="booking" className="scroll-mt-20 bg-[#f7f7f8] min-h-screen pb-20">
        <BookingV2 />
      </section>
      <Footer />
    </>
  );
}
