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
import DalyCityHero from "./components/DalyCityHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import DalyCityLocation from "./components/DalyCityLocation";

const dalyCityFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Daly City?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on a public street in Daly City, you may need a temporary encroachment permit from the city. If it&apos;s on your private driveway, no permit is usually needed. We can help guide you through the process.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Daly City?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        In most Daly City neighborhoods, we offer <strong>same-day delivery</strong> if you call before noon. Areas like Westlake, Serramonte, and Broadmoor are within our fastest delivery zone given Daly City&apos;s proximity to San Francisco.
      </p>
    ),
  },
  {
    question: "Can you deliver to hillside properties in Daly City?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We&apos;re experienced with Daly City&apos;s hillside streets and steep driveways in neighborhoods like Hillside, Top of the Hill, and Crocker. Our drivers know how to navigate tight access points. Just let us know your address and we&apos;ll confirm placement.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in Daly City?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a typical kitchen or bathroom remodel in Daly City, a <strong>20-yard dumpster</strong> is usually the best fit. For whole-home renovations or multi-room projects, go with the 30-yard. For small cleanouts or concrete/soil, the 10-yard works great.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Daly City?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Daly City customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Residential remodeling in dense Serramonte-area homes</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Garage and estate cleanouts</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and yard debris removal</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Construction and demolition projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing tear-offs on hillside properties</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Daly City ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every Daly City ZIP code including 94014, 94015, and 94017. From Westlake to Broadmoor, no matter where you are in Daly City, we can deliver.
      </p>
    ),
  },
];

const dalyCityAbout = {
  cityName: "Daly City",
  intro:
    "Daly City is the largest city in San Mateo County and sits right on the border of San Francisco, making it a gateway to the Peninsula. With its dense residential neighborhoods, hillside homes, and mix of older and newer construction, there&apos;s always a renovation or cleanup project underway. TP Dumpsters has been serving Daly City and the surrounding Peninsula communities, and we understand the unique challenges of working in this city — from steep hillside streets to tightly packed neighborhoods near Serramonte.",
  highlights: [
    "We navigate Daly City's steep hillside streets and tight driveways with ease",
    "Familiar with Daly City permit requirements for street placement",
    "Fast delivery to all Daly City neighborhoods — Westlake to Broadmoor",
    "Trusted by Daly City contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Home remodels in dense Serramonte and Westlake neighborhoods",
    "Kitchen and bathroom renovations in St. Francis Heights",
    "Estate cleanouts in Broadmoor residential areas",
    "Landscaping and yard debris removal in hillside properties",
    "Roofing projects across Daly City's older housing stock",
    "Construction debris removal for projects near the SF border",
  ],
  closingText:
    "Whether you're a homeowner tackling a weekend cleanup or a contractor running a major renovation, TP Dumpsters makes waste removal in Daly City easy. We offer transparent pricing, same-day delivery, and the local expertise to get your dumpster exactly where you need it. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Daly City, CA | San Mateo County - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Daly City, CA. Serving Westlake, Serramonte, Broadmoor, Hillside & all ZIP codes. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Daly City CA",
    "Daly City dumpster rental",
    "roll-off dumpster Daly City",
    "construction dumpster Daly City",
    "Daly City waste removal",
    "dumpster rental 94014",
    "dumpster rental 94015",
    "dumpster rental Serramonte",
    "Westlake dumpster rental",
    "Broadmoor dumpster rental",
    "Hillside dumpster Daly City",
    "San Mateo County dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Daly City, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Daly City. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/daly-city",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/daly-city",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Daly City",
  description:
    "Fast, reliable dumpster rentals in Daly City, CA. Serving all Daly City neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/daly-city",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Daly City",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Daly City",
      "@id": "https://en.wikipedia.org/wiki/Daly_City,_California",
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

export default function DalyCityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <DalyCityHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...dalyCityAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Daly City" faqs={dalyCityFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <DalyCityLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
