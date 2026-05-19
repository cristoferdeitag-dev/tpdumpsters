"use client";

import { useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";
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
  basePrice: number;
  price: number; // price the customer pays when booking online (basePrice - $50)
  dimensions: string;
  weightLimit: string;
  rentalDays: number;
}

// Sub-type for a parent service (e.g. Mixed Materials → Soil+Concrete /
// Bricks / Asphalt). Each variant maps to its own backend serviceType so
// invoicing tracks them separately, while the booking UI groups them
// visually under the parent.
interface ServiceVariant {
  serviceType: string;
  label: string;
  sublabel: string;
  size: string;
  basePrice: number;
  price: number;
  dimensions: string;
  weightLimit: string;
  rentalDays: number;
}

const ONLINE_DISCOUNT = 50;

interface ServiceCategory {
  service: string;
  icon: string;
  description: string;
  note?: string;
  sizes?: SizeOption[];
  variants?: ServiceVariant[];
}

/* ───────── Pricing data ───────── */
// basePrice = list price; price = online-booking price (basePrice - $50 discount).
// The booking flow charges `price` and shows the base struck through.
const GENERAL_SIZES: SizeOption[] = [
  { size: "10 Yard", basePrice: 649, price: 599, dimensions: "12' L × 8' W × 2.5' H", weightLimit: "1 ton", rentalDays: 7 },
  { size: "20 Yard", basePrice: 749, price: 699, dimensions: "16' L × 8' W × 4' H", weightLimit: "2 tons", rentalDays: 7 },
  { size: "30 Yard", basePrice: 849, price: 799, dimensions: "16' L × 8' W × 6' H", weightLimit: "3 tons", rentalDays: 7 },
];

const services: ServiceCategory[] = [
  {
    service: "General Debris",
    icon: "🏗️",
    description: "Home remodels, furniture, junk, light demolition",
    note: "⚠️ Mattresses/appliances/electronics/tires: $20–$60 each (size dependent, special disposal)",
    sizes: GENERAL_SIZES,
  },
  {
    service: "Household Clean Out",
    icon: "🏠",
    description: "House & garage cleanouts, furniture removal, decluttering",
    note: "⚠️ Mattresses/appliances/electronics/tires: $20–$60 each (size dependent, special disposal)",
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
    note: "⚠️ Extra fee: $150 if prohibited items are added",
    sizes: [
      { size: "10 Yard", basePrice: 649, price: 599, dimensions: "12' L × 8' W × 2.5' H", weightLimit: "No weight limit", rentalDays: 3 },
    ],
  },
  {
    service: "Clean Concrete",
    icon: "🪨",
    description: "Must be 95% pure. No rebar, no garbage.",
    note: "⚠️ Extra fee: $150 if prohibited items are added",
    sizes: [
      { size: "10 Yard", basePrice: 649, price: 599, dimensions: "12' L × 8' W × 2.5' H", weightLimit: "No weight limit", rentalDays: 3 },
    ],
  },
  {
    // Mixed Materials expands into 3 sub-types in the size picker. Each
    // variant maps to its own internal serviceType so the invoice/quote
    // backend tracks them separately.
    service: "Mixed Materials",
    icon: "🔀",
    description: "Pick the type of clean load — different rules apply.",
    note: "⚠️ Extra fee: $150 if prohibited items are added",
    variants: [
      {
        serviceType: "Mixed Materials",
        label: "Soil + Concrete Mix",
        sublabel: "Clean soil and clean concrete in the same load",
        size: "10 Yard",
        basePrice: 799,
        price: 749,
        dimensions: "12' L × 8' W × 2.5' H",
        weightLimit: "No weight limit",
        rentalDays: 3,
      },
      {
        serviceType: "Bricks",
        label: "Bricks Only",
        sublabel: "Clean bricks only — no mixed materials",
        size: "10 Yard",
        basePrice: 799,
        price: 749,
        dimensions: "12' L × 8' W × 2.5' H",
        weightLimit: "No weight limit",
        rentalDays: 3,
      },
      {
        serviceType: "Clean Asphalt",
        label: "Clean Asphalt",
        sublabel: "Asphalt only — no dirt, concrete, rebar, gravel, wood, trash, fabric",
        size: "10 Yard",
        basePrice: 799,
        price: 749,
        dimensions: "12' L × 8' W × 2.5' H",
        weightLimit: "No weight limit",
        rentalDays: 3,
      },
    ],
  },
];

/* ───────── Subtexts per dumpster size ───────── */
const sizeSubtexts: Record<string, string> = {
  "10 Yard": "Ideal for small cleanouts",
  "20 Yard": "Perfect for home projects",
  "30 Yard": "Best for large jobs",
};

/* ───────── Checkmark icon ───────── */
function Check({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-[11px] flex-shrink-0 ${className ?? ""}`}
    >
      ✓
    </span>
  );
}

export default function ServiceStep({ booking, updateBooking, onNext }: Props) {
  const [activeServiceIdx, setActiveServiceIdx] = useState(() => {
    if (booking.service) {
      const idx = services.findIndex((s) => s.service === booking.service?.serviceType);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  const activeService = services[activeServiceIdx];

  // Normalize sizes + variants into a single render list. Variants override
  // the parent service's serviceType so the booking carries (e.g.) "Bricks"
  // instead of "Mixed Materials" when the customer picks bricks-only.
  type RenderItem = SizeOption & {
    serviceType?: string;
    label?: string;
    sublabel?: string;
  };
  const renderItems: RenderItem[] = activeService.variants
    ? activeService.variants.map((v) => ({
        size: v.size,
        basePrice: v.basePrice,
        price: v.price,
        dimensions: v.dimensions,
        weightLimit: v.weightLimit,
        rentalDays: v.rentalDays,
        serviceType: v.serviceType,
        label: v.label,
        sublabel: v.sublabel,
      }))
    : (activeService.sizes ?? []);

  const selectedKey = booking.service
    ? `${booking.service.serviceType}-${booking.service.size}`
    : null;

  const handleSelect = (item: RenderItem) => {
    const serviceType = item.serviceType ?? activeService.service;
    const service: ServiceSelection = {
      serviceType,
      size: item.size,
      basePrice: item.price,
      baseDays: item.rentalDays,
      weightLimit: item.weightLimit,
      dimensions: item.dimensions,
    };
    updateBooking({ service, extraDays: 0 });
    trackDumpsterSelected(serviceType, item.size, item.price);
  };

  return (
    <div>
      {/* ── Header ── */}
      <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
        STEP 1
      </h4>
      <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#222] mb-2">
        Choose your dumpster
      </h2>
      <p className="font-[var(--font-poppins)] text-[15px] text-[#999] mb-10">
        Select the type of waste and dumpster size you need.
      </p>

      {/* ── Service type pills ── */}
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
          renderItems.length === 3
            ? "md:grid-cols-3"
            : renderItems.length === 2
            ? "md:grid-cols-2 max-w-2xl mx-auto"
            : "md:grid-cols-1 max-w-md mx-auto"
        }`}
      >
        {renderItems.map((item, idx) => {
          const cardServiceType = item.serviceType ?? activeService.service;
          const key = `${cardServiceType}-${item.size}`;
          const isSelected = selectedKey === key;
          const isPopular = renderItems.length === 3 && idx === 0;
          const isFeatured = isPopular || renderItems.length === 1;
          const isDark = isFeatured || isSelected;
          const subtext = item.sublabel || sizeSubtexts[item.size] || activeService.service;
          const heading = item.label || `${item.size} Dumpster`;

          return (
            <button
              key={key}
              onClick={() => handleSelect(item)}
              className={`
                relative rounded-2xl text-left transition-all duration-300 cursor-pointer overflow-hidden
                hover:scale-[1.03] hover:shadow-2xl
                ${isDark
                  ? "bg-[#1a1a1a] text-white shadow-2xl md:scale-[1.04] z-10"
                  : "bg-white text-[#333] shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-[#eee]"
                }
                ${isSelected ? "ring-2 ring-tp-red" : ""}
              `}
            >
              {/* ── Badge ── */}
              {isSelected ? (
                <div className="bg-tp-red text-white text-[11px] font-bold text-center py-2 font-[var(--font-poppins)] uppercase tracking-widest">
                  ✓ Selected
                </div>
              ) : isPopular ? (
                <div className="bg-tp-red text-white text-[11px] font-bold text-center py-2 font-[var(--font-poppins)] uppercase tracking-widest">
                  ⭐ Most Popular
                </div>
              ) : null}

              <div className="px-7 pt-7 pb-7 sm:px-8 sm:pt-8 sm:pb-8">
                {/* ── Title ── */}
                <h3 className="font-[var(--font-poppins)] text-xl font-bold mb-1">
                  {heading}
                </h3>

                {/* ── Subtext ── */}
                <p
                  className={`text-sm mb-6 font-[var(--font-poppins)] ${
                    isDark ? "text-white/50" : "text-[#999]"
                  }`}
                >
                  {subtext}
                </p>

                {/* ── Price ── */}
                <div className="mb-1 flex items-baseline gap-2">
                  <span
                    className={`text-xs font-medium ${
                      isDark ? "text-white/40" : "text-[#bbb]"
                    }`}
                  >
                    Starting at
                  </span>
                  <span
                    className={`text-sm font-[var(--font-poppins)] line-through ${
                      isDark ? "text-white/40" : "text-[#aaa]"
                    }`}
                  >
                    ${item.basePrice}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span
                    className={`font-[var(--font-oswald)] text-[52px] leading-none font-bold ${
                      isDark ? "text-white" : "text-[#222]"
                    }`}
                  >
                    ${item.price}
                  </span>
                </div>
                <div className="mb-7">
                  <span className="inline-block bg-tp-green/15 text-tp-green text-[11px] font-bold font-[var(--font-poppins)] uppercase tracking-wider px-2.5 py-1 rounded-full">
                    Save ${ONLINE_DISCOUNT} online
                  </span>
                </div>

                {/* ── Divider ── */}
                <div
                  className={`h-px mb-6 ${
                    isDark ? "bg-white/10" : "bg-[#eee]"
                  }`}
                />

                {/* ── Feature list ── */}
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <Check />
                    <span
                      className={`text-sm font-[var(--font-poppins)] ${
                        isDark ? "text-white/80" : "text-[#555]"
                      }`}
                    >
                      {item.dimensions}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check />
                    <span
                      className={`text-sm font-[var(--font-poppins)] ${
                        isDark ? "text-white/80" : "text-[#555]"
                      }`}
                    >
                      {item.weightLimit} included
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check />
                    <span
                      className={`text-sm font-[var(--font-poppins)] ${
                        isDark ? "text-white/80" : "text-[#555]"
                      }`}
                    >
                      {item.rentalDays}-day rental included
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check />
                    <span
                      className={`text-sm font-[var(--font-poppins)] ${
                        isDark ? "text-white/80" : "text-[#555]"
                      }`}
                    >
                      Delivery &amp; pickup included
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check />
                    <span
                      className={`text-sm font-[var(--font-poppins)] ${
                        isDark ? "text-white/80" : "text-[#555]"
                      }`}
                    >
                      No hidden fees
                    </span>
                  </li>
                </ul>

                {/* ── CTA button ── */}
                <div
                  className={`flex items-center justify-center w-full py-4 rounded-xl text-sm font-semibold transition-all duration-300 font-[var(--font-poppins)] ${
                    isSelected
                      ? "bg-green-500 text-white"
                      : isFeatured
                      ? "bg-tp-red text-white hover:brightness-110"
                      : "bg-transparent text-[#333] border-2 border-[#222] hover:bg-[#222] hover:text-white"
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

      <p className="text-center text-xs text-[#bbb] mt-8 mb-10 font-[var(--font-poppins)]">
        Extra weight charged at $135/ton (prorated) · Extra days: $49/day
      </p>

      {/* Spacer so sticky CTA never overlaps content above */}
      <div className="h-24" aria-hidden="true" />

      {/* ── Sticky Next CTA ── */}
      {booking.service && (
        <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-3 bg-gradient-to-t from-white via-white/95 to-white/0 pointer-events-none">
          <div className="max-w-3xl mx-auto flex justify-end pointer-events-auto">
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-[var(--font-poppins)] font-semibold text-sm transition-all duration-200 bg-tp-red text-white hover:brightness-110 shadow-xl shadow-red-500/30"
            >
              <FaCalendarDays /> Next: Choose dates →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
