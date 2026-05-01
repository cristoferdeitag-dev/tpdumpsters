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
import BayPointHero from "./components/BayPointHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import BayPointLocation from "./components/BayPointLocation";

const bayPointFaqs = [
  {
    question: "How quickly can I get a dumpster delivered in Bay Point?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout Bay Point and East
        Contra Costa County. Whether you&apos;re in Shore Acres, Bella Vista, or near Port
        Chicago, we can typically have a dumpster on-site within hours when you call before noon.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home cleanout in Bay Point?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a typical Bay Point home cleanout, a <strong>20-yard dumpster</strong> is the most
        popular choice. It handles furniture, appliances, boxes, and general household debris.
        For smaller garage cleanouts, a 10-yard works well. For whole-house renovations or major
        cleanups, go with the 30-yard.
      </p>
    ),
  },
  {
    question: "Can you deliver near the waterfront and Clyde areas?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! We deliver throughout all Bay Point neighborhoods including <strong>waterfront
        areas, Clyde, Shore Acres,</strong> and Port Chicago. Our drivers are familiar with the
        area&apos;s streets and can navigate to any location in Bay Point.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Bay Point?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on your private property or driveway, no permit is typically
        required in Bay Point. For street placement, you may need a permit from Contra Costa
        County. Our team can advise on the best placement for your specific location.
      </p>
    ),
  },
  {
    question: "Do you also serve Pittsburg, Concord, and Martinez?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve all of East Contra Costa including <strong>Pittsburg, Concord, Martinez,
        and Antioch</strong>. Bay Point&apos;s central location and eBART connection mean we can
        quickly reach any East County address — no extra travel charges.
      </p>
    ),
  },
  {
    question: "How much does a dumpster rental cost in Bay Point?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Bay Point dumpster rental prices start at <strong>$649 for a 10-yard</strong> dumpster
        (7-day rental, 1 ton included). The 20-yard starts at $699 and the 30-yard at $849.
        No hidden fees, no surprise charges. Call <strong>(510) 650-2083</strong> for an exact
        quote for your Bay Point project.
      </p>
    ),
  },
];

const bayPointAbout = {
  cityName: "Bay Point",
  intro:
    "Bay Point is an affordable East County community with waterfront access, eBART connectivity, and ongoing revitalization projects. From the established neighborhoods of Shore Acres to the growing areas near Port Chicago, Bay Point homeowners and contractors need reliable dumpster service for renovations, cleanouts, and property improvements.",
  highlights: [
    "Fast delivery to all Bay Point neighborhoods and waterfront areas",
    "Convenient eBART access for quick service throughout East County",
    "Experienced with residential and commercial cleanups",
    "Trusted by Bay Point contractors, homeowners, and property managers",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Home remodels and kitchen/bath renovations in Shore Acres & Bella Vista",
    "Whole-home cleanouts and estate clearing throughout Bay Point",
    "Garage and property cleanouts in Downtown Bay Point",
    "Roofing tear-offs and exterior renovations on older homes",
    "Landscaping overhauls and yard debris removal near waterfront",
    "Commercial property cleanup in Port Chicago & Clyde industrial areas",
  ],
  closingText:
    "Whether you're renovating a home in Shore Acres or cleaning out a property near the waterfront, TP Dumpsters makes waste removal simple and affordable. Same-day delivery, transparent pricing, and a team that knows East County. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Bay Point, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Bay Point, CA. 10, 20 & 30 yard roll-off dumpsters for construction, remodels & cleanouts. Same-day delivery to Bay Point & East Contra Costa. Call (510) 650-2083",
  keywords: [
    "dumpster rental Bay Point CA",
    "Bay Point dumpster rental",
    "roll-off dumpster Bay Point",
    "construction dumpster Bay Point",
    "Bay Point waste removal",
    "dumpster rental 94565",
    "Shore Acres dumpster rental",
    "Pittsburg dumpster rental",
    "Concord dumpster rental",
    "Martinez dumpster rental",
    "East Contra Costa dumpster",
    "cheap dumpster Bay Point CA",
    "junk removal Bay Point",
  ],
  openGraph: {
    title: "Dumpster Rental in Bay Point, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Bay Point. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/bay-point",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental in Bay Point, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Bay Point. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/bay-point" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Bay Point",
  description:
    "Affordable, reliable dumpster rentals in Bay Point, CA. Same-day delivery to all Bay Point neighborhoods and East Contra Costa County.",
  url: "https://tpdumpsters.com/bay-point",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bay Point",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Bay Point" },
    { "@type": "City", name: "Pittsburg" },
    { "@type": "City", name: "Concord" },
    { "@type": "City", name: "Martinez" },
    { "@type": "City", name: "Antioch" },
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

export default function BayPointPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <BayPointHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...bayPointAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Bay Point" faqs={bayPointFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <BayPointLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
