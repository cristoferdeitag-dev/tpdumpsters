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
import AmericanCanyonHero from "./components/AmericanCanyonHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import AmericanCanyonLocation from "./components/AmericanCanyonLocation";

const americanCanyonFaqs = [
  {
    question: "How quickly can I get a dumpster delivered in American Canyon?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> throughout American Canyon and
        South Napa County. Whether you&apos;re in Napa Junction, Watson Ranch, or near the wine
        country gateway, we can typically have a dumpster on-site within hours when you call
        before noon.
      </p>
    ),
  },
  {
    question: "What size dumpster is best for wine country property cleanups?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For American Canyon&apos;s growing neighborhoods and wine country properties, a
        <strong> 20-yard dumpster</strong> is the most popular choice for home remodels and
        property cleanouts. For larger construction projects or estate cleanups, the 30-yard
        handles significant debris. Smaller garage cleanouts work well with a 10-yard.
      </p>
    ),
  },
  {
    question: "Do you serve Napa, Vallejo, and Benicia too?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve the entire South Napa and Solano County area including <strong>Napa,
        Vallejo, Benicia,</strong> and Fairfield. American Canyon&apos;s location as the gateway
        to Napa Valley means we can quickly reach any address in the region — no extra travel
        charges.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in American Canyon?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on your private property or driveway, no permit is typically
        required in American Canyon. For street placement, you may need a permit from the City
        of American Canyon. Most American Canyon homes have ample driveway space that easily
        accommodates a roll-off dumpster.
      </p>
    ),
  },
  {
    question: "Can I use a dumpster for vineyard or agricultural cleanup?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! American Canyon&apos;s proximity to Napa Valley wine country means we
        frequently help with <strong>vineyard cleanup, agricultural debris, fencing removal,
        and land clearing</strong>. Our 10-yard is great for smaller farm projects, while the
        20-yard and 30-yard handle larger agricultural cleanups.
      </p>
    ),
  },
  {
    question: "How much does a dumpster rental cost in American Canyon?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        American Canyon dumpster rental prices start at <strong>$599 for a 10-yard</strong>
        dumpster (7-day rental, 1 ton included). The 20-yard starts at $649 and the 30-yard at
        $749. No hidden fees, no surprise charges. Call <strong>(510) 650-2083</strong> for an
        exact quote for your American Canyon project.
      </p>
    ),
  },
];

const americanCanyonAbout = {
  cityName: "American Canyon",
  intro:
    "American Canyon is the gateway to Napa Valley wine country and the newest city in Napa County. With fast-growing neighborhoods, affordable Napa living, and proximity to both wine country and the Bay Area, American Canyon homeowners and contractors regularly need dumpster service for new construction, remodels, and property improvements.",
  highlights: [
    "Fast delivery to all American Canyon neighborhoods and South Napa",
    "Wine country gateway location with easy Bay Area access",
    "Experienced with new construction and fast-growing communities",
    "Trusted by American Canyon contractors, homeowners, and vintners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "New construction cleanup in Watson Ranch & Eucalyptus Grove",
    "Home remodels and kitchen/bath renovations in Canyon Estates",
    "Vineyard cleanup and agricultural debris removal in Napa Junction",
    "Garage and estate cleanouts across Downtown American Canyon",
    "Roofing tear-offs and exterior upgrades on growing homes",
    "Landscaping overhauls and yard debris removal in Green Island",
  ],
  closingText:
    "Whether you're building a new home in Watson Ranch or cleaning up a vineyard property near Napa, TP Dumpsters makes waste removal simple and affordable. Same-day delivery, transparent pricing, and a team that knows wine country. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in American Canyon, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in American Canyon, CA. 10, 20 & 30 yard roll-off dumpsters for construction, remodels & cleanouts. Same-day delivery to American Canyon & South Napa. Call (510) 650-2083",
  keywords: [
    "dumpster rental American Canyon CA",
    "American Canyon dumpster rental",
    "roll-off dumpster American Canyon",
    "construction dumpster American Canyon",
    "American Canyon waste removal",
    "dumpster rental 94503",
    "Napa Junction dumpster rental",
    "Napa dumpster rental",
    "Vallejo dumpster rental",
    "Benicia dumpster rental",
    "wine country dumpster rental",
    "cheap dumpster American Canyon CA",
    "junk removal American Canyon",
  ],
  openGraph: {
    title: "Dumpster Rental in American Canyon, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in American Canyon. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/american-canyon",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental in American Canyon, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in American Canyon. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/american-canyon" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - American Canyon",
  description:
    "Affordable, reliable dumpster rentals in American Canyon, CA. Same-day delivery to all American Canyon neighborhoods and South Napa County.",
  url: "https://tpdumpsters.com/american-canyon",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "American Canyon",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "American Canyon" },
    { "@type": "City", name: "Vallejo" },
    { "@type": "City", name: "Napa" },
    { "@type": "City", name: "Benicia" },
    { "@type": "City", name: "Fairfield" },
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

export default function AmericanCanyonPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <AmericanCanyonHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...americanCanyonAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="American Canyon" faqs={americanCanyonFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <AmericanCanyonLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
