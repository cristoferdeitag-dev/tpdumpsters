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
import FairfaxHero from "./components/FairfaxHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import FairfaxLocation from "./components/FairfaxLocation";

const fairfaxFaqs = [
  {
    question: "Can you deliver dumpsters on narrow hillside roads in Fairfax?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Fairfax is known for its narrow, winding hillside roads in areas like Cascade Canyon,
        White Hill, and Iron Springs. Our drivers are experienced with tight access and steep
        driveways throughout Marin County. Just provide your address and we&apos;ll confirm access
        before delivery.
      </p>
    ),
  },
  {
    question: "Do you offer eco-friendly disposal options in Fairfax?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We&apos;re committed to responsible waste management. We sort and recycle materials whenever
        possible, diverting waste from landfills. For Fairfax&apos;s environmentally conscious community,
        we ensure your debris is handled in the most sustainable way available.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for a cabin or cottage renovation in Fairfax?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For smaller cabin or cottage renovations common in Fairfax, a <strong>10-yard dumpster</strong> often
        works well for tight spaces and limited access. For larger projects involving multiple rooms
        or full remodels, the <strong>20-yard</strong> provides more capacity while still fitting on
        smaller driveways.
      </p>
    ),
  },
  {
    question: "Can you access mountain area properties in Fairfax?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! We regularly deliver to properties in Fairfax&apos;s more remote mountain areas
        including Cascade Canyon and the areas near White Hill and Deer Park. Our experienced drivers
        know how to navigate the terrain and can work with you to find the best dumpster placement.
      </p>
    ),
  },
  {
    question: "What challenges come with small lot dumpster placement in Fairfax?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Many Fairfax properties have smaller lots with limited driveway space. Our <strong>10-yard
        dumpster</strong> (12&apos;L × 8&apos;W × 2.5&apos;H) is designed for exactly these situations.
        We&apos;ll assess your property and recommend the best size and placement to maximize your
        usable space during the project.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Fairfax?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Fairfax customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Cabin and cottage renovations</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Kitchen and bathroom remodels</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and yard debris removal</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts and garage cleanups</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Deck and outdoor structure demolition</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Fairfax ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every Fairfax ZIP code including 94930 and 94978. From Downtown Fairfax to
        Cascade Canyon and White Hill, we deliver throughout Fairfax and all of Marin County.
      </p>
    ),
  },
];

const fairfaxAbout = {
  cityName: "Fairfax",
  intro:
    "Fairfax is a unique, bohemian town nestled in the hills of western Marin County, known for its eclectic character, mountain trails, and tight-knit community. From cottage renovations in the Manor neighborhood to cabin updates near Cascade Canyon, Fairfax homeowners frequently take on improvement projects that generate construction debris. TP Dumpsters understands the special challenges of working in Fairfax — from navigating narrow hillside roads to fitting dumpsters on smaller lots with limited access.",
  highlights: [
    "Expert navigation of Fairfax's narrow hillside roads and canyon driveways",
    "Familiar with Town of Fairfax permit requirements for street placement",
    "Fast delivery to all neighborhoods — Downtown to Cascade Canyon",
    "Eco-conscious disposal practices for Fairfax's green community",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Cabin and cottage renovations throughout Fairfax",
    "Kitchen and bathroom remodels in Manor and Downtown",
    "Deck and outdoor structure demolition in hillside properties",
    "Landscaping and yard debris removal near hiking trails",
    "Estate cleanouts across Fairfax's residential neighborhoods",
    "Roofing projects on Fairfax's smaller homes and cabins",
  ],
  closingText:
    "Whether you're a homeowner tackling a weekend cleanup or a contractor managing a renovation in Fairfax, TP Dumpsters makes waste removal easy. We offer transparent pricing, same-day delivery, and the local expertise to handle Marin County's unique terrain. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Fairfax, CA | West Marin Service - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Fairfax, CA. Serving Downtown, Manor, Cascade Canyon, White Hill & all ZIP codes. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Fairfax CA",
    "Fairfax dumpster rental",
    "roll-off dumpster Fairfax",
    "construction dumpster Fairfax",
    "Fairfax waste removal",
    "dumpster rental 94930",
    "dumpster rental 94978",
    "dumpster rental Marin County",
    "Cascade Canyon dumpster",
    "Downtown Fairfax dumpster rental",
    "Manor dumpster",
    "West Marin dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Fairfax, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Fairfax. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/fairfax",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/fairfax",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Fairfax",
  description:
    "Fast, reliable dumpster rentals in Fairfax, CA. Serving all Fairfax neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/fairfax",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Fairfax",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Fairfax",
      "@id": "https://en.wikipedia.org/wiki/Fairfax,_California",
    },
  ],
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "07:00",
    closes: "18:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dumpster Rental Sizes",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "10 Yard Dumpster Rental",
          description:
            "Compact dumpster ideal for tight spaces and heavy debris like soil, concrete, and bricks.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "20 Yard Dumpster Rental",
          description:
            "Versatile dumpster for kitchen/bathroom remodels, roofing projects, and yard cleanups.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "30 Yard Dumpster Rental",
          description:
            "Extra capacity dumpster for whole-home cleanouts, large renovations, and construction debris.",
        },
      },
    ],
  },
};

export default function FairfaxPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <FairfaxHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...fairfaxAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Fairfax" faqs={fairfaxFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />

      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[800px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-[24px] md:text-[30px] font-bold text-[#333] mb-6 text-center">
            Why Rent a Dumpster in Fairfax, California?
          </h2>
          <div className="text-[#555] text-base leading-[1.8] font-[var(--font-poppins)] space-y-4">
            <p>
              Fairfax is one of Marin County&apos;s most distinctive towns — a bohemian community
              tucked into the western hills where creativity meets nature. Homeowners in neighborhoods
              like Manor, Cascade Canyon, and Downtown frequently take on renovation and improvement
              projects, from updating cozy cabins to remodeling mid-century homes. With many
              properties on smaller lots with steep driveways, having the right-sized dumpster
              delivered by an experienced team is essential.
            </p>
            <p>
              Fairfax&apos;s narrow hillside roads and mountain terrain require drivers who know the
              area. TP Dumpsters brings local knowledge of Fairfax&apos;s streets, permit requirements,
              and the eco-conscious values of the community. We offer 10, 20, and 30-yard roll-off
              dumpsters with same-day delivery, transparent pricing, and bilingual support in English
              and Spanish. Whether you&apos;re a homeowner clearing out a garage or a contractor
              managing a renovation, call (510) 650-2083 for fast, dependable service.
            </p>
          </div>
        </div>
      </section>

      <FairfaxLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
