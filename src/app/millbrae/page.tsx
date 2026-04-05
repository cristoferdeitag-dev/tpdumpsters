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
import MillbraeHero from "./components/MillbraeHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import MillbraeLocation from "./components/MillbraeLocation";

const millbraeFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Millbrae?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Millbrae may require a temporary encroachment permit for dumpsters placed on public streets. Private driveway placement typically doesn&apos;t need a permit. Given Millbrae&apos;s proximity to SFO and residential character, we can help you understand the local requirements.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Millbrae?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> to Millbrae when you call before noon. Whether you&apos;re in the Meadows, Green Hills, or Central Millbrae, our team delivers quickly across all neighborhoods.
      </p>
    ),
  },
  {
    question: "Can you deliver near the BART station or SFO flight paths?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! Millbrae is centrally located near SFO Airport and has excellent transit access. We regularly deliver to properties near the BART station, Millbrae Avenue, and throughout all neighborhoods. Our drivers know the area well and can navigate any location in Millbrae.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in Millbrae?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        A <strong>20-yard dumpster</strong> is ideal for kitchen and bathroom remodels in Millbrae. For larger renovations on Millbrae&apos;s mid-century homes or full-house projects, a 30-yard works best. The 10-yard is perfect for smaller cleanouts and heavy materials.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Millbrae?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Millbrae customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Home renovations in established neighborhoods like the Meadows</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Garage and attic cleanouts in Millbrae Highlands</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and yard debris removal in Green Hills</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing projects on mid-century homes</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts in Lomita Heights</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Millbrae ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve ZIP code 94030, which covers all of Millbrae. From the Meadows to Lomita Heights, Central Millbrae to Green Hills, we deliver everywhere in the city.
      </p>
    ),
  },
];

const millbraeAbout = {
  cityName: "Millbrae",
  intro:
    "Millbrae is a small, welcoming Peninsula city known for its excellent schools, BART/Caltrain station, and proximity to San Francisco International Airport. With well-maintained neighborhoods like the Meadows, Green Hills, and Millbrae Highlands, home improvement projects are a constant in this active community. TP Dumpsters serves Millbrae with fast, reliable dumpster rental service.",
  highlights: [
    "Experienced with Millbrae's residential neighborhoods and street layouts",
    "Familiar with Millbrae permit requirements for street placement",
    "Fast delivery to all neighborhoods — the Meadows to Lomita Heights",
    "Trusted by Millbrae contractors, homeowners, and property managers",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Home renovations in the Meadows and Millbrae Highlands",
    "Kitchen and bathroom remodels on mid-century homes",
    "Garage and attic cleanouts in Green Hills",
    "Landscaping redesigns and backyard improvements",
    "Roofing projects across Millbrae neighborhoods",
    "Estate cleanouts in Lomita Heights and Central Millbrae",
  ],
  closingText:
    "Whether you're updating a home in the Meadows or managing a renovation in Millbrae Highlands, TP Dumpsters makes waste removal simple. We offer transparent pricing, same-day delivery, and the local expertise Millbrae homeowners trust. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Millbrae, CA | San Mateo County - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Millbrae, CA. Serving the Meadows, Green Hills, Millbrae Highlands, Lomita Heights & all neighborhoods. Same-day delivery. Call (510) 650-2083",
  keywords: [
    "dumpster rental Millbrae CA",
    "Millbrae dumpster rental",
    "roll-off dumpster Millbrae",
    "construction dumpster Millbrae",
    "Millbrae waste removal",
    "dumpster rental 94030",
    "Meadows dumpster rental Millbrae",
    "Green Hills dumpster rental",
    "Millbrae Highlands dumpster rental",
    "Lomita Heights dumpster Millbrae",
    "Central Millbrae dumpster rental",
    "San Mateo County dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Millbrae, CA - TP Dumpsters",
    description: "Fast, reliable dumpster rentals in Millbrae. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/millbrae",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/millbrae" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Millbrae",
  description: "Fast, reliable dumpster rentals in Millbrae, CA. Serving all Millbrae neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/millbrae",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: { "@type": "PostalAddress", addressLocality: "Millbrae", addressRegion: "CA", addressCountry: "US" },
  areaServed: [{ "@type": "City", name: "Millbrae", "@id": "https://en.wikipedia.org/wiki/Millbrae,_California" }],
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

export default function MillbraePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <MillbraeHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...millbraeAbout} />
      <SizesSection />
      <DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Millbrae" faqs={millbraeFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <MillbraeLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
