import {
  FaTruck,
  FaRecycle,
  FaCalendarCheck,
  FaHandshake,
  FaHelmetSafety,
  FaCreditCard,
} from "react-icons/fa6";

const benefits = [
  {
    icon: <FaTruck className="text-3xl text-tp-red" />,
    title: "Same-Day & Next-Day Delivery",
    text: "We know downtime costs money. Get your dumpster delivered the same day you call — keep your crew working, not waiting.",
  },
  {
    icon: <FaCalendarCheck className="text-3xl text-tp-red" />,
    title: "Flexible Rental Periods",
    text: "Projects change. Extend your rental, schedule early pickups, or swap sizes mid-project — no penalties, no hassle.",
  },
  {
    icon: <FaRecycle className="text-3xl text-tp-red" />,
    title: "All Debris Types Accepted",
    text: "Construction debris, roofing shingles, concrete, dirt, mixed materials — we handle it all. One call, one solution.",
  },
  {
    icon: <FaHelmetSafety className="text-3xl text-tp-red" />,
    title: "We Understand Construction",
    text: "Our team speaks your language. We know what a 20-yard can hold, when you need a swap, and how to place it right.",
  },
  {
    icon: <FaCreditCard className="text-3xl text-tp-red" />,
    title: "Transparent Pricing",
    text: "No hidden fees, no surprise charges. You know exactly what you're paying before you book. Volume discounts available.",
  },
  {
    icon: <FaHandshake className="text-3xl text-tp-red" />,
    title: "Dedicated Account Support",
    text: "Repeat contractors get priority scheduling, dedicated support, and streamlined billing. Build a relationship, not just a rental.",
  },
];

export default function WhyContractors() {
  return (
    <section className="py-20 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-[var(--font-oswald)] text-3xl md:text-4xl font-bold text-center text-[#222] mb-3 uppercase">
          Why Contractors Choose TP Dumpsters
        </h2>
        <p className="font-[var(--font-poppins)] text-base text-[#888] text-center mb-14 max-w-2xl mx-auto">
          We&apos;re not just a rental company — we&apos;re your waste management partner on every job.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="bg-[#fafafa] rounded-2xl p-8 border border-[#eee] hover:shadow-lg hover:border-tp-red/20 transition-all duration-300"
            >
              <div className="mb-5">{b.icon}</div>
              <h3 className="font-[var(--font-poppins)] text-lg font-bold text-[#222] mb-3">
                {b.title}
              </h3>
              <p className="font-[var(--font-poppins)] text-sm text-[#666] leading-relaxed">
                {b.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
