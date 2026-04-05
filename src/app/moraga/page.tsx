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
import MoragaHero from "./components/MoragaHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import MoragaLocation from "./components/MoragaLocation";

const moragaFaqs = [
  {
    question: "How quickly can I get a dumpster delivered in Moraga?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout Moraga and the
        Lamorinda area. Whether you&apos;re in Rheem Valley, near Saint Mary&apos;s College,
        or in Bollinger Canyon, we can typically have a dumpster on-site within hours when you
        call before noon.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for a hillside home renovation in Moraga?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Moraga&apos;s hillside homes often require significant renovation work. A <strong>30-yard
        dumpster</strong> is ideal for whole-home remodels, major kitchen and bath upgrades, and
        large landscaping projects. For smaller projects like garage cleanouts or single-room
        renovations, a 20-yard is typically sufficient.
      </p>
    ),
  },
  {
    question: "Do you serve Saint Mary's College and campus area projects?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We work with contractors, facilities teams, and property managers throughout Moraga,
        including the <strong>Saint Mary&apos;s College area</strong>. We can coordinate
        deliveries for campus renovation projects, student housing cleanouts, and facility
        upgrades.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Moraga?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on your private property or driveway, no permit is typically
        required in Moraga. For street placement, you may need a permit from the Town of Moraga
        or Contra Costa County. Most Moraga homes have spacious driveways that easily accommodate
        a roll-off dumpster.
      </p>
    ),
  },
  {
    question: "Do you also serve Lafayette, Orinda, and Walnut Creek?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! We serve the entire Lamorinda corridor including <strong>Lafayette, Orinda,
        Walnut Creek,</strong> and Canyon. One call covers dumpster delivery anywhere in the
        Lamorinda area — no extra travel charges for these communities.
      </p>
    ),
  },
  {
    question: "How much does a dumpster rental cost in Moraga?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Moraga dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster
        (7-day rental, 1 ton included). The 20-yard starts at $649 and the 30-yard at $749.
        No hidden fees, no surprise charges. Call <strong>(510) 650-2083</strong> for an exact
        quote for your Moraga project.
      </p>
    ),
  },
];

const moragaAbout = {
  cityName: "Moraga",
  intro:
    "Moraga is a quiet, family-friendly Lamorinda town surrounded by rolling hills, open spaces, and nature preserves. Home to Saint Mary's College and a close-knit residential community, Moraga homeowners regularly invest in home improvements, landscaping projects, and property upgrades that require reliable dumpster service.",
  highlights: [
    "Fast delivery to all Moraga neighborhoods and Lamorinda communities",
    "Experienced with hillside homes and nature-surrounded properties",
    "Full Lamorinda coverage — Moraga, Orinda, and Lafayette",
    "Trusted by Moraga homeowners, contractors, and property managers",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Home remodels and kitchen/bath renovations in Rheem Valley & Sanders Ranch",
    "Landscaping overhauls and tree removal in hillside neighborhoods",
    "Garage and estate cleanouts across Moraga Town Center",
    "Deck replacement and outdoor living space upgrades",
    "Roofing tear-offs and exterior renovations in Campolindo",
    "Campus and facility projects near Saint Mary's College",
  ],
  closingText:
    "Whether you're renovating a hillside home in Bollinger Canyon or updating a property near Moraga Town Center, TP Dumpsters provides reliable dumpster service for Moraga's community. Same-day delivery, transparent pricing, and a team that knows Lamorinda. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Moraga, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Moraga, CA. 10, 20 & 30 yard roll-off dumpsters for renovations, remodels & cleanouts. Same-day delivery to Moraga & Lamorinda. Call (510) 650-2083",
  keywords: [
    "dumpster rental Moraga CA",
    "Moraga dumpster rental",
    "roll-off dumpster Moraga",
    "construction dumpster Moraga",
    "Moraga waste removal",
    "dumpster rental 94556",
    "Rheem Valley dumpster rental",
    "Lamorinda dumpster rental",
    "Lafayette dumpster rental",
    "Orinda dumpster rental",
    "Saint Mary's College dumpster",
    "Campolindo dumpster rental",
    "renovation dumpster Moraga CA",
    "junk removal Moraga",
  ],
  openGraph: {
    title: "Dumpster Rental in Moraga, CA - TP Dumpsters",
    description:
      "Affordable dumpster rentals in Moraga. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/moraga",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental in Moraga, CA - TP Dumpsters",
    description:
      "Affordable dumpster rentals in Moraga. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/moraga" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Moraga",
  description:
    "Affordable, reliable dumpster rentals in Moraga, CA. Same-day delivery to all Moraga neighborhoods and the Lamorinda area.",
  url: "https://tpdumpsters.com/moraga",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Moraga",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Moraga" },
    { "@type": "City", name: "Lafayette" },
    { "@type": "City", name: "Orinda" },
    { "@type": "City", name: "Walnut Creek" },
    { "@type": "City", name: "Canyon" },
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

export default function MoragaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <MoragaHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...moragaAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Moraga" faqs={moragaFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <MoragaLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
