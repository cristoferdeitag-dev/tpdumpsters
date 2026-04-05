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
import SanBrunoHero from "./components/SanBrunoHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import SanBrunoLocation from "./components/SanBrunoLocation";

const sanBrunoFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in San Bruno?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For street placement in San Bruno, you may need a temporary encroachment permit from the city. Dumpsters placed on your private driveway generally don&apos;t require permits. Our team can walk you through San Bruno&apos;s specific requirements.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in San Bruno?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> to San Bruno neighborhoods when you call before noon. From Crestmoor to Bayhill, Mills Park to Downtown San Bruno, we can typically get a dumpster to you within hours.
      </p>
    ),
  },
  {
    question: "Can you deliver near San Bruno Mountain or hilly areas?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Our drivers are experienced with San Bruno&apos;s hillside terrain, including neighborhoods near San Bruno Mountain and Portola Highlands. We know how to handle steep grades and tight turns. Just provide your address and we&apos;ll confirm placement options.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in San Bruno?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        A <strong>20-yard dumpster</strong> works great for most kitchen and bathroom remodels in San Bruno. For bigger projects like whole-house renovations in Crestmoor or Rollingwood, consider a 30-yard. The 10-yard is perfect for small cleanouts or heavy materials like concrete.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in San Bruno?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">San Bruno customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Home remodels in Crestmoor and Rollingwood neighborhoods</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Garage cleanouts and downsizing projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Construction debris from Bayhill commercial projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and yard waste removal near San Bruno Mountain</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing tear-offs on mid-century homes in Mills Park</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all San Bruno ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve ZIP code 94066 which covers all of San Bruno. From Downtown San Bruno to Lomita Park, Bayhill to Portola Highlands, we deliver everywhere in the city.
      </p>
    ),
  },
];

const sanBrunoAbout = {
  cityName: "San Bruno",
  intro:
    "San Bruno is a welcoming Peninsula city situated between San Francisco International Airport and San Bruno Mountain. With its diverse mix of residential neighborhoods, commercial areas near Bayhill, and scenic hillside properties, there&apos;s always a construction or cleanup project happening. TP Dumpsters serves San Bruno with fast, reliable dumpster rental tailored to the city&apos;s unique terrain and neighborhood needs.",
  highlights: [
    "Experienced with San Bruno's hillside terrain and steep residential streets",
    "Quick delivery near SFO and the Bayhill commercial corridor",
    "Fast service to all neighborhoods — Crestmoor to Lomita Park",
    "Trusted by San Bruno contractors, homeowners, and property managers",
    "Bilingual team (English & Spanish) for seamless communication",
  ],
  commonProjects: [
    "Home renovations in Crestmoor and Rollingwood neighborhoods",
    "Kitchen and bathroom remodels in Mills Park",
    "Commercial cleanouts near the Bayhill business district",
    "Landscaping debris removal near San Bruno Mountain trails",
    "Roofing projects on mid-century homes in Portola Highlands",
    "Estate cleanouts and downsizing in Lomita Park",
  ],
  closingText:
    "Whether you're remodeling a home in Crestmoor or managing a commercial project near Bayhill, TP Dumpsters makes waste removal in San Bruno easy. We offer transparent pricing, same-day delivery, and local expertise. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in San Bruno, CA | San Mateo County - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in San Bruno, CA. Serving Crestmoor, Mills Park, Bayhill, Rollingwood & all neighborhoods. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental San Bruno CA",
    "San Bruno dumpster rental",
    "roll-off dumpster San Bruno",
    "construction dumpster San Bruno",
    "San Bruno waste removal",
    "dumpster rental 94066",
    "dumpster rental Crestmoor",
    "Bayhill dumpster rental",
    "Mills Park dumpster rental",
    "Rollingwood dumpster San Bruno",
    "Portola Highlands dumpster rental",
    "San Mateo County dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in San Bruno, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in San Bruno. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/san-bruno",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/san-bruno",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - San Bruno",
  description:
    "Fast, reliable dumpster rentals in San Bruno, CA. Serving all San Bruno neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/san-bruno",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Bruno",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "San Bruno",
      "@id": "https://en.wikipedia.org/wiki/San_Bruno,_California",
    },
  ],
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "07:00",
    closes: "18:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dumpster Rental Sizes",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "10 Yard Dumpster Rental", description: "Compact dumpster ideal for tight spaces and heavy debris like soil, concrete, and bricks." },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "20 Yard Dumpster Rental", description: "Versatile dumpster for kitchen/bathroom remodels, roofing projects, and yard cleanups." },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "30 Yard Dumpster Rental", description: "Extra capacity dumpster for whole-home cleanouts, large renovations, and construction debris." },
      },
    ],
  },
};

export default function SanBrunoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <SanBrunoHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...sanBrunoAbout} />
      <SizesSection />
      <DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="San Bruno" faqs={sanBrunoFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <SanBrunoLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
