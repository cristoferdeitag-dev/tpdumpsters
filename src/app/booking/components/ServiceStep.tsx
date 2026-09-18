"use client";

import { useRef, useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";
import type { BookingData, ServiceSelection } from "./BookingWizard";
import { trackDumpsterSelected } from "@/lib/tracking";
import { MATERIAL_ICONS, IconCheck } from "@/components/MaterialIcons";

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
  description: string;
  note?: string;
  sizes?: SizeOption[];
  variants?: ServiceVariant[];
}

/* ───────── Pricing data ───────── */
// basePrice = list price; price = online-booking price (basePrice - $50 discount).
// The booking flow charges `price` and shows the base struck through.
const GENERAL_SIZES: SizeOption[] = [
  { size: "10 Yard", basePrice: 649, price: 599, dimensions: "12' L × 8' W × 2.5' H", weightLimit: "1 ton", rentalDays: 3 },
  { size: "20 Yard", basePrice: 699, price: 649, dimensions: "16' L × 8' W × 4' H", weightLimit: "2 tons", rentalDays: 7 },
  { size: "30 Yard", basePrice: 799, price: 749, dimensions: "16' L × 8' W × 6' H", weightLimit: "3 tons", rentalDays: 7 },
];

const services: ServiceCategory[] = [
  {
    service: "General Debris",
    description: "Home remodels, furniture, junk, light demolition",
    note: "Mattresses/appliances/electronics/tires: $20–$60 each (size dependent, special disposal)",
    sizes: GENERAL_SIZES,
  },
  {
    service: "Household Clean Out",
    description: "House & garage cleanouts, furniture removal, decluttering",
    note: "Mattresses/appliances/electronics/tires: $20–$60 each (size dependent, special disposal)",
    sizes: GENERAL_SIZES,
  },
  {
    service: "Construction Debris",
    description: "Demolition, remodeling, construction waste",
    sizes: GENERAL_SIZES,
  },
  {
    service: "Roofing",
    description: "Shingles, roofing tear-offs, heavy debris",
    sizes: GENERAL_SIZES,
  },
  {
    service: "Clean Soil",
    description: "Must be 95% pure. No rocks, grass, gravel, mesh, wood, or garbage.",
    note: "Extra fee: $150 if prohibited items are added",
    sizes: [
      { size: "10 Yard", basePrice: 649, price: 599, dimensions: "12' L × 8' W × 2.5' H", weightLimit: "No weight limit", rentalDays: 3 },
    ],
  },
  {
    service: "Clean Concrete",
    description: "Must be 95% pure. No rebar, no garbage.",
    note: "Extra fee: $150 if prohibited items are added",
    sizes: [
      { size: "10 Yard", basePrice: 649, price: 599, dimensions: "12' L × 8' W × 2.5' H", weightLimit: "No weight limit", rentalDays: 3 },
    ],
  },
  {
    service: "Green Waste",
    description: "Landscaping, branches, leaves, yard cleanup, organic debris",
    sizes: GENERAL_SIZES,
  },
  {
    // Mixed Materials expands into 3 sub-types in the size picker. Each
    // variant maps to its own internal serviceType so the invoice/quote
    // backend tracks them separately.
    service: "Mixed Materials",
    description: "Pick the type of clean load — different rules apply.",
    note: "Extra fee: $150 if prohibited items are added",
    variants: [
      {
        serviceType: "Mixed Materials",
        label: "Soil + Concrete Mix",
        sublabel: "Clean soil and clean concrete in the same load",
        size: "10 Yard",
        basePrice: 949,
        price: 899,
        dimensions: "12' L × 8' W × 2.5' H",
        weightLimit: "No weight limit",
        rentalDays: 3,
      },
      {
        serviceType: "Bricks",
        label: "Bricks Only",
        sublabel: "Clean bricks only — no mixed materials",
        size: "10 Yard",
        basePrice: 1150,
        price: 1100,
        dimensions: "12' L × 8' W × 2.5' H",
        weightLimit: "No weight limit",
        rentalDays: 3,
      },
      {
        serviceType: "Clean Asphalt",
        label: "Clean Asphalt",
        sublabel: "Asphalt only — no dirt, concrete, rebar, gravel, wood, trash, fabric",
        size: "10 Yard",
        basePrice: 949,
        price: 899,
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
  // 18-sep-2026 (Cris, msg 22063): «no puedes elegir el tamaño del dumpster
  // antes de saber qué vas a tirar». Hasta hoy este paso arrancaba con
  // "General Debris" YA seleccionado (índice 0), así que sus tres tamaños y
  // sus precios estaban a la vista desde el primer segundo y el cliente podía
  // reservar sin elegir material nunca. El que traía concreto o ladrillo
  // pagaba $599 por lo que cuesta $899 o $1,100 — entre $300 y $501 de
  // diferencia por reserva. Ahora arranca en -1: hay que elegir material, y
  // los precios aparecen después. No añade un paso; sólo quita un default.
  const [activeServiceIdx, setActiveServiceIdx] = useState(() => {
    if (booking.service) {
      const idx = services.findIndex((s) => s.service === booking.service?.serviceType);
      return idx >= 0 ? idx : -1;
    }
    return -1;
  });

  const activeService = activeServiceIdx >= 0 ? services[activeServiceIdx] : null;

  // Asaí, 9-sep-2026: al elegir un tipo de material que está arriba en la
  // lista, la vista se quedaba donde estaba y el cliente no veía ni las
  // tarjetas nuevas ni el aviso de fees ("elegí una opción que estaba arriba
  // de todo y no lo vi"). Al cambiar de material bajamos a su detalle.
  const detalleRef = useRef<HTMLDivElement>(null);

  // Normalize sizes + variants into a single render list. Variants override
  // the parent service's serviceType so the booking carries (e.g.) "Bricks"
  // instead of "Mixed Materials" when the customer picks bricks-only.
  type RenderItem = SizeOption & {
    serviceType?: string;
    label?: string;
    sublabel?: string;
  };
  const renderItems: RenderItem[] = !activeService
    ? []
    : activeService.variants
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
    const serviceType = item.serviceType ?? activeService?.service ?? "";
    const service: ServiceSelection = {
      serviceType,
      size: item.size,
      basePrice: item.basePrice,
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
      {/* Hermes, 18-sep: el "STEP 1" dorado y espaciado dominaba la pantalla
          antes de la primera decisión. Es un dato de navegación, no un
          adorno — el dorado se reserva para acentos de marca y precio. */}
      <h4 className="font-[var(--font-poppins)] text-[10.5px] font-semibold text-[#8a8f94] uppercase tracking-[0.12em] mb-1.5">
        Step 1 of 4
      </h4>
      <h2 className="font-[var(--font-oswald)] uppercase tracking-[0.01em] text-[26px] md:text-[34px] font-semibold text-[#1d2329] mb-2">
        Choose your dumpster
      </h2>
      {/* 18-sep: el subtítulo estaba en #999 y con 91% de tráfico móvil mucha
          gente lo lee AL SOL, donde ese gris desaparece (Consejo IA). */}
      <p className="font-[var(--font-poppins)] text-[14.5px] leading-relaxed text-[#4b5156] mb-8">
        Select what you&apos;re disposing of, then choose the size you need.
      </p>

      {/* ── Materiales ──
          18-sep-2026: eran pastillas redondeadas con emoji. Ahora son
          rectángulos con icono de un solo trazo, alineados a la izquierda
          (Consejo IA: los emojis eran la señal infantil, y las cápsulas
          acumuladas "hacen que parezca una app escolar").
          El elegido NO se llena de rojo — borde rojo, tinte apenas y un check:
          llenar la tarjeta de color la vuelve promocional. */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-10">
        {services.map((svc, idx) => {
          const Icon = MATERIAL_ICONS[svc.service];
          const elegido = activeServiceIdx === idx;
          return (
            <button
              key={svc.service}
              onClick={() => {
                setActiveServiceIdx(idx);
                requestAnimationFrame(() =>
                  detalleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                );
              }}
              aria-pressed={elegido}
              className={`relative flex items-center gap-2.5 text-left px-3 py-3.5 rounded-[9px] text-[14.5px] font-semibold font-[var(--font-poppins)] leading-tight transition-colors duration-150 ${
                elegido
                  ? "border-[1.5px] border-tp-red bg-[#fef6f5] text-[#1d2329]"
                  : "border border-[#d7dadd] bg-white text-[#1d2329] hover:border-tp-red hover:text-tp-red"
              }`}
            >
              {elegido && (
                <span className="absolute -top-[7px] -right-[7px] w-5 h-5 rounded-full bg-tp-red text-white grid place-items-center">
                  <IconCheck />
                </span>
              )}
              <Icon />
              <span className="whitespace-normal">{svc.service}</span>
            </button>
          );
        })}
      </div>

      {/* Mientras no haya material elegido no se muestra ni descripción, ni
          reglas, ni precios: no hay material del que hablar todavía. En su
          lugar, una línea que dice qué falta — nunca un botón muerto
          (feedback_boton_disabled_no_puede_explicarse). */}
      {!activeService && (
        <div
          ref={detalleRef}
          className="scroll-mt-28 bg-[#fafafa] rounded-2xl px-6 py-5 mb-10 border border-dashed border-[#ddd] text-center"
        >
          <p className="font-[var(--font-poppins)] text-[15px] text-[#555] leading-relaxed">
            Pick what you&apos;re getting rid of and we&apos;ll show you the sizes and prices that
            apply to it.
          </p>
        </div>
      )}

      {activeService && (
        <>
          {/* ── Service description banner ── */}
          <div ref={detalleRef} className="scroll-mt-28 bg-[#fafafa] rounded-2xl px-6 py-4 mb-10 border border-[#eee]">
            <p className="font-[var(--font-poppins)] text-[14px] text-[#555] leading-relaxed">
              <span className="inline-flex items-center gap-1.5 font-semibold text-[#1d2329]">
                {(() => {
                  const I = MATERIAL_ICONS[activeService.service];
                  return I ? <I size={16} /> : null;
                })()}
                {activeService.service}:
              </span>{" "}
              {activeService.description}
            </p>
          </div>

          {/* Reglas del dumpster elegido, a la vista y ANTES de los precios: la del
              material (si tiene) y la del overload, que aplica siempre. */}
          <div className="-mt-6 mb-10 bg-[#fffdf5] border-l-[3px] border-tp-gold rounded-r-lg px-5 py-4 space-y-2">
            {activeService.note && (
              <p className="font-[var(--font-poppins)] text-[13px] text-[#1d2329] leading-relaxed">
                {activeService.note}
              </p>
            )}
            <p className="font-[var(--font-poppins)] text-[13px] text-[#1d2329] leading-relaxed">
              Nothing above the top edge of the dumpster. Overloaded loads add a
              <strong className="font-semibold"> $149 fee, charged at pickup</strong>.
            </p>
          </div>
        </>
      )}

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
          const cardServiceType = item.serviceType ?? activeService?.service ?? "";
          const key = `${cardServiceType}-${item.size}`;
          const isSelected = selectedKey === key;
          const isPopular = renderItems.length === 3 && idx === 0;
          const isFeatured = isPopular || renderItems.length === 1;
          const isDark = isFeatured || isSelected;
          const subtext = item.sublabel || sizeSubtexts[item.size] || activeService?.service || "";
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
                      Delivery, pickup &amp; disposal included
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
                {/* Asaí, 9-sep-2026: "aquí dos botones confunden". Ya elegido
                    el dumpster, la tarjeta dejaba un botón verde "Selected"
                    compitiendo con el de continuar. Ahora sólo se ve mientras
                    la tarjeta NO está elegida. */}
                {!isSelected && (
                  <div
                    className={`flex items-center justify-center w-full py-4 rounded-xl text-sm font-semibold transition-all duration-300 font-[var(--font-poppins)] ${
                      isFeatured
                        ? "bg-tp-red text-white hover:brightness-110"
                        : "bg-transparent text-[#333] border-2 border-[#222] hover:bg-[#222] hover:text-white"
                    }`}
                  >
                    Select this dumpster
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-center text-xs text-[#bbb] mt-8 mb-10 font-[var(--font-poppins)]">
        Extra weight charged at $179/ton (prorated) · Extra days: $49/day
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
