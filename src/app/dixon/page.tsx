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
import DixonHero from "./components/DixonHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import DixonLocation from "./components/DixonLocation";

const dixonFaqs = [
  {
    question: "Can you deliver dumpsters to farms and rural properties in Dixon?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! We regularly deliver to <strong>farms, ranches, and rural properties</strong> throughout Dixon. Whether you need to clear agricultural debris, old fencing, or barn cleanout materials, our trucks can reach properties on rural roads and long driveways.
      </p>
    ),
  },
  {
    question: "What types of agricultural debris can I put in a dumpster?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Most agricultural and ranch debris is accepted, including:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Old fencing, posts, and wood structures</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Barn and shed demolition debris</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">General farm cleanup materials</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and yard waste</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Concrete, soil, and gravel</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          <strong>Not accepted:</strong> Hazardous materials, chemicals, pesticide containers, tires, and batteries.
        </p>
      </>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Dixon?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> to Dixon when you call before noon. Dixon is well within our Solano County service area, and our drivers are familiar with both the town streets and rural roads in the area.
      </p>
    ),
  },
  {
    question: "Do I need a permit to place a dumpster in Dixon?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If your dumpster is placed on your <strong>private property</strong> — driveway, yard, or farm — no permit is typically needed. For street placement in Dixon, you may need a permit from the City of Dixon. Given Dixon&apos;s smaller-town character, most customers place dumpsters on their own property without issue.
      </p>
    ),
  },
  {
    question: "Can you handle debris from new subdivision construction in Dixon?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Dixon has seen significant <strong>new subdivision development</strong> in recent years. We work with contractors and builders on new construction projects, providing ongoing dumpster service for framing debris, concrete, roofing materials, and general construction waste. We offer flexible scheduling for multi-phase projects.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for a rural property cleanup?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For rural property cleanups in Dixon, the <strong>30-yard dumpster</strong> is usually the best value — it handles large volumes of debris from barn cleanouts, property clearing, and demolition. For smaller projects like garage cleanouts or landscaping, the 10-yard or 20-yard works great.
      </p>
    ),
  },
  {
    question: "Do you serve the 95620 ZIP code?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve <strong>ZIP code 95620</strong>, which covers all of Dixon and the surrounding rural areas. From Downtown Dixon to Valley Glen, Homestead, and beyond — we deliver throughout the entire Dixon area.
      </p>
    ),
  },
];

const dixonAbout = {
  cityName: "Dixon",
  intro:
    "Dixon is a welcoming agricultural city in western Solano County, known for its farming heritage, small-town charm, and growing residential communities. As one of Solano County&apos;s most rapidly developing areas, Dixon sees steady demand for dumpster rentals — from new subdivision construction to rural property cleanups and home renovations. TP Dumpsters proudly serves Dixon&apos;s unique mix of agricultural properties, established neighborhoods, and new developments with reliable, affordable waste removal.",
  highlights: [
    "Experienced with rural property and farm deliveries",
    "Familiar with Dixon's growing subdivision developments",
    "Fast delivery to all Dixon neighborhoods — downtown to rural roads",
    "Trusted by Dixon contractors, farmers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Agricultural property cleanups and barn demolitions",
    "New home construction in Valley Glen and Homestead",
    "Ranch and farm debris removal across rural Dixon",
    "Home remodels and kitchen/bathroom renovations",
    "Estate cleanouts in established Dixon neighborhoods",
    "Landscaping and yard debris removal projects",
  ],
  closingText:
    "Whether you&apos;re a farmer clearing old equipment, a contractor building in Dixon&apos;s newest subdivisions, or a homeowner tackling a weekend project, TP Dumpsters delivers fast, affordable waste removal. We understand Dixon&apos;s agricultural roots and residential growth. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Dixon, CA | Agricultural & Residential - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Dixon, CA. Serving Downtown Dixon, Valley Glen, Homestead, farms & rural properties. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Dixon CA",
    "Dixon dumpster rental",
    "roll-off dumpster Dixon",
    "construction dumpster Dixon",
    "Dixon waste removal",
    "dumpster rental 95620",
    "farm dumpster rental Dixon",
    "agricultural debris removal Dixon",
    "Solano County dumpster rental",
    "rural property cleanup Dixon",
  ],
  openGraph: {
    title: "Dumpster Rental in Dixon, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Dixon. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/dixon",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/dixon",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Dixon",
  description:
    "Fast, reliable dumpster rentals in Dixon, CA. Serving farms, ranches, and all Dixon neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/dixon",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dixon",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Dixon",
      "@id": "https://en.wikipedia.org/wiki/Dixon,_California",
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

export default function DixonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <DixonHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...dixonAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Dixon" faqs={dixonFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <DixonLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
