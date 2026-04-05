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
import TiburonHero from "./components/TiburonHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import TiburonLocation from "./components/TiburonLocation";

const tiburonFaqs = [
  {
    question: "Can you deliver dumpsters to Tiburon's steep peninsula roads?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Tiburon&apos;s peninsula terrain includes some of Marin County&apos;s steepest residential
        streets. Our drivers are experienced with the winding roads around Ring Mountain, Belvedere
        Island, and Lyford Cove. We&apos;ll confirm access when you provide your address.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for a luxury home remodel in Tiburon?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For high-end Tiburon home renovations, a <strong>20-yard dumpster</strong> handles most kitchen,
        bathroom, and single-room remodels. For whole-home renovations or additions on Tiburon&apos;s
        larger properties, the 30-yard provides the capacity you need. The 10-yard works well for
        targeted projects like fixture replacement.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Tiburon?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Dumpsters placed on public streets in Tiburon may require a permit from the Town of Tiburon.
        On private property, permits are generally not needed. Given Tiburon&apos;s residential character,
        we recommend driveway placement whenever space allows.
      </p>
    ),
  },
  {
    question: "Do you serve Belvedere Island as well?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We deliver to Belvedere Island and all surrounding Tiburon neighborhoods. Belvedere&apos;s
        narrow, winding streets require careful navigation, and our experienced drivers handle these
        conditions regularly. We serve the entire 94920 ZIP code area.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Tiburon?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Tiburon customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Luxury property renovations and high-end remodels</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Belvedere Island home improvement projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts and property downsizing</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and outdoor living space construction</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roof replacements and exterior upgrades</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Tiburon ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve the entire Tiburon ZIP code 94920, which covers Downtown Tiburon, Belvedere
        Island, Paradise Cay, Reed Heights, Ring Mountain, and all surrounding areas. No matter
        where you are on the Tiburon peninsula, we can deliver.
      </p>
    ),
  },
];

const tiburonAbout = {
  cityName: "Tiburon",
  intro:
    "Perched on a scenic peninsula in Marin County, Tiburon is one of the Bay Area's most affluent communities. Its stunning waterfront homes, Belvedere Island estates, and hillside properties are constantly being updated, renovated, and improved. TP Dumpsters understands the unique demands of working in Tiburon — from navigating steep, winding roads to providing careful dumpster placement that protects premium driveways and landscaping. We're the trusted choice for Tiburon's contractors and homeowners who expect reliable, professional service.",
  highlights: [
    "Expert navigation of Tiburon's steep peninsula roads and tight turns",
    "Careful placement that protects luxury driveways and landscaping",
    "Fast delivery across the entire Tiburon peninsula and Belvedere Island",
    "Trusted by Tiburon's top contractors and luxury home builders",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Luxury kitchen and bathroom renovations in waterfront homes",
    "Belvedere Island estate remodels and additions",
    "Landscaping and hardscaping projects on hillside properties",
    "Estate cleanouts and property transitions in Paradise Cay",
    "Deck and outdoor living construction on steep lots",
    "Roof replacements and exterior renovations throughout Tiburon",
  ],
  closingText:
    "Whether you're managing a high-end renovation on Belvedere Island or clearing out a property near Paradise Cay, TP Dumpsters delivers premium waste removal service to match Tiburon's standards. We handle the challenging terrain so you can focus on your project. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Tiburon, CA | Peninsula Delivery - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Tiburon, CA. Serving Belvedere Island, Paradise Cay, Ring Mountain & all neighborhoods. Peninsula delivery experts. Call (510) 650-2083",
  keywords: [
    "dumpster rental Tiburon CA",
    "Tiburon dumpster rental",
    "roll-off dumpster Tiburon",
    "construction dumpster Tiburon",
    "Tiburon waste removal",
    "dumpster rental 94920",
    "dumpster rental Marin County",
    "Belvedere Island dumpster rental",
    "Paradise Cay dumpster",
    "Tiburon peninsula dumpster delivery",
    "luxury home dumpster Tiburon",
    "Ring Mountain dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Tiburon, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Tiburon. 10, 20 & 30 yard dumpsters. Peninsula delivery experts.",
    url: "https://tpdumpsters.com/tiburon",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/tiburon",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Tiburon",
  description:
    "Fast, reliable dumpster rentals in Tiburon, CA. Peninsula delivery experts serving all Tiburon neighborhoods and Belvedere Island.",
  url: "https://tpdumpsters.com/tiburon",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tiburon",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Tiburon",
      "@id": "https://en.wikipedia.org/wiki/Tiburon,_California",
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

export default function TiburonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <TiburonHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...tiburonAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Tiburon" faqs={tiburonFaqs} />
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
            Why Rent a Dumpster in Tiburon, California?
          </h2>
          <div className="text-[#555] text-base leading-[1.8] font-[var(--font-poppins)] space-y-4">
            <p>
              Tiburon&apos;s peninsula location in Marin County offers breathtaking views and some of
              the Bay Area&apos;s most prestigious properties. Homeowners on Belvedere Island, in
              Paradise Cay, and along Tiburon&apos;s ridgeline consistently invest in renovations that
              demand efficient waste removal. From complete estate overhauls to targeted kitchen
              remodels, having a reliable dumpster on-site is essential for keeping high-end
              projects on schedule.
            </p>
            <p>
              The peninsula&apos;s steep terrain, winding access roads, and limited turnaround space
              require a dumpster company that knows the area intimately. TP Dumpsters delivers
              10, 20, and 30-yard roll-off containers to every neighborhood in Tiburon and
              Belvedere with same-day availability. We take extra care with placement to protect
              premium driveways and landscaping. With transparent flat-rate pricing and bilingual
              support in English and Spanish, we deliver the professional service that Tiburon
              homeowners and contractors expect. Call (510) 650-2083 for your free quote.
            </p>
          </div>
        </div>
      </section>

      <TiburonLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
