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
  FaCouch,
  FaCircleCheck,
  FaCircleXmark,
  FaTruck,
  FaClipboardList,
  FaTrashCan,
  FaBoxOpen,
  FaHouse,
  FaWarehouse,
  FaPeopleCarryBox,
  FaBroom,
  FaMapLocationDot,
  FaBed,
  FaKitchenSet,
  FaBoxesPacking,
  FaKey,
  FaHandHoldingHeart,
  FaUserGroup,
  FaHouseChimneyWindow,
  FaBuilding,
} from "react-icons/fa6";

/* ───────── SEO METADATA ───────── */
export const metadata: Metadata = {
  title: "Household Clean Out Dumpster Rental | Home & Estate Cleanouts - TP Dumpsters",
  description:
    "Rent a dumpster for household cleanouts, estate cleanups, and junk removal. 10, 20 & 30 yard sizes. Bay Area delivery. Book online!",
  keywords:
    "household cleanout dumpster rental, home cleanout dumpster, estate cleanout dumpster, junk removal dumpster rental, house cleanout service, hoarding cleanup dumpster, garage cleanout dumpster, moving dumpster rental",
  openGraph: {
    title: "Household Clean Out Dumpster Rental | Home & Estate Cleanouts - TP Dumpsters",
    description:
      "Rent a dumpster for household cleanouts, estate cleanups, and junk removal. 10, 20 & 30 yard sizes. Bay Area delivery. Book online!",
    url: "https://tpdumpsters.com/household-cleanout",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://tpdumpsters.com/household-cleanout",
  },
};

/* ───────── JSON-LD SCHEMA ───────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Household Clean Out Dumpster Rental",
  description:
    "Rent a dumpster for household cleanouts, estate cleanups, moving, downsizing, hoarding cleanup, and junk removal. Available in 10, 20, and 30 yard sizes across the San Francisco Bay Area.",
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
      name: "10 Yard Household Cleanout Dumpster",
      price: "599",
      priceCurrency: "USD",
      description: "10 yard dumpster — 1 ton included, 7-day rental, 12ft L × 8ft W × 2.5ft H",
    },
    {
      "@type": "Offer",
      name: "20 Yard Household Cleanout Dumpster",
      price: "649",
      priceCurrency: "USD",
      description: "20 yard dumpster — 2 tons included, 7-day rental, 16ft L × 8ft W × 4ft H",
    },
    {
      "@type": "Offer",
      name: "30 Yard Household Cleanout Dumpster",
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
      name: "What counts as a household cleanout?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A household cleanout involves clearing out large amounts of furniture, personal belongings, and accumulated items from a home. Common scenarios include moving, downsizing, estate cleanouts after a loved one passes, hoarding cleanup, foreclosure cleanouts, and rental property turnovers.",
      },
    },
    {
      "@type": "Question",
      name: "What size dumpster do I need for cleaning out a house?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For a single room or garage cleanout, a 10-yard dumpster is usually sufficient. For a 2-3 bedroom home cleanout, a 20-yard is the most popular choice. For whole-house cleanouts or large estates, a 30-yard dumpster gives you the most capacity.",
      },
    },
    {
      "@type": "Question",
      name: "Can I throw away furniture in a household dumpster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Furniture is one of the most common items in household cleanout dumpsters. Couches, tables, chairs, dressers, bed frames, desks, and shelves can all go in the dumpster. Break down large items when possible to maximize space.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a household cleanout dumpster cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "10-yard: $599 (1 ton, 7 days). 20-yard: $649 (2 tons, 7 days). 30-yard: $749 (3 tons, 7 days). All prices include delivery, pickup, and disposal. No hidden fees.",
      },
    },
    {
      "@type": "Question",
      name: "Can I put mattresses in the dumpster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, mattresses and box springs are accepted but incur an extra fee of $60 each due to special disposal requirements. Let us know when you book so we can add it to your order.",
      },
    },
    {
      "@type": "Question",
      name: "How do I handle an estate cleanout?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start by sorting items into keep, donate, and discard piles. For the discard pile, a 20 or 30-yard dumpster handles most estate cleanouts. We recommend starting with one room at a time and working through the house systematically.",
      },
    },
    {
      "@type": "Question",
      name: "What about hoarding cleanup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We regularly work with families and professionals handling hoarding situations. A 30-yard dumpster is typically recommended for hoarding cleanups. We can also arrange multiple hauls if needed. Our drivers are discreet and professional.",
      },
    },
    {
      "@type": "Question",
      name: "Can I put electronics in the dumpster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most electronics like TVs, monitors, and computers are prohibited from landfill disposal in California. We recommend taking electronics to a local e-waste recycling center. Small appliances like toasters and blenders are fine to toss.",
      },
    },
    {
      "@type": "Question",
      name: "Do you deliver to apartments or condos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we deliver to apartments, condos, and townhomes as long as there is a suitable placement location such as a driveway, parking lot, or street (with permit if required). Contact us to discuss placement options for your specific situation.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly can I get a dumpster for a cleanout?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer same-day and next-day delivery for most Bay Area locations. Book online or call us at (510) 650-2083 to check availability for your area.",
      },
    },
  ],
};

/* ───────── Data Arrays ───────── */
const dumpsterSizes = [
  {
    name: "10 Yard",
    price: "$599",
    dimensionsClean: "12\u2019L \u00d7 8\u2019W \u00d7 2.5\u2019H",
    weight: "1 ton included",
    rental: "7-day rental",
    image: "/images/sizes/10-yard.png",
    bestFor: "Single-room cleanouts, garage cleanups, small decluttering projects",
    popular: false,
  },
  {
    name: "20 Yard",
    price: "$649",
    dimensionsClean: "16\u2019L \u00d7 8\u2019W \u00d7 4\u2019H",
    weight: "2 tons included",
    rental: "7-day rental",
    image: "/images/sizes/20-yard.png",
    bestFor: "2-3 bedroom home cleanouts, estate cleanouts, moving & downsizing",
    popular: true,
  },
  {
    name: "30 Yard",
    price: "$749",
    dimensionsClean: "16\u2019L \u00d7 8\u2019W \u00d7 6\u2019H",
    weight: "3 tons included",
    rental: "7-day rental",
    image: "/images/sizes/30-yard.png",
    bestFor: "Whole-house cleanouts, hoarding cleanup, large estate cleanouts",
    popular: false,
  },
];

const commonProjects = [
  { name: "Whole-House Cleanout", icon: <FaHouse /> },
  { name: "Garage Cleanup", icon: <FaWarehouse /> },
  { name: "Attic Cleanout", icon: <FaHouseChimneyWindow /> },
  { name: "Basement Cleanout", icon: <FaBoxesPacking /> },
  { name: "Estate Cleanout", icon: <FaBoxOpen /> },
  { name: "Moving & Downsizing", icon: <FaPeopleCarryBox /> },
  { name: "Hoarding Cleanup", icon: <FaBroom /> },
  { name: "Foreclosure Cleanout", icon: <FaKey /> },
  { name: "Storage Unit Cleanout", icon: <FaBoxesPacking /> },
  { name: "Divorce/Separation Cleanout", icon: <FaUserGroup /> },
  { name: "Senior Downsizing", icon: <FaHandHoldingHeart /> },
  { name: "Rental Property Turnover", icon: <FaBuilding /> },
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
    question: "What counts as a household cleanout?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        A household cleanout involves clearing out large amounts of furniture, personal belongings, and accumulated items from a home. Common scenarios include moving to a new house, downsizing to a smaller space, estate cleanouts after a loved one passes, hoarding cleanup, foreclosure cleanouts, and rental property turnovers. If you&apos;re removing more than a few bags of junk, a dumpster is the most efficient solution.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for cleaning out a house?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">It depends on the scope of your cleanout:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>10-yard:</strong> Single room, garage, or small decluttering project</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>20-yard:</strong> 2-3 bedroom home cleanout (most popular choice)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>30-yard:</strong> Whole-house cleanout, large estate, or hoarding situations</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          Not sure? Call us at <strong>(510) 650-2083</strong> and we&apos;ll help you pick the right size.
        </p>
      </>
    ),
  },
  {
    question: "Can I throw away furniture in a household dumpster?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Furniture is one of the most common items in household cleanout dumpsters. Couches, tables, chairs, dressers, bed frames, desks, bookshelves, and entertainment centers can all go in the dumpster. We recommend breaking down large items when possible to maximize your space and fit more in a single load.
      </p>
    ),
  },
  {
    question: "How much does a household cleanout dumpster cost?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Our household cleanout dumpster pricing is straightforward:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>10-yard:</strong> $599 — includes 1 ton and 7-day rental</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>20-yard:</strong> $649 — includes 2 tons and 7-day rental</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>30-yard:</strong> $749 — includes 3 tons and 7-day rental</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          All prices include delivery, pickup, and disposal. Additional days are $49/day. No hidden fees.
        </p>
      </>
    ),
  },
  {
    question: "Can I put mattresses in the dumpster?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes, mattresses and box springs are accepted but incur an extra fee of <strong>$60 each</strong> due to special disposal requirements in California. Let us know when you book so we can add it to your order. This is one of the most common add-ons for household cleanout dumpsters.
      </p>
    ),
  },
];

const faqsRight = [
  {
    question: "How do I handle an estate cleanout?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Start by sorting items into keep, donate, and discard piles. For the discard pile, a <strong>20 or 30-yard dumpster</strong> handles most estate cleanouts. We recommend starting with one room at a time and working through the house systematically. Many families find it helpful to have the dumpster on-site for the full 7-day rental period so they can work at their own pace.
      </p>
    ),
  },
  {
    question: "What about hoarding cleanup?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We regularly work with families and professionals handling hoarding situations. A <strong>30-yard dumpster</strong> is typically recommended for hoarding cleanups due to the volume of materials. We can also arrange multiple hauls if one dumpster isn&apos;t enough. Our drivers are discreet and professional — we understand these situations require sensitivity.
      </p>
    ),
  },
  {
    question: "Can I put electronics in the dumpster?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Most electronics like TVs, monitors, and computers are <strong>prohibited from landfill disposal</strong> in California. We recommend taking electronics to a local e-waste recycling center. However, small appliances like toasters, blenders, coffee makers, and microwaves are perfectly fine to include in your household cleanout dumpster.
      </p>
    ),
  },
  {
    question: "Do you deliver to apartments or condos?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes, we deliver to apartments, condos, and townhomes as long as there is a suitable placement location such as a driveway, parking lot, or street (with permit if required). Contact us at <strong>(510) 650-2083</strong> to discuss placement options for your specific situation. We&apos;ll work with you to find the best spot.
      </p>
    ),
  },
  {
    question: "How quickly can I get a dumpster for a cleanout?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We offer <strong>same-day and next-day delivery</strong> for most Bay Area locations. If you&apos;re planning a cleanout, we recommend booking 1-2 days in advance to guarantee your preferred delivery date. For urgent requests, call us at <strong>(510) 650-2083</strong> and we&apos;ll do our best to accommodate you.
      </p>
    ),
  },
];

/* ═══════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════ */
export default function HouseholdCleanoutPage() {
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
        <div className="absolute inset-0 bg-[url('/images/dumpsters/delivery-residential.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/55 z-[1]" />

        <div className="relative z-[2] px-5 pb-10 max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block bg-tp-gold-dark text-white px-6 py-2 text-[13px] md:text-base font-bold rounded-[3px] font-[var(--font-poppins)]">
              Home &amp; Estate Cleanouts
            </span>
          </div>
          <h1 className="font-[var(--font-oswald)] text-[28px] sm:text-[3rem] lg:text-[4.5rem] font-extrabold text-white uppercase leading-[1.1] mb-4 tracking-wide">
            HOUSEHOLD CLEAN OUT DUMPSTER RENTAL
          </h1>
          <p className="font-[var(--font-poppins)] text-base sm:text-[1.4rem] lg:text-[1.6rem] font-medium text-white/90 italic mb-8 max-w-3xl mx-auto">
            The easiest way to clear out your home, garage, attic, or entire estate — one dumpster at a time
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
        </div>
      </section>

      {/* ────── DUMPSTER SIZES ────── */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            SIZES &amp; PRICING
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4">
            Household Cleanout Dumpster Sizes
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            Choose the right size for your household cleanout. All prices include delivery, pickup, disposal, and a 7-day rental period. No hidden fees.
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
                    alt={`${size.name} Household Cleanout Dumpster Rental - TP Dumpsters`}
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
          <div className="mt-12">
            <DumpsterPhotosGrid photos={[
              { src: "/images/gallery/residential-02.jpg", alt: "Household cleanout dumpster at home" },
              { src: "/images/gallery/delivery-01.jpg", alt: "Dumpster delivery for home cleanout" },
              { src: "/images/gallery/residential-04.jpg", alt: "Residential dumpster delivery" },
              { src: "/images/dumpsters/delivery-suburban.jpg", alt: "Suburban home cleanout dumpster" },
            ]} />
          </div>
        </div>
      </section>

      {/* ────── WHAT IS A HOUSEHOLD CLEAN OUT? ────── */}
      <section className="py-20 bg-white">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            UNDERSTANDING HOUSEHOLD CLEANOUTS
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-6">
            What Is a Household Clean Out?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                A <strong>household cleanout</strong> is the process of clearing out large amounts of furniture, personal belongings, and accumulated items from a home. Whether you&apos;re emptying entire rooms, cleaning out a packed garage, clearing an attic full of decades of memories, or tackling a basement that&apos;s become a storage unit — a household cleanout dumpster is the most efficient way to get it done.
              </p>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                Household cleanouts are perfect for <strong>moving to a new home</strong>, downsizing to a smaller space, handling an estate cleanout after a loved one passes, or addressing hoarding situations that need professional-level cleanup. Instead of making dozens of trips to the dump, one dumpster rental handles everything in a single, convenient solution.
              </p>
            </div>
            <div>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                At TP Dumpsters, we specialize in making household cleanouts stress-free. Our <strong>10, 20, and 30-yard dumpsters</strong> are designed to handle everything from a single-room declutter to a full estate cleanout. Every rental includes a 7-day period so you can work at your own pace — no rushing, no pressure.
              </p>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                We also serve <strong>storage unit cleanouts</strong>, foreclosure properties, rental turnovers, and senior downsizing projects. Whatever the reason for your cleanout, we deliver the dumpster to your door and pick it up when you&apos;re done — it&apos;s that simple.
              </p>
              <Image src="/images/dumpsters/delivery-residential.jpg" alt="Household cleanout dumpster delivery" width={500} height={300} className="rounded-xl mt-4 w-full object-cover" />
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
            What You Can Put in a Household Cleanout Dumpster
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            From living room furniture to garage clutter, here&apos;s a comprehensive guide to everything you can throw away during your household cleanout.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Living Spaces */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-tp-red/10 rounded-lg flex items-center justify-center text-tp-red text-xl">
                  <FaCouch />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Living Spaces
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Couches, sofas, loveseats, and recliners",
                  "Coffee tables, end tables, and dining sets",
                  "TV stands, entertainment centers, and media consoles",
                  "Bookshelves, desks, and office chairs",
                  "Rugs, curtains, blinds, and window treatments",
                  "Lamps, light fixtures, and ceiling fans",
                  "Wall art, mirrors, and picture frames",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleCheck className="text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bedrooms & Closets */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-tp-red/10 rounded-lg flex items-center justify-center text-tp-red text-xl">
                  <FaBed />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Bedrooms &amp; Closets
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Bed frames, headboards, and footboards",
                  "Dressers, nightstands, and wardrobes",
                  "Clothing, shoes, and handbags",
                  "Linens, blankets, pillows, and comforters",
                  "Hangers, storage bins, and organizers",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleCheck className="text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Kitchen & Bathroom */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-tp-red/10 rounded-lg flex items-center justify-center text-tp-red text-xl">
                  <FaKitchenSet />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Kitchen &amp; Bathroom
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Small appliances — toasters, microwaves, blenders, coffee makers",
                  "Dishes, pots, pans, utensils, and glassware",
                  "Food containers, storage jars, and plastic bins",
                  "Towels, shower curtains, and bath mats",
                  "Bathroom cabinets and medicine cabinets (empty)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleCheck className="text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Garage & Storage */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-tp-red/10 rounded-lg flex items-center justify-center text-tp-red text-xl">
                  <FaWarehouse />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Garage &amp; Storage
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Bikes, scooters, and sports equipment",
                  "Hand tools (non-powered) and workbenches",
                  "Storage shelves, racks, and cabinets",
                  "Holiday decorations and seasonal items",
                  "Boxes, packing materials, and cardboard",
                  "Paint cans (dried and empty only)",
                  "Old lawn equipment (drained of all fluids)",
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
      </section>

      {/* ────── WHAT YOU CANNOT THROW AWAY ────── */}
      <section className="py-20 bg-white">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            RESTRICTED ITEMS
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4">
            What You Cannot Put in a Household Cleanout Dumpster
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            For safety and environmental reasons, certain materials are prohibited or require extra fees. Here&apos;s what you need to know before loading your dumpster.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Prohibited Items */}
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333] mb-5 flex items-center gap-2">
                <FaCircleXmark className="text-red-600" /> Prohibited Items
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Hazardous waste — chemicals, solvents, pesticides, herbicides",
                  "Batteries — car batteries, lithium batteries, and household batteries",
                  "Asbestos and asbestos-containing materials",
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
              <p className="text-sm text-[#666] leading-[1.7] mt-5">
                Not sure if your item is accepted? Call us at <strong>(510) 650-2083</strong> and we&apos;ll help you figure it out. We&apos;re happy to answer any questions about what can go in your dumpster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────── COMMON PROJECTS ────── */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            USE CASES
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4">
            Common Household Cleanout Projects
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            Our household cleanout dumpsters handle a wide range of residential projects. Here are the most popular reasons customers rent from us:
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

      {/* ────── HOW IT WORKS ────── */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center">
            SIMPLE PROCESS
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-white mb-12 text-center">
            How Household Cleanout Dumpster Rental Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                icon: <FaClipboardList />,
                title: "Choose Your Size",
                desc: "Select the 10, 20, or 30-yard dumpster that fits your cleanout. Not sure? Call us and we\u2019ll help you pick.",
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
                desc: "Load it up at your own pace. You have 7 days included. Just don\u2019t fill above the marked line.",
              },
              {
                step: "4",
                icon: <FaTruck />,
                title: "We Pick It Up",
                desc: "Call or text us when you\u2019re done. We\u2019ll pick up within 24 hours and handle all the disposal.",
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
            Household Cleanout Dumpster Delivery Areas
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            We deliver household cleanout dumpsters throughout the San Francisco Bay Area. Our service covers 7 counties and over 60 cities, ensuring fast delivery no matter where your project is located.
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
            Household Cleanout Dumpster Questions
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
      <section className="py-20 bg-tp-red">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto text-center">
          <h2 className="font-[var(--font-oswald)] text-[28px] sm:text-[36px] lg:text-[48px] font-extrabold text-white uppercase mb-4">
            Ready to Clean Out Your Home?
          </h2>
          <p className="font-[var(--font-poppins)] text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Book your household cleanout dumpster online in minutes, or call us for a free quote. Same-day delivery available across the Bay Area.
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
