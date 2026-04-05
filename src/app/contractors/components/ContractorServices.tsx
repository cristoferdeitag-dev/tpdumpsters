const services = [
  {
    icon: "🔨",
    title: "Construction & Demolition",
    description:
      "Remodeling debris, drywall, framing, fixtures — our 10, 20, and 30 yard dumpsters handle any construction project from kitchen renovations to full tear-downs.",
    sizes: "10, 20 & 30 Yard",
    image: "/images/dumpsters/construction-site.jpg",
  },
  {
    icon: "🏚️",
    title: "Roofing Projects",
    description:
      "Shingles, underlayment, flashing — roofing debris is heavy. We offer dumpsters sized specifically for roofing tear-offs with appropriate weight limits.",
    sizes: "10, 20 & 30 Yard",
    image: "/images/dumpsters/commercial-tarped.jpg",
  },
  {
    icon: "🌿",
    title: "Landscaping & Yard Waste",
    description:
      "Branches, sod, dirt, stumps — whether you're clearing a backyard or redesigning a commercial landscape, we've got the right dumpster.",
    sizes: "10, 20 & 30 Yard",
    image: "/images/dumpsters/yard-waste-driveway.jpg",
  },
  {
    icon: "🧱",
    title: "Concrete, Brick & Asphalt",
    description:
      "Heavy materials need proper handling. Our 10-yard dumpsters for concrete and brick come with no weight limit — load it up.",
    sizes: "10 Yard (no weight limit)",
    image: "/images/dumpsters/dumpster-dirt-sunny.jpg",
  },
  {
    icon: "🌱",
    title: "Clean Soil & Dirt",
    description:
      "Excavation, grading, or foundation work generates a lot of clean soil. Our dedicated soil dumpsters have no weight limit and 3-day rentals.",
    sizes: "10 Yard (no weight limit)",
    image: "/images/dumpsters/worker-action.jpg",
  },
  {
    icon: "🏠",
    title: "Cleanouts & Gut Jobs",
    description:
      "Property flips, estate cleanouts, tenant turnovers — clear everything out fast so your crew can start the real work.",
    sizes: "10, 20 & 30 Yard",
    image: "/images/dumpsters/delivery-residential.jpg",
  },
];

export default function ContractorServices() {
  return (
    <section className="py-20 px-5 bg-[#f8f8f8]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-[var(--font-oswald)] text-3xl md:text-4xl font-bold text-center text-[#222] mb-3 uppercase">
          Dumpster Rentals for Every Type of Job
        </h2>
        <p className="font-[var(--font-poppins)] text-base text-[#888] text-center mb-14 max-w-2xl mx-auto">
          From small remodels to large-scale commercial projects — we have the right dumpster for your job site.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl overflow-hidden border border-[#eee] hover:shadow-lg transition-all duration-300"
            >
              {/* Service image */}
              <div className="h-44 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-7">
              <span className="text-4xl mb-4 block">{s.icon}</span>
              <h3 className="font-[var(--font-poppins)] text-lg font-bold text-[#222] mb-2">
                {s.title}
              </h3>
              <p className="font-[var(--font-poppins)] text-sm text-[#666] leading-relaxed mb-4">
                {s.description}
              </p>
              <span className="inline-block bg-tp-red/10 text-tp-red text-xs font-semibold px-3 py-1.5 rounded-full font-[var(--font-poppins)]">
                {s.sizes}
              </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold bg-tp-red text-white hover:bg-tp-red-dark transition-all duration-300 font-[var(--font-poppins)] shadow-lg shadow-red-500/20"
          >
            Book Your Contractor Dumpster →
          </a>
        </div>
      </div>
    </section>
  );
}
