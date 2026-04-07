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
import HaywardHero from "./components/HaywardHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import HaywardLocation from "./components/HaywardLocation";

const haywardFaqs = [
  {
    question: "How quickly can you deliver a dumpster to Hayward?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> throughout Hayward when you call before noon.
        Hayward&apos;s central location and easy freeway access via 880 and 580 make it one of our
        fastest delivery zones. Downtown Hayward, South Hayward, and Castro Valley are all covered.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Hayward?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If you place the dumpster on your private driveway or property, no permit is needed. For street
        placement in Hayward, you may need an encroachment permit from the City of Hayward. We can advise
        you on the requirements for your specific location.
      </p>
    ),
  },
  {
    question: "What size dumpster works best for a garage cleanout in Hayward?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        A <strong>10-yard dumpster</strong> handles most single-garage cleanouts. If you&apos;re also
        clearing out a shed, patio, or multiple rooms, the 20-yard gives you plenty of space. For full
        estate cleanouts in Hayward, the 30-yard is the way to go.
      </p>
    ),
  },
  {
    question: "Do you serve Castro Valley and San Leandro too?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We deliver to <strong>Castro Valley, San Leandro, San Lorenzo, Cherryland, Ashland,</strong> and
        all surrounding unincorporated areas. One call covers the entire South County region — no extra
        delivery fees for nearby communities.
      </p>
    ),
  },
  {
    question: "Can I put concrete or dirt in the dumpster?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes — our <strong>10-yard dumpster</strong> is specifically designed for heavy materials like concrete,
        dirt, soil, and asphalt. Due to weight limits, heavy materials must go in the 10-yard only. Mixed
        debris including some concrete can go in larger sizes. Call us to discuss your project.
      </p>
    ),
  },
  {
    question: "How much does a dumpster rental cost in Hayward?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Our Hayward dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster
        (7-day rental, 1 ton included). 20-yard starts at $649 and 30-yard at $749.
        Transparent pricing with no hidden fees. Call <strong>(510) 650-2083</strong> for
        an exact quote based on your project.
      </p>
    ),
  },
];

const haywardAbout = {
  cityName: "Hayward",
  intro:
    "Hayward sits at the heart of the East Bay, making it one of the most accessible cities in the region. With a growing mix of residential neighborhoods and commercial development, Hayward is constantly buzzing with remodeling projects, construction, and cleanups. TP Dumpsters provides fast, affordable dumpster rentals to Hayward and the surrounding South County area — including Castro Valley, San Leandro, San Lorenzo, and beyond.",
  highlights: [
    "Central East Bay location — fast delivery via 880, 580, and 238",
    "Serving residential and commercial projects across Hayward",
    "Same-day delivery to all Hayward neighborhoods and Castro Valley",
    "Trusted by local contractors, property managers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Home remodels and kitchen/bathroom renovations in Downtown Hayward",
    "Construction debris removal for new developments along Mission Blvd",
    "Estate cleanouts and garage cleanups in Castro Valley and Cherryland",
    "Landscaping and yard debris removal in Fairview and the Hayward Hills",
    "Concrete and driveway demolition projects across South Hayward",
    "Commercial cleanouts and tenant improvements in Hayward industrial areas",
  ],
  closingText:
    "Whether you're a contractor working a job site or a homeowner tackling a weekend cleanout, TP Dumpsters makes waste removal in Hayward fast and hassle-free. We offer transparent pricing, same-day delivery, and the local knowledge you need. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Hayward, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Hayward, CA. 10, 20 & 30 yard roll-off dumpsters. Same-day delivery to Downtown Hayward, Castro Valley, San Leandro & all neighborhoods. Call (510) 650-2083",
  keywords: [
    "dumpster rental Hayward CA",
    "Hayward dumpster rental",
    "roll-off dumpster Hayward",
    "construction dumpster Hayward",
    "Hayward waste removal",
    "dumpster rental 94541",
    "dumpster rental 94544",
    "Castro Valley dumpster",
    "San Leandro dumpster rental",
    "San Lorenzo dumpster rental",
    "Cherryland dumpster rental",
    "cheap dumpster Hayward CA",
    "junk removal Hayward",
  ],
  openGraph: {
    title: "Dumpster Rental in Hayward, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Hayward. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/hayward",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/hayward" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Hayward",
  description:
    "Affordable, reliable dumpster rentals in Hayward, CA. Same-day delivery to all Hayward neighborhoods and South County.",
  url: "https://tpdumpsters.com/hayward",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hayward",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Hayward" },
    { "@type": "City", name: "Castro Valley" },
    { "@type": "City", name: "San Leandro" },
    { "@type": "City", name: "San Lorenzo" },
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

export default function HaywardPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <HaywardHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...haywardAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Hayward" faqs={haywardFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <HaywardLocation />
      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[900px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-[24px] md:text-[30px] font-bold text-[#1a1a1a] mb-6 text-center">
            Why Rent a Dumpster in Hayward, California?
          </h2>
          <div className="space-y-4 text-[#555] text-base leading-[1.8] font-[var(--font-poppins)]">
            <p>
              Hayward sits at the heart of the East Bay, with thriving neighborhoods like Hayward Hills, Southgate, and Tennyson that are constantly being updated and improved. Whether you&apos;re renovating a mid-century home near Cal State East Bay, clearing out a rental property on Mission Boulevard, or hauling away debris from a landscaping project in Fairview, a roll-off dumpster simplifies waste removal.
            </p>
            <p>
              Hayward&apos;s growing downtown revitalization and new housing developments create steady demand for reliable waste management. From roofing tear-offs to estate cleanouts, TP Dumpsters delivers 10, 20, and 30 yard containers directly to your Hayward location with same-day availability and straightforward pricing that includes delivery, pickup, and disposal.
            </p>
            <p>
              Start your Hayward project the right way — book your dumpster online and save $50, or call us at <a href="tel:+15106502083" className="text-tp-red font-semibold hover:underline">(510) 650-2083</a> for a free estimate. Bilingual support available in English and Spanish.
            </p>
          </div>
        </div>
      </section>
      <FloatingButtons />
      <Footer />
    </>
  );
}
