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
import LivermoreHero from "./components/LivermoreHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import LivermoreLocation from "./components/LivermoreLocation";

const livermoreFaqs = [
  {
    question: "How quickly can I get a dumpster delivered in Livermore?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout Livermore and the
        Tri-Valley area. Whether you&apos;re in Downtown Livermore, Ruby Hill, South Livermore,
        or Springtown, we can typically have a dumpster on your property within hours when you
        call before noon.
      </p>
    ),
  },
  {
    question: "What size dumpster works best for large Livermore properties and ranches?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Livermore&apos;s larger properties and ranch-style homes often generate more debris than
        typical suburban projects. For major cleanouts, landscaping overhauls, or whole-property
        renovations, the <strong>30-yard dumpster</strong> is ideal. For smaller projects like
        single-room remodels or yard cleanups, the 20-yard or 10-yard will work perfectly.
      </p>
    ),
  },
  {
    question: "Can you handle agricultural debris and vineyard waste in Livermore?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes. Livermore&apos;s wine country setting means we often handle <strong>agricultural
        debris, vineyard trimmings, tree branches,</strong> and <strong>soil from landscaping
        projects</strong>. Our dumpsters can accommodate these materials — just let us know what
        you&apos;re disposing of so we can recommend the right size and confirm disposal options.
      </p>
    ),
  },
  {
    question: "Do you deliver to Pleasanton, Dublin, and San Ramon too?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. We serve the entire Tri-Valley area including <strong>Pleasanton, Dublin,
        San Ramon,</strong> and nearby <strong>Tracy</strong>. One call covers the whole region —
        no extra delivery charges for these neighboring cities.
      </p>
    ),
  },
  {
    question: "What materials can I put in a dumpster rental in Livermore?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">We accept most common debris types for Livermore projects:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">General household junk, furniture, and old belongings</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Construction and demolition waste (lumber, drywall, fixtures)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Concrete, dirt, and soil (10-yard only, weight limits apply)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Yard waste, tree trimmings, vineyard cuttings, and landscaping debris</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing materials, shingles, and exterior siding</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          <strong>Not accepted:</strong> Hazardous materials, pesticides, paint, chemicals, batteries, electronics, or tires (except with surcharge).
        </p>
      </>
    ),
  },
  {
    question: "How much does a dumpster rental cost in Livermore?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Livermore dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster
        (7-day rental, 1 ton included). The 20-yard starts at $649 and the 30-yard at $749.
        Transparent pricing with no hidden fees. Call <strong>(510) 650-2083</strong> for an
        exact quote tailored to your Livermore project.
      </p>
    ),
  },
];

const livermoreAbout = {
  cityName: "Livermore",
  intro:
    "Livermore is a thriving Tri-Valley city known for its wine country charm, upscale neighborhoods, and sprawling properties. With large homes in Ruby Hill, ranch properties throughout South Livermore, and ongoing development across the region, Livermore homeowners and contractors need dependable dumpster service for projects ranging from estate cleanouts to major renovations.",
  highlights: [
    "Fast delivery to all Livermore and Tri-Valley neighborhoods",
    "Experienced with large properties, ranches, and wine country debris",
    "Serve Downtown, Ruby Hill, Springtown, and surrounding Tri-Valley cities",
    "Trusted by Livermore contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for seamless communication",
  ],
  commonProjects: [
    "Estate cleanouts and whole-property cleanups on large Livermore lots",
    "Upscale home renovations in Ruby Hill & Sunset neighborhoods",
    "Landscaping overhauls and vineyard debris removal in South Livermore",
    "New construction cleanup in North Livermore & Arroyo Mocho",
    "Roofing tear-offs and exterior renovations on ranch-style homes",
    "Concrete driveway and patio demolition for property upgrades",
  ],
  closingText:
    "Whether you're renovating a Ruby Hill estate or clearing debris from a South Livermore ranch, TP Dumpsters delivers fast, affordable service anywhere in Livermore and the Tri-Valley. Same-day availability, transparent pricing, and experience with large properties. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Livermore, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Livermore, CA. 10, 20 & 30 yard roll-off dumpsters. Same-day delivery to all Livermore & Tri-Valley areas. Large property specialists. Call (510) 650-2083",
  keywords: [
    "dumpster rental Livermore CA",
    "Livermore dumpster rental",
    "roll-off dumpster Livermore",
    "construction dumpster Livermore",
    "Livermore waste removal",
    "dumpster rental 94550",
    "dumpster rental 94551",
    "Ruby Hill dumpster rental",
    "South Livermore dumpster rental",
    "Tri-Valley dumpster rental",
    "Pleasanton dumpster rental",
    "Dublin dumpster rental",
    "cheap dumpster Livermore CA",
    "junk removal Livermore",
  ],
  openGraph: {
    title: "Dumpster Rental in Livermore, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Livermore. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/livermore",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/livermore" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Livermore",
  description:
    "Affordable, reliable dumpster rentals in Livermore, CA. Same-day delivery to all Livermore neighborhoods and Tri-Valley cities.",
  url: "https://tpdumpsters.com/livermore",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Livermore",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Livermore" },
    { "@type": "City", name: "Pleasanton" },
    { "@type": "City", name: "Dublin" },
    { "@type": "City", name: "San Ramon" },
    { "@type": "City", name: "Tracy" },
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

export default function LivermorePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <LivermoreHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...livermoreAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Livermore" faqs={livermoreFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <LivermoreLocation />
      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[900px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-[24px] md:text-[30px] font-bold text-[#1a1a1a] mb-6 text-center">
            Why Rent a Dumpster in Livermore, California?
          </h2>
          <div className="space-y-4 text-[#555] text-base leading-[1.8] font-[var(--font-poppins)]">
            <p>
              Livermore is a thriving Tri-Valley city known for its wine country charm and growing neighborhoods like Springtown, Sunset East, and the expanding North Livermore area. Whether you&apos;re renovating a ranch-style home near downtown, clearing construction debris from a vineyard property, or cleaning out a commercial space along First Street, a dumpster rental simplifies waste management.
            </p>
            <p>
              With Livermore&apos;s downtown revitalization and new housing developments in areas like Cayetano Creek and Isabel, contractors and homeowners consistently need reliable waste hauling services. TP Dumpsters delivers 10, 20, and 30 yard containers to your Livermore location with same-day availability, transparent pricing, and no hidden fees for disposal or delivery.
            </p>
            <p>
              Get your Livermore project started right — book online for a $50 discount or call <a href="tel:+15106502083" className="text-tp-red font-semibold hover:underline">(510) 650-2083</a> for a free quote. We serve all of Livermore with fast delivery and bilingual customer support.
            </p>
          </div>
        </div>
      </section>
      <FloatingButtons />
      <Footer />
    </>
  );
}
