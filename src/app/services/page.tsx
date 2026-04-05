import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Image from "next/image";
import Link from "next/link";
import {
  FaTrashCan,
  FaHouse,
  FaHammer,
  FaTree,
  FaMound,
  FaCubes,
  FaShuffle,
  FaHelmetSafety,
  FaTruck,
  FaPhone,
  FaCalendarDays,
  FaArrowRight,
  FaCircleCheck,
  FaDollarSign,
  FaClock,
  FaShieldHalved,
} from "react-icons/fa6";

/* ───────── SEO METADATA ───────── */
export const metadata: Metadata = {
  title:
    "Dumpster Rental Services | All Sizes & Materials - TP Dumpsters",
  description:
    "Explore all TP Dumpsters services: general debris, household cleanout, construction, roofing, green waste, clean soil, clean concrete & mixed materials. 10, 20 & 30 yard dumpsters across the Bay Area.",
  keywords:
    "dumpster rental services, roll off dumpster types, dumpster sizes, construction dumpster, roofing dumpster, green waste dumpster, soil dumpster, concrete dumpster, bay area dumpster rental, dumpster rental near me",
  openGraph: {
    title: "Dumpster Rental Services | All Sizes & Materials - TP Dumpsters",
    description:
      "Explore all TP Dumpsters services: general debris, household cleanout, construction, roofing, green waste, clean soil, clean concrete & mixed materials.",
    url: "https://tpdumpsters.com/services",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://tpdumpsters.com/images/dumpsters/dumpsters-side-by-side.jpg",
        width: 1200,
        height: 630,
        alt: "TP Dumpsters - All dumpster sizes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental Services - TP Dumpsters",
    description:
      "General debris, construction, roofing, green waste & more. 10-30 yard dumpsters across the Bay Area.",
  },
  alternates: {
    canonical: "https://tpdumpsters.com/services",
  },
};

/* ───────── JSON-LD SCHEMA ───────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Dumpster Rental Services",
  description:
    "Full-service roll-off dumpster rentals for residential and commercial projects across the San Francisco Bay Area. Available in 10, 20, and 30 yard sizes for all material types.",
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
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dumpster Rental Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "General Debris Dumpster Rental" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Household Cleanout Dumpster Rental" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Construction Debris Dumpster Rental" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Roofing Dumpster Rental" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Green Waste Dumpster Rental" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Clean Soil Dumpster Rental" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Clean Concrete Dumpster Rental" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mixed Materials Dumpster Rental" } },
    ],
  },
};

/* ───────── SERVICE DATA ───────── */
const services = [
  {
    slug: "general-debris",
    title: "General Debris",
    subtitle: "Most Popular",
    icon: FaTrashCan,
    image: "/images/dumpsters/delivery-residential.jpg",
    description:
      "The most versatile dumpster for home cleanouts, renovations, junk removal, and mixed waste projects.",
    sizes: ["10 yd", "20 yd", "30 yd"],
    startPrice: "$599",
    rental: "7 days",
    featured: true,
    items: ["Furniture & appliances", "Renovation debris", "Yard waste & junk", "Mixed household items"],
  },
  {
    slug: "household-cleanout",
    title: "Household Cleanout",
    subtitle: "Home Projects",
    icon: FaHouse,
    image: "/images/dumpsters/yard-waste-driveway.jpg",
    description:
      "Perfect for garage cleanouts, estate cleanups, moving projects, and decluttering your entire home.",
    sizes: ["10 yd", "20 yd", "30 yd"],
    startPrice: "$599",
    rental: "7 days",
    featured: false,
    items: ["Old furniture & mattresses", "Garage & attic junk", "Estate cleanout items", "Moving leftovers"],
  },
  {
    slug: "construction-debris",
    title: "Construction Debris",
    subtitle: "Contractors' Choice",
    icon: FaHammer,
    image: "/images/dumpsters/construction-site.jpg",
    description:
      "Heavy-duty dumpsters for remodels, demolitions, and construction job sites across the Bay Area.",
    sizes: ["10 yd", "20 yd", "30 yd"],
    startPrice: "$599",
    rental: "7 days",
    featured: false,
    items: ["Drywall & lumber", "Flooring & tile", "Cabinets & fixtures", "Demo debris"],
  },
  {
    slug: "roofing",
    title: "Roofing",
    subtitle: "Roof Tear-Offs",
    icon: FaHelmetSafety,
    image: "/images/dumpsters/commercial-tarped.jpg",
    description:
      "Specialized dumpsters for roof tear-offs, shingle disposal, and heavy roofing materials.",
    sizes: ["10 yd", "20 yd", "30 yd"],
    startPrice: "$599",
    rental: "7 days",
    featured: false,
    items: ["Asphalt shingles", "Roofing felt & tar paper", "Metal flashing", "Tile & wood shakes"],
  },
  {
    slug: "green-waste",
    title: "Green Waste",
    subtitle: "Yard & Landscaping",
    icon: FaTree,
    image: "/images/dumpsters/delivery-suburban.jpg",
    description:
      "Eco-friendly disposal for landscaping projects, tree trimming, brush clearing, and yard cleanups.",
    sizes: ["10 yd", "20 yd", "30 yd"],
    startPrice: "$599",
    rental: "7 days",
    featured: false,
    items: ["Tree branches & limbs", "Grass & brush", "Leaves & shrubs", "Landscaping debris"],
  },
  {
    slug: "clean-soil",
    title: "Clean Soil",
    subtitle: "Excavation & Grading",
    icon: FaMound,
    image: "/images/dumpsters/dumpster-dirt-sunny.jpg",
    description:
      "For excavation, grading, and dirt removal. Must be 95% pure — no rocks, grass, gravel, mesh, or garbage.",
    sizes: ["10 yd only"],
    startPrice: "$599",
    rental: "3 days",
    featured: false,
    items: ["Clean dirt & soil", "Excavation material", "Grading projects", "No weight limit"],
    heavy: true,
  },
  {
    slug: "clean-concrete",
    title: "Clean Concrete",
    subtitle: "Demo & Flatwork",
    icon: FaCubes,
    image: "/images/dumpsters/dumpsters-side-by-side.jpg",
    description:
      "For concrete demolition and flatwork removal. Must be 95% pure — no rebar or mixed garbage.",
    sizes: ["10 yd only"],
    startPrice: "$599",
    rental: "3 days",
    featured: false,
    items: ["Sidewalk & patio concrete", "Foundation pieces", "Flatwork removal", "No weight limit"],
    heavy: true,
  },
  {
    slug: "mixed-materials",
    title: "Mixed Materials",
    subtitle: "Soil + Concrete Mix",
    icon: FaShuffle,
    image: "/images/dumpsters/tp-truck-yard.jpg",
    description:
      "For projects with a mix of soil and concrete. Must be 95% pure — no wood, garbage, or other debris.",
    sizes: ["10 yd only"],
    startPrice: "$750",
    rental: "3 days",
    featured: false,
    items: ["Soil & concrete mix", "Demo + excavation combos", "Mixed heavy materials", "No weight limit"],
    heavy: true,
  },
];

const whyUs = [
  {
    icon: FaDollarSign,
    title: "Transparent Pricing",
    desc: "No hidden fees. Delivery, pickup, and disposal included in every price.",
  },
  {
    icon: FaTruck,
    title: "Same-Day Delivery",
    desc: "Call before noon and get your dumpster delivered the same day.",
  },
  {
    icon: FaClock,
    title: "Flexible Rentals",
    desc: "7-day rentals for general waste, 3-day for heavy materials. Extensions available.",
  },
  {
    icon: FaShieldHalved,
    title: "Bilingual Support",
    desc: "Our team speaks English and Spanish — no miscommunication, ever.",
  },
];

/* ───────── PAGE ───────── */
export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="bg-white">
        {/* ───── HERO ───── */}
        <section className="relative bg-black text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/dumpsters/worker-action.jpg"
              alt="Dumpster rental services"
              fill
              className="object-cover opacity-40"
              priority
            />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28 text-center">
            <p className="text-tp-red font-semibold tracking-widest uppercase text-sm mb-4">
              Our Services
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Dumpster Rental Services
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              From home cleanouts to heavy construction — we have the right
              dumpster for every project. Serving 60+ cities across 6 Bay Area
              counties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-tp-red hover:bg-tp-red-dark text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors"
              >
                <FaCalendarDays /> Book Online
              </Link>
              <a
                href="tel:+15106502083"
                className="inline-flex items-center gap-2 border-2 border-white hover:bg-white hover:text-black text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors"
              >
                <FaPhone /> (510) 650-2083
              </a>
            </div>
          </div>
        </section>

        {/* ───── QUICK STATS BAR ───── */}
        <section className="bg-tp-red text-white">
          <div className="max-w-6xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-black">8</p>
              <p className="text-sm font-medium opacity-90">Service Categories</p>
            </div>
            <div>
              <p className="text-2xl font-black">3 Sizes</p>
              <p className="text-sm font-medium opacity-90">10, 20 & 30 Yard</p>
            </div>
            <div>
              <p className="text-2xl font-black">60+</p>
              <p className="text-sm font-medium opacity-90">Cities Served</p>
            </div>
            <div>
              <p className="text-2xl font-black">Same Day</p>
              <p className="text-sm font-medium opacity-90">Delivery Available</p>
            </div>
          </div>
        </section>

        {/* ───── SERVICES GRID ───── */}
        <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-14">
            <p className="text-tp-red font-semibold tracking-widest uppercase text-sm mb-3">
              What We Offer
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Choose Your Dumpster Type
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each service category is designed for specific materials and project
              types. Not sure which one you need?{" "}
              <a href="tel:+15106502083" className="text-tp-red font-semibold hover:underline">
                Call us
              </a>{" "}
              — we&apos;ll help you pick the right one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((svc) => (
              <Link
                key={svc.slug}
                href={`/${svc.slug}`}
                className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                  svc.featured
                    ? "ring-2 ring-tp-red md:col-span-2 lg:col-span-1"
                    : ""
                }`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={svc.image}
                    alt={`${svc.title} dumpster rental`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  {svc.featured && (
                    <span className="absolute top-3 right-3 bg-tp-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                      Most Popular
                    </span>
                  )}
                  {svc.heavy && (
                    <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                      Heavy Material
                    </span>
                  )}
                  <div className="absolute bottom-3 left-4">
                    <p className="text-white/80 text-xs font-medium uppercase tracking-wider">
                      {svc.subtitle}
                    </p>
                    <h3 className="text-white text-xl font-black">{svc.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white p-5">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {svc.description}
                  </p>

                  {/* Items */}
                  <ul className="space-y-1.5 mb-5">
                    {svc.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <FaCircleCheck className="text-green-500 flex-shrink-0 text-xs" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">
                        Starting at
                      </p>
                      <p className="text-2xl font-black text-gray-900">
                        {svc.startPrice}
                      </p>
                      <p className="text-xs text-gray-500">
                        {svc.sizes.join(" · ")} · {svc.rental}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-tp-red font-bold text-sm group-hover:gap-2 transition-all">
                      Details <FaArrowRight className="text-xs" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ───── SIZE COMPARISON ───── */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-tp-red font-semibold tracking-widest uppercase text-sm mb-3">
                Size Guide
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Which Size Do You Need?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Not sure what size to get? Here&apos;s a quick comparison to help
                you choose.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* 10 yard */}
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <span className="text-3xl font-black text-tp-red">10</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  10-Yard Dumpster
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  12&apos;L × 8&apos;W × 2.5&apos;H
                </p>
                <p className="text-3xl font-black text-gray-900 mb-1">$599</p>
                <p className="text-sm text-gray-500 mb-6">1 ton included · 7 days</p>
                <ul className="text-left space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <FaCircleCheck className="text-green-500 flex-shrink-0" />
                    Small garage cleanout
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCircleCheck className="text-green-500 flex-shrink-0" />
                    Bathroom remodel
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCircleCheck className="text-green-500 flex-shrink-0" />
                    Deck removal
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCircleCheck className="text-green-500 flex-shrink-0" />
                    ~3 pickup truck loads
                  </li>
                </ul>
                <Link
                  href="/booking"
                  className="mt-6 block bg-tp-red hover:bg-tp-red-dark text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Book 10-Yard
                </Link>
              </div>

              {/* 20 yard */}
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center ring-2 ring-tp-red relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-tp-red text-white text-xs font-bold px-4 py-1 rounded-full uppercase">
                  Most Popular
                </span>
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <span className="text-3xl font-black text-tp-red">20</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  20-Yard Dumpster
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  16&apos;L × 8&apos;W × 4&apos;H
                </p>
                <p className="text-3xl font-black text-gray-900 mb-1">$649</p>
                <p className="text-sm text-gray-500 mb-6">2 tons included · 7 days</p>
                <ul className="text-left space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <FaCircleCheck className="text-green-500 flex-shrink-0" />
                    Kitchen or room remodel
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCircleCheck className="text-green-500 flex-shrink-0" />
                    Whole-house cleanout
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCircleCheck className="text-green-500 flex-shrink-0" />
                    Roof tear-off (single layer)
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCircleCheck className="text-green-500 flex-shrink-0" />
                    ~6 pickup truck loads
                  </li>
                </ul>
                <Link
                  href="/booking"
                  className="mt-6 block bg-tp-red hover:bg-tp-red-dark text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Book 20-Yard
                </Link>
              </div>

              {/* 30 yard */}
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <span className="text-3xl font-black text-tp-red">30</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  30-Yard Dumpster
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  16&apos;L × 8&apos;W × 6&apos;H
                </p>
                <p className="text-3xl font-black text-gray-900 mb-1">$749</p>
                <p className="text-sm text-gray-500 mb-6">3 tons included · 7 days</p>
                <ul className="text-left space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <FaCircleCheck className="text-green-500 flex-shrink-0" />
                    Major renovation or demo
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCircleCheck className="text-green-500 flex-shrink-0" />
                    Large construction project
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCircleCheck className="text-green-500 flex-shrink-0" />
                    Commercial cleanout
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCircleCheck className="text-green-500 flex-shrink-0" />
                    ~9 pickup truck loads
                  </li>
                </ul>
                <Link
                  href="/booking"
                  className="mt-6 block bg-tp-red hover:bg-tp-red-dark text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Book 30-Yard
                </Link>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 mt-8">
              <strong>Heavy materials</strong> (clean soil, clean concrete, mixed
              materials) are available in <strong>10-yard only</strong> with a
              3-day rental and <strong>no weight limit</strong>.
            </p>
          </div>
        </section>

        {/* ───── WHY CHOOSE US ───── */}
        <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-14">
            <p className="text-tp-red font-semibold tracking-widest uppercase text-sm mb-3">
              Why TP Dumpsters
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              The Bay Area&apos;s Trusted Choice
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-tp-red text-2xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ───── ADDITIONAL FEES INFO ───── */}
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-black text-center mb-10">
              Good to Know
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="font-bold text-tp-red mb-3">
                  📅 Extra Days
                </h3>
                <p className="text-gray-300 text-sm">
                  Need more time? No problem. Extra days are just{" "}
                  <strong className="text-white">$49/day</strong> for any
                  dumpster size.
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="font-bold text-tp-red mb-3">
                  ⚖️ Overweight Fees
                </h3>
                <p className="text-gray-300 text-sm">
                  Exceeded your weight limit?{" "}
                  <strong className="text-white">$125/ton</strong> prorated.
                  Heavy material dumpsters have no weight limit.
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="font-bold text-tp-red mb-3">
                  🛏️ Special Items
                </h3>
                <p className="text-gray-300 text-sm">
                  Mattresses, appliances, and tires accepted for an extra{" "}
                  <strong className="text-white">$20–$60 each</strong> depending
                  on the item.
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="font-bold text-tp-red mb-3">
                  ❌ Cancellation
                </h3>
                <p className="text-gray-300 text-sm">
                  Cancel with 24+ hours notice for a{" "}
                  <strong className="text-white">$150 fee</strong>. Less than 24
                  hours = no refund.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ───── CTA ───── */}
        <section className="bg-tp-red text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Book online in under 2 minutes or call us for a free quote. We
              deliver same-day across the entire Bay Area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-white text-tp-red hover:bg-gray-100 font-bold px-8 py-4 rounded-lg text-lg transition-colors"
              >
                <FaCalendarDays /> Book Online Now
              </Link>
              <a
                href="tel:+15106502083"
                className="inline-flex items-center gap-2 border-2 border-white hover:bg-white hover:text-tp-red font-bold px-8 py-4 rounded-lg text-lg transition-colors"
              >
                <FaPhone /> (510) 650-2083
              </a>
            </div>
          </div>
        </section>

        {/* ───── SEO CONTENT ───── */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Dumpster Rental Services Across the San Francisco Bay Area
          </h2>
          <div className="prose prose-gray max-w-none text-sm leading-relaxed text-gray-600 space-y-4">
            <p>
              TP Dumpsters provides comprehensive roll-off dumpster rental
              services across the San Francisco Bay Area, covering Contra Costa
              County, Alameda County, Solano County, Marin County, San Mateo
              County, Santa Clara County, and San Francisco. With over 60 city
              pages and dedicated service for each community, we make it easy to
              find the right dumpster for any project.
            </p>
            <p>
              Our eight service categories cover every type of waste: general
              debris for mixed household projects, household cleanout for
              decluttering and moving, construction debris for remodels and
              demolitions, roofing for tear-offs and shingle disposal, green
              waste for landscaping and yard work, and three heavy-material
              options — clean soil, clean concrete, and mixed materials — for
              excavation and demolition projects that require specialized
              disposal.
            </p>
            <p>
              Every dumpster rental includes delivery, pickup, and disposal with
              no hidden fees. We offer same-day delivery when you call before
              noon, flexible rental periods (7 days for general waste, 3 days
              for heavy materials), and bilingual support in English and Spanish.
              Whether you&apos;re a homeowner tackling a weekend cleanout or a
              contractor managing multiple job sites, TP Dumpsters has the right
              solution at the right price.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
