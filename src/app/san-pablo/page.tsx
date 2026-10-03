import type { Metadata } from "next";
import Header from "@/components/Header";
import SizesSection from "@/components/SizesSection";
import PricingTable from "@/components/PricingTable";
import FaqsSection from "@/components/FaqsSection";
import CityFaqsSection from "@/components/CityFaqsSection";
import AboutCitySection from "@/components/AboutCitySection";
import CityLocalGuide from "@/components/CityLocalGuide";
import ErrorBoundary from "@/components/ErrorBoundary";
import DynamicReviews from "@/components/DynamicReviews";
import WhyUsSection from "@/components/WhyUsSection";
import DynamicGallery from "@/components/DynamicGallery";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import DynamicServiceAreaMap from "@/components/DynamicServiceAreaMap";
import { toFaqItems } from "@/components/cityFaqItems";
import {
  type CityFaqText,
  faqJsonLd,
  localBusinessJsonLd,
  pricingFaqAnswer,
  prohibitedFaqAnswer,
  sizeInfo,
  usd,
} from "@/lib/cityLanding";
import { SIZE_SPECS } from "@/lib/pricing";
import SanPabloHero from "./components/SanPabloHero";
import SanPabloLocation, { SAN_PABLO_ZIPS, SAN_PABLO_NEARBY } from "./components/SanPabloLocation";

// Facts on this page come from /root/reports/tp-ciudades-tanda1/hechos.json
// (City of San Pablo encroachment permit page + application, building permit
// application with the C&D section, Golden Bear Transfer Station 2026 info,
// Wikipedia for population and area). Prices come from src/lib/pricing.ts.

const s10 = sizeInfo("10");
const s20 = sizeInfo("20");
const s30 = sizeInfo("30");

const streetPermit =
  "San Pablo requires an encroachment permit for placing objects in the public right-of-way, and the city's application lists \"dumpster and containers at parking lane\" as minor traffic control work. The application asks for a site plan, proof of liability insurance naming the city, and a traffic control plan. Permits go through Public Works Engineering at City Hall, 1000 Gateway Ave. Check with the city for current requirements before planning street placement.";

const sanPabloFaqs: CityFaqText[] = [
  {
    question: "Can I put a dumpster in the parking lane in San Pablo?",
    answer: [
      streetPermit,
      "If your driveway or lot has room, keeping the container on private property avoids using the street.",
    ],
  },
  {
    question: "My San Pablo driveway is short. Which dumpster fits?",
    answer: [
      `San Pablo packs about 32,000 residents into 2.6 square miles, so it is worth checking the space you have. The 10-yard is the smallest footprint we offer at ${SIZE_SPECS["10"].dims}; the 20-yard and 30-yard are both ${SIZE_SPECS["20"].dims.split("×").slice(0, 2).join("×")} long and wide, with taller walls. If you are unsure about fit, text a photo of the spot to (510) 650-2083.`,
    ],
  },
  {
    question: "What size dumpster do I need for a home cleanout in San Pablo?",
    answer: [
      `A single garage or a couple of rooms usually fits in a 10-yard (${s10.tons} ton included). A full-house cleanout is typically a 20-yard (${s20.tons} tons included), and a cleanout combined with remodel debris may need the 30-yard (${s30.tons} tons included).`,
    ],
  },
  {
    question: "Where is the nearest transfer station to San Pablo?",
    answer: [
      "Golden Bear Transfer Station, at 1 Parr Blvd. in neighboring Richmond, is about 3 miles from San Pablo City Hall. It is open weekdays 7 a.m. to 5 p.m. and weekends 9 a.m. to 5 p.m.",
    ],
  },
  {
    question: "How much does a dumpster rental cost in San Pablo?",
    answer: pricingFaqAnswer("San Pablo"),
  },
  {
    question: "What can't go in the dumpster?",
    answer: prohibitedFaqAnswer(),
  },
];

const sanPabloAbout = {
  cityName: "San Pablo",
  intro:
    "San Pablo is compact: about 32,000 residents in just 2.6 square miles of West Contra Costa County. The city's General Plan steers new mixed-use development to corridors like Rumrill Boulevard and San Pablo Avenue. In a city that dense, the space you have for a container can matter as much as the size you need.",
  highlights: [
    `Smallest footprint: the 10-yard is ${SIZE_SPECS["10"].dims}`,
    `Online prices from ${usd(s10.online)} (10-yard), ${usd(s20.online)} (20-yard) and ${usd(s30.online)} (30-yard)`,
    "Same-day delivery is often available when you call early in the day",
    "Bilingual team (English & Spanish)",
    "Not sure what fits? Text a photo of the spot to (510) 650-2083",
  ],
  commonProjects: [
    "Home and garage cleanouts",
    "Kitchen and bathroom remodels",
    "Small business and storefront cleanouts",
    "Roofing tear-offs",
    "Yard cleanups",
    "Concrete and soil removal (10-yard)",
  ],
  closingText:
    "Book online to get the online price, or call (510) 650-2083 and we will help you pick the size that fits your San Pablo driveway.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in San Pablo, CA | 10, 20 & 30 Yard - TP Dumpsters",
  description: `Dumpster rental in San Pablo, CA (94806) from ${usd(s10.online)} online. 10, 20 & 30 yard roll-offs for cleanouts, remodels and construction. Call (510) 650-2083.`,
  keywords: [
    "dumpster rental San Pablo CA",
    "San Pablo dumpster rental",
    "roll-off dumpster San Pablo",
    "construction dumpster San Pablo",
    "dumpster rental 94806",
    "junk removal San Pablo",
    "small dumpster San Pablo",
  ],
  openGraph: {
    title: "Dumpster Rental in San Pablo, CA - TP Dumpsters",
    description: `10, 20 & 30 yard roll-off dumpsters in San Pablo from ${usd(s10.online)} online. Call (510) 650-2083.`,
    url: "https://tpdumpsters.com/san-pablo",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/san-pablo" },
};

const jsonLd = localBusinessJsonLd({
  cityName: "San Pablo",
  slug: "san-pablo",
  description:
    "Roll-off dumpster rentals in San Pablo, CA: 10, 20 and 30 yard containers for cleanouts, remodels and construction projects.",
  zips: SAN_PABLO_ZIPS,
  nearbyCities: SAN_PABLO_NEARBY.map((c) => c.name),
});

export default function SanPabloPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(sanPabloFaqs)) }} />
      <Header />
      <SanPabloHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <PricingTable cityName="San Pablo" />
      <SizesSection />
      <AboutCitySection {...sanPabloAbout} />
      <CityLocalGuide
        cityName="San Pablo"
        lead="San Pablo-specific facts from the city's permit documents and the nearest transfer station, so there are no surprises on delivery day."
        disposal={{
          name: "Golden Bear Transfer Station",
          location: "1 Parr Blvd. in neighboring Richmond, about 3 miles from San Pablo City Hall",
        }}
        placement={[
          "A container on your own driveway or lot stays off the street and out of the public right-of-way.",
          streetPermit,
        ]}
        cdRule={[
          "Since January 1, 2017, San Pablo projects covered by California's CALGreen code must recycle at least 65% of their construction and demolition debris. That includes new construction, demolitions that need a permit and, for homes, additions or alterations that add floor area. The city will not final the permit without disposal receipts or weight tickets.",
          "If your project has a building permit, ask the city how these rules apply before you order any container.",
        ]}
        sourceNote="Sources: City of San Pablo Encroachment Permit page and application; City of San Pablo Building Permit Application (C&D section); Golden Bear Transfer Station published information (2026). Rules change, so confirm with the city before placing a container on the street."
      />
      <ErrorBoundary>
        <CityFaqsSection cityName="San Pablo" faqs={toFaqItems(sanPabloFaqs)} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <SanPabloLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
