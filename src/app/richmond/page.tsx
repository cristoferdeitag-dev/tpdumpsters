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
import RichmondHero from "./components/RichmondHero";
import RichmondLocation, { RICHMOND_ZIPS, RICHMOND_NEARBY } from "./components/RichmondLocation";

// Facts on this page come from /root/reports/tp-ciudades-tanda1/hechos.json
// (City of Richmond encroachment permit application and C&D recycling form,
// Golden Bear Transfer Station 2026 published info, Wikipedia for history and
// neighborhoods). Prices come from src/lib/pricing.ts.

const s10 = sizeInfo("10");
const s20 = sizeInfo("20");
const s30 = sizeInfo("30");

const streetPermit =
  "Anything placed on a Richmond street or sidewalk needs an encroachment permit from the Public Works Department's Encroachment Services Division at 450 Civic Center Plaza. The city's application has its own line for debris boxes, and Richmond does not issue public right-of-way permits for POD-style storage containers. Check with the city for current requirements and fees before you plan on street placement.";

const richmondFaqs: CityFaqText[] = [
  {
    question: "Do I need a permit to put a dumpster on the street in Richmond?",
    answer: [
      streetPermit,
      "If you have room on your own driveway or property, placing the dumpster there keeps it out of the public right-of-way.",
    ],
  },
  {
    question: "Where is the nearest dump or transfer station in Richmond?",
    answer: [
      "Golden Bear Transfer Station is at 1 Parr Blvd. in Richmond, roughly 4 miles from City Hall. It is open Monday to Friday 7 a.m. to 5 p.m. and weekends 9 a.m. to 5 p.m., and closed on major holidays.",
      "If you would rather not make trips with a pickup, a roll-off lets you load at your own pace and we haul it away at the end of the rental.",
    ],
  },
  {
    question: "Which Richmond ZIP codes do you deliver to?",
    answer: [
      "We deliver to addresses in Richmond's 94801, 94804 and 94805 ZIP codes, from Point Richmond and Marina Bay to the Iron Triangle, Hilltop, Richmond Annex, Atchison Village and Parchester Village.",
    ],
  },
  {
    question: "What size dumpster do I need for a Richmond remodel?",
    answer: [
      `A bathroom remodel or a load of concrete or soil usually fits the 10-yard (${s10.days}-day rental, ${s10.tons} ton included; heavy materials go in the 10-yard only). A kitchen remodel or garage cleanout is typically a 20-yard job (${s20.tons} tons included). For a whole-house renovation or a large estate cleanout, the 30-yard gives you the most room (${s30.tons} tons included).`,
    ],
  },
  {
    question: "How much does a dumpster rental cost in Richmond?",
    answer: pricingFaqAnswer("Richmond"),
  },
  {
    question: "What can't I put in the dumpster?",
    answer: prohibitedFaqAnswer(),
  },
];

const richmondAbout = {
  cityName: "Richmond",
  intro:
    "Richmond grew up around its shipyards: during World War II, Kaiser's Richmond yards built 747 ships and the city's population reached roughly 120,000 by 1945. The city has kept changing since. Marina Bay was built on the former Shipyard No. 2 starting in the late 1980s, Hilltop grew up around Hilltop Mall in the 1970s, and since the 2000s Richmond has added new tract homes, condominiums and a transit village. That mix of older homes and newer construction keeps remodels, cleanouts and building projects going across the city.",
  highlights: [
    `Online prices from ${usd(s10.online)} for a 10-yard, ${usd(s20.online)} for a 20-yard and ${usd(s30.online)} for a 30-yard`,
    `Rental time included: ${s10.days} days on the 10-yard, ${s20.days} days on the 20- and 30-yard`,
    "Same-day delivery is often available when you call early in the day",
    "Bilingual team (English & Spanish)",
    "Quotes by text or call at (510) 650-2083",
  ],
  commonProjects: [
    "Remodels and repairs on older Richmond homes",
    "Garage, estate and move-out cleanouts",
    "New construction and townhome builds",
    "Concrete and soil removal (10-yard)",
    "Roofing tear-offs",
    "Yard and landscaping cleanups",
  ],
  closingText:
    "Book online to lock in the online price, or call (510) 650-2083 if you want help choosing a size for your Richmond project.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Richmond, CA | 10, 20 & 30 Yard - TP Dumpsters",
  description: `Roll-off dumpster rental in Richmond, CA from ${usd(s10.online)} online. 10, 20 & 30 yard sizes for Point Richmond, Marina Bay, Hilltop & ZIPs 94801, 94804, 94805. Call (510) 650-2083.`,
  keywords: [
    "dumpster rental Richmond CA",
    "Richmond dumpster rental",
    "roll-off dumpster Richmond",
    "construction dumpster Richmond",
    "dumpster rental 94801",
    "dumpster rental 94804",
    "dumpster rental 94805",
    "dumpster rental Point Richmond",
    "Marina Bay dumpster rental",
    "Hilltop dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Richmond, CA - TP Dumpsters",
    description: `10, 20 & 30 yard roll-off dumpsters in Richmond from ${usd(s10.online)} online. Call (510) 650-2083.`,
    url: "https://tpdumpsters.com/richmond",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/richmond" },
};

const jsonLd = localBusinessJsonLd({
  cityName: "Richmond",
  slug: "richmond",
  description:
    "Roll-off dumpster rentals in Richmond, CA: 10, 20 and 30 yard containers for remodels, cleanouts and construction projects.",
  zips: RICHMOND_ZIPS,
  nearbyCities: RICHMOND_NEARBY.map((c) => c.name),
});

export default function RichmondPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(richmondFaqs)) }} />
      <Header />
      <RichmondHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <PricingTable cityName="Richmond" />
      <SizesSection />
      <AboutCitySection {...richmondAbout} />
      <CityLocalGuide
        cityName="Richmond"
        lead="A few Richmond-specific facts from the city's own permit documents and the local transfer station, so you can plan before the truck shows up."
        disposal={{
          name: "Golden Bear Transfer Station",
          location: "1 Parr Blvd. in Richmond, roughly 4 miles from City Hall",
          note: "Open seven days a week: weekdays 7 a.m.–5 p.m., weekends 9 a.m.–5 p.m. (closed on major holidays).",
        }}
        placement={[
          "On your own driveway or private property, the container stays out of the public right-of-way.",
          streetPermit,
        ]}
        cdRule={[
          "Projects with a building permit that fall under California's CALGreen code (all new construction, residential additions that add floor area or volume, and larger commercial work) must recycle their construction and demolition debris and turn in a C&D recycling form with disposal receipts before final inspection. CALGreen sets a 50% minimum; local rules can be stricter.",
          "If your job is permitted, ask the city's Building division how these rules apply before you order any container.",
        ]}
        sourceNote="Sources: City of Richmond Encroachment Permit Application and C&D Waste Recycling Form; Golden Bear Transfer Station published information (2026). Rules and fees change, so confirm with the city before placing a container on the street."
      />
      <ErrorBoundary>
        <CityFaqsSection cityName="Richmond" faqs={toFaqItems(richmondFaqs)} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <RichmondLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
