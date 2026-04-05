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
import SantaClaraHero from "./components/SantaClaraHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import SantaClaraLocation from "./components/SantaClaraLocation";

const santaClaraFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Santa Clara?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes. If the dumpster is placed on a public street in Santa Clara, you&apos;ll need a temporary
        encroachment permit from the City of Santa Clara. If it&apos;s on your private driveway, no permit
        is usually needed. We can help guide you through the process.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Santa Clara?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        In most Santa Clara neighborhoods, we offer <strong>same-day delivery</strong> if you call before noon.
        Areas like Downtown Santa Clara, Old Quad, and Rivermark are within our fastest delivery zone.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a construction project near Levi&apos;s Stadium?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For large construction and commercial projects near the Levi&apos;s Stadium area, a <strong>30-yard dumpster</strong> is
        recommended. For tech company office build-outs or university renovation projects, a 20-yard is usually sufficient.
        For heavy materials like concrete or soil, the 10-yard is ideal.
      </p>
    ),
  },
  {
    question: "Do you serve tech companies and commercial properties in Santa Clara?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! We regularly serve tech companies, commercial properties, and construction sites throughout
        Santa Clara. From office teardowns along the El Camino corridor to new construction in North Santa Clara,
        we provide reliable dumpster service for businesses of all sizes.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Santa Clara?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Santa Clara customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Stadium area event cleanup and construction</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Tech company office renovations and build-outs</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">University campus renovation projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Residential neighborhood remodels and cleanouts</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Commercial debris removal and demolition</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Santa Clara ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every Santa Clara ZIP code including 95050, 95051, 95054, and 95056. No matter where you
        are in Santa Clara, we can deliver.
      </p>
    ),
  },
];

const santaClaraAbout = {
  cityName: "Santa Clara",
  intro:
    "Santa Clara, known as the \"Mission City,\" is home to Levi's Stadium, Santa Clara University, and some of the biggest tech companies in Silicon Valley. With constant commercial development, tech campus construction, and residential renovation projects, there's always demand for reliable waste removal. TP Dumpsters serves all Santa Clara neighborhoods and understands the unique needs of this dynamic city — from large-scale stadium area projects to residential remodels in the Old Quad.",
  highlights: [
    "Experienced with commercial and tech campus dumpster delivery",
    "Familiar with Santa Clara city permit requirements for street placement",
    "Fast delivery to all Santa Clara neighborhoods — Downtown to North Santa Clara",
    "Trusted by Santa Clara contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Tech company office renovations along El Camino corridor",
    "Stadium area construction and event cleanup near Levi's Stadium",
    "University campus renovation projects at Santa Clara University",
    "Kitchen and bathroom remodels in Old Quad & Rivermark",
    "Commercial debris removal in North Santa Clara business parks",
    "Residential cleanouts and landscaping across Santa Clara neighborhoods",
  ],
  closingText:
    "Whether you're a homeowner tackling a weekend cleanup or a contractor running a major renovation, TP Dumpsters makes waste removal in Santa Clara easy. We offer transparent pricing, same-day delivery, and the local expertise to get your dumpster exactly where you need it. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Santa Clara, CA | Mission City - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Santa Clara, CA. Serving Downtown, Old Quad, Rivermark, Mission District & all ZIP codes. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Santa Clara CA",
    "Santa Clara dumpster rental",
    "roll-off dumpster Santa Clara",
    "construction dumpster Santa Clara",
    "Santa Clara waste removal",
    "dumpster rental 95050",
    "dumpster rental 95051",
    "dumpster rental Downtown Santa Clara",
    "Mission City dumpster rental",
    "Levi Stadium dumpster",
    "El Camino corridor dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Santa Clara, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Santa Clara. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/santa-clara",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/santa-clara",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Santa Clara",
  description:
    "Fast, reliable dumpster rentals in Santa Clara, CA. Serving all Santa Clara neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/santa-clara",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santa Clara",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Santa Clara",
      "@id": "https://en.wikipedia.org/wiki/Santa_Clara,_California",
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

export default function SantaClaraPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <SantaClaraHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...santaClaraAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Santa Clara" faqs={santaClaraFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <SantaClaraLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
