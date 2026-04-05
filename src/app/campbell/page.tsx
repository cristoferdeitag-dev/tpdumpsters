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
import CampbellHero from "./components/CampbellHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import CampbellLocation from "./components/CampbellLocation";

const campbellFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Campbell?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Campbell may require a temporary encroachment permit for dumpsters placed on public streets. Driveway placement typically doesn&apos;t need a permit. Given Campbell&apos;s downtown character and residential neighborhoods, we can help you navigate the requirements.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Campbell?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> throughout Campbell when you call before noon. From Downtown Campbell to Hacienda, Ainsley Park to Pruneyard, our team delivers quickly across all neighborhoods.
      </p>
    ),
  },
  {
    question: "Can you deliver to Downtown Campbell or near the Pruneyard?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! Campbell&apos;s vibrant downtown and Pruneyard shopping center see regular renovations and commercial projects. Our drivers are familiar with the area and can navigate tight downtown streets and commercial zones. We serve both residential and commercial projects in Campbell.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in Campbell?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        A <strong>20-yard dumpster</strong> is the go-to for Campbell kitchen and bathroom remodels. For larger projects on Campbell&apos;s spacious homes in Hacienda or White Oaks, a 30-yard may be needed. The 10-yard is perfect for smaller cleanouts.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Campbell?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Campbell customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Home renovations in established neighborhoods like Hacienda and Capri</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Commercial tenant improvements downtown and at Pruneyard</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Garage and estate cleanouts in Ainsley Park</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping projects in White Oaks and San Tomas</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing projects across Campbell neighborhoods</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Campbell ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve ZIP codes 95008 and 95009, covering all of Campbell. From Downtown to Union, Hacienda to Pruneyard, we deliver everywhere in the city.
      </p>
    ),
  },
];

const campbellAbout = {
  cityName: "Campbell",
  intro:
    "Campbell is a charming Silicon Valley city known for its lively downtown on Campbell Avenue, the Pruneyard shopping center, and tree-lined residential streets. With a mix of mid-century homes and ongoing commercial development, renovation projects are always underway. TP Dumpsters serves Campbell with fast, reliable dumpster rental for both homes and businesses.",
  highlights: [
    "Experienced with Campbell's downtown and residential neighborhoods",
    "Familiar with Campbell permit requirements and commercial zones",
    "Fast delivery to all neighborhoods — Downtown to Hacienda",
    "Trusted by Campbell contractors, homeowners, and commercial clients",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Home renovations in Hacienda and Capri neighborhoods",
    "Commercial tenant improvements downtown and at Pruneyard",
    "Kitchen and bathroom remodels in Ainsley Park",
    "Estate cleanouts in White Oaks and San Tomas",
    "Landscaping redesigns and backyard improvements",
    "Roofing projects on Campbell's mid-century homes",
  ],
  closingText:
    "Whether you're renovating a home in Hacienda or managing a commercial project near Pruneyard, TP Dumpsters makes waste removal in Campbell seamless. We offer transparent pricing, same-day delivery, and local expertise. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Campbell, CA | Santa Clara County - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Campbell, CA. Serving Downtown Campbell, Hacienda, Ainsley Park, Pruneyard & all neighborhoods. Same-day delivery. Call (510) 650-2083",
  keywords: [
    "dumpster rental Campbell CA",
    "Campbell dumpster rental",
    "roll-off dumpster Campbell",
    "construction dumpster Campbell",
    "Campbell waste removal",
    "dumpster rental 95008",
    "dumpster rental 95009",
    "Downtown Campbell dumpster rental",
    "Hacienda dumpster rental",
    "Pruneyard dumpster Campbell",
    "Ainsley Park dumpster rental",
    "Santa Clara County dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Campbell, CA - TP Dumpsters",
    description: "Fast, reliable dumpster rentals in Campbell. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/campbell",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/campbell" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Campbell",
  description: "Fast, reliable dumpster rentals in Campbell, CA. Serving all Campbell neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/campbell",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: { "@type": "PostalAddress", addressLocality: "Campbell", addressRegion: "CA", addressCountry: "US" },
  areaServed: [{ "@type": "City", name: "Campbell", "@id": "https://en.wikipedia.org/wiki/Campbell,_California" }],
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

export default function CampbellPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <CampbellHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...campbellAbout} />
      <SizesSection />
      <DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Campbell" faqs={campbellFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <CampbellLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
