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
import CastroValleyHero from "./components/CastroValleyHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import CastroValleyLocation from "./components/CastroValleyLocation";

const castroValleyFaqs = [
  {
    question: "How quickly can I get a dumpster delivered in Castro Valley?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout Castro Valley and the surrounding East Bay Hills. Whether you&apos;re in Five Canyons, Palomares Hills, or near Downtown Castro Valley, we can typically have a dumpster on-site within hours when you call before noon.
      </p>
    ),
  },
  {
    question: "Can you deliver dumpsters to hillside or canyon properties in Castro Valley?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. Castro Valley is known for its beautiful canyon and hillside homes, and our drivers are experienced with narrow roads and steep driveways in areas like <strong>Cull Canyon, Five Canyons, and Palomares Hills</strong>. We&apos;ll work with you to find the best placement spot for your property.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Castro Valley?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Castro Valley is an unincorporated community in Alameda County. If the dumpster is placed on your private property or driveway, no permit is usually needed. For street placement, you may need a permit from Alameda County Public Works. Most Castro Valley homes have driveways large enough for dumpster placement.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for a Castro Valley home remodel?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For typical Castro Valley home remodels — kitchen and bath renovations, flooring replacement, or room additions — a <strong>20-yard dumpster ($649)</strong> is the most popular choice. For larger projects like whole-home renovations or multi-room tear-outs, the 30-yard at $749 gives you plenty of room.
      </p>
    ),
  },
  {
    question: "Do you serve Hayward, San Leandro, and other nearby cities?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve the entire East Bay area including <strong>Hayward, San Leandro, Dublin, San Ramon, Pleasanton,</strong> and all communities surrounding Castro Valley. One call covers dumpster delivery anywhere in the area — no extra travel charges.
      </p>
    ),
  },
  {
    question: "How much does a dumpster rental cost in Castro Valley?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Castro Valley dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster (7-day rental, 1 ton included). The 20-yard starts at $649 and the 30-yard at $749. No hidden fees, no surprise charges. Call <strong>(510) 650-2083</strong> for an exact quote for your Castro Valley project.
      </p>
    ),
  },
];

const castroValleyAbout = {
  cityName: "Castro Valley",
  intro:
    "Castro Valley is a charming unincorporated community nestled between Hayward and Dublin in the East Bay Hills. Known for its suburban charm, excellent schools, and beautiful canyon properties, Castro Valley homeowners take pride in maintaining and improving their homes. From hillside renovations in Five Canyons to garage cleanouts in Proctor, there's always a project that needs a reliable dumpster.",
  highlights: [
    "Fast delivery to all Castro Valley neighborhoods and canyon communities",
    "Experienced with hillside properties, narrow driveways, and canyon road access",
    "Serving the entire East Bay Hills corridor from San Lorenzo to Dublin",
    "Trusted by Castro Valley homeowners, contractors, and property managers",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Kitchen and bathroom remodels in Five Canyons & Palomares Hills",
    "Garage and estate cleanouts across Downtown Castro Valley & Proctor",
    "Landscaping overhauls and hillside yard debris removal in Cull Canyon",
    "Roofing tear-offs and siding replacement on mid-century homes",
    "Concrete driveway and patio demolition for property upgrades",
    "Home renovation debris from older homes in Fairview & San Lorenzo border",
  ],
  closingText:
    "Whether you're renovating a canyon home in Five Canyons or clearing out a property in Downtown Castro Valley, TP Dumpsters makes waste removal simple and affordable. Same-day delivery, transparent pricing, and a team that knows the East Bay Hills. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Castro Valley, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Castro Valley, CA. 10, 20 & 30 yard roll-off dumpsters for construction, remodels & cleanouts. Same-day delivery to Castro Valley & East Bay Hills. Call (510) 650-2083",
  keywords: [
    "dumpster rental Castro Valley CA",
    "Castro Valley dumpster rental",
    "roll-off dumpster Castro Valley",
    "construction dumpster Castro Valley",
    "Castro Valley waste removal",
    "dumpster rental 94546",
    "dumpster rental 94552",
    "Five Canyons dumpster rental",
    "Cull Canyon dumpster rental",
    "Palomares Hills dumpster rental",
    "Hayward dumpster rental",
    "San Leandro dumpster rental",
    "East Bay Hills dumpster",
    "cheap dumpster Castro Valley CA",
    "junk removal Castro Valley",
  ],
  openGraph: {
    title: "Dumpster Rental in Castro Valley, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Castro Valley. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/castro-valley",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental in Castro Valley, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Castro Valley. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/castro-valley" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Castro Valley",
  description:
    "Affordable, reliable dumpster rentals in Castro Valley, CA. Same-day delivery to all Castro Valley neighborhoods and the East Bay Hills.",
  url: "https://tpdumpsters.com/castro-valley",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Castro Valley",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Castro Valley" },
    { "@type": "City", name: "Hayward" },
    { "@type": "City", name: "San Leandro" },
    { "@type": "City", name: "Dublin" },
    { "@type": "City", name: "San Ramon" },
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

export default function CastroValleyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <CastroValleyHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...castroValleyAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Castro Valley" faqs={castroValleyFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <CastroValleyLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
