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
import FosterCityHero from "./components/FosterCityHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import FosterCityLocation from "./components/FosterCityLocation";

const fosterCityFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Foster City?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Foster City may require a temporary encroachment permit for dumpsters placed on public streets. Since Foster City is a planned community with well-maintained streetscapes, placement on your private driveway is usually the easiest option. We&apos;ll help you navigate the city&apos;s requirements.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Foster City?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> throughout Foster City when you call before noon. Foster City&apos;s well-planned grid layout makes delivery efficient to all neighborhoods, from Metro Center to the Islands area.
      </p>
    ),
  },
  {
    question: "Are there any special considerations for Foster City's lagoon-side properties?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes, Foster City is built on reclaimed land with many waterfront properties along the lagoon system. Our drivers are careful about weight distribution and driveway placement near lagoon-side homes. We ensure proper placement to protect both your property and the surrounding infrastructure.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in Foster City?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a typical kitchen or bathroom remodel in Foster City, a <strong>20-yard dumpster</strong> is the most popular pick. For larger renovations on Foster City&apos;s spacious waterfront homes, go with the 30-yard. The 10-yard is great for smaller cleanouts or heavy materials.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Foster City?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Foster City customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Home renovations and updates on lagoon-front properties</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Garage and storage cleanouts in planned neighborhoods</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping projects and backyard redesigns</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Commercial tenant improvements at Metro Center</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing replacements on HOA-managed townhomes</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Foster City ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve ZIP code 94404, which covers all of Foster City. From the Islands to Metro Center, Marlin Cove to Port Royal, we deliver everywhere in Foster City.
      </p>
    ),
  },
];

const fosterCityAbout = {
  cityName: "Foster City",
  intro:
    "Foster City is a unique planned community built on reclaimed land in the San Francisco Bay, known for its extensive lagoon system, waterfront living, and family-friendly neighborhoods. With well-maintained homes, active HOA communities, and ongoing property improvements, dumpster rentals are in steady demand. TP Dumpsters understands Foster City&apos;s distinct layout and delivers reliable, efficient service.",
  highlights: [
    "Experienced with Foster City's planned community layout and lagoon-side properties",
    "Familiar with Foster City HOA requirements and placement guidelines",
    "Fast delivery across Foster City's well-organized street grid",
    "Trusted by Foster City contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Waterfront home renovations along the Foster City lagoon",
    "Kitchen and bathroom remodels in planned neighborhoods",
    "HOA-approved roofing and exterior upgrades",
    "Garage cleanouts and downsizing projects",
    "Landscaping and backyard redesigns near Sea Cloud Park",
    "Commercial projects at Metro Center business district",
  ],
  closingText:
    "Whether you're updating a lagoon-side home or managing a commercial project at Metro Center, TP Dumpsters makes waste removal in Foster City seamless. We offer transparent pricing, same-day delivery, and the local knowledge to work within Foster City's unique community. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Foster City, CA | San Mateo County - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Foster City, CA. Serving Metro Center, the Islands, Marlin Cove, Port Royal & all neighborhoods. Same-day delivery. Call (510) 650-2083",
  keywords: [
    "dumpster rental Foster City CA",
    "Foster City dumpster rental",
    "roll-off dumpster Foster City",
    "construction dumpster Foster City",
    "Foster City waste removal",
    "dumpster rental 94404",
    "dumpster rental Metro Center Foster City",
    "Foster City Islands dumpster rental",
    "lagoon dumpster Foster City",
    "Marlin Cove dumpster rental",
    "Port Royal dumpster Foster City",
    "San Mateo County dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Foster City, CA - TP Dumpsters",
    description: "Fast, reliable dumpster rentals in Foster City. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/foster-city",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/foster-city" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Foster City",
  description: "Fast, reliable dumpster rentals in Foster City, CA. Serving all Foster City neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/foster-city",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: { "@type": "PostalAddress", addressLocality: "Foster City", addressRegion: "CA", addressCountry: "US" },
  areaServed: [{ "@type": "City", name: "Foster City", "@id": "https://en.wikipedia.org/wiki/Foster_City,_California" }],
  priceRange: "$$",
  openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "07:00", closes: "18:00" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dumpster Rental Sizes",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "10 Yard Dumpster Rental", description: "Compact dumpster ideal for tight spaces and heavy debris like soil, concrete, and bricks." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "20 Yard Dumpster Rental", description: "Versatile dumpster for kitchen/bathroom remodels, roofing projects, and yard cleanups." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "30 Yard Dumpster Rental", description: "Extra capacity dumpster for whole-home cleanouts, large renovations, and construction debris." } },
    ],
  },
};

export default function FosterCityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <FosterCityHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...fosterCityAbout} />
      <SizesSection />
      <DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Foster City" faqs={fosterCityFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <FosterCityLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
