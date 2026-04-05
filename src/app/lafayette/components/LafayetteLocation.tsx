"use client";

import { FaCalendarDays } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function LafayetteLocation() {
  const lafayetteZipCodes = ["94549"];

  return (
    <section id="rent" className="location-bg py-20 pb-15">
      <div className="w-[80%] max-w-[1080px] mx-auto relative">
        <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center">
          LAFAYETTE, CALIFORNIA
        </h4>
        <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-white mb-6 text-center">
          Serving All Lafayette &amp; Lamorinda
        </h2>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {[
              "Downtown Lafayette",
              "Happy Valley",
              "Burton Valley",
              "Reliez Valley",
              "Springhill",
              "Trail",
              "Acalanes Ridge",
              "Saranap",
              "Orinda",
              "Moraga",
              "Walnut Creek",
              "Pleasant Hill",
            ].map((neighborhood) => (
              <div key={neighborhood} className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-tp-red flex-shrink-0" />
                <span className="text-white text-sm font-[var(--font-poppins)]">{neighborhood}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/20 pt-6">
            <h3 className="text-white font-[var(--font-poppins)] text-lg font-semibold mb-3 text-center">
              Lafayette ZIP Codes We Serve
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {lafayetteZipCodes.map((zip) => (
                <span key={zip} className="bg-tp-red/80 text-white px-3 py-1 rounded-md text-sm font-[var(--font-poppins)] font-medium">
                  {zip}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10">
          <h3 className="text-white font-[var(--font-poppins)] text-xl font-bold mb-6 text-center">
            Why Lafayette Chooses TP Dumpsters
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-tp-red text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="text-white font-semibold mb-1">Hillside Delivery Pros</h4>
                <p className="text-white/80 text-sm">We navigate Lafayette&apos;s steep driveways and narrow hillside roads with precision every delivery.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-tp-red text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="text-white font-semibold mb-1">HOA Compliant</h4>
                <p className="text-white/80 text-sm">We understand Lafayette&apos;s strict HOA requirements and place dumpsters cleanly and discreetly.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-tp-red text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="text-white font-semibold mb-1">Transparent Pricing</h4>
                <p className="text-white/80 text-sm">Flat-rate pricing with no hidden fees — what we quote is what you pay, guaranteed.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-tp-red text-2xl flex-shrink-0">✓</div>
              <div>
                <h4 className="text-white font-semibold mb-1">Remodel Specialists</h4>
                <p className="text-white/80 text-sm">Lafayette is a remodeling hub — we handle kitchen, bath, and whole-home renovation debris daily.</p>
              </div>
            </div>
          </div>
        </div>

        <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center mt-10">
          FAST AND EASY
        </h4>
        <h2 className="font-[var(--font-poppins)] text-[22px] md:text-[28px] font-bold text-white mb-6 text-center">
          Ready to rent your dumpster in Lafayette?
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
