import type { Metadata } from "next";
import Header from "@/components/Header";
import SizesSection from "@/components/SizesSection";
import DumpsterPhotosGrid from "@/components/DumpsterPhotosGrid";
import ErrorBoundary from "@/components/ErrorBoundary";
import DynamicReviews from "@/components/DynamicReviews";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import CityFaqsSection from "@/components/CityFaqsSection";
import ContractorsHero from "./components/ContractorsHero";
import WhyContractors from "./components/WhyContractors";
import ContractorServices from "./components/ContractorServices";
import ContractorCTA from "./components/ContractorCTA";

/* ───────── Contractor FAQs (SEO optimized) ───────── */
const contractorFaqs = [
  {
    question: "Do you offer volume discounts for contractors?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We offer competitive pricing for contractors who rent regularly. Call us at{" "}
        <strong>(510) 650-2083</strong> to discuss volume pricing and set up a contractor account
        with priority scheduling and streamlined billing.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a construction project?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          It depends on the scope of your project:
        </p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">
            <strong>10 Yard:</strong> Small remodels, bathroom renovations, concrete/soil removal
          </li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">
            <strong>20 Yard:</strong> Kitchen remodels, roofing projects, medium renovations (most popular for contractors)
          </li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">
            <strong>30 Yard:</strong> Whole-home renovations, large demolition, new construction cleanups
          </li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          Not sure? Call us and we&apos;ll help you pick the right size based on your project.
        </p>
      </>
    ),
  },
  {
    question: "Can I get same-day dumpster delivery for my job site?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We offer <strong>same-day delivery</strong> for most Bay Area locations when you call
        before noon. For next-day delivery, you can also book online 24/7 through our website at{" "}
        <a href="/booking" className="text-tp-red underline">tpdumpsters.com/booking</a>.
      </p>
    ),
  },
  {
    question: "What types of construction debris can I put in the dumpster?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          We accept virtually all construction and demolition materials:
        </p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Drywall, wood, framing, fixtures</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing shingles and underlayment</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Concrete, brick, asphalt (dedicated dumpsters)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Clean soil and dirt</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping debris, branches, sod</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">General junk, old cabinets, flooring</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          <strong>Not accepted:</strong> Hazardous materials, paint, chemicals, batteries, tires (tires have a separate fee).
        </p>
      </>
    ),
  },
  {
    question: "Can I extend my rental if my project takes longer?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. Extra days are just <strong>$49/day</strong>. Just call or text us before your
        rental period ends and we&apos;ll extend it — no paperwork, no hassle. We understand
        construction timelines change.
      </p>
    ),
  },
  {
    question: "Do you serve the entire Bay Area?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve Oakland, Richmond, Pinole, Concord, Walnut Creek, San Ramon, Dublin,
        Pleasanton, Livermore, and surrounding cities throughout the Bay Area. Same-day delivery
        is available in most locations.
      </p>
    ),
  },
  {
    question: "What happens if I exceed the weight limit?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Extra weight is charged at <strong>$125 per ton</strong> (prorated). We weigh every load
        at the disposal facility. To avoid surprises, we recommend choosing the right dumpster
        size upfront — our team can help estimate based on your project type.
      </p>
    ),
  },
  {
    question: "Can I have multiple dumpsters on the same job site?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Many of our contractor clients use multiple dumpsters simultaneously — for example,
        one for general debris and another for clean concrete. We&apos;ll coordinate delivery and
        pickup schedules to fit your project timeline.
      </p>
    ),
  },
];

/* ───────── SEO Metadata ───────── */
export const metadata: Metadata = {
  title:
    "Contractor Dumpster Rental | Construction Dumpsters - TP Dumpsters Bay Area",
  description:
    "Reliable dumpster rentals for contractors in the Bay Area. Same-day delivery, flexible scheduling, all debris types. 10, 20 & 30 yard roll-off dumpsters for construction, roofing, demolition & remodeling. Call (510) 650-2083.",
  keywords: [
    "contractor dumpster rental",
    "construction dumpster rental",
    "construction dumpster rental near me",
    "contractor dumpster rentals",
    "dumpster rental for contractors",
    "construction waste dumpster rental",
    "construction debris dumpster rental",
    "roofing dumpster rental",
    "demolition dumpster rental",
    "roll-off dumpster for contractors",
    "construction site dumpster rental",
    "dumpster rental Bay Area contractors",
    "commercial dumpster rental",
    "small construction dumpster rental",
    "construction dumpster rental cost",
  ],
  openGraph: {
    title: "Contractor Dumpster Rental - TP Dumpsters Bay Area",
    description:
      "Reliable dumpster rentals built for contractors. Same-day delivery, flexible scheduling, transparent pricing.",
    url: "https://tpdumpsters.com/contractors",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/contractors" },
};

/* ───────── JSON-LD Schema ───────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Contractor Dumpster Rental - TP Dumpsters",
  description:
    "Professional dumpster rental service for contractors and construction companies in the Bay Area. Same-day delivery, all debris types, flexible scheduling.",
  url: "https://tpdumpsters.com/contractors",
  provider: {
    "@type": "LocalBusiness",
    name: "TP Dumpsters",
    telephone: "+1-510-650-2083",
    email: "contact@tpdumpsters.com",
    url: "https://tpdumpsters.com",
    address: {
      "@type": "PostalAddress",
      addressRegion: "CA",
      addressCountry: "US",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "10",
    },
  },
  areaServed: {
    "@type": "State",
    name: "California",
  },
  serviceType: "Dumpster Rental for Contractors",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Contractor Dumpster Sizes",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "10 Yard Dumpster",
          description:
            "Compact roll-off dumpster for small remodels, concrete, soil, and tight job sites.",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "600",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "20 Yard Dumpster",
          description:
            "Most popular contractor dumpster — ideal for kitchen remodels, roofing, and medium renovations.",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "650",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "30 Yard Dumpster",
          description:
            "Large capacity dumpster for full renovations, demolition, and commercial construction projects.",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "700",
          priceCurrency: "USD",
        },
      },
    ],
  },
};

export default function ContractorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <ContractorsHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <WhyContractors />
      <ContractorServices />
      <SizesSection />
      <DumpsterPhotosGrid photos={[
        { src: "/images/dumpsters/construction-site.jpg", alt: "Contractor dumpster on job site" },
        { src: "/images/gallery/demolition-03.jpg", alt: "Construction dumpster rental" },
        { src: "/images/gallery/jobsite-05.jpg", alt: "Contractor waste disposal" },
        { src: "/images/dumpsters/worker-action.jpg", alt: "Dumpster rental for contractors" },
      ]} />
      <ErrorBoundary>
        <CityFaqsSection cityName="Contractors" faqs={contractorFaqs} />
      </ErrorBoundary>
      <DynamicReviews />
      <ContractorCTA />
      <FloatingButtons />
      <Footer />
    </>
  );
}
