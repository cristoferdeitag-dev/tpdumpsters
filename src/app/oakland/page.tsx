import type { Metadata } from "next";
import Header from "@/components/Header";
import SizesSection from "@/components/SizesSection";
import DumpsterPhotosGrid from "@/components/DumpsterPhotosGrid";
import FaqsSection from "@/components/FaqsSection";
import CityFaqsSection from "@/components/CityFaqsSection";
import AboutCitySection from "@/components/AboutCitySection";
import ErrorBoundary from "@/components/ErrorBoundary";
import DynamicReviews from "@/components/DynamicReviews";
import WhyUsSection from "@/components/WhyUsSection";
import DynamicGallery from "@/components/DynamicGallery";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import OaklandHero from "./components/OaklandHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import OaklandLocation from "./components/OaklandLocation";

const oaklandFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Oakland?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes. If the dumpster is placed on a public street in Oakland, you&apos;ll need a temporary
        encroachment permit from the City of Oakland. If it&apos;s on your private driveway, no permit
        is usually needed. We can help guide you through the process.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Oakland?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        In most Oakland neighborhoods, we offer <strong>same-day delivery</strong> if you call before noon.
        Areas like Downtown, Fruitvale, and Temescal are within our fastest delivery zone.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in Oakland?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a typical kitchen or bathroom remodel in Oakland, a <strong>20-yard dumpster</strong> is usually
        the best fit. For whole-home renovations or multi-room projects, go with the 30-yard. For
        small cleanouts or concrete/soil, the 10-yard works great.
      </p>
    ),
  },
  {
    question: "Can you deliver to narrow Oakland streets or hillside properties?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We know Oakland&apos;s tight streets in neighborhoods like Rockridge, Montclair, and the
        hills. Our drivers are experienced with narrow access and steep driveways. Just let us know
        your address and we&apos;ll confirm access.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Oakland?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Oakland customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Home remodels and renovations (especially older homes)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts and garage cleanups</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and yard debris removal</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Construction and demolition projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing tear-offs</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Oakland ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every Oakland ZIP code including 94601, 94602, 94603, 94605, 94606, 94607,
        94608, 94609, 94610, 94611, 94612, 94613, 94618, 94619, and 94621. No matter where you
        are in Oakland, we can deliver.
      </p>
    ),
  },
];

const oaklandAbout = {
  cityName: "Oakland",
  intro:
    "Oakland is one of the most vibrant and diverse cities in the Bay Area, with a mix of historic homes, modern developments, and active construction. From Victorian-era renovations in West Oakland to new builds near Jack London Square, there's always a project that needs a reliable dumpster. TP Dumpsters has been serving Oakland neighborhoods for years, and we understand the unique challenges of working in this city — from tight hillside streets to busy downtown blocks.",
  highlights: [
    "We navigate Oakland's narrow streets and hillside driveways with ease",
    "Familiar with Oakland city permit requirements for street placement",
    "Fast delivery to all Oakland neighborhoods — Downtown to the hills",
    "Trusted by Oakland contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Victorian and Craftsman home renovations in West Oakland & Temescal",
    "Kitchen and bathroom remodels in Rockridge & Piedmont Avenue",
    "Estate cleanouts in East Oakland residential areas",
    "Landscaping and yard debris removal near Lake Merritt",
    "New construction support in the Jack London Square district",
    "Roofing projects across Oakland's older housing stock",
  ],
  closingText:
    "Whether you're a homeowner tackling a weekend cleanup or a contractor running a major renovation, TP Dumpsters makes waste removal in Oakland easy. We offer transparent pricing, same-day delivery, and the local expertise to get your dumpster exactly where you need it. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Oakland, CA | Same-Day Service - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Oakland, CA. Serving Downtown, East Oakland, West Oakland, Fruitvale & all ZIP codes. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Oakland CA",
    "Oakland dumpster rental",
    "roll-off dumpster Oakland",
    "construction dumpster Oakland",
    "Oakland waste removal",
    "dumpster rental 94601",
    "dumpster rental 94606",
    "dumpster rental Downtown Oakland",
    "East Oakland dumpster",
    "West Oakland dumpster rental",
    "Fruitvale dumpster",
    "Temescal dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Oakland, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Oakland. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/oakland",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/oakland",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Oakland",
  description:
    "Fast, reliable dumpster rentals in Oakland, CA. Serving all Oakland neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/oakland",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Oakland",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Oakland",
      "@id": "https://en.wikipedia.org/wiki/Oakland,_California",
    },
  ],
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "07:00",
    closes: "18:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dumpster Rental Sizes",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "10 Yard Dumpster Rental",
          description:
            "Compact dumpster ideal for tight spaces and heavy debris like soil, concrete, and bricks.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "20 Yard Dumpster Rental",
          description:
            "Versatile dumpster for kitchen/bathroom remodels, roofing projects, and yard cleanups.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "30 Yard Dumpster Rental",
          description:
            "Extra capacity dumpster for whole-home cleanouts, large renovations, and construction debris.",
        },
      },
    ],
  },
};

export default function OaklandPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <OaklandHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...oaklandAbout} />
<SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Oakland" faqs={oaklandFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <OaklandLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
