"use client";

/**
 * Hero de las páginas de reserva. Extraído de `booking/page.tsx` el
 * 18-sep-2026 para que /booking y /booking-v2 usen EL MISMO, y sobre todo
 * para que los tres precios salgan de `@/lib/pricing` en vez de estar
 * escritos a mano: así una bajada de precios no puede dejar el hero atrás
 * (fue justo el bug que se auditó el 17-sep — el sitio anunciando $899 de
 * ladrillo mientras el checkout cobraba $1,100).
 */
import { ONLINE_PRICES, LIST_PREMIUM } from "@/lib/pricing";
import { BookingLangToggle, useBookingLang } from "@/lib/i18n/useBookingLang";

// Hero copy in both languages. Outside a BookingLangProvider the hook
// returns English, so any page that uses the hero without the provider
// keeps rendering exactly as before.
const HERO = {
  en: {
    eyebrow: "Bay Area · Same-day delivery",
    title: "Book your dumpster",
    cta: "Start below: what are you getting rid of?",
    rental: "3–7 day rental · delivery, pickup & disposal included",
    off: "$50 off when you book online",
    talk: "Prefer to talk?",
  },
  es: {
    eyebrow: "Bay Area · Entrega el mismo día",
    title: "Reserve su dumpster",
    cta: "Empiece abajo: ¿de qué se quiere deshacer?",
    rental: "Renta de 3–7 días · entrega, recolección y desecho incluidos",
    off: "$50 de descuento al reservar en línea",
    talk: "¿Prefiere hablar?",
  },
} as const;

const GENERAL = "General Debris";

export default function BookingHero({ cta }: { cta?: string }) {
  const { lang } = useBookingLang();
  const h = HERO[lang];
  const sizes = (["10", "20", "30"] as const).map((yd) => {
    const online = ONLINE_PRICES[GENERAL][yd];
    return { yd, online, list: online + LIST_PREMIUM };
  });

  return (
      <section className="relative pt-24 pb-10 sm:pt-28 sm:pb-14 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/dumpsters/worker-action.jpg')" }}
        />
        {/* Gradiente direccional en vez de velo plano: deja respirar la foto arriba
            y garantiza contraste donde va el texto. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/85" />

        <div className="relative z-10 w-[92%] sm:w-[88%] max-w-[900px] mx-auto text-center">
          {/* Visible language switch above the fold (Spanish ad traffic lands here). */}
          <div className="flex justify-center mb-5">
            <BookingLangToggle />
          </div>
          {/* Eyebrow con reglas — etiqueta de ficha técnica, no decoración */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="hidden sm:block h-px w-10 bg-tp-gold/60" />
            <p className="font-[var(--font-red-hat)] text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.28em] text-tp-gold">
              {h.eyebrow}
            </p>
            <span className="hidden sm:block h-px w-10 bg-tp-gold/60" />
          </div>

          <h1 className="font-[var(--font-oswald)] text-[34px] leading-[1.05] sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-[0.02em]">
            {h.title}
          </h1>

          {/* SIGNATURE: los tres tamaños como placas de especificación.
              Responde "¿cuánto cuesta?" sin scroll y sin abrir el wizard. */}
          <ul className="mt-7 grid grid-cols-3 gap-2 sm:gap-4 max-w-[560px] mx-auto">
            {/* list = precio de lista (basePrice), online = lo que paga reservando aquí.
                Se muestran los dos: el tachado ancla el valor y hace visible el ahorro. */}
            {sizes.map(({ yd, list, online }) => (
              <li
                key={yd}
                className="px-2 py-1 sm:px-4 border-l border-tp-gold/20 first:border-l-0"
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

          {/* Guía al paso 1 con flecha (Asaí, 9-sep-2026): sustituye al clic que
              la gente intentaba hacer sobre las placas de precio. */}
          <p className="mt-4 font-[var(--font-poppins)] text-[12px] sm:text-sm text-white/55">
            {lang === "en" && cta ? cta : h.cta}
          </p>
          <span
            aria-hidden="true"
            className="mt-1 inline-block animate-bounce font-[var(--font-oswald)] text-xl text-tp-gold/70 leading-none"
          >
            ↓
          </span>

          {/* Dos elementos separados a propósito: en una sola línea, "booking online"
              caía sola en el renglón siguiente (palabra viuda) en 390px. */}
          <p className="mt-5 font-[var(--font-poppins)] text-[13px] sm:text-[15px] text-white/75">
            {h.rental}
          </p>
          <p className="mt-2 font-[var(--font-poppins)] text-[13px] sm:text-[15px] font-semibold text-tp-gold">
            {h.off}
          </p>

          <a
            href="tel:+15106502083"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2 font-[var(--font-poppins)] text-sm text-white/85 transition-colors hover:border-tp-gold hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-gold"
          >
            {h.talk} <span className="font-semibold">(510) 650-2083</span>
          </a>
        </div>
      </section>
  );
}
