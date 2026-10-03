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
import VallejoHero from "./components/VallejoHero";
import VallejoLocation, { VALLEJO_ZIPS, VALLEJO_NEARBY } from "./components/VallejoLocation";

// Facts on this page come from /root/reports/tp-ciudades-tanda1/hechos.json
// (City of Vallejo C&D page / Municipal Code Ch. 7.53, City of Vallejo Central
// Permit Center, Devlin Road facility rate sheet effective Nov 2025, Wikipedia
// for history and neighborhoods). Prices come from src/lib/pricing.ts.

const s10 = sizeInfo("10");
const s20 = sizeInfo("20");
const s30 = sizeInfo("30");

const streetPermit =
  "Vallejo requires an encroachment permit to place a temporary structure or object in the public right-of-way. Those permits are handled by the Central Permit Center (Public Works) on the second floor of City Hall, 555 Santa Clara Street. Check with the city for current requirements and fees before planning street placement.";

const cdRule =
  "Under Vallejo Municipal Code Chapter 7.53 and CALGreen, projects valued at $50,000 or more or covering 1,000 square feet or more, plus every demolition, must recycle at least 65% of their construction and demolition debris and 75% of their concrete and asphalt. A Waste Management Plan is due before the permit is issued and weight tags before final inspection; the city can impose a penalty of up to 3% of the project value.";

const vallejoFaqs: CityFaqText[] = [
  {
    question: "Do I need a permit for a dumpster on a Vallejo street?",
    answer: [
      streetPermit,
      "If there is room on your driveway or property, placing the container there keeps it out of the public right-of-way.",
    ],
  },
  {
    question: "Does Vallejo's construction recycling rule apply to my project?",
    answer: [
      cdRule,
      "If your job is permitted, ask the city how the rule applies before you order any container.",
    ],
  },
  {
    question: "Which dumpster works for an older Downtown Vallejo home?",
    answer: [
      `Downtown Vallejo is known for its historic Victorian and Craftsman houses. For interior work on a home like that, a 20-yard (${s20.days}-day rental, ${s20.tons} tons included) is a common starting point; a full gut usually calls for the 30-yard (${s30.tons} tons included). Old masonry, concrete or soil should go in the 10-yard heavy-material options.`,
    ],
  },
  {
    question: "Where is the nearest transfer station to Vallejo?",
    answer: [
      "The Devlin Road Recycling & Transfer Facility is at 889 Devlin Road in American Canyon, about 8 miles from Vallejo City Hall, and is open every day from 8 a.m. to 4 p.m.",
    ],
  },
  {
    question: "How much does a dumpster rental cost in Vallejo?",
    answer: pricingFaqAnswer("Vallejo"),
  },
  {
    question: "What can't go in the dumpster?",
    answer: prohibitedFaqAnswer(),
  },
];

const vallejoAbout = {
  cityName: "Vallejo",
  intro:
    "Vallejo's story starts on the water. Mare Island was home to the Mare Island Naval Shipyard, founded in 1854 and now a historic district, and Downtown Vallejo is known for its historic Victorian and Craftsman homes. The city also recognizes the St. Vincent's Hill, Vallejo Heritage and Vallejo Old City historic districts, and further out you'll find neighborhoods like Glen Cove and Hiddenbrooke, a planned community with its own golf course. Restoring an older house and clearing out a newer one both start with the right container.",
  highlights: [
    `Online prices from ${usd(s10.online)} (10-yard), ${usd(s20.online)} (20-yard) and ${usd(s30.online)} (30-yard)`,
    `${s20.days}-day rentals on the 20- and 30-yard for longer restoration work`,
    "Same-day delivery is often available when you call early in the day",
    "Bilingual team (English & Spanish)",
    "Quotes by text or call at (510) 650-2083",
  ],
  commonProjects: [
    "Restoration and remodels on older homes",
    "Kitchen and bathroom remodels",
    "Garage, estate and move-out cleanouts",
    "Roofing tear-offs",
    "Yard and landscaping cleanups",
    "Concrete and soil removal (10-yard)",
  ],
  closingText:
    "Book online to get the online price, or call (510) 650-2083 if you want help choosing a size for your Vallejo project.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Vallejo, CA | 10, 20 & 30 Yard - TP Dumpsters",
  description: `Dumpster rental in Vallejo, CA from ${usd(s10.online)} online. 10, 20 & 30 yard roll-offs for Downtown, Mare Island, Glen Cove, Hiddenbrooke & ZIPs 94589-94592. Call (510) 650-2083.`,
  keywords: [
    "dumpster rental Vallejo CA",
    "Vallejo dumpster rental",
    "roll-off dumpster Vallejo",
    "construction dumpster Vallejo",
    "dumpster rental 94589",
    "dumpster rental 94590",
    "dumpster rental 94591",
    "dumpster rental 94592",
    "Mare Island dumpster rental",
    "Glen Cove dumpster rental",
    "Hiddenbrooke dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Vallejo, CA - TP Dumpsters",
    description: `10, 20 & 30 yard roll-off dumpsters in Vallejo from ${usd(s10.online)} online. Call (510) 650-2083.`,
    url: "https://tpdumpsters.com/vallejo",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/vallejo" },
};

const jsonLd = localBusinessJsonLd({
  cityName: "Vallejo",
  slug: "vallejo",
  description:
    "Roll-off dumpster rentals in Vallejo, CA: 10, 20 and 30 yard containers for restorations, remodels, cleanouts and construction projects.",
  zips: VALLEJO_ZIPS,
  nearbyCities: VALLEJO_NEARBY.map((c) => c.name),
});

export default function VallejoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(vallejoFaqs)) }} />
      <Header />
      <VallejoHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <PricingTable cityName="Vallejo" />
      <SizesSection />
      <AboutCitySection {...vallejoAbout} />
      <CityLocalGuide
        cityName="Vallejo"
        lead="Vallejo-specific facts from the city's construction recycling rules, its permit center and the nearest transfer facility."
        disposal={{
          name: "Devlin Road Recycling & Transfer Facility",
          location: "889 Devlin Road in American Canyon, about 8 miles from Vallejo City Hall",
          note: "Open every day, 8 a.m. to 4 p.m.",
        }}
        placement={[
          "A container on your own driveway or property stays out of the public right-of-way.",
          streetPermit,
        ]}
        cdRule={[cdRule, "If your job is permitted, ask the city how the rule applies before you order any container."]}
        sourceNote="Sources: City of Vallejo construction & demolition debris page (Municipal Code Ch. 7.53); City of Vallejo Central Permit Center; Devlin Road Recycling & Transfer Facility rate sheet (effective November 2025). Rules and fees change, so confirm with the city before placing a container on the street."
      />
      <ErrorBoundary>
        <CityFaqsSection cityName="Vallejo" faqs={toFaqItems(vallejoFaqs)} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <VallejoLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
