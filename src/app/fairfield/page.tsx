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
import FairfieldHero from "./components/FairfieldHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import FairfieldLocation from "./components/FairfieldLocation";

const fairfieldFaqs = [
  {
    question: "Do I need a permit for a dumpster in Fairfield?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on your private driveway or property in Fairfield, no permit is
        typically required. However, if you need to place it on a public street or right-of-way,
        you&apos;ll need a temporary encroachment permit from the City of Fairfield. We can help guide
        you through the process.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Fairfield?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> to most Fairfield neighborhoods when you call before noon.
        Our base in Pinole gives us quick access to Fairfield via I-80, so we can typically have a
        dumpster at your location within hours of booking.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in Fairfield?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a typical kitchen or bathroom remodel in Fairfield, a <strong>20-yard dumpster</strong> is usually
        the best fit. For whole-home renovations or large construction projects, go with the 30-yard.
        For small cleanouts, concrete, or soil removal, the 10-yard works great.
      </p>
    ),
  },
  {
    question: "Do you deliver near Travis Air Force Base?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve all Fairfield ZIP codes including 94535, which covers the Travis Air Force Base
        area. Whether you&apos;re doing a housing renovation on base or a project nearby, we can deliver
        a dumpster to your location.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Fairfield?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Fairfield customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Home remodels and renovations</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Military base housing cleanouts and upgrades</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">New construction projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Ranch and rural property cleanups</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Yard debris and landscaping removal</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Fairfield ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every Fairfield ZIP code including 94533, 94534, and 94535 (Travis AFB). No
        matter where you are in Fairfield — from Cordelia to Green Valley to Rancho Solano — we can
        deliver.
      </p>
    ),
  },
];

const fairfieldAbout = {
  cityName: "Fairfield",
  intro:
    "Fairfield is the largest city in Solano County with a population of approximately 120,000 residents. Home to Travis Air Force Base, the famous Jelly Belly factory, and gateway to Suisun Valley wine country, Fairfield offers a unique mix of military families, suburban neighborhoods, and rural properties. With rapid growth driving new construction and home renovations across the city, there&apos;s always a project that needs a reliable dumpster. TP Dumpsters serves all of Fairfield including Cordelia, Green Valley, and Rancho Solano.",
  highlights: [
    "Serving all Fairfield neighborhoods from Cordelia to Rancho Solano",
    "Quick delivery to Travis Air Force Base area (ZIP 94535)",
    "Experience with new construction and rural property cleanups",
    "Familiar with Fairfield city permit requirements for street placement",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Home remodels and renovations in Rancho Solano and Fairfield Ranch",
    "Military housing upgrades near Travis Air Force Base",
    "New construction support in growing Fairfield developments",
    "Ranch and rural property cleanups in Green Valley and Suisun Valley",
    "Yard debris removal and landscaping projects across Fairfield",
    "Garage and estate cleanouts in Downtown Fairfield and Cordelia",
  ],
  closingText:
    "Whether you're a homeowner tackling a weekend cleanup or a contractor running a major renovation, TP Dumpsters makes waste removal in Fairfield easy. We offer transparent pricing, same-day delivery, and the local expertise to get your dumpster exactly where you need it. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Fairfield, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Fairfield, CA. Serving Cordelia, Green Valley, Rancho Solano, Travis AFB & all ZIP codes. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental fairfield ca",
    "fairfield dumpster rental",
    "dumpster rental fairfield california",
    "roll off dumpster fairfield",
    "construction dumpster fairfield ca",
    "cheap dumpster rental fairfield",
    "dumpster rental 94533",
    "dumpster rental 94534",
    "dumpster rental Travis AFB",
    "Solano County dumpster rental",
    "Cordelia dumpster rental",
    "Green Valley dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Fairfield, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Fairfield. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/fairfield",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/fairfield",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Fairfield",
  description:
    "Fast, reliable dumpster rentals in Fairfield, CA. Serving all Fairfield neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/fairfield",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Fairfield",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Fairfield",
      "@id": "https://en.wikipedia.org/wiki/Fairfield,_California",
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

export default function FairfieldPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <FairfieldHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...fairfieldAbout} />
<SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Fairfield" faqs={fairfieldFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <FairfieldLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
