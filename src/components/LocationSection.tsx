"use client";

import dynamic from "next/dynamic";
import { FaCalendarDays } from "react-icons/fa6";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden mb-5 bg-gray-800 animate-pulse" />
  ),
});

export default function LocationSection() {
  return (
    <section id="rent" className="location-bg py-20 pb-15">
      <div className="w-[80%] max-w-[1080px] mx-auto relative">
        <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center">
          BAY AREA
        </h4>
        <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-white mb-8 text-center">
          We&apos;re local, and everywhere
        </h2>
        <LeafletMap />
        <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center mt-10">
          FAST AND EASY
        </h4>
        <h2 className="font-[var(--font-poppins)] text-[22px] md:text-[28px] font-bold text-white mb-6 text-center">
          Ready to rent your dumpster?
        </h2>
        <a
          href="/booking"
          className="flex items-center justify-center gap-2 w-full py-[18px] px-5 bg-tp-red text-white rounded-lg text-xl font-semibold transition-colors duration-300 hover:bg-tp-red-dark font-[var(--font-poppins)] text-center"
        >
          <FaCalendarDays /> Book Online
        </a>
      </div>
    </section>
  );
}
