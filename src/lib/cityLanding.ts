// Shared data helpers for the city landing pages (Richmond, San Pablo, Pinole,
// Vallejo, Fairfield, ...).
//
// Every price shown on a city page is derived from src/lib/pricing.ts, the
// same table /api/checkout charges, so a city page can never advertise a
// number that differs from what the customer pays.

import {
  ONLINE_PRICES,
  LIST_PREMIUM,
  EXTRA_DAY_FEE,
  OVERWEIGHT_PER_TON,
  SIZE_SPECS,
} from "@/lib/pricing";

const GENERAL = "General Debris";

export type YardSize = "10" | "20" | "30";

export const CITY_SIZES: YardSize[] = ["10", "20", "30"];

/** Online price, list (struck-through) price and specs for one size. */
export function sizeInfo(yd: YardSize) {
  const online = ONLINE_PRICES[GENERAL][yd];
  return {
    yd,
    online,
    list: online + LIST_PREMIUM,
    tons: SIZE_SPECS[yd].tons,
    days: SIZE_SPECS[yd].days,
  };
}

export { LIST_PREMIUM, EXTRA_DAY_FEE, OVERWEIGHT_PER_TON };

/** "$599" style formatting. */
export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/**
 * Items that may not go in the dumpster. Taken verbatim from the site's own
 * Terms & Conditions (section 6, "Prohibited items") so every page says the
 * same thing as the contract.
 */
export const PROHIBITED_ITEMS = [
  "Paint and solvents",
  "Oil and fuel",
  "Batteries",
  "Asbestos",
  "Refrigerants and appliances that contain them",
  "Propane tanks",
  "Medical waste",
  "Chemicals and any hazardous or toxic material",
];

/** FAQ answer listing the prohibited items (same list as the Terms). */
export function prohibitedFaqAnswer(): string[] {
  return [
    `Not allowed in any dumpster: ${PROHIBITED_ITEMS.map((s) => s.toLowerCase()).join("; ")}.`,
    "Mattresses and appliances may carry an extra per-item fee. Clean soil, concrete, bricks and mixed heavy loads go in the 10-yard only.",
  ];
}

/** A city FAQ kept as plain text so the visible FAQ and the FAQPage JSON-LD share one source. */
export interface CityFaqText {
  question: string;
  answer: string[];
}

export function faqJsonLd(faqs: CityFaqText[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer.join(" ") },
    })),
  };
}

/** Offer catalog for the LocalBusiness JSON-LD, priced from pricing.ts. */
export function offerCatalogJsonLd() {
  const descriptions: Record<YardSize, string> = {
    "10": "Compact dumpster for tight spaces, soil, concrete, and small cleanups.",
    "20": "Mid-size dumpster for remodels, roofing, and medium cleanouts.",
    "30": "Large dumpster for full renovations, construction debris, and estate cleanouts.",
  };
  return {
    "@type": "OfferCatalog",
    name: "Dumpster Rental Sizes",
    itemListElement: CITY_SIZES.map((yd) => {
      const s = sizeInfo(yd);
      return {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${yd} Yard Dumpster Rental`,
          description: `${descriptions[yd]} ${s.days}-day rental, ${s.tons} ton${s.tons > 1 ? "s" : ""} included.`,
        },
        price: String(s.online),
        priceCurrency: "USD",
      };
    }),
  };
}

/**
 * LocalBusiness JSON-LD for a city page. No street address on purpose: TP is a
 * service-area business, so the page lists where it delivers (city + verified
 * ZIP codes) instead of implying a yard in that city.
 */
export function localBusinessJsonLd(opts: {
  cityName: string;
  slug: string;
  description: string;
  zips: string[];
  nearbyCities: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `TP Dumpsters - ${opts.cityName}`,
    description: opts.description,
    url: `https://tpdumpsters.com/${opts.slug}`,
    telephone: "+1-510-650-2083",
    email: "contact@tpdumpsters.com",
    image: "/images/logo/TP.png",
    logo: "/images/logo/TP.png",
    areaServed: [
      { "@type": "City", name: opts.cityName },
      ...opts.zips.map((postalCode) => ({
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          postalCode,
          addressLocality: opts.cityName,
          addressRegion: "CA",
          addressCountry: "US",
        },
      })),
      ...opts.nearbyCities.map((name) => ({ "@type": "City", name })),
    ],
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "18:00",
    },
    hasOfferCatalog: offerCatalogJsonLd(),
  };
}

/** Standard pricing FAQ answer, built from pricing.ts. */
export function pricingFaqAnswer(cityName: string): string[] {
  const [s10, s20, s30] = CITY_SIZES.map(sizeInfo);
  return [
    `Booked online, a 10-yard dumpster in ${cityName} is ${usd(s10.online)} (${s10.days}-day rental, ${s10.tons} ton included), a 20-yard is ${usd(s20.online)} (${s20.days} days, ${s20.tons} tons) and a 30-yard is ${usd(s30.online)} (${s30.days} days, ${s30.tons} tons). Those are online prices, ${usd(LIST_PREMIUM)} below the regular list price.`,
    `Extra days are ${usd(EXTRA_DAY_FEE)} per day and weight over the included tonnage is ${usd(OVERWEIGHT_PER_TON)} per ton.`,
  ];
}
