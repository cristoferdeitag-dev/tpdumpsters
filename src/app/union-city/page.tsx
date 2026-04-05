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
import UnionCityHero from "./components/UnionCityHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import UnionCityLocation from "./components/UnionCityLocation";

const unionCityFaqs = [
  {
    question: "How fast can I get a dumpster delivered in Union City?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout Union City and surrounding South Bay communities. Whether you&apos;re in Alvarado, Decoto, or the Station District, we can typically have a dumpster on-site within hours when you call before noon.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in Union City?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For most Union City home remodels — kitchens, bathrooms, or single-room renovations — a <strong>20-yard dumpster</strong> is the sweet spot. It handles drywall, flooring, cabinetry, and general debris. For whole-home renovations or additions, step up to the 30-yard for maximum capacity.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Union City?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If you place the dumpster on your own driveway or private property, no permit is typically required in Union City. For street placement, you may need a temporary encroachment permit from the City of Union City. Our team can advise you on the best placement option for your property.
      </p>
    ),
  },
  {
    question: "Do you serve Fremont, Newark, and Hayward too?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve the entire South Bay corridor including <strong>Fremont, Newark, Hayward, San Leandro,</strong> and all surrounding communities. One call covers dumpster delivery anywhere in the area — no extra travel charges.
      </p>
    ),
  },
  {
    question: "What materials can I put in a dumpster in Union City?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">We accept most common debris types for Union City projects:</p>
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
    question: "How much does a dumpster rental cost in Union City?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Union City dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster (7-day rental, 1 ton included). The 20-yard starts at $649 and the 30-yard at $749. No hidden fees, no surprise charges. Call <strong>(510) 650-2083</strong> for an exact quote for your Union City project.
      </p>
    ),
  },
];

const unionCityAbout = {
  cityName: "Union City",
  intro:
    "Union City is a growing community nestled between Fremont and Hayward in the South Bay, with excellent BART access and a vibrant mix of residential neighborhoods and industrial areas. With new development projects, home renovations in established neighborhoods like Alvarado and Decoto, and a steady stream of construction activity, Union City generates consistent demand for reliable dumpster service.",
  highlights: [
    "Fast delivery to all Union City neighborhoods and South Bay communities",
    "Ideal dumpster sizes for residential remodels and new development projects",
    "Experienced with Union City's mix of residential and industrial cleanup needs",
    "Trusted by Union City contractors, remodelers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Kitchen and bathroom remodels in Alvarado & Decoto neighborhoods",
    "New construction cleanup near Station District & BART corridor",
    "Garage and estate cleanouts across Downtown Union City",
    "Roofing tear-offs and siding replacement on established homes",
    "Landscaping overhauls and yard debris removal in Union City Hills",
    "Concrete driveway and patio demolition for property upgrades",
  ],
  closingText:
    "Whether you're renovating a home in Alvarado or managing a construction project near the Station District, TP Dumpsters makes waste removal simple and affordable. Same-day delivery, transparent pricing, and a team that knows the South Bay. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Union City, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Union City, CA. 10, 20 & 30 yard roll-off dumpsters for construction, remodels & cleanouts. Same-day delivery to Union City & South Bay. Call (510) 650-2083",
  keywords: [
    "dumpster rental Union City CA",
    "Union City dumpster rental",
    "roll-off dumpster Union City",
    "construction dumpster Union City",
    "Union City waste removal",
    "dumpster rental 94587",
    "Alvarado dumpster rental",
    "Decoto dumpster rental",
    "Fremont dumpster rental",
    "Newark dumpster rental",
    "Hayward dumpster rental",
    "South Bay dumpster rental",
    "cheap dumpster Union City CA",
    "junk removal Union City",
  ],
  openGraph: {
    title: "Dumpster Rental in Union City, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Union City. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/union-city",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental in Union City, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Union City. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/union-city" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Union City",
  description:
    "Affordable, reliable dumpster rentals in Union City, CA. Same-day delivery to all Union City neighborhoods and South Bay communities.",
  url: "https://tpdumpsters.com/union-city",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Union City",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Union City" },
    { "@type": "City", name: "Fremont" },
    { "@type": "City", name: "Hayward" },
    { "@type": "City", name: "Newark" },
    { "@type": "City", name: "San Leandro" },
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

export default function UnionCityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <UnionCityHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...unionCityAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Union City" faqs={unionCityFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <UnionCityLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
