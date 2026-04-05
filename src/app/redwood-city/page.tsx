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
import RedwoodCityHero from "./components/RedwoodCityHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import RedwoodCityLocation from "./components/RedwoodCityLocation";

const redwoodCityFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Redwood City?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on a public street in Redwood City, you&apos;ll likely need a temporary encroachment permit from the city. If it&apos;s on your private driveway, no permit is usually needed. We can help guide you through the process.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Redwood City?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        In most Redwood City neighborhoods, we offer <strong>same-day delivery</strong> if you call before noon. Areas like Downtown, Redwood Shores, and Emerald Hills are within our delivery zone.
      </p>
    ),
  },
  {
    question: "Can you deliver to tech company offices and commercial sites in Redwood City?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! Redwood City is a major tech hub, and we regularly deliver dumpsters for office renovations, tenant improvements, and commercial buildouts. Whether it&apos;s a startup space downtown or a campus in Redwood Shores, we&apos;ve got you covered.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in Redwood City?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a typical kitchen or bathroom remodel in Redwood City, a <strong>20-yard dumpster</strong> is usually the best fit. For whole-home renovations or multi-room projects, go with the 30-yard. For small cleanouts or concrete/soil, the 10-yard works great.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Redwood City?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Redwood City customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Tech office renovations and tenant improvements</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Residential remodels in Woodside Plaza and Friendly Acres</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Downtown construction and demolition projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts and garage cleanups</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and yard debris removal in Emerald Hills</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Redwood City ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every Redwood City ZIP code including 94061, 94062, 94063, and 94065. From Downtown to Redwood Shores, no matter where you are in Redwood City, we can deliver.
      </p>
    ),
  },
];

const redwoodCityAbout = {
  cityName: "Redwood City",
  intro:
    "Redwood City is the county seat of San Mateo County and a thriving hub for tech companies, restaurants, and residential neighborhoods. From downtown office renovations to home remodels in Emerald Hills, Redwood City is constantly evolving. TP Dumpsters serves the entire Redwood City area, from the waterfront communities of Redwood Shores to the established neighborhoods of Woodside Plaza and Friendly Acres.",
  highlights: [
    "Serving Redwood City's downtown commercial district and residential areas",
    "Familiar with county seat permit requirements for street placement",
    "Fast delivery to all neighborhoods — Downtown to Redwood Shores",
    "Trusted by Redwood City contractors, tech companies, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Tech office renovations and tenant improvements downtown",
    "Kitchen and bathroom remodels in Woodside Plaza and Friendly Acres",
    "Estate cleanouts in residential neighborhoods",
    "Landscaping and yard debris removal in Emerald Hills",
    "New construction support in the Redwood Shores area",
    "Roofing projects across Redwood City's diverse housing stock",
  ],
  closingText:
    "Whether you're a homeowner tackling a weekend cleanup or a contractor running a major renovation, TP Dumpsters makes waste removal in Redwood City easy. We offer transparent pricing, same-day delivery, and the local expertise to get your dumpster exactly where you need it. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Redwood City, CA | County Seat - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Redwood City, CA. Serving Downtown, Redwood Shores, Emerald Hills, Woodside Plaza & all ZIP codes. Same-day delivery. Call (510) 650-2083",
  keywords: [
    "dumpster rental Redwood City CA",
    "Redwood City dumpster rental",
    "roll-off dumpster Redwood City",
    "construction dumpster Redwood City",
    "Redwood City waste removal",
    "dumpster rental 94061",
    "dumpster rental 94063",
    "dumpster rental Redwood Shores",
    "Downtown Redwood City dumpster",
    "Emerald Hills dumpster rental",
    "Woodside Plaza dumpster",
    "San Mateo County dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Redwood City, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Redwood City. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/redwood-city",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/redwood-city" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Redwood City",
  description: "Fast, reliable dumpster rentals in Redwood City, CA. Serving all Redwood City neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/redwood-city",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: { "@type": "PostalAddress", addressLocality: "Redwood City", addressRegion: "CA", addressCountry: "US" },
  areaServed: [{ "@type": "City", name: "Redwood City", "@id": "https://en.wikipedia.org/wiki/Redwood_City,_California" }],
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

export default function RedwoodCityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <RedwoodCityHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...redwoodCityAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Redwood City" faqs={redwoodCityFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <RedwoodCityLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
