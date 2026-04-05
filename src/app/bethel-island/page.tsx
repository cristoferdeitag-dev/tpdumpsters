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
import BethelIslandHero from "./components/BethelIslandHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import BethelIslandLocation from "./components/BethelIslandLocation";

const bethelIslandFaqs = [
  {
    question: "Can you deliver dumpsters to Bethel Island despite the access challenges?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We regularly deliver to Bethel Island. While the island is accessed via a single bridge,
        our drivers know the route well and can deliver to properties along Gateway Road, Sandmound
        Boulevard, and throughout the island. We&apos;ll coordinate timing to ensure smooth delivery.
      </p>
    ),
  },
  {
    question: "How does Delta area delivery work for Bethel Island?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We serve the entire Delta area including Bethel Island. Our trucks travel via the bridge access
        and can reach all parts of the island. We recommend scheduling in advance during busy seasons,
        but same-day delivery is often available.
      </p>
    ),
  },
  {
    question: "What size dumpster works for waterfront property cleanup on Bethel Island?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For waterfront property cleanups on Bethel Island, a <strong>20-yard dumpster</strong> handles
        most jobs including dock debris, old decking, and general property waste. For larger projects
        involving home renovation or multiple structures, the 30-yard is recommended.
      </p>
    ),
  },
  {
    question: "Can you handle rural property debris removal on Bethel Island?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. Many Bethel Island properties are larger rural lots with significant cleanup needs.
        We handle everything from old fencing and outbuilding demolition to general yard waste and
        property clearing. Our 10-yard dumpster is great for smaller jobs, while the 20 and 30-yard
        options handle bigger projects.
      </p>
    ),
  },
  {
    question: "Do you handle boat and dock renovation waste on Bethel Island?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Many Bethel Island residents have docks and waterfront structures that need periodic
        renovation. Our dumpsters are perfect for old dock materials, boat-related debris, and
        marine renovation waste. Just let us know what materials you&apos;ll be disposing of so we
        can recommend the right size.
      </p>
    ),
  },
  {
    question: "Do you serve the Bethel Island ZIP code 94511?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve Bethel Island ZIP code 94511 and all areas of the island including Dutch Slough,
        Piper Slough, Gateway Road, and Sandmound Boulevard.
      </p>
    ),
  },
];

const bethelIslandAbout = {
  cityName: "Bethel Island",
  intro:
    "Bethel Island is a unique Delta island community in eastern Contra Costa County, surrounded by waterways and known for its rural charm, waterfront living, and outdoor lifestyle. With properties ranging from cozy waterfront cottages to larger rural lots, residents here regularly take on renovation, dock repair, and property cleanup projects. TP Dumpsters provides reliable dumpster rental service to Bethel Island, understanding the unique access requirements and logistics of delivering to an island community.",
  highlights: [
    "Experienced with island access and bridge route logistics",
    "Serve the entire Delta area including surrounding communities",
    "Fast delivery to all Bethel Island properties",
    "Trusted by Bethel Island homeowners and local contractors",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Waterfront property renovations and dock repairs",
    "Home remodels and additions on Sandmound Boulevard",
    "Rural property cleanups and debris removal",
    "Boat and marine renovation waste disposal",
    "Garage and estate cleanouts throughout the island",
    "Landscaping and yard waste removal along Gateway Road",
  ],
  closingText:
    "Whether you're renovating a waterfront cottage or clearing a rural lot on Bethel Island, TP Dumpsters makes waste removal easy — even on the Delta. We offer transparent pricing, reliable delivery, and the local knowledge to handle island logistics. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Bethel Island, CA | Delta Service - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals on Bethel Island, CA. Serving the entire Delta island community & ZIP code 94511. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Bethel Island CA",
    "Bethel Island dumpster rental",
    "roll-off dumpster Bethel Island",
    "construction dumpster Bethel Island",
    "Bethel Island waste removal",
    "dumpster rental 94511",
    "Delta island dumpster rental",
    "waterfront dumpster Bethel Island",
    "dock renovation dumpster",
    "rural property cleanup Bethel Island",
  ],
  openGraph: {
    title: "Dumpster Rental in Bethel Island, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals on Bethel Island. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/bethel-island",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/bethel-island",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Bethel Island",
  description:
    "Fast, reliable dumpster rentals on Bethel Island, CA. Serving the entire Delta island community with same-day delivery.",
  url: "https://tpdumpsters.com/bethel-island",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bethel Island",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "Place",
      name: "Bethel Island",
      "@id": "https://en.wikipedia.org/wiki/Bethel_Island,_California",
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

export default function BethelIslandPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <BethelIslandHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...bethelIslandAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Bethel Island" faqs={bethelIslandFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <BethelIslandLocation />

      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[800px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-2xl md:text-3xl font-bold text-[#222] mb-6 text-center">
            Why Rent a Dumpster in Bethel Island, California?
          </h2>
          <div className="text-[#555] text-base leading-[1.8] font-[var(--font-poppins)] space-y-4">
            <p>
              Bethel Island is a one-of-a-kind Delta community where waterfront living meets rural
              charm. Homeowners here face unique challenges — from maintaining docks and waterfront
              structures to managing larger rural properties with outbuildings and extensive
              landscaping. Whether you&apos;re tearing out an old dock, renovating a cottage, or
              clearing years of accumulated debris from a large lot, having a dumpster on-site is
              essential for staying organized and getting the job done efficiently.
            </p>
            <p>
              TP Dumpsters is one of the few dumpster rental companies that regularly serves Bethel
              Island. We understand the bridge access logistics and know how to get our trucks to your
              property smoothly. Our 10, 20, and 30-yard roll-off dumpsters handle everything from
              small cleanouts to major renovation projects. With same-day delivery available, transparent
              pricing, and a bilingual team ready to assist, we make waste removal on the island as
              simple as calling (510) 650-2083.
            </p>
          </div>
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </>
  );
}
