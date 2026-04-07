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
import RichmondHero from "./components/RichmondHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import RichmondLocation from "./components/RichmondLocation";

const richmondFaqs = [
  {
    question: "Do I need a permit for a dumpster on the street in Richmond?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If you&apos;re placing the dumpster on a public street in Richmond, you&apos;ll likely need a
        temporary encroachment permit from the City of Richmond Public Works department. On your own
        private driveway or property, no permit is usually required. We can advise you on the process.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Richmond?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Richmond is one of our fastest delivery zones since our base is in nearby Pinole.
        We offer <strong>same-day delivery</strong> for most Richmond neighborhoods when you call
        before noon. Point Richmond, Hilltop, and Marina Bay are all within 15 minutes of our yard.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home cleanout in Richmond?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a typical garage or house cleanout in Richmond, a <strong>20-yard dumpster</strong> handles
        most jobs. For small bathroom/kitchen remodels or concrete removal, the 10-yard is perfect.
        For full home renovations or estate cleanouts, go with the 30-yard.
      </p>
    ),
  },
  {
    question: "What areas near Richmond do you also serve?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We serve all of West Contra Costa County including <strong>El Cerrito, San Pablo, Hercules,
        Pinole, Rodeo,</strong> and <strong>North Richmond</strong>. We also deliver to nearby Oakland,
        Berkeley, and Albany. One call covers the entire area.
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
    question: "How much does a dumpster rental cost in Richmond?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Our Richmond dumpster rental prices start at <strong>$600 for a 10-yard</strong> dumpster
        (7-day rental, 1 ton included). 20-yard starts at $650 and 30-yard at $700.
        We have transparent pricing with no hidden fees. Call <strong>(510) 650-2083</strong> for
        an exact quote based on your project.
      </p>
    ),
  },
];

const richmondAbout = {
  cityName: "Richmond",
  intro:
    "Richmond is one of the most dynamic cities in the East Bay, with a rich industrial history and a booming wave of residential renovations and new development. From waterfront projects along Marina Bay to home remodels in Point Richmond and the Hilltop area, there's constant demand for reliable waste removal. TP Dumpsters is based just minutes away in Pinole, making Richmond our fastest delivery zone. We know the city's streets, permit requirements, and the unique challenges of working in this diverse community.",
  highlights: [
    "Based in nearby Pinole — Richmond is our fastest delivery zone",
    "Experienced with Richmond's street placement and permit requirements",
    "Serve all of West Contra Costa County from one location",
    "Trusted by Richmond contractors, flippers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Home renovations and flips in Point Richmond & Iron Triangle",
    "Construction debris removal for new developments near Marina Bay",
    "Estate cleanouts and garage cleanups across Hilltop District",
    "Landscaping and yard debris removal in Richmond Annex",
    "Concrete and soil removal for foundation and driveway projects",
    "Roofing tear-offs and siding replacement on older Richmond homes",
  ],
  closingText:
    "Whether you're a contractor working on a major project or a homeowner tackling a weekend cleanout, TP Dumpsters makes waste removal in Richmond easy and affordable. We offer transparent pricing, same-day delivery, and the local expertise you need. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Richmond, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Richmond, CA. 10, 20 & 30 yard roll-off dumpsters. Same-day delivery to Point Richmond, Hilltop, Marina Bay & all neighborhoods. Bilingual support. Call (510) 650-2083",
  keywords: [
    "dumpster rental Richmond CA",
    "Richmond dumpster rental",
    "roll-off dumpster Richmond",
    "construction dumpster Richmond",
    "Richmond waste removal",
    "dumpster rental 94801",
    "dumpster rental 94804",
    "dumpster rental Point Richmond",
    "Hilltop dumpster rental",
    "Marina Bay dumpster rental",
    "El Cerrito dumpster rental",
    "San Pablo dumpster rental",
    "cheap dumpster Richmond CA",
    "junk removal Richmond",
  ],
  openGraph: {
    title: "Dumpster Rental in Richmond, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Richmond. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/richmond",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/richmond" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Richmond",
  description:
    "Affordable, reliable dumpster rentals in Richmond, CA. Same-day delivery to all Richmond neighborhoods and West Contra Costa County.",
  url: "https://tpdumpsters.com/richmond",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Richmond",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Richmond" },
    { "@type": "City", name: "El Cerrito" },
    { "@type": "City", name: "San Pablo" },
    { "@type": "City", name: "Hercules" },
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
        price: "600",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "20 Yard Dumpster Rental", description: "Versatile mid-size dumpster for remodels, roofing, and medium cleanouts. 7-day rental, 2 tons included." },
        price: "650",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "30 Yard Dumpster Rental", description: "Large dumpster for full renovations, construction debris, and estate cleanouts. 7-day rental, 3 tons included." },
        price: "700",
        priceCurrency: "USD",
      },
    ],
  },
};

export default function RichmondPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <RichmondHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...richmondAbout} />
<SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Richmond" faqs={richmondFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <RichmondLocation />
      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[900px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-[24px] md:text-[30px] font-bold text-[#1a1a1a] mb-6 text-center">
            Why Rent a Dumpster in Richmond, California?
          </h2>
          <div className="space-y-4 text-[#555] text-base leading-[1.8] font-[var(--font-poppins)]">
            <p>
              Richmond is a city of transformation, with neighborhoods like Point Richmond, the Iron Triangle, and Hilltop undergoing continuous renovation and development. Whether you&apos;re clearing out a property near Marina Bay, renovating a historic home in Atchison Village, or managing debris from a commercial project along Macdonald Avenue, a reliable dumpster rental makes the job easier and more efficient.
            </p>
            <p>
              From backyard cleanups in El Cerrito Hills to large-scale construction waste removal near Richmond Annex, homeowners and contractors throughout the area rely on convenient roll-off dumpster service. TP Dumpsters offers 10, 20, and 30 yard containers with transparent pricing, same-day delivery, and bilingual support to serve Richmond&apos;s diverse community.
            </p>
            <p>
              Ready to get started on your Richmond project? Book online for an instant $50 discount or call us at <a href="tel:+15106502083" className="text-tp-red font-semibold hover:underline">(510) 650-2083</a> for a free quote. We&apos;re proud to serve the Richmond community with affordable, hassle-free dumpster rentals.
            </p>
          </div>
        </div>
      </section>
      <FloatingButtons />
      <Footer />
    </>
  );
}
