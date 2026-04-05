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
import GilroyHero from "./components/GilroyHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import GilroyLocation from "./components/GilroyLocation";

const gilroyFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Gilroy?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Gilroy may require a temporary encroachment permit for dumpsters on public streets. Private driveway placement typically doesn&apos;t require a permit. We&apos;ll help you understand Gilroy&apos;s requirements.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Gilroy?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer delivery to Gilroy with reliable service throughout the city. From Downtown Gilroy to Eagle Ridge, Glen Loma Ranch to South Valley, we deliver to all Gilroy neighborhoods.
      </p>
    ),
  },
  {
    question: "Do you serve agricultural and rural properties in Gilroy?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Gilroy is known for its agricultural heritage, and we regularly serve farms, ranches, and rural properties throughout the area. Whether it&apos;s farm cleanup, barn renovation, or property maintenance, we can handle it.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in Gilroy?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        A <strong>20-yard dumpster</strong> is ideal for most Gilroy kitchen and bathroom remodels. For larger projects in the newer developments like Eagle Ridge or Thomas Ranch, a 30-yard may be needed. The 10-yard works great for smaller cleanouts.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Gilroy?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Gilroy customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">New construction in growing neighborhoods like Eagle Ridge</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Farm and agricultural property cleanups</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Home renovations in Downtown Gilroy and Old Gilroy</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping projects in Glen Loma Ranch</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts in Las Animas and Thomas Ranch</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Gilroy ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve ZIP codes 95020 and 95021, covering all of Gilroy. From Downtown to South Valley, Eagle Ridge to the Gilroy Gardens area, we deliver everywhere in the city.
      </p>
    ),
  },
];

const gilroyAbout = {
  cityName: "Gilroy",
  intro:
    "Gilroy is a vibrant South County city known as the 'Garlic Capital of the World,' with a rich agricultural heritage and growing residential communities. From historic downtown to new developments like Eagle Ridge, Gilroy is constantly evolving. TP Dumpsters serves Gilroy with reliable dumpster rental for construction, agriculture, and residential projects.",
  highlights: [
    "Experienced with Gilroy's mix of urban, suburban, and rural properties",
    "Serve agricultural, residential, and commercial projects",
    "Fast delivery to all neighborhoods — Downtown to Eagle Ridge",
    "Trusted by Gilroy contractors, homeowners, and farmers",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "New construction debris in Eagle Ridge and Thomas Ranch",
    "Farm and agricultural property cleanups",
    "Home renovations in Downtown Gilroy and Old Gilroy",
    "Landscaping projects in Glen Loma Ranch",
    "Estate cleanouts in Las Animas and South Valley",
    "Commercial projects near Gilroy Gardens and downtown",
  ],
  closingText:
    "Whether you're building in a new development, renovating a historic home, or managing a farm cleanup, TP Dumpsters provides reliable waste removal in Gilroy. We offer transparent pricing and service you can count on. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Gilroy, CA | Santa Clara County - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Gilroy, CA. Serving Downtown, Eagle Ridge, Glen Loma Ranch & all neighborhoods. Same-day delivery. Call (510) 650-2083",
  keywords: [
    "dumpster rental Gilroy CA",
    "Gilroy dumpster rental",
    "roll-off dumpster Gilroy",
    "construction dumpster Gilroy",
    "Gilroy waste removal",
    "dumpster rental 95020",
    "dumpster rental 95021",
    "Downtown Gilroy dumpster rental",
    "Eagle Ridge dumpster rental",
    "Glen Loma Ranch dumpster Gilroy",
    "farm dumpster rental Gilroy",
    "Santa Clara County dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Gilroy, CA - TP Dumpsters",
    description: "Fast, reliable dumpster rentals in Gilroy. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/gilroy",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/gilroy" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Gilroy",
  description: "Fast, reliable dumpster rentals in Gilroy, CA. Serving all Gilroy neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/gilroy",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: { "@type": "PostalAddress", addressLocality: "Gilroy", addressRegion: "CA", addressCountry: "US" },
  areaServed: [{ "@type": "City", name: "Gilroy", "@id": "https://en.wikipedia.org/wiki/Gilroy,_California" }],
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

export default function GilroyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <GilroyHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...gilroyAbout} />
      <SizesSection />
      <DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Gilroy" faqs={gilroyFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <GilroyLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
