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
import OrindaHero from "./components/OrindaHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import OrindaLocation from "./components/OrindaLocation";

const orindaFaqs = [
  {
    question: "How quickly can I get a dumpster delivered in Orinda?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout Orinda and the
        Lamorinda area. Whether you&apos;re in Sleepy Hollow, Orinda Village, or near the
        Orinda Country Club, we can typically have a dumpster on-site within hours when you
        call before noon.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for a hillside estate renovation in Orinda?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Orinda&apos;s large hillside estates often generate significant renovation debris. A
        <strong> 30-yard dumpster</strong> is ideal for whole-home remodels, kitchen and bath
        overhauls, and major landscaping projects. For smaller upgrades like a single room
        remodel or deck replacement, a 20-yard is usually sufficient.
      </p>
    ),
  },
  {
    question: "Can you navigate Orinda's narrow canyon roads for delivery?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Our drivers are experienced with Orinda&apos;s scenic but narrow canyon roads,
        winding hillside streets, and steep driveways. We carefully assess access before delivery
        and can recommend the best dumpster placement for properties with challenging terrain.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Orinda?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on your private property or driveway, no permit is typically
        required in Orinda. Street placement in the Lamorinda area may require a permit from
        Contra Costa County. Most Orinda homes have spacious driveways that easily accommodate
        a roll-off dumpster.
      </p>
    ),
  },
  {
    question: "Do you also serve Lafayette, Moraga, and Walnut Creek?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! We serve the entire Lamorinda corridor including <strong>Lafayette, Moraga,
        Walnut Creek,</strong> and Berkeley Hills. One call covers dumpster delivery anywhere
        in the Lamorinda area — no extra travel charges for these communities.
      </p>
    ),
  },
  {
    question: "How much does a dumpster rental cost in Orinda?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Orinda dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster
        (7-day rental, 1 ton included). The 20-yard starts at $649 and the 30-yard at $749.
        No hidden fees, no surprise charges. Call <strong>(510) 650-2083</strong> for an exact
        quote for your Orinda project.
      </p>
    ),
  },
];

const orindaAbout = {
  cityName: "Orinda",
  intro:
    "Orinda is an exclusive Lamorinda community known for its large hillside estates, top-rated schools, scenic canyon roads, and upscale residential character. Homeowners in Orinda regularly invest in high-end renovations, landscaping overhauls, and property improvements that demand reliable, professional dumpster service.",
  highlights: [
    "Experienced with large estate renovations and upscale remodels",
    "Drivers skilled in navigating Orinda's canyon roads and steep driveways",
    "Full Lamorinda coverage — Orinda, Lafayette, and Moraga",
    "Clean, well-maintained dumpsters appropriate for upscale neighborhoods",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Whole-home renovations and kitchen/bath remodels in Sleepy Hollow & Glorietta",
    "Hillside landscaping overhauls and tree removal in Orindawoods",
    "Estate cleanouts and downsizing projects in Orinda Country Club",
    "Pool demolition and backyard renovation debris removal",
    "Roofing replacement and exterior upgrades on large homes",
    "Garage and basement cleanouts in Orinda Village & Downtown",
  ],
  closingText:
    "Whether you're renovating a hillside estate in Sleepy Hollow or updating a home near Orinda Village, TP Dumpsters provides premium dumpster service for Orinda's discerning homeowners. Same-day delivery, transparent pricing, and careful handling on canyon roads. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Orinda, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Premium dumpster rentals in Orinda, CA. 10, 20 & 30 yard roll-off dumpsters for renovations, remodels & estate cleanouts. Same-day delivery to Orinda & Lamorinda. Call (510) 650-2083",
  keywords: [
    "dumpster rental Orinda CA",
    "Orinda dumpster rental",
    "roll-off dumpster Orinda",
    "construction dumpster Orinda",
    "Orinda waste removal",
    "dumpster rental 94563",
    "Sleepy Hollow dumpster rental",
    "Lamorinda dumpster rental",
    "Lafayette dumpster rental",
    "Moraga dumpster rental",
    "Walnut Creek dumpster rental",
    "estate cleanout Orinda",
    "renovation dumpster Orinda CA",
    "junk removal Orinda",
  ],
  openGraph: {
    title: "Dumpster Rental in Orinda, CA - TP Dumpsters",
    description:
      "Premium dumpster rentals in Orinda. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/orinda",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental in Orinda, CA - TP Dumpsters",
    description:
      "Premium dumpster rentals in Orinda. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/orinda" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Orinda",
  description:
    "Premium dumpster rentals in Orinda, CA. Same-day delivery to all Orinda neighborhoods and the Lamorinda area.",
  url: "https://tpdumpsters.com/orinda",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Orinda",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Orinda" },
    { "@type": "City", name: "Lafayette" },
    { "@type": "City", name: "Moraga" },
    { "@type": "City", name: "Walnut Creek" },
    { "@type": "City", name: "Berkeley Hills" },
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

export default function OrindaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <OrindaHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...orindaAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Orinda" faqs={orindaFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <OrindaLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
