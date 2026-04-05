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
import BrentwoodHero from "./components/BrentwoodHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import BrentwoodLocation from "./components/BrentwoodLocation";

const brentwoodFaqs = [
  {
    question: "How quickly can I get a dumpster delivered in Brentwood?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout Brentwood and East
        Contra Costa County. Whether you&apos;re in Downtown Brentwood, Deer Ridge, or the new
        Summerset community, we can typically have a dumpster on-site within hours when you call
        before noon.
      </p>
    ),
  },
  {
    question: "What dumpster size is best for new home construction in Brentwood?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        With Brentwood&apos;s massive housing boom — especially in Deer Ridge, Summerset, and
        Shadow Lakes — a <strong>30-yard dumpster</strong> is ideal for new construction projects.
        It handles framing scraps, drywall, packaging, and general construction debris. For
        remodels and renovations, a 20-yard typically works perfectly.
      </p>
    ),
  },
  {
    question: "Do I need a permit to place a dumpster in Brentwood?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If you place the dumpster on your own driveway or private property, no permit is typically
        required in Brentwood. For street placement, you may need a temporary encroachment permit
        from the City of Brentwood. Most Brentwood properties have spacious driveways and large
        lots, making on-property placement easy.
      </p>
    ),
  },
  {
    question: "Do you serve Oakley, Antioch, and Discovery Bay?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! We serve all of East County including <strong>Oakley, Antioch, Discovery Bay,</strong>
        and <strong>Byron</strong>. One call covers dumpster delivery anywhere in East Contra Costa
        — no extra travel charges for these communities.
      </p>
    ),
  },
  {
    question: "What can I put in a dumpster rental in Brentwood?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">We accept most common debris types for Brentwood projects:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Construction and demolition waste (lumber, drywall, tile, siding)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Household junk, old furniture, and appliances</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Concrete, dirt, and soil (10-yard only, weight limits apply)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Yard waste, tree trimmings, and agricultural debris</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing materials and shingles</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          <strong>Not accepted:</strong> Hazardous waste, paint, chemicals, batteries, electronics, or flammable materials.
        </p>
      </>
    ),
  },
  {
    question: "How much does a dumpster rental cost in Brentwood?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Brentwood dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster
        (7-day rental, 1 ton included). The 20-yard starts at $649 and the 30-yard at $749.
        Transparent pricing with no hidden fees. Call <strong>(510) 650-2083</strong> for an
        exact quote for your Brentwood project.
      </p>
    ),
  },
];

const brentwoodAbout = {
  cityName: "Brentwood",
  intro:
    "Brentwood is East County's boom town — a rapidly growing family community where agricultural land is transforming into modern subdivisions like Deer Ridge, Summerset, and Shadow Lakes. With large lots, new construction on nearly every street, and a constant stream of home improvement projects, Brentwood homeowners and contractors rely on fast, dependable dumpster service to keep projects moving.",
  highlights: [
    "Fast delivery to all Brentwood neighborhoods and East County communities",
    "Large dumpster inventory perfect for new construction and big lot projects",
    "Experienced with Brentwood's housing boom and large-scale developments",
    "Trusted by Brentwood builders, remodelers, and new homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "New construction cleanup in Deer Ridge, Summerset, and Shadow Lakes",
    "Whole-home remodels and additions in Downtown Brentwood and Vineyards",
    "Landscaping overhauls and yard debris removal on large lots",
    "Agricultural land conversion and property cleanups",
    "Roofing tear-offs and exterior upgrades in Sunset Estates and Heritage",
    "Garage cleanouts and move-in prep for new Brentwood families",
  ],
  closingText:
    "Whether you're building a new home in Deer Ridge or renovating in Downtown Brentwood, TP Dumpsters makes waste removal simple and affordable. Same-day delivery, transparent pricing, and a team that understands East County's growth. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Brentwood, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Brentwood, CA. 10, 20 & 30 yard roll-off dumpsters for construction, remodels & cleanouts. Same-day delivery to Brentwood & East County. Call (510) 650-2083",
  keywords: [
    "dumpster rental Brentwood CA",
    "Brentwood dumpster rental",
    "roll-off dumpster Brentwood",
    "construction dumpster Brentwood",
    "Brentwood waste removal",
    "dumpster rental 94513",
    "Deer Ridge dumpster rental",
    "Summerset dumpster rental",
    "Oakley dumpster rental",
    "Antioch dumpster rental",
    "Discovery Bay dumpster rental",
    "East County dumpster rental",
    "cheap dumpster Brentwood CA",
    "junk removal Brentwood",
  ],
  openGraph: {
    title: "Dumpster Rental in Brentwood, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Brentwood. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/brentwood",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/brentwood" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Brentwood",
  description:
    "Affordable, reliable dumpster rentals in Brentwood, CA. Same-day delivery to all Brentwood neighborhoods and East Contra Costa County.",
  url: "https://tpdumpsters.com/brentwood",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Brentwood",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Brentwood" },
    { "@type": "City", name: "Oakley" },
    { "@type": "City", name: "Antioch" },
    { "@type": "City", name: "Discovery Bay" },
    { "@type": "City", name: "Byron" },
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

export default function BrentwoodPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <BrentwoodHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...brentwoodAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Brentwood" faqs={brentwoodFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <BrentwoodLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
