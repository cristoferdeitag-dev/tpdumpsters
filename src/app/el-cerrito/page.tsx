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
import ElCerritoHero from "./components/ElCerritoHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import ElCerritoLocation from "./components/ElCerritoLocation";

const elCerritoFaqs = [
  {
    question: "How quickly can I get a dumpster delivered in El Cerrito?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout El Cerrito and the surrounding Inner East Bay. Whether you&apos;re in El Cerrito Hills, Mira Vista, or near the BART station, we can typically have a dumpster on-site within hours when you call before noon.
      </p>
    ),
  },
  {
    question: "Can you navigate El Cerrito's hillside streets for delivery?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. Many El Cerrito homes sit on the hills with stunning Bay views but challenging access. Our drivers are experienced with <strong>El Cerrito Hills, Sunset View, and Mira Vista</strong> terrain — steep driveways, narrow streets, and tight turns. We&apos;ll find the best placement for your property.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in El Cerrito?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on your private property or driveway, no permit is typically required in El Cerrito. For street placement, you may need a temporary encroachment permit from the City of El Cerrito. Given the hillside nature of many properties, we recommend driveway placement whenever possible.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for renovating an older El Cerrito home?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        El Cerrito has many mid-century and post-war homes that are prime for renovation. For kitchen and bath remodels, a <strong>20-yard dumpster ($649)</strong> handles most projects. For full gut renovations or homes with multiple rooms being updated, the 30-yard at $749 gives you the capacity you need without multiple hauls.
      </p>
    ),
  },
  {
    question: "Do you serve Kensington, Albany, and Berkeley too?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve the entire Inner East Bay including <strong>Kensington, Albany, Berkeley, Richmond,</strong> and San Pablo. One call covers dumpster delivery anywhere in the area — no extra travel charges for neighboring communities.
      </p>
    ),
  },
  {
    question: "How much does a dumpster rental cost in El Cerrito?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        El Cerrito dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster (7-day rental, 1 ton included). The 20-yard starts at $649 and the 30-yard at $749. No hidden fees, no surprise charges. Call <strong>(510) 650-2083</strong> for an exact quote for your El Cerrito project.
      </p>
    ),
  },
];

const elCerritoAbout = {
  cityName: "El Cerrito",
  intro:
    "El Cerrito is a hillside community with breathtaking views of the San Francisco Bay, convenient BART access, and a rich stock of mid-century homes ripe for renovation. Nestled between Richmond and Berkeley with Kensington on its border, El Cerrito homeowners are constantly updating their properties — from modernizing kitchens to full seismic retrofits. That means a steady demand for reliable, affordable dumpster service.",
  highlights: [
    "Fast delivery to all El Cerrito neighborhoods including hillside properties",
    "Experienced drivers who navigate steep driveways and narrow hilltop streets",
    "Serving the Inner East Bay from Richmond to Berkeley and Kensington",
    "Trusted by El Cerrito homeowners, contractors, and renovation specialists",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Mid-century home renovations in El Cerrito Hills & Mira Vista",
    "Kitchen and bathroom remodels in Sunset View & Madera neighborhoods",
    "Garage and estate cleanouts across Harding & Fairmont areas",
    "Seismic retrofit and foundation work debris removal",
    "Landscaping overhauls and hillside yard debris removal",
    "Roofing tear-offs and siding replacement on older homes near Kensington",
  ],
  closingText:
    "Whether you're renovating a mid-century gem in El Cerrito Hills or clearing out a property near Mira Vista, TP Dumpsters makes waste removal simple and affordable. Same-day delivery, transparent pricing, and a team that knows the Inner East Bay. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in El Cerrito, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in El Cerrito, CA. 10, 20 & 30 yard roll-off dumpsters for construction, remodels & cleanouts. Same-day delivery to El Cerrito, Kensington & Albany. Call (510) 650-2083",
  keywords: [
    "dumpster rental El Cerrito CA",
    "El Cerrito dumpster rental",
    "roll-off dumpster El Cerrito",
    "construction dumpster El Cerrito",
    "El Cerrito waste removal",
    "dumpster rental 94530",
    "El Cerrito Hills dumpster rental",
    "Mira Vista dumpster rental",
    "Kensington dumpster rental",
    "Albany dumpster rental",
    "Berkeley dumpster rental",
    "Richmond dumpster rental",
    "cheap dumpster El Cerrito CA",
    "junk removal El Cerrito",
  ],
  openGraph: {
    title: "Dumpster Rental in El Cerrito, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in El Cerrito. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/el-cerrito",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental in El Cerrito, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in El Cerrito. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/el-cerrito" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - El Cerrito",
  description:
    "Affordable, reliable dumpster rentals in El Cerrito, CA. Same-day delivery to all El Cerrito neighborhoods, Kensington, and Albany.",
  url: "https://tpdumpsters.com/el-cerrito",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "El Cerrito",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "El Cerrito" },
    { "@type": "City", name: "Kensington" },
    { "@type": "City", name: "Albany" },
    { "@type": "City", name: "Richmond" },
    { "@type": "City", name: "Berkeley" },
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

export default function ElCerritoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <ElCerritoHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...elCerritoAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="El Cerrito" faqs={elCerritoFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <ElCerritoLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
