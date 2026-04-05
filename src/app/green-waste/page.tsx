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
  FaTree,
  FaLeaf,
  FaSeedling,
  FaCloudBolt,
  FaCircleCheck,
  FaCircleXmark,
  FaTruck,
  FaClipboardList,
  FaTrashCan,
  FaMapLocationDot,
  FaScissors,
  FaHouse,
  FaBroom,
  FaMountainSun,
  FaFireFlameCurved,
  FaPeopleGroup,
  FaHandshake,
  FaScrewdriverWrench,
} from "react-icons/fa6";

/* ───────── SEO METADATA ───────── */
export const metadata: Metadata = {
  title: "Green Waste Dumpster Rental | Yard Waste Disposal Bay Area - TP Dumpsters",
  description:
    "Rent a green waste dumpster for yard cleanup, tree trimming, landscaping, and storm debris. 10, 20 & 30 yard sizes. Bay Area delivery. Book online!",
  keywords:
    "green waste dumpster rental, yard waste dumpster, yard waste disposal near me, how to dispose of yard waste, where to dispose of yard waste, landscaping debris dumpster, tree removal dumpster, brush removal dumpster rental, green waste disposal bay area",
  openGraph: {
    title: "Green Waste Dumpster Rental | Yard Waste Disposal Bay Area - TP Dumpsters",
    description:
      "Rent a green waste dumpster for yard cleanup, tree trimming, landscaping, and storm debris. 10, 20 & 30 yard sizes. Bay Area delivery.",
    url: "https://tpdumpsters.com/green-waste",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://tpdumpsters.com/green-waste",
  },
};

/* ───────── JSON-LD SCHEMA ───────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Green Waste Dumpster Rental",
  description:
    "Rent a green waste dumpster for yard cleanup, tree trimming, landscaping renovation, and storm debris removal. Available in 10, 20, and 30 yard sizes across the San Francisco Bay Area.",
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
      name: "10 Yard Green Waste Dumpster",
      price: "599",
      priceCurrency: "USD",
      description: "10 yard dumpster — 1 ton included, 7-day rental, 12ft L × 8ft W × 2.5ft H",
    },
    {
      "@type": "Offer",
      name: "20 Yard Green Waste Dumpster",
      price: "649",
      priceCurrency: "USD",
      description: "20 yard dumpster — 2 tons included, 7-day rental, 16ft L × 8ft W × 4ft H",
    },
    {
      "@type": "Offer",
      name: "30 Yard Green Waste Dumpster",
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
      name: "What qualifies as green waste?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Green waste includes organic yard and garden materials such as tree branches, leaves, grass clippings, shrubs, hedge trimmings, weeds, flowers, dead plants, palm fronds, and landscaping debris. It does not include treated lumber, painted wood, plastic, or any non-organic materials.",
      },
    },
    {
      "@type": "Question",
      name: "What size dumpster do I need for yard cleanup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most yard cleanups, a 10-yard dumpster handles small to medium jobs like seasonal pruning or garden overhauls. A 20-yard is ideal for larger projects like tree trimming or landscaping renovation. For major lot clearing or storm cleanup, a 30-yard dumpster is your best option.",
      },
    },
    {
      "@type": "Question",
      name: "Can I put tree stumps in a green waste dumpster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Small tree stumps are accepted in green waste dumpsters. Large stumps may be too heavy and could push your load over the weight limit. We recommend cutting stumps into smaller pieces when possible. Call us at (510) 650-2083 if you're unsure about your specific situation.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a green waste dumpster cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "10-yard: $599 (1 ton, 7 days). 20-yard: $649 (2 tons, 7 days). 30-yard: $749 (3 tons, 7 days). All prices include delivery, pickup, and disposal. No hidden fees.",
      },
    },
    {
      "@type": "Question",
      name: "Can I mix green waste with other debris?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Green waste dumpsters are intended for organic yard materials only. Mixing in non-green waste items like furniture, construction debris, or household junk may result in additional fees. If you have mixed waste, consider renting a general debris dumpster instead.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between green waste and general debris?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Green waste is limited to organic yard and garden materials — branches, leaves, grass, shrubs, etc. General debris accepts a wider range of items including furniture, construction materials, household junk, and yard waste all mixed together. If your project is purely yard-related, green waste is the right choice.",
      },
    },
    {
      "@type": "Question",
      name: "How do I dispose of large tree branches?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cut branches into 4-foot lengths so they fit flat in the dumpster. This maximizes space and prevents branches from sticking above the fill line. For very large limbs or whole trees, a 20 or 30-yard dumpster gives you the room you need.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer same-day delivery for storm cleanup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We understand that storm cleanup is urgent. We offer same-day and next-day delivery for most Bay Area locations. Call us at (510) 650-2083 to check availability for your area.",
      },
    },
    {
      "@type": "Question",
      name: "Can I put dirt or rocks in a green waste dumpster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Small amounts of garden soil mixed with green waste are acceptable. However, large amounts of dirt should go in a Clean Soil dumpster, and rocks or concrete should go in a Clean Concrete dumpster. These heavy materials can quickly exceed weight limits.",
      },
    },
    {
      "@type": "Question",
      name: "Is green waste recycled?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Green waste is typically processed at composting facilities where it's turned into mulch, compost, and soil amendments. By choosing a dedicated green waste dumpster, you're helping divert organic materials from landfills and supporting sustainable waste management.",
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
    bestFor: "Small yard cleanups, seasonal pruning, garden overhauls",
    popular: false,
  },
  {
    name: "20 Yard",
    price: "$649",
    dimensionsClean: "16&apos;L × 8&apos;W × 4&apos;H",
    weight: "2 tons included",
    rental: "7-day rental",
    image: "/images/sizes/20-yard.png",
    bestFor: "Tree trimming, landscaping renovation, brush clearing",
    popular: true,
  },
  {
    name: "30 Yard",
    price: "$749",
    dimensionsClean: "16&apos;L × 8&apos;W × 6&apos;H",
    weight: "3 tons included",
    rental: "7-day rental",
    image: "/images/sizes/30-yard.png",
    bestFor: "Lot clearing, storm cleanup, major landscaping projects",
    popular: false,
  },
];

const commonProjects = [
  { name: "Yard Cleanup", icon: <FaBroom /> },
  { name: "Tree Trimming", icon: <FaScissors /> },
  { name: "Landscaping Renovation", icon: <FaSeedling /> },
  { name: "Storm Cleanup", icon: <FaCloudBolt /> },
  { name: "Seasonal Pruning", icon: <FaLeaf /> },
  { name: "Garden Overhaul", icon: <FaTree /> },
  { name: "Brush Clearing", icon: <FaMountainSun /> },
  { name: "Lot Clearing", icon: <FaScrewdriverWrench /> },
  { name: "Fence Line Cleanup", icon: <FaHouse /> },
  { name: "HOA Compliance", icon: <FaPeopleGroup /> },
  { name: "Wildfire Prevention", icon: <FaFireFlameCurved /> },
  { name: "Property Maintenance", icon: <FaHandshake /> },
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
    question: "What qualifies as green waste?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Green waste includes organic yard and garden materials such as tree branches, leaves, grass clippings, shrubs, hedge trimmings, weeds, flowers, dead plants, palm fronds, and landscaping debris. It does <strong>not</strong> include treated lumber, painted wood, plastic, or any non-organic materials. If it grew in your yard, it&apos;s likely green waste.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for yard cleanup?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For most yard cleanups, a <strong>10-yard dumpster</strong> handles small to medium jobs like seasonal pruning or garden overhauls. A <strong>20-yard</strong> is ideal for larger projects like tree trimming or landscaping renovation. For major lot clearing or storm cleanup, go with the <strong>30-yard</strong> to avoid needing a second haul.
      </p>
    ),
  },
  {
    question: "Can I put tree stumps in a green waste dumpster?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Small tree stumps are accepted in green waste dumpsters. Large stumps may be too heavy and could push your load over the weight limit. We recommend cutting stumps into smaller pieces when possible. Call us at <strong>(510) 650-2083</strong> if you&apos;re unsure about your specific situation.
      </p>
    ),
  },
  {
    question: "How much does a green waste dumpster cost?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Our green waste dumpster pricing is straightforward:</p>
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
    question: "Can I mix green waste with other debris?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Green waste dumpsters are intended for organic yard materials only. Mixing in non-green waste items like furniture, construction debris, or household junk may result in additional sorting fees. If you have mixed waste from a home project that includes yard cleanup, consider renting a <Link href="/general-debris" className="text-tp-red font-semibold hover:underline">general debris dumpster</Link> instead.
      </p>
    ),
  },
];

const faqsRight = [
  {
    question: "What&apos;s the difference between green waste and general debris?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        <strong>Green waste</strong> is limited to organic yard and garden materials — branches, leaves, grass, shrubs, etc. <Link href="/general-debris" className="text-tp-red font-semibold hover:underline">General debris</Link> accepts a wider range of items including furniture, construction materials, household junk, and yard waste all mixed together. If your project is purely yard-related, green waste is the right choice. If you&apos;re also cleaning out your home or garage, general debris gives you more flexibility.
      </p>
    ),
  },
  {
    question: "How do I dispose of large tree branches?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Cut branches into <strong>4-foot lengths</strong> so they fit flat in the dumpster. This maximizes space and prevents branches from sticking above the fill line. For very large limbs or whole trees, a 20 or 30-yard dumpster gives you the room you need. Stack branches neatly to make the most of your dumpster capacity.
      </p>
    ),
  },
  {
    question: "Do you offer same-day delivery for storm cleanup?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We understand that storm cleanup is urgent. We offer <strong>same-day and next-day delivery</strong> for most Bay Area locations. Call us at <strong>(510) 650-2083</strong> to check availability for your area. We prioritize storm-related deliveries to help you get your property cleaned up fast.
      </p>
    ),
  },
  {
    question: "Can I put dirt or rocks in a green waste dumpster?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Small amounts of garden soil mixed with green waste are acceptable. However, large amounts of dirt should go in a dedicated Clean Soil dumpster, and rocks or concrete should go in a Clean Concrete dumpster. These heavy materials can quickly exceed weight limits and may incur overweight charges.
      </p>
    ),
  },
  {
    question: "Is green waste recycled?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Green waste is typically processed at <strong>composting facilities</strong> where it&apos;s turned into mulch, compost, and soil amendments. By choosing a dedicated green waste dumpster, you&apos;re helping divert organic materials from landfills and supporting sustainable waste management in the Bay Area.
      </p>
    ),
  },
];

/* ═══════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════ */
export default function GreenWastePage() {
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
        <div className="absolute inset-0 bg-[url('/images/dumpsters/yard-waste-driveway.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/55 z-[1]" />

        <div className="relative z-[2] px-5 pb-10 max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block bg-green-700 text-white px-6 py-2 text-[13px] md:text-base font-bold rounded-[3px] font-[var(--font-poppins)]">
              Eco-Friendly Yard Waste Disposal
            </span>
          </div>
          <h1 className="font-[var(--font-oswald)] text-[28px] sm:text-[3rem] lg:text-[4.5rem] font-extrabold text-white uppercase leading-[1.1] mb-4 tracking-wide">
            GREEN WASTE DUMPSTER RENTAL
          </h1>
          <p className="font-[var(--font-poppins)] text-base sm:text-[1.4rem] lg:text-[1.6rem] font-medium text-white/90 italic mb-8 max-w-3xl mx-auto">
            The easiest way to dispose of yard waste, tree trimmings, and landscaping debris across the Bay Area
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
            Green Waste Dumpster Sizes
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            Choose the right size for your yard waste project. All prices include delivery, pickup, disposal, and a 7-day rental period. No hidden fees.
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
                    alt={`${size.name} Green Waste Dumpster Rental - TP Dumpsters`}
                    width={300}
                    height={160}
                    className="max-h-[140px] object-contain"
                  />
                </div>
                <div className="px-6 py-4 flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-[#555]">
                      <FaCircleCheck className="text-green-600 flex-shrink-0" />
                      Dimensions: <span dangerouslySetInnerHTML={{ __html: size.dimensionsClean }} />
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
        </div>
      </section>

      {/* ────── DUMPSTER PHOTOS ────── */}
      <DumpsterPhotosGrid photos={[
        { src: "/images/dumpsters/yard-waste-driveway.jpg", alt: "Green waste dumpster in driveway" },
        { src: "/images/gallery/residential-02.jpg", alt: "Yard cleanup dumpster rental" },
        { src: "/images/dumpsters/delivery-suburban.jpg", alt: "Green waste disposal suburban" },
        { src: "/images/dumpsters/delivery-residential.jpg", alt: "Landscaping debris dumpster" },
      ]} />

      {/* ────── WHAT IS GREEN WASTE? ────── */}
      <section className="py-20 bg-white">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            UNDERSTANDING GREEN WASTE
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-6">
            What Is Green Waste?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                <strong>Green waste</strong> refers to organic yard and garden materials that are biodegradable and compostable. This includes tree trimmings, branches, leaves, grass clippings, shrubs, weeds, flowers, and other landscaping debris. It&apos;s the natural byproduct of maintaining your yard, garden, or outdoor property.
              </p>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                Green waste is one of the most common types of waste generated by homeowners, especially after <strong>storms, seasonal cleanups, and landscaping projects</strong>. Whether you&apos;re pruning trees in the fall, clearing brush for wildfire prevention, or completely renovating your landscape, a green waste dumpster gives you a convenient way to handle large volumes of yard debris.
              </p>
            </div>
            <div>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                Unlike general debris dumpsters that accept mixed waste, green waste dumpsters are specifically designed for organic materials. This means your yard waste can be <strong>composted and recycled</strong> into mulch, soil amendments, and other useful products — keeping it out of landfills and supporting sustainable waste management.
              </p>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                At TP Dumpsters, we offer <strong>10, 20, and 30-yard dumpsters</strong> for green waste projects of any size. From a weekend yard cleanup to a full-scale lot clearing, we deliver fast across the Bay Area with same-day availability and transparent pricing.
              </p>
              <Image src="/images/dumpsters/yard-waste-driveway.jpg" alt="Green waste dumpster for yard cleanup" width={500} height={300} className="rounded-xl mt-4 w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ────── WHAT YOU CAN THROW AWAY ────── */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            ✅ ACCEPTED ITEMS
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4">
            What You Can Put in a Green Waste Dumpster
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            Wondering how to dispose of yard waste? Here&apos;s a comprehensive guide to everything accepted in a green waste dumpster rental.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Trees & Branches */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-700 text-xl">
                  <FaTree />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Trees &amp; Branches
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Tree limbs and branches (cut to 4ft lengths)",
                  "Tree stumps (small)",
                  "Palm fronds",
                  "Bamboo",
                  "Brush and thicket",
                  "Logs (split)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleCheck className="text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Lawn & Garden */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-700 text-xl">
                  <FaLeaf />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Lawn &amp; Garden
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Grass clippings",
                  "Leaves",
                  "Weeds and flowers",
                  "Dead plants",
                  "Garden soil (small amounts)",
                  "Sod and mulch",
                  "Hay and straw",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleCheck className="text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Landscaping */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-700 text-xl">
                  <FaSeedling />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Landscaping
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Shrubs, hedges, and bushes",
                  "Ivy and vines",
                  "Ground cover",
                  "Ornamental grasses",
                  "Small root balls",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleCheck className="text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Storm & Seasonal */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-700 text-xl">
                  <FaCloudBolt />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Storm &amp; Seasonal
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Storm debris and fallen branches",
                  "Windblown leaves",
                  "Seasonal pruning waste",
                  "Christmas trees",
                  "Dead houseplants",
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
            ❌ RESTRICTED ITEMS
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4">
            What You Cannot Put in a Green Waste Dumpster
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            Green waste dumpsters are for organic yard materials only. The following items are <strong>not accepted</strong> and may result in additional fees if found in your load.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Not Green Waste */}
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333] mb-5 flex items-center gap-2">
                <FaCircleXmark className="text-red-600" /> Not Accepted
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Treated lumber — chemically treated wood is NOT green waste",
                  "Painted or stained wood",
                  "Plastic pots and containers",
                  "Garden hoses and irrigation tubing",
                  "Chemicals, pesticides, and herbicides",
                  "Furniture and household items",
                  "Construction debris and drywall",
                  "Food waste and kitchen scraps",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleXmark className="text-red-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Use a Different Dumpster */}
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333] mb-5 flex items-center gap-2">
                <span className="text-amber-600 text-xl">⚠️</span> Use a Different Dumpster
              </h3>
              <p className="text-sm text-[#666] leading-[1.7] mb-4">
                These materials require a dedicated dumpster type for proper disposal:
              </p>
              <ul className="space-y-3">
                {[
                  { item: "Rocks, concrete, and brick", redirect: "Use Clean Concrete dumpster" },
                  { item: "Dirt and soil (large amounts)", redirect: "Use Clean Soil dumpster" },
                  { item: "Mixed household + yard waste", redirect: "Use General Debris dumpster" },
                ].map((entry, i) => (
                  <li key={i} className="flex items-start justify-between gap-2 text-sm leading-relaxed bg-white rounded-lg p-3 border border-amber-100">
                    <span className="text-[#555]">{entry.item}</span>
                    <span className="font-bold text-tp-red whitespace-nowrap text-xs">{entry.redirect}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-[#666] leading-[1.7] mt-5">
                Not sure which dumpster type you need? Call us at <strong>(510) 650-2083</strong> and we&apos;ll help you choose the right one for your project.
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
            Common Projects for Green Waste Dumpsters
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            Our green waste dumpsters are perfect for a wide range of outdoor and landscaping projects. Here are the most popular reasons customers rent from us:
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
            How Green Waste Dumpster Rental Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                icon: <FaClipboardList />,
                title: "Choose Your Size",
                desc: "Select the 10, 20, or 30-yard dumpster that fits your yard project. Not sure? Call us and we'll help you pick.",
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
                desc: "Load it up with yard waste at your own pace. You have 7 days included. Cut branches to 4ft for best fit.",
              },
              {
                step: "4",
                icon: <FaTruck />,
                title: "We Pick It Up",
                desc: "Call or text us when you're done. We'll pick up within 24 hours and ensure your green waste is properly composted.",
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
            Green Waste Dumpster Delivery Areas
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            We deliver green waste dumpsters throughout the San Francisco Bay Area. Our service covers 7 counties and over 60 cities, ensuring fast delivery no matter where your yard project is located.
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
            Green Waste Dumpster Questions
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
            Ready to Clean Up Your Yard?
          </h2>
          <p className="font-[var(--font-poppins)] text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Book your green waste dumpster online in minutes, or call us for a free quote. Same-day delivery available across the Bay Area.
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
