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
import RodeoHero from "./components/RodeoHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import RodeoLocation from "./components/RodeoLocation";

const rodeoFaqs = [
  {
    question: "What are the rules for dumpster placement in unincorporated Rodeo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        As an unincorporated community, Rodeo falls under Contra Costa County regulations. Dumpsters
        placed on private property typically don&apos;t require permits. For placement on county roads,
        you may need approval from the county. We&apos;ll help you navigate the requirements.
      </p>
    ),
  },
  {
    question: "Can you deliver to waterfront areas in Rodeo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We deliver to all areas of Rodeo including the marina and waterfront properties along
        San Pablo Bay. Our drivers are familiar with the local roads and access points throughout
        the community.
      </p>
    ),
  },
  {
    question: "Do you serve projects near the refinery area in Rodeo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. We provide dumpster rentals for residential and commercial projects throughout
        Rodeo, including areas near the refinery. Whether it&apos;s a home renovation or a larger
        cleanup project, we can deliver to your location.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for residential cleanups in Rodeo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For most residential cleanups in Rodeo, a <strong>20-yard dumpster</strong> handles the job
        perfectly. For smaller garage or shed cleanouts, the 10-yard is efficient. Larger renovation
        or construction projects benefit from our 30-yard option.
      </p>
    ),
  },
  {
    question: "Can you handle rural property debris removal in Rodeo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes. Many Rodeo properties have larger lots with more debris. We regularly handle yard waste,
        old fencing, shed demolition, and general property cleanup for rural and semi-rural properties
        in the Refugio Valley and surrounding areas.
      </p>
    ),
  },
  {
    question: "Do you serve the Rodeo ZIP code 94572?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve Rodeo ZIP code 94572 and all surrounding areas including Downtown Rodeo,
        Rodeo Hills, Rodeo Marina, Pacific Avenue, Parker Avenue, and Refugio Valley.
      </p>
    ),
  },
];

const rodeoAbout = {
  cityName: "Rodeo",
  intro:
    "Rodeo is a welcoming unincorporated community on the shores of San Pablo Bay in Contra Costa County. With a mix of residential neighborhoods, waterfront properties, and semi-rural lots, Rodeo residents regularly tackle home improvement and cleanup projects. TP Dumpsters has been serving the Rodeo community with reliable, affordable dumpster rentals — from quick residential cleanouts to larger construction debris removal.",
  highlights: [
    "Experienced with unincorporated area regulations and county rules",
    "Deliver to waterfront properties and marina areas",
    "Fast delivery to all Rodeo neighborhoods",
    "Trusted by Rodeo homeowners and local contractors",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Residential cleanups and garage cleanouts in Downtown Rodeo",
    "Waterfront property renovations near Rodeo Marina",
    "Home remodels in Rodeo Hills and Pacific Avenue",
    "Rural property debris removal in Refugio Valley",
    "Construction and demolition projects throughout Rodeo",
    "Yard waste and landscaping debris cleanup",
  ],
  closingText:
    "Whether you're clearing out a garage on Parker Avenue or renovating a home near the marina, TP Dumpsters makes waste removal in Rodeo simple. We offer transparent pricing, same-day delivery, and the local knowledge to handle your project. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Rodeo, CA | San Pablo Bay Area - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Rodeo, CA. Serving Downtown Rodeo, Rodeo Hills, Rodeo Marina & ZIP code 94572. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Rodeo CA",
    "Rodeo dumpster rental",
    "roll-off dumpster Rodeo",
    "construction dumpster Rodeo",
    "Rodeo waste removal",
    "dumpster rental 94572",
    "San Pablo Bay dumpster rental",
    "Rodeo Hills dumpster",
    "residential cleanup Rodeo",
    "Rodeo Marina dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Rodeo, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Rodeo. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/rodeo",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/rodeo",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Rodeo",
  description:
    "Fast, reliable dumpster rentals in Rodeo, CA. Serving all Rodeo neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/rodeo",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rodeo",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "Place",
      name: "Rodeo",
      "@id": "https://en.wikipedia.org/wiki/Rodeo,_California",
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

export default function RodeoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <RodeoHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...rodeoAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Rodeo" faqs={rodeoFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <RodeoLocation />

      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[800px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-2xl md:text-3xl font-bold text-[#222] mb-6 text-center">
            Why Rent a Dumpster in Rodeo, California?
          </h2>
          <div className="text-[#555] text-base leading-[1.8] font-[var(--font-poppins)] space-y-4">
            <p>
              Rodeo is a tight-knit community along the San Pablo Bay where homeowners enjoy larger
              lots and a more relaxed pace of life. This also means more property to maintain — from
              overgrown yards and old outbuildings to aging homes that need renovation. Whether you&apos;re
              clearing debris from a waterfront property near the marina or gutting a kitchen on
              Pacific Avenue, having a dumpster on-site keeps your project moving efficiently.
            </p>
            <p>
              As an unincorporated area under Contra Costa County, Rodeo has its own set of rules for
              waste disposal and dumpster placement. TP Dumpsters knows these regulations inside and
              out, so you don&apos;t have to worry about compliance. We deliver 10, 20, and 30-yard
              roll-off dumpsters directly to your property with same-day availability. Our bilingual
              team is always ready to help you choose the right size and schedule your delivery around
              your timeline.
            </p>
          </div>
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </>
  );
}
