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
import BurlingameHero from "./components/BurlingameHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import BurlingameLocation from "./components/BurlingameLocation";

const burlingameFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Burlingame?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If you&apos;re placing a dumpster on a public street in Burlingame, you&apos;ll likely need a temporary encroachment permit from the City of Burlingame Public Works Department. Placement on your private driveway typically doesn&apos;t require a permit. We can help guide you through the process.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Burlingame?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> to most Burlingame neighborhoods when you call before noon. Whether you&apos;re on Broadway, in Burlingame Hills, or near Easton, our drivers know the area well and can get your dumpster placed quickly.
      </p>
    ),
  },
  {
    question: "Can you deliver to tree-lined streets in Burlingame?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! Burlingame is known for its beautiful tree-lined avenues and charming residential streets. Our experienced drivers are skilled at navigating neighborhoods like Ray Park, Lyon-Hoag, and Burlingame Park where mature trees and narrower streets are common. Just share your address and we&apos;ll confirm the best placement.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in Burlingame?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a typical kitchen or bathroom remodel in Burlingame, a <strong>20-yard dumpster</strong> is usually the best choice. For larger renovations on Burlingame&apos;s classic homes or estate properties in Mills Estates, a 30-yard may be needed. Smaller cleanouts work great with a 10-yard.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Burlingame?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Burlingame customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Renovating charming older homes on the Burlingame Avenue corridor</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Garage and estate cleanouts in Mills Estates</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping updates and yard debris removal</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Commercial tenant improvements on Broadway</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing projects on classic Burlingame bungalows</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Burlingame ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve ZIP code 94010, which covers all of Burlingame. From Broadway to North Burlingame, Easton to Burlingame Hills, we deliver everywhere in town.
      </p>
    ),
  },
];

const burlingameAbout = {
  cityName: "Burlingame",
  intro:
    "Burlingame is a charming Peninsula city known for its tree-lined streets, vibrant downtown on Burlingame Avenue, and beautiful residential neighborhoods. With a mix of classic California bungalows, mid-century homes, and newer construction, renovation and improvement projects are always underway. TP Dumpsters proudly serves Burlingame homeowners, contractors, and businesses with reliable dumpster rental service.",
  highlights: [
    "Expert navigation of Burlingame's tree-lined residential streets",
    "Familiar with Burlingame permit requirements for street-side placement",
    "Fast delivery to all neighborhoods — Broadway to Mills Estates",
    "Trusted by Burlingame contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Home renovations on classic bungalows along Burlingame Avenue",
    "Kitchen and bathroom remodels in Ray Park and Easton",
    "Estate cleanouts in Mills Estates luxury properties",
    "Landscaping and yard debris removal in Burlingame Hills",
    "Commercial tenant improvements on Broadway",
    "Roofing projects across Burlingame's older housing stock",
  ],
  closingText:
    "Whether you're a homeowner renovating a charming Burlingame bungalow or a contractor managing a large project, TP Dumpsters makes waste removal easy. We offer transparent pricing, same-day delivery, and the local expertise to place your dumpster exactly where you need it. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Burlingame, CA | San Mateo County - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Burlingame, CA. Serving Broadway, Mills Estates, Ray Park, Easton & all neighborhoods. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Burlingame CA",
    "Burlingame dumpster rental",
    "roll-off dumpster Burlingame",
    "construction dumpster Burlingame",
    "Burlingame waste removal",
    "dumpster rental 94010",
    "dumpster rental Broadway Burlingame",
    "Mills Estates dumpster rental",
    "Ray Park dumpster rental",
    "Burlingame Hills dumpster rental",
    "Easton dumpster Burlingame",
    "San Mateo County dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Burlingame, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Burlingame. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/burlingame",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/burlingame",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Burlingame",
  description:
    "Fast, reliable dumpster rentals in Burlingame, CA. Serving all Burlingame neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/burlingame",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Burlingame",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Burlingame",
      "@id": "https://en.wikipedia.org/wiki/Burlingame,_California",
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

export default function BurlingamePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <BurlingameHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...burlingameAbout} />
      <SizesSection />
      <DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Burlingame" faqs={burlingameFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <BurlingameLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
