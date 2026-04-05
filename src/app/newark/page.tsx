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
import NewarkHero from "./components/NewarkHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import NewarkLocation from "./components/NewarkLocation";

const newarkFaqs = [
  {
    question: "How quickly can I get a dumpster delivered in Newark?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout Newark and the South East Bay. Whether you&apos;re in Old Town Newark, NewPark, or near the Lakeshore area, we can typically have a dumpster on-site within hours when you call before noon.
      </p>
    ),
  },
  {
    question: "What dumpster size works best for new construction in Newark?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For new construction projects in Newark&apos;s growing developments, a <strong>30-yard dumpster</strong> is ideal. It handles framing scraps, drywall cutoffs, packaging, and general construction debris. For smaller remodels or garage cleanouts, a 10-yard or 20-yard is typically sufficient.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Newark?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on your own private property or driveway, no permit is typically required in Newark. For placement on public streets, you may need a temporary encroachment permit from the City of Newark. Most of our customers place dumpsters on their driveways without any issues.
      </p>
    ),
  },
  {
    question: "Is Newark an affordable alternative for dumpster rentals near Fremont?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer the <strong>same competitive pricing</strong> across Newark, Fremont, Union City, and the entire South East Bay. Starting at just $599 for a 10-yard dumpster, our rates are transparent with no hidden fees or extra travel charges for any of these communities.
      </p>
    ),
  },
  {
    question: "What can I put in a dumpster rental in Newark?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">We accept most common debris types for Newark projects:</p>
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
    question: "How much does a dumpster rental cost in Newark, CA?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Newark dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster (7-day rental, 1 ton included). The 20-yard starts at $649 and the 30-yard at $749. No hidden fees, no surprise charges. Call <strong>(510) 650-2083</strong> for an exact quote for your Newark project.
      </p>
    ),
  },
];

const newarkAbout = {
  cityName: "Newark",
  intro:
    "Newark is a growing South Bay city adjacent to Silicon Valley's tech corridor, offering an affordable alternative to neighboring Fremont while experiencing its own wave of new housing developments and community growth. With projects ranging from new construction in NewPark and Patterson Ranch to renovations in established neighborhoods like Old Town and Birch Grove, Newark has a steady need for dependable dumpster service.",
  highlights: [
    "Fast delivery to all Newark neighborhoods and South East Bay communities",
    "Right-sized dumpsters for new housing developments and home remodels",
    "Experienced with Newark's growing construction and renovation needs",
    "Trusted by Newark builders, remodelers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "New construction cleanup in NewPark & Patterson Ranch developments",
    "Kitchen and bathroom remodels in Old Town Newark & Birch Grove",
    "Garage and estate cleanouts across Lakeshore & Musick neighborhoods",
    "Roofing tear-offs and siding replacement on established homes",
    "Landscaping overhauls and yard debris removal throughout Newark",
    "Concrete driveway and patio demolition for property upgrades",
  ],
  closingText:
    "Whether you're building new in NewPark or renovating a classic home in Old Town Newark, TP Dumpsters makes waste removal simple and affordable. Same-day delivery, transparent pricing, and a team that knows the South East Bay. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Newark, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Newark, CA. 10, 20 & 30 yard roll-off dumpsters for construction, remodels & cleanouts. Same-day delivery to Newark & South East Bay. Call (510) 650-2083",
  keywords: [
    "dumpster rental Newark CA",
    "Newark dumpster rental",
    "roll-off dumpster Newark",
    "construction dumpster Newark",
    "Newark waste removal",
    "dumpster rental 94560",
    "Old Town Newark dumpster",
    "NewPark dumpster rental",
    "Fremont dumpster rental",
    "Union City dumpster rental",
    "Milpitas dumpster rental",
    "South East Bay dumpster",
    "cheap dumpster Newark CA",
    "junk removal Newark",
  ],
  openGraph: {
    title: "Dumpster Rental in Newark, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Newark. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/newark",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental in Newark, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Newark. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/newark" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Newark",
  description:
    "Affordable, reliable dumpster rentals in Newark, CA. Same-day delivery to all Newark neighborhoods and South East Bay communities.",
  url: "https://tpdumpsters.com/newark",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Newark",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Newark" },
    { "@type": "City", name: "Fremont" },
    { "@type": "City", name: "Union City" },
    { "@type": "City", name: "Milpitas" },
    { "@type": "City", name: "San Jose" },
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

export default function NewarkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <NewarkHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...newarkAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Newark" faqs={newarkFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <NewarkLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
