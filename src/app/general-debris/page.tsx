import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Image from "next/image";
import Link from "next/link";
import FaqAccordion from "./components/FaqAccordion";
import {
  FaCalendarDays,
  FaPhone,
  FaCouch,
  FaHammer,
  FaTree,
  FaWarehouse,
  FaCircleCheck,
  FaCircleXmark,
  FaTruck,
  FaClipboardList,
  FaTrashCan,
  FaBoxOpen,
  FaHouse,
  FaKitchenSet,
  FaBath,
  FaBoxesPacking,
  FaPeopleCarryBox,
  FaScrewdriverWrench,
  FaDumpster,
  FaBroom,
  FaCloudBolt,
  FaMapLocationDot,
} from "react-icons/fa6";

/* ───────── SEO METADATA ───────── */
export const metadata: Metadata = {
  title: "General Debris Dumpster Rental | Bay Area Junk Removal - TP Dumpsters",
  description:
    "Rent a general debris dumpster for home cleanouts, renovations, and junk removal. 10, 20 & 30 yard sizes. Serving Oakland, San Jose & all Bay Area cities. Book online!",
  keywords:
    "general debris dumpster rental, general debris dumpster, what can you put in a dumpster, dumpster rental for junk removal, what can go in a roll off dumpster, household junk dumpster, renovation debris dumpster, dumpster for home cleanout, bay area dumpster rental",
  openGraph: {
    title: "General Debris Dumpster Rental | Bay Area Junk Removal - TP Dumpsters",
    description:
      "Rent a general debris dumpster for home cleanouts, renovations, and junk removal. 10, 20 & 30 yard sizes. Serving Oakland, San Jose & all Bay Area cities.",
    url: "https://tpdumpsters.com/general-debris",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://tpdumpsters.com/general-debris",
  },
};

/* ───────── JSON-LD SCHEMA ───────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "General Debris Dumpster Rental",
  description:
    "Rent a general debris dumpster for home cleanouts, renovations, junk removal, and construction projects. Available in 10, 20, and 30 yard sizes across the San Francisco Bay Area.",
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
      name: "10 Yard General Debris Dumpster",
      price: "599",
      priceCurrency: "USD",
      description: "10 yard dumpster — 1 ton included, 7-day rental, 12ft L × 8ft W × 2.5ft H",
    },
    {
      "@type": "Offer",
      name: "20 Yard General Debris Dumpster",
      price: "649",
      priceCurrency: "USD",
      description: "20 yard dumpster — 2 tons included, 7-day rental, 16ft L × 8ft W × 4ft H",
    },
    {
      "@type": "Offer",
      name: "30 Yard General Debris Dumpster",
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
      name: "What is considered general debris?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "General debris includes most common household, renovation, and yard waste materials including furniture, clothing, drywall, lumber, flooring, landscaping waste, and more. If it's not hazardous, flammable, or a restricted item, it likely qualifies as general debris.",
      },
    },
    {
      "@type": "Question",
      name: "What size dumpster do I need for a home cleanout?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most home cleanouts, a 20-yard dumpster is the best choice. It handles the contents of a typical 2-3 bedroom home. For smaller cleanouts, a 10-yard works well. For large estates, go with the 30-yard.",
      },
    },
    {
      "@type": "Question",
      name: "Can I put furniture in a general debris dumpster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Furniture is one of the most common items. You can throw away couches, tables, chairs, desks, shelves, dressers, bed frames, and more. Mattresses incur an extra fee of $60 each.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a general debris dumpster cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "10-yard: $599 (1 ton, 7 days). 20-yard: $649 (2 tons, 7 days). 30-yard: $749 (3 tons, 7 days). All prices include delivery, pickup, and disposal.",
      },
    },
    {
      "@type": "Question",
      name: "How long can I keep the dumpster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All general debris dumpster rentals include a 7-day rental period. Additional days are available at $49/day with 24-hour notice.",
      },
    },
    {
      "@type": "Question",
      name: "Can I mix different types of debris?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! You can mix household items, renovation materials, yard waste, and garage cleanout items in the same dumpster. The only exception is large amounts of heavy materials like concrete or soil.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I go over the weight limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Extra weight is charged at $125 per additional ton (prorated). We weigh every load at the disposal facility and only charge for actual overage.",
      },
    },
    {
      "@type": "Question",
      name: "Do you deliver on weekends?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer Saturday deliveries for most Bay Area locations. Sunday delivery may be available depending on your area.",
      },
    },
    {
      "@type": "Question",
      name: "How do I schedule a pickup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Call us at (510) 650-2083 or text us when you're done. We typically pick up within 24 hours of your request.",
      },
    },
    {
      "@type": "Question",
      name: "Can I put construction materials in a general debris dumpster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! You can include drywall, lumber, flooring, cabinets, doors, roofing shingles, plumbing fixtures, and more. Large amounts of concrete, brick, or soil should go in a dedicated heavy materials dumpster.",
      },
    },
  ],
};

/* ───────── Data Arrays ───────── */
const dumpsterSizes = [
  {
    name: "10 Yard",
    price: "$599",
    dimensionsClean: "12'L × 8'W × 2.5'H",
    weight: "1 ton included",
    rental: "7-day rental",
    image: "/images/sizes/10-yard.png",
    bestFor: "Small cleanouts, single-room projects, garage cleanups",
    popular: false,
  },
  {
    name: "20 Yard",
    price: "$649",
    dimensionsClean: "16'L × 8'W × 4'H",
    weight: "2 tons included",
    rental: "7-day rental",
    image: "/images/sizes/20-yard.png",
    bestFor: "Home cleanouts, kitchen remodels, medium renovations",
    popular: true,
  },
  {
    name: "30 Yard",
    price: "$749",
    dimensionsClean: "16'L × 8'W × 6'H",
    weight: "3 tons included",
    rental: "7-day rental",
    image: "/images/sizes/30-yard.png",
    bestFor: "Large renovations, estate cleanouts, construction projects",
    popular: false,
  },
];

const commonProjects = [
  { name: "Home Cleanouts", icon: <FaHouse /> },
  { name: "Garage Cleanups", icon: <FaWarehouse /> },
  { name: "Kitchen Remodels", icon: <FaKitchenSet /> },
  { name: "Bathroom Renovations", icon: <FaBath /> },
  { name: "Basement Cleanouts", icon: <FaBoxesPacking /> },
  { name: "Moving & Downsizing", icon: <FaPeopleCarryBox /> },
  { name: "Estate Cleanouts", icon: <FaBoxOpen /> },
  { name: "Room Additions", icon: <FaScrewdriverWrench /> },
  { name: "Deck Removal", icon: <FaHammer /> },
  { name: "Shed Demolition", icon: <FaDumpster /> },
  { name: "Storm Cleanup", icon: <FaCloudBolt /> },
  { name: "Hoarding Cleanup", icon: <FaBroom /> },
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
    question: "What is considered general debris?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        General debris includes most common household, renovation, and yard waste materials. This category covers furniture, clothing, drywall, lumber, flooring, landscaping waste, and much more. Essentially, if it&apos;s not hazardous, flammable, or a restricted item, it likely qualifies as general debris. It&apos;s the most versatile and popular dumpster category we offer.
      </p>
    ),
  },
  {
    question: "What size dumpster do I need for a home cleanout?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For most home cleanouts, a <strong>20-yard dumpster</strong> is the best choice. It can handle the contents of a typical 2-3 bedroom home including furniture, boxes, clothing, and household items. For smaller cleanouts (one room or garage), a 10-yard works well. For large estates or whole-house cleanouts, go with the 30-yard to avoid needing a second haul.
      </p>
    ),
  },
  {
    question: "Can I put furniture in a general debris dumpster?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Furniture is one of the most common items in general debris dumpsters. You can throw away couches, tables, chairs, desks, shelves, dressers, bed frames, and more. We recommend breaking down large items when possible to maximize space. The only furniture-related exception is mattresses, which incur an extra fee of $60 each due to special disposal requirements.
      </p>
    ),
  },
  {
    question: "How much does a general debris dumpster cost?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Our general debris dumpster pricing is straightforward:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>10-yard:</strong> $599 — includes 1 ton and 7-day rental</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>20-yard:</strong> $649 — includes 2 tons and 7-day rental</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>30-yard:</strong> $749 — includes 3 tons and 7-day rental</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          Additional days are $49/day, and overweight charges are $125 per ton (prorated). No hidden fees.
        </p>
      </>
    ),
  },
  {
    question: "How long can I keep the dumpster?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        All general debris dumpster rentals include a <strong>7-day rental period</strong>. Need more time? No problem — additional days are available at $49/day with 24-hour notice. Whether you&apos;re tackling a weekend cleanout or a multi-week renovation, we&apos;ll work with your timeline.
      </p>
    ),
  },
];

const faqsRight = [
  {
    question: "Can I mix different types of debris?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! That&apos;s the beauty of a general debris dumpster. You can mix household items, renovation materials, yard waste, and garage cleanout items all in the same dumpster. The only exception is heavy materials like clean concrete, soil, or bricks — those should go in a dedicated 10-yard heavy materials dumpster. Small amounts mixed in with general debris are fine.
      </p>
    ),
  },
  {
    question: "What happens if I go over the weight limit?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If your dumpster exceeds the included weight allowance, you&apos;ll be charged <strong>$125 per additional ton</strong> (prorated). We weigh every load at the disposal facility and only charge for actual overage. To avoid surprises, keep heavy items like concrete, dirt, and tile to a minimum in general debris loads, and don&apos;t fill above the marked fill line.
      </p>
    ),
  },
  {
    question: "Do you deliver on weekends?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes, we offer <strong>Saturday deliveries</strong> for most Bay Area locations. Sunday delivery may be available depending on your area. Book online or call us at <strong>(510) 650-2083</strong> to check weekend availability for your address.
      </p>
    ),
  },
  {
    question: "How do I schedule a pickup?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        When you&apos;re done filling your dumpster, simply call us at <strong>(510) 650-2083</strong> or text us to schedule a pickup. We typically pick up within 24 hours of your request. Make sure debris doesn&apos;t extend above the fill line so our truck can safely transport it.
      </p>
    ),
  },
  {
    question: "Can I put construction materials in a general debris dumpster?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Absolutely! Construction and renovation materials are among the most common items in general debris dumpsters. You can include:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Drywall, sheetrock, and plaster</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Lumber, wood scraps, and plywood</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Flooring materials (tile, laminate, hardwood, vinyl)</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Cabinets, countertops, doors, and trim</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Roofing shingles and siding</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Plumbing fixtures (sinks, toilets, tubs)</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          Just keep in mind that large amounts of concrete, brick, or soil should go in a dedicated heavy materials dumpster.
        </p>
      </>
    ),
  },
];

/* ═══════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════ */
export default function GeneralDebrisPage() {
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
              Most Popular Dumpster Category
            </span>
          </div>
          <h1 className="font-[var(--font-oswald)] text-[28px] sm:text-[3rem] lg:text-[4.5rem] font-extrabold text-white uppercase leading-[1.1] mb-4 tracking-wide">
            GENERAL DEBRIS DUMPSTER RENTAL
          </h1>
          <p className="font-[var(--font-poppins)] text-base sm:text-[1.4rem] lg:text-[1.6rem] font-medium text-white/90 italic mb-8 max-w-3xl mx-auto">
            The most versatile dumpster for home cleanouts, renovations, and junk removal across the Bay Area
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
            <Image src="/images/dumpsters/dumpsters-side-by-side.jpg" alt="General Debris Dumpsters" width={600} height={400} className="rounded-xl shadow-2xl" />
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
            General Debris Dumpster Sizes
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            Choose the right size for your project. All prices include delivery, pickup, disposal, and a 7-day rental period. No hidden fees.
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
                    alt={`${size.name} General Debris Dumpster Rental - TP Dumpsters`}
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
        </div>
      </section>

      {/* ────── WHAT IS GENERAL DEBRIS? ────── */}
      <section className="py-20 bg-white">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            UNDERSTANDING GENERAL DEBRIS
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-6">
            What Is a General Debris Dumpster?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                A <strong>general debris dumpster</strong> is the most versatile and popular type of roll-off dumpster rental. It&apos;s designed for mixed waste from everyday projects — everything from home cleanouts and furniture removal to renovation debris and yard waste. If you&apos;re cleaning out your garage, remodeling a kitchen, or decluttering your entire home, a general debris dumpster is your best option.
              </p>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                Unlike specialty dumpsters for concrete, soil, or roofing, a general debris dumpster lets you <strong>mix different types of materials</strong> in a single container. This makes it the go-to choice for homeowners, contractors, and property managers across the Bay Area who need a convenient, all-in-one waste disposal solution.
              </p>
            </div>
            <div>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                At TP Dumpsters, general debris accounts for over <strong>80% of our rental orders</strong>. It&apos;s the most cost-effective way to handle junk removal, renovation waste, and cleanout projects without sorting materials into separate containers. Whether you&apos;re a homeowner tackling a weekend project or a contractor managing a job site, our general debris dumpsters give you the flexibility to get the job done.
              </p>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                We offer <strong>10, 20, and 30-yard dumpsters</strong> for general debris, with same-day delivery available throughout the Bay Area. Every rental includes a 7-day rental period, delivery, pickup, and disposal — all included in one transparent price with no hidden fees.
              </p>
              <Image src="/images/dumpsters/delivery-suburban.jpg" alt="Dumpster rental delivery" width={500} height={300} className="rounded-xl mt-4 w-full object-cover" />
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
            What You Can Put in a General Debris Dumpster
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            One of the most common questions we get is &quot;what can go in a roll off dumpster?&quot; Here&apos;s a comprehensive guide to everything you can throw away in a general debris dumpster rental.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Household Items */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-tp-red/10 rounded-lg flex items-center justify-center text-tp-red text-xl">
                  <FaCouch />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Household Items
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Furniture — couches, tables, chairs, desks, shelves, dressers, bed frames",
                  "Clothing, textiles, bedding, curtains, and linens",
                  "Books, magazines, papers, and documents",
                  "Toys, sports equipment, and outdoor games",
                  "Small appliances — toasters, microwaves, blenders, coffee makers",
                  "Dishes, kitchenware, pots and pans, glassware",
                  "Lamps, light fixtures, and ceiling fans",
                  "Rugs, carpets, and carpet padding",
                  "Boxes, packaging materials, and packing peanuts",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleCheck className="text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Renovation & Construction */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-tp-red/10 rounded-lg flex items-center justify-center text-tp-red text-xl">
                  <FaHammer />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Renovation &amp; Construction
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Drywall, sheetrock, and plaster",
                  "Lumber, wood scraps, plywood, and OSB",
                  "Flooring — tile, laminate, hardwood, vinyl, and linoleum",
                  "Cabinets, countertops, and vanities",
                  "Doors, windows (no glass panes), and frames",
                  "Insulation (non-asbestos only)",
                  "Siding, trim, molding, and baseboards",
                  "Roofing shingles and underlayment",
                  "Plumbing fixtures — sinks, toilets, tubs, shower pans",
                  "Brick, concrete, and stone (small amounts mixed in)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleCheck className="text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Yard & Outdoor */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-tp-red/10 rounded-lg flex items-center justify-center text-tp-red text-xl">
                  <FaTree />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Yard &amp; Outdoor
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Tree branches and limbs (cut to 4ft lengths)",
                  "Bushes, shrubs, and hedge trimmings",
                  "Dirt and soil (small amounts only)",
                  "Fencing — wood, vinyl, and chain link",
                  "Decking materials and deck boards",
                  "Landscape timbers and railroad ties",
                  "Old outdoor furniture — patio sets, umbrellas, grills",
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
                  "Bikes, scooters, and wagons",
                  "Hand tools (non-powered)",
                  "Storage bins and containers",
                  "Holiday decorations and seasonal items",
                  "Old paint cans (dried and empty only)",
                  "Cardboard boxes and packing materials",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleCheck className="text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            <Image src="/images/dumpsters/delivery-residential.jpg" alt="Dumpster delivery" width={300} height={200} className="rounded-lg object-cover w-full h-40" />
            <Image src="/images/dumpsters/construction-site.jpg" alt="Construction debris" width={300} height={200} className="rounded-lg object-cover w-full h-40" />
            <Image src="/images/dumpsters/yard-waste-driveway.jpg" alt="Yard waste dumpster" width={300} height={200} className="rounded-lg object-cover w-full h-40" />
            <Image src="/images/dumpsters/dumpster-dirt-sunny.jpg" alt="General debris dumpster" width={300} height={200} className="rounded-lg object-cover w-full h-40" />
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
            What You Cannot Put in a General Debris Dumpster
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
      <section className="py-20 bg-white">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            USE CASES
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4">
            Common Projects for General Debris Dumpsters
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            Our general debris dumpsters handle a wide range of residential and commercial projects. Here are the most popular reasons customers rent from us:
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
            How Dumpster Rental Works
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
            General Debris Dumpster Delivery Areas
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            We deliver general debris dumpsters throughout the San Francisco Bay Area. Our service covers 7 counties and over 60 cities, ensuring fast delivery no matter where your project is located.
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
            General Debris Dumpster Questions
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
            Ready to Rent a Dumpster?
          </h2>
          <p className="font-[var(--font-poppins)] text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Book your general debris dumpster online in minutes, or call us for a free quote. Same-day delivery available across the Bay Area.
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
