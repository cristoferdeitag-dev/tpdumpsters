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
import MountainViewHero from "./components/MountainViewHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import MountainViewLocation from "./components/MountainViewLocation";

const mountainViewFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Mountain View?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes. If the dumpster is placed on a public street in Mountain View, you&apos;ll need a temporary
        encroachment permit from the City of Mountain View. If it&apos;s on your private driveway, no permit
        is usually needed. We can help guide you through the process.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Mountain View?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        In most Mountain View neighborhoods, we offer <strong>same-day delivery</strong> if you call before noon.
        Areas like Downtown Mountain View, Old Mountain View, and Cuesta Park are within our fastest delivery zone.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a tech campus project in Mountain View?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For tech campus debris removal and large-scale construction near the Googleplex or Shoreline area,
        a <strong>30-yard dumpster</strong> is recommended. For smaller office renovations or downtown Castro Street
        projects, a 20-yard works well. For concrete, soil, or heavy materials, the 10-yard is perfect.
      </p>
    ),
  },
  {
    question: "Can you deliver to dense neighborhoods near Castro Street?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We regularly deliver to Mountain View&apos;s dense downtown and residential areas including
        Old Mountain View, Monta Loma, and neighborhoods near Castro Street. Our drivers are experienced
        with tight access and can navigate narrow streets common in the area.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Mountain View?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Mountain View customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Tech campus debris removal and construction</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Downtown renovations and Castro Street projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Residential remodels in Cuesta Park & Waverly Park</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Home cleanouts and garage cleanups</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping and yard debris removal</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Mountain View ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve every Mountain View ZIP code including 94040, 94041, and 94043. No matter where you
        are in Mountain View, we can deliver.
      </p>
    ),
  },
];

const mountainViewAbout = {
  cityName: "Mountain View",
  intro:
    "Mountain View is the heart of Silicon Valley's tech industry, home to Google/Alphabet and countless other tech companies. With a vibrant downtown along Castro Street, charming residential neighborhoods, and massive tech campuses, there's always construction, renovation, and cleanup happening. TP Dumpsters serves all Mountain View neighborhoods and understands the unique needs of this tech hub — from large campus debris removal to residential remodels in quiet tree-lined streets.",
  highlights: [
    "Experienced with tech campus and commercial dumpster delivery",
    "Familiar with Mountain View city permit requirements for street placement",
    "Fast delivery to all Mountain View neighborhoods — Downtown to North Whisman",
    "Trusted by Mountain View contractors, tech companies, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Tech campus construction debris removal near Shoreline",
    "Downtown Castro Street renovation and remodel projects",
    "Residential remodels in Cuesta Park & Waverly Park",
    "Office build-outs and tenant improvements in North Whisman",
    "Landscaping and yard debris removal in Rex Manor & Monta Loma",
    "Home cleanouts and garage cleanups across Mountain View",
  ],
  closingText:
    "Whether you're a homeowner tackling a weekend cleanup or a contractor running a major renovation, TP Dumpsters makes waste removal in Mountain View easy. We offer transparent pricing, same-day delivery, and the local expertise to get your dumpster exactly where you need it. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Mountain View, CA | Tech Hub - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Mountain View, CA. Serving Downtown, Old Mountain View, Cuesta Park, Shoreline & all ZIP codes. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Mountain View CA",
    "Mountain View dumpster rental",
    "roll-off dumpster Mountain View",
    "construction dumpster Mountain View",
    "Mountain View waste removal",
    "dumpster rental 94040",
    "dumpster rental 94041",
    "dumpster rental 94043",
    "dumpster rental Downtown Mountain View",
    "Castro Street dumpster rental",
    "Shoreline dumpster",
    "tech hub dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Mountain View, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Mountain View. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/mountain-view",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/mountain-view",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Mountain View",
  description:
    "Fast, reliable dumpster rentals in Mountain View, CA. Serving all Mountain View neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/mountain-view",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mountain View",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Mountain View",
      "@id": "https://en.wikipedia.org/wiki/Mountain_View,_California",
    },
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
        itemOffered: { "@type": "Service", name: "10 Yard Dumpster Rental", description: "Compact dumpster ideal for tight spaces and heavy debris like soil, concrete, and bricks." },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "20 Yard Dumpster Rental", description: "Versatile dumpster for kitchen/bathroom remodels, roofing projects, and yard cleanups." },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "30 Yard Dumpster Rental", description: "Extra capacity dumpster for whole-home cleanouts, large renovations, and construction debris." },
      },
    ],
  },
};

export default function MountainViewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <MountainViewHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...mountainViewAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Mountain View" faqs={mountainViewFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <MountainViewLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
