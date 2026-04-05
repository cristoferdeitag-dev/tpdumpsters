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
import SanCarlosHero from "./components/SanCarlosHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import SanCarlosLocation from "./components/SanCarlosLocation";

const sanCarlosFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in San Carlos?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        San Carlos may require a temporary encroachment permit for dumpsters placed on public streets. Private driveway placement generally doesn&apos;t need a permit. San Carlos is known for its well-maintained neighborhoods, so we&apos;ll help ensure compliant placement.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in San Carlos?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> throughout San Carlos when you call before noon. From White Oaks to Devonshire, Highlands to Howard Park, our drivers know the area and can deliver quickly.
      </p>
    ),
  },
  {
    question: "Can you serve the hilly neighborhoods in San Carlos?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! San Carlos has beautiful hillside neighborhoods like Highlands and Crestview with sweeping Bay views. Our experienced drivers handle steep driveways and narrow streets with care. Share your address and we&apos;ll confirm the best placement.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in San Carlos?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        A <strong>20-yard dumpster</strong> is the most popular choice for San Carlos kitchen and bathroom remodels. For larger projects — especially in San Carlos&apos;s spacious homes in White Oaks or Laureola Park — a 30-yard may be needed. The 10-yard is ideal for small cleanouts.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in San Carlos?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">San Carlos customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Home renovations in the charming downtown-adjacent neighborhoods</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">ADU construction and garage conversions</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping overhauls in White Oaks and Devonshire</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts in Highlands and Alder Manor</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing projects across San Carlos neighborhoods</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all San Carlos ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve ZIP code 94070, which covers all of San Carlos. From Maywood Park to Laureola Park, Crestview to Howard Park, we deliver everywhere in the city.
      </p>
    ),
  },
];

const sanCarlosAbout = {
  cityName: "San Carlos",
  intro:
    "San Carlos is known as the 'City of Good Living' and lives up to its motto with tree-lined streets, a vibrant downtown on Laurel Street, and beautiful residential neighborhoods ranging from flatlands to hillside properties. With a strong community of homeowners investing in their properties, dumpster rentals are in constant demand. TP Dumpsters proudly serves San Carlos with reliable, professional service.",
  highlights: [
    "Experienced with San Carlos's mix of flatland and hillside neighborhoods",
    "Familiar with San Carlos permit and HOA requirements",
    "Fast delivery to all neighborhoods — White Oaks to Crestview",
    "Trusted by San Carlos contractors, homeowners, and property managers",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Home renovations near downtown Laurel Street corridor",
    "ADU construction and accessory dwelling projects",
    "Landscaping redesigns in White Oaks and Devonshire",
    "Estate cleanouts in Highlands and Laureola Park",
    "Deck and outdoor living space construction in hillside homes",
    "Roofing and exterior upgrades across San Carlos",
  ],
  closingText:
    "Whether you're updating a classic San Carlos home or building an ADU in Devonshire, TP Dumpsters delivers reliable waste removal. We offer transparent pricing, same-day delivery, and local expertise. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in San Carlos, CA | San Mateo County - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in San Carlos, CA. Serving White Oaks, Devonshire, Highlands, Howard Park & all neighborhoods. Same-day delivery. Call (510) 650-2083",
  keywords: [
    "dumpster rental San Carlos CA",
    "San Carlos dumpster rental",
    "roll-off dumpster San Carlos",
    "construction dumpster San Carlos",
    "San Carlos waste removal",
    "dumpster rental 94070",
    "White Oaks dumpster rental",
    "Devonshire dumpster San Carlos",
    "Highlands dumpster rental",
    "Howard Park dumpster rental",
    "Laureola Park dumpster San Carlos",
    "San Mateo County dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in San Carlos, CA - TP Dumpsters",
    description: "Fast, reliable dumpster rentals in San Carlos. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/san-carlos",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/san-carlos" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - San Carlos",
  description: "Fast, reliable dumpster rentals in San Carlos, CA. Serving all San Carlos neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/san-carlos",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: { "@type": "PostalAddress", addressLocality: "San Carlos", addressRegion: "CA", addressCountry: "US" },
  areaServed: [{ "@type": "City", name: "San Carlos", "@id": "https://en.wikipedia.org/wiki/San_Carlos,_California" }],
  priceRange: "$$",
  openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "07:00", closes: "18:00" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dumpster Rental Sizes",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "10 Yard Dumpster Rental", description: "Compact dumpster ideal for tight spaces and heavy debris like soil, concrete, and bricks." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "20 Yard Dumpster Rental", description: "Versatile dumpster for kitchen/bathroom remodels, roofing projects, and yard cleanups." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "30 Yard Dumpster Rental", description: "Extra capacity dumpster for whole-home cleanouts, large renovations, and construction debris." } },
    ],
  },
};

export default function SanCarlosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <SanCarlosHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...sanCarlosAbout} />
      <SizesSection />
      <DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="San Carlos" faqs={sanCarlosFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <SanCarlosLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
