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
import ElSobranteHero from "./components/ElSobranteHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import ElSobranteLocation from "./components/ElSobranteLocation";

const elSobranteFaqs = [
  {
    question: "How quickly can I get a dumpster delivered in El Sobrante?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout El Sobrante and West
        Contra Costa County. Whether you&apos;re in Sobrante Ridge, Appian Way, or near Briones
        Regional Park, we can typically have a dumpster on-site within hours when you call
        before noon.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for hillside home projects in El Sobrante?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        El Sobrante&apos;s hillside properties often require significant cleanup work. A
        <strong> 20-yard dumpster</strong> is the most popular choice for home remodels,
        landscaping projects, and garage cleanouts. For larger renovations or whole-home
        cleanouts, the 30-yard handles major debris. Smaller projects work well with a 10-yard.
      </p>
    ),
  },
  {
    question: "Can you navigate El Sobrante's hillside roads for delivery?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! Our drivers are experienced with El Sobrante&apos;s hillside neighborhoods,
        winding roads, and <strong>Sobrante Ridge, Carriage Hills, and Sheldon Heights</strong>
        terrain. We carefully assess access before delivery and can recommend the best dumpster
        placement for properties with challenging driveways.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in El Sobrante?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on your private property or driveway, no permit is typically
        required in El Sobrante. For street placement, you may need a permit from Contra Costa
        County. Most El Sobrante homes have driveways that accommodate a roll-off dumpster.
      </p>
    ),
  },
  {
    question: "Do you also serve Richmond, San Pablo, and Pinole?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve all of West Contra Costa including <strong>Richmond, San Pablo, Pinole,
        Hercules,</strong> and Orinda. El Sobrante&apos;s central West County location means we
        can quickly reach any address in the region — no extra travel charges.
      </p>
    ),
  },
  {
    question: "How much does a dumpster rental cost in El Sobrante?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        El Sobrante dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster
        (7-day rental, 1 ton included). The 20-yard starts at $649 and the 30-yard at $749.
        No hidden fees, no surprise charges. Call <strong>(510) 650-2083</strong> for an exact
        quote for your El Sobrante project.
      </p>
    ),
  },
];

const elSobranteAbout = {
  cityName: "El Sobrante",
  intro:
    "El Sobrante is a hidden gem of West Contra Costa County, featuring hillside neighborhoods, nature access, and proximity to Briones Regional Park. This affordable community offers spacious properties, scenic views, and a close-knit feel. Homeowners in El Sobrante regularly invest in home improvements, landscaping, and property upgrades that require reliable dumpster service.",
  highlights: [
    "Fast delivery to all El Sobrante hillside neighborhoods",
    "Experienced with challenging terrain and winding roads",
    "Full West County coverage — El Sobrante, Richmond, and beyond",
    "Trusted by El Sobrante contractors, homeowners, and property managers",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Home remodels and kitchen/bath renovations in Sobrante Ridge & Carriage Hills",
    "Hillside landscaping overhauls and tree removal near Briones Park",
    "Garage and estate cleanouts across El Sobrante Valley",
    "Roofing tear-offs and exterior upgrades on hillside homes",
    "Deck replacement and outdoor living space renovations in Sheldon Heights",
    "Property cleanouts and land clearing on Appian Way & San Pablo Dam",
  ],
  closingText:
    "Whether you're renovating a hillside home in Sobrante Ridge or cleaning out a property near Briones Park, TP Dumpsters makes waste removal simple and affordable. Same-day delivery, transparent pricing, and a team that knows West County. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in El Sobrante, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in El Sobrante, CA. 10, 20 & 30 yard roll-off dumpsters for construction, remodels & cleanouts. Same-day delivery to El Sobrante & West County. Call (510) 650-2083",
  keywords: [
    "dumpster rental El Sobrante CA",
    "El Sobrante dumpster rental",
    "roll-off dumpster El Sobrante",
    "construction dumpster El Sobrante",
    "El Sobrante waste removal",
    "dumpster rental 94803",
    "Sobrante Ridge dumpster rental",
    "Richmond dumpster rental",
    "San Pablo dumpster rental",
    "Pinole dumpster rental",
    "West Contra Costa dumpster",
    "cheap dumpster El Sobrante CA",
    "junk removal El Sobrante",
  ],
  openGraph: {
    title: "Dumpster Rental in El Sobrante, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in El Sobrante. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/el-sobrante",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental in El Sobrante, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in El Sobrante. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/el-sobrante" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - El Sobrante",
  description:
    "Affordable, reliable dumpster rentals in El Sobrante, CA. Same-day delivery to all El Sobrante neighborhoods and West Contra Costa County.",
  url: "https://tpdumpsters.com/el-sobrante",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "El Sobrante",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "El Sobrante" },
    { "@type": "City", name: "Richmond" },
    { "@type": "City", name: "San Pablo" },
    { "@type": "City", name: "Pinole" },
    { "@type": "City", name: "Hercules" },
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

export default function ElSobrantePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <ElSobranteHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...elSobranteAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="El Sobrante" faqs={elSobranteFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <ElSobranteLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
