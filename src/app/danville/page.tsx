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
import DanvilleHero from "./components/DanvilleHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import DanvilleLocation from "./components/DanvilleLocation";

const danvilleFaqs = [
  {
    question: "How quickly can I get a dumpster delivered in Danville?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout Danville and the San Ramon Valley. Whether you&apos;re in Blackhawk, Sycamore Valley, or Downtown Danville, we can typically have a dumpster on-site within hours when you call before noon.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for a luxury home renovation in Blackhawk or Diablo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For high-end renovations in Danville&apos;s premium communities — <strong>Blackhawk estates, Diablo properties, or large homes in Alamo</strong> — the <strong>30-yard dumpster ($849)</strong> is the most popular choice. It handles full kitchen remodels, master suite additions, and multi-room projects without needing multiple pickups.
      </p>
    ),
  },
  {
    question: "Can you deliver dumpsters to gated communities and hillside estates?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. We regularly service <strong>Blackhawk Country Club, Diablo Country Club,</strong> and other gated communities throughout Danville and Alamo. Just provide us with access instructions or gate codes when you book, and our drivers will coordinate with your HOA or property management if needed.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Danville?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on your private property or driveway, no permit is typically required in Danville. For street placement, you may need a temporary encroachment permit from the Town of Danville. Most Danville estates have ample driveway or side-yard space for dumpster placement.
      </p>
    ),
  },
  {
    question: "Do you serve Alamo, San Ramon, and Walnut Creek too?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve the entire San Ramon Valley including <strong>Alamo, San Ramon, Walnut Creek, Lafayette,</strong> and Pleasanton. One call covers dumpster delivery anywhere in the area — no extra travel charges for neighboring communities.
      </p>
    ),
  },
  {
    question: "How much does a dumpster rental cost in Danville?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Danville dumpster rental prices start at <strong>$649 for a 10-yard</strong> dumpster (7-day rental, 1 ton included). The 20-yard starts at $699 and the 30-yard at $849. No hidden fees, no surprise charges. Call <strong>(510) 650-2083</strong> for an exact quote for your Danville project.
      </p>
    ),
  },
];

const danvilleAbout = {
  cityName: "Danville",
  intro:
    "Danville is one of the Bay Area's most prestigious communities, known for its tree-lined downtown, exceptional schools, and stunning estates in the foothills of Mount Diablo. From the ultra-luxury homes of Blackhawk and Diablo to the charming properties in Downtown Danville and Alamo, this is a market where quality matters. Homeowners here demand reliable service, transparent pricing, and professionalism — and that's exactly what TP Dumpsters delivers.",
  highlights: [
    "Fast delivery to all Danville neighborhoods including Blackhawk and Diablo estates",
    "Trusted by premium contractors and luxury home remodelers",
    "Serving the entire San Ramon Valley from Alamo to Walnut Creek",
    "Experienced with gated communities, HOA requirements, and high-end properties",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Luxury kitchen and master suite renovations in Blackhawk & Diablo",
    "Whole-home remodels and additions in Sycamore Valley & Tassajara",
    "Estate cleanouts and downsizing projects in Alamo & Green Valley",
    "Pool and outdoor living space construction debris in premium properties",
    "Roofing upgrades and exterior renovations on large Danville estates",
    "Horse property cleanups and barn renovations in rural Diablo areas",
  ],
  closingText:
    "Whether you're renovating a Blackhawk estate or updating a home in Downtown Danville, TP Dumpsters makes waste removal simple and professional. Same-day delivery, transparent pricing, and a team that understands the San Ramon Valley's premium market. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Danville, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Danville, CA. 10, 20 & 30 yard roll-off dumpsters for construction, remodels & cleanouts. Same-day delivery to Danville, Blackhawk & Alamo. Call (510) 650-2083",
  keywords: [
    "dumpster rental Danville CA",
    "Danville dumpster rental",
    "roll-off dumpster Danville",
    "construction dumpster Danville",
    "Danville waste removal",
    "dumpster rental 94506",
    "dumpster rental 94526",
    "Blackhawk dumpster rental",
    "Alamo dumpster rental",
    "Diablo dumpster rental",
    "San Ramon dumpster rental",
    "Walnut Creek dumpster rental",
    "luxury home dumpster Danville",
    "cheap dumpster Danville CA",
    "junk removal Danville",
  ],
  openGraph: {
    title: "Dumpster Rental in Danville, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Danville. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/danville",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental in Danville, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Danville. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/danville" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Danville",
  description:
    "Affordable, reliable dumpster rentals in Danville, CA. Same-day delivery to all Danville neighborhoods, Blackhawk, Alamo, and the San Ramon Valley.",
  url: "https://tpdumpsters.com/danville",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Danville",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Danville" },
    { "@type": "City", name: "Alamo" },
    { "@type": "City", name: "San Ramon" },
    { "@type": "City", name: "Walnut Creek" },
    { "@type": "City", name: "Blackhawk" },
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

export default function DanvillePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <DanvilleHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...danvilleAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Danville" faqs={danvilleFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <DanvilleLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
