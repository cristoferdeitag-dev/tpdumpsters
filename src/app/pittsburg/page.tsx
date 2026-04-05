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
import PittsburgHero from "./components/PittsburgHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import PittsburgLocation from "./components/PittsburgLocation";

const pittsburgFaqs = [
  {
    question: "How fast can I get a dumpster delivered in Pittsburg?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout Pittsburg, Bay Point, and East Contra Costa County. Whether you&apos;re in Downtown Pittsburg, Los Medanos, or Highlands Ranch, we can typically have a dumpster on-site within hours when you call before noon.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for new construction in Pittsburg?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For new construction projects in Pittsburg&apos;s growing developments — which are booming thanks to affordable housing and eBART access — a <strong>30-yard dumpster</strong> is the best choice. It handles framing scraps, drywall, packaging, and general construction debris with ease.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Pittsburg?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If you place the dumpster on your own driveway or private property, no permit is typically required in Pittsburg. For street placement, you may need a temporary encroachment permit from the City of Pittsburg. Most Pittsburg customers have ample driveway or lot space for dumpster placement.
      </p>
    ),
  },
  {
    question: "Do you serve Bay Point, Antioch, and Oakley too?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! We serve the entire East County including <strong>Bay Point, Antioch, Oakley, Concord,</strong> and all surrounding communities. One call covers dumpster delivery anywhere in East Contra Costa — no extra travel charges.
      </p>
    ),
  },
  {
    question: "What can I put in a dumpster rental in Pittsburg?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">We accept most common debris types for Pittsburg projects:</p>
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
    question: "How much does a dumpster rental cost in Pittsburg?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Pittsburg dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster (7-day rental, 1 ton included). The 20-yard starts at $649 and the 30-yard at $749. No hidden fees, no surprise charges. Call <strong>(510) 650-2083</strong> for an exact quote for your Pittsburg project.
      </p>
    ),
  },
];

const pittsburgAbout = {
  cityName: "Pittsburg",
  intro:
    "Pittsburg is experiencing an exciting transformation with new housing developments, waterfront revitalization projects, and expanded eBART access making it one of the fastest-growing cities in East Contra Costa County. With affordable housing attracting young families and new construction projects dotting neighborhoods from Los Medanos to Highlands Ranch, Pittsburg has strong demand for reliable dumpster service.",
  highlights: [
    "Fast delivery to all Pittsburg neighborhoods and East County communities",
    "Large inventory for new construction and affordable housing projects",
    "Experienced with Pittsburg's growth market and development boom",
    "Trusted by Pittsburg contractors, builders, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "New construction cleanup in Los Medanos & Highlands Ranch",
    "Waterfront property improvements and marina area renovations",
    "Whole-home remodels and additions in Downtown Pittsburg & Old Town",
    "Garage and estate cleanouts across Bay Point & Stoneman",
    "Roofing tear-offs and siding replacement on established homes",
    "Landscaping projects and yard debris removal throughout Pittsburg",
  ],
  closingText:
    "Whether you're building new in Highlands Ranch or renovating a property in Downtown Pittsburg, TP Dumpsters makes waste removal simple and affordable. Same-day delivery, transparent pricing, and a team that knows East County. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Pittsburg, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Pittsburg, CA. 10, 20 & 30 yard roll-off dumpsters for construction, remodels & cleanouts. Same-day delivery to Pittsburg, Bay Point & East County. Call (510) 650-2083",
  keywords: [
    "dumpster rental Pittsburg CA",
    "Pittsburg dumpster rental",
    "roll-off dumpster Pittsburg",
    "construction dumpster Pittsburg",
    "Pittsburg waste removal",
    "dumpster rental 94565",
    "Bay Point dumpster rental",
    "Los Medanos dumpster rental",
    "Highlands Ranch dumpster",
    "Antioch dumpster rental",
    "Oakley dumpster rental",
    "East County dumpster rental",
    "cheap dumpster Pittsburg CA",
    "junk removal Pittsburg",
  ],
  openGraph: {
    title: "Dumpster Rental in Pittsburg, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Pittsburg. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/pittsburg",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental in Pittsburg, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Pittsburg. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/pittsburg" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Pittsburg",
  description:
    "Affordable, reliable dumpster rentals in Pittsburg, CA. Same-day delivery to all Pittsburg neighborhoods, Bay Point, and East Contra Costa County.",
  url: "https://tpdumpsters.com/pittsburg",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pittsburg",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Pittsburg" },
    { "@type": "City", name: "Bay Point" },
    { "@type": "City", name: "Antioch" },
    { "@type": "City", name: "Oakley" },
    { "@type": "City", name: "Concord" },
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

export default function PittsburgPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <PittsburgHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...pittsburgAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Pittsburg" faqs={pittsburgFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <PittsburgLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
