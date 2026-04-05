"use client";

import { FaCalendarDays } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function SanFranciscoLocation() {
  const sanFranciscoZipCodes = [
    "94102", "94103", "94104", "94105", "94107", "94108",
    "94109", "94110", "94111", "94112", "94114", "94115",
    "94116", "94117", "94118", "94121", "94122", "94123",
    "94124", "94127", "94129", "94130", "94131", "94132",
    "94133", "94134", "94158"
  ];

  return (
    <section id="rent" className="location-bg py-20 pb-15">
      <div className="w-[80%] max-w-[1080px] mx-auto relative">
        <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center">
          SAN FRANCISCO, CALIFORNIA
        </h4>
        <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-white mb-6 text-center">
          Serving All San Francisco Neighborhoods
        </h2>

        {/* Neighborhoods Grid */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {[
              "Mission District",
              "SoMa",
              "Sunset District",
              "Richmond District",
              "Marina",
              "Pacific Heights",
              "Nob Hill",
              "Castro",
              "Haight-Ashbury",
              "Financial District",
              "Potrero Hill",
              "Bayview-Hunters Point"
            ].map((neighborhood) => (
              <div key={neighborhood} className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-tp-red flex-shrink-0" />
                <span className="text-white text-sm font-[var(--font-poppins)]">
                  {neighborhood}
                </span>
              </div>
            ))}
          </div>

          {/* ZIP Codes */}
          <div className="border-t border-white/20 pt-6">
            <h3 className="text-white font-[var(--font-poppins)] text-lg font-semibold mb-3 text-center">
              San Francisco ZIP Codes We Serve
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {sanFranciscoZipCodes.map((zip) => (
                <span
                  key={zip}
                  className="bg-tp-red/80 text-white px-3 py-1 rounded-md text-sm font-[var(--font-poppins)] font-medium"
                >
                  {zip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us for San Francisco */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10">
          <h3 className="text-white font-[var(--font-poppins)] text-xl font-bold mb-6 text-center">
            Why San Francisco Chooses TP Dumpsters
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-tp-red text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="text-white font-semibold mb-1">Local Knowledge</h4>
                <p className="text-white/80 text-sm">We understand SF&apos;s strict permit requirements and navigate tight city streets with ease.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-tp-red text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="text-white font-semibold mb-1">Fast Response</h4>
                <p className="text-white/80 text-sm">Same-day delivery available across most San Francisco ZIP codes.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-tp-red text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="text-white font-semibold mb-1">Transparent Pricing</h4>
                <p className="text-white/80 text-sm">No hidden fees. You know exactly what you&apos;re paying upfront.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-tp-red text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="text-white font-semibold mb-1">Bilingual Team</h4>
                <p className="text-white/80 text-sm">English and Spanish speakers ready to help you book and coordinate.</p>
              </div>
            </div>
          </div>
        </div>

        <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center mt-10">
          FAST AND EASY
        </h4>
        <h2 className="font-[var(--font-poppins)] text-[22px] md:text-[28px] font-bold text-white mb-6 text-center">
          Ready to rent your dumpster in San Francisco?
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
