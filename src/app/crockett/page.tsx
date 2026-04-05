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
import CrockettHero from "./components/CrockettHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import CrockettLocation from "./components/CrockettLocation";

const crockettFaqs = [
  {
    question: "Can you deliver dumpsters to Crockett's narrow and steep streets?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Crockett is known for its steep hillside streets and tight turns. Our drivers are
        experienced with small-town deliveries and can navigate narrow roads like Winslow Street and
        Pomona Street. We&apos;ll confirm access before scheduling your delivery.
      </p>
    ),
  },
  {
    question: "What about dumpster delivery on steep hillside streets in Crockett?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Our trucks and drivers are equipped to handle Crockett&apos;s hilly terrain. We place dumpsters
        safely on sloped driveways and use best practices for hillside placement. Just share your
        address and we&apos;ll plan the best approach for your property.
      </p>
    ),
  },
  {
    question: "Do you handle historic home renovation debris in Crockett?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. Crockett has many charming historic homes that often require careful renovation.
        Our dumpsters are perfect for old plaster, lath, fixtures, and other renovation debris.
        A <strong>20-yard dumpster</strong> is the most popular choice for these projects.
      </p>
    ),
  },
  {
    question: "Can you deliver to projects near the Carquinez Strait?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We deliver throughout the Carquinez area including waterfront properties, Port Costa,
        and Crockett Hills. Whether your project is near the bridge or down by the strait, we can
        get a dumpster to you quickly.
      </p>
    ),
  },
  {
    question: "What if my street is too narrow for a standard dumpster delivery?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We understand that some Crockett streets have limited space. In these cases, we work with you
        to find the closest safe placement — whether that&apos;s on your driveway, a nearby turnout, or
        an alternate location. Call us to discuss your specific situation.
      </p>
    ),
  },
  {
    question: "Do you serve the Crockett ZIP code 94525?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve Crockett ZIP code 94525 and the surrounding Carquinez area including Downtown
        Crockett, Crockett Hills, Port Costa, and the Carquinez Strait waterfront.
      </p>
    ),
  },
];

const crockettAbout = {
  cityName: "Crockett",
  intro:
    "Crockett is a picturesque small town perched on the hills above the Carquinez Strait, known for its historic charm, stunning waterfront views, and close-knit community. With homes dating back over a century and streets that wind through steep hillsides, Crockett presents unique challenges for construction and renovation projects. TP Dumpsters specializes in delivering to small towns like Crockett, and our experienced drivers handle the narrow roads and steep grades with confidence.",
  highlights: [
    "Expert navigation of steep hillside streets and narrow roads",
    "Familiar with Crockett's historic home renovation needs",
    "Fast delivery to Crockett, Port Costa, and Carquinez area",
    "Trusted by Crockett homeowners and local contractors",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Historic home renovations in Downtown Crockett",
    "Hillside property cleanups and debris removal",
    "Kitchen and bathroom remodels on Winslow and Pomona Streets",
    "Construction projects near the Carquinez Strait waterfront",
    "Estate cleanouts and garage cleanups in Crockett Hills",
    "Landscaping and yard debris removal throughout Crockett",
  ],
  closingText:
    "Whether you're renovating a historic home on the hillside or clearing debris near the Carquinez waterfront, TP Dumpsters makes waste removal in Crockett easy. We offer transparent pricing, same-day delivery, and the small-town expertise to get your dumpster where it needs to go. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Crockett, CA | Carquinez Area - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Crockett, CA. Serving Downtown Crockett, Crockett Hills, Port Costa & ZIP code 94525. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Crockett CA",
    "Crockett dumpster rental",
    "roll-off dumpster Crockett",
    "construction dumpster Crockett",
    "Crockett waste removal",
    "dumpster rental 94525",
    "Carquinez dumpster rental",
    "Port Costa dumpster",
    "historic home renovation Crockett",
    "Crockett Hills dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Crockett, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Crockett. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/crockett",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/crockett",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Crockett",
  description:
    "Fast, reliable dumpster rentals in Crockett, CA. Serving all Crockett neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/crockett",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Crockett",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "Place",
      name: "Crockett",
      "@id": "https://en.wikipedia.org/wiki/Crockett,_California",
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

export default function CrockettPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <CrockettHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...crockettAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Crockett" faqs={crockettFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <CrockettLocation />

      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[800px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-2xl md:text-3xl font-bold text-[#222] mb-6 text-center">
            Why Rent a Dumpster in Crockett, California?
          </h2>
          <div className="text-[#555] text-base leading-[1.8] font-[var(--font-poppins)] space-y-4">
            <p>
              Crockett is one of the Bay Area&apos;s hidden gems — a small historic town with stunning
              views of the Carquinez Strait and homes full of character. Many of these older homes
              require periodic renovation, from updating aging plumbing and electrical systems to
              full kitchen and bathroom remodels. The town&apos;s steep hillside layout makes having a
              dumpster right on your property essential for keeping projects organized and safe.
            </p>
            <p>
              TP Dumpsters has the experience and equipment to deliver to Crockett&apos;s most challenging
              locations. Our drivers are skilled at navigating narrow, winding streets and placing
              dumpsters on sloped driveways. Whether you&apos;re working on a home near the waterfront
              or up in Crockett Hills, we bring the right size dumpster to your door with same-day
              service. Our transparent pricing means no surprises, and our bilingual team ensures
              smooth communication every step of the way.
            </p>
          </div>
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </>
  );
}
