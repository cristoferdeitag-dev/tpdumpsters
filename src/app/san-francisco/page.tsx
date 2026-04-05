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
import SanFranciscoHero from "./components/SanFranciscoHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import SanFranciscoLocation from "./components/SanFranciscoLocation";

const sanFranciscoFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in San Francisco?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes. San Francisco has strict permit requirements for placing dumpsters on public streets.
        You&apos;ll need a temporary street space permit from SFMTA. If the dumpster is placed on your
        private driveway or property, no permit is typically required. We can help guide you through
        the SF permitting process.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in San Francisco?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        In most San Francisco neighborhoods, we offer <strong>same-day delivery</strong> if you call before noon.
        Areas like the Mission District, SoMa, and Sunset District are within our fastest delivery zone.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in San Francisco?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a typical Victorian or Edwardian home renovation in San Francisco, a <strong>20-yard dumpster</strong> is
        usually the best fit. For whole-home remodels or multi-room gut jobs, go with the 30-yard. For
        small cleanouts or concrete/soil removal, the 10-yard works great.
      </p>
    ),
  },
  {
    question: "Can you deliver to San Francisco's tight streets and hillside homes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We&apos;re experienced with San Francisco&apos;s challenging streets — from narrow lanes in
        Nob Hill to steep grades in Pacific Heights and the fog belt areas of the Sunset and Richmond
        Districts. Our drivers know how to navigate SF&apos;s unique terrain. Just let us know your
        address and we&apos;ll confirm access.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in San Francisco?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">San Francisco customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Victorian and Edwardian home renovations</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Kitchen and bathroom remodels in older homes</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">New construction and commercial build-outs</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts and garage cleanups</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing tear-offs and demolition projects</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all San Francisco ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every San Francisco ZIP code including 94102, 94103, 94104, 94105, 94107,
        94108, 94109, 94110, 94111, 94112, 94114, 94115, 94116, 94117, 94118, 94121, 94122,
        94123, 94124, 94127, 94129, 94130, 94131, 94132, 94133, 94134, and 94158. No matter where
        you are in San Francisco, we can deliver.
      </p>
    ),
  },
];

const sanFranciscoAbout = {
  cityName: "San Francisco",
  intro:
    "San Francisco is one of the most densely built cities in California, filled with iconic Victorian and Edwardian homes, modern high-rises, and a constant wave of renovation and construction projects. From gut remodels in the Mission District to new builds in SoMa and commercial projects in the Financial District, there&apos;s always a need for reliable dumpster service. TP Dumpsters has been serving San Francisco neighborhoods and understands the unique challenges of working in this city — from tight streets and limited parking to strict city regulations.",
  highlights: [
    "We navigate San Francisco's narrow streets and steep hills with ease",
    "Familiar with SF's strict permit requirements for street placement",
    "Fast delivery to all SF neighborhoods — Mission to the Marina",
    "Trusted by San Francisco contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Victorian and Edwardian home renovations in Pacific Heights & the Castro",
    "Kitchen and bathroom remodels in Nob Hill & Haight-Ashbury",
    "New construction and commercial build-outs in SoMa & Financial District",
    "Estate cleanouts in the Sunset and Richmond Districts",
    "Landscaping and yard debris removal in Potrero Hill",
    "Roofing projects across San Francisco's older housing stock",
  ],
  closingText:
    "Whether you're a homeowner tackling a weekend cleanup or a contractor running a major renovation, TP Dumpsters makes waste removal in San Francisco easy. We offer transparent pricing, same-day delivery, and the local expertise to get your dumpster exactly where you need it. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in San Francisco, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Dumpster rental San Francisco — fast, reliable roll-off dumpster rentals in San Francisco, CA. Serving Mission District, SoMa, Sunset, Richmond & all ZIP codes. Same-day delivery. Cheap dumpster rental San Francisco Bay Area. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental san francisco",
    "san francisco dumpster rental",
    "dumpster rental san francisco ca",
    "cheap dumpster rental san francisco",
    "dumpster rental san francisco bay area",
    "roll-off dumpster San Francisco",
    "construction dumpster San Francisco",
    "San Francisco waste removal",
    "dumpster rental 94102",
    "dumpster rental 94110",
    "dumpster rental Mission District",
    "SoMa dumpster",
    "Sunset District dumpster rental",
    "Pacific Heights dumpster",
    "Nob Hill dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in San Francisco, CA - TP Dumpsters",
    description:
      "Dumpster rental San Francisco — 10, 20 & 30 yard roll-off dumpsters. Same-day delivery across San Francisco, CA. Cheap dumpster rental San Francisco Bay Area.",
    url: "https://tpdumpsters.com/san-francisco",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/logo/TP.png",
        width: 800,
        height: 600,
        alt: "Dumpster rental in San Francisco CA - TP Dumpsters roll-off containers",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/san-francisco",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - San Francisco",
  description:
    "Dumpster rental San Francisco, CA. Fast, reliable roll-off dumpster rentals serving all San Francisco neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/san-francisco",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: {
    "@type": "ImageObject",
    url: "/images/logo/TP.png",
    caption: "Dumpster rental in San Francisco CA - TP Dumpsters roll-off containers",
  },
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "San Francisco",
      "@id": "https://en.wikipedia.org/wiki/San_Francisco",
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

export default function SanFranciscoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <SanFranciscoHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...sanFranciscoAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="San Francisco" faqs={sanFranciscoFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <SanFranciscoLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
