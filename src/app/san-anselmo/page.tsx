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
import SanAnselmoHero from "./components/SanAnselmoHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import SanAnselmoLocation from "./components/SanAnselmoLocation";

const sanAnselmoFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in San Anselmo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If you&apos;re placing a dumpster on a public street in San Anselmo, you&apos;ll likely need a
        temporary encroachment permit from the Town of San Anselmo. Dumpsters on private driveways
        typically don&apos;t require permits. Our team can guide you through the process.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for a Ross Valley home renovation?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a typical kitchen or bathroom remodel in the Ross Valley area, a <strong>20-yard dumpster</strong> is
        the most popular choice. For larger whole-home renovations in neighborhoods like Sleepy Hollow
        or Seminary, the 30-yard handles the extra volume easily.
      </p>
    ),
  },
  {
    question: "Can you deliver to creek-side properties in San Anselmo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Many San Anselmo properties sit near San Anselmo Creek and Fairfax Creek. Our drivers
        are experienced with the unique access requirements of creek-side homes, including narrow
        driveways and limited staging areas. We&apos;ll work with you to find the best placement.
      </p>
    ),
  },
  {
    question: "Can you handle historic home renovation debris in San Anselmo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! San Anselmo has many beautiful historic homes that generate renovation debris
        during restoration projects. Whether it&apos;s plaster, lath, old fixtures, or general
        construction waste, our dumpsters can handle it all. We accept most construction and
        demolition materials.
      </p>
    ),
  },
  {
    question: "Can you navigate hillside terrain in San Anselmo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Neighborhoods like Red Hill, Oak Knoll, and Sleepy Hollow have steep driveways and
        winding roads. Our drivers are experienced with hillside deliveries throughout Marin County
        and can navigate San Anselmo&apos;s varied terrain. Just provide your address and we&apos;ll
        confirm access.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in San Anselmo?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">San Anselmo customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Home renovations and kitchen/bathroom remodels</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Historic home restoration projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and yard debris removal</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts and garage cleanups</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Creek-side property improvements</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all San Anselmo ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every San Anselmo ZIP code including 94960 and 94979. From Downtown San Anselmo
        to Sleepy Hollow and Red Hill, we deliver throughout San Anselmo and all of Marin County.
      </p>
    ),
  },
];

const sanAnselmoAbout = {
  cityName: "San Anselmo",
  intro:
    "San Anselmo is a charming small town in the heart of Marin County's Ross Valley, known for its tree-lined streets, creek-side properties, and vibrant downtown. From vintage home renovations in the Seminary neighborhood to modern remodels in Sleepy Hollow, San Anselmo sees a steady flow of construction and improvement projects. TP Dumpsters understands the unique character of this Ross Valley community — from navigating narrow hillside streets to working around creek-side properties with limited access.",
  highlights: [
    "Expert navigation of San Anselmo's hillside streets and narrow driveways",
    "Familiar with Town of San Anselmo permit requirements for street placement",
    "Fast delivery to all neighborhoods — Downtown to Sleepy Hollow",
    "Trusted by Marin County contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Historic home renovations in Downtown San Anselmo and Seminary",
    "Kitchen and bathroom remodels in Sleepy Hollow and Oak Knoll",
    "Creek-side property improvements along San Anselmo Creek",
    "Landscaping and yard debris removal throughout San Anselmo",
    "Hillside property renovations in Red Hill and Sorich Ranch area",
    "Roofing projects across San Anselmo's residential neighborhoods",
  ],
  closingText:
    "Whether you're a homeowner tackling a weekend cleanup or a contractor managing a major renovation in San Anselmo, TP Dumpsters makes waste removal easy. We offer transparent pricing, same-day delivery, and the local expertise to handle Marin County's unique terrain. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in San Anselmo, CA | Ross Valley - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in San Anselmo, CA. Serving Downtown, Sleepy Hollow, Seminary, Red Hill & all ZIP codes. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental San Anselmo CA",
    "San Anselmo dumpster rental",
    "roll-off dumpster San Anselmo",
    "construction dumpster San Anselmo",
    "San Anselmo waste removal",
    "dumpster rental 94960",
    "dumpster rental 94979",
    "dumpster rental Marin County",
    "Sleepy Hollow dumpster",
    "Downtown San Anselmo dumpster rental",
    "Ross Valley dumpster",
    "Seminary dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in San Anselmo, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in San Anselmo. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/san-anselmo",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/san-anselmo",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - San Anselmo",
  description:
    "Fast, reliable dumpster rentals in San Anselmo, CA. Serving all San Anselmo neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/san-anselmo",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Anselmo",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "San Anselmo",
      "@id": "https://en.wikipedia.org/wiki/San_Anselmo,_California",
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

export default function SanAnselmoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <SanAnselmoHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...sanAnselmoAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="San Anselmo" faqs={sanAnselmoFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />

      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[800px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-[24px] md:text-[30px] font-bold text-[#333] mb-6 text-center">
            Why Rent a Dumpster in San Anselmo, California?
          </h2>
          <div className="text-[#555] text-base leading-[1.8] font-[var(--font-poppins)] space-y-4">
            <p>
              San Anselmo sits in the heart of Marin County&apos;s Ross Valley, where tree-lined streets
              and historic homes create a quintessential small-town California atmosphere. Homeowners
              in neighborhoods like Sleepy Hollow, Seminary, and Oak Knoll regularly take on renovation
              projects that need reliable waste removal. From updating vintage kitchens to clearing out
              years of accumulated belongings, having a dumpster on-site makes the job manageable.
            </p>
            <p>
              The town&apos;s creek-side properties and hillside terrain in areas like Red Hill and
              Sorich Ranch present unique access challenges that require experienced drivers. TP
              Dumpsters brings local knowledge of San Anselmo&apos;s streets, permit requirements, and
              neighborhood character. We offer 10, 20, and 30-yard roll-off dumpsters with same-day
              delivery, transparent pricing, and bilingual support in English and Spanish. Whether
              you&apos;re a contractor managing multiple Marin County job sites or a homeowner clearing
              out a garage, call (510) 650-2083 for fast, dependable service.
            </p>
          </div>
        </div>
      </section>

      <SanAnselmoLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
