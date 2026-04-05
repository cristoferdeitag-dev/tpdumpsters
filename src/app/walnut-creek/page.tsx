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
import WalnutCreekHero from "./components/WalnutCreekHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import WalnutCreekLocation from "./components/WalnutCreekLocation";

const walnutCreekFaqs = [
  {
    question: "Do I need a permit for a dumpster in Walnut Creek?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If you&apos;re placing the dumpster on your private driveway or property, no permit is needed.
        For street or public right-of-way placement in Walnut Creek, you&apos;ll need an encroachment
        permit from the City of Walnut Creek. We can walk you through the process and help coordinate.
      </p>
    ),
  },
  {
    question: "How fast can I get a dumpster delivered in Walnut Creek?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day delivery</strong> throughout Walnut Creek and the Lamorinda area
        when you call before noon. Downtown Walnut Creek, Rossmoor, Alamo, Lafayette, and Pleasant Hill
        are all within our fast delivery zone.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home remodel in Walnut Creek?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For a typical kitchen or bathroom remodel — common in Walnut Creek&apos;s upscale neighborhoods —
        a <strong>20-yard dumpster</strong> is the most popular choice. For smaller projects like a garage
        cleanout, the 10-yard is perfect. Full home renovations call for the 30-yard.
      </p>
    ),
  },
  {
    question: "Do you serve Lafayette, Alamo, and Pleasant Hill too?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We deliver throughout the entire Lamorinda area: <strong>Lafayette, Alamo, Pleasant Hill,
        Clayton, Danville,</strong> and <strong>Concord</strong>. One call covers the entire region with
        no extra delivery fees for nearby communities.
      </p>
    ),
  },
  {
    question: "Can you work with HOA requirements in Walnut Creek?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. We understand that many Walnut Creek neighborhoods have HOA regulations. We ensure
        clean placement, use protective boards under dumpsters to prevent driveway damage, and can
        work with your HOA timeline and placement requirements. Just let us know what&apos;s needed.
      </p>
    ),
  },
  {
    question: "How much does a dumpster rental cost in Walnut Creek?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Our Walnut Creek dumpster rental prices start at <strong>$599 for a 10-yard</strong> dumpster
        (7-day rental, 1 ton included). 20-yard starts at $649 and 30-yard at $749.
        Transparent pricing with no hidden fees. Call <strong>(510) 650-2083</strong> for
        an exact quote based on your project.
      </p>
    ),
  },
];

const walnutCreekAbout = {
  cityName: "Walnut Creek",
  intro:
    "Walnut Creek is one of the East Bay's premier communities — known for upscale homes, beautiful neighborhoods, and a thriving culture of home improvement and remodeling. From downtown condos to sprawling estates in Alamo and Saranap, Walnut Creek homeowners demand quality service. TP Dumpsters delivers professional, HOA-friendly dumpster rentals across Walnut Creek and the entire Lamorinda area, supporting everything from kitchen remodels to full estate cleanouts.",
  highlights: [
    "Professional service that matches Walnut Creek's high standards",
    "Experienced working with HOAs and community guidelines",
    "Same-day delivery to Walnut Creek, Alamo, Lafayette & Pleasant Hill",
    "Trusted by Walnut Creek contractors, remodelers, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Kitchen and bathroom remodels in Downtown Walnut Creek and Rossmoor",
    "Full home renovations in Alamo, Saranap, and Lafayette",
    "Estate cleanouts and downsizing projects across Lamorinda",
    "Landscaping and outdoor remodeling debris in Pleasant Hill",
    "Roofing tear-offs and siding replacement on upscale homes",
    "Garage conversions and ADU construction in Northgate",
  ],
  closingText:
    "Whether you're remodeling your dream home or managing a large construction project, TP Dumpsters makes waste removal in Walnut Creek simple and professional. We offer transparent pricing, same-day delivery, and the respectful service you expect. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Walnut Creek, CA | Same-Day Delivery - TP Dumpsters",
  description:
    "Affordable dumpster rentals in Walnut Creek, CA. 10, 20 & 30 yard roll-off dumpsters. Same-day delivery to Downtown, Rossmoor, Alamo, Lafayette & all Lamorinda. HOA-friendly service. Call (510) 650-2083",
  keywords: [
    "dumpster rental Walnut Creek CA",
    "Walnut Creek dumpster",
    "roll-off dumpster Walnut Creek",
    "construction dumpster Walnut Creek",
    "Walnut Creek waste removal",
    "dumpster rental 94595",
    "dumpster rental 94596",
    "Lamorinda dumpster rental",
    "Alamo dumpster rental",
    "Lafayette dumpster rental",
    "Pleasant Hill dumpster rental",
    "cheap dumpster Walnut Creek CA",
    "junk removal Walnut Creek",
  ],
  openGraph: {
    title: "Dumpster Rental in Walnut Creek, CA - TP Dumpsters",
    description:
      "Fast, affordable dumpster rentals in Walnut Creek. 10, 20 & 30 yard dumpsters. Same-day delivery. Call (510) 650-2083",
    url: "https://tpdumpsters.com/walnut-creek",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/walnut-creek" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Walnut Creek",
  description:
    "Affordable, reliable dumpster rentals in Walnut Creek, CA. Same-day delivery to all Walnut Creek neighborhoods and Lamorinda.",
  url: "https://tpdumpsters.com/walnut-creek",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Walnut Creek",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Walnut Creek" },
    { "@type": "City", name: "Alamo" },
    { "@type": "City", name: "Lafayette" },
    { "@type": "City", name: "Pleasant Hill" },
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

export default function WalnutCreekPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <WalnutCreekHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...walnutCreekAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Walnut Creek" faqs={walnutCreekFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <WalnutCreekLocation />
      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[900px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-[24px] md:text-[30px] font-bold text-[#1a1a1a] mb-6 text-center">
            Why Rent a Dumpster in Walnut Creek, California?
          </h2>
          <div className="space-y-4 text-[#555] text-base leading-[1.8] font-[var(--font-poppins)]">
            <p>
              Walnut Creek is one of Contra Costa County&apos;s most desirable communities, with upscale neighborhoods like Rossmoor, Northgate, and Saranap where homeowners invest regularly in renovations and property upgrades. Whether you&apos;re remodeling a kitchen in Parkmead, clearing landscaping waste near Shell Ridge, or managing construction debris from a downtown condo renovation, a roll-off dumpster keeps your project running smoothly.
            </p>
            <p>
              The city&apos;s active real estate market and continuous property improvements drive demand for efficient waste removal solutions. From bathroom tear-outs to whole-home cleanouts, TP Dumpsters provides 10, 20, and 30 yard containers with transparent pricing that includes delivery, pickup, and up to 7 days of rental — perfect for both weekend warriors and professional contractors.
            </p>
            <p>
              Get started on your Walnut Creek project today. Book online for a 5% discount or call <a href="tel:+15106502083" className="text-tp-red font-semibold hover:underline">(510) 650-2083</a> for same-day delivery. We offer bilingual support and no surprise charges.
            </p>
          </div>
        </div>
      </section>
      <FloatingButtons />
      <Footer />
    </>
  );
}
