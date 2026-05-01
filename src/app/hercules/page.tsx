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
import HerculesHero from "./components/HerculesHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import HerculesLocation from "./components/HerculesLocation";

const herculesFaqs = [
  {
    question: "How quickly can I get a dumpster delivered in Hercules?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout Hercules and West Contra Costa County. Whether you&apos;re in Victoria by the Bay, Refugio Valley, or near Downtown Hercules, we can typically have a dumpster on-site within hours when you call before noon.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a Hercules home renovation?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For typical Hercules home renovations — kitchen remodels, bathroom updates, or flooring projects — a <strong>20-yard dumpster ($699)</strong> is the most popular choice. For larger projects like whole-home renovations or new construction cleanup in Hercules&apos; growing developments, the 30-yard at $849 provides ample capacity.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Hercules?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If you place the dumpster on your own private property or driveway, no permit is typically required in Hercules. For street placement, you may need a temporary encroachment permit from the City of Hercules. Most of our Hercules customers have adequate driveway space, so street placement is rarely necessary.
      </p>
    ),
  },
  {
    question: "Do you serve Pinole, Rodeo, and other nearby communities?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve all of West Contra Costa County including <strong>Pinole, Rodeo, Martinez, El Sobrante, Crockett,</strong> and San Pablo. One call covers dumpster delivery anywhere in the area — no extra travel charges for these communities.
      </p>
    ),
  },
  {
    question: "What materials can I put in a dumpster rental in Hercules?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">We accept most common debris types for Hercules projects:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Construction and demolition waste (lumber, drywall, siding)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">General household junk and old furniture</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Concrete, dirt, and soil (10-yard only, weight limits apply)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Yard waste, tree trimmings, and landscaping debris</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing materials and shingles</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          <strong>Not accepted:</strong> Hazardous waste, paint, chemicals, batteries, electronics, or flammable materials.
        </p>
      </>
    ),
  },
  {
    question: "How much does a dumpster rental cost in Hercules?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Hercules dumpster rental prices start at <strong>$649 for a 10-yard</strong> dumpster (7-day rental, 1 ton included). The 20-yard starts at $699 and the 30-yard at $849. No hidden fees, no surprise charges. Call <strong>(510) 650-2083</strong> for an exact quote for your Hercules project.
      </p>
    ),
  },
];

const herculesAbout = {
  cityName: "Hercules",
  intro:
    "Hercules is a vibrant waterfront community on the shores of San Pablo Bay in West Contra Costa County. With a wave of new residential developments, growing neighborhoods like Victoria by the Bay, and established areas undergoing renovation, Hercules homeowners and contractors need dependable dumpster service that can keep pace with the city's growth.",
  highlights: [
    "Fast delivery to all Hercules neighborhoods and West Contra Costa communities",
    "Ready for new construction cleanup and residential development projects",
    "Serving the entire I-80 corridor from Pinole to Crockett and Martinez",
    "Trusted by Hercules builders, remodelers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "New construction cleanup in Victoria by the Bay & New Pacific developments",
    "Kitchen and bathroom remodels in Refugio Valley & Downtown Hercules",
    "Garage and estate cleanouts across Hercules Point & Franklin Canyon",
    "Roofing tear-offs and siding replacement on waterfront properties",
    "Landscaping overhauls and yard debris removal in residential areas",
    "Concrete driveway and patio demolition for property upgrades",
  ],
  closingText:
    "Whether you're building new in Victoria by the Bay or renovating a home in Refugio Valley, TP Dumpsters makes waste removal simple and affordable. Same-day delivery, transparent pricing, and a team that serves all of West Contra Costa. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Hercules, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Hercules, CA. 10, 20 & 30 yard roll-off dumpsters for construction, remodels & cleanouts. Same-day delivery to Hercules & West Contra Costa. Call (510) 650-2083",
  keywords: [
    "dumpster rental Hercules CA",
    "Hercules dumpster rental",
    "roll-off dumpster Hercules",
    "construction dumpster Hercules",
    "Hercules waste removal",
    "dumpster rental 94547",
    "Victoria by the Bay dumpster rental",
    "Refugio Valley dumpster rental",
    "Pinole dumpster rental",
    "Rodeo dumpster rental",
    "Crockett dumpster rental",
    "West Contra Costa dumpster",
    "cheap dumpster Hercules CA",
    "junk removal Hercules",
  ],
  openGraph: {
    title: "Dumpster Rental in Hercules, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Hercules. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/hercules",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental in Hercules, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Hercules. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/hercules" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Hercules",
  description:
    "Affordable, reliable dumpster rentals in Hercules, CA. Same-day delivery to all Hercules neighborhoods and West Contra Costa County.",
  url: "https://tpdumpsters.com/hercules",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hercules",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Hercules" },
    { "@type": "City", name: "Pinole" },
    { "@type": "City", name: "Rodeo" },
    { "@type": "City", name: "Martinez" },
    { "@type": "City", name: "Crockett" },
  ],
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "07:00",
    closes: "18:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dumpster Rental Sizes",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "10 Yard Dumpster Rental", description: "Compact dumpster for tight spaces, soil, concrete, and small cleanups. 7-day rental, 1 ton included." },
        price: "599",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "20 Yard Dumpster Rental", description: "Versatile mid-size dumpster for remodels, roofing, and medium cleanouts. 7-day rental, 2 tons included." },
        price: "649",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "30 Yard Dumpster Rental", description: "Large dumpster for full renovations, construction debris, and estate cleanouts. 7-day rental, 3 tons included." },
        price: "749",
        priceCurrency: "USD",
      },
    ],
  },
};

export default function HerculesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <HerculesHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...herculesAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Hercules" faqs={herculesFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <HerculesLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
