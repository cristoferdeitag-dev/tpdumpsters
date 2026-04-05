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
import AntiochHero from "./components/AntiochHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import AntiochLocation from "./components/AntiochLocation";

const antiochFaqs = [
  {
    question: "How quickly can I get a dumpster delivered in Antioch?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout Antioch and East
        Contra Costa County. Whether you&apos;re in Downtown Antioch, Deer Valley, or the
        Brentwood border area, we can typically have a dumpster on-site within hours when you
        call before noon.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for new construction cleanup in Antioch?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For new construction projects — which are booming in Antioch&apos;s growing communities
        like Sand Creek and Deer Valley — a <strong>30-yard dumpster</strong> is ideal. It handles
        framing scraps, drywall cutoffs, packaging, and general construction debris. For smaller
        remodels or single-room additions, a 20-yard is usually sufficient.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Antioch?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If you place the dumpster on your own private property or driveway, no permit is typically
        required in Antioch. For street placement, you may need a temporary encroachment permit
        from the City of Antioch. Most of our Antioch customers have large driveways or open lots,
        so street placement is rarely needed.
      </p>
    ),
  },
  {
    question: "Do you serve Brentwood, Oakley, and other East County cities?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve the entire East Contra Costa area including <strong>Brentwood, Oakley,
        Pittsburg, Bay Point,</strong> and surrounding communities. One call covers dumpster
        delivery anywhere in East County — no extra travel charges for these areas.
      </p>
    ),
  },
  {
    question: "What can I put in a dumpster rental in Antioch?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">We accept most common debris types for Antioch projects:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Construction and demolition waste (lumber, drywall, siding)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">General household junk and old furniture</li>
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
    question: "How much does a dumpster rental cost in Antioch?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Antioch dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster
        (7-day rental, 1 ton included). The 20-yard starts at $649 and the 30-yard at $749.
        No hidden fees, no surprise charges. Call <strong>(510) 650-2083</strong> for an exact
        quote for your Antioch project.
      </p>
    ),
  },
];

const antiochAbout = {
  cityName: "Antioch",
  intro:
    "Antioch is one of the fastest-growing cities in East Contra Costa County, fueled by affordable housing, new construction developments, and families putting down roots. With large lots, new subdivisions in Sand Creek and Deer Valley, and a wave of home improvement projects across established neighborhoods, Antioch generates a constant need for dependable dumpster service.",
  highlights: [
    "Fast delivery to all Antioch neighborhoods and East County communities",
    "Large dumpster inventory ideal for new construction and big lot cleanups",
    "Experienced with East County's building boom and contractor needs",
    "Trusted by Antioch builders, remodelers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "New construction cleanup in Sand Creek, Deer Valley & Brentwood border",
    "Whole-home remodels and additions in Dallas Ranch & Lone Tree",
    "Garage and estate cleanouts across Downtown Antioch & Sycamore",
    "Roofing tear-offs and siding replacement on established homes",
    "Landscaping overhauls and yard debris removal in Black Diamond",
    "Concrete driveway and patio demolition for property upgrades",
  ],
  closingText:
    "Whether you're building a new home in Sand Creek or renovating a property in Downtown Antioch, TP Dumpsters makes waste removal simple and affordable. Same-day delivery, transparent pricing, and a team that understands East County. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Antioch, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Antioch, CA. 10, 20 & 30 yard roll-off dumpsters for construction, remodels & cleanouts. Same-day delivery to Antioch & East Contra Costa. Call (510) 650-2083",
  keywords: [
    "dumpster rental Antioch CA",
    "Antioch dumpster rental",
    "roll-off dumpster Antioch",
    "construction dumpster Antioch",
    "Antioch waste removal",
    "dumpster rental 94509",
    "dumpster rental 94531",
    "Deer Valley dumpster rental",
    "Sand Creek dumpster rental",
    "Brentwood dumpster rental",
    "Oakley dumpster rental",
    "East Contra Costa dumpster",
    "cheap dumpster Antioch CA",
    "junk removal Antioch",
  ],
  openGraph: {
    title: "Dumpster Rental in Antioch, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Antioch. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/antioch",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/antioch" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Antioch",
  description:
    "Affordable, reliable dumpster rentals in Antioch, CA. Same-day delivery to all Antioch neighborhoods and East Contra Costa County.",
  url: "https://tpdumpsters.com/antioch",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Antioch",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Antioch" },
    { "@type": "City", name: "Brentwood" },
    { "@type": "City", name: "Oakley" },
    { "@type": "City", name: "Pittsburg" },
    { "@type": "City", name: "Bay Point" },
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

export default function AntiochPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <AntiochHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...antiochAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Antioch" faqs={antiochFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <AntiochLocation />
      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[900px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-[24px] md:text-[30px] font-bold text-[#1a1a1a] mb-6 text-center">
            Why Rent a Dumpster in Antioch, California?
          </h2>
          <div className="space-y-4 text-[#555] text-base leading-[1.8] font-[var(--font-poppins)]">
            <p>
              Antioch is one of East Contra Costa County&apos;s fastest-growing cities, with neighborhoods like Deer Valley, Lone Tree, and the Rivertown historic district seeing constant home improvement and new construction. Whether you&apos;re clearing out a property near the Antioch Marina, remodeling a home in Country Hills, or managing debris from a backyard renovation in Sand Creek, a dumpster rental keeps your project moving forward.
            </p>
            <p>
              With ongoing residential development and the BART extension bringing new investment to Antioch, renovation and construction projects are on the rise. TP Dumpsters offers affordable 10, 20, and 30 yard roll-off containers perfect for roofing jobs, garage cleanouts, landscaping overhauls, and full home demolitions throughout the Antioch area.
            </p>
            <p>
              Book your Antioch dumpster rental online and save 5% instantly, or call <a href="tel:+15106502083" className="text-tp-red font-semibold hover:underline">(510) 650-2083</a> for same-day delivery. Transparent pricing and bilingual support — that&apos;s the TP Dumpsters promise.
            </p>
          </div>
        </div>
      </section>
      <FloatingButtons />
      <Footer />
    </>
  );
}
