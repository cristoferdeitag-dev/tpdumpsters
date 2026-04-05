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
import PacificaHero from "./components/PacificaHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import PacificaLocation from "./components/PacificaLocation";

const pacificaFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Pacifica?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on a public street in Pacifica, you may need a temporary encroachment permit from the city. If it&apos;s on your private driveway, no permit is usually needed. We can help guide you through the process.
      </p>
    ),
  },
  {
    question: "Can you deliver to narrow coastal roads in Pacifica?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We&apos;re experienced with Pacifica&apos;s narrow coastal roads and cliff-side properties. Whether it&apos;s Pedro Point, Rockaway Beach, or Linda Mar, our drivers know how to navigate tight access points along the coast. Just let us know your address and we&apos;ll confirm placement.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Pacifica?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> to Pacifica if you call before noon. All neighborhoods from Sharp Park to Linda Mar and Park Pacifica are within our delivery zone.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a coastal property renovation in Pacifica?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For coastal property renovations in Pacifica, a <strong>20-yard dumpster</strong> is usually the best fit for kitchen/bathroom remodels. For larger projects or whole-home renovations, go with the 30-yard. For small cleanouts, concrete removal, or beach property cleanup, the 10-yard works great.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Pacifica?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Pacifica customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Coastal property renovations and weatherproofing projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Cliff-side home remodels and structural repairs</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Beach community cleanup and landscaping debris</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts and garage cleanups</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing projects exposed to coastal weather</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Pacifica ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve Pacifica&apos;s ZIP code 94044, covering every neighborhood from Linda Mar and Rockaway Beach to Sharp Park, Pedro Point, and Park Pacifica. Wherever you are in Pacifica, we can deliver.
      </p>
    ),
  },
];

const pacificaAbout = {
  cityName: "Pacifica",
  intro:
    "Pacifica is a beautiful coastal city nestled along the Pacific Ocean in San Mateo County. Known for its stunning beaches, surfing community, and dramatic cliff-side homes, Pacifica presents unique challenges for construction and renovation projects. From coastal weatherproofing repairs to home remodels in Linda Mar, TP Dumpsters serves all of Pacifica with reliable, affordable dumpster rentals — even on the narrowest coastal roads.",
  highlights: [
    "Experienced with Pacifica's narrow coastal roads and cliff-side access",
    "Familiar with Pacifica city permit requirements for coastal properties",
    "Fast delivery to all neighborhoods — Linda Mar to Pedro Point",
    "Trusted by Pacifica contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Coastal property renovations and weatherproofing in Pedro Point",
    "Kitchen and bathroom remodels in Linda Mar",
    "Beach community cleanup projects near Rockaway Beach",
    "Estate cleanouts in Sharp Park and Fairway Park",
    "Landscaping and yard debris removal in Park Pacifica",
    "Roofing and structural repair on cliff-side homes",
  ],
  closingText:
    "Whether you're renovating a coastal property or tackling a weekend cleanup, TP Dumpsters makes waste removal in Pacifica easy. We offer transparent pricing, same-day delivery, and the local expertise to navigate Pacifica's unique coastal terrain. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Pacifica, CA | Coastal San Mateo County - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Pacifica, CA. Serving Linda Mar, Rockaway Beach, Pedro Point, Sharp Park & all neighborhoods. Same-day delivery. Call (510) 650-2083",
  keywords: [
    "dumpster rental Pacifica CA",
    "Pacifica dumpster rental",
    "roll-off dumpster Pacifica",
    "construction dumpster Pacifica",
    "Pacifica waste removal",
    "dumpster rental 94044",
    "dumpster rental Linda Mar",
    "Rockaway Beach dumpster rental",
    "Pedro Point dumpster",
    "Sharp Park dumpster rental",
    "coastal dumpster rental Pacifica",
    "San Mateo County dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Pacifica, CA - TP Dumpsters",
    description: "Fast, reliable dumpster rentals in Pacifica. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/pacifica",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/pacifica" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Pacifica",
  description: "Fast, reliable dumpster rentals in Pacifica, CA. Serving all Pacifica neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/pacifica",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: { "@type": "PostalAddress", addressLocality: "Pacifica", addressRegion: "CA", addressCountry: "US" },
  areaServed: [{ "@type": "City", name: "Pacifica", "@id": "https://en.wikipedia.org/wiki/Pacifica,_California" }],
  priceRange: "$$",
  openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "07:00", closes: "18:00" },
  hasOfferCatalog: {
    "@type": "OfferCatalog", name: "Dumpster Rental Sizes",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "10 Yard Dumpster Rental", description: "Compact dumpster ideal for tight spaces and heavy debris like soil, concrete, and bricks." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "20 Yard Dumpster Rental", description: "Versatile dumpster for kitchen/bathroom remodels, roofing projects, and yard cleanups." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "30 Yard Dumpster Rental", description: "Extra capacity dumpster for whole-home cleanouts, large renovations, and construction debris." } },
    ],
  },
};

export default function PacificaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <PacificaHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...pacificaAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Pacifica" faqs={pacificaFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <PacificaLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
