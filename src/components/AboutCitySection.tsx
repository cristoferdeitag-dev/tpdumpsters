import { FaMapMarkerAlt } from "react-icons/fa";

interface AboutCitySectionProps {
  cityName: string;
  intro: string;
  highlights: string[];
  commonProjects: string[];
  closingText: string;
}

export default function AboutCitySection({
  cityName,
  intro,
  highlights,
  commonProjects,
  closingText,
}: AboutCitySectionProps) {
  return (
    <section className="py-20 bg-[#f9f9f9]">
      <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
        <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
          ABOUT {cityName.toUpperCase()}
        </h4>
        <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-6">
          Dumpster Rental Services in {cityName}, California
        </h2>
        <p className="font-[var(--font-poppins)] text-[15px] text-[#555] leading-[1.8] mb-8">
          {intro}
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Why locals need dumpsters */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-[var(--font-poppins)] text-lg font-bold text-[#333] mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-tp-red" />
              Why {cityName} residents choose us
            </h3>
            <ul className="space-y-3">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-tp-red font-bold mt-0.5">✓</span>
                  <span className="font-[var(--font-poppins)] text-sm text-[#555] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common projects */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-[var(--font-poppins)] text-lg font-bold text-[#333] mb-4 flex items-center gap-2">
              🏗️ Common projects in {cityName}
            </h3>
            <ul className="space-y-3">
              {commonProjects.map((project, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-tp-gold font-bold mt-0.5">→</span>
                  <span className="font-[var(--font-poppins)] text-sm text-[#555] leading-relaxed">
                    {project}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="font-[var(--font-poppins)] text-[15px] text-[#555] leading-[1.8]">
          {closingText}
        </p>
      </div>
    </section>
  );
}
