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
import DublinHero from "./components/DublinHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import DublinLocation from "./components/DublinLocation";

const dublinFaqs = [
  {
    question: "How fast can I get a dumpster delivered in Dublin, CA?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout Dublin and the
        Tri-Valley. Whether you&apos;re in Dublin Ranch, Emerald Glen, or the new Jordan Ranch
        community, we can typically have a dumpster on-site within hours when you call before noon.
      </p>
    ),
  },
  {
    question: "What dumpster size do I need for new construction cleanup in Dublin?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        With Dublin&apos;s massive new construction boom — especially in Jordan Ranch, Wallis
        Ranch, and Fallon — a <strong>30-yard dumpster</strong> is the best choice for new
        builds and major renovations. For kitchen remodels, bathroom updates, or single-room
        projects, a 20-yard is usually perfect.
      </p>
    ),
  },
  {
    question: "Do I need a permit to place a dumpster in Dublin?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If you place the dumpster on your own driveway or private property, no permit is
        typically required in Dublin. Street placement may require a temporary encroachment
        permit from the City of Dublin. Most Dublin homes in newer communities have spacious
        driveways, making on-property placement easy.
      </p>
    ),
  },
  {
    question: "Do you also serve Pleasanton, San Ramon, and Livermore?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve the entire Tri-Valley and East Bay including <strong>Pleasanton, San Ramon,
        Livermore,</strong> and <strong>Castro Valley</strong>. One call covers dumpster delivery
        anywhere in the area — no extra travel charges for nearby cities.
      </p>
    ),
  },
  {
    question: "What can I throw in a dumpster rental in Dublin?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">We accept most common debris types for Dublin projects:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Construction and demolition waste (lumber, drywall, tile, siding)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Household junk, old furniture, and appliances</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Concrete, dirt, and soil (10-yard only, weight limits apply)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Yard waste, tree trimmings, and landscaping debris</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing materials and shingles</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          <strong>Not accepted:</strong> Hazardous waste, paint, chemicals, batteries, electronics, or flammable materials.
        </p>
      </>
    ),
  },
  {
    question: "How much does a dumpster rental cost in Dublin, CA?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Dublin dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster
        (7-day rental, 1 ton included). The 20-yard starts at $649 and the 30-yard at $749.
        Transparent pricing with no hidden fees. Call <strong>(510) 650-2083</strong> for an
        exact quote for your Dublin project.
      </p>
    ),
  },
];

const dublinAbout = {
  cityName: "Dublin",
  intro:
    "Dublin is one of the fastest-growing cities in the Tri-Valley, with massive new construction in planned communities like Jordan Ranch, Wallis Ranch, and Dublin Ranch. Young families, modern homes, and BART accessibility make Dublin a hub of activity — and all that growth means a steady demand for construction cleanup, home improvement debris removal, and move-in/move-out cleanouts.",
  highlights: [
    "Fast delivery to all Dublin neighborhoods and Tri-Valley communities",
    "Large inventory perfect for new construction and planned community projects",
    "Experienced with Dublin's rapid growth and modern home builds",
    "Trusted by Dublin builders, remodelers, and new homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "New construction cleanup in Jordan Ranch, Wallis Ranch, and Fallon",
    "Home remodels and upgrades in Dublin Ranch and Positano",
    "Move-in and move-out cleanouts for East Dublin families",
    "Backyard landscaping and hardscape projects in Emerald Glen",
    "Roofing tear-offs and exterior upgrades on West Dublin homes",
    "Garage cleanouts and decluttering across all Dublin neighborhoods",
  ],
  closingText:
    "Whether you're building a new home in Jordan Ranch or renovating in Dublin Ranch, TP Dumpsters makes waste removal simple and affordable. Same-day delivery, transparent pricing, and a team that keeps up with Dublin's growth. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Dublin, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Dublin, CA. 10, 20 & 30 yard roll-off dumpsters for construction, remodels & cleanouts. Same-day delivery to Dublin & East Bay. Call (510) 650-2083",
  keywords: [
    "dumpster rental Dublin CA",
    "Dublin CA dumpster rental",
    "roll-off dumpster Dublin",
    "construction dumpster Dublin",
    "Dublin waste removal",
    "dumpster rental 94568",
    "Dublin Ranch dumpster rental",
    "Jordan Ranch dumpster rental",
    "Pleasanton dumpster rental",
    "San Ramon dumpster rental",
    "Tri-Valley dumpster rental",
    "cheap dumpster Dublin CA",
    "junk removal Dublin CA",
  ],
  openGraph: {
    title: "Dumpster Rental in Dublin, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Dublin. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/dublin",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/dublin" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Dublin",
  description:
    "Affordable, reliable dumpster rentals in Dublin, CA. Same-day delivery to all Dublin neighborhoods and the East Bay.",
  url: "https://tpdumpsters.com/dublin",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dublin",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Dublin" },
    { "@type": "City", name: "Pleasanton" },
    { "@type": "City", name: "San Ramon" },
    { "@type": "City", name: "Livermore" },
    { "@type": "City", name: "Castro Valley" },
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

export default function DublinPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <DublinHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...dublinAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Dublin" faqs={dublinFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <DublinLocation />
      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[900px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-[24px] md:text-[30px] font-bold text-[#1a1a1a] mb-6 text-center">
            Why Rent a Dumpster in Dublin, California?
          </h2>
          <div className="space-y-4 text-[#555] text-base leading-[1.8] font-[var(--font-poppins)]">
            <p>
              Dublin is one of the Tri-Valley&apos;s fastest-growing cities, with neighborhoods like Dublin Ranch, Positano, and Fallon Gateway seeing constant new construction and home improvement projects. Whether you&apos;re remodeling a home near Emerald Glen Park, clearing out a garage in Dublin Village, or handling construction waste from a commercial build near the BART station, a dumpster rental keeps your site organized and compliant.
            </p>
            <p>
              Dublin&apos;s rapid growth and new developments like Boulevard and Dublin Crossing mean contractors and homeowners need efficient, reliable waste hauling. TP Dumpsters offers 10, 20, and 30 yard containers with transparent all-inclusive pricing, same-day delivery, and flexible rental periods — ideal for projects of any size from weekend cleanups to multi-week construction jobs.
            </p>
            <p>
              Book your Dublin dumpster online today and save 5%, or call <a href="tel:+15106502083" className="text-tp-red font-semibold hover:underline">(510) 650-2083</a> for personalized service. Same-day delivery and bilingual support available throughout Dublin.
            </p>
          </div>
        </div>
      </section>
      <FloatingButtons />
      <Footer />
    </>
  );
}
