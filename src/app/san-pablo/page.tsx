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
import SanPabloHero from "./components/SanPabloHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import SanPabloLocation from "./components/SanPabloLocation";

const sanPabloFaqs = [
  {
    question: "How quickly can I get a dumpster delivered in San Pablo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout San Pablo and West
        Contra Costa. Whether you&apos;re on Rumrill Blvd, in Rollingwood, or near Giant Road,
        we can typically have a dumpster on-site within hours when you call before noon.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home cleanout in San Pablo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a typical San Pablo home cleanout, a <strong>20-yard dumpster</strong> is the most
        popular choice. It fits furniture, appliances, boxes, and general household junk. For
        smaller garage or single-room cleanouts, a 10-yard works well. For whole-house cleanouts
        or renovation debris, go with the 30-yard.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in San Pablo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on your private property or driveway, no permit is typically
        required in San Pablo. For street placement, you may need a temporary permit from the
        City of San Pablo. Our team can advise on the best placement for your specific location.
      </p>
    ),
  },
  {
    question: "Do you serve Richmond, El Cerrito, and Pinole too?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve all of West Contra Costa including <strong>Richmond, El Cerrito, Pinole,
        Hercules,</strong> and El Sobrante. San Pablo&apos;s central location on I-80 means
        we can quickly reach any West County address — no extra travel charges.
      </p>
    ),
  },
  {
    question: "Can I use a dumpster for a commercial project in San Pablo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! San Pablo&apos;s industrial and commercial areas along San Pablo Avenue and
        Giant Road frequently use our dumpsters for <strong>business cleanouts, warehouse
        clearing, and commercial renovation</strong>. We offer flexible rental periods and can
        accommodate multi-dumpster deliveries for larger projects.
      </p>
    ),
  },
  {
    question: "How much does a dumpster rental cost in San Pablo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        San Pablo dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster
        (7-day rental, 1 ton included). The 20-yard starts at $649 and the 30-yard at $749.
        No hidden fees, no surprise charges. Call <strong>(510) 650-2083</strong> for an exact
        quote for your San Pablo project.
      </p>
    ),
  },
];

const sanPabloAbout = {
  cityName: "San Pablo",
  intro:
    "San Pablo sits at the heart of West Contra Costa County, offering an affordable and diverse community with easy access to I-80 and the greater Bay Area. With a mix of residential neighborhoods, commercial corridors, and industrial heritage, San Pablo properties regularly need dumpster service for home renovations, business cleanouts, and community improvement projects.",
  highlights: [
    "Fast delivery to all San Pablo neighborhoods and West Contra Costa",
    "Convenient I-80 access for quick service throughout West County",
    "Experienced with residential, commercial, and industrial cleanups",
    "Trusted by San Pablo contractors, homeowners, and business owners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Home remodels and kitchen/bath renovations in Rollingwood & El Portal Ridge",
    "Commercial cleanouts along San Pablo Avenue & Giant Road",
    "Garage and estate cleanouts across Downtown San Pablo",
    "Roofing tear-offs and exterior renovations on older homes",
    "Landscaping overhauls and yard debris removal",
    "Industrial property cleanup and warehouse clearing on Rumrill Blvd",
  ],
  closingText:
    "Whether you're renovating a home in Rollingwood or clearing out a commercial space on San Pablo Avenue, TP Dumpsters makes waste removal simple and affordable. Same-day delivery, transparent pricing, and a team that knows West County. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in San Pablo, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in San Pablo, CA. 10, 20 & 30 yard roll-off dumpsters for construction, remodels & cleanouts. Same-day delivery to San Pablo & West Contra Costa. Call (510) 650-2083",
  keywords: [
    "dumpster rental San Pablo CA",
    "San Pablo dumpster rental",
    "roll-off dumpster San Pablo",
    "construction dumpster San Pablo",
    "San Pablo waste removal",
    "dumpster rental 94806",
    "Rollingwood dumpster rental",
    "Richmond dumpster rental",
    "El Cerrito dumpster rental",
    "Pinole dumpster rental",
    "West Contra Costa dumpster",
    "cheap dumpster San Pablo CA",
    "junk removal San Pablo",
    "commercial dumpster San Pablo",
  ],
  openGraph: {
    title: "Dumpster Rental in San Pablo, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in San Pablo. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/san-pablo",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental in San Pablo, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in San Pablo. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/san-pablo" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - San Pablo",
  description:
    "Affordable, reliable dumpster rentals in San Pablo, CA. Same-day delivery to all San Pablo neighborhoods and West Contra Costa County.",
  url: "https://tpdumpsters.com/san-pablo",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Pablo",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "San Pablo" },
    { "@type": "City", name: "Richmond" },
    { "@type": "City", name: "El Cerrito" },
    { "@type": "City", name: "Pinole" },
    { "@type": "City", name: "Hercules" },
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

export default function SanPabloPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <SanPabloHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...sanPabloAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="San Pablo" faqs={sanPabloFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <SanPabloLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
