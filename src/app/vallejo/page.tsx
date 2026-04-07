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
import VallejoHero from "./components/VallejoHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import VallejoLocation from "./components/VallejoLocation";

const vallejoFaqs = [
  {
    question: "How quickly can I get a dumpster delivered in Vallejo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout Vallejo, Benicia,
        and Solano County. Whether you&apos;re in Downtown Vallejo, Mare Island, Glen Cove, or
        Hiddenbrooke, we can typically have a dumpster delivered within hours when you call
        before noon.
      </p>
    ),
  },
  {
    question: "Do you serve Mare Island and the redevelopment area?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. We regularly deliver dumpsters to <strong>Mare Island</strong> for renovation
        projects, Navy base redevelopment work, and commercial construction. Our trucks navigate
        the island without issue, and we&apos;re experienced with the unique needs of historical
        restoration and large-scale redevelopment projects.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home renovation in Vallejo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For typical Vallejo home renovations — kitchen or bathroom remodels, room additions, or
        garage conversions — a <strong>20-yard dumpster</strong> is the most popular choice.
        For whole-home renovations or if you&apos;re combining demolition with a major cleanout,
        step up to the 30-yard. Small concrete or yard projects work well with the 10-yard.
      </p>
    ),
  },
  {
    question: "Do you deliver to Benicia, American Canyon, and other nearby cities?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve all of Solano County including <strong>Benicia, American Canyon, Hercules,
        Crockett,</strong> and <strong>Rodeo</strong>. One call covers the entire waterfront
        corridor — no extra fees for these nearby communities.
      </p>
    ),
  },
  {
    question: "What materials can I put in a dumpster rental in Vallejo?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">We accept most common debris types for Vallejo projects:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">General household junk, furniture, and debris</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Construction and demolition waste (drywall, lumber, flooring)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Concrete, dirt, and soil (10-yard only, weight limits apply)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Yard waste, landscaping debris, and tree trimmings</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing materials, shingles, and siding</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          <strong>Not accepted:</strong> Hazardous materials, paint, chemicals, batteries, electronics, or tires (except with surcharge).
        </p>
      </>
    ),
  },
  {
    question: "How much does a dumpster rental cost in Vallejo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Vallejo dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster
        (7-day rental, 1 ton included). The 20-yard starts at $649 and the 30-yard at $749.
        Transparent pricing with no hidden fees. Call <strong>(510) 650-2083</strong> for an
        exact quote tailored to your Vallejo project.
      </p>
    ),
  },
];

const vallejoAbout = {
  cityName: "Vallejo",
  intro:
    "Vallejo is a vibrant waterfront city at the gateway to Solano County, known for its rich maritime history, Mare Island redevelopment, and growing arts scene. With a mix of historic homes undergoing renovation, new construction in Hiddenbrooke, and ongoing transformation at the former Navy base, Vallejo has a constant demand for reliable dumpster service.",
  highlights: [
    "Experienced with Vallejo's waterfront access and Mare Island projects",
    "Fast delivery throughout Solano County and the I-80 corridor",
    "Trusted by Vallejo contractors, artists, and homeowners",
    "Mare Island redevelopment and historic renovation specialists",
    "Bilingual team (English & Spanish) for seamless communication",
  ],
  commonProjects: [
    "Mare Island Navy base redevelopment and historic restoration",
    "Home renovations and flips in Downtown Vallejo & Glen Cove",
    "New construction cleanup in Hiddenbrooke & Country Club Crest",
    "Estate cleanouts and garage cleanups across South Vallejo & Springs",
    "Roofing tear-offs and exterior work on waterfront properties",
    "Landscaping and yard debris removal throughout Benicia and American Canyon",
  ],
  closingText:
    "Whether you're restoring a historic home on Mare Island or renovating a property in Glen Cove, TP Dumpsters delivers fast, affordable dumpster rentals anywhere in Vallejo and Solano County. Same-day delivery, transparent pricing, and waterfront expertise. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Vallejo, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Vallejo, CA. 10, 20 & 30 yard roll-off dumpsters. Same-day delivery to Vallejo, Benicia & Solano County. Mare Island specialists. Call (510) 650-2083",
  keywords: [
    "dumpster rental Vallejo CA",
    "Vallejo dumpster rental",
    "roll-off dumpster Vallejo",
    "construction dumpster Vallejo",
    "Vallejo waste removal",
    "dumpster rental 94589",
    "dumpster rental 94590",
    "dumpster rental 94591",
    "dumpster rental 94592",
    "Mare Island dumpster rental",
    "Glen Cove dumpster rental",
    "Benicia dumpster rental",
    "Hiddenbrooke dumpster rental",
    "cheap dumpster Vallejo CA",
    "junk removal Vallejo",
  ],
  openGraph: {
    title: "Dumpster Rental in Vallejo, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Vallejo. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/vallejo",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/vallejo" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Vallejo",
  description:
    "Affordable, reliable dumpster rentals in Vallejo, CA. Same-day delivery to all Vallejo neighborhoods, Benicia, and Solano County.",
  url: "https://tpdumpsters.com/vallejo",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vallejo",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Vallejo" },
    { "@type": "City", name: "Benicia" },
    { "@type": "City", name: "American Canyon" },
    { "@type": "City", name: "Hercules" },
    { "@type": "City", name: "Crockett" },
    { "@type": "City", name: "Rodeo" },
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

export default function VallejoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <VallejoHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...vallejoAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Vallejo" faqs={vallejoFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <VallejoLocation />
      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[900px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-[24px] md:text-[30px] font-bold text-[#1a1a1a] mb-6 text-center">
            Why Rent a Dumpster in Vallejo, California?
          </h2>
          <div className="space-y-4 text-[#555] text-base leading-[1.8] font-[var(--font-poppins)]">
            <p>
              Vallejo is a waterfront city with rich history and neighborhoods like Glen Cove, Hiddenbrooke, and South Vallejo that are experiencing renewed investment and renovation activity. Whether you&apos;re gutting a fixer-upper on Mare Island, cleaning up after a storm in Country Club Crest, or handling demolition waste from a commercial remodel on Sonoma Boulevard, a dumpster rental streamlines the process.
            </p>
            <p>
              With Vallejo&apos;s affordable housing market attracting new buyers and investors, home renovation projects are more common than ever. From flooring removal to full property cleanouts, TP Dumpsters delivers 10, 20, and 30 yard roll-off containers to any Vallejo address with same-day service and all-inclusive pricing — no surprise fees at pickup.
            </p>
            <p>
              Start your Vallejo project with confidence. Book your dumpster online for a $50 discount or call <a href="tel:+15106502083" className="text-tp-red font-semibold hover:underline">(510) 650-2083</a> today. Bilingual service available in English and Spanish.
            </p>
          </div>
        </div>
      </section>
      <FloatingButtons />
      <Footer />
    </>
  );
}
