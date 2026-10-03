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
import FairfieldHero from "./components/FairfieldHero";
import FairfieldLocation, { FAIRFIELD_ZIPS, FAIRFIELD_NEARBY } from "./components/FairfieldLocation";

// Facts on this page come from /root/reports/tp-ciudades-tanda1/hechos.json
// (City of Fairfield Public Works engineering permit information and C&D debris
// page, Potrero Hills Landfill 2026 price list, Wikipedia for neighborhoods and
// Travis AFB). Prices come from src/lib/pricing.ts.

const s10 = sizeInfo("10");
const s20 = sizeInfo("20");
const s30 = sizeInfo("30");

const streetPermit =
  "Fairfield requires an encroachment permit to place a dumpster within a public street, and Public Works Engineering publishes a checklist specifically for dumpster placement in the public right-of-way. Applications are filed online through the city's Fairfield B.U.I.L.D. portal, and the city says to expect about 4 to 6 weeks from application to approval. Check with the city for current requirements before planning street placement.";

const fairfieldFaqs: CityFaqText[] = [
  {
    question: "Can I put a dumpster on the street in Fairfield?",
    answer: [
      streetPermit,
      "With that lead time, plan ahead for street placement. If you have room on your own driveway or property, placing the container there keeps it out of the public right-of-way.",
    ],
  },
  {
    question: "Do you deliver near Travis Air Force Base?",
    answer: [
      "Yes. Travis Air Force Base is in Fairfield, and we deliver to addresses across the 94533, 94534 and 94535 ZIP codes. If you live in on-base housing, check the base's access rules for outside vendors before you book.",
    ],
  },
  {
    question: "What size dumpster do I need for a move-out cleanout in Fairfield?",
    answer: [
      `Clearing out a garage or a few rooms before a move usually fits in a 10-yard (${s10.days}-day rental, ${s10.tons} ton included). A full house of furniture and boxes is typically a 20-yard (${s20.days} days, ${s20.tons} tons included), and a cleanout combined with remodel debris may need the 30-yard (${s30.tons} tons included).`,
    ],
  },
  {
    question: "Where is the nearest landfill to Fairfield?",
    answer: [
      "Potrero Hills Landfill is at 3675 Potrero Hills Lane in Suisun City, about 8 miles from Fairfield City Hall. Public hours are limited (Tuesday to Saturday, 9 a.m. to 1 p.m.), so a roll-off you can fill at home on your own schedule is often easier than hauling loads yourself.",
    ],
  },
  {
    question: "How much does a dumpster rental cost in Fairfield?",
    answer: pricingFaqAnswer("Fairfield"),
  },
  {
    question: "What can't go in the dumpster?",
    answer: prohibitedFaqAnswer(),
  },
];

const fairfieldAbout = {
  cityName: "Fairfield",
  intro:
    "Fairfield is home to Travis Air Force Base, and its neighborhoods stretch from Cordelia in the southwest, near the I-80 and I-680 interchange, to Green Valley and the golf-course communities of Rancho Solano and Paradise Valley. Common reasons to rent a dumpster here include moves, home remodels and garage or estate cleanouts.",
  highlights: [
    `Online prices from ${usd(s10.online)} (10-yard), ${usd(s20.online)} (20-yard) and ${usd(s30.online)} (30-yard)`,
    `Rental time included: ${s10.days} days on the 10-yard, ${s20.days} days on the 20- and 30-yard`,
    "Same-day delivery is often available when you call early in the day",
    "Bilingual team (English & Spanish)",
    "Quotes by text or call at (510) 650-2083",
  ],
  commonProjects: [
    "Move-out and estate cleanouts",
    "Kitchen and bathroom remodels",
    "Garage and storage cleanouts",
    "Roofing tear-offs",
    "Yard and landscaping projects",
    "Concrete and soil removal (10-yard)",
  ],
  closingText:
    "Book online to get the online price, or call (510) 650-2083 if you want help choosing a size for your Fairfield project.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Fairfield, CA | 10, 20 & 30 Yard - TP Dumpsters",
  description: `Dumpster rental in Fairfield, CA from ${usd(s10.online)} online. 10, 20 & 30 yard roll-offs for Cordelia, Green Valley, Rancho Solano, the Travis AFB area & ZIPs 94533-94535. Call (510) 650-2083.`,
  keywords: [
    "dumpster rental fairfield ca",
    "fairfield dumpster rental",
    "roll off dumpster fairfield",
    "construction dumpster fairfield ca",
    "dumpster rental 94533",
    "dumpster rental 94534",
    "dumpster rental 94535",
    "dumpster rental Travis AFB",
    "Cordelia dumpster rental",
    "Green Valley dumpster rental",
  ],
  openGraph: {
    title: "Dumpster Rental in Fairfield, CA - TP Dumpsters",
    description: `10, 20 & 30 yard roll-off dumpsters in Fairfield from ${usd(s10.online)} online. Call (510) 650-2083.`,
    url: "https://tpdumpsters.com/fairfield",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/fairfield" },
};

const jsonLd = localBusinessJsonLd({
  cityName: "Fairfield",
  slug: "fairfield",
  description:
    "Roll-off dumpster rentals in Fairfield, CA: 10, 20 and 30 yard containers for move-out cleanouts, remodels and construction projects.",
  zips: FAIRFIELD_ZIPS,
  nearbyCities: FAIRFIELD_NEARBY.map((c) => c.name),
});

export default function FairfieldPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(fairfieldFaqs)) }} />
      <Header />
      <FairfieldHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <PricingTable cityName="Fairfield" />
      <SizesSection />
      <AboutCitySection {...fairfieldAbout} />
      <CityLocalGuide
        cityName="Fairfield"
        lead="Fairfield-specific facts from the city's Public Works pages and the nearest landfill, so you can plan around permits and timing."
        disposal={{
          name: "Potrero Hills Landfill",
          location: "3675 Potrero Hills Lane in Suisun City, about 8 miles from Fairfield City Hall",
          note: "Public hours: Tuesday to Saturday, 9 a.m. to 1 p.m.",
        }}
        placement={[
          "A container on your own driveway or property stays out of the public right-of-way.",
          streetPermit,
        ]}
        cdRule={[
          "Residential, commercial and industrial projects over 1,000 square feet must submit a Construction & Demolition Recycling Plan before construction starts, and Fairfield's city code and CALGreen require at least 65% of C&D debris to be diverted from the landfill.",
          "If your job is permitted, ask the city how these rules apply before you order any container.",
        ]}
        sourceNote="Sources: City of Fairfield Public Works engineering permit information and construction & demolition debris page; Potrero Hills Landfill 2026 price list. Rules change, so confirm with the city before placing a container on the street."
      />
      <ErrorBoundary>
        <CityFaqsSection cityName="Fairfield" faqs={toFaqItems(fairfieldFaqs)} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <FairfieldLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
