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
import VacavilleHero from "./components/VacavilleHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import VacavilleLocation from "./components/VacavilleLocation";

const vacavilleFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Vacaville?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on a public street in Vacaville, you may need a temporary
        encroachment permit from the City of Vacaville. If it&apos;s on your private driveway or
        property, no permit is usually required. We can help guide you through the process.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Vacaville from the Bay Area?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer fast delivery to Vacaville from our Bay Area operations. In most cases, we can
        deliver within the <strong>same day or next business day</strong>. Areas like Downtown
        Vacaville, Nut Tree, and Leisure Town are all within our regular service zone.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in Vacaville?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a typical kitchen or bathroom remodel in Vacaville, a <strong>20-yard dumpster</strong> is
        usually the best fit. For whole-home renovations or large cleanouts, go with the 30-yard. For
        small projects, concrete, or soil, the 10-yard works great.
      </p>
    ),
  },
  {
    question: "Can I use a dumpster for agricultural or ranch debris in Vacaville?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Vacaville&apos;s agricultural heritage means many properties have farm debris, old fencing,
        barn materials, and land-clearing waste. Our dumpsters are perfect for these projects. Just let
        us know what materials you&apos;re disposing of so we can recommend the right size.
      </p>
    ),
  },
  {
    question: "Do you handle waste from outlet mall and commercial renovation projects?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. We serve contractors working on commercial renovations near the Vacaville Premium
        Outlets and throughout the city. Our 20-yard and 30-yard dumpsters are ideal for retail
        build-outs, tenant improvements, and large-scale commercial projects.
      </p>
    ),
  },
  {
    question: "Do you serve all Vacaville ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every Vacaville ZIP code including 95687, 95688, and 95696. Whether you&apos;re
        in Downtown Vacaville, Elmira, Browns Valley, or anywhere in between, we can deliver.
      </p>
    ),
  },
];

const vacavilleAbout = {
  cityName: "Vacaville",
  intro:
    "Vacaville is a thriving city in Solano County, strategically located between the San Francisco Bay Area and Sacramento. Known for its agricultural heritage, the iconic Nut Tree, and the popular Premium Outlets, Vacaville has experienced rapid growth with a mix of suburban development and rural charm. From new construction in expanding neighborhoods to remodels in established areas, there\u2019s always a project that needs a reliable dumpster. TP Dumpsters proudly serves Vacaville and understands the unique needs of this growing community.",
  highlights: [
    "Serving Vacaville from the Bay Area with fast, reliable delivery",
    "Familiar with Vacaville city regulations and permit requirements",
    "Quick delivery to all Vacaville neighborhoods — Downtown to Elmira",
    "Trusted by Vacaville contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Home remodels and additions in Alamo Creek and Browns Valley",
    "New construction support in Vacaville\u2019s expanding neighborhoods",
    "Agricultural and ranch debris cleanup in rural Vacaville areas",
    "Commercial renovations near the Premium Outlets",
    "Estate cleanouts and garage cleanups across Vacaville",
    "Landscaping and yard debris removal in Southtown and Foxboro",
  ],
  closingText:
    "Whether you\u2019re a homeowner tackling a weekend cleanup or a contractor running a major renovation, TP Dumpsters makes waste removal in Vacaville easy. We offer transparent pricing, fast delivery from the Bay Area, and the expertise to get your dumpster exactly where you need it. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Vacaville, CA | Fast Bay Area Service - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Vacaville, CA. Serving Downtown Vacaville, Nut Tree, Alamo Creek & all ZIP codes. Same-day delivery available. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental vacaville ca",
    "vacaville dumpster rental",
    "roll off dumpster vacaville",
    "construction dumpster vacaville ca",
    "cheap dumpster rental vacaville",
    "dumpster rental 95687",
    "dumpster rental 95688",
    "dumpster rental Downtown Vacaville",
    "Nut Tree dumpster rental",
    "Vacaville waste removal",
    "Solano County dumpster rental",
    "Vacaville construction dumpster",
  ],
  openGraph: {
    title: "Dumpster Rental in Vacaville, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Vacaville. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/vacaville",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/vacaville",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Vacaville",
  description:
    "Fast, reliable dumpster rentals in Vacaville, CA. Serving all Vacaville neighborhoods with fast delivery from the Bay Area.",
  url: "https://tpdumpsters.com/vacaville",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vacaville",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Vacaville",
      "@id": "https://en.wikipedia.org/wiki/Vacaville,_California",
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

export default function VacavillePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <VacavilleHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...vacavilleAbout} />
<SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Vacaville" faqs={vacavilleFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <VacavilleLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
