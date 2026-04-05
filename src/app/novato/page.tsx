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
import NovatoHero from "./components/NovatoHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import NovatoLocation from "./components/NovatoLocation";

const novatoFaqs = [
  {
    question: "Can you deliver dumpsters to rural properties in Novato?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! Novato is the largest city in Marin by area, and we regularly deliver to rural
        properties in Indian Valley, Pacheco Valley, and Black Point. Our trucks can handle
        unpaved roads and long driveways. Just let us know your location for access confirmation.
      </p>
    ),
  },
  {
    question: "What size dumpster works best for ranch or agricultural debris in Novato?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For ranch cleanups and agricultural debris common in Novato&apos;s rural areas, a <strong>30-yard
        dumpster</strong> gives you the most capacity for bulky items like fencing, old structures, and
        vegetation. For smaller barn cleanouts, the 20-yard is a solid choice.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Novato?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If your dumpster is placed on a public street in Novato, you&apos;ll need a permit from the
        City of Novato. Dumpsters on private property or driveways typically don&apos;t require permits.
        We can help you navigate the process.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Novato?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Novato customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Rural property cleanups and ranch debris removal</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Hamilton Base area redevelopment projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Suburban home renovations and remodels</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Wildfire preparation and defensible space clearing</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and yard waste removal</li>
        </ul>
      </>
    ),
  },
  {
    question: "Can you handle wildfire preparation debris in Novato?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Many Novato homeowners create defensible space around their properties for wildfire
        prevention. Our dumpsters are perfect for vegetation clearing, dead tree removal, and brush
        cleanup. The 20-yard handles most residential defensible space projects.
      </p>
    ),
  },
  {
    question: "Do you serve all Novato ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every Novato ZIP code including 94945, 94947, 94948, and 94949. From
        Downtown Novato to Bel Marin Keys and all points in between, we deliver throughout the
        entire Novato area.
      </p>
    ),
  },
];

const novatoAbout = {
  cityName: "Novato",
  intro:
    "Novato is the largest city in Marin County by area, offering a unique mix of suburban neighborhoods, rural properties, and the redeveloping Hamilton Base. From new construction in Hamilton to ranch cleanups in Indian Valley, Novato generates diverse waste removal needs. TP Dumpsters has the fleet and local expertise to serve all of Novato — whether you're deep in Pacheco Valley or right off Highway 101 in Ignacio. We understand the wide-ranging terrain and access requirements that make Novato different from other Marin communities.",
  highlights: [
    "Experienced with rural property access and unpaved driveways",
    "Familiar with City of Novato permit requirements",
    "Fast delivery to all Novato neighborhoods — Downtown to Black Point",
    "Trusted by Novato contractors, ranchers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Rural property cleanups and ranch debris removal in Indian Valley",
    "Hamilton Base area redevelopment and construction projects",
    "Suburban home renovations in San Marin and Loma Verde",
    "Wildfire defensible space clearing across Novato properties",
    "Landscaping and vegetation removal in Pacheco Valley",
    "Commercial renovation projects in Downtown Novato",
  ],
  closingText:
    "Whether you're clearing a rural lot, renovating a suburban home, or managing a construction project in Novato, TP Dumpsters delivers reliable waste removal across all of Marin County's largest city. Transparent pricing, same-day availability, and bilingual support. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Novato, CA | Fast Delivery - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Novato, CA. Serving Hamilton, Ignacio, Indian Valley, San Marin & all ZIP codes. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Novato CA",
    "Novato dumpster rental",
    "roll-off dumpster Novato",
    "construction dumpster Novato",
    "Novato waste removal",
    "dumpster rental 94945",
    "dumpster rental 94947",
    "dumpster rental Marin County",
    "Hamilton dumpster rental",
    "San Marin dumpster",
    "Indian Valley dumpster rental",
    "Bel Marin Keys dumpster",
  ],
  openGraph: {
    title: "Dumpster Rental in Novato, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Novato. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/novato",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/novato",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Novato",
  description:
    "Fast, reliable dumpster rentals in Novato, CA. Serving all Novato neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/novato",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Novato",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Novato",
      "@id": "https://en.wikipedia.org/wiki/Novato,_California",
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

export default function NovatoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <NovatoHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...novatoAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Novato" faqs={novatoFaqs} />
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
            Why Rent a Dumpster in Novato, California?
          </h2>
          <div className="text-[#555] text-base leading-[1.8] font-[var(--font-poppins)] space-y-4">
            <p>
              Novato stands out as Marin County&apos;s largest city, spanning from the suburban
              neighborhoods of San Marin and Loma Verde to the rural expanses of Indian Valley and
              Black Point. This diversity means homeowners and contractors face a wide range of
              waste disposal needs — from suburban kitchen remodels to large-scale ranch property
              cleanups. The ongoing redevelopment of the former Hamilton Air Force Base adds even
              more construction activity to the area.
            </p>
            <p>
              With wildfire risk a growing concern in Novato&apos;s hillside and rural zones, many
              residents create defensible space that generates significant brush and vegetation
              debris. TP Dumpsters provides 10, 20, and 30-yard roll-off containers with same-day
              delivery to every corner of Novato. Our drivers know the back roads, handle long
              driveways, and deliver with care. Transparent pricing, bilingual support in English
              and Spanish, and reliable pickup make us Novato&apos;s go-to dumpster rental service.
              Call (510) 650-2083 today.
            </p>
          </div>
        </div>
      </section>

      <NovatoLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
