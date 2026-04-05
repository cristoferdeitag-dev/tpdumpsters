import { FaCalendarDays, FaPhone } from "react-icons/fa6";

export default function ContractorCTA() {
  return (
    <section className="py-20 px-5 bg-[#1a1a1a] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-[var(--font-oswald)] text-3xl md:text-4xl font-bold mb-4 uppercase">
          Ready to Simplify Your Waste Management?
        </h2>
        <p className="font-[var(--font-poppins)] text-lg text-white/70 mb-10 max-w-2xl mx-auto">
          Join dozens of Bay Area contractors who trust TP Dumpsters for reliable, on-time dumpster service.
          Book online in minutes or call us for a custom quote.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <a
            href="/booking"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold bg-tp-red text-white hover:brightness-110 transition-all duration-300 font-[var(--font-poppins)] shadow-lg"
          >
            <FaCalendarDays /> Book Online Now
          </a>
          <a
            href="tel:+15106502083"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold bg-transparent text-white border-2 border-white/30 hover:border-tp-red hover:bg-tp-red transition-all duration-300 font-[var(--font-poppins)]"
          >
            <FaPhone /> (510) 650-2083
          </a>
        </div>

        {/* Trust signals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="font-[var(--font-oswald)] text-4xl font-bold text-tp-red mb-1">20+</p>
            <p className="font-[var(--font-poppins)] text-sm text-white/60">Years Experience</p>
          </div>
          <div>
            <p className="font-[var(--font-oswald)] text-4xl font-bold text-tp-red mb-1">500+</p>
            <p className="font-[var(--font-poppins)] text-sm text-white/60">Jobs Completed</p>
          </div>
          <div>
            <p className="font-[var(--font-oswald)] text-4xl font-bold text-tp-red mb-1">5.0★</p>
            <p className="font-[var(--font-poppins)] text-sm text-white/60">Google Rating</p>
          </div>
          <div>
            <p className="font-[var(--font-oswald)] text-4xl font-bold text-tp-red mb-1">24hr</p>
            <p className="font-[var(--font-poppins)] text-sm text-white/60">Fast Delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
}
