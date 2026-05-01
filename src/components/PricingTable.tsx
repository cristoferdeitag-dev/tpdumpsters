"use client";

import { useState } from "react";
import { FaCalendarDays, FaRuler, FaWeightHanging, FaCalendarCheck } from "react-icons/fa6";

/* ───────── Data types ───────── */
interface SizeOption {
  size: string;
  price: number | null;
  dimensions: string;
  weightLimit: string;
  rentalDays: string;
}

interface ServiceCategory {
  service: string;
  icon: string;
  description: string;
  note?: string;
  sizes: SizeOption[];
}

/* ───────── Pricing data (same for all cities) ───────── */
const services: ServiceCategory[] = [
  {
    service: "General Debris",
    icon: "🏗️",
    description: "Home remodels, cleanouts, landscaping, light demolition, junk removal",
    note: "⚠️ Mattresses/appliances/tires: $20–$60 each (size dependent, special disposal)",
    sizes: [
      {
        size: "10 Yard",
        price: 649,
        dimensions: "12' L × 8' W × 2.5' H",
        weightLimit: "1 ton",
        rentalDays: "7 days",
      },
      {
        size: "20 Yard",
        price: 699,
        dimensions: "16' L × 8' W × 4' H",
        weightLimit: "2 tons",
        rentalDays: "7 days",
      },
      {
        size: "30 Yard",
        price: 849,
        dimensions: "16' L × 8' W × 6' H",
        weightLimit: "3 tons",
        rentalDays: "7 days",
      },
    ],
  },
  {
    service: "Clean Soil",
    icon: "🌱",
    description: "Clean loads must be 95% pure. No rocks, grass, gravel, mesh, wood, or garbage.",
    sizes: [
      {
        size: "10 Yard",
        price: 649,
        dimensions: "12' L × 8' W × 2.5' H",
        weightLimit: "No weight limit",
        rentalDays: "3 days",
      },
    ],
  },
  {
    service: "Clean Concrete",
    icon: "🧱",
    description: "Clean loads must be 95% pure. No rebar, no garbage.",
    sizes: [
      {
        size: "10 Yard",
        price: 649,
        dimensions: "12' L × 8' W × 2.5' H",
        weightLimit: "No weight limit",
        rentalDays: "3 days",
      },
    ],
  },
  {
    service: "Mixed Materials",
    icon: "🔀",
    description: "Clean soil & concrete mix. Loads must be 95% pure. No rocks, grass, gravel, mesh, wood, rebar, or garbage.",
    sizes: [
      {
        size: "10 Yard",
        price: 799,
        dimensions: "12' L × 8' W × 2.5' H",
        weightLimit: "No weight limit",
        rentalDays: "3 days",
      },
    ],
  },
];

/* ───────── Component ───────── */
interface PricingTableProps {
  cityName?: string;
}

export default function PricingTable({ cityName }: PricingTableProps) {
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const activeService = services[activeServiceIdx];

  return (
    <section className="py-20 bg-[#f9f9f9]">
      <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
        <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
          PRICING
        </h4>
        <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-3">
          Dumpster rental prices{cityName ? ` in ${cityName}` : ""}
        </h2>
        <p className="font-[var(--font-poppins)] text-sm text-[#888] mb-8">
          All prices include delivery, pickup &amp; disposal. No hidden fees.
        </p>

        {/* Service type tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {services.map((svc, idx) => (
            <button
              key={svc.service}
              onClick={() => setActiveServiceIdx(idx)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold font-[var(--font-poppins)] transition-all duration-200 ${
                activeServiceIdx === idx
                  ? "bg-tp-red text-white shadow-md"
                  : "bg-white text-[#555] border border-[#ddd] hover:border-tp-red hover:text-tp-red"
              }`}
            >
              <span>{svc.icon}</span>
              {svc.service}
            </button>
          ))}
        </div>

        {/* Service description */}
        <div className="bg-white rounded-xl p-4 mb-8 border border-[#eee]">
          <p className="font-[var(--font-poppins)] text-sm text-[#666]">
            <strong>{activeService.icon} {activeService.service}:</strong>{" "}
            {activeService.description}
          </p>
          {activeService.note && (
            <p className="font-[var(--font-poppins)] text-xs text-[#999] mt-2">
              {activeService.note}
            </p>
          )}
        </div>

        {/* Price cards */}
        <div className={`grid grid-cols-1 ${activeService.sizes.length > 1 ? "md:grid-cols-3" : "md:grid-cols-1 max-w-md mx-auto"} gap-6`}>
          {activeService.sizes.map((item, idx) => {
            const isPopular = activeService.sizes.length > 1 && idx === 1;
            return (
              <div
                key={item.size}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  isPopular
                    ? "bg-black text-white shadow-xl md:scale-[1.03]"
                    : activeService.sizes.length === 1
                    ? "bg-black text-white shadow-xl"
                    : "bg-white text-[#333] shadow-md hover:shadow-lg"
                }`}
              >
                {isPopular && (
                  <div className="absolute top-0 left-0 right-0 bg-tp-red text-white text-xs font-bold text-center py-1.5 font-[var(--font-poppins)] uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className={`p-8 ${isPopular ? "pt-12" : ""}`}>
                  <h3 className="font-[var(--font-poppins)] text-xl font-bold mb-1">
                    {item.size}
                  </h3>
                  <p className={`text-sm mb-5 ${isPopular || activeService.sizes.length === 1 ? "text-white/70" : "text-[#888]"}`}>
                    {activeService.service}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`text-xs ${isPopular || activeService.sizes.length === 1 ? "text-white/60" : "text-[#aaa]"}`}>
                      Starting at
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`font-[var(--font-oswald)] text-5xl font-bold ${isPopular || activeService.sizes.length === 1 ? "text-white" : "text-tp-red"}`}>
                      ${item.price}
                    </span>
                  </div>

                  {/* Details */}
                  <ul className={`space-y-3 mb-8 text-sm ${isPopular || activeService.sizes.length === 1 ? "text-white/80" : "text-[#666]"}`}>
                    <li className="flex items-center gap-3">
                      <FaRuler className="text-tp-green flex-shrink-0" />
                      {item.dimensions}
                    </li>
                    <li className="flex items-center gap-3">
                      <FaWeightHanging className="text-tp-green flex-shrink-0" />
                      {item.weightLimit}
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCalendarCheck className="text-tp-green flex-shrink-0" />
                      {item.rentalDays} rental included
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-tp-green flex-shrink-0">✓</span>
                      Delivery, pickup &amp; disposal included
                    </li>
                  </ul>

                  <a
                    href="/booking"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg text-base font-semibold transition-colors duration-300 font-[var(--font-poppins)] bg-tp-red text-white hover:bg-tp-red-dark"
                  >
                    <FaCalendarDays /> Book Online
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Extra fees note for General Debris */}
        {activeService.note && (
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
            <p className="font-[var(--font-poppins)] text-sm text-amber-800">
              {activeService.note}
            </p>
          </div>
        )}

        <p className="text-center text-xs text-[#999] mt-6 font-[var(--font-poppins)]">
          Prices may vary based on location and project specifics. Extra weight charged at $125/ton (prorated). Call for a personalized quote.
        </p>
      </div>
    </section>
  );
}
