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
import SuisunCityHero from "./components/SuisunCityHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import SuisunCityLocation from "./components/SuisunCityLocation";

const suisunCityFaqs = [
  {
    question: "Can you deliver dumpsters to the Suisun Waterfront area?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We regularly deliver to the <strong>Suisun Waterfront</strong> and Downtown Suisun areas. Our drivers are familiar with the access points and parking considerations near the waterfront. Just let us know your exact address and we&apos;ll confirm placement options.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster in Suisun City?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> to Suisun City when you call before noon. Since Suisun City is right next to Fairfield, it&apos;s within our fast delivery zone for Solano County. Most deliveries arrive within a few hours of booking.
      </p>
    ),
  },
  {
    question: "Do I need a permit to place a dumpster in Suisun City?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If your dumpster is placed on your <strong>private driveway or property</strong>, no permit is typically needed. For street placement in Suisun City, you may need a temporary encroachment permit from the city. We can help guide you through the process.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for a residential cleanup in Suisun City?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For most residential cleanups in Suisun City — garage cleanouts, yard debris, or small remodels — a <strong>10-yard or 20-yard dumpster</strong> works great. For larger home renovations or new construction projects in neighborhoods like Lawler Ranch or Petersen Ranch, the 30-yard is the way to go.
      </p>
    ),
  },
  {
    question: "Do you serve Suisun City and Fairfield with the same service?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Suisun City and Fairfield are neighboring cities, and we serve both with the <strong>same fast delivery and pricing</strong>. Whether your project is in Downtown Suisun or across the border in Fairfield, one call covers it all.
      </p>
    ),
  },
  {
    question: "What are common dumpster rental uses in Suisun City?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Suisun City customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Home remodels and kitchen/bathroom renovations</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">New construction in growing subdivisions</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Garage and estate cleanouts</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Yard waste and landscaping debris removal</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing tear-offs and siding projects</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve the 94585 ZIP code?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve <strong>ZIP code 94585</strong>, which covers all of Suisun City. No matter where you are in Suisun City — from Crystal Ranch to Heritage Park — we deliver right to your location.
      </p>
    ),
  },
];

const suisunCityAbout = {
  cityName: "Suisun City",
  intro:
    "Suisun City is a charming waterfront community nestled next to Fairfield along Suisun Bay in Solano County. Known for its revitalized downtown, scenic waterfront district, and growing residential neighborhoods, Suisun City is a hub of home improvement and new construction activity. From older homes near the historic train depot to newer developments in Lawler Ranch and Petersen Ranch, there&apos;s always a project that needs reliable waste removal. TP Dumpsters serves all of Suisun City with fast delivery and transparent pricing.",
  highlights: [
    "Experienced with waterfront area deliveries and access",
    "Fast service to all Suisun City neighborhoods including Lawler Ranch and Crystal Ranch",
    "Familiar with Suisun City permit requirements for street placement",
    "Same-day delivery available — right next to our Fairfield service area",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Home renovations in Heritage Park and Petersen Ranch",
    "New construction support in growing Suisun City subdivisions",
    "Garage and estate cleanouts in established neighborhoods",
    "Landscaping and yard debris removal near the waterfront",
    "Roofing projects across Suisun City residential areas",
    "Kitchen and bathroom remodels in Lawler Ranch homes",
  ],
  closingText:
    "Whether you&apos;re a homeowner tackling a weekend cleanup or a contractor working on new construction in Suisun City, TP Dumpsters makes waste removal easy. We offer transparent pricing, same-day delivery, and the local expertise to serve this waterfront community. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Suisun City, CA | Solano County - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Suisun City, CA. Serving Downtown Suisun, Waterfront, Lawler Ranch, Heritage Park & all neighborhoods. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Suisun City CA",
    "Suisun City dumpster rental",
    "roll-off dumpster Suisun City",
    "construction dumpster Suisun City",
    "Suisun City waste removal",
    "dumpster rental 94585",
    "dumpster rental Suisun Waterfront",
    "Solano County dumpster rental",
    "Suisun City cleanup",
    "dumpster near Fairfield",
  ],
  openGraph: {
    title: "Dumpster Rental in Suisun City, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Suisun City. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/suisun-city",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/suisun-city",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Suisun City",
  description:
    "Fast, reliable dumpster rentals in Suisun City, CA. Serving all Suisun City neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/suisun-city",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Suisun City",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Suisun City",
      "@id": "https://en.wikipedia.org/wiki/Suisun_City,_California",
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

export default function SuisunCityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <SuisunCityHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...suisunCityAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Suisun City" faqs={suisunCityFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <SuisunCityLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
