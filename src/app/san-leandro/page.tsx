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
import SanLeandroHero from "./components/SanLeandroHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import SanLeandroLocation from "./components/SanLeandroLocation";

const sanLeandroFaqs = [
  {
    question: "How fast can I get a dumpster delivered in San Leandro?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        San Leandro is centrally located in our service area, so we offer <strong>same-day
        delivery</strong> for most neighborhoods when you call before noon. Whether you&apos;re
        near the Marina, in Washington Manor, or up in Bay-O-Vista, we can typically have a
        dumpster on your property within hours.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster on the street in San Leandro?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Placing a dumpster on a public street in San Leandro requires a temporary encroachment
        permit from the City of San Leandro Public Works Department. On your own driveway or
        private property, no permit is needed. We can help advise you on the best placement
        option for your project.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in San Leandro?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For most San Leandro home remodels — kitchens, bathrooms, or single-room renovations —
        a <strong>20-yard dumpster</strong> is the go-to choice. For larger whole-home renovations
        or if you&apos;re combining a remodel with a cleanout, the 30-yard gives you plenty of
        room. Small concrete or dirt jobs fit perfectly in the 10-yard.
      </p>
    ),
  },
  {
    question: "Do you deliver to Castro Valley, Hayward, and San Lorenzo too?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. We serve all areas surrounding San Leandro including <strong>Castro Valley,
        Hayward, San Lorenzo, Oakland, Alameda,</strong> and <strong>Cherryland</strong>. One call
        covers the entire area — no extra delivery fees for these nearby communities.
      </p>
    ),
  },
  {
    question: "What materials can I throw in a dumpster in San Leandro?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">We accept most common waste types for San Leandro rentals:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Household junk, old furniture, and general debris</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Construction waste (drywall, lumber, flooring, tile)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Concrete, asphalt, dirt, and soil (10-yard only)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Yard waste, branches, and green debris</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Appliances and mattresses (small extra fee applies)</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          <strong>Not accepted:</strong> Hazardous materials, paint, solvents, batteries, electronics, or tires (except with surcharge).
        </p>
      </>
    ),
  },
  {
    question: "How much does a dumpster rental cost in San Leandro?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        San Leandro dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster
        (7-day rental, 1 ton included). The 20-yard starts at $649 and the 30-yard at $749.
        Straightforward pricing with no hidden fees. Call <strong>(510) 650-2083</strong> for a
        precise quote based on your project needs.
      </p>
    ),
  },
];

const sanLeandroAbout = {
  cityName: "San Leandro",
  intro:
    "San Leandro sits at the heart of the East Bay corridor between Oakland and Hayward, making it one of the most accessible cities in Alameda County. With a mix of established mid-century homes, newer developments near the Marina district, and a thriving industrial area, San Leandro homeowners and contractors consistently need reliable dumpster service for projects of all sizes.",
  highlights: [
    "Central East Bay location — fast delivery from our nearby base",
    "Experienced with San Leandro's mix of older homes and new construction",
    "Serve the Marina district, residential neighborhoods, and industrial areas",
    "Trusted by San Leandro contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for seamless communication",
  ],
  commonProjects: [
    "Kitchen and bathroom remodels in Estudillo Estates & Bay-O-Vista",
    "Garage and estate cleanouts across Washington Manor & Broadmoor",
    "Construction debris removal for new developments near the Marina",
    "Roofing tear-offs and exterior renovations in Floresta Gardens",
    "Landscaping overhauls and yard debris removal in Farrelly Pond area",
    "Concrete and driveway demolition for property upgrades across San Leandro",
  ],
  closingText:
    "Whether you're remodeling a home in Estudillo Estates or clearing out a property in Washington Manor, TP Dumpsters delivers fast, affordable service anywhere in San Leandro. Transparent pricing, same-day availability, and local know-how. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in San Leandro, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in San Leandro, CA. 10, 20 & 30 yard roll-off dumpsters. Same-day delivery to all San Leandro neighborhoods. Bilingual support. Call (510) 650-2083",
  keywords: [
    "dumpster rental San Leandro CA",
    "San Leandro dumpster rental",
    "roll-off dumpster San Leandro",
    "construction dumpster San Leandro",
    "San Leandro waste removal",
    "dumpster rental 94577",
    "dumpster rental 94578",
    "dumpster rental 94579",
    "Washington Manor dumpster rental",
    "Estudillo Estates dumpster rental",
    "Bay-O-Vista dumpster rental",
    "San Leandro Marina dumpster",
    "cheap dumpster San Leandro CA",
    "junk removal San Leandro",
  ],
  openGraph: {
    title: "Dumpster Rental in San Leandro, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in San Leandro. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/san-leandro",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/san-leandro" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - San Leandro",
  description:
    "Affordable, reliable dumpster rentals in San Leandro, CA. Same-day delivery to all San Leandro neighborhoods and surrounding East Bay cities.",
  url: "https://tpdumpsters.com/san-leandro",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Leandro",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "San Leandro" },
    { "@type": "City", name: "Oakland" },
    { "@type": "City", name: "Hayward" },
    { "@type": "City", name: "Castro Valley" },
    { "@type": "City", name: "San Lorenzo" },
    { "@type": "City", name: "Alameda" },
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

export default function SanLeandroPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <SanLeandroHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...sanLeandroAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="San Leandro" faqs={sanLeandroFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <SanLeandroLocation />
      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[900px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-[24px] md:text-[30px] font-bold text-[#1a1a1a] mb-6 text-center">
            Why Rent a Dumpster in San Leandro, California?
          </h2>
          <div className="space-y-4 text-[#555] text-base leading-[1.8] font-[var(--font-poppins)]">
            <p>
              San Leandro is a vibrant East Bay city with established neighborhoods like Estudillo Estates, Washington Manor, and Bay-O-Vista where homeowners are constantly updating and improving their properties. Whether you&apos;re tearing out old flooring in a Broadmoor bungalow, clearing yard waste near Marina Park, or managing debris from a commercial renovation on East 14th Street, a dumpster rental makes the job effortless.
            </p>
            <p>
              San Leandro&apos;s proximity to Oakland and its own downtown revitalization efforts keep renovation activity high year-round. From kitchen and bathroom remodels to full estate cleanouts, TP Dumpsters delivers 10, 20, and 30 yard roll-off containers with same-day service, straightforward pricing, and no hidden fees — everything you need to keep your project on track.
            </p>
            <p>
              Ready to start? Book your San Leandro dumpster online for a $50 discount or call <a href="tel:+15106502083" className="text-tp-red font-semibold hover:underline">(510) 650-2083</a> for a free estimate. English and Spanish support available.
            </p>
          </div>
        </div>
      </section>
      <FloatingButtons />
      <Footer />
    </>
  );
}
