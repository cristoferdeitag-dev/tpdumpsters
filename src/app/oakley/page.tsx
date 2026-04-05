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
import OakleyHero from "./components/OakleyHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import OakleyLocation from "./components/OakleyLocation";

const oakleyFaqs = [
  {
    question: "How fast can I get a dumpster delivered in Oakley?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout Oakley and East
        Contra Costa County. Whether you&apos;re in Emerson Ranch, Cypress Grove, or near
        the Delta waterfront, we can typically have a dumpster on-site within hours when you
        call before noon.
      </p>
    ),
  },
  {
    question: "What dumpster size works best for new home construction in Oakley?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Oakley&apos;s master-planned communities like Summer Lakes and Belmont Landing generate
        significant construction debris. A <strong>30-yard dumpster</strong> is ideal for new
        builds, handling framing scraps, drywall, packaging, and general construction waste. For
        smaller remodels or garage cleanouts, a 20-yard works great.
      </p>
    ),
  },
  {
    question: "Do I need a permit to place a dumpster in Oakley?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on your private property or driveway, no permit is typically
        required in Oakley. For street placement, you may need a temporary encroachment permit
        from the City of Oakley. Most Oakley homes have spacious driveways, so street placement
        is rarely necessary.
      </p>
    ),
  },
  {
    question: "Can I rent a dumpster for agricultural cleanup in Oakley?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! Oakley&apos;s agricultural roots mean many properties need barn cleanouts,
        fencing removal, and land clearing. Our <strong>10-yard dumpster</strong> handles smaller
        farm debris, while the 20-yard and 30-yard are perfect for larger agricultural property
        cleanups and outbuilding demolition.
      </p>
    ),
  },
  {
    question: "Do you serve Bethel Island, Knightsen, and Discovery Bay?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We cover the entire East County area including <strong>Bethel Island, Knightsen,
        Discovery Bay, Brentwood,</strong> and Antioch. One call covers dumpster delivery
        anywhere in the Delta region — no extra travel charges for these communities.
      </p>
    ),
  },
  {
    question: "How much does a dumpster rental cost in Oakley?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Oakley dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster
        (7-day rental, 1 ton included). The 20-yard starts at $649 and the 30-yard at $749.
        No hidden fees, no surprise charges. Call <strong>(510) 650-2083</strong> for an exact
        quote for your Oakley project.
      </p>
    ),
  },
];

const oakleyAbout = {
  cityName: "Oakley",
  intro:
    "Oakley is one of the fastest-growing cities in East Contra Costa County, with new master-planned communities, agricultural heritage, and stunning Delta waterfront access. From the family-friendly neighborhoods of Emerson Ranch and Summer Lakes to the rural charm of Dutch Slough, Oakley homeowners and contractors need reliable dumpster service for construction, remodels, and property cleanups.",
  highlights: [
    "Fast delivery to all Oakley neighborhoods and Delta communities",
    "Large dumpster inventory ideal for new construction and agricultural cleanups",
    "Experienced with Oakley's building boom and master-planned communities",
    "Trusted by Oakley builders, remodelers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "New construction cleanup in Emerson Ranch, Summer Lakes & Belmont Landing",
    "Home remodels and additions in Cypress Grove & Downtown Oakley",
    "Agricultural property cleanouts and barn demolition",
    "Roofing tear-offs and siding replacement on established homes",
    "Landscaping overhauls and yard debris removal near Dutch Slough",
    "Concrete driveway and patio demolition for property upgrades",
  ],
  closingText:
    "Whether you're building a new home in Summer Lakes or cleaning out a property near the Delta, TP Dumpsters makes waste removal simple and affordable. Same-day delivery, transparent pricing, and a team that understands East County. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Oakley, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Oakley, CA. 10, 20 & 30 yard roll-off dumpsters for construction, remodels & cleanouts. Same-day delivery to Oakley & East Contra Costa. Call (510) 650-2083",
  keywords: [
    "dumpster rental Oakley CA",
    "Oakley dumpster rental",
    "roll-off dumpster Oakley",
    "construction dumpster Oakley",
    "Oakley waste removal",
    "dumpster rental 94561",
    "Emerson Ranch dumpster rental",
    "Summer Lakes dumpster rental",
    "Bethel Island dumpster rental",
    "Knightsen dumpster rental",
    "Discovery Bay dumpster rental",
    "East Contra Costa dumpster",
    "cheap dumpster Oakley CA",
    "junk removal Oakley",
  ],
  openGraph: {
    title: "Dumpster Rental in Oakley, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Oakley. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/oakley",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental in Oakley, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Oakley. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/oakley" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Oakley",
  description:
    "Affordable, reliable dumpster rentals in Oakley, CA. Same-day delivery to all Oakley neighborhoods and East Contra Costa County.",
  url: "https://tpdumpsters.com/oakley",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Oakley",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Oakley" },
    { "@type": "City", name: "Brentwood" },
    { "@type": "City", name: "Antioch" },
    { "@type": "City", name: "Discovery Bay" },
    { "@type": "City", name: "Bethel Island" },
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
        itemOffered: { "@type": "Service", name: "10 Yard Dumpster Rental", description: "Compact dumpster for tight spaces, soil, concrete, and small cleanups. 7-day rental, 1 ton included." },
        price: "599",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "20 Yard Dumpster Rental", description: "Versatile mid-size dumpster for remodels, roofing, and medium cleanouts. 7-day rental, 2 tons included." },
        price: "649",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "30 Yard Dumpster Rental", description: "Large dumpster for full renovations, construction debris, and estate cleanouts. 7-day rental, 3 tons included." },
        price: "749",
        priceCurrency: "USD",
      },
    ],
  },
};

export default function OakleyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <OakleyHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...oakleyAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Oakley" faqs={oakleyFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <OakleyLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
