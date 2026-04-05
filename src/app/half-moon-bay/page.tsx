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
import HalfMoonBayHero from "./components/HalfMoonBayHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import HalfMoonBayLocation from "./components/HalfMoonBayLocation";

const halfMoonBayFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Half Moon Bay?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Half Moon Bay may require a temporary encroachment permit for dumpsters placed on public streets, especially along Highway 1 or in the historic downtown area. Driveway placement is usually simpler. Given the coastal location and unique zoning, we&apos;ll help you navigate the requirements.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Half Moon Bay?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer delivery to Half Moon Bay and the coastal communities including El Granada, Miramar, and Montara. While it&apos;s a bit farther from our base, we schedule deliveries efficiently. Call us to confirm availability and timing for your specific location.
      </p>
    ),
  },
  {
    question: "Can you deliver to coastal properties and beach-area homes in Half Moon Bay?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Half Moon Bay&apos;s coastal location presents unique challenges with narrow streets, beach access roads, and sometimes foggy conditions. Our drivers are experienced with coastal deliveries to areas like Pillar Point, Miramar, and Princeton. We&apos;ll work with you to ensure safe placement.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in Half Moon Bay?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        A <strong>20-yard dumpster</strong> works great for most Half Moon Bay remodels. For larger coastal homes or properties undergoing extensive renovations, a 30-yard may be needed. The 10-yard is perfect for small cleanouts and landscaping debris.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Half Moon Bay?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Half Moon Bay customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Coastal home renovations and weatherproofing upgrades</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Historic downtown building restorations</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Farm and agricultural cleanups in rural areas</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and storm debris removal</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts in El Granada and Montara</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Half Moon Bay ZIP codes and coastal areas?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve ZIP code 94019, covering Half Moon Bay, El Granada, Miramar, Princeton, Montara, Moss Beach, and other coastal communities in the area.
      </p>
    ),
  },
];

const halfMoonBayAbout = {
  cityName: "Half Moon Bay",
  intro:
    "Half Moon Bay is a charming coastal town on the San Mateo County coast, known for its stunning ocean views, historic downtown, pumpkin patches, and tight-knit community. From beach cottages to hillside estates, coastal properties require regular maintenance and renovation. TP Dumpsters serves Half Moon Bay and the surrounding coastal communities with reliable dumpster rental tailored to the unique needs of coastal living.",
  highlights: [
    "Experienced with Half Moon Bay's coastal roads and beach access",
    "Serve all coastal communities — El Granada to Montara",
    "Reliable delivery despite coastal weather and fog",
    "Trusted by Half Moon Bay contractors, homeowners, and property managers",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Coastal home renovations and weatherproofing in Miramar and Princeton",
    "Historic downtown building restoration projects",
    "Farm and agricultural debris removal in rural Half Moon Bay",
    "Landscaping and storm cleanup after coastal weather",
    "Estate cleanouts in El Granada and Moss Beach",
    "Roofing and siding projects on salt-air-exposed homes",
  ],
  closingText:
    "Whether you're renovating a coastal cottage in Miramar or managing a construction project in downtown Half Moon Bay, TP Dumpsters delivers reliable waste removal to the coast. We offer transparent pricing and the coastal expertise your project needs. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Half Moon Bay, CA | San Mateo County - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Half Moon Bay, CA. Serving El Granada, Miramar, Princeton, Montara, Moss Beach & all coastal areas. Same-day delivery. Call (510) 650-2083",
  keywords: [
    "dumpster rental Half Moon Bay CA",
    "Half Moon Bay dumpster rental",
    "roll-off dumpster Half Moon Bay",
    "construction dumpster Half Moon Bay",
    "Half Moon Bay waste removal",
    "dumpster rental 94019",
    "El Granada dumpster rental",
    "Miramar dumpster rental",
    "coastal dumpster Half Moon Bay",
    "Montara dumpster rental",
    "Moss Beach dumpster rental",
    "San Mateo County dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Half Moon Bay, CA - TP Dumpsters",
    description: "Fast, reliable dumpster rentals in Half Moon Bay. 10, 20 & 30 yard dumpsters. Coastal delivery available.",
    url: "https://tpdumpsters.com/half-moon-bay",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/half-moon-bay" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Half Moon Bay",
  description: "Fast, reliable dumpster rentals in Half Moon Bay, CA. Serving all coastal communities with reliable delivery.",
  url: "https://tpdumpsters.com/half-moon-bay",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: { "@type": "PostalAddress", addressLocality: "Half Moon Bay", addressRegion: "CA", addressCountry: "US" },
  areaServed: [{ "@type": "City", name: "Half Moon Bay", "@id": "https://en.wikipedia.org/wiki/Half_Moon_Bay,_California" }],
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

export default function HalfMoonBayPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <HalfMoonBayHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...halfMoonBayAbout} />
      <SizesSection />
      <DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Half Moon Bay" faqs={halfMoonBayFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <HalfMoonBayLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
