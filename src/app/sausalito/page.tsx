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
import SausalitoHero from "./components/SausalitoHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import SausalitoLocation from "./components/SausalitoLocation";

const sausalitoFaqs = [
  {
    question: "Can you deliver dumpsters near Sausalito's waterfront and houseboat areas?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We&apos;re experienced with Sausalito&apos;s unique waterfront layout, including the houseboat
        community along Gate 5 Road. We know the access points and placement limitations near the
        marina. Call us with your address and we&apos;ll confirm the best delivery approach.
      </p>
    ),
  },
  {
    question: "How do you handle Sausalito's narrow, steep streets?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Sausalito&apos;s streets on Wolfback Ridge and Hurricane Gulch are among the steepest in Marin
        County. Our drivers are trained for these conditions and use specialized techniques for
        placement on inclines. We&apos;ll always do a site assessment to ensure safe, efficient delivery.
      </p>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Sausalito?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Dumpsters placed on public streets in Sausalito require a permit from the City of Sausalito.
        Given the limited parking throughout town, we strongly recommend private driveway or property
        placement when available. We can advise on the best option for your location.
      </p>
    ),
  },
  {
    question: "What size dumpster works best for historic building renovations in Sausalito?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For historic building renovations in Sausalito, a <strong>20-yard dumpster</strong> is the most
        popular choice — it handles demolition debris, old fixtures, and construction waste without
        taking up too much space. For larger projects involving structural work, the 30-yard is ideal.
      </p>
    ),
  },
  {
    question: "What are the most common dumpster rental uses in Sausalito?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Sausalito customers commonly rent dumpsters for:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Historic building and home renovations</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Houseboat maintenance and remodel debris</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Marinship commercial space renovations</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Hillside property landscaping projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Estate cleanouts and downsizing</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do you serve all Sausalito ZIP codes?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve both Sausalito ZIP codes: 94965 and 94966. From Downtown Sausalito to
        Wolfback Ridge and the houseboat community, we deliver throughout the entire Sausalito area.
      </p>
    ),
  },
];

const sausalitoAbout = {
  cityName: "Sausalito",
  intro:
    "Just across the Golden Gate Bridge from San Francisco, Sausalito is a picturesque waterfront community with a rich maritime heritage and stunning hillside homes. From historic Caledonia Street renovations to houseboat maintenance projects, Sausalito's compact layout and steep terrain demand a dumpster rental service that truly knows the area. TP Dumpsters delivers with precision to Sausalito's challenging addresses — navigating narrow streets, steep grades, and limited-access waterfront locations with care.",
  highlights: [
    "Experienced with waterfront and houseboat area access and placement",
    "Expert navigation of Sausalito's steep, narrow streets",
    "Familiar with City of Sausalito permit requirements and placement rules",
    "Trusted by Sausalito contractors, artists, and homeowners",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Historic home and building renovations in Downtown Sausalito",
    "Houseboat community maintenance and remodel projects",
    "Marinship commercial and studio space renovations",
    "Hillside home improvements on Wolfback Ridge",
    "Estate cleanouts and property downsizing",
    "Landscape and deck construction on steep lots",
  ],
  closingText:
    "Whether you're renovating a waterfront property or clearing out a hillside studio, TP Dumpsters brings reliable waste removal to every corner of Sausalito. We handle the logistics of tight streets and limited access so your project runs smoothly. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Sausalito, CA | Waterfront Service - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Sausalito, CA. Serving Downtown, Marinship, Wolfback Ridge, Houseboats & all ZIP codes. Waterfront delivery experts. Call (510) 650-2083",
  keywords: [
    "dumpster rental Sausalito CA",
    "Sausalito dumpster rental",
    "roll-off dumpster Sausalito",
    "construction dumpster Sausalito",
    "Sausalito waste removal",
    "dumpster rental 94965",
    "dumpster rental 94966",
    "dumpster rental Marin County",
    "Marinship dumpster rental",
    "Sausalito houseboat dumpster",
    "waterfront dumpster delivery Sausalito",
    "Wolfback Ridge dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Sausalito, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Sausalito. 10, 20 & 30 yard dumpsters. Waterfront delivery experts.",
    url: "https://tpdumpsters.com/sausalito",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/sausalito",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Sausalito",
  description:
    "Fast, reliable dumpster rentals in Sausalito, CA. Waterfront delivery experts serving all Sausalito neighborhoods.",
  url: "https://tpdumpsters.com/sausalito",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sausalito",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Sausalito",
      "@id": "https://en.wikipedia.org/wiki/Sausalito,_California",
    },
  ],
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "07:00",
    closes: "18:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dumpster Rental Sizes",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "10 Yard Dumpster Rental",
          description:
            "Compact dumpster ideal for tight spaces and heavy debris like soil, concrete, and bricks.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "20 Yard Dumpster Rental",
          description:
            "Versatile dumpster for kitchen/bathroom remodels, roofing projects, and yard cleanups.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "30 Yard Dumpster Rental",
          description:
            "Extra capacity dumpster for whole-home cleanouts, large renovations, and construction debris.",
        },
      },
    ],
  },
};

export default function SausalitoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <SausalitoHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...sausalitoAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Sausalito" faqs={sausalitoFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />

      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[800px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-[24px] md:text-[30px] font-bold text-[#333] mb-6 text-center">
            Why Rent a Dumpster in Sausalito, California?
          </h2>
          <div className="text-[#555] text-base leading-[1.8] font-[var(--font-poppins)] space-y-4">
            <p>
              Sausalito&apos;s iconic waterfront setting just north of the Golden Gate Bridge makes
              it a jewel of Marin County — and a uniquely challenging place for dumpster delivery.
              The city&apos;s steep hillside streets, historic buildings, and famous houseboat community
              all demand a waste hauler with specialized local knowledge. Whether you&apos;re renovating
              a century-old home on Spring Street or clearing construction debris from a Marinship
              studio, precise dumpster placement matters here.
            </p>
            <p>
              Limited street parking and narrow access points throughout Sausalito mean that standard
              delivery approaches often don&apos;t work. TP Dumpsters brings years of experience
              navigating these exact conditions. Our 10, 20, and 30-yard roll-off containers fit
              projects of every scale, from small houseboat cleanups to full historic renovations.
              With same-day delivery, transparent pricing, and bilingual support in English and
              Spanish, we make dumpster rental in Sausalito hassle-free. Call (510) 650-2083 for
              a free quote today.
            </p>
          </div>
        </div>
      </section>

      <SausalitoLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
