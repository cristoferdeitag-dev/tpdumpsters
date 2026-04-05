import { FaCalendarDays, FaPhone } from "react-icons/fa6";

export default function ContractorsHero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center pt-[15vh] pb-[6vh] text-center"
      style={{
        backgroundImage: "url('/images/dumpsters/construction-site.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />

      {/* Content */}
      <div className="relative z-[2] px-5 pb-10">
        <div className="mb-6">
          <h3 className="inline-block bg-tp-gold-dark text-white px-6 py-2 text-[13px] md:text-base font-bold rounded-[3px] font-[var(--font-poppins)]">
            Built for Contractors &amp; Construction Professionals
          </h3>
        </div>
        <h1 className="font-[var(--font-oswald)] text-[28px] sm:text-[3rem] lg:text-[5rem] font-extrabold text-white uppercase leading-[1.1] mb-4 tracking-wide">
          CONTRACTOR DUMPSTER RENTAL
        </h1>
        <h2 className="font-[var(--font-poppins)] text-base sm:text-[1.6rem] lg:text-[2rem] font-semibold text-white italic mb-2">
          Reliable roll-off dumpsters for every job site
        </h2>
        <p className="font-[var(--font-poppins)] text-sm sm:text-lg text-white/90 mb-8 max-w-3xl mx-auto">
          Remodeling • Demolition • Roofing • New Construction • Landscaping • Commercial Projects
        </p>
        <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-4 flex-wrap">
          <a
            href="/booking"
            className="inline-flex items-center gap-2 w-full sm:w-auto justify-center px-7 py-3 rounded-lg text-lg font-semibold bg-tp-red text-white hover:bg-tp-red-dark transition-all duration-300 font-[var(--font-poppins)]"
          >
            <FaCalendarDays /> Book a Dumpster
          </a>
          <a
            href="tel:+15106502083"
            className="inline-flex items-center gap-2 w-full sm:w-auto justify-center px-7 py-3 rounded-lg text-lg font-semibold bg-transparent text-white border-2 border-tp-red hover:bg-tp-red hover:text-white transition-all duration-300 font-[var(--font-poppins)]"
          >
            <FaPhone /> Call (510) 650-2083
          </a>
        </div>
      </div>

      {/* Features Bar */}
      <div className="relative z-[2] flex flex-col lg:flex-row justify-center gap-5 lg:gap-10 w-[90%] lg:w-[80%] max-w-[1080px] mx-auto px-6 py-6 md:px-8 lg:px-10 lg:py-8 bg-white/15 backdrop-blur-[10px] rounded-[10px] mt-5 -mb-[30px]">
        {/* Feature 1 */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
              <circle cx="24" cy="24" r="24" fill="#fbeaea" />
              <path d="M14 32h20l-2-12H16l-2 12zm4-8h12" fill="none" stroke="#E02B20" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M18 20v-4a6 6 0 0112 0v4" fill="none" stroke="#E02B20" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="24" cy="27" r="2" fill="#E02B20" />
            </svg>
          </div>
          <div>
            <h4 className="text-white font-[var(--font-poppins)] text-base font-bold mb-1">Same-Day Delivery</h4>
            <p className="text-white/85 text-[13px] leading-relaxed">Keep your project on schedule — no delays</p>
          </div>
        </div>
        {/* Feature 2 */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
              <circle cx="24" cy="24" r="24" fill="#fbeaea" />
              <rect x="13" y="14" width="22" height="18" rx="3" fill="none" stroke="#E02B20" strokeWidth="2.2" />
              <path d="M13 20h22M20 14v4M28 14v4" stroke="#E02B20" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M19 25l3 3 6-6" fill="none" stroke="#E02B20" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h4 className="text-white font-[var(--font-poppins)] text-base font-bold mb-1">Flexible Scheduling</h4>
            <p className="text-white/85 text-[13px] leading-relaxed">Extend rentals, swap sizes — we adapt to you</p>
          </div>
        </div>
        {/* Feature 3 */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
              <circle cx="24" cy="24" r="24" fill="#fbeaea" />
              <path d="M16 34V18l8-6 8 6v16H16z" fill="none" stroke="#E02B20" strokeWidth="2.2" />
              <rect x="21" y="26" width="6" height="8" fill="#E02B20" opacity="0.3" />
              <path d="M21 26h6v8h-6z" fill="none" stroke="#E02B20" strokeWidth="2" />
            </svg>
          </div>
          <div>
            <h4 className="text-white font-[var(--font-poppins)] text-base font-bold mb-1">Contractor-Friendly</h4>
            <p className="text-white/85 text-[13px] leading-relaxed">We understand construction — volume pricing available</p>
          </div>
        </div>
      </div>
    </section>
  );
}
