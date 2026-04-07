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
import AlamedaHero from "./components/AlamedaHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import AlamedaLocation from "./components/AlamedaLocation";

const alamedaFaqs = [
  {
    question: "Do I need a permit to place a dumpster on the street in Alameda?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes. If you plan to place a dumpster on a public street or right-of-way on Alameda Island,
        you&apos;ll need a temporary encroachment permit from the City of Alameda Public Works
        Department. Placement on your own private driveway or property typically does not require
        a permit. We can help guide you through the application process.
      </p>
    ),
  },
  {
    question: "Can your delivery trucks access Alameda Island without issues?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. Our roll-off trucks regularly cross the Park Street and Fruitvale Avenue bridges
        to deliver dumpsters throughout Alameda Island and Bay Farm Island. We&apos;re familiar
        with the island&apos;s traffic patterns and narrow residential streets, and we schedule
        deliveries to avoid peak bridge congestion.
      </p>
    ),
  },
  {
    question: "What size dumpster works best for Victorian home renovation debris?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For typical Victorian remodel projects in Alameda — such as kitchen or bathroom gut-outs,
        plaster and lath removal, or porch rebuilds — a <strong>20-yard dumpster</strong> is the
        most popular choice. If you&apos;re doing a full-home renovation on one of Alameda&apos;s
        larger Victorians, step up to the 30-yard for extra capacity.
      </p>
    ),
  },
  {
    question: "Do you have dumpsters that fit on small Alameda driveways and lots?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes. Our <strong>10-yard dumpster</strong> is compact enough to fit on most Alameda driveways,
        even the narrower ones common on the island&apos;s older residential streets. At roughly
        12 feet long, it works well for tight spaces while still holding a significant amount of
        debris from small remodels, cleanouts, or concrete removal.
      </p>
    ),
  },
  {
    question: "What materials can I put in the dumpster in Alameda?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">We accept most common waste types for Alameda rentals:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">General household junk and furniture</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Construction and demolition debris (drywall, lumber, plaster)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Concrete, dirt, and soil (10-yard only, weight limits apply)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Yard waste, branches, and landscaping debris</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Appliances and mattresses (small extra fee)</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          <strong>Not accepted:</strong> Hazardous materials, paint, chemicals, batteries, electronics, or tires (except with surcharge). Alameda has strict environmental rules — we ensure proper disposal.
        </p>
      </>
    ),
  },
  {
    question: "How much does a dumpster rental cost in Alameda?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Our Alameda dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster
        (7-day rental, 1 ton included). The 20-yard starts at $649 and the 30-yard at $749.
        Transparent pricing with no hidden fees — call <strong>(510) 650-2083</strong> for an
        exact quote tailored to your project.
      </p>
    ),
  },
];

const alamedaAbout = {
  cityName: "Alameda",
  intro:
    "Alameda is a charming island city in the San Francisco Bay known for its tree-lined streets, beautifully preserved Victorian homes, and eco-conscious community. With ongoing Navy base redevelopment at Alameda Point and a steady stream of home renovations across the island, reliable dumpster service is essential for residents and contractors alike.",
  highlights: [
    "Experienced navigating Alameda's island streets and bridge access",
    "Compact dumpster options designed for narrow driveways and small lots",
    "Familiar with Alameda's environmental regulations and permit process",
    "Trusted by island homeowners, Victorian restoration contractors, and developers",
    "Bilingual team (English & Spanish) for seamless communication",
  ],
  commonProjects: [
    "Victorian home renovations and historic restoration in Gold Coast & Fernside",
    "Navy base redevelopment debris removal at Alameda Point",
    "Kitchen and bathroom remodels in Downtown Alameda & West End",
    "Estate cleanouts and garage cleanups across Bay Farm Island",
    "Yard waste and landscaping debris removal in Harbor Bay",
    "Concrete and foundation work for older Alameda properties",
  ],
  closingText:
    "Whether you're restoring a classic Victorian or clearing out a garage on Bay Farm Island, TP Dumpsters delivers fast, affordable dumpster rentals anywhere on Alameda Island. Transparent pricing, same-day availability, and local expertise. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Alameda, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Alameda, CA. 10, 20 & 30 yard roll-off dumpsters delivered to Alameda Island & Bay Farm. Victorian renovation debris, small lot friendly. Call (510) 650-2083",
  keywords: [
    "dumpster rental Alameda CA",
    "Alameda dumpster rental",
    "roll-off dumpster Alameda",
    "construction dumpster Alameda",
    "Alameda waste removal",
    "dumpster rental 94501",
    "dumpster rental 94502",
    "dumpster rental Bay Farm Island",
    "Downtown Alameda dumpster rental",
    "Alameda Island dumpster",
    "Victorian renovation dumpster Alameda",
    "Alameda county dumpster rental",
    "cheap dumpster Alameda CA",
    "junk removal Alameda",
  ],
  openGraph: {
    title: "Dumpster Rental in Alameda, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Alameda. 10, 20 & 30 yard dumpsters. Same-day island delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/alameda",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/alameda" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Alameda",
  description:
    "Affordable, reliable dumpster rentals in Alameda, CA. Same-day delivery to Alameda Island, Bay Farm Island, and surrounding East Bay cities.",
  url: "https://tpdumpsters.com/alameda",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Alameda",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Alameda" },
    { "@type": "City", name: "Oakland" },
    { "@type": "City", name: "San Leandro" },
    { "@type": "City", name: "Berkeley" },
    { "@type": "City", name: "Emeryville" },
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

export default function AlamedaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <AlamedaHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...alamedaAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Alameda" faqs={alamedaFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <AlamedaLocation />
      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[900px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-[24px] md:text-[30px] font-bold text-[#1a1a1a] mb-6 text-center">
            Why Rent a Dumpster in Alameda, California?
          </h2>
          <div className="space-y-4 text-[#555] text-base leading-[1.8] font-[var(--font-poppins)]">
            <p>
              Alameda&apos;s charming island community is full of historic Victorian homes, Craftsman bungalows, and mid-century properties that homeowners love to restore and update. Whether you&apos;re renovating a classic home on the Gold Coast, clearing out an estate in the East End, or managing demolition debris from a project at Alameda Point, a dumpster rental makes waste removal simple.
            </p>
            <p>
              The island&apos;s ongoing development at Alameda Point and Site A, along with steady residential remodeling throughout neighborhoods like Fernside and Bay Farm Island, creates consistent demand for reliable roll-off dumpster service. TP Dumpsters delivers 10, 20, and 30 yard containers right to your Alameda address with same-day availability and no hidden fees.
            </p>
            <p>
              Ready to tackle your Alameda project? Book online for a $50 discount or call <a href="tel:+15106502083" className="text-tp-red font-semibold hover:underline">(510) 650-2083</a> for a free quote. We proudly serve all of Alameda with fast delivery and bilingual customer support.
            </p>
          </div>
        </div>
      </section>
      <FloatingButtons />
      <Footer />
    </>
  );
}
