import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import DumpsterPhotosGrid from "@/components/DumpsterPhotosGrid";
import Image from "next/image";
import Link from "next/link";
import FaqAccordion from "./components/FaqAccordion";
import {
  FaCalendarDays,
  FaPhone,
  FaHammer,
  FaCircleCheck,
  FaCircleXmark,
  FaTruck,
  FaClipboardList,
  FaTrashCan,
  FaMapLocationDot,
  FaScrewdriverWrench,
  FaDumpster,
  FaHouseChimney,
  FaKitchenSet,
  FaBath,
  FaBuilding,
  FaRulerCombined,
  FaWindowMaximize,
  FaLayerGroup,
  FaHelmetSafety,
  FaWrench,
  FaHouseCrack,
  FaWarehouse,
} from "react-icons/fa6";

/* ───────── SEO METADATA ───────── */
export const metadata: Metadata = {
  title: "Construction Debris Dumpster Rental | Bay Area Contractors - TP Dumpsters",
  description:
    "Rent a construction debris dumpster for remodels, demolition, and renovation projects. 10, 20 & 30 yard sizes. Serving Bay Area contractors. Book online!",
  keywords:
    "construction debris dumpster rental, construction dumpster rental, construction waste dumpster, demolition debris dumpster, renovation dumpster rental, contractor dumpster rental bay area, roll off dumpster for construction",
  openGraph: {
    title: "Construction Debris Dumpster Rental | Bay Area Contractors - TP Dumpsters",
    description:
      "Rent a construction debris dumpster for remodels, demolition, and renovation projects. 10, 20 & 30 yard sizes. Serving Bay Area contractors.",
    url: "https://tpdumpsters.com/construction-debris",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://tpdumpsters.com/construction-debris",
  },
};

/* ───────── JSON-LD SCHEMA ───────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Construction Debris Dumpster Rental",
  description:
    "Rent a construction debris dumpster for remodels, demolition, renovation projects, and contractor job sites. Available in 10, 20, and 30 yard sizes across the San Francisco Bay Area.",
  provider: {
    "@type": "LocalBusiness",
    name: "TP Dumpsters",
    telephone: "+1-510-650-2083",
    url: "https://tpdumpsters.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3201 Ramona Street",
      addressLocality: "Pinole",
      addressRegion: "CA",
      postalCode: "94564",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "County", name: "Contra Costa County, CA" },
      { "@type": "County", name: "Alameda County, CA" },
      { "@type": "County", name: "Solano County, CA" },
      { "@type": "County", name: "Marin County, CA" },
      { "@type": "County", name: "San Mateo County, CA" },
      { "@type": "County", name: "Santa Clara County, CA" },
      { "@type": "City", name: "San Francisco, CA" },
    ],
  },
  serviceType: "Construction Dumpster Rental",
  offers: [
    {
      "@type": "Offer",
      name: "10 Yard Construction Debris Dumpster",
      price: "599",
      priceCurrency: "USD",
      description: "10 yard dumpster — 1 ton included, 7-day rental, 12ft L × 8ft W × 2.5ft H",
    },
    {
      "@type": "Offer",
      name: "20 Yard Construction Debris Dumpster",
      price: "649",
      priceCurrency: "USD",
      description: "20 yard dumpster — 2 tons included, 7-day rental, 16ft L × 8ft W × 4ft H",
    },
    {
      "@type": "Offer",
      name: "30 Yard Construction Debris Dumpster",
      price: "749",
      priceCurrency: "USD",
      description: "30 yard dumpster — 3 tons included, 7-day rental, 16ft L × 8ft W × 6ft H",
    },
  ],
};

/* ───────── FAQ Schema ───────── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is considered construction debris?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Construction debris includes materials generated during building, remodeling, renovation, or demolition projects. Common examples include lumber, drywall, plywood, roofing shingles, flooring, cabinets, doors, windows, plumbing fixtures, siding, and trim. Essentially any non-hazardous material from a construction or renovation job site qualifies.",
      },
    },
    {
      "@type": "Question",
      name: "What size dumpster do I need for a remodel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most single-room remodels (kitchen or bathroom), a 20-yard dumpster is ideal. For larger renovations involving multiple rooms or a whole-house remodel, a 30-yard dumpster provides the space you need. Small projects like a single bathroom demo may only need a 10-yard.",
      },
    },
    {
      "@type": "Question",
      name: "Can I put concrete in a construction debris dumpster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Small amounts of concrete mixed with other construction debris are acceptable. However, large quantities of concrete, brick, or stone should go in a dedicated heavy materials dumpster to avoid overweight charges. Concrete is extremely heavy — even a small amount adds significant weight.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a construction dumpster cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "10-yard: $599 (1 ton, 7 days). 20-yard: $649 (2 tons, 7 days). 30-yard: $749 (3 tons, 7 days). All prices include delivery, pickup, and disposal. Additional days are $49/day and overweight charges are $125/ton.",
      },
    },
    {
      "@type": "Question",
      name: "Can contractors get recurring dumpster service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We work with contractors throughout the Bay Area and offer recurring dumpster service for ongoing projects. Whether you need weekly swaps or multiple dumpsters on the same job site, call us at (510) 650-2083 to set up a contractor account with priority scheduling.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between construction debris and general debris?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Construction debris specifically includes materials from building, remodeling, or demolition projects — lumber, drywall, roofing, fixtures, etc. General debris is broader and includes household items, furniture, clothing, and yard waste. Both categories use the same dumpster sizes and pricing at TP Dumpsters.",
      },
    },
    {
      "@type": "Question",
      name: "How heavy can a construction dumpster get?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each dumpster includes a weight allowance: 10-yard (1 ton), 20-yard (2 tons), 30-yard (3 tons). Construction materials like lumber and drywall are moderate in weight, but materials like tile, concrete, and roofing shingles are heavy. Overweight charges are $125/ton prorated.",
      },
    },
    {
      "@type": "Question",
      name: "Do you deliver to active job sites?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We deliver to active construction and renovation job sites throughout the Bay Area. Just make sure there's adequate space for our truck to place the dumpster safely. We can place on driveways, streets (with permit), parking lots, and cleared areas on the job site.",
      },
    },
    {
      "@type": "Question",
      name: "Can I put roofing materials in a construction debris dumpster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Roofing shingles, underlayment, flashing, gutters, fascia, and soffit are all accepted in construction debris dumpsters. Keep in mind that roofing materials — especially shingles — are heavy, so factor the weight into your dumpster size selection.",
      },
    },
    {
      "@type": "Question",
      name: "What permits do I need for a construction dumpster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If the dumpster is placed on your private property (driveway, yard, etc.), no permit is typically needed. If it must be placed on a public street or sidewalk, most Bay Area cities require a temporary encroachment or right-of-way permit. We can advise you on local requirements when you book.",
      },
    },
  ],
};

/* ───────── Data Arrays ───────── */
const dumpsterSizes = [
  {
    name: "10 Yard",
    price: "$599",
    dimensionsClean: "12&apos;L × 8&apos;W × 2.5&apos;H",
    weight: "1 ton included",
    rental: "7-day rental",
    image: "/images/sizes/10-yard.png",
    bestFor: "Small demos, single bathroom remodel, minor renovations",
    popular: false,
  },
  {
    name: "20 Yard",
    price: "$649",
    dimensionsClean: "16&apos;L × 8&apos;W × 4&apos;H",
    weight: "2 tons included",
    rental: "7-day rental",
    image: "/images/sizes/20-yard.png",
    bestFor: "Kitchen remodels, bathroom renovations, medium construction projects",
    popular: true,
  },
  {
    name: "30 Yard",
    price: "$749",
    dimensionsClean: "16&apos;L × 8&apos;W × 6&apos;H",
    weight: "3 tons included",
    rental: "7-day rental",
    image: "/images/sizes/30-yard.png",
    bestFor: "Whole-house remodels, demolition, large renovation projects",
    popular: false,
  },
];

const commonProjects = [
  { name: "Kitchen Remodel", icon: <FaKitchenSet /> },
  { name: "Bathroom Renovation", icon: <FaBath /> },
  { name: "Room Addition", icon: <FaRulerCombined /> },
  { name: "Whole-House Remodel", icon: <FaHouseChimney /> },
  { name: "Demolition", icon: <FaHouseCrack /> },
  { name: "Deck Removal", icon: <FaHammer /> },
  { name: "Garage Conversion", icon: <FaWarehouse /> },
  { name: "Roof Replacement", icon: <FaHelmetSafety /> },
  { name: "Window Replacement", icon: <FaWindowMaximize /> },
  { name: "Flooring Project", icon: <FaLayerGroup /> },
  { name: "Commercial Buildout", icon: <FaBuilding /> },
  { name: "Tenant Improvement", icon: <FaWrench /> },
];

const serviceCounties = [
  { name: "Contra Costa County", slug: "contra-costa-county" },
  { name: "Alameda County", slug: "alameda-county" },
  { name: "Solano County", slug: "solano-county" },
  { name: "Marin County", slug: "marin-county" },
  { name: "San Mateo County", slug: "san-mateo-county" },
  { name: "Santa Clara County", slug: "santa-clara-county" },
  { name: "San Francisco", slug: "san-francisco" },
];

const extraFees = [
  { item: "Extra rental days", fee: "$49/day" },
  { item: "Overweight charges", fee: "$125/ton (prorated)" },
  { item: "Mattresses", fee: "$60 each" },
  { item: "Appliances (with freon)", fee: "$40 each" },
  { item: "Tires", fee: "$20 each" },
  { item: "Cancellation fee", fee: "$150 (24h notice required)" },
  { item: "Payment methods", fee: "Credit card online or Zelle" },
];

/* ───────── FAQ Data ───────── */
const faqsLeft = [
  {
    question: "What is considered construction debris?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Construction debris includes materials generated during building, remodeling, renovation, or demolition projects. Common examples include lumber, drywall, plywood, roofing shingles, flooring, cabinets, doors, windows, plumbing fixtures, siding, and trim. Essentially any non-hazardous material from a construction or renovation job site qualifies as construction debris.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a remodel?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For most single-room remodels (kitchen or bathroom), a <strong>20-yard dumpster</strong> is ideal. It handles demo debris, old cabinets, flooring, drywall, and fixtures with room to spare. For larger renovations involving multiple rooms or a whole-house remodel, go with a 30-yard. Small projects like a single bathroom demo may only need a 10-yard.
      </p>
    ),
  },
  {
    question: "Can I put concrete in a construction debris dumpster?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Small amounts of concrete mixed with other construction debris are acceptable. However, large quantities of concrete, brick, or stone should go in a dedicated heavy materials dumpster to avoid overweight charges. Concrete is extremely heavy — even a small amount adds significant weight to your load.
      </p>
    ),
  },
  {
    question: "How much does a construction dumpster cost?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Our construction debris dumpster pricing:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>10-yard:</strong> $599 — includes 1 ton and 7-day rental</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>20-yard:</strong> $649 — includes 2 tons and 7-day rental</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>30-yard:</strong> $749 — includes 3 tons and 7-day rental</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          All prices include delivery, pickup, and disposal. Additional days are $49/day, and overweight charges are $125 per ton (prorated).
        </p>
      </>
    ),
  },
  {
    question: "Can contractors get recurring dumpster service?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We work with contractors throughout the Bay Area and offer recurring dumpster service for ongoing projects. Whether you need weekly swaps or multiple dumpsters on the same job site, call us at <strong>(510) 650-2083</strong> to set up a contractor account with priority scheduling and streamlined billing.
      </p>
    ),
  },
];

const faqsRight = [
  {
    question: "What\u0027s the difference between construction debris and general debris?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Construction debris specifically includes materials from building, remodeling, or demolition projects — lumber, drywall, roofing, fixtures, etc. General debris is broader and includes household items, furniture, clothing, and yard waste. Both categories use the same dumpster sizes and pricing at TP Dumpsters, so choose the category that best describes your project.
      </p>
    ),
  },
  {
    question: "How heavy can a construction dumpster get?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Each dumpster includes a weight allowance:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>10-yard:</strong> 1 ton (2,000 lbs)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>20-yard:</strong> 2 tons (4,000 lbs)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>30-yard:</strong> 3 tons (6,000 lbs)</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          Construction materials like lumber and drywall are moderate in weight, but tile, concrete, and roofing shingles are heavy. Overweight charges are <strong>$125/ton</strong> prorated.
        </p>
      </>
    ),
  },
  {
    question: "Do you deliver to active job sites?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. We deliver to active construction and renovation job sites throughout the Bay Area. Just make sure there&apos;s adequate space for our truck to place the dumpster safely. We can place on driveways, streets (with permit), parking lots, and cleared areas on the job site.
      </p>
    ),
  },
  {
    question: "Can I put roofing materials in a construction debris dumpster?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Roofing shingles, underlayment, flashing, gutters, fascia, and soffit are all accepted in construction debris dumpsters. Keep in mind that roofing materials — especially shingles — are heavy, so factor the weight into your dumpster size selection to avoid overweight charges.
      </p>
    ),
  },
  {
    question: "What permits do I need for a construction dumpster?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on your private property (driveway, yard, etc.), no permit is typically needed. If it must be placed on a public street or sidewalk, most Bay Area cities require a temporary encroachment or right-of-way permit. We can advise you on local requirements when you book — just call <strong>(510) 650-2083</strong>.
      </p>
    ),
  },
];

/* ═══════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════ */
export default function ConstructionDebrisPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      {/* ────── HERO SECTION ────── */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center pt-[15vh] pb-[6vh] text-center">
        <div className="absolute inset-0 bg-[url('/images/dumpsters/construction-site.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/55 z-[1]" />

        <div className="relative z-[2] px-5 pb-10 max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block bg-tp-gold-dark text-white px-6 py-2 text-[13px] md:text-base font-bold rounded-[3px] font-[var(--font-poppins)]">
              Built for Contractors &amp; Remodelers
            </span>
          </div>
          <h1 className="font-[var(--font-oswald)] text-[28px] sm:text-[3rem] lg:text-[4.5rem] font-extrabold text-white uppercase leading-[1.1] mb-4 tracking-wide">
            CONSTRUCTION DEBRIS DUMPSTER RENTAL
          </h1>
          <p className="font-[var(--font-poppins)] text-base sm:text-[1.4rem] lg:text-[1.6rem] font-medium text-white/90 italic mb-8 max-w-3xl mx-auto">
            Roll-off dumpsters for remodels, demolition, and renovation projects across the Bay Area
          </p>
          <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-4 flex-wrap">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 w-full sm:w-auto justify-center px-8 py-4 rounded-lg text-lg font-semibold bg-tp-red text-white hover:bg-tp-red-dark transition-all duration-300 font-[var(--font-poppins)]"
            >
              <FaCalendarDays /> Get a Quote
            </Link>
            <a
              href="tel:+15106502083"
              className="inline-flex items-center gap-2 w-full sm:w-auto justify-center px-8 py-4 rounded-lg text-lg font-semibold bg-transparent text-white border-2 border-tp-red hover:bg-tp-red hover:text-white transition-all duration-300 font-[var(--font-poppins)]"
            >
              <FaPhone /> (510) 650-2083
            </a>
          </div>
          <div className="mt-10">
            <Image src="/images/dumpsters/dumpsters-side-by-side.jpg" alt="Construction Debris Dumpsters - TP Dumpsters" width={600} height={400} className="rounded-xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* ────── DUMPSTER SIZES ────── */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            SIZES &amp; PRICING
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4">
            Construction Debris Dumpster Sizes
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            Choose the right construction dumpster for your project. All prices include delivery, pickup, disposal, and a 7-day rental period. No hidden fees.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
            {dumpsterSizes.map((size) => (
              <div
                key={size.name}
                className={`bg-white border-2 ${size.popular ? "border-tp-red" : "border-[#e0e0e0]"} rounded-xl overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] relative`}
              >
                {size.popular && (
                  <div className="bg-tp-red text-white text-center py-2 text-sm font-bold font-[var(--font-poppins)] uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="px-6 pt-6 pb-2 text-center">
                  <h3 className="font-[var(--font-poppins)] text-[28px] font-bold text-[#333]">
                    {size.name}
                  </h3>
                  <p className="font-[var(--font-oswald)] text-[42px] font-bold text-tp-red mt-4">
                    {size.price}
                  </p>
                </div>
                <div className="px-6 py-4 flex items-center justify-center min-h-[160px]">
                  <Image
                    src={size.image}
                    alt={`${size.name} Construction Debris Dumpster Rental - TP Dumpsters`}
                    width={300}
                    height={160}
                    className="max-h-[140px] object-contain"
                  />
                </div>
                <div className="px-6 py-4 flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-[#555]">
                      <FaCircleCheck className="text-green-600 flex-shrink-0" />
                      Dimensions: {size.dimensionsClean}
                    </li>
                    <li className="flex items-center gap-2 text-sm text-[#555]">
                      <FaCircleCheck className="text-green-600 flex-shrink-0" />
                      {size.weight}
                    </li>
                    <li className="flex items-center gap-2 text-sm text-[#555]">
                      <FaCircleCheck className="text-green-600 flex-shrink-0" />
                      {size.rental}
                    </li>
                    <li className="flex items-center gap-2 text-sm text-[#555]">
                      <FaCircleCheck className="text-green-600 flex-shrink-0" />
                      Delivery + pickup + disposal included
                    </li>
                  </ul>
                  <p className="text-sm text-[#888] mt-3 italic">Best for: {size.bestFor}</p>
                </div>
                <Link
                  href="/booking"
                  className="flex items-center justify-center gap-2 w-[calc(100%-48px)] mx-6 mb-6 mt-3 py-3.5 px-5 bg-tp-red text-white rounded-lg text-base font-semibold transition-colors duration-300 hover:bg-tp-red-dark font-[var(--font-poppins)] text-center"
                >
                  <FaCalendarDays /> Book Now
                </Link>
              </div>
            ))}
          </div>

          {/* Dumpster Photos Grid */}
          <div className="mt-16">
            <DumpsterPhotosGrid photos={[
              { src: "/images/dumpsters/construction-site.jpg", alt: "Construction debris dumpster on job site" },
              { src: "/images/gallery/demolition-03.jpg", alt: "Renovation debris dumpster" },
              { src: "/images/gallery/jobsite-05.jpg", alt: "Construction waste disposal" },
              { src: "/images/dumpsters/worker-action.jpg", alt: "Construction dumpster rental" },
            ]} />
          </div>
        </div>
      </section>

      {/* ────── WHAT IS CONSTRUCTION DEBRIS? ────── */}
      <section className="py-20 bg-white">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            UNDERSTANDING CONSTRUCTION DEBRIS
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-6">
            What Is a Construction Debris Dumpster?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                A <strong>construction debris dumpster</strong> is a roll-off container specifically designed for waste generated during building, remodeling, renovation, and demolition projects. Whether you&apos;re a licensed contractor managing a job site or a homeowner tackling a kitchen remodel, a construction dumpster rental gives you a convenient way to handle all your project waste in one container.
              </p>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                Construction debris includes materials like <strong>lumber, drywall, roofing shingles, flooring, cabinets, plumbing fixtures, siding, and trim</strong>. Unlike general debris dumpsters that handle mixed household waste, construction dumpsters are optimized for the heavier, bulkier materials that come from demolition and renovation work.
              </p>
            </div>
            <div>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                At TP Dumpsters, we serve <strong>contractors, remodelers, and homeowners</strong> across the Bay Area with reliable construction waste dumpster service. Our drivers are experienced in delivering to active job sites, tight driveways, and residential neighborhoods — we know how to get your dumpster where you need it without disrupting your project.
              </p>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                We offer <strong>10, 20, and 30-yard dumpsters</strong> for construction debris, with same-day delivery available throughout the Bay Area. Every rental includes a 7-day rental period, delivery, pickup, and disposal — all included in one transparent price with no hidden fees.
              </p>
              <Image src="/images/dumpsters/delivery-suburban.jpg" alt="Construction dumpster delivery to job site" width={500} height={300} className="rounded-xl mt-4 w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ────── WHAT YOU CAN THROW AWAY ────── */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            ACCEPTED ITEMS
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4">
            What You Can Put in a Construction Debris Dumpster
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            Our construction waste dumpsters accept a wide range of building and renovation materials. Here&apos;s a comprehensive guide to what you can throw away.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Framing & Structure */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-tp-red/10 rounded-lg flex items-center justify-center text-tp-red text-xl">
                  <FaHammer />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Framing &amp; Structure
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Lumber — 2x4s, 2x6s, and dimensional lumber",
                  "Plywood, OSB, and particle board",
                  "Studs, joists, and framing members",
                  "Beams and headers",
                  "Trusses and rafters",
                  "Wood scraps and cutoffs",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleCheck className="text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Walls & Surfaces */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-tp-red/10 rounded-lg flex items-center justify-center text-tp-red text-xl">
                  <FaRulerCombined />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Walls &amp; Surfaces
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Drywall and sheetrock",
                  "Plaster and lath",
                  "Stucco and stucco mesh",
                  "Siding — vinyl, wood, and fiber cement",
                  "Trim, molding, and baseboards",
                  "Paneling and wainscoting",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleCheck className="text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Flooring */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-tp-red/10 rounded-lg flex items-center justify-center text-tp-red text-xl">
                  <FaLayerGroup />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Flooring
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Tile — ceramic, porcelain, and natural stone",
                  "Hardwood flooring and engineered wood",
                  "Laminate and luxury vinyl plank (LVP)",
                  "Vinyl sheet and linoleum",
                  "Carpet and carpet padding",
                  "Underlayment and subfloor materials",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleCheck className="text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Fixtures & Materials */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-tp-red/10 rounded-lg flex items-center justify-center text-tp-red text-xl">
                  <FaScrewdriverWrench />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Fixtures &amp; Materials
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Cabinets, countertops, and vanities",
                  "Doors and windows (no glass panes)",
                  "Sinks, toilets, tubs, and shower pans",
                  "Light fixtures and electrical boxes",
                  "PVC pipe, copper pipe, and ductwork",
                  "Insulation (non-asbestos only)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleCheck className="text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Exterior — full width */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-tp-red/10 rounded-lg flex items-center justify-center text-tp-red text-xl">
                  <FaDumpster />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Exterior
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <ul className="space-y-2.5">
                  {[
                    "Roofing shingles and underlayment",
                    "Gutters, fascia, and soffit",
                    "Decking and deck boards",
                    "Fencing — wood, vinyl, and chain link",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                      <FaCircleCheck className="text-green-600 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2.5 mt-2.5 sm:mt-0">
                  {[
                    "Concrete (small amounts only)",
                    "Brick (small amounts only)",
                    "Flashing and metal trim",
                    "Window frames and screens",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                      <FaCircleCheck className="text-green-600 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            <Image src="/images/dumpsters/delivery-residential.jpg" alt="Construction dumpster delivery" width={300} height={200} className="rounded-lg object-cover w-full h-40" />
            <Image src="/images/dumpsters/construction-site.jpg" alt="Construction debris dumpster" width={300} height={200} className="rounded-lg object-cover w-full h-40" />
            <Image src="/images/dumpsters/yard-waste-driveway.jpg" alt="Dumpster on job site" width={300} height={200} className="rounded-lg object-cover w-full h-40" />
            <Image src="/images/dumpsters/dumpster-dirt-sunny.jpg" alt="Construction waste dumpster" width={300} height={200} className="rounded-lg object-cover w-full h-40" />
          </div>
        </div>
      </section>

      {/* ────── WHAT YOU CANNOT THROW AWAY ────── */}
      <section className="py-20 bg-white">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            RESTRICTED ITEMS
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4">
            What You Cannot Put in a Construction Debris Dumpster
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            For safety and environmental compliance, certain materials are prohibited from construction debris dumpsters. This is especially important on job sites where hazardous materials may be present.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Prohibited Items */}
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333] mb-5 flex items-center gap-2">
                <FaCircleXmark className="text-red-600" /> Prohibited Items
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Hazardous chemicals — solvents, adhesives, paints, stains, thinners",
                  "Asbestos and asbestos-containing materials (tiles, insulation, siding)",
                  "Lead paint and lead-contaminated materials",
                  "Contaminated soil — oil, fuel, or chemical contamination",
                  "Batteries — car batteries, lithium batteries, and household batteries",
                  "Medical waste — needles, sharps, biohazard materials",
                  "Flammable liquids — gasoline, oil, kerosene, propane tanks",
                  "Refrigerants — freon and other coolant gases",
                  "Electronics — TVs, monitors, computers, printers",
                  "Liquid paint — wet or partially full paint cans (dried cans are OK)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleXmark className="text-red-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Extra Fee Items */}
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333] mb-5 flex items-center gap-2">
                <span className="text-amber-600 text-xl">⚠️</span> Items with Extra Fees
              </h3>
              <p className="text-sm text-[#666] leading-[1.7] mb-4">
                The following items are accepted but incur additional disposal fees:
              </p>
              <ul className="space-y-3">
                {[
                  { item: "Mattresses & box springs", fee: "$60 each" },
                  { item: "Appliances with freon (refrigerators, AC units, freezers)", fee: "$40 each" },
                  { item: "Tires (with or without rims)", fee: "$20 each" },
                ].map((entry, i) => (
                  <li key={i} className="flex items-start justify-between gap-2 text-sm leading-relaxed bg-white rounded-lg p-3 border border-amber-100">
                    <span className="text-[#555]">{entry.item}</span>
                    <span className="font-bold text-tp-red whitespace-nowrap">{entry.fee}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-[#555] leading-[1.7] font-semibold mb-2">⚠️ Important for Construction Sites:</p>
                <p className="text-sm text-[#666] leading-[1.7]">
                  If your project involves older buildings (pre-1978), be aware that asbestos and lead paint may be present. These materials require specialized disposal and <strong>cannot</strong> go in any dumpster. Contact your local hazardous waste facility for proper disposal.
                </p>
              </div>
              <p className="text-sm text-[#666] leading-[1.7] mt-5">
                Not sure if your material is accepted? Call us at <strong>(510) 650-2083</strong> and we&apos;ll help you figure it out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────── COMMON PROJECTS ────── */}
      <section className="py-20 bg-white">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            USE CASES
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4">
            Common Projects for Construction Debris Dumpsters
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            From small bathroom demos to full commercial buildouts, our construction dumpsters handle it all. Here are the most popular projects our contractors and homeowners rent for:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {commonProjects.map((project) => (
              <div
                key={project.name}
                className="bg-[#f9f9f9] rounded-xl p-5 text-center border border-[#e0e0e0] hover:border-tp-red hover:shadow-md transition-all duration-300 group"
              >
                <div className="text-3xl text-tp-red mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {project.icon}
                </div>
                <p className="font-[var(--font-poppins)] text-sm font-semibold text-[#333]">
                  {project.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── HOW IT WORKS ────── */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center">
            SIMPLE PROCESS
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-white mb-12 text-center">
            How Construction Dumpster Rental Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                icon: <FaClipboardList />,
                title: "Choose Your Size",
                desc: "Select the 10, 20, or 30-yard dumpster that fits your project. Not sure? Call us and we'll help you pick.",
              },
              {
                step: "2",
                icon: <FaCalendarDays />,
                title: "Schedule Delivery",
                desc: "Book online or call (510) 650-2083. Same-day delivery available for most Bay Area locations.",
              },
              {
                step: "3",
                icon: <FaTrashCan />,
                title: "Fill Your Dumpster",
                desc: "Load it up at your own pace. You have 7 days included. Just don't fill above the marked line.",
              },
              {
                step: "4",
                icon: <FaTruck />,
                title: "We Pick It Up",
                desc: "Call or text us when you're done. We'll pick up within 24 hours and handle all the disposal.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-tp-red rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="bg-white text-tp-red w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mx-auto -mt-8 mb-4 border-2 border-tp-red relative z-10">
                  {item.step}
                </div>
                <h3 className="font-[var(--font-poppins)] text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-[#aaa] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── EXTRA FEES & POLICIES ────── */}
      <section className="py-20 bg-white">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            TRANSPARENT PRICING
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4">
            Extra Fees &amp; Policies
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            We believe in transparent, upfront pricing. Here are the additional fees and policies you should know about:
          </p>

          <div className="max-w-2xl">
            <div className="bg-[#f9f9f9] rounded-xl overflow-hidden border border-[#e0e0e0]">
              {extraFees.map((fee, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between px-6 py-4 ${i !== extraFees.length - 1 ? "border-b border-[#e0e0e0]" : ""}`}
                >
                  <span className="text-sm text-[#555] font-[var(--font-poppins)]">{fee.item}</span>
                  <span className="text-sm font-bold text-[#333] font-[var(--font-poppins)]">{fee.fee}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────── SERVICE AREAS ────── */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            COVERAGE
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4">
            Construction Dumpster Delivery Areas
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            We deliver construction debris dumpsters to job sites throughout the San Francisco Bay Area. Our service covers 7 counties and over 60 cities, ensuring fast delivery to your construction or renovation project.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {serviceCounties.map((county) => (
              <Link
                key={county.slug}
                href={`/${county.slug}`}
                className="bg-white rounded-xl p-5 text-center border border-[#e0e0e0] hover:border-tp-red hover:shadow-md transition-all duration-300 group no-underline"
              >
                <FaMapLocationDot className="text-2xl text-tp-red mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                <p className="font-[var(--font-poppins)] text-sm font-semibold text-[#333]">
                  {county.name}
                </p>
              </Link>
            ))}
          </div>

          <p className="text-center text-sm text-[#888] mt-8 font-[var(--font-poppins)]">
            Don&apos;t see your city? We likely serve your area. Call <strong>(510) 650-2083</strong> to confirm delivery availability.
          </p>
        </div>
      </section>

      {/* ────── FAQs ────── */}
      <section className="py-20 bg-white">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            FAQ&apos;S
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-10">
            Construction Debris Dumpster Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FaqAccordion faqs={faqsLeft} />
            <div className="flex flex-col gap-4">
              <FaqAccordion faqs={faqsRight} />
            </div>
          </div>
        </div>
      </section>

      {/* ────── FINAL CTA ────── */}
      <section className="py-20 pb-32 bg-tp-red">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto text-center">
          <h2 className="font-[var(--font-oswald)] text-[28px] sm:text-[36px] lg:text-[48px] font-extrabold text-white uppercase mb-4">
            Ready to Rent a Construction Dumpster?
          </h2>
          <p className="font-[var(--font-poppins)] text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Book your construction debris dumpster online in minutes, or call us for a free quote. Same-day delivery available for Bay Area contractors and homeowners.
          </p>
          <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-4 flex-wrap">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 w-full sm:w-auto justify-center px-8 py-4 rounded-lg text-lg font-semibold bg-white text-tp-red hover:bg-gray-100 transition-all duration-300 font-[var(--font-poppins)]"
            >
              <FaCalendarDays /> Book Online Now
            </Link>
            <a
              href="tel:+15106502083"
              className="inline-flex items-center gap-2 w-full sm:w-auto justify-center px-8 py-4 rounded-lg text-lg font-semibold bg-transparent text-white border-2 border-white hover:bg-white hover:text-tp-red transition-all duration-300 font-[var(--font-poppins)]"
            >
              <FaPhone /> (510) 650-2083
            </a>
          </div>
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </>
  );
}
