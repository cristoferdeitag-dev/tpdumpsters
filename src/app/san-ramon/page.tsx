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
import SanRamonHero from "./components/SanRamonHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import SanRamonLocation from "./components/SanRamonLocation";

const sanRamonFaqs = [
  {
    question: "How much does a dumpster rental cost in San Ramon?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        San Ramon dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster
        (7-day rental, 1 ton included). The 20-yard starts at <strong>$649</strong> and our largest
        30-yard at <strong>$749</strong>. Pricing is all-inclusive with no hidden fees. Call{" "}
        <strong>(510) 650-2083</strong> or email contact@tpdumpsters.com for your personalized quote.
      </p>
    ),
  },
  {
    question: "Do you deliver to Dougherty Valley and Gale Ranch?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Dougherty Valley and Gale Ranch are among our most frequent delivery areas in San Ramon.
        We&apos;re familiar with the neighborhood layouts, HOA requirements, and driveway configurations
        in these master-planned communities. We place dumpsters neatly on driveways with protective
        boards to keep your property pristine.
      </p>
    ),
  },
  {
    question: "Can I rent a dumpster for a new construction project in San Ramon?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. San Ramon has significant new construction activity, and we work with builders and
        general contractors throughout the area. Our <strong>30-yard dumpster</strong> is the go-to
        choice for new builds and major renovations, while the <strong>20-yard</strong> handles
        interior finish work and remodeling debris efficiently.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in San Ramon?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a single-room remodel (kitchen or bathroom), a <strong>10-yard dumpster</strong> usually
        works well. For multi-room renovations or larger projects common in San Ramon&apos;s modern
        homes, the <strong>20-yard</strong> is our most popular choice. Full home renovations or
        additions call for the <strong>30-yard</strong> — it handles everything from framing to
        finish debris.
      </p>
    ),
  },
  {
    question: "How quickly can you deliver a dumpster in San Ramon?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> to San Ramon when you book before noon. All areas
        including Dougherty Valley, Windemere, Canyon Lakes, and Crow Canyon are well within our
        service radius. Next-day delivery is guaranteed for all bookings. Call us or book online
        at <a href="/booking" className="text-tp-red underline">tpdumpsters.com/booking</a>.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in San Ramon?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        No permit is required when the dumpster is placed on your private property (driveway or yard).
        For street placement, the City of San Ramon may require a temporary encroachment permit through
        the Public Works department. Most San Ramon homes have spacious driveways, so driveway
        placement is almost always an option — saving you time and permit fees.
      </p>
    ),
  },
];

const sanRamonAbout = {
  cityName: "San Ramon",
  intro:
    "San Ramon sits at the center of the San Ramon Valley, a thriving tech corridor anchored by Bishop Ranch and surrounded by beautifully planned residential communities. With modern homes in Dougherty Valley, established neighborhoods along Crow Canyon, and ongoing new construction, San Ramon generates steady demand for reliable dumpster rental services.",
  highlights: [
    "Experienced with HOA rules in Dougherty Valley, Gale Ranch, and Windemere",
    "Serve both residential remodels and commercial projects near Bishop Ranch",
    "Protective boards placed under every dumpster to safeguard driveways",
    "Same-day delivery to all San Ramon neighborhoods and Danville",
    "Bilingual team (English & Spanish) for seamless coordination",
  ],
  commonProjects: [
    "Home remodels and upgrades in Dougherty Valley and Gale Ranch",
    "New construction debris removal for builders in San Ramon",
    "Garage and attic cleanouts for families in Windemere and Twin Creeks",
    "Landscaping and backyard renovation debris in Canyon Lakes",
    "Roofing replacement and exterior updates in San Ramon Village",
    "Office and commercial tenant improvement waste near Bishop Ranch",
  ],
  closingText:
    "From master-planned communities to the Bishop Ranch business corridor, TP Dumpsters is San Ramon's trusted choice for clean, reliable waste removal. Transparent pricing, HOA-compliant placement, and same-day service — that's what sets us apart. Call (510) 650-2083 for your free quote today.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in San Ramon, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Reliable dumpster rentals in San Ramon, CA. 10, 20 & 30 yard roll-off dumpsters. Serving Dougherty Valley, Gale Ranch & all neighborhoods. Same-day delivery. Call (510) 650-2083",
  keywords: [
    "dumpster rental San Ramon CA",
    "San Ramon dumpster rental",
    "roll-off dumpster San Ramon",
    "construction dumpster San Ramon",
    "San Ramon waste removal",
    "dumpster rental 94582",
    "dumpster rental 94583",
    "dumpster rental Dougherty Valley",
    "Danville dumpster rental",
    "Dublin dumpster rental",
    "Crow Canyon dumpster rental",
    "Bishop Ranch dumpster service",
    "home remodel dumpster San Ramon",
    "junk removal San Ramon CA",
  ],
  openGraph: {
    title: "Dumpster Rental in San Ramon, CA - TP Dumpsters",
    description:
      "Reliable dumpster rentals in San Ramon. 10, 20 & 30 yard dumpsters. Serving Dougherty Valley & all neighborhoods. Call (510) 650-2083",
    url: "https://tpdumpsters.com/san-ramon",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/san-ramon" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - San Ramon",
  description:
    "Reliable dumpster rentals in San Ramon, CA. Serving all San Ramon Valley communities with same-day delivery and transparent pricing.",
  url: "https://tpdumpsters.com/san-ramon",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Ramon",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "San Ramon" },
    { "@type": "City", name: "Danville" },
    { "@type": "City", name: "Dublin" },
    { "@type": "City", name: "Pleasanton" },
    { "@type": "City", name: "Walnut Creek" },
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

export default function SanRamonPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <SanRamonHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...sanRamonAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="San Ramon" faqs={sanRamonFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <SanRamonLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
