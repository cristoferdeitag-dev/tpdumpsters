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
import MenloParkHero from "./components/MenloParkHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import MenloParkLocation from "./components/MenloParkLocation";

const menloParkFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Menlo Park?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Street placement in Menlo Park typically requires a temporary encroachment permit from the City of Menlo Park Public Works. Dumpsters on private driveways usually don&apos;t need a permit. Given Menlo Park&apos;s residential character and proximity to Stanford, we can help navigate the local regulations.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Menlo Park?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> throughout Menlo Park when you call before noon. From Downtown Menlo Park to Belle Haven, Sharon Heights to The Willows, our team delivers quickly to all neighborhoods.
      </p>
    ),
  },
  {
    question: "Do you serve tech company offices and commercial projects in Menlo Park?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Menlo Park is home to major tech companies and we regularly serve commercial renovation and construction projects in the area. Whether it&apos;s an office buildout near Sand Hill Road or a tenant improvement project, we have the right dumpster size for your commercial needs.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in Menlo Park?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a typical kitchen or bathroom remodel in Menlo Park, a <strong>20-yard dumpster</strong> is the most popular choice. For larger renovations on the expansive homes in Sharon Heights or Stanford Hills, a 30-yard works best. Small cleanouts and concrete disposal fit perfectly in a 10-yard.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Menlo Park?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Menlo Park customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">High-end home renovations in Sharon Heights and Allied Arts</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">ADU construction and garage conversions</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping overhauls and backyard redesigns</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Commercial office buildouts and tech campus projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts in Felton Gables and Linfield Oaks</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Menlo Park ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve ZIP codes 94025 and 94026, covering all of Menlo Park. From Downtown to Belle Haven, Stanford Hills to The Willows, we deliver to every part of the city.
      </p>
    ),
  },
];

const menloParkAbout = {
  cityName: "Menlo Park",
  intro:
    "Menlo Park is a prestigious Peninsula city known for its proximity to Stanford University, thriving tech industry, and beautiful residential neighborhoods. From the tree-lined streets of Allied Arts to the upscale homes of Sharon Heights, property improvement projects are a constant in this vibrant community. TP Dumpsters provides fast, reliable dumpster rental service to Menlo Park residents and businesses.",
  highlights: [
    "Experienced with Menlo Park's upscale residential neighborhoods and regulations",
    "Serve both residential and commercial tech campus projects",
    "Fast delivery to all neighborhoods — Downtown to Belle Haven",
    "Trusted by Menlo Park contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "High-end home renovations in Sharon Heights and Allied Arts",
    "ADU construction and accessory dwelling unit projects",
    "Commercial buildouts near Sand Hill Road corridor",
    "Landscaping redesigns in Felton Gables and The Willows",
    "Estate cleanouts in Linfield Oaks and Stanford Hills",
    "Roofing and exterior upgrades on mid-century homes",
  ],
  closingText:
    "Whether you're renovating a classic Menlo Park home or managing a commercial construction project, TP Dumpsters delivers reliable waste removal. We offer transparent pricing, same-day delivery, and the professionalism Menlo Park expects. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Menlo Park, CA | San Mateo County - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Menlo Park, CA. Serving Sharon Heights, Belle Haven, Allied Arts, The Willows & all neighborhoods. Same-day delivery. Call (510) 650-2083",
  keywords: [
    "dumpster rental Menlo Park CA",
    "Menlo Park dumpster rental",
    "roll-off dumpster Menlo Park",
    "construction dumpster Menlo Park",
    "Menlo Park waste removal",
    "dumpster rental 94025",
    "dumpster rental 94026",
    "Sharon Heights dumpster rental",
    "Belle Haven dumpster rental",
    "Allied Arts dumpster Menlo Park",
    "Stanford Hills dumpster rental",
    "San Mateo County dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Menlo Park, CA - TP Dumpsters",
    description: "Fast, reliable dumpster rentals in Menlo Park. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/menlo-park",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/menlo-park" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Menlo Park",
  description: "Fast, reliable dumpster rentals in Menlo Park, CA. Serving all Menlo Park neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/menlo-park",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: { "@type": "PostalAddress", addressLocality: "Menlo Park", addressRegion: "CA", addressCountry: "US" },
  areaServed: [{ "@type": "City", name: "Menlo Park", "@id": "https://en.wikipedia.org/wiki/Menlo_Park,_California" }],
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

export default function MenloParkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <MenloParkHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...menloParkAbout} />
      <SizesSection />
      <DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Menlo Park" faqs={menloParkFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <MenloParkLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
