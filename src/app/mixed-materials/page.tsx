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
  FaCircleCheck,
  FaCircleXmark,
  FaTruck,
  FaClipboardList,
  FaTrashCan,
  FaMapLocationDot,
  FaHouseChimney,
  FaWater,
  FaPersonDigging,
  FaRulerCombined,
  FaHelmetSafety,
  FaMountainSun,
  FaSeedling,
  FaHammer,
  FaRoad,
  FaTriangleExclamation,
  FaInfinity,
} from "react-icons/fa6";

/* ───────── SEO METADATA ───────── */
export const metadata: Metadata = {
  title: "Mixed Materials Dumpster Rental | Dirt, Concrete & Brick Disposal - TP Dumpsters",
  description:
    "Rent a mixed materials dumpster for soil, concrete, brick, and rock disposal. 10 yard, no weight limit, 3-day rental. Bay Area. Book online!",
  keywords:
    "mixed materials dumpster rental, dirt and concrete dumpster, mixed debris disposal, heavy materials dumpster, concrete and dirt dumpster, mixed demolition dumpster, heavy debris removal bay area",
  openGraph: {
    title: "Mixed Materials Dumpster Rental | Dirt, Concrete & Brick Disposal - TP Dumpsters",
    description:
      "Rent a mixed materials dumpster for soil, concrete, brick, and rock disposal. 10 yard, no weight limit, 3-day rental. Bay Area.",
    url: "https://tpdumpsters.com/mixed-materials",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://tpdumpsters.com/mixed-materials",
  },
};

/* ───────── JSON-LD SCHEMA ───────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Mixed Materials Dumpster Rental",
  description:
    "Rent a mixed materials dumpster for soil, concrete, brick, rock, and other heavy material disposal. 10-yard dumpster with no weight limit and 3-day rental across the San Francisco Bay Area.",
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
  serviceType: "Dumpster Rental",
  offers: [
    {
      "@type": "Offer",
      name: "10 Yard Mixed Materials Dumpster",
      price: "750",
      priceCurrency: "USD",
      description: "10 yard dumpster — no weight limit, 3-day rental, 12ft L × 8ft W × 2.5ft H",
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
      name: "What qualifies as mixed materials?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mixed materials are heavy loads that aren't 95% pure. This includes soil mixed with rocks, concrete with rebar, dirt mixed with concrete, brick, block, stone, asphalt chunks, and any combination of heavy inert materials.",
      },
    },
    {
      "@type": "Question",
      name: "Why is the mixed materials dumpster more expensive than clean soil or concrete?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mixed materials require processing at facilities that handle multiple material types. These facilities charge higher disposal rates because the materials must be sorted and processed separately. The $750 price reflects this higher disposal cost while still offering no weight limit.",
      },
    },
    {
      "@type": "Question",
      name: "Can I put concrete with rebar in a mixed materials dumpster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Concrete with rebar is one of the most common items in a mixed materials dumpster. Unlike clean concrete dumpsters that require 95% pure concrete, mixed materials dumpsters accept concrete with rebar, wire mesh, and other attachments.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a weight limit for mixed materials dumpsters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No! Mixed materials dumpsters have no weight limit. Fill the 10-yard dumpster with your heavy materials and we'll haul it away — no overage charges.",
      },
    },
    {
      "@type": "Question",
      name: "Can I put garbage or household waste in a mixed materials dumpster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Mixed materials dumpsters are for heavy inert materials only — soil, concrete, brick, rock, etc. Garbage, household waste, wood, and lumber should go in a General Debris dumpster instead.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between mixed materials and general debris?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mixed materials are heavy inert items like soil, concrete, brick, rock, and asphalt. General debris includes lighter construction waste like wood, drywall, carpet, furniture, and household junk. They go to different disposal facilities.",
      },
    },
    {
      "@type": "Question",
      name: "Can I put asphalt in a mixed materials dumpster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Asphalt chunks are accepted in mixed materials dumpsters. Whether it's from a driveway tear-out, parking lot removal, or road work, asphalt qualifies as mixed materials.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know if I need clean soil, clean concrete, or mixed materials?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your load is 95% pure dirt, use Clean Soil ($599). If it's 95% pure concrete with no rebar, use Clean Concrete ($599). If your load has any mix of materials — dirt with rocks, concrete with rebar, brick, asphalt, etc. — use Mixed Materials ($750).",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer same-day delivery for mixed materials dumpsters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We offer same-day delivery for most Bay Area locations when you book before noon. Call us at (510) 650-2083 or book online for fast delivery.",
      },
    },
    {
      "@type": "Question",
      name: "Can I put green waste or plants in a mixed materials dumpster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Green waste such as branches, leaves, grass, and plants should go in a Green Waste dumpster. Mixed materials dumpsters are for heavy inert materials only.",
      },
    },
  ],
};

/* ───────── Data Arrays ───────── */
const commonProjects = [
  { name: "Mixed Demolition", icon: <FaHammer /> },
  { name: "Landscape Tear-out", icon: <FaSeedling /> },
  { name: "Driveway with Sub-base", icon: <FaRoad /> },
  { name: "Pool Demo with Deck", icon: <FaWater /> },
  { name: "Foundation with Backfill", icon: <FaHouseChimney /> },
  { name: "Retaining Wall + Soil", icon: <FaMountainSun /> },
  { name: "Gravel Driveway Removal", icon: <FaPersonDigging /> },
  { name: "Old Patio with Dirt", icon: <FaRulerCombined /> },
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
  { item: "Hazardous material contamination", fee: "Load rejection + fee" },
  { item: "Cancellation fee", fee: "$150 (24h notice required)" },
  { item: "Payment methods", fee: "Credit card online or Zelle" },
];

/* ───────── FAQ Data ───────── */
const faqsLeft = [
  {
    question: "What qualifies as mixed materials?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Mixed materials are heavy loads that aren&apos;t 95% pure. This includes soil mixed with rocks, concrete with rebar, dirt mixed with concrete, brick, block, stone, asphalt chunks, and any combination of heavy inert materials.
      </p>
    ),
  },
  {
    question: "Why is the mixed materials dumpster more expensive?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Mixed materials require processing at facilities that handle multiple material types. These facilities charge higher disposal rates because the materials must be sorted and processed separately. The <strong>$750 price</strong> reflects this higher disposal cost while still offering <strong>no weight limit</strong>.
      </p>
    ),
  },
  {
    question: "Can I put concrete with rebar in this dumpster?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        <strong>Yes!</strong> Concrete with rebar is one of the most common items in a mixed materials dumpster. Unlike <Link href="/clean-concrete" className="text-tp-red font-semibold hover:underline">clean concrete</Link> dumpsters that require 95% pure concrete, mixed materials dumpsters accept concrete with rebar, wire mesh, and other attachments.
      </p>
    ),
  },
  {
    question: "Is there a weight limit?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        <strong>No!</strong> Mixed materials dumpsters have <strong>no weight limit</strong>. Fill the 10-yard dumpster with your heavy materials and we&apos;ll haul it away — no overage charges.
      </p>
    ),
  },
  {
    question: "Can I put garbage or household waste in here?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        No. Mixed materials dumpsters are for <strong>heavy inert materials only</strong> — soil, concrete, brick, rock, etc. Garbage, household waste, wood, and lumber should go in a <Link href="/general-debris" className="text-tp-red font-semibold hover:underline">General Debris</Link> dumpster instead.
      </p>
    ),
  },
];

const faqsRight = [
  {
    question: "What&apos;s the difference between mixed materials and general debris?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Mixed materials are <strong>heavy inert items</strong> like soil, concrete, brick, rock, and asphalt. General debris includes lighter construction waste like wood, drywall, carpet, furniture, and household junk. They go to different disposal facilities, which is why they&apos;re priced differently.
      </p>
    ),
  },
  {
    question: "Can I put asphalt in a mixed materials dumpster?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        <strong>Yes!</strong> Asphalt chunks are accepted in mixed materials dumpsters. Whether it&apos;s from a driveway tear-out, parking lot removal, or road work, asphalt qualifies as mixed materials.
      </p>
    ),
  },
  {
    question: "How do I know if I need clean soil, clean concrete, or mixed materials?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If your load is 95% pure dirt → <Link href="/clean-soil" className="text-tp-red font-semibold hover:underline">Clean Soil</Link> ($599). If it&apos;s 95% pure concrete with no rebar → <Link href="/clean-concrete" className="text-tp-red font-semibold hover:underline">Clean Concrete</Link> ($599). If your load has <strong>any mix of materials</strong> — dirt with rocks, concrete with rebar, brick, asphalt, etc. — use <strong>Mixed Materials ($750)</strong>.
      </p>
    ),
  },
  {
    question: "Do you offer same-day delivery?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We offer <strong>same-day delivery</strong> for most Bay Area locations when you book before noon. Call us at <strong>(510) 650-2083</strong> or book online for fast delivery.
      </p>
    ),
  },
  {
    question: "Can I put green waste or plants in this dumpster?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        No. Green waste such as branches, leaves, grass, and plants should go in a <Link href="/green-waste" className="text-tp-red font-semibold hover:underline">Green Waste</Link> dumpster. Mixed materials dumpsters are for heavy inert materials only.
      </p>
    ),
  },
];

/* ═══════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════ */
export default function MixedMaterialsPage() {
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

      {/* ────── 1. HERO SECTION ────── */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center pt-[15vh] pb-[6vh] text-center">
        <div className="absolute inset-0 bg-[url('/images/dumpsters/dumpster-dirt-sunny.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/55 z-[1]" />

        <div className="relative z-[2] px-5 pb-10 max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block bg-tp-gold-dark text-white px-6 py-2 text-[13px] md:text-base font-bold rounded-[3px] font-[var(--font-poppins)]">
              No Weight Limit · 3-Day Rental
            </span>
          </div>
          <h1 className="font-[var(--font-oswald)] text-[28px] sm:text-[3rem] lg:text-[4.5rem] font-extrabold text-white uppercase leading-[1.1] mb-4 tracking-wide">
            MIXED MATERIALS DUMPSTER RENTAL
          </h1>
          <p className="font-[var(--font-poppins)] text-base sm:text-[1.4rem] lg:text-[1.6rem] font-medium text-white/90 italic mb-8 max-w-3xl mx-auto">
            For loads that aren&apos;t 95% pure — soil, concrete, brick, rock, and everything in between
          </p>
          <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-4 flex-wrap">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 w-full sm:w-auto justify-center px-8 py-4 rounded-lg text-lg font-semibold bg-tp-red text-white hover:bg-tp-red-dark transition-all duration-300 font-[var(--font-poppins)]"
            >
              <FaCalendarDays /> Book Now — $750
            </Link>
            <a
              href="tel:+15106502083"
              className="inline-flex items-center gap-2 w-full sm:w-auto justify-center px-8 py-4 rounded-lg text-lg font-semibold bg-transparent text-white border-2 border-tp-red hover:bg-tp-red hover:text-white transition-all duration-300 font-[var(--font-poppins)]"
            >
              <FaPhone /> (510) 650-2083
            </a>
          </div>
        </div>
      </section>

      {/* ────── 2. DUMPSTER SIZE — SINGLE 10-YARD CARD ────── */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center">
            ONE SIZE — BUILT FOR HEAVY MIXES
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4 text-center">
            Mixed Materials Dumpster Size &amp; Pricing
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl mx-auto text-center">
            We offer one size for mixed materials: a 10-yard dumpster with <strong>no weight limit</strong> and a <strong>3-day rental</strong>. Price includes delivery, pickup, and disposal. No hidden fees.
          </p>

          <div className="max-w-md mx-auto">
            <div className="bg-white border-2 border-tp-red rounded-xl overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] relative">
              <div className="bg-tp-red text-white text-center py-2 text-sm font-bold font-[var(--font-poppins)] uppercase tracking-wider">
                Mixed Materials — No Weight Limit
              </div>
              <div className="px-6 pt-6 pb-2 text-center">
                <h3 className="font-[var(--font-poppins)] text-[28px] font-bold text-[#333]">
                  10 Yard
                </h3>
                <p className="font-[var(--font-oswald)] text-[42px] font-bold text-tp-red mt-4">
                  $750
                </p>
              </div>
              <div className="px-6 py-4 flex items-center justify-center min-h-[160px]">
                <Image
                  src="/images/sizes/10-yard.png"
                  alt="10 Yard Mixed Materials Dumpster Rental - TP Dumpsters"
                  width={300}
                  height={160}
                  className="max-h-[140px] object-contain"
                />
              </div>
              <div className="px-6 py-4 flex-1">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-[#555]">
                    <FaCircleCheck className="text-green-600 flex-shrink-0" />
                    Dimensions: 12&apos;L × 8&apos;W × 2.5&apos;H
                  </li>
                  <li className="flex items-center gap-2 text-sm font-bold text-[#333]">
                    <FaInfinity className="text-tp-red flex-shrink-0" />
                    NO weight limit
                  </li>
                  <li className="flex items-center gap-2 text-sm font-bold text-[#333]">
                    <FaCalendarDays className="text-tp-red flex-shrink-0" />
                    3-day rental included
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#555]">
                    <FaCircleCheck className="text-green-600 flex-shrink-0" />
                    Delivery + pickup + disposal included
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#555]">
                    <FaCircleCheck className="text-green-600 flex-shrink-0" />
                    Soil, concrete, brick, rock &amp; more
                  </li>
                </ul>
                <p className="text-sm text-[#888] mt-3 italic">
                  Best for: Mixed demolition, landscape tear-outs, concrete with rebar
                </p>
              </div>
              <Link
                href="/booking"
                className="flex items-center justify-center gap-2 w-[calc(100%-48px)] mx-6 mb-6 mt-3 py-3.5 px-5 bg-tp-red text-white rounded-lg text-base font-semibold transition-colors duration-300 hover:bg-tp-red-dark font-[var(--font-poppins)] text-center"
              >
                <FaCalendarDays /> Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* Dumpster Photos Grid */}
        <DumpsterPhotosGrid photos={[
          { src: "/images/dumpsters/dumpster-dirt-sunny.jpg", alt: "Mixed materials dumpster" },
          { src: "/images/dumpsters/construction-site.jpg", alt: "Dirt and concrete disposal" },
          { src: "/images/gallery/demolition-03.jpg", alt: "Mixed debris removal" },
          { src: "/images/gallery/jobsite-05.jpg", alt: "Heavy materials dumpster" },
        ]} />
      </section>

      {/* ────── 3. WHAT IS MIXED MATERIALS? ────── */}
      <section className="py-20 bg-white">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            UNDERSTANDING MIXED MATERIALS
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-6">
            What Is a Mixed Materials Dumpster?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                A <strong>mixed materials dumpster</strong> is designed for heavy loads that aren&apos;t 95% pure. When your project produces a combination of soil, concrete, brick, rock, asphalt, or other heavy inert materials, this is the dumpster you need. It&apos;s the catch-all for heavy material disposal.
              </p>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                Common scenarios include: concrete with rebar (doesn&apos;t qualify as clean concrete), dirt mixed with rocks or gravel (doesn&apos;t qualify as clean soil), demolition projects that produce multiple material types, and landscape tear-outs with soil, stone, and concrete mixed together.
              </p>
            </div>
            <div>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                The mixed materials dumpster is priced at <strong>$750</strong> — higher than clean soil or clean concrete ($599 each) — because mixed loads require processing at facilities that handle multiple material types. These facilities charge more for sorting and processing, but you still get <strong>no weight limit</strong>.
              </p>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                Like all our heavy material dumpsters, the mixed materials dumpster comes with a <strong>3-day rental period</strong> and includes delivery, pickup, and disposal. Need more time? Additional days are available at $49/day.
              </p>
              <Image src="/images/dumpsters/dumpster-dirt-sunny.jpg" alt="Mixed materials dumpster rental Bay Area" width={500} height={300} className="rounded-xl mt-4 w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ────── 4. ✅ WHAT GOES IN ────── */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            ACCEPTED MATERIALS
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4">
            What Goes in a Mixed Materials Dumpster
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            The following heavy inert materials are accepted in a mixed materials dumpster. This is for loads that <strong>don&apos;t meet the 95% purity requirement</strong> for clean soil or clean concrete.
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-xl">
                  <FaCircleCheck />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Accepted Mixed Materials
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Soil mixed with rocks or gravel",
                  "Concrete with rebar",
                  "Concrete mixed with dirt",
                  "Brick",
                  "Block and stone",
                  "Asphalt chunks",
                  "Landscape rock",
                  "Broken pavers with dirt",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleCheck className="text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 bg-green-50 rounded-xl p-5 border border-green-200">
              <div className="flex items-start gap-3">
                <FaCircleCheck className="text-green-600 text-xl flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-[var(--font-poppins)] text-[15px] font-bold text-[#333] mb-1">
                    No Purity Requirement
                  </h4>
                  <p className="text-sm text-[#666] leading-[1.7]">
                    Unlike clean soil and clean concrete dumpsters, there&apos;s <strong>no 95% purity requirement</strong> for mixed materials. Mix and match heavy inert materials as needed — soil with concrete, brick with rock, concrete with rebar. It&apos;s all accepted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────── 5. ❌ WHAT DOES NOT QUALIFY ────── */}
      <section className="py-20 bg-white">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            NOT ACCEPTED
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4">
            What Does NOT Go in a Mixed Materials Dumpster
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            Mixed materials dumpsters are for <strong>heavy inert materials only</strong>. The following items are not accepted:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Not Accepted */}
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333] mb-5 flex items-center gap-2">
                <FaCircleXmark className="text-red-600" /> Does Not Qualify
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Hazardous materials (chemicals, oil, fuel)",
                  "Contaminated soil",
                  "Garbage or household waste",
                  "Wood or lumber",
                  "Green waste (branches, leaves, grass)",
                  "Drywall or sheetrock",
                  "Furniture or appliances",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleXmark className="text-red-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Better Options */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333] mb-5 flex items-center gap-2">
                <span className="text-blue-600 text-xl">💡</span> Better Options
              </h3>
              <ul className="space-y-3">
                <li className="bg-white rounded-lg p-3 border border-blue-100">
                  <p className="text-sm text-[#555]">
                    <strong>Garbage, wood, or household waste?</strong><br />
                    → Use <Link href="/general-debris" className="text-tp-red font-semibold hover:underline">General Debris</Link> dumpster
                  </p>
                </li>
                <li className="bg-white rounded-lg p-3 border border-blue-100">
                  <p className="text-sm text-[#555]">
                    <strong>Branches, leaves, or green waste?</strong><br />
                    → Use <Link href="/green-waste" className="text-tp-red font-semibold hover:underline">Green Waste</Link> dumpster
                  </p>
                </li>
                <li className="bg-white rounded-lg p-3 border border-blue-100">
                  <p className="text-sm text-[#555]">
                    <strong>95% pure dirt or concrete?</strong><br />
                    → Save money with <Link href="/clean-soil" className="text-tp-red font-semibold hover:underline">Clean Soil</Link> or <Link href="/clean-concrete" className="text-tp-red font-semibold hover:underline">Clean Concrete</Link> ($599)
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="mt-10 max-w-3xl mx-auto bg-red-50 border-2 border-red-300 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <FaTriangleExclamation className="text-red-600 text-2xl flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-[var(--font-poppins)] text-[16px] font-bold text-red-700 mb-1">
                  ⚠️ No Hazardous Materials
                </h4>
                <p className="text-sm text-[#555] leading-[1.7]">
                  Hazardous materials including chemicals, oil, fuel, paint, and contaminated soil are <strong>strictly prohibited</strong>. Loads containing hazardous materials will be rejected and may incur additional fees. If you&apos;re unsure whether your materials qualify, call us at <strong>(510) 650-2083</strong> before booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────── 6. COMMON PROJECTS ────── */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            USE CASES
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4">
            Common Projects for Mixed Materials Dumpsters
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            Our mixed materials dumpsters are used by contractors, homeowners, and landscapers for projects that produce a variety of heavy materials:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {commonProjects.map((project) => (
              <div
                key={project.name}
                className="bg-white rounded-xl p-5 text-center border border-[#e0e0e0] hover:border-tp-red hover:shadow-md transition-all duration-300 group"
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

      {/* ────── 7. HOW IT WORKS ────── */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center">
            SIMPLE PROCESS
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-white mb-12 text-center">
            How Mixed Materials Dumpster Rental Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                icon: <FaClipboardList />,
                title: "Book Your Dumpster",
                desc: "Reserve your 10-yard mixed materials dumpster online or call (510) 650-2083. Just $750 — no weight limit.",
              },
              {
                step: "2",
                icon: <FaTruck />,
                title: "We Deliver",
                desc: "We drop off the dumpster at your job site. Same-day delivery available for most Bay Area locations.",
              },
              {
                step: "3",
                icon: <FaTrashCan />,
                title: "Load It Up",
                desc: "Fill it with your mixed heavy materials at your pace. You have 3 days included. Soil, concrete, brick, rock — mix away.",
              },
              {
                step: "4",
                icon: <FaTruck />,
                title: "We Haul It Away",
                desc: "Call or text when done. We pick up within 24 hours and deliver your materials to the processing facility.",
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

      {/* ────── 8. EXTRA FEES & POLICIES ────── */}
      <section className="py-20 bg-white">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            TRANSPARENT PRICING
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4">
            Extra Fees &amp; Policies
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            We believe in transparent, upfront pricing. Here are the additional fees and policies for mixed materials dumpster rentals:
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

      {/* ────── 9. SERVICE AREAS ────── */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            COVERAGE
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4">
            Mixed Materials Dumpster Delivery Areas
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            We deliver mixed materials dumpsters throughout the San Francisco Bay Area. Our service covers 7 counties and over 60 cities, ensuring fast delivery to your project site.
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

      {/* ────── 10. FAQs ────── */}
      <section className="py-20 bg-white">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            FAQ&apos;S
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-10">
            Mixed Materials Dumpster Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FaqAccordion faqs={faqsLeft} />
            <div className="flex flex-col gap-4">
              <FaqAccordion faqs={faqsRight} />
            </div>
          </div>
        </div>
      </section>

      {/* ────── 11. FINAL CTA ────── */}
      <section className="py-20 pb-32 bg-tp-red">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto text-center">
          <h2 className="font-[var(--font-oswald)] text-[28px] sm:text-[36px] lg:text-[48px] font-extrabold text-white uppercase mb-4">
            Ready to Haul Away Your Mixed Materials?
          </h2>
          <p className="font-[var(--font-poppins)] text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Book your mixed materials dumpster today — just $750 for a 10-yard dumpster with no weight limit and a 3-day rental. Same-day delivery available across the Bay Area.
          </p>
          <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-4 flex-wrap">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 w-full sm:w-auto justify-center px-8 py-4 rounded-lg text-lg font-semibold bg-white text-tp-red hover:bg-gray-100 transition-all duration-300 font-[var(--font-poppins)]"
            >
              <FaCalendarDays /> Book Online — $750
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
