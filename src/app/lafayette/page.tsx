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
import LafayetteHero from "./components/LafayetteHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import LafayetteLocation from "./components/LafayetteLocation";

const lafayetteFaqs = [
  {
    question: "Can you deliver dumpsters to hillside properties in Lafayette?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. Lafayette is known for its steep driveways and hillside lots, and our drivers are
        experienced with these challenging deliveries. We use specialized techniques to safely place
        dumpsters on inclines in neighborhoods like Happy Valley, Springhill, and Burton Valley. Just let
        us know your address and we&apos;ll confirm the best placement option.
      </p>
    ),
  },
  {
    question: "Is your dumpster service HOA-friendly for Lafayette communities?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes. Many Lafayette neighborhoods have strict HOA rules about dumpster placement and appearance.
        We place dumpsters neatly on driveways, use boards to protect surfaces, and keep our equipment
        clean and well-maintained. We can also work with your HOA&apos;s scheduling requirements for
        delivery and pickup times.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a large lot cleanup in Lafayette?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Lafayette properties tend to be larger than average, which means bigger cleanups. For yard
        clearing and landscaping debris on a typical Lafayette lot, a <strong>20-yard dumpster</strong> is
        usually ideal. For major tree removal or whole-property cleanouts, the <strong>30-yard</strong> gives
        you plenty of capacity. Our 10-yard is perfect for concrete removal or small bathroom remodels.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Lafayette?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster stays on your private property (driveway or yard), no permit is needed in
        Lafayette. If you need to place it on a public street, you&apos;ll need a temporary encroachment
        permit from the City of Lafayette. We can guide you through the process and help you determine
        the best placement to avoid permits altogether.
      </p>
    ),
  },
  {
    question: "How much does a dumpster rental cost in Lafayette?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Our Lafayette dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster
        (7-day rental, 1 ton included). The 20-yard starts at <strong>$649</strong> and the 30-yard
        at <strong>$749</strong>. All pricing is transparent with no hidden fees. Call{" "}
        <strong>(510) 650-2083</strong> or email contact@tpdumpsters.com for an exact quote.
      </p>
    ),
  },
  {
    question: "What are the most popular dumpster projects in Lafayette?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Lafayette is one of the most active remodeling markets in the East Bay. Our most common
        projects include kitchen and bathroom renovations, whole-home remodels, garage cleanouts,
        landscaping overhauls, deck replacements, and estate cleanouts. Many Lafayette homeowners
        are upgrading older homes while preserving the area&apos;s charm, and we handle the debris
        so they can focus on the transformation.
      </p>
    ),
  },
];

const lafayetteAbout = {
  cityName: "Lafayette",
  intro:
    "Lafayette is the crown jewel of the Lamorinda area, known for its upscale homes, tree-lined streets, and a community that takes pride in maintaining beautiful properties. With a constant flow of home remodeling projects, hillside landscaping work, and estate cleanouts, Lafayette homeowners need a dumpster service that matches their standards.",
  highlights: [
    "Expert delivery on Lafayette's steep hillside driveways and narrow roads",
    "HOA-compliant service — clean, professional, and discreet placement",
    "Trusted by Lamorinda contractors and high-end remodeling professionals",
    "Boards placed under dumpsters to protect driveways and surfaces",
    "Bilingual team (English & Spanish) for seamless communication",
  ],
  commonProjects: [
    "Kitchen and bathroom remodels in Burton Valley and Happy Valley",
    "Whole-home renovations on Lafayette's hillside estates",
    "Landscaping and yard debris removal from large residential lots",
    "Estate cleanouts and downsizing projects in Reliez Valley",
    "Concrete and hardscape removal for driveway replacements",
    "Deck and patio tear-outs in Springhill and Acalanes Ridge",
  ],
  closingText:
    "Whether you're a contractor managing a luxury remodel or a homeowner clearing out a lifetime of belongings, TP Dumpsters delivers reliable, HOA-friendly service throughout Lafayette and the entire Lamorinda area. Transparent pricing, careful placement, and local expertise — that's our promise. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Lafayette, CA | HOA-Friendly Service - TP Dumpsters",
  description:
    "Premium dumpster rentals in Lafayette, CA. 10, 20 & 30 yard roll-off dumpsters. Hillside delivery experts. HOA-friendly service for Lamorinda. Same-day available. Call (510) 650-2083",
  keywords: [
    "dumpster rental Lafayette CA",
    "Lafayette dumpster rental",
    "roll-off dumpster Lafayette",
    "construction dumpster Lafayette",
    "Lafayette waste removal",
    "dumpster rental 94549",
    "dumpster rental Lamorinda",
    "Orinda dumpster rental",
    "Moraga dumpster rental",
    "Walnut Creek dumpster rental",
    "HOA dumpster rental Lafayette",
    "hillside dumpster delivery",
    "home remodel dumpster Lafayette",
    "junk removal Lafayette CA",
  ],
  openGraph: {
    title: "Dumpster Rental in Lafayette, CA - TP Dumpsters",
    description:
      "Premium dumpster rentals in Lafayette. 10, 20 & 30 yard dumpsters. Hillside delivery experts. Call (510) 650-2083",
    url: "https://tpdumpsters.com/lafayette",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/lafayette" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Lafayette",
  description:
    "Premium dumpster rentals in Lafayette, CA. Hillside delivery experts serving all Lamorinda neighborhoods. HOA-friendly service.",
  url: "https://tpdumpsters.com/lafayette",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lafayette",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Lafayette" },
    { "@type": "City", name: "Walnut Creek" },
    { "@type": "City", name: "Orinda" },
    { "@type": "City", name: "Moraga" },
    { "@type": "City", name: "Pleasant Hill" },
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

export default function LafayettePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <LafayetteHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...lafayetteAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Lafayette" faqs={lafayetteFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <LafayetteLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
