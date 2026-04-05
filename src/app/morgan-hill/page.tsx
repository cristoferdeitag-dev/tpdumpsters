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
import MorganHillHero from "./components/MorganHillHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import MorganHillLocation from "./components/MorganHillLocation";

const morganHillFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Morgan Hill?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Morgan Hill may require a temporary encroachment permit for dumpsters on public streets. Private driveway placement typically doesn&apos;t need a permit. We&apos;ll help you navigate Morgan Hill&apos;s requirements.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Morgan Hill?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer delivery to Morgan Hill and can typically provide <strong>same-day service</strong> when you call before noon. From Downtown Morgan Hill to Paradise Valley, El Toro to Holiday Lake Estates, we deliver throughout the city.
      </p>
    ),
  },
  {
    question: "Do you serve the newer developments and rural areas in Morgan Hill?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Morgan Hill has both established neighborhoods and new developments, plus rural areas near the San Martin border. We serve all of Morgan Hill, from downtown to the newer subdivisions in Jackson Oaks and Holiday Lake Estates, and rural properties throughout the area.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in Morgan Hill?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        A <strong>20-yard dumpster</strong> is the most popular choice for Morgan Hill kitchen and bathroom remodels. For larger homes in Paradise Valley or whole-house renovations, a 30-yard works best. The 10-yard is perfect for smaller cleanouts.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Morgan Hill?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Morgan Hill customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">New construction debris in growing neighborhoods</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Home renovations in El Toro and Madrone</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and yard cleanup in Paradise Valley</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Farm and property cleanups in rural areas</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts in Holiday Lake Estates</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Morgan Hill ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve ZIP codes 95037 and 95038, covering all of Morgan Hill. From Downtown to Sunnyside, Jackson Oaks to the San Martin border, we deliver everywhere.
      </p>
    ),
  },
];

const morganHillAbout = {
  cityName: "Morgan Hill",
  intro:
    "Morgan Hill is a growing South Bay city known for its small-town charm, vineyard-dotted hills, and family-friendly neighborhoods. With ongoing residential development and established communities, construction and improvement projects are constant. TP Dumpsters serves Morgan Hill with reliable dumpster rental for new construction, renovations, and cleanups.",
  highlights: [
    "Experienced with Morgan Hill's mix of new developments and rural areas",
    "Familiar with Morgan Hill permit requirements",
    "Fast delivery to all neighborhoods — Downtown to Paradise Valley",
    "Trusted by Morgan Hill contractors, homeowners, and developers",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "New construction debris removal in growing subdivisions",
    "Home renovations in El Toro and Madrone neighborhoods",
    "Landscaping and yard cleanup in Paradise Valley",
    "Farm and rural property cleanups near San Martin",
    "Estate cleanouts in Holiday Lake Estates and Jackson Oaks",
    "Roofing and exterior projects across Morgan Hill",
  ],
  closingText:
    "Whether you're building a new home in Jackson Oaks or renovating in Downtown Morgan Hill, TP Dumpsters provides reliable waste removal. We offer transparent pricing and professional service. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Morgan Hill, CA | Santa Clara County - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Morgan Hill, CA. Serving El Toro, Paradise Valley, Jackson Oaks & all neighborhoods. Same-day delivery. Call (510) 650-2083",
  keywords: [
    "dumpster rental Morgan Hill CA",
    "Morgan Hill dumpster rental",
    "roll-off dumpster Morgan Hill",
    "construction dumpster Morgan Hill",
    "Morgan Hill waste removal",
    "dumpster rental 95037",
    "dumpster rental 95038",
    "Downtown Morgan Hill dumpster rental",
    "Paradise Valley dumpster rental",
    "Jackson Oaks dumpster Morgan Hill",
    "Holiday Lake Estates dumpster rental",
    "Santa Clara County dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Morgan Hill, CA - TP Dumpsters",
    description: "Fast, reliable dumpster rentals in Morgan Hill. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/morgan-hill",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/morgan-hill" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Morgan Hill",
  description: "Fast, reliable dumpster rentals in Morgan Hill, CA. Serving all Morgan Hill neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/morgan-hill",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: { "@type": "PostalAddress", addressLocality: "Morgan Hill", addressRegion: "CA", addressCountry: "US" },
  areaServed: [{ "@type": "City", name: "Morgan Hill", "@id": "https://en.wikipedia.org/wiki/Morgan_Hill,_California" }],
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

export default function MorganHillPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <MorganHillHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...morganHillAbout} />
      <SizesSection />
      <DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Morgan Hill" faqs={morganHillFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <MorganHillLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
