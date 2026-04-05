import { FaCalendarDays, FaPhone } from "react-icons/fa6";

export default function SanMateoHero() {
  return (
    <section id="home" className="hero-bg relative min-h-screen flex flex-col justify-center items-center pt-[15vh] pb-[6vh] text-center">
      <div className="absolute inset-0 bg-black/45 z-[1]"></div>
      <div className="relative z-[2] px-5 pb-10">
        <div className="mb-6">
          <h3 className="inline-block bg-tp-gold-dark text-white px-6 py-2 text-[13px] md:text-base font-bold rounded-[3px] font-[var(--font-poppins)]">
            Dumpster Rentals in San Mateo, California
          </h3>
        </div>
        <h1 className="font-[var(--font-oswald)] text-[28px] sm:text-[3rem] lg:text-[5rem] font-extrabold text-white uppercase leading-[1.1] mb-4 tracking-wide">
          SAN MATEO DUMPSTER RENTAL
        </h1>
        <h2 className="font-[var(--font-poppins)] text-base sm:text-[1.6rem] lg:text-[2rem] font-semibold text-white italic mb-2">
          Serving all San Mateo neighborhoods
        </h2>
        <p className="font-[var(--font-poppins)] text-sm sm:text-lg text-white/90 mb-8 max-w-3xl mx-auto">
          Downtown • Hillsdale • Bay Meadows • Beresford • Fiesta Gardens • San Mateo Park • Hayward Park • Laurelwood
        </p>
        <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-4 flex-wrap">
          <a href="/booking" className="inline-flex items-center gap-2 w-full sm:w-auto justify-center px-7 py-3 rounded-lg text-lg font-semibold bg-tp-red text-white hover:bg-tp-red-dark transition-all duration-300 font-[var(--font-poppins)]">
            <FaCalendarDays /> Book Online
          </a>
          <a href="tel:+15106502083" className="inline-flex items-center gap-2 w-full sm:w-auto justify-center px-7 py-3 rounded-lg text-lg font-semibold bg-transparent text-white border-2 border-tp-red hover:bg-tp-red hover:text-white transition-all duration-300 font-[var(--font-poppins)]">
            <FaPhone /> Get a Quote
          </a>
        </div>
      </div>
      <div className="relative z-[2] flex flex-col lg:flex-row justify-center gap-5 lg:gap-10 w-[90%] lg:w-[80%] max-w-[1080px] mx-auto px-6 py-6 md:px-8 lg:px-10 lg:py-8 bg-white/15 backdrop-blur-[10px] rounded-[10px] mt-5 -mb-[30px]">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48"><circle cx="24" cy="24" r="24" fill="#fbeaea"/><path d="M24 8C24 8 12 13 12 13v10c0 8.5 5.1 14.3 12 17 6.9-2.7 12-8.5 12-17V13L24 8z" fill="none" stroke="#E02B20" strokeWidth="2.2"/><path d="M24 11.5L15 15.2v7.8c0 6.8 4 11.5 9 13.5 5-2 9-6.7 9-13.5v-7.8L24 11.5z" fill="#E02B20" opacity="0.15"/><path d="M21.5 23.5l2.5 2.5 5-5" fill="none" stroke="#E02B20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div>
            <h4 className="text-white font-[var(--font-poppins)] text-base font-bold mb-1">Same-Day Service</h4>
            <p className="text-white/85 text-[13px] leading-relaxed">Fast delivery across all San Mateo ZIP codes</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48"><circle cx="24" cy="24" r="24" fill="#fbeaea"/><circle cx="24" cy="16" r="4.5" fill="#E02B20"/><circle cx="15" cy="18" r="3.5" fill="#E02B20"/><circle cx="33" cy="18" r="3.5" fill="#E02B20"/><path d="M24 22c-4 0-7 2.5-7 5.5V30h14v-2.5c0-3-3-5.5-7-5.5z" fill="#E02B20"/><path d="M15 23c-2.8 0-5 1.8-5 4v2h6v-3c0-1.2.4-2.2 1-3.1-.6-.1-1.3-.1-2 .1zM33 23c.7-.2 1.4-.2 2-.1.6.9 1 1.9 1 3.1v3h-6v-2c0-2.2 1.2-3 3-4z" fill="#E02B20"/></svg>
          </div>
          <div>
            <h4 className="text-white font-[var(--font-poppins)] text-base font-bold mb-1">Bilingual Support</h4>
            <p className="text-white/85 text-[13px] leading-relaxed">English &amp; Spanish &mdash; no miscommunication</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48"><circle cx="24" cy="24" r="24" fill="#fbeaea"/><path d="M24 10 L28 18 L37 19 L30.5 25 L32 34 L24 29.5 L16 34 L17.5 25 L11 19 L20 18 Z" fill="#E02B20"/></svg>
          </div>
          <div>
            <h4 className="text-white font-[var(--font-poppins)] text-base font-bold mb-1">San Mateo Experts</h4>
            <p className="text-white/85 text-[13px] leading-relaxed">We know San Mateo&apos;s neighborhoods &amp; regulations</p>
          </div>
        </div>
      </div>
    </section>
  );
}
