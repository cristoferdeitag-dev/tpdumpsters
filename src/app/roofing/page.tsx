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
  FaHouse,
  FaScrewdriverWrench,
  FaCloudBolt,
  FaMapLocationDot,
  FaHelmetSafety,
  FaLayerGroup,
  FaHammer,
} from "react-icons/fa6";

/* ───────── SEO METADATA ───────── */
export const metadata: Metadata = {
  title: "Roofing Dumpster Rental | Roof Tear-Off & Shingle Disposal - TP Dumpsters",
  description:
    "Rent a roofing dumpster for tear-offs, replacements, and roof repairs. 10, 20 & 30 yard sizes with roofing-rated capacity. Bay Area delivery. Book online!",
  keywords:
    "roofing dumpster rental, roof tear off dumpster, roofing debris dumpster, dumpster for shingles, roof replacement dumpster rental, roofing contractor dumpster bay area, roofing dumpster near me, shingle disposal dumpster",
  openGraph: {
    title: "Roofing Dumpster Rental | Roof Tear-Off & Shingle Disposal - TP Dumpsters",
    description:
      "Rent a roofing dumpster for tear-offs, replacements, and roof repairs. 10, 20 & 30 yard sizes with roofing-rated capacity. Bay Area delivery.",
    url: "https://tpdumpsters.com/roofing",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://tpdumpsters.com/roofing",
  },
};

/* ───────── JSON-LD SCHEMA ───────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Roofing Dumpster Rental",
  description:
    "Rent a roofing dumpster for roof tear-offs, shingle disposal, roof replacements, and roofing repairs. Available in 10, 20, and 30 yard sizes across the San Francisco Bay Area.  for heavier materials.",
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
      name: "10 Yard Roofing Dumpster",
      price: "599",
      priceCurrency: "USD",
      description: "10 yard roofing dumpster — 1 ton included, 7-day rental, 12ft L × 8ft W × 2.5ft H. ",
    },
    {
      "@type": "Offer",
      name: "20 Yard Roofing Dumpster",
      price: "649",
      priceCurrency: "USD",
      description: "20 yard roofing dumpster — 2 tons included, 7-day rental, 16ft L × 8ft W × 4ft H. ",
    },
    {
      "@type": "Offer",
      name: "30 Yard Roofing Dumpster",
      price: "749",
      priceCurrency: "USD",
      description: "30 yard roofing dumpster — 3 tons included, 7-day rental, 16ft L × 8ft W × 6ft H. ",
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
      name: "Why do roofing dumpsters cost more?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Roofing materials like asphalt shingles, tiles, and flashing are significantly heavier than general debris. They also cost more to process at landfills due to their density and composition",
      },
    },
    {
      "@type": "Question",
      name: "What size dumpster for a roof tear-off?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most residential roof tear-offs (up to 2,000 sq ft), a 20-yard dumpster is ideal. For larger homes or multi-layer tear-offs, a 30-yard dumpster gives you extra capacity. A 10-yard works for small repairs or single-slope projects.",
      },
    },
    {
      "@type": "Question",
      name: "How heavy are roofing shingles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A square of asphalt shingles (100 sq ft of coverage) weighs between 200-350 lbs depending on the type. A typical 2,000 sq ft roof produces 4,000-7,000 lbs of shingle waste, which is why weight limits matter for roofing dumpsters.",
      },
    },
    {
      "@type": "Question",
      name: "Can I put old gutters in a roofing dumpster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Gutters, downspouts, flashing, drip edge, and other metal roofing accessories are all accepted in roofing dumpsters. Cut longer sections to fit inside the dumpster walls.",
      },
    },
    {
      "@type": "Question",
      name: "How many squares of shingles fit in a 20-yard dumpster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 20-yard dumpster can typically hold 25-33 squares of shingles (2,500-3,300 sq ft of roofing). However, keep the weight limit in mind — 2 tons is included. If you have a heavy tear-off, you may hit the weight limit before filling the volume.",
      },
    },
    {
      "@type": "Question",
      name: "Can I mix roofing with other construction debris?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Roofing dumpsters are designated for roofing materials only. If you need to dispose of mixed construction debris alongside roofing waste, we recommend renting a separate general debris or construction debris dumpster for the non-roofing materials.",
      },
    },
    {
      "@type": "Question",
      name: "Do you place dumpsters close to the house for roofing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We work with roofing contractors to place dumpsters as close to the roofline as possible for easy toss-down. Just let us know your preferred placement when booking and ensure the area is accessible for our delivery truck.",
      },
    },
    {
      "@type": "Question",
      name: "What about asbestos roofing materials?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Asbestos-containing roofing materials (common in homes built before 1980) are strictly prohibited in our dumpsters. If you suspect asbestos, have the materials tested before your tear-off. Asbestos requires specialized removal by a licensed abatement contractor.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a roofing project take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most residential roof replacements take 1-3 days. Our 7-day rental period gives roofing contractors plenty of time. If your project runs longer, additional days are available at $49/day.",
      },
    },
    {
      "@type": "Question",
      name: "Do roofing contractors get special rates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We offer volume discounts and priority scheduling for roofing contractors with regular jobs. Call us at (510) 650-2083 to set up a contractor account and get preferred pricing on multiple rentals.",
      },
    },
  ],
};

/* ───────── Data Arrays ───────── */
const dumpsterSizes = [
  {
    name: "10 Yard",
    basePrice: "$599",
    roofingPrice: "$599",
    dimensionsClean: "12&apos;L × 8&apos;W × 2.5&apos;H",
    weight: "1 ton included",
    rental: "7-day rental",
    image: "/images/sizes/10-yard.png",
    bestFor: "Small roof repairs, single-slope tear-offs, shed roofing",
    popular: false,
  },
  {
    name: "20 Yard",
    basePrice: "$649",
    roofingPrice: "$649",
    dimensionsClean: "16&apos;L × 8&apos;W × 4&apos;H",
    weight: "2 tons included",
    rental: "7-day rental",
    image: "/images/sizes/20-yard.png",
    bestFor: "Full roof replacements, multi-layer tear-offs up to 2,000 sq ft",
    popular: true,
  },
  {
    name: "30 Yard",
    basePrice: "$749",
    roofingPrice: "$749",
    dimensionsClean: "16&apos;L × 8&apos;W × 6&apos;H",
    weight: "3 tons included",
    rental: "7-day rental",
    image: "/images/sizes/30-yard.png",
    bestFor: "Large roof replacements, commercial roofing, multi-layer tear-offs",
    popular: false,
  },
];

const commonProjects = [
  { name: "Full Roof Replacement", icon: <FaHouse /> },
  { name: "Partial Re-roof", icon: <FaLayerGroup /> },
  { name: "Storm Damage Repair", icon: <FaCloudBolt /> },
  { name: "Roof Leak Repair", icon: <FaScrewdriverWrench /> },
  { name: "Gutter Replacement", icon: <FaHammer /> },
  { name: "Flat Roof Tear-off", icon: <FaTrashCan /> },
  { name: "Skylight Installation", icon: <FaHelmetSafety /> },
  { name: "Commercial Roofing", icon: <FaClipboardList /> },
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
    question: "Why do roofing dumpsters cost more?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Roofing dumpsters are priced the same as general debris dumpsters. Whether you&apos;re tearing off an old roof or replacing shingles, our straightforward pricing covers delivery, pickup, disposal, and a 7-day rental period — all included with no hidden fees.
      </p>
    ),
  },
  {
    question: "What size dumpster for a roof tear-off?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          For most residential roof tear-offs (up to 2,000 sq ft), a <strong>20-yard dumpster</strong> is the ideal choice. It provides enough volume for shingles, underlayment, and flashing from a standard home. For larger homes or multi-layer tear-offs, step up to the 30-yard. A 10-yard works for small repairs, garage roofs, or single-slope projects.
        </p>
      </>
    ),
  },
  {
    question: "How heavy are roofing shingles?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        A square of asphalt shingles (100 sq ft of coverage) weighs between <strong>200-350 lbs</strong> depending on the type. Three-tab shingles are lighter, while architectural shingles are heavier. A typical 2,000 sq ft roof produces 4,000-7,000 lbs of shingle waste alone. This is why weight limits matter — you may hit the weight limit before filling the dumpster by volume.
      </p>
    ),
  },
  {
    question: "Can I put old gutters in a roofing dumpster?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! Gutters, downspouts, flashing, drip edge, and other metal roofing accessories are all accepted in roofing dumpsters. We recommend cutting longer gutter sections to fit inside the dumpster walls. Aluminum, copper, and galvanized steel are all fine.
      </p>
    ),
  },
  {
    question: "How many squares of shingles fit in a 20-yard dumpster?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        A 20-yard dumpster can typically hold <strong>25-33 squares of shingles</strong> (2,500-3,300 sq ft of roofing). However, keep the weight limit in mind — 2 tons is included. If you have a heavy tear-off with multiple layers, you may hit the weight limit before filling the volume. Call us for advice on your specific project.
      </p>
    ),
  },
];

const faqsRight = [
  {
    question: "Can I mix roofing with other construction debris?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Roofing dumpsters are designated for <strong>roofing materials only</strong>. This includes shingles, underlayment, flashing, nails, vents, and other roof-related items. If you also need to dispose of non-roofing construction debris (drywall, lumber, etc.), we recommend renting a separate general debris or construction debris dumpster.
      </p>
    ),
  },
  {
    question: "Do you place dumpsters close to the house for roofing?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We work with roofing contractors to place dumpsters <strong>as close to the roofline as possible</strong> for easy toss-down of materials. Just let us know your preferred placement when booking and ensure the area is accessible for our delivery truck. Driveway placement is most common for roofing projects.
      </p>
    ),
  },
  {
    question: "What about asbestos roofing materials?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Asbestos-containing roofing materials (common in homes built <strong>before 1980</strong>) are strictly prohibited in our dumpsters. If you suspect asbestos, have the materials tested before your tear-off. Asbestos requires specialized removal by a licensed abatement contractor — we cannot accept these materials under any circumstances.
      </p>
    ),
  },
  {
    question: "How long does a roofing project take?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Most residential roof replacements take <strong>1-3 days</strong>. Our 7-day rental period gives roofing contractors plenty of time to complete the job without rushing. If your project runs longer due to weather delays or complexity, additional days are available at $49/day with 24-hour notice.
      </p>
    ),
  },
  {
    question: "Do roofing contractors get special rates?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We offer <strong>volume discounts and priority scheduling</strong> for roofing contractors with regular jobs. Call us at <strong>(510) 650-2083</strong> to set up a contractor account and get preferred pricing on multiple rentals. Many Bay Area roofers rely on TP Dumpsters for consistent, reliable service.
      </p>
    ),
  },
];

/* ═══════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════ */
export default function RoofingPage() {
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
              Roofing Specialists — Same Great Pricing
            </span>
          </div>
          <h1 className="font-[var(--font-oswald)] text-[28px] sm:text-[3rem] lg:text-[4.5rem] font-extrabold text-white uppercase leading-[1.1] mb-4 tracking-wide">
            ROOFING DUMPSTER RENTAL
          </h1>
          <p className="font-[var(--font-poppins)] text-base sm:text-[1.4rem] lg:text-[1.6rem] font-medium text-white/90 italic mb-8 max-w-3xl mx-auto">
            Heavy-duty dumpsters for roof tear-offs, shingle disposal, and roofing debris across the Bay Area
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
            <Image src="/images/dumpsters/dumpsters-side-by-side.jpg" alt="Roofing Dumpster Rental - TP Dumpsters" width={600} height={400} className="rounded-xl shadow-2xl" />
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
            Roofing Dumpster Sizes &amp; Prices
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            All roofing dumpster prices include delivery, pickup, disposal, and a 7-day rental period. No hidden fees — what you see is what you pay.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
            {dumpsterSizes.map((size) => (
              <div
                key={size.name}
                className={`bg-white border-2 ${size.popular ? "border-tp-red" : "border-[#e0e0e0]"} rounded-xl overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] relative`}
              >
                {size.popular && (
                  <div className="bg-tp-red text-white text-center py-2 text-sm font-bold font-[var(--font-poppins)] uppercase tracking-wider">
                    Most Popular for Roofing
                  </div>
                )}
                <div className="px-6 pt-6 pb-2 text-center">
                  <h3 className="font-[var(--font-poppins)] text-[28px] font-bold text-[#333]">
                    {size.name}
                  </h3>
                  <p className="font-[var(--font-oswald)] text-[42px] font-bold text-tp-red mt-4">
                    {size.roofingPrice}
                  </p>
                </div>
                <div className="px-6 py-4 flex items-center justify-center min-h-[160px]">
                  <Image
                    src={size.image}
                    alt={`${size.name} Roofing Dumpster Rental - TP Dumpsters`}
                    width={300}
                    height={160}
                    className="max-h-[140px] object-contain"
                  />
                </div>
                <div className="px-6 py-4 flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-[#555]">
                      <FaCircleCheck className="text-green-600 flex-shrink-0" />
                      <span dangerouslySetInnerHTML={{ __html: `Dimensions: ${size.dimensionsClean}` }} />
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
                    <li className="flex items-center gap-2 text-sm text-[#555]">
                      <FaCircleCheck className="text-green-600 flex-shrink-0" />
                      Same price as general debris
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
              { src: "/images/gallery/demolition-03.jpg", alt: "Roofing tear-off dumpster" },
              { src: "/images/dumpsters/construction-site.jpg", alt: "Roofing debris disposal" },
              { src: "/images/dumpsters/worker-action.jpg", alt: "Roofing dumpster rental" },
              { src: "/images/gallery/jobsite-05.jpg", alt: "Roofing waste at landfill" },
            ]} />
          </div>
        </div>
      </section>

      {/* ────── WHAT IS A ROOFING DUMPSTER? ────── */}
      <section className="py-20 bg-white">
        <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
            UNDERSTANDING ROOFING DUMPSTERS
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-6">
            What Is a Roofing Dumpster?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                A <strong>roofing dumpster</strong> is the same roll-off container used for general or construction debris, but it&apos;s priced differently because roofing materials are significantly heavier and more expensive to process at landfills. Asphalt shingles, concrete tiles, metal flashing, and tar paper all add up quickly in weight — often exceeding what general debris loads weigh.
              </p>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                Our roofing dumpster pricing is straightforward — the same rates as general debris. What you see is what you pay, no surprises at pickup.
              </p>
            </div>
            <div>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                Whether you&apos;re a <strong>roofing contractor</strong> handling multiple jobs per week or a homeowner managing a DIY roof replacement, our roofing dumpsters give you a dedicated container for all roof-related waste. Shingles, felt paper, nails, flashing, vents, ridge caps — everything from your roof tear-off goes in one convenient dumpster.
              </p>
              <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
                We offer <strong>10, 20, and 30-yard roofing dumpsters</strong> with same-day delivery available throughout the Bay Area. Our drivers will position the dumpster close to your work area so your crew can toss materials directly from the roofline — saving time and labor on every job.
              </p>
              <Image src="/images/dumpsters/delivery-suburban.jpg" alt="Roofing dumpster delivery" width={500} height={300} className="rounded-xl mt-4 w-full object-cover" />
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
            What You Can Put in a Roofing Dumpster
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            Our roofing dumpsters accept all standard roofing materials from tear-offs, replacements, and repairs. Here&apos;s a comprehensive guide to what goes in a roofing debris dumpster.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Roofing Materials */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-tp-red/10 rounded-lg flex items-center justify-center text-tp-red text-xl">
                  <FaLayerGroup />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Roofing Materials
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Asphalt shingles",
                  "Wood shingles & shakes",
                  "Clay & concrete tiles",
                  "Metal roofing panels",
                  "Rolled roofing",
                  "Roof felt & tar paper",
                  "Roof cement & sealant (dried)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleCheck className="text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Underlayment & Structure */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-tp-red/10 rounded-lg flex items-center justify-center text-tp-red text-xl">
                  <FaHouse />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Underlayment &amp; Structure
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Ice & water shield",
                  "Synthetic underlayment",
                  "Plywood & OSB decking",
                  "Ridge caps & hip caps",
                  "Roof vents",
                  "Flashing (aluminum, copper, galvanized)",
                  "Drip edge",
                  "Fascia boards",
                  "Soffit panels",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleCheck className="text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Hardware & Accessories */}
            <div className="bg-white rounded-xl p-6 border border-[#e0e0e0] shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-tp-red/10 rounded-lg flex items-center justify-center text-tp-red text-xl">
                  <FaScrewdriverWrench />
                </div>
                <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333]">
                  Hardware &amp; Accessories
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Roofing nails, staples & screws",
                  "Gutters & downspouts",
                  "Skylights (no glass)",
                  "Chimney caps",
                  "Roof jacks",
                  "Pipe boots",
                  "Satellite dish mounts",
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
            What You Cannot Put in a Roofing Dumpster
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            For safety and environmental compliance, the following materials are strictly prohibited in roofing dumpsters. If you&apos;re unsure about a specific item, call us before loading.
          </p>

          <div className="max-w-2xl">
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h3 className="font-[var(--font-poppins)] text-[20px] font-bold text-[#333] mb-5 flex items-center gap-2">
                <FaCircleXmark className="text-red-600" /> Prohibited Items
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Asbestos shingles or tiles — common in pre-1980 homes, requires licensed abatement",
                  "Wet tar or hot mop materials — must be fully cooled and dried",
                  "Liquid adhesives — no wet or partially full containers",
                  "Spray foam insulation cans (pressurized) — empty, depressurized cans are OK",
                  "Propane tanks from torches — return to supplier or take to hazardous waste facility",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555] leading-relaxed">
                    <FaCircleXmark className="text-red-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-[#666] leading-[1.7] mt-5">
                Not sure if your roofing materials contain asbestos? If your home was built <strong>before 1980</strong>, we recommend having the roofing materials tested before beginning your tear-off. Call us at <strong>(510) 650-2083</strong> with any questions.
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
            Common Roofing Projects
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            Our roofing dumpsters are used by contractors and homeowners for a wide range of roof-related projects. Here are the most popular reasons customers rent a roofing dumpster:
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
            How Roofing Dumpster Rental Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                icon: <FaClipboardList />,
                title: "Choose Your Size",
                desc: "Select the 10, 20, or 30-yard dumpster based on your roof size. Not sure? Call us and we\u2019ll recommend the right fit.",
              },
              {
                step: "2",
                icon: <FaCalendarDays />,
                title: "Schedule Delivery",
                desc: "Book online or call (510) 650-2083. We\u2019ll place the dumpster close to the roofline for easy toss-down of materials.",
              },
              {
                step: "3",
                icon: <FaTrashCan />,
                title: "Load Roofing Debris",
                desc: "Tear off and toss directly into the dumpster. You have 7 days included. Keep materials below the fill line.",
              },
              {
                step: "4",
                icon: <FaTruck />,
                title: "We Pick It Up",
                desc: "Call or text when your roof job is done. We\u2019ll pick up within 24 hours and handle all disposal.",
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
                  className={`flex items-center justify-between px-6 py-4 ${i !== extraFees.length - 1 ? "border-b border-[#e0e0e0]" : ""} ${i === 0 ? "bg-green-50" : ""}`}
                >
                  <span className={`text-sm font-[var(--font-poppins)] ${i === 0 ? "text-green-700 font-semibold" : "text-[#555]"}`}>{fee.item}</span>
                  <span className={`text-sm font-bold font-[var(--font-poppins)] ${i === 0 ? "text-green-700" : "text-[#333]"}`}>{fee.fee}</span>
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
            Roofing Dumpster Delivery Areas
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.7] mb-10 max-w-3xl">
            We deliver roofing dumpsters throughout the San Francisco Bay Area. Our service covers 7 counties and over 60 cities, ensuring fast delivery for your roofing project no matter where it&apos;s located.
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
            Roofing Dumpster Questions
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
            Ready to Rent a Roofing Dumpster?
          </h2>
          <p className="font-[var(--font-poppins)] text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Book your roofing dumpster online in minutes, or call us for a free quote. Same-day delivery available across the Bay Area. Contractor rates available.
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
