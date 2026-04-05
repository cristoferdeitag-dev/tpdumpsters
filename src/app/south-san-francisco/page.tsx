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
import SouthSFHero from "./components/SouthSFHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import SouthSFLocation from "./components/SouthSFLocation";

const southSFFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in South San Francisco?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on a public street in South San Francisco, you may need a temporary encroachment permit. If it&apos;s on your private driveway or commercial property, no permit is usually needed. We can help guide you through the process.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in South San Francisco?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        In most South San Francisco areas, we offer <strong>same-day delivery</strong> if you call before noon. Whether it&apos;s the industrial zone near Oyster Point or residential Westborough, we deliver fast.
      </p>
    ),
  },
  {
    question: "Can you handle industrial and biotech project debris in South San Francisco?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! South San Francisco is known as &quot;The Industrial City&quot; and we regularly serve biotech companies, warehouses, and industrial facilities in the area. We handle construction debris, office cleanouts, and general waste from commercial projects. Note: we cannot accept hazardous or biohazard materials.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a warehouse cleanout in South San Francisco?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For warehouse cleanouts in South San Francisco, a <strong>30-yard dumpster</strong> is usually the best choice due to the large volume of materials. For smaller commercial cleanouts or office renovations, a <strong>20-yard</strong> works well. We can also deliver multiple dumpsters for large projects.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in South San Francisco?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">South San Francisco customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Industrial and biotech facility cleanouts</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Warehouse debris removal near Oyster Point</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Residential renovations in Westborough and Sunshine Gardens</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Commercial construction and demolition projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts and garage cleanups in residential areas</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all South San Francisco ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every South San Francisco ZIP code including 94080 and 94083. From the industrial Oyster Point area to residential Westborough, no matter where you are in South SF, we can deliver.
      </p>
    ),
  },
];

const southSFAbout = {
  cityName: "South San Francisco",
  intro:
    "South San Francisco — known as \"The Industrial City\" — is a unique blend of industrial innovation and residential community on the Peninsula. Home to major biotech companies, warehouses, and a thriving commercial district, South SF generates significant construction and renovation waste. TP Dumpsters serves the entire South San Francisco area, from the biotech corridor near Oyster Point to the residential neighborhoods of Westborough and Sunshine Gardens.",
  highlights: [
    "Experienced with industrial, biotech, and commercial project debris",
    "Familiar with South SF permit requirements and commercial zones",
    "Fast delivery to all neighborhoods — Oyster Point to Westborough",
    "Trusted by South SF contractors, businesses, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Biotech facility renovations and cleanouts near Oyster Point",
    "Warehouse debris removal in the industrial corridor",
    "Residential remodels in Westborough and Sunshine Gardens",
    "Commercial construction near SFO airport area",
    "Estate cleanouts in Avalon and Buri Buri neighborhoods",
    "Roofing projects across South SF's residential areas",
  ],
  closingText:
    "Whether you're a homeowner tackling a weekend cleanup or a contractor running a major industrial project, TP Dumpsters makes waste removal in South San Francisco easy. We offer transparent pricing, same-day delivery, and the expertise to handle both residential and commercial projects. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in South San Francisco, CA | Industrial City - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in South San Francisco, CA. Serving Downtown SSF, Westborough, Oyster Point, industrial zones & all ZIP codes. Same-day delivery. Call (510) 650-2083",
  keywords: [
    "dumpster rental South San Francisco CA",
    "South San Francisco dumpster rental",
    "roll-off dumpster South San Francisco",
    "construction dumpster South SF",
    "South San Francisco waste removal",
    "dumpster rental 94080",
    "dumpster rental 94083",
    "industrial dumpster South San Francisco",
    "Westborough dumpster rental",
    "Oyster Point dumpster",
    "biotech dumpster rental SSF",
    "San Mateo County dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in South San Francisco, CA - TP Dumpsters",
    description: "Fast, reliable dumpster rentals in South San Francisco. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/south-san-francisco",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/south-san-francisco" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - South San Francisco",
  description: "Fast, reliable dumpster rentals in South San Francisco, CA. Serving all South SF neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/south-san-francisco",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: { "@type": "PostalAddress", addressLocality: "South San Francisco", addressRegion: "CA", addressCountry: "US" },
  areaServed: [{ "@type": "City", name: "South San Francisco", "@id": "https://en.wikipedia.org/wiki/South_San_Francisco,_California" }],
  priceRange: "$$",
  openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "07:00", closes: "18:00" },
  hasOfferCatalog: {
    "@type": "OfferCatalog", name: "Dumpster Rental Sizes",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "10 Yard Dumpster Rental", description: "Compact dumpster ideal for tight spaces and heavy debris like soil, concrete, and bricks." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "20 Yard Dumpster Rental", description: "Versatile dumpster for kitchen/bathroom remodels, roofing projects, and yard cleanups." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "30 Yard Dumpster Rental", description: "Extra capacity dumpster for whole-home cleanouts, large renovations, and construction debris." } },
    ],
  },
};

export default function SouthSanFranciscoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <SouthSFHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...southSFAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="South San Francisco" faqs={southSFFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <SouthSFLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
