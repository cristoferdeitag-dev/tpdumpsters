"use client";

import { FaCalendarDays } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function AlamedaLocation() {
  const alamedaZipCodes = ["94501", "94502"];

  return (
    <section id="rent" className="location-bg py-20 pb-15">
      <div className="w-[80%] max-w-[1080px] mx-auto relative">
        <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center">
          ALAMEDA, CALIFORNIA
        </h4>
        <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-white mb-6 text-center">
          Serving All of Alameda Island &amp; Bay Farm
        </h2>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {[
              "Downtown Alameda",
              "West End",
              "East End",
              "Bay Farm Island",
              "Harbor Bay",
              "Fernside",
              "Gold Coast",
              "Ballena Bay",
              "Alameda Point",
              "Oakland",
              "San Leandro",
              "Emeryville",
            ].map((neighborhood) => (
              <div key={neighborhood} className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-tp-red flex-shrink-0" />
                <span className="text-white text-sm font-[var(--font-poppins)]">{neighborhood}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/20 pt-6">
            <h3 className="text-white font-[var(--font-poppins)] text-lg font-semibold mb-3 text-center">
              Alameda ZIP Codes We Serve
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {alamedaZipCodes.map((zip) => (
                <span key={zip} className="bg-tp-red/80 text-white px-3 py-1 rounded-md text-sm font-[var(--font-poppins)] font-medium">
                  {zip}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10">
          <h3 className="text-white font-[var(--font-poppins)] text-xl font-bold mb-6 text-center">
            Why Alameda Chooses TP Dumpsters
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-tp-red text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="text-white font-semibold mb-1">Island-Ready Fleet</h4>
                <p className="text-white/80 text-sm">Our trucks navigate Alameda&apos;s bridges and narrow streets daily — no access issues, ever.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-tp-red text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="text-white font-semibold mb-1">Small Lot Friendly</h4>
                <p className="text-white/80 text-sm">Compact 10-yard dumpsters fit tight Alameda driveways and smaller Victorian-era lots.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-tp-red text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="text-white font-semibold mb-1">No Hidden Fees</h4>
                <p className="text-white/80 text-sm">Transparent pricing. What we quote is what you pay — no surprise charges on delivery day.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-tp-red text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="text-white font-semibold mb-1">Bilingual Team</h4>
                <p className="text-white/80 text-sm">English and Spanish speakers ready to help you book and coordinate your rental.</p>
              </div>
            </div>
          </div>
        </div>

        <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center mt-10">
          FAST AND EASY
        </h4>
        <h2 className="font-[var(--font-poppins)] text-[22px] md:text-[28px] font-bold text-white mb-6 text-center">
          Ready to rent your dumpster in Alameda?
        </h2>
        <a
          href="tel:+15106502083"
          className="flex items-center justify-center gap-2 w-full py-[18px] px-5 bg-tp-red text-white rounded-lg text-xl font-semibold transition-colors duration-300 hover:bg-tp-red-dark font-[var(--font-poppins)] text-center"
        >
          <FaCalendarDays /> Call (510) 650-2083
        </a>
      </div>
    </section>
  );
}
