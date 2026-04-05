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
import CorteMaderaHero from "./components/CorteMaderaHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import CorteMaderaLocation from "./components/CorteMaderaLocation";

const corteMaderaFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Corte Madera?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If you&apos;re placing a dumpster on a public street or right-of-way in Corte Madera, you&apos;ll
        need a temporary encroachment permit from the Town of Corte Madera. Dumpsters placed on
        private driveways typically don&apos;t require permits. Our team can guide you through the process.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for a residential renovation in Corte Madera?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a typical kitchen or bathroom remodel in Corte Madera, a <strong>20-yard dumpster</strong> is
        usually the best fit. For larger whole-home renovations or multi-room projects common in
        Madera Gardens and Chapman Park, the 30-yard is recommended.
      </p>
    ),
  },
  {
    question: "Can you deliver dumpsters near the Town Center shopping area?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We regularly deliver dumpsters for commercial and residential projects near the Corte Madera
        Town Center area. Our drivers are experienced with the traffic patterns and access points around
        the shopping district. Just let us know your exact location and we&apos;ll coordinate delivery.
      </p>
    ),
  },
  {
    question: "Can you navigate narrow streets in Corte Madera?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! Many Corte Madera neighborhoods like Christmas Tree Hill and Mariner Cove have
        narrow, winding streets. Our drivers are experienced with tight access and steep driveways
        throughout Marin County. Just provide your address and we&apos;ll confirm access.
      </p>
    ),
  },
  {
    question: "Can you deliver to hillside properties in Corte Madera?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Christmas Tree Hill and other elevated areas in Corte Madera are well within our service
        capabilities. Our drivers navigate hillside driveways and steep grades throughout Marin County
        every day. Let us know your address and we&apos;ll plan the best approach.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Corte Madera?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Corte Madera customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Home renovations and kitchen/bathroom remodels</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and yard debris removal</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts and garage cleanups</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Commercial projects near Town Center</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing tear-offs and exterior renovations</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Corte Madera ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every Corte Madera ZIP code including 94925 and 94976. From Downtown Corte Madera
        to Christmas Tree Hill, we deliver throughout Corte Madera and all of Marin County.
      </p>
    ),
  },
];

const corteMaderaAbout = {
  cityName: "Corte Madera",
  intro:
    "Corte Madera is a charming small town nestled between San Rafael and Mill Valley in the heart of Marin County. Known for its excellent shopping at Town Center and The Village, beautiful hillside homes on Christmas Tree Hill, and family-friendly neighborhoods like Madera Gardens and Chapman Park, Corte Madera sees a steady stream of home renovation and improvement projects. TP Dumpsters understands the unique challenges of working in this community — from navigating narrow hillside streets to coordinating deliveries near busy shopping areas.",
  highlights: [
    "Expert navigation of Corte Madera's narrow hillside streets and driveways",
    "Familiar with Town of Corte Madera permit requirements for street placement",
    "Fast delivery to all neighborhoods — Downtown to Christmas Tree Hill",
    "Trusted by Marin County contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Home renovations and remodels in Madera Gardens and Chapman Park",
    "Hillside property improvements on Christmas Tree Hill",
    "Kitchen and bathroom remodels in Mariner Cove",
    "Landscaping and yard debris removal throughout Corte Madera",
    "Commercial renovation projects near Town Center",
    "Roofing projects across Corte Madera's residential neighborhoods",
  ],
  closingText:
    "Whether you're a homeowner tackling a weekend cleanup or a contractor managing a major renovation in Corte Madera, TP Dumpsters makes waste removal easy. We offer transparent pricing, same-day delivery, and the local expertise to handle Marin County's unique terrain. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Corte Madera, CA | Marin County - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Corte Madera, CA. Serving Downtown, Town Center, Christmas Tree Hill, Madera Gardens & all ZIP codes. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Corte Madera CA",
    "Corte Madera dumpster rental",
    "roll-off dumpster Corte Madera",
    "construction dumpster Corte Madera",
    "Corte Madera waste removal",
    "dumpster rental 94925",
    "dumpster rental 94976",
    "dumpster rental Marin County",
    "Town Center dumpster",
    "Christmas Tree Hill dumpster rental",
    "Madera Gardens dumpster",
    "Chapman Park dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Corte Madera, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Corte Madera. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/corte-madera",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/corte-madera",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Corte Madera",
  description:
    "Fast, reliable dumpster rentals in Corte Madera, CA. Serving all Corte Madera neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/corte-madera",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Corte Madera",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Corte Madera",
      "@id": "https://en.wikipedia.org/wiki/Corte_Madera,_California",
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

export default function CorteMaderaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <CorteMaderaHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...corteMaderaAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Corte Madera" faqs={corteMaderaFaqs} />
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
            Why Rent a Dumpster in Corte Madera, California?
          </h2>
          <div className="text-[#555] text-base leading-[1.8] font-[var(--font-poppins)] space-y-4">
            <p>
              Corte Madera is a picturesque Marin County town where tree-lined streets meet hillside
              living. Homeowners throughout neighborhoods like Madera Gardens, Chapman Park, and
              Christmas Tree Hill regularly take on renovation projects that generate significant waste.
              From kitchen remodels in family homes to landscaping overhauls, having a reliable
              dumpster on-site keeps your project moving efficiently.
            </p>
            <p>
              The Town Center and Village shopping areas also drive commercial renovation needs, while
              hillside properties present unique access challenges that require experienced drivers.
              TP Dumpsters brings local knowledge of Corte Madera&apos;s terrain, permit requirements,
              and neighborhood regulations. We offer 10, 20, and 30-yard roll-off dumpsters with
              same-day delivery, transparent pricing, and bilingual support in English and Spanish.
              Whether you&apos;re a contractor managing multiple Marin County job sites or a homeowner
              clearing out a garage, call (510) 650-2083 for fast, dependable service.
            </p>
          </div>
        </div>
      </section>

      <CorteMaderaLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
