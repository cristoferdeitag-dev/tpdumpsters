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
import PleasantonHero from "./components/PleasantonHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import PleasantonLocation from "./components/PleasantonLocation";

const pleasantonFaqs = [
  {
    question: "How much does a dumpster rental cost in Pleasanton?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Our Pleasanton dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster
        (7-day rental, 1 ton included). The 20-yard starts at <strong>$649</strong> and the 30-yard
        at <strong>$749</strong>. We offer transparent, flat-rate pricing with no hidden fees. Call{" "}
        <strong>(510) 650-2083</strong> or email contact@tpdumpsters.com for your exact quote.
      </p>
    ),
  },
  {
    question: "Can I get a construction dumpster for my Pleasanton remodel?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. Pleasanton is one of the busiest remodeling markets in the Tri-Valley, and we
        deliver construction dumpsters daily to neighborhoods like Ruby Hill, Vintage Hills, and
        Castlewood. Our <strong>20-yard</strong> handles most kitchen and bathroom remodels, while the{" "}
        <strong>30-yard</strong> is ideal for whole-home renovations and additions.
      </p>
    ),
  },
  {
    question: "Do you deliver dumpsters to Ruby Hill and gated communities?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes, we regularly deliver to Ruby Hill and other gated communities in Pleasanton. We work
        with HOA requirements and gate access procedures. Just provide us with the gate code or
        coordinate with your HOA for our delivery window, and we&apos;ll handle the rest professionally.
      </p>
    ),
  },
  {
    question: "What can I put in a dumpster rental in Pleasanton?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">We accept most common waste types for Pleasanton rentals:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Construction and demolition debris (drywall, lumber, tile)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">General household junk and furniture</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Yard waste, landscaping debris, and soil</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Concrete and asphalt (10-yard only, heavy debris)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Appliances and mattresses (small extra fee)</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          <strong>Not accepted:</strong> Hazardous materials, paint, chemicals, batteries, or electronics.
        </p>
      </>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Pleasanton?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> to most Pleasanton neighborhoods when you call
        before noon. Next-day delivery is available for all orders. Whether you&apos;re in Downtown
        Pleasanton, Stoneridge, Birdland, or out near the Foothill area, we&apos;ll get your dumpster
        there on time.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster on the street in Pleasanton?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If your dumpster is placed on your private driveway or property, no permit is needed. For
        street placement in Pleasanton, you may need a temporary encroachment permit from the City
        of Pleasanton Engineering Division. We recommend driveway placement whenever possible to
        avoid permit costs and keep your project moving quickly.
      </p>
    ),
  },
];

const pleasantonAbout = {
  cityName: "Pleasanton",
  intro:
    "Pleasanton is the heart of the Tri-Valley, renowned for its charming downtown, award-winning schools, and upscale residential neighborhoods. From high-end kitchen remodels in Ruby Hill to new construction projects near Stoneridge Mall, Pleasanton homeowners and contractors demand dependable, premium waste removal services.",
  highlights: [
    "Trusted by Pleasanton's top remodeling contractors and builders",
    "Experience with gated communities including Ruby Hill and Castlewood",
    "Driveway-safe placement with protective boards on every delivery",
    "Same-day delivery available across all Tri-Valley neighborhoods",
    "Bilingual team (English & Spanish) for clear, friendly communication",
  ],
  commonProjects: [
    "Luxury kitchen and bathroom remodels in Ruby Hill and Vintage Hills",
    "Construction debris removal for new additions in Stoneridge area",
    "Estate cleanouts and downsizing in established Pleasanton neighborhoods",
    "Landscaping overhauls and yard debris removal in Birdland",
    "Roofing tear-offs and siding replacement on Pleasanton homes",
    "Garage and storage cleanouts for families throughout the Tri-Valley",
  ],
  closingText:
    "Whether you're renovating a luxury home in Ruby Hill or cleaning out your garage in Birdland, TP Dumpsters provides Pleasanton with clean, reliable, and affordable dumpster service. Transparent pricing, premium placement, and Tri-Valley expertise — call us at (510) 650-2083 for your free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Pleasanton, CA | Tri-Valley Service - TP Dumpsters",
  description:
    "Premium dumpster rentals in Pleasanton, CA. 10, 20 & 30 yard roll-off dumpsters. Construction & remodel specialists. Same-day delivery to Ruby Hill, Birdland & all neighborhoods. Call (510) 650-2083",
  keywords: [
    "dumpster rental Pleasanton CA",
    "Pleasanton dumpster rental",
    "roll-off dumpster Pleasanton",
    "construction dumpster rental Pleasanton",
    "Pleasanton waste removal",
    "dumpster rental 94566",
    "dumpster rental 94588",
    "dumpster rental Ruby Hill",
    "Tri-Valley dumpster rental",
    "Dublin dumpster rental",
    "Livermore dumpster rental",
    "San Ramon dumpster rental",
    "home remodel dumpster Pleasanton",
    "junk removal Pleasanton CA",
  ],
  openGraph: {
    title: "Dumpster Rental in Pleasanton, CA - TP Dumpsters",
    description:
      "Premium dumpster rentals in Pleasanton. 10, 20 & 30 yard dumpsters. Tri-Valley specialists. Call (510) 650-2083",
    url: "https://tpdumpsters.com/pleasanton",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/pleasanton" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Pleasanton",
  description:
    "Premium dumpster rentals in Pleasanton, CA. Serving all Tri-Valley neighborhoods with same-day delivery and transparent pricing.",
  url: "https://tpdumpsters.com/pleasanton",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pleasanton",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Pleasanton" },
    { "@type": "City", name: "Dublin" },
    { "@type": "City", name: "Livermore" },
    { "@type": "City", name: "San Ramon" },
    { "@type": "City", name: "Danville" },
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

export default function PleasantonPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <PleasantonHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...pleasantonAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Pleasanton" faqs={pleasantonFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <PleasantonLocation />
      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[900px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-[24px] md:text-[30px] font-bold text-[#1a1a1a] mb-6 text-center">
            Why Rent a Dumpster in Pleasanton, California?
          </h2>
          <div className="space-y-4 text-[#555] text-base leading-[1.8] font-[var(--font-poppins)]">
            <p>
              Pleasanton is one of the Tri-Valley&apos;s most sought-after communities, with beautiful neighborhoods like Ruby Hill, Vintage Hills, and Birdland where homeowners regularly invest in property upgrades. Whether you&apos;re remodeling a home near Pleasanton Ridge, clearing out an estate in Del Prado, or managing construction waste from a project along Main Street, a roll-off dumpster keeps your worksite clean and efficient.
            </p>
            <p>
              Pleasanton&apos;s high property values and active real estate market drive a steady stream of home renovations, landscaping projects, and commercial build-outs. TP Dumpsters provides 10, 20, and 30 yard containers with all-inclusive pricing — delivery, pickup, and disposal included — making it easy for both DIY homeowners and licensed contractors to manage their waste responsibly.
            </p>
            <p>
              Book your Pleasanton dumpster online today and save $50, or call <a href="tel:+15106502083" className="text-tp-red font-semibold hover:underline">(510) 650-2083</a> for same-day service. Transparent pricing, bilingual support, and reliable delivery across Pleasanton.
            </p>
          </div>
        </div>
      </section>
      <FloatingButtons />
      <Footer />
    </>
  );
}
