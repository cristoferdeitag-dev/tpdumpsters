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
import EmeryvilleHero from "./components/EmeryvilleHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import EmeryvilleLocation from "./components/EmeryvilleLocation";

const emeryvilleFaqs = [
  {
    question: "Can you deliver a dumpster to a commercial or mixed-use site in Emeryville?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! Emeryville is known for its <strong>commercial and mixed-use developments</strong>, and we regularly deliver to construction sites, retail locations, and multi-use buildings. Our drivers are experienced with Emeryville&apos;s compact urban layout and loading zones.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Emeryville?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Emeryville is one of our fastest delivery zones due to its compact size and central location. We offer <strong>same-day delivery</strong> when you call before noon. Downtown Emeryville, Emery Bay, and the Powell Street corridor are all within minutes of our routes.
      </p>
    ),
  },
  {
    question: "What size dumpster works best for a loft renovation in Emeryville?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a typical loft or condo renovation in Emeryville, a <strong>20-yard dumpster</strong> handles most projects well. For larger gut renovations or multi-unit work, go with the 30-yard. For small cleanouts or debris from a single room, the compact 10-yard fits tight spaces perfectly.
      </p>
    ),
  },
  {
    question: "Can you access small lots and tight spaces in Emeryville?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Emeryville is known for its <strong>compact lots and dense development</strong>. Our drivers are experienced with small access points, narrow driveways, and shared parking areas. Just let us know your address and we&apos;ll confirm the best placement option.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Emeryville?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Emeryville customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Loft and condo renovations</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Tech office cleanouts and tenant improvements</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Commercial construction and demolition</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Mixed-use building projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Retail space buildouts and remodels</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve areas near Emeryville like Oakland and Berkeley?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Emeryville sits right between <strong>Oakland</strong> and <strong>Berkeley</strong>, and we serve all three cities daily. Whether your project spans multiple cities or you need deliveries to neighboring areas, one call to TP Dumpsters covers it all.
      </p>
    ),
  },
];

const emeryvilleAbout = {
  cityName: "Emeryville",
  intro:
    "Emeryville is a dynamic, compact city nestled between Oakland and Berkeley, known for its innovative mix of tech companies, artist lofts, and modern mixed-use developments. Despite its small size, Emeryville sees constant construction, renovation, and commercial buildout activity. From loft conversions along the Powell Street corridor to office cleanouts in the Emery Bay area, TP Dumpsters delivers fast, reliable waste removal tailored to Emeryville&apos;s unique urban landscape.",
  highlights: [
    "Expert navigation of Emeryville's compact lots and tight spaces",
    "Experienced with commercial and mixed-use project delivery",
    "Quick delivery — Emeryville is one of our fastest service zones",
    "Trusted by Emeryville contractors, property managers, and businesses",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Loft and condo renovations in Downtown Emeryville",
    "Tech office cleanouts and tenant improvements along Powell Street",
    "Commercial construction and demolition projects",
    "Retail space buildouts in the Emery Bay area",
    "Mixed-use development support in the Triangle neighborhood",
    "Residential cleanouts and small remodels on Doyle Street",
  ],
  closingText:
    "Whether you&apos;re a business renovating office space or a homeowner updating a loft, TP Dumpsters makes waste removal in Emeryville effortless. We offer transparent pricing, same-day delivery, and the expertise to work within Emeryville&apos;s compact urban footprint. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Emeryville, CA | Quick Delivery - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Emeryville, CA. Serving Downtown Emeryville, Emery Bay, Triangle Neighborhood & all areas. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Emeryville CA",
    "Emeryville dumpster rental",
    "roll-off dumpster Emeryville",
    "construction dumpster Emeryville",
    "Emeryville waste removal",
    "dumpster rental 94608",
    "dumpster rental 94662",
    "commercial dumpster Emeryville",
    "Emeryville construction cleanup",
    "loft renovation dumpster Emeryville",
    "Powell Street dumpster rental",
    "Emery Bay dumpster",
  ],
  openGraph: {
    title: "Dumpster Rental in Emeryville, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Emeryville. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/emeryville",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/emeryville",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Emeryville",
  description:
    "Fast, reliable dumpster rentals in Emeryville, CA. Quick delivery to all Emeryville neighborhoods.",
  url: "https://tpdumpsters.com/emeryville",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Emeryville",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Emeryville",
      "@id": "https://en.wikipedia.org/wiki/Emeryville,_California",
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

export default function EmeryvillePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <EmeryvilleHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...emeryvilleAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Emeryville" faqs={emeryvilleFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <EmeryvilleLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
