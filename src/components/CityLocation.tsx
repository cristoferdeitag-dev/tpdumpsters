import Link from "next/link";
import { FaCalendarDays, FaPhone } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

// Shared "where we deliver" block for city landing pages: verified
// neighborhoods, verified ZIP codes and links to nearby city pages.

interface CityLocationProps {
  cityName: string;
  heading: string;
  neighborhoods: string[];
  zips: string[];
  nearby: { name: string; href: string }[];
}

export default function CityLocation({ cityName, heading, neighborhoods, zips, nearby }: CityLocationProps) {
  return (
    <section id="rent" className="location-bg py-20 pb-15">
      <div className="w-[88%] sm:w-[80%] max-w-[1080px] mx-auto relative">
        <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center">
          {cityName.toUpperCase()}, CALIFORNIA
        </h4>
        <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-white mb-6 text-center">
          {heading}
        </h2>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-10">
          <h3 className="text-white font-[var(--font-poppins)] text-lg font-semibold mb-4 text-center">
            {cityName} neighborhoods
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {neighborhoods.map((n) => (
              <div key={n} className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-tp-red flex-shrink-0" />
                <span className="text-white text-sm font-[var(--font-poppins)]">{n}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/20 pt-6 mb-6">
            <h3 className="text-white font-[var(--font-poppins)] text-lg font-semibold mb-3 text-center">
              {cityName} ZIP codes
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {zips.map((zip) => (
                <span key={zip} className="bg-tp-red/80 text-white px-3 py-1 rounded-md text-sm font-[var(--font-poppins)] font-medium">
                  {zip}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-white/20 pt-6">
            <h3 className="text-white font-[var(--font-poppins)] text-lg font-semibold mb-3 text-center">
              Nearby cities we also serve
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {nearby.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-md text-sm font-[var(--font-poppins)] font-medium transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center mt-10">
          FAST AND EASY
        </h4>
        <h2 className="font-[var(--font-poppins)] text-[22px] md:text-[28px] font-bold text-white mb-6 text-center">
          Ready to rent your dumpster in {cityName}?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/booking"
            className="flex-1 flex items-center justify-center gap-2 py-[18px] px-5 bg-tp-red text-white rounded-lg text-xl font-semibold transition-colors duration-300 hover:bg-tp-red-dark font-[var(--font-poppins)] text-center"
          >
            <FaCalendarDays /> Book Online
          </a>
          <a
            href="tel:+15106502083"
            className="flex-1 flex items-center justify-center gap-2 py-[18px] px-5 bg-transparent border-2 border-tp-red text-white rounded-lg text-xl font-semibold transition-colors duration-300 hover:bg-tp-red font-[var(--font-poppins)] text-center"
          >
            <FaPhone /> (510) 650-2083
          </a>
        </div>
      </div>
    </section>
  );
}
