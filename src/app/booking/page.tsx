import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
      <section className="relative pt-24 pb-10 sm:pt-28 sm:pb-14 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/dumpsters/worker-action.jpg')" }}
        />
        {/* Gradiente direccional en vez de velo plano: deja respirar la foto arriba
            y garantiza contraste donde va el texto. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/85" />

        <div className="relative z-10 w-[92%] sm:w-[88%] max-w-[900px] mx-auto text-center">
          {/* Eyebrow con reglas — etiqueta de ficha técnica, no decoración */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="hidden sm:block h-px w-10 bg-tp-gold/60" />
            <p className="font-[var(--font-red-hat)] text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.28em] text-tp-gold">
              Bay Area · Same-day delivery
            </p>
            <span className="hidden sm:block h-px w-10 bg-tp-gold/60" />
          </div>

          <h1 className="font-[var(--font-oswald)] text-[34px] leading-[1.05] sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-[0.02em]">
            Book your dumpster
          </h1>

          {/* SIGNATURE: los tres tamaños como placas de especificación.
              Responde "¿cuánto cuesta?" sin scroll y sin abrir el wizard. */}
          <ul className="mt-7 grid grid-cols-3 gap-2 sm:gap-4 max-w-[560px] mx-auto">
            {/* list = precio de lista (basePrice), online = lo que paga reservando aquí.
                Se muestran los dos: el tachado ancla el valor y hace visible el ahorro. */}
            {[
              { yd: "10", list: "649", online: "599" },
              { yd: "20", list: "749", online: "699" },
              { yd: "30", list: "849", online: "799" },
            ].map(({ yd, list, online }) => (
              <li
                key={yd}
                className="rounded-lg border border-tp-gold/35 bg-white/[0.07] backdrop-blur-sm px-2 py-3 sm:px-4 sm:py-4"
              >
                <div className="font-[var(--font-oswald)] text-white leading-none">
                  <span className="text-[26px] sm:text-4xl font-bold">{yd}</span>
                  <span className="ml-1 text-[11px] sm:text-sm font-medium tracking-widest text-white/60 align-top">
                    YD
                  </span>
                </div>
                <div className="mt-2 h-px w-full bg-tp-gold/25" />
                <p className="mt-2 font-[var(--font-poppins)] text-[12px] sm:text-sm text-white/45 line-through leading-none">
                  ${list}
                </p>
                <p className="mt-1 font-[var(--font-oswald)] text-tp-gold leading-none">
                  <span className="text-[13px] sm:text-base align-top">$</span>
                  <span className="text-[22px] sm:text-3xl font-bold">{online}</span>
                </p>
              </li>
            ))}
          </ul>

          {/* Dos elementos separados a propósito: en una sola línea, "booking online"
              caía sola en el renglón siguiente (palabra viuda) en 390px. */}
          <p className="mt-5 font-[var(--font-poppins)] text-[13px] sm:text-[15px] text-white/75">
            3–7 day rental · delivery &amp; pickup included
          </p>
          <p className="mt-2 font-[var(--font-poppins)] text-[13px] sm:text-[15px] font-semibold text-tp-gold">
            $50 off when you book online
          </p>

          <a
            href="tel:+15106502083"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2 font-[var(--font-poppins)] text-sm text-white/85 transition-colors hover:border-tp-gold hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-gold"
          >
            Prefer to talk? <span className="font-semibold">(510) 650-2083</span>
          </a>
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
