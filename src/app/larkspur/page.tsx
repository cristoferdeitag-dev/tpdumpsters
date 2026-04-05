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
import LarkspurHero from "./components/LarkspurHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import LarkspurLocation from "./components/LarkspurLocation";

const larkspurFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Larkspur?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If you&apos;re placing a dumpster on a public street in Larkspur, you&apos;ll likely need a
        temporary encroachment permit from the City of Larkspur. Dumpsters on private driveways
        typically don&apos;t require permits. Our team can guide you through the process.
      </p>
    ),
  },
  {
    question: "Can you deliver dumpsters near the Larkspur Ferry Terminal area?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We regularly deliver to the Larkspur Landing and ferry terminal area. Whether it&apos;s
        a commercial renovation near the landing or a residential project nearby, our drivers know
        the area well and can coordinate delivery around ferry traffic patterns.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for a Greenbrae home remodel?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a typical kitchen or bathroom remodel in Greenbrae, a <strong>20-yard dumpster</strong> is
        the most popular choice. For larger whole-home renovations or multi-room projects, the 30-yard
        handles the extra volume. For small cleanouts or concrete, the 10-yard works great.
      </p>
    ),
  },
  {
    question: "Can you deliver to historic downtown Larkspur properties?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! Downtown Larkspur has charming historic buildings that often need renovation work.
        Our drivers are experienced with the narrow streets and limited parking in the downtown area.
        We&apos;ll work with you to find the best placement for your dumpster.
      </p>
    ),
  },
  {
    question: "Can you navigate hillside homes in Larkspur?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Many Larkspur neighborhoods like Hillview and Baltimore Park have steep driveways and
        winding roads. Our drivers are experienced with hillside deliveries throughout Marin County.
        Just provide your address and we&apos;ll confirm access before delivery.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Larkspur?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Larkspur customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Home renovations and kitchen/bathroom remodels</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Historic home restoration projects in downtown</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and yard debris removal</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts and garage cleanups</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing tear-offs and exterior renovations</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Larkspur ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every Larkspur ZIP code including 94939 and 94977. From Downtown Larkspur to
        Greenbrae and Larkspur Landing, we deliver throughout Larkspur and all of Marin County.
      </p>
    ),
  },
];

const larkspurAbout = {
  cityName: "Larkspur",
  intro:
    "Larkspur is a charming city in central Marin County known for its historic downtown, beautiful redwood groves, and the bustling Larkspur Landing ferry terminal. From older home renovations in the historic downtown area to modern remodels in Greenbrae and Bon Air, the city sees a steady flow of construction and renovation projects. TP Dumpsters understands the unique character of Larkspur — from navigating narrow hillside streets in Baltimore Park to coordinating deliveries near the ferry terminal area.",
  highlights: [
    "Expert navigation of Larkspur's narrow streets and hillside driveways",
    "Familiar with City of Larkspur permit requirements for street placement",
    "Fast delivery to all neighborhoods — Downtown to Larkspur Landing",
    "Trusted by Marin County contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Historic home renovations in Downtown Larkspur",
    "Kitchen and bathroom remodels in Greenbrae and Bon Air",
    "Hillside property improvements in Hillview and Baltimore Park",
    "Landscaping and yard debris removal throughout Larkspur",
    "Commercial projects near Larkspur Landing",
    "Roofing projects across Larkspur's residential neighborhoods",
  ],
  closingText:
    "Whether you're a homeowner tackling a weekend cleanup or a contractor managing a major renovation in Larkspur, TP Dumpsters makes waste removal easy. We offer transparent pricing, same-day delivery, and the local expertise to handle Marin County's unique terrain. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Larkspur, CA | Central Marin Service - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Larkspur, CA. Serving Downtown, Greenbrae, Bon Air, Larkspur Landing & all ZIP codes. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Larkspur CA",
    "Larkspur dumpster rental",
    "roll-off dumpster Larkspur",
    "construction dumpster Larkspur",
    "Larkspur waste removal",
    "dumpster rental 94939",
    "dumpster rental 94977",
    "dumpster rental Marin County",
    "Greenbrae dumpster",
    "Downtown Larkspur dumpster rental",
    "Larkspur Landing dumpster",
    "Bon Air dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Larkspur, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Larkspur. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/larkspur",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/larkspur",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Larkspur",
  description:
    "Fast, reliable dumpster rentals in Larkspur, CA. Serving all Larkspur neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/larkspur",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Larkspur",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Larkspur",
      "@id": "https://en.wikipedia.org/wiki/Larkspur,_California",
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

export default function LarkspurPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <LarkspurHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...larkspurAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Larkspur" faqs={larkspurFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />

      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[800px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-[24px] md:text-[30px] font-bold text-[#333] mb-6 text-center">
            Why Rent a Dumpster in Larkspur, California?
          </h2>
          <div className="text-[#555] text-base leading-[1.8] font-[var(--font-poppins)] space-y-4">
            <p>
              Larkspur is a small but vibrant city in central Marin County, known for its historic
              downtown, towering redwoods, and easy access to San Francisco via the Larkspur Ferry.
              Homeowners throughout neighborhoods like Greenbrae, Bon Air, and Murray Park regularly
              undertake renovation projects that generate significant waste. From updating older homes
              in the historic downtown to modern remodels in Larkspur Landing, having a reliable
              dumpster on-site keeps your project on schedule.
            </p>
            <p>
              Hillside properties in Baltimore Park and Hillview present unique access challenges
              that require experienced drivers familiar with Marin County&apos;s terrain. TP Dumpsters
              brings local knowledge of Larkspur&apos;s streets, permit requirements, and neighborhood
              character. We offer 10, 20, and 30-yard roll-off dumpsters with same-day delivery,
              transparent pricing, and bilingual support in English and Spanish. Whether you&apos;re a
              contractor managing multiple Marin County job sites or a homeowner clearing out a
              garage, call (510) 650-2083 for fast, dependable service.
            </p>
          </div>
        </div>
      </section>

      <LarkspurLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
