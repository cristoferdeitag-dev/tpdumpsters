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
import BerkeleyHero from "./components/BerkeleyHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import BerkeleyLocation from "./components/BerkeleyLocation";

const berkeleyFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Berkeley?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes. Berkeley has specific green regulations and permit requirements for placing dumpsters
        on public streets. You&apos;ll need a temporary encroachment permit from the City of Berkeley.
        If it&apos;s on your private driveway or property, no permit is usually needed. We can help
        guide you through Berkeley&apos;s permitting process.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Berkeley?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        In most Berkeley neighborhoods, we offer <strong>same-day delivery</strong> if you call before noon.
        Areas like Downtown Berkeley, North Berkeley, and the UC Berkeley area are within our fastest delivery zone.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home project in Berkeley?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a typical kitchen or bathroom remodel in Berkeley, a <strong>20-yard dumpster</strong> is usually
        the best fit. For whole-home renovations or historic home preservation projects, go with the 30-yard.
        For small cleanouts, yard debris, or concrete/soil removal, the 10-yard works great.
      </p>
    ),
  },
  {
    question: "Can you deliver to Berkeley Hills and narrow streets?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We&apos;re experienced with Berkeley&apos;s challenging terrain — from narrow winding roads
        in the Berkeley Hills to tight residential streets near UC Berkeley. Our drivers know how to
        navigate steep grades and limited access areas. Just let us know your address and we&apos;ll
        confirm access.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Berkeley?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Berkeley customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Historic home renovations and preservation projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Kitchen and bathroom remodels in older craftsman homes</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">UC Berkeley area commercial and residential projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts and garage cleanups</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and eco-friendly yard debris removal</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Berkeley ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every Berkeley ZIP code including 94702, 94703, 94704, 94705, 94706, 94707,
        94708, 94709, 94710, and 94720. No matter where you are in Berkeley, we can deliver.
      </p>
    ),
  },
];

const berkeleyAbout = {
  cityName: "Berkeley",
  intro:
    "Berkeley is a vibrant college town known for its eco-conscious community, historic homes, and the iconic UC Berkeley campus. From craftsman home renovations in Elmwood to commercial projects near the Gourmet Ghetto and hillside remodels in the Berkeley Hills, there&apos;s always a project that needs a reliable dumpster. TP Dumpsters serves Berkeley neighborhoods and understands the unique challenges of working in this city — from narrow hillside streets to strict recycling and green waste regulations.",
  highlights: [
    "We navigate Berkeley's narrow hillside streets and tight residential areas with ease",
    "Familiar with Berkeley's green regulations and recycling requirements",
    "Fast delivery to all Berkeley neighborhoods — Downtown to the Hills",
    "Trusted by Berkeley contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Historic home renovations and preservation projects in Elmwood & Claremont",
    "Kitchen and bathroom remodels in North Berkeley & the Gourmet Ghetto",
    "UC Berkeley area commercial and residential construction projects",
    "Estate cleanouts in South Berkeley & Thousand Oaks",
    "Landscaping and yard debris removal in Berkeley Hills",
    "Roofing projects across Berkeley's older housing stock",
  ],
  closingText:
    "Whether you're a homeowner tackling a weekend cleanup or a contractor running a major renovation, TP Dumpsters makes waste removal in Berkeley easy. We offer transparent pricing, same-day delivery, and the local expertise to get your dumpster exactly where you need it. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Berkeley, CA | East Bay Service - TP Dumpsters",
  description:
    "Dumpster rental Berkeley CA — fast, reliable roll-off dumpster rental in Berkeley and the East Bay. Serving Downtown, North Berkeley, UC Berkeley Area, Berkeley Hills & all ZIP codes. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental berkeley ca",
    "dumpster rental east bay",
    "roll off dumpster rental berkeley ca",
    "Berkeley dumpster rental",
    "roll-off dumpster Berkeley",
    "construction dumpster Berkeley",
    "Berkeley waste removal",
    "East Bay dumpster rental",
    "dumpster rental 94702",
    "dumpster rental 94704",
    "dumpster rental Downtown Berkeley",
    "North Berkeley dumpster",
    "UC Berkeley dumpster rental",
    "Berkeley Hills dumpster",
    "Elmwood dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Berkeley, CA | East Bay Service - TP Dumpsters",
    description:
      "Dumpster rental Berkeley CA — 10, 20 & 30 yard roll-off dumpster rentals. East Bay dumpster rental with same-day delivery.",
    url: "https://tpdumpsters.com/berkeley",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/logo/TP.png",
        width: 800,
        height: 600,
        alt: "Dumpster rental in Berkeley CA - TP Dumpsters roll-off containers for East Bay projects",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/berkeley",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Berkeley",
  description:
    "Dumpster rental Berkeley, CA. Roll-off dumpster rental serving all Berkeley and East Bay neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/berkeley",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: {
    "@type": "ImageObject",
    url: "/images/logo/TP.png",
    caption: "Dumpster rental in Berkeley CA - TP Dumpsters roll-off containers for East Bay projects",
  },
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Berkeley",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Berkeley",
      "@id": "https://en.wikipedia.org/wiki/Berkeley,_California",
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

export default function BerkeleyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <BerkeleyHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...berkeleyAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Berkeley" faqs={berkeleyFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <BerkeleyLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
