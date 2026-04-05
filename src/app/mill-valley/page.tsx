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
import MillValleyHero from "./components/MillValleyHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import MillValleyLocation from "./components/MillValleyLocation";

const millValleyFaqs = [
  {
    question: "Can you deliver dumpsters to narrow hillside roads in Mill Valley?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Mill Valley is known for its winding, narrow hillside roads in areas like Cascade Canyon
        and Tamalpais Valley. Our experienced drivers are skilled at navigating tight turns and steep
        grades. We&apos;ll confirm placement feasibility when you provide your address.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for a luxury home renovation in Mill Valley?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For high-end home renovations common in Mill Valley, a <strong>20-yard dumpster</strong> handles
        most kitchen, bathroom, and single-room projects. For whole-home remodels or additions, the
        30-yard provides ample capacity. For focused projects like tile or fixture removal, the
        10-yard is efficient.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Mill Valley?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Dumpsters placed on public streets in Mill Valley require a temporary permit from the City
        of Mill Valley. On private property or driveways, permits are generally not required. Given
        Mill Valley&apos;s narrow streets, we recommend driveway placement when possible.
      </p>
    ),
  },
  {
    question: "Do you offer eco-friendly disposal options in Mill Valley?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. We prioritize responsible disposal by sorting recyclable materials and diverting
        waste from landfills whenever possible. Mill Valley&apos;s environmentally conscious community
        can count on us to handle debris responsibly, including proper disposal of redwood and
        other natural materials.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Mill Valley?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Mill Valley customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Luxury home renovations and high-end remodels</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Redwood area tree and vegetation cleanup</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Hillside property landscaping projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts and downsizing</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roof replacements and exterior upgrades</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Mill Valley ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve both Mill Valley ZIP codes: 94941 and 94942. From Downtown Mill Valley
        to Strawberry, Tamalpais Valley, and every neighborhood in between, we deliver throughout
        the entire Mill Valley area.
      </p>
    ),
  },
];

const millValleyAbout = {
  cityName: "Mill Valley",
  intro:
    "Nestled at the base of Mount Tamalpais, Mill Valley is one of Marin County's most desirable communities. Its stunning hillside homes, mature redwood groves, and charming downtown create a unique setting where renovation and improvement projects are constant. TP Dumpsters specializes in serving Mill Valley's challenging terrain — from steep Cascade Canyon driveways to tight-access streets in Tamalpais Valley. We bring the right equipment and the driving expertise to deliver dumpsters where others can't.",
  highlights: [
    "Specialized in narrow hillside road and steep driveway deliveries",
    "Eco-friendly disposal practices for Mill Valley's green-minded residents",
    "Fast delivery to all Mill Valley neighborhoods — Downtown to Strawberry",
    "Trusted by Mill Valley contractors and luxury home builders",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Luxury kitchen and bathroom remodels in hillside homes",
    "Redwood grove vegetation and debris cleanup",
    "Whole-home renovations in Tamalpais Valley and Alto",
    "Estate cleanouts and downsizing in Homestead Valley",
    "Deck and outdoor living space construction projects",
    "Roofing replacements on Mill Valley's older homes",
  ],
  closingText:
    "Whether you're renovating a hillside retreat or clearing out a Strawberry cottage, TP Dumpsters delivers reliable waste removal across all of Mill Valley. We handle the tight roads and steep driveways so you can focus on your project. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Mill Valley, CA | Hillside Delivery - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Mill Valley, CA. Serving Tamalpais Valley, Strawberry, Alto, Cascade Canyon & all ZIP codes. Hillside delivery experts. Call (510) 650-2083",
  keywords: [
    "dumpster rental Mill Valley CA",
    "Mill Valley dumpster rental",
    "roll-off dumpster Mill Valley",
    "construction dumpster Mill Valley",
    "Mill Valley waste removal",
    "dumpster rental 94941",
    "dumpster rental 94942",
    "dumpster rental Marin County",
    "Tamalpais Valley dumpster",
    "Strawberry dumpster rental",
    "hillside dumpster delivery Mill Valley",
    "Cascade Canyon dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Mill Valley, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Mill Valley. 10, 20 & 30 yard dumpsters. Hillside delivery experts.",
    url: "https://tpdumpsters.com/mill-valley",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/mill-valley",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Mill Valley",
  description:
    "Fast, reliable dumpster rentals in Mill Valley, CA. Hillside delivery experts serving all Mill Valley neighborhoods.",
  url: "https://tpdumpsters.com/mill-valley",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mill Valley",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Mill Valley",
      "@id": "https://en.wikipedia.org/wiki/Mill_Valley,_California",
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

export default function MillValleyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <MillValleyHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...millValleyAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Mill Valley" faqs={millValleyFaqs} />
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
            Why Rent a Dumpster in Mill Valley, California?
          </h2>
          <div className="text-[#555] text-base leading-[1.8] font-[var(--font-poppins)] space-y-4">
            <p>
              Mill Valley&apos;s stunning hillside setting near Mount Tamalpais makes it one of the
              Bay Area&apos;s most sought-after communities — and one of the most challenging for
              dumpster delivery. Narrow, winding roads through redwood groves, steep driveways
              carved into hillsides, and limited street parking all require a waste hauler with
              genuine local experience. TP Dumpsters has been delivering to Mill Valley&apos;s
              toughest addresses for years.
            </p>
            <p>
              Homeowners here invest heavily in their properties, from luxury kitchen remodels in
              Tamalpais Valley to complete estate renovations in Cascade Canyon. Whether you&apos;re
              a contractor managing a high-end build or a homeowner clearing decades of accumulated
              belongings, our 10, 20, and 30-yard dumpsters fit the job. We offer same-day delivery,
              transparent flat-rate pricing, and bilingual support in English and Spanish. For
              dependable dumpster rental in Mill Valley, call TP Dumpsters at (510) 650-2083.
            </p>
          </div>
        </div>
      </section>

      <MillValleyLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
