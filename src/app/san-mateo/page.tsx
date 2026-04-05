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
import SanMateoHero from "./components/SanMateoHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import SanMateoLocation from "./components/SanMateoLocation";

const sanMateoFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in San Mateo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on a public street in San Mateo, you may need a temporary encroachment permit from the city. If it&apos;s on your private driveway, no permit is usually needed. We can help guide you through the process.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in San Mateo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        In most San Mateo neighborhoods, we offer <strong>same-day delivery</strong> if you call before noon. Areas like Downtown, Hillsdale, and Bay Meadows are within our fastest delivery zone on the central Peninsula.
      </p>
    ),
  },
  {
    question: "Can you deliver to dense residential areas in San Mateo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We&apos;re experienced with San Mateo&apos;s tight residential streets in neighborhoods like Beresford, Fiesta Gardens, and San Mateo Park. Our drivers know how to navigate narrow driveways and limited parking areas. Just let us know your address and we&apos;ll confirm access.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a commercial project in San Mateo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For commercial projects in San Mateo, a <strong>30-yard dumpster</strong> is ideal for large renovations and buildouts. For smaller office remodels or tenant improvements, a <strong>20-yard</strong> works well. For heavy materials like concrete removal, the 10-yard is the best choice.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in San Mateo?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">San Mateo customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Home remodels in Hillsdale and Bay Meadows neighborhoods</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Commercial renovation projects downtown</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts and garage cleanups</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and yard debris removal</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing projects on hillside homes</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all San Mateo ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every San Mateo ZIP code including 94401, 94402, 94403, and 94404. From Downtown to Laurelwood, no matter where you are in San Mateo, we can deliver.
      </p>
    ),
  },
];

const sanMateoAbout = {
  cityName: "San Mateo",
  intro:
    "San Mateo sits at the heart of San Mateo County on the Peninsula, offering a mix of charming residential neighborhoods, bustling commercial corridors, and modern developments like Bay Meadows. With a diverse housing stock ranging from historic homes to contemporary condos, there&apos;s always a project that needs reliable waste removal. TP Dumpsters serves the entire San Mateo area with fast, affordable dumpster rentals.",
  highlights: [
    "Central Peninsula location for fast delivery times",
    "Familiar with San Mateo city permit requirements for street placement",
    "Fast delivery to all neighborhoods — Downtown to Bay Meadows",
    "Trusted by San Mateo contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Home remodels in Hillsdale and Hayward Park neighborhoods",
    "Kitchen and bathroom renovations in San Mateo Park",
    "Commercial buildouts and tenant improvements downtown",
    "Estate cleanouts in Beresford and Fiesta Gardens",
    "Landscaping and yard debris removal in Laurelwood",
    "New construction support in the Bay Meadows development area",
  ],
  closingText:
    "Whether you're a homeowner tackling a weekend cleanup or a contractor running a major renovation, TP Dumpsters makes waste removal in San Mateo easy. We offer transparent pricing, same-day delivery, and the local expertise to get your dumpster exactly where you need it. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in San Mateo, CA | Central Peninsula - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in San Mateo, CA. Serving Downtown, Hillsdale, Bay Meadows, Beresford & all ZIP codes. Same-day delivery. Call (510) 650-2083",
  keywords: [
    "dumpster rental San Mateo CA",
    "San Mateo dumpster rental",
    "roll-off dumpster San Mateo",
    "construction dumpster San Mateo",
    "San Mateo waste removal",
    "dumpster rental 94401",
    "dumpster rental 94402",
    "dumpster rental Downtown San Mateo",
    "Hillsdale dumpster rental",
    "Bay Meadows dumpster",
    "Beresford dumpster rental",
    "San Mateo County dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in San Mateo, CA - TP Dumpsters",
    description: "Fast, reliable dumpster rentals in San Mateo. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/san-mateo",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/san-mateo" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - San Mateo",
  description: "Fast, reliable dumpster rentals in San Mateo, CA. Serving all San Mateo neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/san-mateo",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: { "@type": "PostalAddress", addressLocality: "San Mateo", addressRegion: "CA", addressCountry: "US" },
  areaServed: [{ "@type": "City", name: "San Mateo", "@id": "https://en.wikipedia.org/wiki/San_Mateo,_California" }],
  priceRange: "$$",
  openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "07:00", closes: "18:00" },
  hasOfferCatalog: {
    "@type": "OfferCatalog", name: "Dumpster Rental Sizes",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "10 Yard Dumpster Rental", description: "Compact dumpster ideal for tight spaces and heavy debris like soil, concrete, and bricks." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "20 Yard Dumpster Rental", description: "Versatile dumpster for kitchen/bathroom remodels, roofing projects, and yard cleanups." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "30 Yard Dumpster Rental", description: "Extra capacity dumpster for whole-home cleanouts, large renovations, and construction debris." } },
    ],
  },
};

export default function SanMateoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <SanMateoHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...sanMateoAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="San Mateo" faqs={sanMateoFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <SanMateoLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
