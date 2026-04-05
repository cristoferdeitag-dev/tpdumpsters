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
import PiedmontHero from "./components/PiedmontHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import PiedmontLocation from "./components/PiedmontLocation";

const piedmontFaqs = [
  {
    question: "Can you deliver to Piedmont&apos;s narrow hillside streets?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Our drivers are experienced with Piedmont&apos;s <strong>narrow, winding hillside streets</strong> and steep driveways. We carefully assess access before delivery and use the right equipment to place your dumpster safely. Just provide your address and we&apos;ll confirm accessibility.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Piedmont?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Piedmont has <strong>strict city regulations</strong> regarding dumpster placement. If placed on your private driveway, no permit is typically needed. For street placement, you&apos;ll need approval from the City of Piedmont. We can help guide you through the permitting process and ensure compliance.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for a luxury home renovation in Piedmont?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For Piedmont&apos;s larger homes, a <strong>20-yard dumpster</strong> handles most kitchen and bathroom remodels well. For whole-home renovations or historic home restoration projects, the 30-yard provides extra capacity. The compact 10-yard is ideal for landscaping debris or small cleanouts.
      </p>
    ),
  },
  {
    question: "Do you have experience with historic home preservation projects in Piedmont?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! Many Piedmont homes are <strong>historic or architecturally significant</strong>, and renovation projects often generate unique debris. We&apos;re experienced in supporting preservation contractors with proper waste removal, including careful handling of demolition materials from older structures.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Piedmont?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Piedmont customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Luxury home renovations and additions</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Historic home preservation and restoration</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and garden redesign projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts and downsizing</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing replacement and exterior upgrades</li>
        </ul>
      </>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Piedmont?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> to Piedmont when you call before noon. Piedmont&apos;s central location within the East Bay means we can reach all neighborhoods — from Piedmont Center to Upper Piedmont — quickly and efficiently.
      </p>
    ),
  },
];

const piedmontAbout = {
  cityName: "Piedmont",
  intro:
    "Piedmont is an affluent residential city completely surrounded by Oakland, known for its beautiful tree-lined streets, historic homes, and excellent schools. With its blend of stately older residences and ongoing home improvement projects, Piedmont homeowners frequently need reliable dumpster service for renovations, landscaping, and cleanouts. TP Dumpsters understands the unique requirements of working in Piedmont — from navigating narrow hillside streets to complying with the city&apos;s strict regulations.",
  highlights: [
    "Experienced with Piedmont's narrow hillside streets and steep driveways",
    "Familiar with Piedmont's strict city regulations for dumpster placement",
    "Careful service that respects Piedmont's residential character",
    "Trusted by Piedmont homeowners, contractors, and landscapers",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Luxury kitchen and bathroom remodels in Upper Piedmont",
    "Historic home restoration and preservation projects",
    "Landscaping and garden redesign in Piedmont Park area",
    "Estate cleanouts and downsizing in Lower Piedmont",
    "Roofing and exterior renovation projects",
    "Home additions and expansion in Crocker Highlands area",
  ],
  closingText:
    "Whether you&apos;re renovating a historic Piedmont home or tackling a landscaping overhaul, TP Dumpsters delivers premium waste removal service tailored to Piedmont&apos;s residential character. We offer transparent pricing, same-day delivery, and the local expertise to navigate your neighborhood with care. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Piedmont, CA | Residential Service - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Piedmont, CA. Serving Piedmont Center, Upper & Lower Piedmont, Piedmont Park & all neighborhoods. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Piedmont CA",
    "Piedmont dumpster rental",
    "roll-off dumpster Piedmont",
    "construction dumpster Piedmont",
    "Piedmont waste removal",
    "dumpster rental 94611",
    "residential dumpster Piedmont",
    "home renovation dumpster Piedmont",
    "Piedmont cleanup service",
    "luxury home renovation dumpster",
    "hillside dumpster delivery",
    "Piedmont landscaping debris",
  ],
  openGraph: {
    title: "Dumpster Rental in Piedmont, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Piedmont. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/piedmont",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/piedmont",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Piedmont",
  description:
    "Fast, reliable dumpster rentals in Piedmont, CA. Premium residential service with same-day delivery.",
  url: "https://tpdumpsters.com/piedmont",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Piedmont",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Piedmont",
      "@id": "https://en.wikipedia.org/wiki/Piedmont,_California",
    },
  ],
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "07:00",
    closes: "18:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dumpster Rental Sizes",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "10 Yard Dumpster Rental",
          description:
            "Compact dumpster ideal for tight spaces and heavy debris like soil, concrete, and bricks.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "20 Yard Dumpster Rental",
          description:
            "Versatile dumpster for kitchen/bathroom remodels, roofing projects, and yard cleanups.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "30 Yard Dumpster Rental",
          description:
            "Extra capacity dumpster for whole-home cleanouts, large renovations, and construction debris.",
        },
      },
    ],
  },
};

export default function PiedmontPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <PiedmontHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...piedmontAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Piedmont" faqs={piedmontFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <PiedmontLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
