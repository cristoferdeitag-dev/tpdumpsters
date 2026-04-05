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
import LosGatosHero from "./components/LosGatosHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import LosGatosLocation from "./components/LosGatosLocation";

const losGatosFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Los Gatos?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Los Gatos may require a temporary encroachment permit for dumpsters placed on public streets. Driveway placement usually doesn&apos;t need a permit. Given Los Gatos&apos;s historic downtown and hillside neighborhoods, we&apos;ll help ensure proper permitting.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Los Gatos?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> throughout Los Gatos when you call before noon. From Downtown Los Gatos to the Los Gatos Mountains, Blossom Manor to Belgatos, our team delivers quickly.
      </p>
    ),
  },
  {
    question: "Can you deliver to hillside and mountain properties in Los Gatos?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! Los Gatos is known for its stunning hillside and mountain homes with winding roads. Our experienced drivers navigate these areas regularly and can handle steep driveways and narrow access roads. We&apos;ll work with you to find the best placement.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in Los Gatos?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        A <strong>20-yard dumpster</strong> is ideal for most Los Gatos kitchen and bathroom remodels. For larger estate homes in the Los Gatos Mountains or whole-house renovations, a 30-yard is recommended. The 10-yard works perfectly for smaller projects.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Los Gatos?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Los Gatos customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">High-end estate renovations in the Los Gatos Mountains</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Historic home restoration projects downtown</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and hillside yard improvements</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts in Blossom Manor and Shannon</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Deck and outdoor living space construction</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Los Gatos ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve ZIP codes 95030, 95032, and 95033, covering all of Los Gatos. From Downtown to Vasona, Belgatos to the Los Gatos Mountains, we deliver everywhere.
      </p>
    ),
  },
];

const losGatosAbout = {
  cityName: "Los Gatos",
  intro:
    "Los Gatos is an upscale Silicon Valley town known for its charming downtown, historic architecture, and stunning hillside estates in the Santa Cruz Mountains. With a mix of luxury homes and ongoing renovation projects, Los Gatos property owners demand quality service. TP Dumpsters delivers with fast, reliable dumpster rental tailored to Los Gatos&apos;s unique terrain and high standards.",
  highlights: [
    "Experienced with Los Gatos's hillside and mountain properties",
    "Familiar with Los Gatos permit requirements and historic zones",
    "Fast delivery to all neighborhoods — Downtown to the Mountains",
    "Trusted by Los Gatos contractors, homeowners, and property managers",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Estate renovations in the Los Gatos Mountains",
    "Historic home restoration in Downtown Los Gatos",
    "Kitchen and bathroom remodels in Blossom Manor",
    "Landscaping redesigns on hillside properties",
    "Deck construction and outdoor living improvements",
    "Estate cleanouts in Shannon and Belgatos",
  ],
  closingText:
    "Whether you're renovating a mountain estate or restoring a historic home downtown, TP Dumpsters provides the professional waste removal Los Gatos expects. We offer transparent pricing, same-day delivery, and hillside expertise. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Los Gatos, CA | Santa Clara County - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Los Gatos, CA. Serving Downtown, Blossom Manor, Los Gatos Mountains & all neighborhoods. Same-day delivery. Call (510) 650-2083",
  keywords: [
    "dumpster rental Los Gatos CA",
    "Los Gatos dumpster rental",
    "roll-off dumpster Los Gatos",
    "construction dumpster Los Gatos",
    "Los Gatos waste removal",
    "dumpster rental 95030",
    "dumpster rental 95032",
    "dumpster rental 95033",
    "Downtown Los Gatos dumpster rental",
    "Blossom Manor dumpster rental",
    "Los Gatos Mountains dumpster rental",
    "Santa Clara County dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Los Gatos, CA - TP Dumpsters",
    description: "Fast, reliable dumpster rentals in Los Gatos. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/los-gatos",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/los-gatos" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Los Gatos",
  description: "Fast, reliable dumpster rentals in Los Gatos, CA. Serving all Los Gatos neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/los-gatos",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: { "@type": "PostalAddress", addressLocality: "Los Gatos", addressRegion: "CA", addressCountry: "US" },
  areaServed: [{ "@type": "City", name: "Los Gatos", "@id": "https://en.wikipedia.org/wiki/Los_Gatos,_California" }],
  priceRange: "$$",
  openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "07:00", closes: "18:00" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dumpster Rental Sizes",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "10 Yard Dumpster Rental", description: "Compact dumpster ideal for tight spaces and heavy debris like soil, concrete, and bricks." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "20 Yard Dumpster Rental", description: "Versatile dumpster for kitchen/bathroom remodels, roofing projects, and yard cleanups." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "30 Yard Dumpster Rental", description: "Extra capacity dumpster for whole-home cleanouts, large renovations, and construction debris." } },
    ],
  },
};

export default function LosGatosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <LosGatosHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...losGatosAbout} />
      <SizesSection />
      <DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Los Gatos" faqs={losGatosFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <LosGatosLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
