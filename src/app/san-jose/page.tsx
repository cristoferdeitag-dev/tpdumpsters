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
import SanJoseHero from "./components/SanJoseHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import SanJoseLocation from "./components/SanJoseLocation";

const sanJoseFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in San Jose?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes. If the dumpster is placed on a public street in San Jose, you&apos;ll need a temporary
        encroachment permit from the City of San Jose Department of Transportation. If it&apos;s on your
        private driveway or property, no permit is usually needed. We can help guide you through
        the process.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in San Jose?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        In most San Jose neighborhoods, we offer <strong>same-day delivery</strong> if you call before noon.
        Areas like Downtown San Jose, Willow Glen, and Cambrian Park are within our fastest delivery zone.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a project in San Jose?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a typical kitchen or bathroom remodel in San Jose, a <strong>20-yard dumpster</strong> is usually
        the best fit. For large-scale renovations, new construction, or whole-home cleanouts, go with the 30-yard.
        For smaller jobs like concrete removal or yard cleanups on San Jose&apos;s larger suburban lots, the 10-yard
        works great.
      </p>
    ),
  },
  {
    question: "Can you handle large suburban properties and new construction in San Jose?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! San Jose has some of the largest residential lots in the Bay Area, and we&apos;re
        experienced with both suburban home projects and new construction sites throughout Silicon Valley.
        Whether it&apos;s a tech office renovation near Santana Row or a backyard overhaul in Almaden Valley,
        we&apos;ve got you covered.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in San Jose?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">San Jose customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Home remodels and kitchen/bathroom renovations</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">New construction and ADU (accessory dwelling unit) builds</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Tech office and commercial build-outs</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts and garage cleanups</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and large yard debris removal</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all San Jose ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every San Jose ZIP code including 95110, 95111, 95112, 95113, 95116, 95117,
        95118, 95119, 95120, 95121, 95122, 95123, 95124, 95125, 95126, 95127, 95128, 95129,
        95130, 95131, 95132, 95133, 95134, 95135, 95136, 95138, 95139, and 95148. No matter where
        you are in San Jose, we can deliver.
      </p>
    ),
  },
];

const sanJoseAbout = {
  cityName: "San Jose",
  intro:
    "San Jose is the largest city in the Bay Area by population and the heart of Silicon Valley, with a dynamic mix of suburban neighborhoods, tech campuses, and a growing wave of residential and commercial construction. From home remodels in Willow Glen to new builds in Evergreen and office renovations near Santana Row, there&apos;s always a project that needs a reliable dumpster. TP Dumpsters serves San Jose neighborhoods and understands the unique needs of this sprawling city — from large suburban lots to busy commercial districts.",
  highlights: [
    "We serve San Jose's expansive suburban neighborhoods and commercial areas",
    "Familiar with San Jose city permit requirements for street placement",
    "Fast delivery to all San Jose neighborhoods — Downtown to South San Jose",
    "Trusted by San Jose contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Home remodels and renovations in Willow Glen & Rose Garden",
    "New construction and ADU builds across suburban San Jose",
    "Tech office and commercial build-outs near Santana Row & Downtown",
    "Estate cleanouts in Almaden Valley & Evergreen",
    "Landscaping and yard debris removal on large San Jose lots",
    "Roofing projects across San Jose's diverse housing stock",
  ],
  closingText:
    "Whether you're a homeowner tackling a weekend cleanup or a contractor running a major renovation, TP Dumpsters makes waste removal in San Jose easy. We offer transparent pricing, same-day delivery, and the local expertise to get your dumpster exactly where you need it. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in San Jose, CA | Starting at $600 - TP Dumpsters",
  description:
    "Dumpster rental San Jose — fast, reliable dumpster rental in San Jose, CA. Residential & commercial dumpster rental San Jose CA. Construction dumpster rentals San Jose. San Jose dumpster rental prices starting at $600. Same-day delivery. Call (510) 650-2083",
  keywords: [
    "dumpster rental san jose",
    "dumpster rental san jose ca",
    "san jose dumpster rental",
    "commercial dumpster rental san jose ca",
    "construction dumpster rentals san jose",
    "residential dumpster rental san jose ca",
    "san jose dumpster rental prices",
    "roll-off dumpster San Jose",
    "San Jose waste removal",
    "dumpster rental 95110",
    "dumpster rental 95125",
    "dumpster rental Downtown San Jose",
    "Willow Glen dumpster",
    "Almaden Valley dumpster rental",
    "Evergreen dumpster",
    "Silicon Valley dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in San Jose, CA | Starting at $600 - TP Dumpsters",
    description:
      "Dumpster rental San Jose CA — 10, 20 & 30 yard roll-off dumpsters. Residential & commercial dumpster rental San Jose. San Jose dumpster rental prices starting at $600.",
    url: "https://tpdumpsters.com/san-jose",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/logo/TP.png",
        width: 800,
        height: 600,
        alt: "Dumpster rental in San Jose CA - TP Dumpsters roll-off containers",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/san-jose",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - San Jose",
  description:
    "Dumpster rental San Jose, CA. Residential and commercial dumpster rental serving all San Jose neighborhoods with same-day delivery. Construction dumpster rentals San Jose.",
  url: "https://tpdumpsters.com/san-jose",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: {
    "@type": "ImageObject",
    url: "/images/logo/TP.png",
    caption: "Dumpster rental in San Jose CA - TP Dumpsters roll-off containers for residential and commercial projects",
  },
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Jose",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "San Jose",
      "@id": "https://en.wikipedia.org/wiki/San_Jose,_California",
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

export default function SanJosePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <SanJoseHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...sanJoseAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="San Jose" faqs={sanJoseFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <SanJoseLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
