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
import MilpitasHero from "./components/MilpitasHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import MilpitasLocation from "./components/MilpitasLocation";

const milpitasFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Milpitas?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes. If the dumpster is placed on a public street in Milpitas, you&apos;ll need a temporary
        encroachment permit from the City of Milpitas. If it&apos;s on your private driveway, no permit
        is usually needed. We can help guide you through the process.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Milpitas?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        In most Milpitas neighborhoods, we offer <strong>same-day delivery</strong> if you call before noon.
        Areas like Downtown Milpitas, Calaveras Hills, and McCarthy Ranch are within our fastest delivery zone.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for an industrial cleanout in Milpitas?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For industrial cleanouts and warehouse demolition projects in Milpitas, a <strong>30-yard dumpster</strong> is
        typically the best choice due to the volume of materials. For residential renovations or new construction
        debris, a 20-yard works well. For concrete, soil, or heavy materials, the 10-yard is ideal.
      </p>
    ),
  },
  {
    question: "Do you serve areas near Fremont and San Jose from Milpitas?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! Milpitas sits right at the gateway between San Jose and Fremont, and we serve all three
        cities. Whether your project is in Milpitas, nearby Berryessa in San Jose, or south Fremont,
        we can deliver quickly and efficiently.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Milpitas?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Milpitas customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Industrial cleanouts and warehouse demolition</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">New construction and development projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Residential renovations and home remodels</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Commercial property cleanups and debris removal</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and yard debris removal</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Milpitas ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every Milpitas ZIP code including 95035 and 95036. No matter where you
        are in Milpitas, we can deliver.
      </p>
    ),
  },
];

const milpitasAbout = {
  cityName: "Milpitas",
  intro:
    "Milpitas is the gateway city between San Jose and Fremont, known for its industrial areas, growing residential developments, and strategic location in Silicon Valley. From warehouse demolitions near McCarthy Ranch to residential remodels in Calaveras Hills, there's always a project that needs reliable waste removal. TP Dumpsters serves all Milpitas neighborhoods and understands the unique mix of industrial and residential projects in this growing city.",
  highlights: [
    "Experienced with industrial and warehouse dumpster delivery",
    "Familiar with Milpitas city permit requirements for street placement",
    "Fast delivery to all Milpitas neighborhoods — Downtown to Calaveras Hills",
    "Trusted by Milpitas contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Industrial cleanouts and warehouse demolition near McCarthy Ranch",
    "New construction and development projects across Milpitas",
    "Residential remodels in Calaveras Hills & Sunnyhills",
    "Commercial property cleanups near Great Mall area",
    "Landscaping and yard debris removal in Augustine & Jacklin",
    "Home cleanouts and garage cleanups across Milpitas neighborhoods",
  ],
  closingText:
    "Whether you're a homeowner tackling a weekend cleanup or a contractor running a major renovation, TP Dumpsters makes waste removal in Milpitas easy. We offer transparent pricing, same-day delivery, and the local expertise to get your dumpster exactly where you need it. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Milpitas, CA | Gateway City - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Milpitas, CA. Serving Downtown, Calaveras Hills, McCarthy Ranch, Great Mall area & all ZIP codes. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Milpitas CA",
    "Milpitas dumpster rental",
    "roll-off dumpster Milpitas",
    "construction dumpster Milpitas",
    "Milpitas waste removal",
    "dumpster rental 95035",
    "dumpster rental 95036",
    "dumpster rental Downtown Milpitas",
    "Gateway City dumpster rental",
    "McCarthy Ranch dumpster",
    "Calaveras Hills dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Milpitas, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Milpitas. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/milpitas",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/milpitas",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Milpitas",
  description:
    "Fast, reliable dumpster rentals in Milpitas, CA. Serving all Milpitas neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/milpitas",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Milpitas",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Milpitas",
      "@id": "https://en.wikipedia.org/wiki/Milpitas,_California",
    },
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
        itemOffered: { "@type": "Service", name: "10 Yard Dumpster Rental", description: "Compact dumpster ideal for tight spaces and heavy debris like soil, concrete, and bricks." },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "20 Yard Dumpster Rental", description: "Versatile dumpster for kitchen/bathroom remodels, roofing projects, and yard cleanups." },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "30 Yard Dumpster Rental", description: "Extra capacity dumpster for whole-home cleanouts, large renovations, and construction debris." },
      },
    ],
  },
};

export default function MilpitasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <MilpitasHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...milpitasAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Milpitas" faqs={milpitasFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <MilpitasLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
