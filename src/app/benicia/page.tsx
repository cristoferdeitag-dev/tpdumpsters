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
import BeniciaHero from "./components/BeniciaHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import BeniciaLocation from "./components/BeniciaLocation";

const beniciaFaqs = [
  {
    question: "How quickly can I get a dumpster delivered in Benicia?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout Benicia and the Carquinez Strait area. Whether you&apos;re in Downtown Benicia, Southampton, or the East Side, we can typically have a dumpster on-site within hours when you call before noon.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for renovating an older Benicia home?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Benicia has a beautiful stock of historic and mid-century homes that are perfect for renovation. For typical kitchen and bath remodels or room additions, a <strong>20-yard dumpster ($649)</strong> handles most projects. For whole-home renovations or properties with multiple rooms being updated, the 30-yard at $749 is ideal.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Benicia?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If you place the dumpster on your own private property or driveway, no permit is typically required in Benicia. For street placement, you may need a temporary encroachment permit from the City of Benicia. Most Benicia homes have adequate driveway or side-yard space for placement.
      </p>
    ),
  },
  {
    question: "Can you deliver to the Industrial Park and military housing areas?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. We serve all Benicia neighborhoods including the <strong>Industrial Park, Military East, Southampton,</strong> and the historic Benicia Arsenal area. Our drivers are familiar with the city&apos;s layout and can navigate to any location.
      </p>
    ),
  },
  {
    question: "Do you serve Vallejo, Martinez, and other nearby cities?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve the entire Carquinez Strait region including <strong>Vallejo, Martinez, Concord, Crockett,</strong> and Suisun City. One call covers dumpster delivery anywhere in the area — no extra travel charges for neighboring communities.
      </p>
    ),
  },
  {
    question: "How much does a dumpster rental cost in Benicia?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Benicia dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster (7-day rental, 1 ton included). The 20-yard starts at $649 and the 30-yard at $749. No hidden fees, no surprise charges. Call <strong>(510) 650-2083</strong> for an exact quote for your Benicia project.
      </p>
    ),
  },
];

const beniciaAbout = {
  cityName: "Benicia",
  intro:
    "Benicia is a historic waterfront city on the Carquinez Strait, known for its charming downtown, arts community, and rich military heritage. With Victorian homes, mid-century properties, and a growing renovation scene, Benicia homeowners are constantly updating their homes while preserving the city's character. From Downtown Benicia to Southampton, there's always a project that needs reliable dumpster service.",
  highlights: [
    "Fast delivery to all Benicia neighborhoods and waterfront properties",
    "Experienced with historic home renovations and preservation projects",
    "Serving the entire Carquinez Strait region from Vallejo to Martinez",
    "Trusted by Benicia homeowners, contractors, and artists",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Historic home renovations in Downtown Benicia & Southampton",
    "Kitchen and bathroom remodels in East Side & Rose Drive neighborhoods",
    "Garage and estate cleanouts across Military East & West Side",
    "Artist studio cleanups and workspace renovations",
    "Roofing tear-offs and siding replacement on waterfront properties",
    "Landscaping overhauls and yard debris removal in residential areas",
  ],
  closingText:
    "Whether you're renovating a Victorian in Downtown Benicia or updating a home in Southampton, TP Dumpsters makes waste removal simple and affordable. Same-day delivery, transparent pricing, and a team that respects Benicia's historic charm. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Benicia, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Benicia, CA. 10, 20 & 30 yard roll-off dumpsters for construction, remodels & cleanouts. Same-day delivery to Benicia & Carquinez Strait. Call (510) 650-2083",
  keywords: [
    "dumpster rental Benicia CA",
    "Benicia dumpster rental",
    "roll-off dumpster Benicia",
    "construction dumpster Benicia",
    "Benicia waste removal",
    "dumpster rental 94510",
    "Downtown Benicia dumpster rental",
    "Southampton dumpster rental",
    "Vallejo dumpster rental",
    "Martinez dumpster rental",
    "Carquinez Strait dumpster",
    "historic home renovation dumpster Benicia",
    "cheap dumpster Benicia CA",
    "junk removal Benicia",
  ],
  openGraph: {
    title: "Dumpster Rental in Benicia, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Benicia. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/benicia",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental in Benicia, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Benicia. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/benicia" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Benicia",
  description:
    "Affordable, reliable dumpster rentals in Benicia, CA. Same-day delivery to all Benicia neighborhoods and the Carquinez Strait area.",
  url: "https://tpdumpsters.com/benicia",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Benicia",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Benicia" },
    { "@type": "City", name: "Vallejo" },
    { "@type": "City", name: "Martinez" },
    { "@type": "City", name: "Concord" },
    { "@type": "City", name: "Crockett" },
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

export default function BeniciaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <BeniciaHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...beniciaAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Benicia" faqs={beniciaFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <BeniciaLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
