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
import PinoleHero from "./components/PinoleHero";
import PinoleLocation, { PINOLE_ZIPS, PINOLE_NEARBY } from "./components/PinoleLocation";

// Facts on this page come from /root/reports/tp-ciudades-tanda1/hechos.json
// (City of Pinole Public Works permits page + encroachment application,
// demolition requirements page, Golden Bear Transfer Station 2026 info,
// Wikipedia for history). Prices come from src/lib/pricing.ts.

const s10 = sizeInfo("10");
const s20 = sizeInfo("20");
const s30 = sizeInfo("30");

const streetPermit =
  "Pinole requires an encroachment permit for construction activity in the public right-of-way, including storing or staging materials, and the application has a checkbox for \"Dumpster, Storage on Street, or Temporary Staging.\" Applications go through the city's eTRAKiT portal with Public Works, which asks for proof of insurance among other documents and issues the permit once fees are paid. Check with the city for current requirements before planning street placement.";

const pinoleFaqs: CityFaqText[] = [
  {
    question: "Do I need a permit for a dumpster on a Pinole street?",
    answer: [
      streetPermit,
      "Placing the dumpster on your own driveway or property keeps it out of the public right-of-way.",
    ],
  },
  {
    question: "I'm renovating an older home in Old Town Pinole. What size do I need?",
    answer: [
      `Pinole has been a community since the 1850s and the railroad arrived in 1878. Renovating an older home can produce heavy debris, so watch the weight: the 20-yard includes ${s20.tons} tons and the 30-yard ${s30.tons} tons. For concrete, brick or soil, use the 10-yard heavy-material options.`,
    ],
  },
  {
    question: "Does the 65% recycling rule apply to my Pinole project?",
    answer: [
      "Pinole's construction and demolition rules cover all non-residential projects and, for homes, new construction, demolitions, additions, and alterations of 1,000 square feet or more or valued at $50,000 or more (re-roofs excepted). Those projects file a Waste Management Plan through Green Halo, debris must go to a facility that recycles at least 65%, and disposal tickets must be marked \"C&D\" with Pinole as the origin.",
      "If your job is permitted, ask the city how the rules apply before you order any container.",
    ],
  },
  {
    question: "Where is the nearest transfer station to Pinole?",
    answer: [
      "Golden Bear Transfer Station, at 1 Parr Blvd. in Richmond, is roughly 6 miles from Pinole City Hall. It is open weekdays 7 a.m. to 5 p.m. and weekends 9 a.m. to 5 p.m.",
    ],
  },
  {
    question: "How much does a dumpster rental cost in Pinole?",
    answer: pricingFaqAnswer("Pinole"),
  },
  {
    question: "What can't go in the dumpster?",
    answer: prohibitedFaqAnswer(),
  },
];

const pinoleAbout = {
  cityName: "Pinole",
  intro:
    "Pinole sits on San Pablo Bay and has been a community since the 1850s; the railroad came through in 1878, and the historic Old Town along the bay still includes landmarks like the Fernandez Mansion on Tennent Avenue. Away from the water, Pinole Valley and the Appian Way and San Pablo Avenue corridors fill out the rest of the city. Projects here can range from renovating older homes in Old Town to cleanouts and remodels across the valley.",
  highlights: [
    `Online prices from ${usd(s10.online)} (10-yard), ${usd(s20.online)} (20-yard) and ${usd(s30.online)} (30-yard)`,
    `Up to ${s30.tons} tons included in the 30-yard; heavy materials go in the 10-yard`,
    "Same-day delivery is often available when you call early in the day",
    "Bilingual team (English & Spanish)",
    "Quotes by text or call at (510) 650-2083",
  ],
  commonProjects: [
    "Renovations on older Old Town homes",
    "Kitchen and bathroom remodels",
    "Garage, estate and move-out cleanouts",
    "Roofing tear-offs",
    "Backyard and landscaping projects",
    "Concrete and soil removal (10-yard)",
  ],
  closingText:
    "Book online to get the online price, or call (510) 650-2083 if you want help sizing your Pinole project.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Pinole, CA | 10, 20 & 30 Yard - TP Dumpsters",
  description: `Dumpster rental in Pinole, CA (94564) from ${usd(s10.online)} online. Roll-offs for Old Town renovations, Pinole Valley cleanouts and remodels. Bilingual support. Call (510) 650-2083.`,
  keywords: [
    "dumpster rental Pinole CA",
    "Pinole dumpster rental",
    "roll-off dumpster Pinole",
    "construction dumpster Pinole",
    "dumpster rental 94564",
    "dumpster rental Pinole Valley",
    "Old Town Pinole dumpster",
  ],
  openGraph: {
    title: "Dumpster Rental in Pinole, CA - TP Dumpsters",
    description: `10, 20 & 30 yard roll-off dumpsters in Pinole from ${usd(s10.online)} online.`,
    url: "https://tpdumpsters.com/pinole",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tpdumpsters.com/pinole" },
};

const jsonLd = localBusinessJsonLd({
  cityName: "Pinole",
  slug: "pinole",
  description:
    "Roll-off dumpster rentals in Pinole, CA: 10, 20 and 30 yard containers for renovations, cleanouts and construction projects.",
  zips: PINOLE_ZIPS,
  nearbyCities: PINOLE_NEARBY.map((c) => c.name),
});

export default function PinolePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(pinoleFaqs)) }} />
      <Header />
      <PinoleHero />
      <div className="h-[60px] bg-tp-red w-full" />
      <PricingTable cityName="Pinole" />
      <SizesSection />
      <AboutCitySection {...pinoleAbout} />
      <CityLocalGuide
        cityName="Pinole"
        lead="Pinole-specific facts from the city's Public Works and demolition pages and the nearest transfer station."
        disposal={{
          name: "Golden Bear Transfer Station",
          location: "1 Parr Blvd. in Richmond, roughly 6 miles from Pinole City Hall",
        }}
        placement={[
          "A container on your own driveway or property stays out of the public right-of-way.",
          streetPermit,
        ]}
        cdRule={[
          "Covered projects (all non-residential work and, for homes, new construction, demolitions, additions, and alterations of 1,000 sq ft or more or $50,000 or more, re-roofs excepted) file a Waste Management Plan through Green Halo. Debris must go to a facility that recycles at least 65%, with tickets marked \"C&D\" and origin \"Pinole.\"",
          "If your job is permitted, ask the city how these rules apply before you order any container.",
        ]}
        sourceNote="Sources: City of Pinole Public Works permits page and Encroachment Permit Application; City of Pinole demolition requirements; Golden Bear Transfer Station published information (2026). Rules change, so confirm with the city before placing a container on the street."
      />
      <ErrorBoundary>
        <CityFaqsSection cityName="Pinole" faqs={toFaqItems(pinoleFaqs)} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <PinoleLocation />
      <FloatingButtons />
      <Footer />
    </>
  );
}
