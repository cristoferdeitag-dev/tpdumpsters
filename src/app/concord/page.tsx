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
import ConcordHero from "./components/ConcordHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import ConcordLocation from "./components/ConcordLocation";

const concordFaqs = [
  {
    question: "How much does a dumpster rental cost in Concord?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Dumpster rental in Concord starts at <strong>$600 for a 10-yard</strong> (7-day rental, 1 ton
        included), $650 for a 20-yard (2 tons), and $700 for a 30-yard (3 tons). We offer transparent
        pricing with no hidden fees. Call <strong>(510) 650-2083</strong> for an exact quote.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Concord?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on your own driveway or property in Concord, no permit is needed.
        For street placement, you may need a temporary encroachment permit from the City of Concord.
        We can help guide you through the process — just ask when you call.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a remodel in Concord?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a kitchen or bathroom remodel, a <strong>20-yard dumpster</strong> is usually the best choice.
        For larger whole-home renovations or new construction in Concord, the 30-yard gives you plenty
        of room. For concrete, soil, or small cleanouts, the 10-yard is ideal.
      </p>
    ),
  },
  {
    question: "How fast can you deliver a dumpster to Concord?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> to most Concord neighborhoods when you call before
        noon. Downtown Concord, Todos Santos, Sun Terrace, and Meadow Homes are all within our fast
        delivery zone. We also serve nearby Clayton, Pleasant Hill, and Walnut Creek.
      </p>
    ),
  },
  {
    question: "What are common dumpster rental uses in Concord?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Concord customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Home remodels and kitchen/bathroom renovations</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Garage, attic, and estate cleanouts</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Landscaping projects and yard debris removal</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Concrete driveway and patio demolition</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">New construction and commercial projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing tear-offs and siding replacement</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve areas around Concord too?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve all of Central Contra Costa County including <strong>Pleasant Hill, Walnut Creek,
        Clayton, Martinez, Pacheco,</strong> and <strong>Bay Point</strong>. We also deliver to Pittsburg,
        Antioch, and the Tri-Valley area. One call covers the entire region.
      </p>
    ),
  },
];

const concordAbout = {
  cityName: "Concord",
  intro:
    "Concord is the largest city in Contra Costa County and one of the East Bay's most active markets for home renovation and construction. With the massive Concord Naval Weapons Station redevelopment, ongoing residential remodels in established neighborhoods like Todos Santos and Sun Terrace, and a thriving contractor community, there's constant need for reliable dumpster rental services. TP Dumpsters brings fast delivery, transparent pricing, and local expertise to every Concord project.",
  highlights: [
    "Concord's largest and most active dumpster rental service area",
    "Experienced with Concord city permit and HOA requirements",
    "Same-day delivery to all Concord neighborhoods and ZIP codes",
    "Flexible scheduling for contractors and large-scale projects",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Kitchen and bathroom remodels in Todos Santos and Dana Estates",
    "Garage and estate cleanouts in Sun Terrace and Meadow Homes",
    "New construction debris removal near the former Naval Weapons Station",
    "Landscaping and yard waste removal in Holbrook Heights",
    "Concrete driveway demolition and replacement projects",
    "Commercial tenant improvement and office renovation waste",
  ],
  closingText:
    "From small garage cleanouts to large construction projects, TP Dumpsters is Concord's trusted choice for waste removal. We deliver on time, price transparently, and make the whole process hassle-free. Call us at (510) 650-2083 for a free quote today.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Concord, CA | Same-Day Service - TP Dumpsters",
  description:
    "Reliable dumpster rentals in Concord, CA. 10, 20 & 30 yard roll-off dumpsters. Same-day delivery to Downtown, Todos Santos, Sun Terrace & all neighborhoods. Bilingual support. Call (510) 650-2083",
  keywords: [
    "dumpster rental Concord CA",
    "Concord dumpster rental",
    "roll-off dumpster Concord",
    "construction dumpster Concord",
    "Concord waste removal",
    "dumpster rental 94520",
    "dumpster rental 94521",
    "dumpster rental 94519",
    "dumpster Todos Santos Concord",
    "cheap dumpster rental Concord",
    "Clayton dumpster rental",
    "Pleasant Hill dumpster rental",
    "junk removal Concord CA",
    "roll off dumpster Contra Costa",
  ],
  openGraph: {
    title: "Dumpster Rental in Concord, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Concord. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/concord",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/concord" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Concord",
  description:
    "Reliable, affordable dumpster rentals in Concord, CA. Same-day delivery to all Concord neighborhoods and Central Contra Costa County.",
  url: "https://tpdumpsters.com/concord",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Concord",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Concord" },
    { "@type": "City", name: "Clayton" },
    { "@type": "City", name: "Pleasant Hill" },
    { "@type": "City", name: "Walnut Creek" },
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
        itemOffered: { "@type": "Service", name: "10 Yard Dumpster Rental", description: "Compact dumpster for tight spaces, soil, concrete, and small cleanups." },
        price: "600",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "20 Yard Dumpster Rental", description: "Mid-size dumpster for remodels, roofing, and medium cleanouts." },
        price: "650",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "30 Yard Dumpster Rental", description: "Large dumpster for full renovations, construction, and estate cleanouts." },
        price: "700",
        priceCurrency: "USD",
      },
    ],
  },
};

export default function ConcordPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <ConcordHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...concordAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Concord" faqs={concordFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <ConcordLocation />
      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[900px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-[24px] md:text-[30px] font-bold text-[#1a1a1a] mb-6 text-center">
            Why Rent a Dumpster in Concord, California?
          </h2>
          <div className="space-y-4 text-[#555] text-base leading-[1.8] font-[var(--font-poppins)]">
            <p>
              Concord is one of the largest cities in Contra Costa County, with established neighborhoods like Dana Estates, Sun Terrace, and Meadow Homes seeing constant home improvement activity. Whether you&apos;re tackling a kitchen remodel near Todos Santos Plaza, clearing out a garage in Ellis Lake, or managing construction waste from a project along Willow Pass Road, a dumpster rental keeps your site clean and your project on schedule.
            </p>
            <p>
              The former Concord Naval Weapons Station redevelopment and ongoing residential growth mean more construction and renovation projects across the city. TP Dumpsters provides affordable 10, 20, and 30 yard roll-off containers perfect for everything from small residential cleanouts to large commercial demolitions throughout Concord and surrounding areas.
            </p>
            <p>
              Get your Concord dumpster delivered as soon as today. Book online for an instant 5% discount or call <a href="tel:+15106502083" className="text-tp-red font-semibold hover:underline">(510) 650-2083</a> for personalized service in English or Spanish. Transparent pricing, no hidden fees — that&apos;s the TP Dumpsters difference.
            </p>
          </div>
        </div>
      </section>
      <FloatingButtons />
      <Footer />
    </>
  );
}
