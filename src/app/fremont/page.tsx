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
import FremontHero from "./components/FremontHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import FremontLocation from "./components/FremontLocation";

const fremontFaqs = [
  {
    question: "How fast can I get a dumpster delivered in Fremont?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> throughout Fremont when you call before noon.
        Niles, Mission San Jose, Warm Springs, Irvington, and all Fremont districts are covered.
        Newark and Union City are included in our Fremont delivery zone too.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster on the street in Fremont?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Placing a dumpster on your own driveway or property in Fremont usually requires no permit. For
        street or public right-of-way placement, you&apos;ll need a temporary encroachment permit from
        the City of Fremont. We can guide you through the process.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for new construction debris in Fremont?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For new construction and large remodeling projects — common in Fremont&apos;s growing Warm Springs
        and Ardenwood areas — a <strong>30-yard dumpster</strong> is the best choice. For smaller remodels
        or single-room renovations, the 20-yard works great. Concrete and dirt go in the 10-yard.
      </p>
    ),
  },
  {
    question: "Do you deliver to Newark and Union City?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! <strong>Newark and Union City</strong> are part of our core Fremont service area. We also
        deliver to nearby Milpitas and Hayward. One call covers the entire Tri-City area with no extra
        delivery fees for these communities.
      </p>
    ),
  },
  {
    question: "What materials can I put in the dumpster?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">We accept most common waste types:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">General household debris and junk</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Construction and demolition waste</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Concrete, dirt, and soil (10-yard only)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Yard waste and landscaping debris</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Furniture, appliances, mattresses (extra fee)</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          <strong>Not accepted:</strong> Hazardous materials, paint, chemicals, tires (except with extra fee), batteries, or electronics.
        </p>
      </>
    ),
  },
  {
    question: "How much does a dumpster rental cost in Fremont?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Our Fremont dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster
        (7-day rental, 1 ton included). 20-yard starts at $649 and 30-yard at $749.
        Transparent pricing with no hidden fees. Call <strong>(510) 650-2083</strong> for
        an exact quote based on your project.
      </p>
    ),
  },
];

const fremontAbout = {
  cityName: "Fremont",
  intro:
    "Fremont is the South Bay's gateway — a booming city where tech innovation meets suburban living. With large residential lots, new construction in Warm Springs, and established neighborhoods like Niles and Mission San Jose, Fremont generates constant demand for reliable dumpster service. TP Dumpsters delivers fast, affordable roll-off dumpsters across Fremont, Newark, and Union City for everything from new builds to weekend cleanouts.",
  highlights: [
    "Serving Fremont's booming construction and remodeling market",
    "Easy access to all Fremont districts via 880 and 680",
    "Same-day delivery to Niles, Warm Springs, Mission San Jose & all neighborhoods",
    "Trusted by Fremont contractors, builders, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "New home construction debris removal in Warm Springs and Ardenwood",
    "Kitchen and bathroom remodels in Mission San Jose and Irvington",
    "Estate cleanouts and garage cleanups in Niles and Centerville",
    "Landscaping and yard debris removal across Fremont's large lots",
    "Concrete and driveway demolition for foundation projects",
    "Commercial tenant improvements and warehouse cleanouts in Newark",
  ],
  closingText:
    "Whether you're building new, remodeling, or just clearing out years of clutter, TP Dumpsters makes waste removal in Fremont easy and affordable. We offer transparent pricing, same-day delivery, and dependable service. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Fremont, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Fremont, CA. 10, 20 & 30 yard roll-off dumpsters. Same-day delivery to Niles, Mission San Jose, Warm Springs & all neighborhoods. Call (510) 650-2083",
  keywords: [
    "dumpster rental Fremont CA",
    "Fremont dumpster rental",
    "roll-off dumpster Fremont",
    "construction dumpster Fremont",
    "Fremont waste removal",
    "dumpster rental 94536",
    "dumpster rental 94538",
    "Newark dumpster rental",
    "Union City dumpster rental",
    "Warm Springs dumpster rental",
    "Mission San Jose dumpster rental",
    "cheap dumpster Fremont CA",
    "junk removal Fremont",
  ],
  openGraph: {
    title: "Dumpster Rental in Fremont, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Fremont. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/fremont",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/fremont" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Fremont",
  description:
    "Affordable, reliable dumpster rentals in Fremont, CA. Same-day delivery to all Fremont neighborhoods, Newark, and Union City.",
  url: "https://tpdumpsters.com/fremont",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Fremont",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Fremont" },
    { "@type": "City", name: "Newark" },
    { "@type": "City", name: "Union City" },
    { "@type": "City", name: "Milpitas" },
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

export default function FremontPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <FremontHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...fremontAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Fremont" faqs={fremontFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <FremontLocation />
      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[900px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-[24px] md:text-[30px] font-bold text-[#1a1a1a] mb-6 text-center">
            Why Rent a Dumpster in Fremont, California?
          </h2>
          <div className="space-y-4 text-[#555] text-base leading-[1.8] font-[var(--font-poppins)]">
            <p>
              Fremont is one of the Bay Area&apos;s largest cities, with diverse neighborhoods like Niles, Warm Springs, Irvington, and Mission San Jose where homeowners and contractors regularly take on renovation and cleanup projects. Whether you&apos;re remodeling a home near Lake Elizabeth, clearing construction debris in Ardenwood, or cleaning out a commercial space along Auto Mall Parkway, a dumpster rental keeps your worksite organized.
            </p>
            <p>
              With Fremont&apos;s booming tech corridor and new residential developments in Warm Springs, there&apos;s always a need for efficient waste hauling. TP Dumpsters offers 10, 20, and 30 yard roll-off containers ideal for everything from small garage cleanouts to major demolition projects. Our containers are delivered on your schedule with transparent, all-inclusive pricing.
            </p>
            <p>
              Book your Fremont dumpster rental online today and get an instant 5% discount, or call <a href="tel:+15106502083" className="text-tp-red font-semibold hover:underline">(510) 650-2083</a> to speak with our team. We offer same-day delivery and bilingual support throughout Fremont.
            </p>
          </div>
        </div>
      </section>
      <FloatingButtons />
      <Footer />
    </>
  );
}
