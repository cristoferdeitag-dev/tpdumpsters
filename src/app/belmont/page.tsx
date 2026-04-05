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
import BelmontHero from "./components/BelmontHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import BelmontLocation from "./components/BelmontLocation";

const belmontFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Belmont?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Belmont may require a temporary encroachment permit for dumpsters placed on public streets. Private driveway placement typically doesn&apos;t require a permit. Given Belmont&apos;s hilly terrain, we can advise on the best placement location for your property.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Belmont?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> to Belmont neighborhoods when you call before noon. Whether you&apos;re in Belmont Hills, Carlmont, or Sterling Downs, our team can get a dumpster placed quickly.
      </p>
    ),
  },
  {
    question: "Can you deliver to hillside homes in Belmont?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! Belmont is known for its hillside neighborhoods with stunning Bay views. Our drivers are experienced with the winding roads and steep driveways in areas like Belmont Hills, Upper Cipriani, and Hallmark. We&apos;ll work with you to find the safest placement option.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in Belmont?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        A <strong>20-yard dumpster</strong> is the go-to for kitchen and bathroom remodels in Belmont. For larger hillside home renovations or whole-house projects in Carlmont, a 30-yard is recommended. The 10-yard handles concrete, soil, and small cleanouts perfectly.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Belmont?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Belmont customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Home renovations in hillside properties with Bay views</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Deck and outdoor living space construction</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Garage and basement cleanouts in Carlmont homes</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and hillside yard maintenance</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing projects in Sterling Downs and Belmont Village</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Belmont ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve ZIP code 94002, covering all of Belmont. From Belmont Hills to Homeview, Cipriani to Carlmont, we deliver to every neighborhood.
      </p>
    ),
  },
];

const belmontAbout = {
  cityName: "Belmont",
  intro:
    "Belmont is a scenic Peninsula city perched on the hills between San Carlos and San Mateo, offering stunning Bay views and a mix of mid-century and modern homes. With its hillside terrain and active homeowner community, renovation and improvement projects are always underway. TP Dumpsters serves Belmont with the expertise needed to navigate hilly streets and deliver reliably.",
  highlights: [
    "Expert navigation of Belmont's hillside streets and steep driveways",
    "Familiar with Belmont's residential permit requirements",
    "Fast delivery to all neighborhoods — Belmont Hills to Carlmont",
    "Trusted by Belmont contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Hillside home renovations with panoramic Bay views",
    "Kitchen and bathroom remodels in Sterling Downs",
    "Deck construction and outdoor living improvements",
    "Garage cleanouts in Carlmont and Homeview",
    "Landscaping and retaining wall projects on hillside lots",
    "Roofing projects across Belmont's diverse housing stock",
  ],
  closingText:
    "Whether you're renovating a hillside home in Belmont or clearing out a garage in Carlmont, TP Dumpsters makes waste removal easy. We offer transparent pricing, same-day delivery, and the hillside expertise Belmont properties require. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Belmont, CA | San Mateo County - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Belmont, CA. Serving Belmont Hills, Carlmont, Sterling Downs, Cipriani & all neighborhoods. Same-day delivery. Call (510) 650-2083",
  keywords: [
    "dumpster rental Belmont CA",
    "Belmont dumpster rental",
    "roll-off dumpster Belmont",
    "construction dumpster Belmont",
    "Belmont waste removal",
    "dumpster rental 94002",
    "Belmont Hills dumpster rental",
    "Carlmont dumpster rental",
    "Sterling Downs dumpster Belmont",
    "Cipriani dumpster rental",
    "hillside dumpster Belmont",
    "San Mateo County dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Belmont, CA - TP Dumpsters",
    description: "Fast, reliable dumpster rentals in Belmont. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/belmont",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/belmont" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Belmont",
  description: "Fast, reliable dumpster rentals in Belmont, CA. Serving all Belmont neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/belmont",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: { "@type": "PostalAddress", addressLocality: "Belmont", addressRegion: "CA", addressCountry: "US" },
  areaServed: [{ "@type": "City", name: "Belmont", "@id": "https://en.wikipedia.org/wiki/Belmont,_California" }],
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

export default function BelmontPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <BelmontHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...belmontAbout} />
      <SizesSection />
      <DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Belmont" faqs={belmontFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <BelmontLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
