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
import PinoleHero from "./components/PinoleHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import PinoleLocation from "./components/PinoleLocation";

const pinoleFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Pinole?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is going on a public street in Pinole, you may need a temporary encroachment
        permit from the City of Pinole Public Works. On your own driveway or private property, no
        permit is typically required. We can advise you based on your specific location.
      </p>
    ),
  },
  {
    question: "How quickly can I get a dumpster delivered in Pinole?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> to Pinole and surrounding areas like Hercules,
        El Sobrante, and San Pablo. Call before noon for best availability. Our yard is nearby so
        response times are fast.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for a home cleanout in Pinole?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a garage or single-room cleanout, the <strong>10-yard dumpster</strong> is perfect. For a full
        home cleanout or estate cleanout, go with the <strong>20-yard</strong>. If you&apos;re doing a major
        renovation, the 30-yard gives you the most capacity.
      </p>
    ),
  },
  {
    question: "Can you deliver to Pinole's hillside neighborhoods?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. We regularly deliver to Pinole Valley, Linda Heights, and the hillside areas.
        Our drivers know the steep driveways and narrow streets. Just give us your address and
        we&apos;ll confirm access before delivery.
      </p>
    ),
  },
  {
    question: "Do you also serve Hercules, El Sobrante, and San Pablo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve all of West Contra Costa County including Hercules, El Sobrante, San Pablo,
        Rodeo, Crockett, Richmond, and El Cerrito. Same fast service, same transparent pricing.
      </p>
    ),
  },
  {
    question: "What materials can I put in a dumpster in Pinole?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">We accept general debris from remodels, cleanouts, landscaping, and construction. The 10-yard can also handle heavy materials:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Clean soil, concrete, bricks, or mixed</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">General construction and demolition debris</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Yard waste and landscaping materials</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          <strong>Not allowed:</strong> hazardous waste, wet paint, batteries, propane tanks, or medical waste.
        </p>
      </>
    ),
  },
];

const pinoleAbout = {
  cityName: "Pinole",
  intro:
    "Pinole is a charming small city in West Contra Costa County, known for its family-friendly neighborhoods, hillside views, and growing community of homeowners investing in their properties. From home renovations in Pinole Valley to landscaping projects near the Pinole Shores, residents here need reliable waste removal they can count on. TP Dumpsters is proud to serve Pinole and the surrounding communities with fast, affordable dumpster rentals.",
  highlights: [
    "Located nearby — fast delivery times to all Pinole neighborhoods",
    "Experience with Pinole's hillside properties and residential streets",
    "Transparent pricing with no hidden fees or surprise charges",
    "Bilingual support (English & Spanish) for easy communication",
    "Serving Pinole plus Hercules, El Sobrante, San Pablo, and more",
  ],
  commonProjects: [
    "Home remodels and kitchen/bathroom upgrades in Pinole Valley",
    "Garage and estate cleanouts in Old Town Pinole",
    "Landscaping and backyard renovation projects",
    "Roofing tear-offs and exterior improvements",
    "Construction debris removal for local contractors",
    "Decluttering and moving cleanouts in Tara Hills",
  ],
  closingText:
    "Pinole homeowners and contractors trust TP Dumpsters for straightforward pricing, fast delivery, and friendly bilingual service. Whether you're clearing out a garage, remodeling your kitchen, or managing a construction site, we have the right dumpster for your project. Call us at (510) 650-2083 for a free quote today.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Pinole, CA | Same-Day Service - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Pinole, CA. Serving Old Town, Pinole Valley, Tara Hills, Hercules & surrounding areas. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Pinole CA",
    "Pinole dumpster rental",
    "roll-off dumpster Pinole",
    "construction dumpster Pinole",
    "Pinole waste removal",
    "dumpster rental 94564",
    "dumpster rental Pinole Valley",
    "Tara Hills dumpster",
    "Hercules dumpster rental",
    "El Sobrante dumpster",
    "West Contra Costa dumpster rental",
    "San Pablo dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Pinole, CA - TP Dumpsters",
    description:
      "Affordable dumpster rentals in Pinole. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/pinole",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/pinole",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Pinole",
  description:
    "Affordable dumpster rentals in Pinole, CA. Serving Pinole and surrounding West Contra Costa communities with same-day delivery.",
  url: "https://tpdumpsters.com/pinole",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pinole",
    addressRegion: "CA",
    postalCode: "94564",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Pinole",
      "@id": "https://en.wikipedia.org/wiki/Pinole,_California",
    },
    {
      "@type": "City",
      name: "Hercules",
    },
    {
      "@type": "City",
      name: "El Sobrante",
    },
    {
      "@type": "City",
      name: "San Pablo",
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

export default function PinolePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <PinoleHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...pinoleAbout} />
<SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Pinole" faqs={pinoleFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <PinoleLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
