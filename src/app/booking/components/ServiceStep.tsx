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

/* ───────── Dumpster photos (real outdoor shots, Stitch-style cards) ─────────
   Pulled from /public/images/dumpsters/ — actual TP red dumpsters in the
   field, no studio illustrations. Cropped via object-cover in the card. */
const sizeImages: Record<string, string> = {
  "10 Yard": "/images/dumpsters/dumpster-dirt-sunny.jpg",
  "20 Yard": "/images/dumpsters/delivery-residential.jpg",
  "30 Yard": "/images/dumpsters/construction-site.jpg",
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

      {/* ── Price cards (Stitch-literal structure: full-bleed image at
            top, MOST POPULAR sticker absolute, header row with title left
            + price right, check_circle bullets, full-width SELECT THIS
            DUMPSTER button. Only TP's red/gold tokens replace Stitch's
            primary color.) ── */}
      <div
        className={`grid grid-cols-1 gap-6 ${
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
          const bestFor = sizeBestFor[item.size] || `Best for ${activeService.service.toLowerCase()}`;
          const sizeImage = sizeImages[item.size];

          return (
            <button
              key={key}
              onClick={() => handleSelect(item)}
              className={`
                relative bg-white rounded-lg overflow-hidden text-left
                transition-all duration-300 cursor-pointer
                ${isSelected || isFeatured
                  ? "border-2 border-tp-red shadow-[0_4px_20px_rgba(224,43,32,0.12)]"
                  : "border border-[#e4e2e2] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)]"
                }
              `}
            >
              {/* MOST POPULAR sticker — absolute, top-left */}
              {isPopular && !isSelected && (
                <div className="absolute top-4 left-4 z-10 bg-tp-red text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded">
                  Most Popular
                </div>
              )}
              {isSelected && (
                <div className="absolute top-4 left-4 z-10 bg-tp-red text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded">
                  ✓ Selected
                </div>
              )}

              {/* Full-bleed image header */}
              {sizeImage && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={sizeImage}
                  alt={`${item.size} dumpster`}
                  className="w-full h-48 object-cover bg-[#fafafa]"
                  loading="lazy"
                />
              )}

              <div className="p-6">
                {/* Title row: name+tagline left, price right */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-[var(--font-poppins)] text-xl font-bold text-[#1a1a1a] leading-tight">
                      {item.size} Dumpster
                    </h4>
                    <p className="text-[13px] text-[#5f5e5e] mt-1 font-[var(--font-poppins)]">
                      {bestFor}
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="text-[10px] font-bold text-[#5f5e5e] block uppercase tracking-wider">
                      Starting at
                    </span>
                    <span className="text-2xl font-[var(--font-oswald)] font-bold text-tp-red">
                      ${item.price}
                    </span>
                  </div>
                </div>

                {/* check_circle bullets */}
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-[#5f5e5e] font-[var(--font-poppins)]">
                    <span
                      className="material-symbols-outlined text-tp-red text-lg shrink-0"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    {item.weightLimit} weight included
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#5f5e5e] font-[var(--font-poppins)]">
                    <span
                      className="material-symbols-outlined text-tp-red text-lg shrink-0"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    {item.rentalDays}-day rental period
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#5f5e5e] font-[var(--font-poppins)]">
                    <span
                      className="material-symbols-outlined text-tp-red text-lg shrink-0"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    {item.dimensions}
                  </li>
                </ul>

                {/* Full-width SELECT THIS DUMPSTER button */}
                <div
                  className={`w-full py-4 text-center text-[13px] font-bold uppercase tracking-wider rounded-lg font-[var(--font-poppins)] transition-all duration-150 ${
                    isSelected
                      ? "bg-green-500 text-white"
                      : "bg-tp-red text-white hover:bg-tp-red-dark active:scale-95"
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
