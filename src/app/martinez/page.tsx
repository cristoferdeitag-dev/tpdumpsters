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
import MartinezHero from "./components/MartinezHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import MartinezLocation from "./components/MartinezLocation";

const martinezFaqs = [
  {
    question: "How quickly can I get a dumpster delivered in Martinez?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout Martinez and North Contra Costa County. Whether you&apos;re in Downtown Martinez, Alhambra Valley, or the Waterfront area, we can typically have a dumpster on-site within hours when you call before noon.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for renovating older homes in Martinez?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Martinez has many historic and older homes that require careful renovation. For most projects — kitchen remodels, bathroom updates, or foundation work — a <strong>20-yard dumpster</strong> is ideal. It handles plaster, old lumber, fixtures, and demolition debris. For whole-home renovations or additions, the 30-yard is your best bet.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Martinez?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If you place the dumpster on your own driveway or private property, no permit is typically required in Martinez. For street placement in Downtown Martinez or historic neighborhoods, you may need a temporary encroachment permit from the City of Martinez. We can help you determine the best placement for your property.
      </p>
    ),
  },
  {
    question: "Do you serve Benicia, Concord, and other North County cities?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve all of North Contra Costa County including <strong>Benicia, Concord, Pleasant Hill, Hercules, Pacheco,</strong> and surrounding communities. One call covers dumpster delivery anywhere in North CCC — no extra travel charges.
      </p>
    ),
  },
  {
    question: "What can I put in a dumpster rental in Martinez?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">We accept most common debris types for Martinez projects:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Construction and demolition waste (lumber, drywall, plaster, siding)</li>
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
    question: "How much does a dumpster rental cost in Martinez?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Martinez dumpster rental prices start at <strong>$649 for a 10-yard</strong> dumpster (7-day rental, 1 ton included). The 20-yard starts at $699 and the 30-yard at $849. No hidden fees, no surprise charges. Call <strong>(510) 650-2083</strong> for an exact quote for your Martinez project.
      </p>
    ),
  },
];

const martinezAbout = {
  cityName: "Martinez",
  intro:
    "Martinez is the historic county seat of Contra Costa County, known for its charming downtown, waterfront marina, and as the birthplace of naturalist John Muir. With many older homes requiring renovation and a steady stream of waterfront property improvements, Martinez has consistent demand for reliable dumpster service that understands the unique needs of historic home restoration and coastal area projects.",
  highlights: [
    "Fast delivery to all Martinez neighborhoods and North Contra Costa communities",
    "Right-sized dumpsters for historic home renovations and waterfront projects",
    "Experienced with Martinez's older home stock and renovation challenges",
    "Trusted by Martinez contractors, remodelers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Historic home renovations in Downtown Martinez & Alhambra Valley",
    "Waterfront property upgrades and marina area improvements",
    "Kitchen and bathroom remodels in Mountain View & Hidden Lakes",
    "Foundation work and structural repairs on older homes",
    "Roofing tear-offs and siding replacement in Pine Meadow & Vine Hill",
    "Estate cleanouts and garage demolitions across Martinez",
  ],
  closingText:
    "Whether you're restoring a historic home in Downtown Martinez or upgrading a waterfront property, TP Dumpsters makes waste removal simple and affordable. Same-day delivery, transparent pricing, and a team that knows North Contra Costa. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Martinez, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Martinez, CA. 10, 20 & 30 yard roll-off dumpsters for construction, remodels & cleanouts. Same-day delivery to Martinez & North Contra Costa. Call (510) 650-2083",
  keywords: [
    "dumpster rental Martinez CA",
    "Martinez dumpster rental",
    "roll-off dumpster Martinez",
    "construction dumpster Martinez",
    "Martinez waste removal",
    "dumpster rental 94553",
    "Downtown Martinez dumpster",
    "Alhambra Valley dumpster rental",
    "Benicia dumpster rental",
    "Concord dumpster rental",
    "Pleasant Hill dumpster rental",
    "North Contra Costa dumpster",
    "cheap dumpster Martinez CA",
    "junk removal Martinez",
  ],
  openGraph: {
    title: "Dumpster Rental in Martinez, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Martinez. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/martinez",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental in Martinez, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Martinez. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/martinez" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Martinez",
  description:
    "Affordable, reliable dumpster rentals in Martinez, CA. Same-day delivery to all Martinez neighborhoods and North Contra Costa County.",
  url: "https://tpdumpsters.com/martinez",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Martinez",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Martinez" },
    { "@type": "City", name: "Benicia" },
    { "@type": "City", name: "Concord" },
    { "@type": "City", name: "Pleasant Hill" },
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

export default function MartinezPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <MartinezHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...martinezAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Martinez" faqs={martinezFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <MartinezLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
