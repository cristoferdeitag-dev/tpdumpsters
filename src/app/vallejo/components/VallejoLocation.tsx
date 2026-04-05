"use client";

import { FaCalendarDays } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function VallejoLocation() {
  const vallejoZipCodes = ["94589", "94590", "94591", "94592"];

  return (
    <section id="rent" className="location-bg py-20 pb-15">
      <div className="w-[80%] max-w-[1080px] mx-auto relative">
        <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center">
          VALLEJO, CALIFORNIA
        </h4>
        <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-white mb-6 text-center">
          Serving Vallejo &amp; Solano County
        </h2>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {[
              "Downtown Vallejo",
              "Glen Cove",
              "South Vallejo",
              "Hiddenbrooke",
              "Country Club Crest",
              "Mare Island",
              "Springs",
              "Beverly Hills",
              "Benicia",
              "American Canyon",
              "Hercules",
              "Crockett",
            ].map((neighborhood) => (
              <div key={neighborhood} className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-tp-red flex-shrink-0" />
                <span className="text-white text-sm font-[var(--font-poppins)]">{neighborhood}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/20 pt-6">
            <h3 className="text-white font-[var(--font-poppins)] text-lg font-semibold mb-3 text-center">
              Vallejo ZIP Codes We Serve
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {vallejoZipCodes.map((zip) => (
                <span key={zip} className="bg-tp-red/80 text-white px-3 py-1 rounded-md text-sm font-[var(--font-poppins)] font-medium">
                  {zip}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10">
          <h3 className="text-white font-[var(--font-poppins)] text-xl font-bold mb-6 text-center">
            Why Vallejo Chooses TP Dumpsters
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-tp-red text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="text-white font-semibold mb-1">Waterfront City Experts</h4>
                <p className="text-white/80 text-sm">From Mare Island redevelopment to Downtown renovations, we understand Vallejo&apos;s unique project needs.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-tp-red text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="text-white font-semibold mb-1">Solano County Coverage</h4>
                <p className="text-white/80 text-sm">One call covers Vallejo, Benicia, American Canyon, and all surrounding communities.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-tp-red text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="text-white font-semibold mb-1">No Hidden Fees</h4>
                <p className="text-white/80 text-sm">Transparent pricing — what we quote is what you pay. No surprise charges on delivery.</p>
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
          Ready to rent your dumpster in Vallejo?
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
