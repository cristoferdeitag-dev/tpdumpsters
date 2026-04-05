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
import PleasantHillHero from "./components/PleasantHillHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import PleasantHillLocation from "./components/PleasantHillLocation";

const pleasantHillFaqs = [
  {
    question: "How fast can I get a dumpster delivered in Pleasant Hill?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout Pleasant Hill and Central Contra Costa County. Whether you&apos;re in Gregory Gardens, Poets Corner, or near the Contra Costa Centre, we can typically have a dumpster on-site within hours when you call before noon.
      </p>
    ),
  },
  {
    question: "What dumpster size is best for a kitchen or bathroom remodel in Pleasant Hill?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For kitchen and bathroom remodels — which are extremely popular in Pleasant Hill&apos;s established neighborhoods — a <strong>20-yard dumpster</strong> is the most popular choice. It handles cabinets, countertops, flooring, drywall, and fixtures with room to spare. For whole-home renovations, go with the 30-yard.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Pleasant Hill?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If you place the dumpster on your own driveway or private property, no permit is typically required in Pleasant Hill. For street placement, you may need a temporary encroachment permit from the City of Pleasant Hill. Most of our Pleasant Hill customers place dumpsters on their driveways or in side yards.
      </p>
    ),
  },
  {
    question: "Do you serve Walnut Creek, Concord, and Lafayette too?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! We serve all of Central Contra Costa County including <strong>Walnut Creek, Concord, Martinez, Lafayette,</strong> and surrounding communities. One call covers dumpster delivery anywhere in Central CCC — no extra travel charges.
      </p>
    ),
  },
  {
    question: "What materials can I put in a dumpster in Pleasant Hill?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">We accept most common debris types for Pleasant Hill projects:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Construction and demolition waste (lumber, drywall, siding)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">General household junk and old furniture</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Concrete, dirt, and soil (10-yard only, weight limits apply)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Yard waste, tree trimmings, and landscaping debris</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing materials and shingles</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          <strong>Not accepted:</strong> Hazardous waste, paint, chemicals, batteries, electronics, or flammable materials.
        </p>
      </>
    ),
  },
  {
    question: "How much does a dumpster rental cost in Pleasant Hill?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Pleasant Hill dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster (7-day rental, 1 ton included). The 20-yard starts at $649 and the 30-yard at $749. No hidden fees, no surprise charges. Call <strong>(510) 650-2083</strong> for an exact quote for your Pleasant Hill project.
      </p>
    ),
  },
];

const pleasantHillAbout = {
  cityName: "Pleasant Hill",
  intro:
    "Pleasant Hill is a family-friendly community in the heart of Central Contra Costa County, known for its excellent schools, BART accessibility, and a thriving home remodeling culture. With established neighborhoods like Gregory Gardens and Poets Corner constantly undergoing kitchen upgrades, bathroom renovations, and backyard transformations, Pleasant Hill is one of the most active remodeling markets in the East Bay.",
  highlights: [
    "Fast delivery to all Pleasant Hill neighborhoods and Central Contra Costa",
    "Perfect dumpster sizes for suburban home remodels and renovations",
    "Experienced with Pleasant Hill's active remodeling and renovation market",
    "Trusted by Pleasant Hill contractors, remodelers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Kitchen and bathroom remodels in Gregory Gardens & Poets Corner",
    "Whole-home renovations in Grayson Creek & Diablo Valley areas",
    "Garage and estate cleanouts across Downtown Pleasant Hill",
    "Roofing tear-offs and siding replacement on mid-century homes",
    "Backyard landscaping overhauls and hardscape demolition",
    "ADU construction and addition projects for growing families",
  ],
  closingText:
    "Whether you're remodeling a kitchen in Gregory Gardens or building an ADU in Poets Corner, TP Dumpsters makes waste removal simple and affordable. Same-day delivery, transparent pricing, and a team that knows Central Contra Costa. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Pleasant Hill, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Pleasant Hill, CA. 10, 20 & 30 yard roll-off dumpsters for construction, remodels & cleanouts. Same-day delivery to Pleasant Hill & Central Contra Costa. Call (510) 650-2083",
  keywords: [
    "dumpster rental Pleasant Hill CA",
    "Pleasant Hill dumpster rental",
    "roll-off dumpster Pleasant Hill",
    "construction dumpster Pleasant Hill",
    "Pleasant Hill waste removal",
    "dumpster rental 94523",
    "Gregory Gardens dumpster rental",
    "Poets Corner dumpster rental",
    "Walnut Creek dumpster rental",
    "Concord dumpster rental",
    "Lafayette dumpster rental",
    "Central Contra Costa dumpster",
    "cheap dumpster Pleasant Hill CA",
    "junk removal Pleasant Hill",
  ],
  openGraph: {
    title: "Dumpster Rental in Pleasant Hill, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Pleasant Hill. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/pleasant-hill",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental in Pleasant Hill, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Pleasant Hill. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/pleasant-hill" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Pleasant Hill",
  description:
    "Affordable, reliable dumpster rentals in Pleasant Hill, CA. Same-day delivery to all Pleasant Hill neighborhoods and Central Contra Costa County.",
  url: "https://tpdumpsters.com/pleasant-hill",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pleasant Hill",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Pleasant Hill" },
    { "@type": "City", name: "Walnut Creek" },
    { "@type": "City", name: "Concord" },
    { "@type": "City", name: "Martinez" },
    { "@type": "City", name: "Lafayette" },
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

export default function PleasantHillPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <PleasantHillHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...pleasantHillAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Pleasant Hill" faqs={pleasantHillFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <PleasantHillLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
