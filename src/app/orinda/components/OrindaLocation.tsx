"use client";

import { FaCalendarDays } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function OrindaLocation() {
  const orindaZipCodes = ["94563"];

  return (
    <section id="rent" className="location-bg py-20 pb-15">
      <div className="w-[80%] max-w-[1080px] mx-auto relative">
        <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center">
          ORINDA, CALIFORNIA
        </h4>
        <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-white mb-6 text-center">
          Serving Orinda &amp; the Lamorinda Area
        </h2>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {[
              "Downtown Orinda",
              "Orinda Village",
              "Glorietta",
              "Sleepy Hollow",
              "Orinda Country Club",
              "Orindawoods",
              "Lafayette",
              "Moraga",
              "Walnut Creek",
              "Berkeley Hills",
            ].map((neighborhood) => (
              <div key={neighborhood} className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-tp-red flex-shrink-0" />
                <span className="text-white text-sm font-[var(--font-poppins)]">{neighborhood}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/20 pt-6">
            <h3 className="text-white font-[var(--font-poppins)] text-lg font-semibold mb-3 text-center">
              Orinda ZIP Codes We Serve
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {orindaZipCodes.map((zip) => (
                <span key={zip} className="bg-tp-red/80 text-white px-3 py-1 rounded-md text-sm font-[var(--font-poppins)] font-medium">
                  {zip}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10">
          <h3 className="text-white font-[var(--font-poppins)] text-xl font-bold mb-6 text-center">
            Why Orinda Chooses TP Dumpsters
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-tp-red text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="text-white font-semibold mb-1">Estate Renovation Experts</h4>
                <p className="text-white/80 text-sm">Orinda&apos;s large hillside homes generate major renovation debris — we have the capacity to handle it all.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-tp-red text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="text-white font-semibold mb-1">Canyon Road Navigation</h4>
                <p className="text-white/80 text-sm">Our experienced drivers handle Orinda&apos;s winding roads and steep driveways with care.</p>
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
          Ready to rent your dumpster in Orinda?
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
