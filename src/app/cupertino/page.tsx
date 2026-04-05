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
import CupertinoHero from "./components/CupertinoHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import CupertinoLocation from "./components/CupertinoLocation";

const cupertinoFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Cupertino?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Cupertino may require a temporary encroachment permit for dumpsters placed on public streets. Driveway placement typically doesn&apos;t need a permit. Given Cupertino&apos;s well-maintained residential neighborhoods and tech campuses, we can help navigate local requirements.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Cupertino?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> throughout Cupertino when you call before noon. From Rancho Rinconada to Monta Vista, Garden Gate to Homestead, our team delivers quickly across all neighborhoods.
      </p>
    ),
  },
  {
    question: "Do you serve Apple Park and other tech campuses in Cupertino?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Cupertino is home to Apple headquarters and many tech companies. We regularly serve commercial construction, office buildouts, and campus renovation projects. Whether it&apos;s residential or commercial, we have the right dumpster size for your Cupertino project.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in Cupertino?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        A <strong>20-yard dumpster</strong> is the most popular choice for Cupertino kitchen and bathroom remodels. For larger renovations on Cupertino&apos;s spacious homes in Monta Vista or Seven Springs, consider a 30-yard. The 10-yard works well for smaller projects.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Cupertino?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Cupertino customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">High-end home renovations in Monta Vista and Garden Gate</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">ADU construction and garage conversions</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Commercial office and tech campus projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping redesigns and backyard transformations</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts in Rancho Rinconada</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Cupertino ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve ZIP codes 95014 and 95015, covering all of Cupertino. From Rancho Rinconada to Oak Valley, Creston-Pharlap to Fairgrove, we deliver everywhere in the city.
      </p>
    ),
  },
];

const cupertinoAbout = {
  cityName: "Cupertino",
  intro:
    "Cupertino is a thriving Silicon Valley city, home to Apple headquarters and known for its excellent schools, diverse community, and high-tech innovation. With well-maintained neighborhoods ranging from Rancho Rinconada to Monta Vista, property improvement projects are constant. TP Dumpsters serves Cupertino with fast, professional dumpster rental for both residential and commercial needs.",
  highlights: [
    "Experienced with Cupertino's residential and tech campus projects",
    "Familiar with Cupertino permit requirements and HOA guidelines",
    "Fast delivery to all neighborhoods — Rancho Rinconada to Seven Springs",
    "Trusted by Cupertino contractors, homeowners, and commercial clients",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "High-end home renovations in Monta Vista and Garden Gate",
    "ADU construction and accessory dwelling projects",
    "Commercial office buildouts near Apple Park corridor",
    "Landscaping overhauls and backyard redesigns",
    "Estate cleanouts in Rancho Rinconada and Oak Valley",
    "Roofing and exterior upgrades across Cupertino neighborhoods",
  ],
  closingText:
    "Whether you're renovating a home in Monta Vista or managing a commercial project near Apple Park, TP Dumpsters delivers reliable waste removal in Cupertino. We offer transparent pricing, same-day delivery, and the professionalism Silicon Valley expects. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Cupertino, CA | Santa Clara County - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Cupertino, CA. Serving Rancho Rinconada, Monta Vista, Garden Gate, Homestead & all neighborhoods. Same-day delivery. Call (510) 650-2083",
  keywords: [
    "dumpster rental Cupertino CA",
    "Cupertino dumpster rental",
    "roll-off dumpster Cupertino",
    "construction dumpster Cupertino",
    "Cupertino waste removal",
    "dumpster rental 95014",
    "dumpster rental 95015",
    "Rancho Rinconada dumpster rental",
    "Monta Vista dumpster rental",
    "Garden Gate dumpster Cupertino",
    "Apple Park dumpster rental",
    "Santa Clara County dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Cupertino, CA - TP Dumpsters",
    description: "Fast, reliable dumpster rentals in Cupertino. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/cupertino",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/cupertino" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Cupertino",
  description: "Fast, reliable dumpster rentals in Cupertino, CA. Serving all Cupertino neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/cupertino",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: { "@type": "PostalAddress", addressLocality: "Cupertino", addressRegion: "CA", addressCountry: "US" },
  areaServed: [{ "@type": "City", name: "Cupertino", "@id": "https://en.wikipedia.org/wiki/Cupertino,_California" }],
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

export default function CupertinoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <CupertinoHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...cupertinoAbout} />
      <SizesSection />
      <DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Cupertino" faqs={cupertinoFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <CupertinoLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
