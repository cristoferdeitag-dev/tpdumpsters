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
import SaratogaHero from "./components/SaratogaHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import SaratogaLocation from "./components/SaratogaLocation";

const saratogaFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Saratoga?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Saratoga may require a temporary encroachment permit for dumpsters placed on public streets. Given Saratoga&apos;s upscale residential character and winding hillside roads, driveway placement is often preferred. We&apos;ll help you navigate local requirements.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Saratoga?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> throughout Saratoga when you call before noon. From Downtown Saratoga to Congress Springs, Saratoga Woods to the Golden Triangle, our team delivers efficiently.
      </p>
    ),
  },
  {
    question: "Can you deliver to hillside estates in Saratoga?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Saratoga is known for its luxurious hillside estates with long driveways and wooded lots. Our experienced drivers navigate these challenging access points regularly, including properties in Congress Springs and Manor Drive. We&apos;ll find the best placement for your property.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in Saratoga?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        A <strong>20-yard dumpster</strong> is the most popular choice for Saratoga remodels. For larger estate renovations in Saratoga Woods or Saratoga Legends, a 30-yard may be needed. The 10-yard handles smaller projects beautifully.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Saratoga?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Saratoga customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Luxury estate renovations in Congress Springs and Manor Drive</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">High-end kitchen and bathroom remodels</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping overhauls on wooded hillside properties</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Deck and outdoor living space construction</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts in Saratoga Legends and Azule</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Saratoga ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve ZIP codes 95070 and 95071, covering all of Saratoga. From Downtown to the Golden Triangle, Brookglen to Congress Springs, we deliver everywhere.
      </p>
    ),
  },
];

const saratogaAbout = {
  cityName: "Saratoga",
  intro:
    "Saratoga is one of Silicon Valley&apos;s most prestigious communities, known for its tree-lined streets, luxurious hillside estates, and charming village atmosphere. With high-end homes and ongoing property improvements, Saratoga homeowners expect professional, reliable service. TP Dumpsters delivers with expertise tailored to Saratoga&apos;s unique terrain and exacting standards.",
  highlights: [
    "Experienced with Saratoga's hillside estates and long driveways",
    "Familiar with Saratoga permit requirements and upscale neighborhoods",
    "Fast delivery to all neighborhoods — Downtown to Congress Springs",
    "Trusted by Saratoga contractors, homeowners, and property managers",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Luxury estate renovations in Congress Springs and Manor Drive",
    "High-end kitchen and bathroom remodels in Saratoga Woods",
    "Landscaping redesigns on wooded hillside lots",
    "Pool and outdoor living space construction",
    "Estate cleanouts in Saratoga Legends and the Golden Triangle",
    "Deck and patio projects with panoramic views",
  ],
  closingText:
    "Whether you're renovating a hillside estate in Congress Springs or updating a home in Downtown Saratoga, TP Dumpsters provides the professional waste removal Saratoga expects. We offer transparent pricing, same-day delivery, and hillside expertise. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Saratoga, CA | Santa Clara County - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Saratoga, CA. Serving Downtown, Congress Springs, Saratoga Woods & all neighborhoods. Same-day delivery. Call (510) 650-2083",
  keywords: [
    "dumpster rental Saratoga CA",
    "Saratoga dumpster rental",
    "roll-off dumpster Saratoga",
    "construction dumpster Saratoga",
    "Saratoga waste removal",
    "dumpster rental 95070",
    "dumpster rental 95071",
    "Congress Springs dumpster rental",
    "Saratoga Woods dumpster rental",
    "Golden Triangle dumpster Saratoga",
    "Brookglen dumpster rental",
    "Santa Clara County dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Saratoga, CA - TP Dumpsters",
    description: "Fast, reliable dumpster rentals in Saratoga. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/saratoga",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/saratoga" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Saratoga",
  description: "Fast, reliable dumpster rentals in Saratoga, CA. Serving all Saratoga neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/saratoga",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: { "@type": "PostalAddress", addressLocality: "Saratoga", addressRegion: "CA", addressCountry: "US" },
  areaServed: [{ "@type": "City", name: "Saratoga", "@id": "https://en.wikipedia.org/wiki/Saratoga,_California" }],
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

export default function SaratogaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <SaratogaHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...saratogaAbout} />
      <SizesSection />
      <DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Saratoga" faqs={saratogaFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <SaratogaLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
