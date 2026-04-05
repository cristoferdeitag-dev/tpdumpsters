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
import SunnyvaleHero from "./components/SunnyvaleHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import SunnyvaleLocation from "./components/SunnyvaleLocation";

const sunnyvaleFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Sunnyvale?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes. If the dumpster is placed on a public street in Sunnyvale, you&apos;ll need a temporary
        encroachment permit from the City of Sunnyvale. If it&apos;s on your private driveway, no permit
        is usually needed. We can help guide you through the process.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Sunnyvale?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        In most Sunnyvale neighborhoods, we offer <strong>same-day delivery</strong> if you call before noon.
        Areas like Downtown Sunnyvale, Cherry Chase, and Lakewood are within our fastest delivery zone.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a tech campus renovation in Sunnyvale?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For tech campus renovations and office teardowns in Sunnyvale, a <strong>30-yard dumpster</strong> is usually
        the best choice due to the volume of materials. For smaller office remodels or startup warehouse cleanouts,
        a 20-yard works well. For concrete or soil removal, the 10-yard is ideal.
      </p>
    ),
  },
  {
    question: "Can you deliver to dense residential areas in Sunnyvale?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We regularly deliver to Sunnyvale&apos;s dense residential neighborhoods including Birdland,
        Ponderosa Park, and Heritage District. Our drivers are experienced with tight driveways and
        narrow streets common in Silicon Valley neighborhoods. Just let us know your address and we&apos;ll confirm access.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Sunnyvale?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Sunnyvale customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Tech campus renovations and office teardowns</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Residential remodels and home renovations</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Startup warehouse and office cleanouts</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and yard debris removal</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Construction and demolition projects</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Sunnyvale ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every Sunnyvale ZIP code including 94085, 94086, 94087, and 94089. No matter where you
        are in Sunnyvale, we can deliver.
      </p>
    ),
  },
];

const sunnyvaleAbout = {
  cityName: "Sunnyvale",
  intro:
    "Sunnyvale is a major Silicon Valley city known for its thriving tech industry, diverse neighborhoods, and constant development. From tech campus renovations along Mathilda Avenue to residential remodels in Cherry Chase and Birdland, there&apos;s always a project that needs a reliable dumpster. TP Dumpsters has been serving Sunnyvale and the greater Silicon Valley area, and we understand the unique challenges of working in this fast-paced city — from dense residential streets to large-scale commercial projects.",
  highlights: [
    "We navigate Sunnyvale's dense residential streets and commercial areas with ease",
    "Familiar with Sunnyvale city permit requirements for street placement",
    "Fast delivery to all Sunnyvale neighborhoods — Downtown to Heritage District",
    "Trusted by Sunnyvale contractors, tech companies, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Tech campus renovations and office teardowns in the Mathilda corridor",
    "Kitchen and bathroom remodels in Cherry Chase & Lakewood",
    "Startup warehouse cleanouts in North Sunnyvale industrial areas",
    "Landscaping and yard debris removal in Ponderosa Park",
    "New construction support in the Heritage District",
    "Roofing projects across Sunnyvale's residential neighborhoods",
  ],
  closingText:
    "Whether you're a homeowner tackling a weekend cleanup or a contractor running a major renovation, TP Dumpsters makes waste removal in Sunnyvale easy. We offer transparent pricing, same-day delivery, and the local expertise to get your dumpster exactly where you need it. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Sunnyvale, CA | Silicon Valley - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Sunnyvale, CA. Serving Downtown, Lakewood, Cherry Chase, Birdland & all ZIP codes. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Sunnyvale CA",
    "Sunnyvale dumpster rental",
    "roll-off dumpster Sunnyvale",
    "construction dumpster Sunnyvale",
    "Sunnyvale waste removal",
    "dumpster rental 94085",
    "dumpster rental 94086",
    "dumpster rental 94087",
    "dumpster rental Downtown Sunnyvale",
    "Silicon Valley dumpster rental",
    "Cherry Chase dumpster",
    "Birdland dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Sunnyvale, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Sunnyvale. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/sunnyvale",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/sunnyvale",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Sunnyvale",
  description:
    "Fast, reliable dumpster rentals in Sunnyvale, CA. Serving all Sunnyvale neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/sunnyvale",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sunnyvale",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Sunnyvale",
      "@id": "https://en.wikipedia.org/wiki/Sunnyvale,_California",
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

export default function SunnyvalePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <SunnyvaleHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...sunnyvaleAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Sunnyvale" faqs={sunnyvaleFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <SunnyvaleLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
