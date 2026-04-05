import Image from "next/image";
import { FaCalendarDays } from "react-icons/fa6";

const sizes = [
  {
    name: "10 Yard",
    subtitle: "Best for: Heavy Materials or Small Cleanouts",
    image: "/images/sizes/10-yard.png",
    imageAlt: "9 yard Dumpster in California - TP Dumpsters",
    description: "Compact size, ideal for tight spaces and heavy debris.",
    features: [
      "Clean soil, concrete, bricks",
      "Small landscaping jobs (branches, grass)",
      "Bathroom remodel or minor home updates",
    ],
  },
  {
    name: "20 Yard",
    subtitle: "Best for: Medium Home Projects & Cleanouts",
    image: "/images/sizes/20-yard.png",
    imageAlt: "20 yard Dumpster in California - TP Dumpsters",
    description: "Versatile and popular for most home and renovation projects.",
    features: [
      "Kitchen or bathroom remodels",
      "Roofing projects (up to 30 squares)",
      "Yard cleanups (moderate volume)",
      "Household junk or furniture",
    ],
  },
  {
    name: "30 Yard",
    subtitle: "Best for: Large Renovations & Construction",
    image: "/images/sizes/30-yard.png",
    imageAlt: "30 yard Dumpster in California - TP Dumpsters",
    description: "Extra capacity for contractors or big household cleanups.",
    features: [
      "Whole home cleanouts",
      "Large landscaping or yard removals",
      "Construction & light demolition debris",
      "Multiple-room remodels",
    ],
  },
];

export default function SizesSection() {
  return (
    <section id="sizes" className="py-20 pb-15 bg-white">
      <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
        <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
          SIZES
        </h4>
        <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-10">
          Dumpster sizes &amp; common projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {sizes.map((size) => (
            <div
              key={size.name}
              className="border border-[#e0e0e0] rounded-xl overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
            >
              <div className="px-6 pt-6 pb-4">
                <h3 className="font-[var(--font-poppins)] text-[26px] font-semibold text-[#333] mb-1">
                  {size.name}
                </h3>
                <p className="text-[13px] text-[#888]">{size.subtitle}</p>
              </div>
              <div className="px-6 py-2.5 flex items-center justify-center min-h-[180px]">
                <Image
                  src={size.image}
                  alt={size.imageAlt}
                  width={300}
                  height={160}
                  className="max-h-[160px] object-contain"
                />
              </div>
              <div className="px-6 py-4 flex-1">
                <p className="text-sm text-[#666] mb-4 leading-relaxed">
                  {size.description}
                </p>
                <ul>
                  {size.features.map((feature, i) => (
                    <li
                      key={i}
                      className="text-sm text-[#555] py-[3px] flex items-start gap-1.5 leading-relaxed"
                    >
                      <span className="text-sm flex-shrink-0">&#9989;</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="/booking"
                className="flex items-center justify-center gap-2 w-[calc(100%-50px)] mx-6 mb-6 mt-5 py-3.5 px-5 bg-tp-red text-white rounded-lg text-base font-semibold transition-colors duration-300 hover:bg-tp-red-dark font-[var(--font-poppins)] text-center"
              >
                <FaCalendarDays /> Rent Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
