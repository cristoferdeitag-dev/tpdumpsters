"use client";

import { useState } from "react";
import Image from "next/image";
import type { BookingData, ServiceSelection } from "../../booking/components/BookingWizard";
import { trackDumpsterSelected } from "@/lib/tracking";

interface Props {
  booking: BookingData;
  updateBooking: (updates: Partial<BookingData>) => void;
  onNext: () => void;
}

interface SizeOption {
  size: string;
  price: number;
  dimensions: string;
  weightLimit: string;
  rentalDays: number;
  image?: string;
}

interface ServiceCategory {
  service: string;
  description: string;
  note?: string;
  sizes: SizeOption[];
}

const GENERAL_SIZES: SizeOption[] = [
  { size: "10 Yard", price: 649, dimensions: "12' L × 8' W × 2.5' H", weightLimit: "1 ton", rentalDays: 7, image: "/images/sizes/10-yard.png" },
  { size: "20 Yard", price: 699, dimensions: "16' L × 8' W × 4' H", weightLimit: "2 tons", rentalDays: 7, image: "/images/sizes/20-yard.png" },
  { size: "30 Yard", price: 849, dimensions: "16' L × 8' W × 6' H", weightLimit: "3 tons", rentalDays: 7, image: "/images/sizes/30-yard.png" },
];

const services: ServiceCategory[] = [
  { service: "General Debris", description: "Home remodels, furniture, junk, light demolition", note: "Mattresses/appliances/tires: $20–$60 each (size dependent)", sizes: GENERAL_SIZES },
  { service: "Household Clean Out", description: "House & garage cleanouts, furniture removal, decluttering", note: "Mattresses/appliances/tires: $20–$60 each", sizes: GENERAL_SIZES },
  { service: "Construction Debris", description: "Demolition, remodeling, construction waste", sizes: GENERAL_SIZES },
  { service: "Roofing", description: "Shingles, roofing tear-offs, heavy debris", sizes: GENERAL_SIZES },
  { service: "Green Waste", description: "Landscaping, branches, leaves, yard cleanup, organic debris", sizes: GENERAL_SIZES },
  { service: "Clean Soil", description: "Must be 95% pure. No rocks, grass, gravel, mesh, wood, or garbage.", note: "Extra fee: $125 if prohibited items added", sizes: [{ size: "10 Yard", price: 649, dimensions: "12' L × 8' W × 2.5' H", weightLimit: "No weight limit", rentalDays: 3, image: "/images/sizes/10-yard.png" }] },
  { service: "Clean Concrete", description: "Must be 95% pure. No rebar, no garbage.", note: "Extra fee: $125 if prohibited items added", sizes: [{ size: "10 Yard", price: 649, dimensions: "12' L × 8' W × 2.5' H", weightLimit: "No weight limit", rentalDays: 3, image: "/images/sizes/10-yard.png" }] },
  { service: "Mixed Materials", description: "Clean soil, concrete & bricks mix. Must be 95% pure.", note: "Extra fee: $150 if prohibited items added", sizes: [{ size: "10 Yard", price: 799, dimensions: "12' L × 8' W × 2.5' H", weightLimit: "No weight limit", rentalDays: 3, image: "/images/sizes/10-yard.png" }] },
];

const sizeTagline: Record<string, string> = {
  "10 Yard": "Best for small cleanup projects",
  "20 Yard": "Most common for home renovations",
  "30 Yard": "For commercial & major projects",
};

export default function ServiceStepV2({ booking, updateBooking, onNext }: Props) {
  const [activeServiceIdx, setActiveServiceIdx] = useState(() => {
    if (booking.service) {
      const idx = services.findIndex((s) => s.service === booking.service?.serviceType);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  const activeService = services[activeServiceIdx];
  const selectedKey = booking.service ? `${booking.service.serviceType}-${booking.service.size}` : null;

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
    setTimeout(() => onNext(), 250);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="font-[var(--font-poppins)] text-[10px] sm:text-xs font-bold text-tp-red uppercase tracking-[2px] mb-1.5">
          Step 1
        </p>
        <h2 className="font-[var(--font-oswald)] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a1a1a] uppercase tracking-tight mb-2">
          Choose your dumpster
        </h2>
        <p className="font-[var(--font-poppins)] text-sm text-[#666]">
          Select the type of waste, then pick the size that fits your project.
        </p>
      </div>

      {/* Filter pills (waste type) */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 mb-7 scrollbar-hide">
        {services.map((svc, idx) => {
          const active = activeServiceIdx === idx;
          return (
            <button
              key={svc.service}
              type="button"
              onClick={() => setActiveServiceIdx(idx)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-lg font-[var(--font-poppins)] text-sm font-semibold transition-all border-2 ${
                active
                  ? "bg-tp-red text-white border-tp-red shadow-md"
                  : "bg-white text-[#444] border-[#e5e5e5] hover:border-tp-red hover:text-tp-red"
              }`}
            >
              {svc.service}
            </button>
          );
        })}
      </div>

      {/* Service description */}
      <div className="mb-6 px-4 py-3 bg-[#fafafa] rounded-lg border border-[#eee]">
        <p className="font-[var(--font-poppins)] text-sm text-[#555]">
          <span className="font-bold text-[#222]">{activeService.service}:</span> {activeService.description}
        </p>
      </div>

      {/* Stitch-style cards: full-width stacked */}
      <div className="space-y-5">
        {activeService.sizes.map((item, idx) => {
          const key = `${activeService.service}-${item.size}`;
          const isSelected = selectedKey === key;
          const isPopular = activeService.sizes.length === 3 && idx === 1;
          return (
            <article
              key={key}
              className={`relative bg-white rounded-2xl overflow-hidden border-2 transition-all ${
                isSelected
                  ? "border-tp-red shadow-[0_8px_30px_rgba(224,43,32,0.18)]"
                  : isPopular
                  ? "border-tp-red shadow-[0_4px_20px_rgba(224,43,32,0.12)]"
                  : "border-[#e5e5e5] shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:border-[#bbb]"
              }`}
            >
              {isPopular && (
                <div className="absolute top-4 left-4 z-10 bg-tp-red text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded font-[var(--font-poppins)]">
                  ⭐ Most Popular
                </div>
              )}

              {/* Visual hero of the card */}
              <div className="relative h-40 sm:h-48 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#0d0d0d] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-tp-red blur-3xl" />
                </div>
                {item.image ? (
                  <div className="relative w-full h-full flex items-center justify-center p-3">
                    <Image
                      src={item.image}
                      alt={`${item.size} dumpster`}
                      width={400}
                      height={250}
                      className="object-contain w-auto h-full max-h-full drop-shadow-2xl"
                    />
                  </div>
                ) : (
                  <span className="relative text-white text-4xl sm:text-5xl font-extrabold uppercase tracking-tighter font-[var(--font-oswald)]">
                    {item.size}
                  </span>
                )}
              </div>

              {/* Card body */}
              <div className="p-5 sm:p-6">
                <div className="flex justify-between items-start mb-4 gap-3">
                  <div>
                    <h3 className="font-[var(--font-oswald)] text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] uppercase tracking-tight">
                      {item.size} Dumpster
                    </h3>
                    <p className="font-[var(--font-poppins)] text-sm text-[#777] mt-0.5">
                      {sizeTagline[item.size] || activeService.service}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="block text-[10px] font-bold text-[#999] uppercase tracking-wider font-[var(--font-poppins)]">
                      Starting at
                    </span>
                    <span className="font-[var(--font-oswald)] text-3xl sm:text-4xl font-extrabold text-tp-red">
                      ${item.price}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 mb-5">
                  <Bullet>{item.dimensions}</Bullet>
                  <Bullet>{item.weightLimit} weight included</Bullet>
                  <Bullet>{item.rentalDays}-day rental period</Bullet>
                  <Bullet>Delivery &amp; pickup included</Bullet>
                </ul>

                <button
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={`w-full py-4 rounded-lg font-[var(--font-poppins)] font-bold uppercase tracking-wider text-sm transition-all active:scale-[0.98] ${
                    isSelected
                      ? "bg-green-600 text-white"
                      : "bg-tp-red text-white hover:bg-tp-red-dark shadow-lg shadow-tp-red/20"
                  }`}
                >
                  {isSelected ? "✓ Selected — Continue" : "Select this dumpster"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {activeService.note && (
        <div className="mt-6 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-center">
          <p className="font-[var(--font-poppins)] text-xs text-amber-800">
            ⚠️ {activeService.note}
          </p>
        </div>
      )}

      <p className="text-center text-[11px] text-[#aaa] mt-6 font-[var(--font-poppins)]">
        Extra weight: $125/ton (prorated) · Extra days: $49/day
      </p>

      {/* Help section — Stitch */}
      <div className="mt-10 px-5 py-6 bg-[#fafafa] border border-[#eee] rounded-2xl">
        <div className="text-center mb-4">
          <h4 className="font-[var(--font-oswald)] text-lg font-bold text-[#1a1a1a] uppercase tracking-tight mb-1">
            Need help choosing?
          </h4>
          <p className="font-[var(--font-poppins)] text-sm text-[#777]">
            Our team can help you pick the right size.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <a
            href="tel:+15106502083"
            className="flex items-center justify-center gap-2 bg-white border-2 border-[#ddd] text-[#222] py-3 font-[var(--font-poppins)] font-bold rounded-lg hover:border-tp-red hover:text-tp-red transition-colors text-sm"
          >
            📞 Call
          </a>
          <a
            href="sms:+15106502083"
            className="flex items-center justify-center gap-2 bg-white border-2 border-[#ddd] text-[#222] py-3 font-[var(--font-poppins)] font-bold rounded-lg hover:border-tp-red hover:text-tp-red transition-colors text-sm"
          >
            💬 Text
          </a>
        </div>
      </div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2.5 font-[var(--font-poppins)] text-sm text-[#555]">
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-tp-red/10 text-tp-red text-[11px] font-bold flex-shrink-0">
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}
