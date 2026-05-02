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
      <h2 className="font-[var(--font-work-sans)] text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#1b1c1c] mb-6 leading-tight">
        Step 1: Choose your dumpster
      </h2>

      {/* Filter pills — Stitch's monochrome border style. Active = solid red. */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {services.map((svc, idx) => {
          const active = activeServiceIdx === idx;
          return (
            <button
              key={svc.service}
              type="button"
              onClick={() => setActiveServiceIdx(idx)}
              className={`whitespace-nowrap px-6 py-2 rounded-lg font-[var(--font-inter)] text-sm font-semibold border transition-colors ${
                active
                  ? "bg-[#a2001c] text-white border-[#a2001c]"
                  : "bg-white text-[#5f5e5e] border-[#e4e2e2] hover:border-[#906f6d]"
              }`}
            >
              {svc.service}
            </button>
          );
        })}
      </div>

      {/* Cards: stacked on mobile (Stitch's literal layout), 3-up grid on lg
          for desktop adaptation. The card markup is the same; the grid just
          spreads them horizontally. */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {activeService.sizes.map((item, idx) => {
          const key = `${activeService.service}-${item.size}`;
          const isSelected = selectedKey === key;
          const isPopular = activeService.sizes.length === 3 && idx === 1;
          return (
            <article
              key={key}
              className={`relative bg-white rounded-lg overflow-hidden border transition-shadow ${
                isPopular || isSelected
                  ? "border-2 border-[#a2001c] shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
                  : "border-[#e4e2e2] shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
              }`}
            >
              {isPopular && (
                <div className="absolute top-4 left-4 z-10 bg-[#a2001c] text-white px-3 py-1 font-[var(--font-inter)] text-[10px] uppercase tracking-widest font-bold rounded">
                  MOST POPULAR
                </div>
              )}

              <div className="relative w-full h-48 bg-[#efeded] flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={`${item.size} dumpster`}
                    width={500}
                    height={300}
                    className="object-contain w-auto h-full p-4"
                  />
                ) : (
                  <span className="font-[var(--font-work-sans)] text-4xl font-black uppercase tracking-tight text-[#a2001c]">
                    {item.size}
                  </span>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4 gap-3">
                  <div>
                    <h3 className="font-[var(--font-work-sans)] text-2xl font-semibold text-[#1b1c1c] leading-tight">
                      {item.size} Dumpster
                    </h3>
                    <p className="text-[#5f5e5e] text-sm font-[var(--font-inter)] mt-0.5">
                      {sizeTagline[item.size] || activeService.service}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-[var(--font-inter)] font-semibold text-[#5f5e5e] block uppercase">
                      Starting at
                    </span>
                    <span className="font-[var(--font-work-sans)] text-2xl font-bold text-[#a2001c]">
                      ${item.price}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  <Bullet>{item.dimensions}</Bullet>
                  <Bullet>{item.weightLimit} weight included</Bullet>
                  <Bullet>{item.rentalDays}-day rental period</Bullet>
                  <Bullet>Delivery &amp; pickup included</Bullet>
                </ul>

                <button
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={`w-full py-4 font-[var(--font-inter)] font-bold uppercase tracking-wider text-sm rounded-lg transition-transform active:scale-[0.98] ${
                    isSelected
                      ? "bg-[#15a37b] text-white"
                      : "bg-[#a2001c] text-white hover:bg-[#930019]"
                  }`}
                >
                  {isSelected ? "✓ Selected — Continue" : "SELECT THIS DUMPSTER"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {activeService.note && (
        <div className="mt-8 px-4 py-3 bg-[#ffdad6] border border-[#ffb3af] rounded-lg text-center max-w-[900px] mx-auto">
          <p className="font-[var(--font-inter)] text-xs text-[#93000a]">
            ⚠ {activeService.note}
          </p>
        </div>
      )}

      <p className="text-center text-[11px] text-[#5f5e5e] mt-6 font-[var(--font-inter)]">
        Extra weight: $125/ton (prorated) · Extra days: $49/day
      </p>

      {/* Help section — mirrors the Stitch "Need help choosing?" block. */}
      <section className="mt-12 px-4 py-8 bg-[#f5f3f3] border-y border-[#e4e2e2] -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-6">
            <h3 className="font-[var(--font-work-sans)] text-2xl font-semibold text-[#1b1c1c] mb-2">
              Need help choosing?
            </h3>
            <p className="text-[#5f5e5e] text-sm font-[var(--font-inter)]">
              Our experts are available to help you pick the right size.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="tel:+15106502083"
              className="flex items-center justify-center gap-2 bg-white border border-[#5f5e5e] text-[#1b1c1c] py-3 font-[var(--font-inter)] font-bold rounded-lg hover:bg-[#efeded] transition-colors"
            >
              <span className="text-[#a2001c]">📞</span>
              Call
            </a>
            <a
              href="sms:+15106502083"
              className="flex items-center justify-center gap-2 bg-white border border-[#5f5e5e] text-[#1b1c1c] py-3 font-[var(--font-inter)] font-bold rounded-lg hover:bg-[#efeded] transition-colors"
            >
              <span className="text-[#a2001c]">💬</span>
              Text
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2 text-sm text-[#5f5e5e] font-[var(--font-inter)]">
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#a2001c] text-white text-[11px] font-bold flex-shrink-0">
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}
