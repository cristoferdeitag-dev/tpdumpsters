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
import SanLorenzoHero from "./components/SanLorenzoHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import SanLorenzoLocation from "./components/SanLorenzoLocation";

const sanLorenzoFaqs = [
  {
    question: "Do I need a permit for a dumpster in San Lorenzo since it&apos;s unincorporated?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        San Lorenzo is an unincorporated community governed by <strong>Alameda County</strong>, not a city government. If the dumpster is placed on your private driveway, no permit is typically needed. For street placement, you&apos;ll need to check with Alameda County Public Works. We can help guide you through the process.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in San Lorenzo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> to San Lorenzo and surrounding Eden Area communities when you call before noon. San Lorenzo Village, Ashland, Cherryland, and Lewelling are all within our fastest delivery zone.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a suburban home remodel in San Lorenzo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a typical kitchen or bathroom remodel in San Lorenzo, a <strong>20-yard dumpster</strong> is usually the best fit. For larger whole-home renovations or multiple-room projects, the 30-yard is ideal. For small cleanouts, yard debris, or concrete removal, the 10-yard works great.
      </p>
    ),
  },
  {
    question: "Do you serve the entire Eden Area near San Lorenzo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve the entire Eden Area including San Lorenzo, Ashland, Cherryland, Lewelling, and Via Estudillo. We also deliver to neighboring <strong>San Leandro</strong>, <strong>Hayward</strong>, and <strong>Castro Valley</strong>. One call covers the whole area.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in San Lorenzo?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">San Lorenzo customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Residential remodels and home upgrades</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Garage and estate cleanouts</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and yard debris removal</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Suburban renovation projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing tear-offs and siding replacement</li>
        </ul>
      </>
    ),
  },
  {
    question: "Is San Lorenzo close to your service area?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! San Lorenzo is right in the heart of our East Bay service area. We&apos;re just minutes away and deliver daily to the 94580 ZIP code. Being close to San Leandro and Hayward means we can reach San Lorenzo quickly for same-day service.
      </p>
    ),
  },
];

const sanLorenzoAbout = {
  cityName: "San Lorenzo",
  intro:
    "San Lorenzo is a well-established unincorporated community in Alameda County, nestled between San Leandro and Hayward in the heart of the Eden Area. Known for its suburban neighborhoods, mid-century homes, and family-friendly streets, San Lorenzo sees steady home improvement and renovation activity year-round. TP Dumpsters proudly serves San Lorenzo and all Eden Area communities with fast, reliable dumpster delivery — whether you&apos;re remodeling a kitchen, cleaning out a garage, or tackling a landscaping project.",
  highlights: [
    "Familiar with Alameda County unincorporated area regulations",
    "Fast delivery to all San Lorenzo neighborhoods and the Eden Area",
    "Experienced with suburban residential driveways and tight access",
    "Trusted by San Lorenzo homeowners and local contractors",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Kitchen and bathroom remodels in San Lorenzo Village",
    "Garage and estate cleanouts in Ashland and Cherryland",
    "Landscaping and yard debris removal in Lewelling",
    "Roofing projects across San Lorenzo residential areas",
    "Home renovation and upgrade projects in Via Estudillo",
    "Suburban cleanup and decluttering throughout the Eden Area",
  ],
  closingText:
    "Whether you&apos;re a homeowner tackling a weekend cleanup or a contractor running a renovation in San Lorenzo, TP Dumpsters makes waste removal easy. We offer transparent pricing, same-day delivery, and local expertise to get your dumpster exactly where you need it. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in San Lorenzo, CA | East Bay Service - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in San Lorenzo, CA. Serving San Lorenzo Village, Ashland, Cherryland, Lewelling & the Eden Area. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental San Lorenzo CA",
    "San Lorenzo dumpster rental",
    "roll-off dumpster San Lorenzo",
    "construction dumpster San Lorenzo",
    "San Lorenzo waste removal",
    "dumpster rental 94580",
    "Eden Area dumpster rental",
    "Ashland dumpster rental",
    "Cherryland dumpster",
    "Lewelling dumpster rental",
    "San Lorenzo cleanup",
    "unincorporated Alameda County dumpster",
  ],
  openGraph: {
    title: "Dumpster Rental in San Lorenzo, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in San Lorenzo. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/san-lorenzo",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/san-lorenzo",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - San Lorenzo",
  description:
    "Fast, reliable dumpster rentals in San Lorenzo, CA. Serving the Eden Area with same-day delivery.",
  url: "https://tpdumpsters.com/san-lorenzo",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Lorenzo",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "Place",
      name: "San Lorenzo",
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

export default function SanLorenzoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <SanLorenzoHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...sanLorenzoAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="San Lorenzo" faqs={sanLorenzoFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <SanLorenzoLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
