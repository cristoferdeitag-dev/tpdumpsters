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
import DiscoveryBayHero from "./components/DiscoveryBayHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import DiscoveryBayLocation from "./components/DiscoveryBayLocation";

const discoveryBayFaqs = [
  {
    question: "Can you deliver dumpsters to waterfront properties in Discovery Bay?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We regularly deliver to waterfront homes throughout Discovery Bay, including properties
        in Newport, Sand Point, and Ravenswood Shores. Our drivers are familiar with the community&apos;s
        layout and can access waterfront driveways without issue.
      </p>
    ),
  },
  {
    question: "How do I handle HOA rules for dumpster placement in Discovery Bay?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Many Discovery Bay neighborhoods have HOA guidelines for dumpster placement. We recommend
        checking with your HOA before scheduling. In most cases, placing the dumpster on your driveway
        is acceptable. We can help you choose the right size to minimize visual impact and stay compliant.
      </p>
    ),
  },
  {
    question: "What about access to the Delta area for dumpster delivery?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We serve the entire Discovery Bay and Delta area, including properties along Byron Highway.
        Our trucks can reach even the more remote locations in the eastern Contra Costa County Delta
        region. Just provide your address and we&apos;ll confirm delivery availability.
      </p>
    ),
  },
  {
    question: "Do you handle new construction debris in Discovery Bay?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. Discovery Bay continues to see new home construction and additions. Our
        <strong> 30-yard dumpsters</strong> are perfect for new construction debris, while 20-yard
        dumpsters handle most remodel projects. We can schedule recurring pickups for ongoing
        construction sites.
      </p>
    ),
  },
  {
    question: "What size dumpster works best for suburban renovation waste?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For typical home renovations in Discovery Bay, the <strong>20-yard dumpster</strong> is the
        most popular choice. It fits easily on most driveways and handles kitchen remodels, bathroom
        updates, and flooring projects. For larger whole-home renovations, consider the 30-yard.
      </p>
    ),
  },
  {
    question: "Do you serve the Discovery Bay ZIP code 94505?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve Discovery Bay ZIP code 94505 and all surrounding areas including Newport,
        Sand Point, Ravenswood Shores, The Lakes, and the Byron Highway area.
      </p>
    ),
  },
];

const discoveryBayAbout = {
  cityName: "Discovery Bay",
  intro:
    "Discovery Bay is a beautiful waterfront community in eastern Contra Costa County, known for its delta waterways, family-friendly neighborhoods, and active homeowners. With a mix of newer construction and established homes along the water, residents here frequently tackle renovation, landscaping, and property improvement projects. TP Dumpsters serves the entire Discovery Bay community with fast, reliable dumpster rental service that respects HOA guidelines and waterfront property needs.",
  highlights: [
    "Experienced with waterfront property deliveries and HOA compliance",
    "Serve the entire Delta area including Byron Highway",
    "Fast delivery to all Discovery Bay neighborhoods",
    "Trusted by Discovery Bay homeowners and builders",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Waterfront home renovations in Newport and Sand Point",
    "New construction debris removal throughout Discovery Bay",
    "Kitchen and bathroom remodels in Ravenswood Shores",
    "Landscaping and yard cleanups in The Lakes",
    "Garage and estate cleanouts across the community",
    "Dock and outdoor living space renovation debris",
  ],
  closingText:
    "Whether you're renovating a waterfront home in Newport or building an addition in Sand Point, TP Dumpsters makes waste removal in Discovery Bay simple. We offer transparent pricing, same-day delivery, and the local knowledge to work within your HOA guidelines. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Discovery Bay, CA | Delta Area - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Discovery Bay, CA. Serving Newport, Sand Point, Ravenswood Shores & ZIP code 94505. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Discovery Bay CA",
    "Discovery Bay dumpster rental",
    "roll-off dumpster Discovery Bay",
    "construction dumpster Discovery Bay",
    "Discovery Bay waste removal",
    "dumpster rental 94505",
    "Delta area dumpster rental",
    "Newport Discovery Bay dumpster",
    "waterfront dumpster rental",
    "Discovery Bay home renovation",
  ],
  openGraph: {
    title: "Dumpster Rental in Discovery Bay, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Discovery Bay. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/discovery-bay",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/discovery-bay",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Discovery Bay",
  description:
    "Fast, reliable dumpster rentals in Discovery Bay, CA. Serving all Discovery Bay neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/discovery-bay",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Discovery Bay",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "Place",
      name: "Discovery Bay",
      "@id": "https://en.wikipedia.org/wiki/Discovery_Bay,_California",
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

export default function DiscoveryBayPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <DiscoveryBayHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...discoveryBayAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Discovery Bay" faqs={discoveryBayFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <DiscoveryBayLocation />

      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[800px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-2xl md:text-3xl font-bold text-[#222] mb-6 text-center">
            Why Rent a Dumpster in Discovery Bay, California?
          </h2>
          <div className="text-[#555] text-base leading-[1.8] font-[var(--font-poppins)] space-y-4">
            <p>
              Discovery Bay is a thriving waterfront community where homeowners invest heavily in
              their properties. From updating kitchens and bathrooms in established homes to managing
              construction debris from new builds, there&apos;s always a project underway in this
              active community. The unique waterfront setting means many residents also tackle dock
              repairs, outdoor living space renovations, and landscaping projects that generate
              significant waste.
            </p>
            <p>
              TP Dumpsters understands the specific needs of Discovery Bay residents, including HOA
              requirements for dumpster placement and the importance of keeping waterfront properties
              clean during projects. We deliver 10, 20, and 30-yard roll-off dumpsters directly to
              your driveway with same-day service available. Our team knows the community layout from
              Newport to The Lakes, ensuring smooth delivery and pickup every time. Call us for
              transparent pricing and hassle-free service.
            </p>
          </div>
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </>
  );
}
