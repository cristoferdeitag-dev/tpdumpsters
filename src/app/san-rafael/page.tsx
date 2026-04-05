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
import SanRafaelHero from "./components/SanRafaelHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import SanRafaelLocation from "./components/SanRafaelLocation";

const sanRafaelFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in San Rafael?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If you&apos;re placing a dumpster on a public street or right-of-way in San Rafael, you&apos;ll
        need a temporary encroachment permit from Marin County or the City of San Rafael. Dumpsters
        placed on private driveways typically don&apos;t require permits. Our team can guide you through
        the process.
      </p>
    ),
  },
  {
    question: "Can you deliver dumpsters to hillside properties in San Rafael?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Many San Rafael neighborhoods like Sun Valley and Lucas Valley have steep, winding roads.
        Our drivers are experienced with hillside deliveries and can navigate tight driveways and narrow
        streets. Just provide your address and we&apos;ll confirm access.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for earthquake retrofit debris in San Rafael?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For earthquake retrofit projects, which are common in older San Rafael homes, a <strong>20-yard
        dumpster</strong> handles most foundation and structural debris. For larger seismic retrofits
        involving multiple rooms, the 30-yard is recommended.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in San Rafael?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">San Rafael customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Home renovations and kitchen/bathroom remodels</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Earthquake retrofit and foundation work</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Canal District property cleanups</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and yard debris removal</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts and garage cleanups</li>
        </ul>
      </>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in San Rafael?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> to most San Rafael neighborhoods when you call before noon.
        Downtown San Rafael, Terra Linda, and Gerstle Park are within our fastest delivery zone in Marin County.
      </p>
    ),
  },
  {
    question: "Do you serve all San Rafael ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every San Rafael ZIP code including 94901, 94903, 94912, 94913, and 94915.
        From Downtown to Marinwood and Lucas Valley, we deliver throughout San Rafael and all of
        Marin County.
      </p>
    ),
  },
];

const sanRafaelAbout = {
  cityName: "San Rafael",
  intro:
    "As the county seat of Marin County, San Rafael blends historic charm with modern living. From downtown renovations to hillside home projects in Terra Linda and Lucas Valley, the city sees a steady stream of construction and cleanup needs. TP Dumpsters understands the unique landscape of San Rafael — from navigating narrow residential streets in Gerstle Park to managing large-scale renovation debris in the Canal District. We&apos;re the trusted dumpster rental partner for homeowners, contractors, and property managers across San Rafael.",
  highlights: [
    "Expert navigation of San Rafael's hillside streets and narrow driveways",
    "Familiar with Marin County and City of San Rafael permit requirements",
    "Fast delivery to all San Rafael neighborhoods — Downtown to Lucas Valley",
    "Trusted by Marin County contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Earthquake retrofit and foundation repairs in older San Rafael homes",
    "Kitchen and bathroom remodels in Terra Linda and Dominican",
    "Canal District property renovations and cleanups",
    "Landscaping and yard debris removal in Peacock Gap",
    "Estate cleanouts across San Rafael residential neighborhoods",
    "Commercial renovation projects in Downtown San Rafael",
  ],
  closingText:
    "Whether you&apos;re a homeowner tackling a weekend cleanup or a contractor managing a major renovation in San Rafael, TP Dumpsters makes waste removal easy. We offer transparent pricing, same-day delivery, and the local expertise to handle Marin County&apos;s unique terrain. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in San Rafael, CA | Marin County Service - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in San Rafael, CA. Serving Downtown, Terra Linda, Gerstle Park, Canal District & all ZIP codes. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental San Rafael CA",
    "San Rafael dumpster rental",
    "roll-off dumpster San Rafael",
    "construction dumpster San Rafael",
    "San Rafael waste removal",
    "dumpster rental 94901",
    "dumpster rental 94903",
    "dumpster rental Marin County",
    "Terra Linda dumpster",
    "Downtown San Rafael dumpster rental",
    "Gerstle Park dumpster",
    "Canal District dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in San Rafael, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in San Rafael. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/san-rafael",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/san-rafael",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - San Rafael",
  description:
    "Fast, reliable dumpster rentals in San Rafael, CA. Serving all San Rafael neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/san-rafael",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Rafael",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "San Rafael",
      "@id": "https://en.wikipedia.org/wiki/San_Rafael,_California",
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

export default function SanRafaelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <SanRafaelHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...sanRafaelAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="San Rafael" faqs={sanRafaelFaqs} />
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
            Why Rent a Dumpster in San Rafael, California?
          </h2>
          <div className="text-[#555] text-base leading-[1.8] font-[var(--font-poppins)] space-y-4">
            <p>
              San Rafael, the county seat of Marin County, is a city where historic architecture meets
              modern renovation. Homeowners throughout neighborhoods like Terra Linda, Dominican, and
              Gerstle Park regularly undertake remodeling projects that generate significant waste.
              From earthquake retrofit work on older foundations to complete kitchen overhauls, having
              a reliable dumpster on-site keeps your project moving efficiently.
            </p>
            <p>
              The Canal District continues to see revitalization efforts, while hillside properties in
              Sun Valley and Lucas Valley present unique access challenges that require experienced
              drivers. TP Dumpsters brings local knowledge of San Rafael&apos;s terrain, permit
              requirements, and neighborhood regulations. We offer 10, 20, and 30-yard roll-off
              dumpsters with same-day delivery, transparent pricing, and bilingual support in English
              and Spanish. Whether you&apos;re a contractor managing multiple Marin County job sites or
              a homeowner clearing out a garage, call (510) 650-2083 for fast, dependable service.
            </p>
          </div>
        </div>
      </section>

      <SanRafaelLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
