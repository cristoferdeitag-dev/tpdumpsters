import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
// PricingTable removed — replaced by SizesSection everywhere
import ErrorBoundary from "@/components/ErrorBoundary";
import SizesSection from "@/components/SizesSection";
import FaqsSection from "@/components/FaqsSection";
import DynamicReviews from "@/components/DynamicReviews";
import WhyUsSection from "@/components/WhyUsSection";
import DynamicGallery from "@/components/DynamicGallery";
import LocationSection from "@/components/LocationSection";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import FloatingButtons from "@/components/FloatingButtons";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in California's Bay Area. 10, 20 & 30 yard roll-off dumpsters for contractors, remodelers and everyday cleanups.",
  url: "https://tpdumpsters.com",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3201 Ramona Street",
    addressLocality: "Pinole",
    addressRegion: "CA",
    postalCode: "94564",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 38.004366,
    longitude: -122.298858,
  },
  areaServed: [
    "Castro Valley",
    "San Leandro",
    "Oakland",
    "Berkeley",
    "El Cerrito",
    "Richmond",
    "San Rafael",
    "Novato",
    "Petaluma",
    "Santa Rosa",
    "Napa",
    "Vallejo",
    "Concord",
    "Walnut Creek",
    "Hayward",
    "Pinole",
    "Fairfield",
    "Vacaville",
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
  sameAs: [],
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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <HeroSection />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />

      <SizesSection />
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      {/* LocationSection removed — using ServiceAreaMap instead */}
      <FloatingButtons />
      <ChatWidget />
      <Footer />
    </>
  );
}
