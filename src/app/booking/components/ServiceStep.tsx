"use client";

import { useState } from "react";
import type { BookingData, ServiceSelection } from "./BookingWizard";
import { trackDumpsterSelected } from "@/lib/tracking";

interface Props {
  booking: BookingData;
  updateBooking: (updates: Partial<BookingData>) => void;
  onNext: () => void;
}

/* ───────── Data types ───────── */
interface SizeOption {
  size: string;
  price: number;
  dimensions: string;
  weightLimit: string;
  rentalDays: number;
}

interface ServiceCategory {
  service: string;
  icon: string;
  description: string;
  note?: string;
  sizes: SizeOption[];
}

/* ───────── Pricing data ───────── */
const GENERAL_SIZES: SizeOption[] = [
  { size: "10 Yard", price: 649, dimensions: "12' L × 8' W × 2.5' H", weightLimit: "1 ton", rentalDays: 7 },
  { size: "20 Yard", price: 699, dimensions: "16' L × 8' W × 4' H", weightLimit: "2 tons", rentalDays: 7 },
  { size: "30 Yard", price: 849, dimensions: "16' L × 8' W × 6' H", weightLimit: "3 tons", rentalDays: 7 },
];

const services: ServiceCategory[] = [
  {
    service: "General Debris",
    icon: "🏗️",
    description: "Home remodels, furniture, junk, light demolition",
    note: "⚠️ Mattresses/appliances/tires: $20–$60 each (size dependent, special disposal)",
    sizes: GENERAL_SIZES,
  },
  {
    service: "Household Clean Out",
    icon: "🏠",
    description: "House & garage cleanouts, furniture removal, decluttering",
    note: "⚠️ Mattresses/appliances/tires: $20–$60 each (size dependent, special disposal)",
    sizes: GENERAL_SIZES,
  },
  {
    service: "Construction Debris",
    icon: "🔨",
    description: "Demolition, remodeling, construction waste",
    sizes: GENERAL_SIZES,
  },
  {
    service: "Roofing",
    icon: "🏚️",
    description: "Shingles, roofing tear-offs, heavy debris",
    sizes: GENERAL_SIZES,
  },
  {
    service: "Green Waste",
    icon: "♻️",
    description: "Landscaping, branches, leaves, yard cleanup, organic debris",
    sizes: GENERAL_SIZES,
  },
  {
    service: "Clean Soil",
    icon: "🌱",
    description: "Must be 95% pure. No rocks, grass, gravel, mesh, wood, or garbage.",
    note: "⚠️ Extra fee: $125 if prohibited items are added",
    sizes: [
      { size: "10 Yard", price: 649, dimensions: "12' L × 8' W × 2.5' H", weightLimit: "No weight limit", rentalDays: 3 },
    ],
  },
  {
    service: "Clean Concrete",
    icon: "🪨",
    description: "Must be 95% pure. No rebar, no garbage.",
    note: "⚠️ Extra fee: $125 if prohibited items are added",
    sizes: [
      { size: "10 Yard", price: 649, dimensions: "12' L × 8' W × 2.5' H", weightLimit: "No weight limit", rentalDays: 3 },
    ],
  },
  {
    service: "Mixed Materials",
    icon: "🔀",
    description: "Clean soil, concrete & bricks mix. Must be 95% pure. No rocks, grass, gravel, mesh, wood, rebar, or garbage.",
    note: "⚠️ Extra fee: $150 if prohibited items are added",
    sizes: [
      { size: "10 Yard", price: 799, dimensions: "12' L × 8' W × 2.5' H", weightLimit: "No weight limit", rentalDays: 3 },
    ],
  },
];

/* ───────── "Best for" subtitles per dumpster size ───────── */
const sizeBestFor: Record<string, string> = {
  "10 Yard": "Best for: Heavy materials or small cleanouts",
  "20 Yard": "Best for: Medium home projects & cleanouts",
  "30 Yard": "Best for: Large renovations & construction",
};

/* ───────── Dumpster illustrations (with embedded dimensions) ───────── */
const sizeImages: Record<string, string> = {
  "10 Yard": "/images/sizes/10-yard.png",
  "20 Yard": "/images/sizes/20-yard.png",
  "30 Yard": "/images/sizes/30-yard.png",
};

export default function ServiceStep({ booking, updateBooking, onNext }: Props) {
  const [activeServiceIdx, setActiveServiceIdx] = useState(() => {
    if (booking.service) {
      const idx = services.findIndex((s) => s.service === booking.service?.serviceType);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  const activeService = services[activeServiceIdx];

  const selectedKey = booking.service
    ? `${booking.service.serviceType}-${booking.service.size}`
    : null;

  const handleSelect = (item: SizeOption) => {
    const service: ServiceSelection = {
      serviceType: activeService.service,
      size: item.size,
      basePrice: item.price,
      baseDays: item.rentalDays,
      weightLimit: item.weightLimit,
      dimensions: item.dimensions,
    };
    updateBooking({ service, extraDays: 0 });
    trackDumpsterSelected(activeService.service, item.size, item.price);
    // Auto-advance to date step (user shouldn't have to scroll to a CTA after
    // explicitly selecting a size). Tiny delay so the selected state flashes
    // before we move on.
    setTimeout(() => onNext(), 350);
  };

  return (
    <div>
      {/* ── Header (original copy preserved) ── */}
      <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
        STEP 1
      </h4>
      <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#222] mb-2">
        Choose your dumpster
      </h2>
      <p className="font-[var(--font-poppins)] text-[15px] text-[#999] mb-10">
        Select the type of waste and dumpster size you need.
      </p>

      {/* ── Service type pills (original red rounded chips) ── */}
      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 mb-10">
        {services.map((svc, idx) => (
          <button
            key={svc.service}
            onClick={() => setActiveServiceIdx(idx)}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold font-[var(--font-poppins)] transition-all duration-200 ${
              activeServiceIdx === idx
                ? "bg-tp-red text-white shadow-md"
                : "bg-[#f5f5f5] text-[#555] border border-[#e5e5e5] hover:border-tp-red hover:text-tp-red"
            }`}
          >
            <span className="text-base">{svc.icon}</span>
            <span className="truncate">{svc.service}</span>
          </button>
        ))}
      </div>

      {/* ── Service description banner ── */}
      <div className="bg-[#fafafa] rounded-2xl px-6 py-4 mb-10 border border-[#eee]">
        <p className="font-[var(--font-poppins)] text-[14px] text-[#555] leading-relaxed">
          <span className="font-semibold text-[#333]">{activeService.icon} {activeService.service}:</span>{" "}
          {activeService.description}
        </p>
        {activeService.note && (
          <p className="font-[var(--font-poppins)] text-xs text-[#aaa] mt-2 leading-relaxed">
            {activeService.note}
          </p>
        )}
      </div>

      {/* ── Price cards ── */}
      <div
        className={`grid grid-cols-1 gap-5 md:gap-6 items-end ${
          activeService.sizes.length === 3
            ? "md:grid-cols-3"
            : activeService.sizes.length === 2
            ? "md:grid-cols-2 max-w-2xl mx-auto"
            : "md:grid-cols-1 max-w-md mx-auto"
        }`}
      >
        {activeService.sizes.map((item, idx) => {
          const key = `${activeService.service}-${item.size}`;
          const isSelected = selectedKey === key;
          const isPopular = activeService.sizes.length === 3 && idx === 1;
          const isFeatured = isPopular || activeService.sizes.length === 1;
          const bestFor = sizeBestFor[item.size] || `Best for: ${activeService.service.toLowerCase()}`;
          const sizeImage = sizeImages[item.size];

          return (
            <button
              key={key}
              onClick={() => handleSelect(item)}
              className={`
                group relative bg-white rounded-2xl text-left transition-all duration-300 cursor-pointer overflow-hidden
                flex flex-col
                hover:-translate-y-1 hover:shadow-2xl
                ${isSelected
                  ? "ring-2 ring-tp-red shadow-[0_8px_30px_rgba(224,43,32,0.18)] md:scale-[1.02] z-10"
                  : isFeatured
                  ? "ring-2 ring-tp-red/70 shadow-[0_4px_24px_rgba(224,43,32,0.12)] md:scale-[1.02] z-10"
                  : "ring-1 ring-[#eee] shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
                }
              `}
            >
              {/* ── Top badge ── */}
              {isSelected ? (
                <div className="bg-tp-red text-white text-[11px] font-bold text-center py-2 font-[var(--font-poppins)] uppercase tracking-widest">
                  ✓ Selected
                </div>
              ) : isPopular ? (
                <div className="bg-tp-red text-white text-[11px] font-bold text-center py-2 font-[var(--font-poppins)] uppercase tracking-widest">
                  ⭐ Most Popular
                </div>
              ) : (
                <div className="h-2" aria-hidden />
              )}

              {/* ── Dumpster illustration (only for the 3 standard sizes) ── */}
              {sizeImage && (
                <div className="bg-[#fafafa] px-4 pt-4 pb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sizeImage}
                    alt={`${item.size} dumpster illustration`}
                    className="w-full h-48 sm:h-52 object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="px-7 pt-5 pb-7 sm:px-7 sm:pb-7 flex-1 flex flex-col">
                {/* ── Title + Best for ── */}
                <h3 className="font-[var(--font-poppins)] text-2xl font-bold text-[#1a1a1a]">
                  {item.size} Dumpster
                </h3>
                <p className="text-xs font-[var(--font-poppins)] text-[#888] mt-1 mb-5">
                  {bestFor}
                </p>

                {/* ── Price ── */}
                <div className="mb-5">
                  <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#bbb] font-[var(--font-poppins)]">
                    Starting at
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-[var(--font-oswald)] text-[44px] leading-none font-bold text-tp-red">
                      ${item.price}
                    </span>
                  </div>
                </div>

                {/* ── Compact spec list (3 bullets) ── */}
                <ul className="space-y-2.5 mb-6 text-sm text-[#444] font-[var(--font-poppins)]">
                  <li className="flex items-center gap-2">
                    <span className="text-tp-gold flex-shrink-0" aria-hidden>📐</span>
                    <span>{item.dimensions}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-tp-gold flex-shrink-0" aria-hidden>⚖️</span>
                    <span>{item.weightLimit} weight included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-tp-gold flex-shrink-0" aria-hidden>📅</span>
                    <span>{item.rentalDays}-day rental, delivery + pickup</span>
                  </li>
                </ul>

                {/* ── CTA button ── */}
                <div
                  className={`mt-auto flex items-center justify-center w-full py-3.5 rounded-xl text-[13px] font-bold uppercase tracking-wider transition-all duration-300 font-[var(--font-poppins)] ${
                    isSelected
                      ? "bg-green-500 text-white"
                      : "bg-tp-red text-white hover:brightness-110"
                  }`}
                >
                  {isSelected ? "✓ Selected" : "Select this dumpster"}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Extra fees note ── */}
      {activeService.note && (
        <div className="mt-8 bg-amber-50/80 border border-amber-200/60 rounded-2xl px-6 py-4 text-center">
          <p className="font-[var(--font-poppins)] text-sm text-amber-700">
            {activeService.note}
          </p>
        </div>
      )}

      <p className="text-center text-xs text-[#bbb] mt-8 mb-2 font-[var(--font-poppins)]">
        Extra weight charged at $135/ton (prorated) · Extra days: $49/day
      </p>
    </div>
  );
}
