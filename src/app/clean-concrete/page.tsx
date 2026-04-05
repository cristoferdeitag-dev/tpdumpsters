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
  FaRoad,
  FaHammer,
  FaMountainSun,
  FaTriangleExclamation,
  FaWeightHanging,
  FaInfinity,
} from "react-icons/fa6";

/* ───────── SEO METADATA ───────── */
export const metadata: Metadata = {
  title: "Clean Concrete Dumpster Rental | Concrete Removal & Disposal - TP Dumpsters",
  description:
    "Rent a clean concrete dumpster for driveway, sidewalk, and foundation removal. 10 yard, no weight limit, 3-day rental. Bay Area. Book online!",
  keywords:
    "clean concrete dumpster rental, concrete disposal dumpster, concrete removal dumpster, concrete hauling bay area, concrete demolition dumpster, concrete recycling dumpster, concrete debris removal",
  openGraph: {
    title: "Clean Concrete Dumpster Rental | Concrete Removal & Disposal - TP Dumpsters",
    description:
      "Rent a clean concrete dumpster for driveway, sidewalk, and foundation removal. 10 yard, no weight limit, 3-day rental. Bay Area.",
    url: "https://tpdumpsters.com/clean-concrete",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://tpdumpsters.com/clean-concrete",
  },
};

/* ───────── JSON-LD SCHEMA ───────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Clean Concrete Dumpster Rental",
  description:
    "Rent a clean concrete dumpster for driveway, sidewalk, foundation, and patio demolition projects. 10-yard dumpster with no weight limit and 3-day rental across the San Francisco Bay Area.",
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
      name: "10 Yard Clean Concrete Dumpster",
      price: "599",
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
      name: "What qualifies as clean concrete?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Clean concrete is pure, uncontaminated concrete from demolition projects such as driveways, sidewalks, patios, and foundations. The load must be 95% pure concrete — no rebar, no garbage, no dirt, and no other mixed materials.",
      },
    },
    {
      "@type": "Question",
      name: "Why does concrete need to be 95% pure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Clean concrete is recycled at specialized crushing facilities that only accept pure concrete. When concrete is mixed with rebar, dirt, or other debris, it must go to a different (more expensive) facility. The 95% purity requirement keeps disposal costs low, allowing us to offer no weight limit at just $599.",
      },
    },
    {
      "@type": "Question",
      name: "Can I put concrete with rebar in a clean concrete dumpster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Concrete with rebar does not qualify as clean concrete and will incur a contamination fee of $125-$150. If your concrete has rebar, use our Mixed Materials dumpster at $750 instead.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a weight limit for concrete dumpsters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No! Clean concrete dumpsters have no weight limit. Fill the 10-yard dumpster to the brim with concrete and we'll haul it away — no overage charges. Concrete is priced by volume, not weight.",
      },
    },
    {
      "@type": "Question",
      name: "How heavy is a 10-yard dumpster full of concrete?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A fully loaded 10-yard dumpster of concrete typically weighs between 12 and 16 tons (24,000-32,000 lbs). This is why we only offer 10-yard dumpsters for concrete — larger sizes would be too heavy to transport safely.",
      },
    },
    {
      "@type": "Question",
      name: "Why only 10-yard dumpsters for concrete?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Concrete is extremely heavy — even heavier than soil. A 10-yard dumpster of concrete can weigh 12-16 tons. Larger dumpsters would exceed the safe weight capacity of our trucks and road weight limits.",
      },
    },
    {
      "@type": "Question",
      name: "Can I mix concrete with dirt in a clean concrete dumpster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Concrete mixed with dirt does not qualify as clean concrete and will incur a contamination fee. If you have both concrete and dirt, use our Mixed Materials dumpster at $750 or rent separate dumpsters.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if my load isn't 95% pure concrete?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your load contains contaminants (rebar, dirt, brick, garbage), a contamination fee of $125-$150 will be applied because the load must be diverted to a mixed materials facility. To avoid this, ensure your concrete is clean before loading.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer same-day delivery for demolition projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We offer same-day delivery for most Bay Area locations when you book before noon. Demolition projects often need dumpsters on short notice, and we're set up to accommodate that. Call us at (510) 650-2083 or book online.",
      },
    },
    {
      "@type": "Question",
      name: "Is asphalt the same as concrete?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Asphalt is a different material and does not qualify as clean concrete. Asphalt is recycled at different facilities. If you have asphalt mixed with concrete, use our Mixed Materials dumpster instead.",
      },
    },
  ],
};

/* ───────── Data Arrays ───────── */
const commonProjects = [
  { name: "Driveway Removal", icon: <FaRoad /> },
  { name: "Sidewalk Demolition", icon: <FaPersonDigging /> },
  { name: "Patio Demolition", icon: <FaHouseChimney /> },
  { name: "Foundation Removal", icon: <FaHelmetSafety /> },
  { name: "Pool Demolition", icon: <FaWater /> },
  { name: "Concrete Slab Removal", icon: <FaRulerCombined /> },
  { name: "Curb Replacement", icon: <FaHammer /> },
  { name: "Retaining Wall Removal", icon: <FaMountainSun /> },
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
  { item: "Contamination fee (load not 95% pure)", fee: "$125–$150" },
  { item: "Cancellation fee", fee: "$150 (24h notice required)" },
  { item: "Payment methods", fee: "Credit card online or Zelle" },
];

/* ───────── FAQ Data ───────── */
const faqsLeft = [
  {
    question: "What qualifies as clean concrete?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Clean concrete is pure, uncontaminated concrete from demolition projects such as driveways, sidewalks, patios, and foundations. The load must be <strong>95% pure concrete</strong> — no rebar, no garbage, no dirt, and no other mixed materials.
      </p>
    ),
  },
  {
    question: "Why does concrete need to be 95% pure?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Clean concrete is recycled at specialized crushing facilities that only accept pure concrete. When concrete is mixed with rebar, dirt, or other debris, it must be processed at a different (more expensive) facility. The <strong>95% purity requirement</strong> keeps disposal costs low, allowing us to offer no weight limit at just $599.
      </p>
    ),
  },
  {
    question: "Can I put concrete with rebar in a clean concrete dumpster?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        No. Concrete with rebar does not qualify as clean concrete and will incur a <strong>contamination fee of $125–$150</strong>. If your concrete has rebar, use our <Link href="/mixed-materials" className="text-tp-red font-semibold hover:underline">Mixed Materials</Link> dumpster at $750 instead.
      </p>
    ),
  },
  {
    question: "Is there a weight limit for concrete dumpsters?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        <strong>No!</strong> Clean concrete dumpsters have <strong>no weight limit</strong>. Fill the 10-yard dumpster to the brim with concrete and we&apos;ll haul it away — no overage charges. Concrete is priced by volume, not weight.
      </p>
    ),
  },
  {
    question: "How heavy is a 10-yard dumpster full of concrete?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        A fully loaded 10-yard dumpster of concrete typically weighs between <strong>12 and 16 tons</strong> (24,000–32,000 lbs). This is why we only offer 10-yard dumpsters for concrete — larger sizes would be too heavy to transport safely.
      </p>
    ),
  },
];

const faqsRight = [
  {
    question: "Why only 10-yard dumpsters for concrete?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Concrete is extremely heavy — even heavier than soil. A 10-yard dumpster of concrete can weigh <strong>12–16 tons</strong>. Larger dumpsters would exceed the safe weight capacity of our trucks and road weight limits. A 10-yard is the largest size we can safely haul when fully loaded with concrete.
      </p>
    ),
  },
  {
    question: "Can I mix concrete with dirt?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        No. Concrete mixed with dirt does not qualify as clean concrete and will incur a <strong>contamination fee of $125–$150</strong>. If you have both concrete and dirt, use our <Link href="/mixed-materials" className="text-tp-red font-semibold hover:underline">Mixed Materials</Link> dumpster at $750 or rent separate dumpsters.
      </p>
    ),
  },
  {
    question: "What happens if my load isn&apos;t 95% pure?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If your load contains contaminants (rebar, dirt, brick, garbage), a <strong>contamination fee of $125–$150</strong> will be applied because the load must be diverted to a mixed materials facility. To avoid this, ensure your concrete is clean before loading. If you know your load has mixed materials, consider our <Link href="/mixed-materials" className="text-tp-red font-semibold hover:underline">Mixed Materials</Link> dumpster at $750.
      </p>
    ),
  },
  {
    question: "Is asphalt the same as concrete?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        No. Asphalt is a different material and <strong>does not qualify</strong> as clean concrete. Asphalt is recycled at different facilities. If you have asphalt mixed with concrete, use our <Link href="/mixed-materials" className="text-tp-red font-semibold hover:underline">Mixed Materials</Link> dumpster instead.
      </p>
    ),
  },
  {
    question: "Do you offer same-day delivery for demolition projects?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We offer <strong>same-day delivery</strong> for most Bay Area locations when you book before noon. Demolition projects often need dumpsters on short notice, and we&apos;re set up to accommodate that. Call us at <strong>(510) 650-2083</strong> or book online for fast delivery.
      </p>
    ),
  },
];

/* ═══════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════ */
export default function CleanConcretePage() {
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
        <div className="absolute inset-0 bg-[url('/images/dumpsters/construction-site.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/55 z-[1]" />

        <div className="relative z-[2] px-5 pb-10 max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block bg-tp-gold-dark text-white px-6 py-2 text-[13px] md:text-base font-bold rounded-[3px] font-[var(--font-poppins)]">
              No Weight Limit · 3-Day Rental
            </span>
          </div>
          <h1 className="font-[var(--font-oswald)] text-[28px] sm:text-[3rem] lg:text-[4.5rem] font-extrabold text-white uppercase leading-[1.1] mb-4 tracking-wide">
            CLEAN CONCRETE DUMPSTER RENTAL
          </h1>
          <p className="font-[var(--font-poppins)] text-base sm:text-[1.4rem] lg:text-[1.6rem] font-medium text-white/90 italic mb-8 max-w-3xl mx-auto">
            The most affordable way to dispose of concrete from driveways, sidewalks, foundations, and demolition projects across the Bay Area
          </p>
          <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-4 flex-wrap">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 w-full sm:w-auto justify-center px-8 py-4 rounded-lg text-lg font-semibold bg-tp-red text-white hover:bg-tp-red-dark transition-all duration-300 font-[var(--font-poppins)]"
            >
              <FaCalendarDays /> Book Now — $599
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
            ONE SIZE — BUILT FOR CONCRETE
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4 text-center">
            Clean Concrete Dumpster Size &amp; Pricing
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl mx-auto text-center">
            We offer one size for clean concrete: a 10-yard dumpster with <strong>no weight limit</strong> and a <strong>3-day rental</strong>. Price includes delivery, pickup, and disposal. No hidden fees.
          </p>

          <div className="max-w-md mx-auto">
            <div className="bg-white border-2 border-tp-red rounded-xl overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] relative">
              <div className="bg-tp-red text-white text-center py-2 text-sm font-bold font-[var(--font-poppins)] uppercase tracking-wider">
                Clean Concrete — No Weight Limit
              </div>
              <div className="px-6 pt-6 pb-2 text-center">
                <h3 className="font-[var(--font-poppins)] text-[28px] font-bold text-[#333]">
                  10 Yard
                </h3>
                <p className="font-[var(--font-oswald)] text-[42px] font-bold text-tp-red mt-4">
                  $599
                </p>
              </div>
              <div className="px-6 py-4 flex items-center justify-center min-h-[160px]">
                <Image
                  src="/images/sizes/10-yard.png"
                  alt="10 Yard Clean Concrete Dumpster Rental - TP Dumpsters"
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
                    Must be 95% pure concrete
                  </li>
                </ul>
                <p className="text-sm text-[#888] mt-3 italic">
                  Best for: Driveway removal, sidewalk demolition, foundation work
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
          { src: "/images/dumpsters/construction-site.jpg", alt: "Clean concrete dumpster" },
          { src: "/images/gallery/jobsite-05.jpg", alt: "Concrete disposal" },
          { src: "/images/gallery/demolition-03.jpg", alt: "Concrete removal" },
          { src: "/images/dumpsters/dumpster-dirt-sunny.jpg", alt: "Concrete dumpster rental" },
        ]} />
      </section>

      {/* ────── 3. WHAT IS CLEAN CONCRETE? ────── */}
      <section className="py-20 bg-white">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            UNDERSTANDING CLEAN CONCRETE
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-6">
            What Is a Clean Concrete Dumpster?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                A <strong>clean concrete dumpster</strong> is specifically designed for disposing of pure, uncontaminated concrete from demolition projects — driveways, sidewalks, patios, foundations, and more. Unlike general debris dumpsters that accept mixed waste, a clean concrete dumpster is intended for <strong>concrete only</strong> — and the load must be at least <strong>95% pure concrete</strong>.
              </p>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                This purity requirement exists because clean concrete is recycled at specialized crushing facilities that only accept uncontaminated material. The concrete is crushed and repurposed as road base, aggregate for new concrete, or fill material — keeping it out of landfills and reducing disposal costs.
              </p>
            </div>
            <div>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                Because clean concrete disposal is significantly cheaper than mixed waste, we pass those savings on to you: <strong>no weight limit</strong> on our 10-yard dumpsters. Concrete is incredibly heavy — a single 10-yard load can weigh 12–16 tons — but you won&apos;t pay overage charges. Fill it up and we&apos;ll haul it away.
              </p>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                Our clean concrete dumpsters come with a <strong>3-day rental period</strong>, which is perfect for demolition projects that generate large volumes of concrete quickly. Need more time? Additional days are available at $49/day.
              </p>
              <Image src="/images/dumpsters/construction-site.jpg" alt="Clean concrete dumpster rental Bay Area" width={500} height={300} className="rounded-xl mt-4 w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ────── 4. ✅ WHAT QUALIFIES AS CLEAN CONCRETE ────── */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            ACCEPTED MATERIALS
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4">
            What Qualifies as Clean Concrete
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            The following materials are accepted in a clean concrete dumpster. Your load must be <strong>95% pure</strong> to qualify for the $599 clean concrete rate.
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-xl">
                  <FaCircleCheck />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Accepted Concrete Types
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Broken concrete and cement",
                  "Sidewalk pieces",
                  "Driveway slabs",
                  "Foundation pieces",
                  "Concrete blocks / CMU",
                  "Concrete pavers",
                  "Curb pieces",
                  "Concrete pipe",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleCheck className="text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 bg-amber-50 rounded-xl p-5 border border-amber-200">
              <div className="flex items-start gap-3">
                <FaWeightHanging className="text-amber-600 text-xl flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-[var(--font-poppins)] text-[15px] font-bold text-[#333] mb-1">
                    95% Purity Requirement
                  </h4>
                  <p className="text-sm text-[#666] leading-[1.7]">
                    Your load must be <strong>95% pure concrete</strong>. That means: no rebar, no dirt, no asphalt, no brick, no garbage, and no other materials mixed in. Small amounts of mortar or grout attached to the concrete are acceptable.
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
            What Does NOT Qualify as Clean Concrete
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            The following materials are <strong>not accepted</strong> in a clean concrete dumpster. If your concrete contains any of these, consider our other dumpster options.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Not Accepted */}
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333] mb-5 flex items-center gap-2">
                <FaCircleXmark className="text-red-600" /> Does Not Qualify
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Concrete with rebar",
                  "Concrete mixed with dirt or soil",
                  "Asphalt or blacktop",
                  "Brick or block (not pure concrete)",
                  "Contaminated or painted concrete",
                  "Concrete with wire mesh embedded",
                  "Concrete mixed with garbage or debris",
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
                    <strong>Concrete with rebar?</strong><br />
                    → Use <Link href="/mixed-materials" className="text-tp-red font-semibold hover:underline">Mixed Materials</Link> dumpster ($750)
                  </p>
                </li>
                <li className="bg-white rounded-lg p-3 border border-blue-100">
                  <p className="text-sm text-[#555]">
                    <strong>Concrete mixed with dirt?</strong><br />
                    → Use <Link href="/mixed-materials" className="text-tp-red font-semibold hover:underline">Mixed Materials</Link> dumpster ($750)
                  </p>
                </li>
                <li className="bg-white rounded-lg p-3 border border-blue-100">
                  <p className="text-sm text-[#555]">
                    <strong>Asphalt or brick?</strong><br />
                    → Use <Link href="/mixed-materials" className="text-tp-red font-semibold hover:underline">Mixed Materials</Link> dumpster ($750)
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
                  ⚠️ Contamination Fee Warning
                </h4>
                <p className="text-sm text-[#555] leading-[1.7]">
                  If your load is not 95% pure clean concrete, a <strong>contamination fee of $125–$150</strong> will be applied. The load will need to be diverted to a mixed materials facility at higher disposal rates. To avoid this fee, ensure your concrete is free of rebar, dirt, asphalt, brick, and any other contaminants before loading.
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
            Common Projects for Clean Concrete Dumpsters
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            Our clean concrete dumpsters are used by contractors, homeowners, and demolition crews for a variety of concrete removal projects:
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
            How Clean Concrete Dumpster Rental Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                icon: <FaClipboardList />,
                title: "Book Your Dumpster",
                desc: "Reserve your 10-yard clean concrete dumpster online or call (510) 650-2083. Just $599 — no weight limit.",
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
                desc: "Fill it with clean concrete at your pace. You have 3 days included. Remember: 95% pure concrete only — no rebar.",
              },
              {
                step: "4",
                icon: <FaTruck />,
                title: "We Haul It Away",
                desc: "Call or text when done. We pick up within 24 hours and deliver your concrete to a recycling facility.",
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
            We believe in transparent, upfront pricing. Here are the additional fees and policies for clean concrete dumpster rentals:
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
            Clean Concrete Dumpster Delivery Areas
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            We deliver clean concrete dumpsters throughout the San Francisco Bay Area. Our service covers 7 counties and over 60 cities, ensuring fast delivery to your demolition site.
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
            Clean Concrete Dumpster Questions
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
            Ready to Haul Away Your Concrete?
          </h2>
          <p className="font-[var(--font-poppins)] text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Book your clean concrete dumpster today — just $599 for a 10-yard dumpster with no weight limit and a 3-day rental. Same-day delivery available across the Bay Area.
          </p>
          <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-4 flex-wrap">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 w-full sm:w-auto justify-center px-8 py-4 rounded-lg text-lg font-semibold bg-white text-tp-red hover:bg-gray-100 transition-all duration-300 font-[var(--font-poppins)]"
            >
              <FaCalendarDays /> Book Online — $599
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
