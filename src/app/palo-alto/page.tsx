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
import PaloAltoHero from "./components/PaloAltoHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import PaloAltoLocation from "./components/PaloAltoLocation";

const paloAltoFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Palo Alto?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes. If the dumpster is placed on a public street in Palo Alto, you&apos;ll need a temporary
        encroachment permit from the City of Palo Alto. If it&apos;s on your private driveway, no permit
        is usually needed. Palo Alto has specific regulations for historic neighborhoods like Professorville — we can help guide you.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Palo Alto?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        In most Palo Alto neighborhoods, we offer <strong>same-day delivery</strong> if you call before noon.
        Areas like Downtown Palo Alto, University South, and Midtown are within our fastest delivery zone.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a Stanford-area renovation?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For Stanford-area renovations and research facility cleanouts, a <strong>30-yard dumpster</strong> is
        recommended for large projects. For historic home remodels in Professorville or Old Palo Alto,
        a 20-yard is usually sufficient. For concrete, soil, or heavy materials, the 10-yard is ideal.
      </p>
    ),
  },
  {
    question: "Can you handle luxury property debris and historic home remodels?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! We regularly serve luxury properties and historic home renovation projects throughout
        Palo Alto. Whether it&apos;s a Professorville Craftsman restoration, a Crescent Park estate remodel,
        or an Old Palo Alto renovation, we provide careful, professional dumpster placement that respects
        your property and neighborhood.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Palo Alto?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Palo Alto customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Stanford-area renovations and research facility cleanouts</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Historic home remodels in Professorville & Old Palo Alto</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Luxury property debris and estate cleanouts</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Tech startup office renovations and build-outs</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and yard debris removal</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Palo Alto ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every Palo Alto ZIP code including 94301, 94303, 94304, and 94306. No matter where you
        are in Palo Alto, we can deliver.
      </p>
    ),
  },
];

const paloAltoAbout = {
  cityName: "Palo Alto",
  intro:
    "Palo Alto is one of Silicon Valley's most prestigious cities, home to Stanford University and a hub for innovation, technology, and world-class education. With its mix of historic homes in Professorville, luxury estates in Crescent Park, and active tech startup offices downtown, there's constant renovation and construction activity. TP Dumpsters serves all Palo Alto neighborhoods and understands the high standards and unique requirements of this exceptional community.",
  highlights: [
    "Experienced with luxury property and historic home dumpster delivery",
    "Familiar with Palo Alto city permit requirements and historic district rules",
    "Fast delivery to all Palo Alto neighborhoods — Downtown to Barron Park",
    "Trusted by Palo Alto contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Stanford-area renovations and research facility cleanouts",
    "Historic home remodels in Professorville & Old Palo Alto",
    "Luxury estate renovations in Crescent Park & Green Acres",
    "Tech startup office build-outs and renovations downtown",
    "Landscaping and yard debris removal in Barron Park & College Terrace",
    "Kitchen and bathroom remodels in Midtown & University South",
  ],
  closingText:
    "Whether you're a homeowner tackling a weekend cleanup or a contractor running a major renovation, TP Dumpsters makes waste removal in Palo Alto easy. We offer transparent pricing, same-day delivery, and the local expertise to get your dumpster exactly where you need it. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Palo Alto, CA | Stanford Area - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Palo Alto, CA. Serving Downtown, University South, Old Palo Alto, Professorville & all ZIP codes. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Palo Alto CA",
    "Palo Alto dumpster rental",
    "roll-off dumpster Palo Alto",
    "construction dumpster Palo Alto",
    "Palo Alto waste removal",
    "dumpster rental 94301",
    "dumpster rental 94303",
    "dumpster rental 94304",
    "dumpster rental Downtown Palo Alto",
    "Stanford area dumpster rental",
    "Professorville dumpster",
    "Old Palo Alto dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Palo Alto, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Palo Alto. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/palo-alto",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/palo-alto",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Palo Alto",
  description:
    "Fast, reliable dumpster rentals in Palo Alto, CA. Serving all Palo Alto neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/palo-alto",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Palo Alto",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Palo Alto",
      "@id": "https://en.wikipedia.org/wiki/Palo_Alto,_California",
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

export default function PaloAltoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <PaloAltoHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...paloAltoAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Palo Alto" faqs={paloAltoFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <PaloAltoLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
