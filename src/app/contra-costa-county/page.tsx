import type { Metadata } from "next";
import Link from "next/link";
import { FaCalendarDays, FaPhone, FaMapLocationDot } from "react-icons/fa6";
import Header from "@/components/Header";
import SizesSection from "@/components/SizesSection";
import CityFaqsSection from "@/components/CityFaqsSection";
import DynamicGallery from "@/components/DynamicGallery";
import ErrorBoundary from "@/components/ErrorBoundary";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import CountyMapWrapper from "./components/CountyMapWrapper";

// ── SEO Metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Dumpster Rental in Contra Costa County, CA | TP Dumpsters",
  description:
    "Affordable dumpster rental across all Contra Costa County cities. 10, 20 & 30 yard roll-off containers with same-day delivery. Serving Concord, Walnut Creek, Richmond, Antioch, Martinez & 20+ more cities. Call (510) 650-2083.",
  keywords: [
    "dumpster rental Contra Costa County",
    "roll-off dumpster Contra Costa",
    "Concord dumpster rental",
    "Walnut Creek dumpster rental",
    "Richmond dumpster rental",
    "Antioch dumpster rental",
    "Martinez dumpster rental",
    "Contra Costa County waste removal",
    "construction dumpster Bay Area",
    "cheap dumpster rental Contra Costa",
    "same day dumpster delivery Contra Costa",
    "TP Dumpsters",
  ],
  openGraph: {
    title: "Dumpster Rental in Contra Costa County, CA | TP Dumpsters",
    description:
      "Serving 26+ cities across Contra Costa County. Same-day delivery, transparent pricing, bilingual support. Book online or call (510) 650-2083.",
    url: "https://tpdumpsters.com/contra-costa-county",
    siteName: "TP Dumpsters",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/hero/red-dumpster-construction.png",
        width: 1200,
        height: 630,
        alt: "TP Dumpsters serving Contra Costa County",
      },
    ],
  },
  alternates: {
    canonical: "https://tpdumpsters.com/contra-costa-county",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

// ── City Data ───────────────────────────────────────────────────────────────
const CITIES = [
  { name: "Concord", slug: "concord", tagline: "Largest City" },
  { name: "Walnut Creek", slug: "walnut-creek", tagline: "Downtown Hub" },
  { name: "Richmond", slug: "richmond", tagline: "West County" },
  { name: "Antioch", slug: "antioch", tagline: "East County" },
  { name: "Pittsburg", slug: "pittsburg", tagline: "Delta Gateway" },
  { name: "Brentwood", slug: "brentwood", tagline: "Growing Community" },
  { name: "San Ramon", slug: "san-ramon", tagline: "Tri-Valley" },
  { name: "Danville", slug: "danville", tagline: "Historic Town" },
  { name: "Martinez", slug: "martinez", tagline: "County Seat" },
  { name: "Pleasant Hill", slug: "pleasant-hill", tagline: "Central County" },
  { name: "Pinole", slug: "pinole", tagline: "Home Base 🏠" },
  { name: "Hercules", slug: "hercules", tagline: "Waterfront City" },
  { name: "Lafayette", slug: "lafayette", tagline: "Lamorinda" },
  { name: "El Cerrito", slug: "el-cerrito", tagline: "West County" },
  { name: "Oakley", slug: "oakley", tagline: "East County" },
  { name: "Orinda", slug: "orinda", tagline: "Lamorinda" },
  { name: "Moraga", slug: "moraga", tagline: "Lamorinda" },
  { name: "San Pablo", slug: "san-pablo", tagline: "West County" },
  { name: "El Sobrante", slug: "el-sobrante", tagline: "West County" },
  { name: "Bay Point", slug: "bay-point", tagline: "Central County" },
  { name: "Clayton", slug: "clayton", tagline: "Mt. Diablo Foothills" },
  { name: "Rodeo", slug: "rodeo", tagline: "North County" },
  { name: "Crockett", slug: "crockett", tagline: "Carquinez Strait" },
  { name: "Discovery Bay", slug: "discovery-bay", tagline: "Delta Community" },
  { name: "Bethel Island", slug: "bethel-island", tagline: "Delta Community" },
  { name: "Castro Valley", slug: "castro-valley", tagline: "Alameda County" },
];

// ── FAQs (using CityFaqsSection format) ─────────────────────────────────────
const countyFaqs = [
  {
    question: "What cities in Contra Costa County do you serve?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We serve all <strong>26+ cities and communities</strong> across Contra Costa County including Concord, Walnut Creek, Richmond, Antioch, Martinez, Pittsburg, Brentwood, San Ramon, Danville, Pleasant Hill, Pinole, Hercules, Lafayette, El Cerrito, Oakley, and many more. If you&apos;re in Contra Costa County, we deliver.
      </p>
    ),
  },
  {
    question: "How much does a dumpster rental cost in Contra Costa County?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Pricing starts at <strong>$600</strong> for a 10-yard dumpster (7-day rental, 1 ton included), <strong>$650</strong> for a 20-yard (2 tons), and <strong>$750</strong> for a 30-yard (3 tons). No hidden fees, no surprise charges. Book online and get an additional <strong>5% discount</strong>.
      </p>
    ),
  },
  {
    question: "Do you offer same-day delivery in Contra Costa County?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We offer <strong>same-day delivery</strong> to most Contra Costa County cities when you call before noon. Our central location in Pinole allows us to reach cities from Richmond to Brentwood quickly and efficiently.
      </p>
    ),
  },
  {
    question: "What sizes of dumpsters are available?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">We offer three sizes:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>10-yard</strong> (12&apos;L × 8&apos;W × 2.5&apos;H) — ideal for small cleanouts, concrete, and soil</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>20-yard</strong> (16&apos;L × 8&apos;W × 4&apos;H) — perfect for remodels and medium projects</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>30-yard</strong> (16&apos;L × 8&apos;W × 6&apos;H) — large renovations and construction</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do I need a permit for a dumpster in Contra Costa County?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on your <strong>private property</strong> (driveway, yard), no permit is needed. For street placement, permit requirements vary by city — Concord, Walnut Creek, and Richmond each have their own rules. We&apos;ll guide you through the process for your specific city.
      </p>
    ),
  },
  {
    question: "How long can I keep the dumpster?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Standard rental is <strong>7 days</strong> for general debris (or 3 days for heavy materials like soil/concrete), included in the base price. Need more time? Extensions are available at <strong>$49/day</strong>. Just let us know and we&apos;ll keep the dumpster as long as your project needs.
      </p>
    ),
  },
  {
    question: "What can I put in the dumpster?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Most construction and household debris is accepted:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Wood, drywall, concrete, roofing materials</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Furniture, appliances, yard waste, general junk</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Clean soil, clean concrete, mixed materials</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          <strong>Not accepted:</strong> Hazardous materials, paint, tires, batteries, and electronics.
        </p>
      </>
    ),
  },
  {
    question: "Do you offer bilingual support?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        ¡Sí! We provide full <strong>bilingual support in English and Spanish</strong>. Our team communicates clearly in both languages so every customer feels comfortable throughout the rental process.
      </p>
    ),
  },
  {
    question: "Can I book a dumpster online?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! Book online at <a href="/booking" className="text-tp-red hover:underline font-semibold">tpdumpsters.com/booking</a> and receive an instant <strong>5% discount</strong>. You can also call us at <a href="tel:+15106502083" className="text-tp-red hover:underline font-semibold">(510) 650-2083</a> for personalized service.
      </p>
    ),
  },
  {
    question: "What areas outside Contra Costa County do you serve?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        In addition to all of Contra Costa County, we also serve <strong>Alameda County</strong> (Oakland, Berkeley, Fremont, Hayward), <strong>Solano County</strong> (Vallejo, Benicia), <strong>Marin County</strong> (San Rafael, Novato), <strong>San Francisco</strong>, and <strong>San Jose</strong>. We cover the entire Bay Area!
      </p>
    ),
  },
];

// ── JSON-LD ─────────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Contra Costa County",
  description:
    "Affordable dumpster rental across all Contra Costa County cities. Same-day delivery, transparent pricing, bilingual support.",
  url: "https://tpdumpsters.com/contra-costa-county",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pinole",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: CITIES.map((c) => ({ "@type": "City", name: c.name })),
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "07:00",
    closes: "18:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dumpster Rental Sizes",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "10 Yard Dumpster Rental", description: "Compact roll-off for tight spaces, soil, concrete, and small cleanups." },
        price: "600",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "20 Yard Dumpster Rental", description: "Mid-size roll-off for remodels, roofing, and medium cleanouts." },
        price: "650",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "30 Yard Dumpster Rental", description: "Large roll-off for full renovations, construction, and estate cleanouts." },
        price: "700",
        priceCurrency: "USD",
      },
    ],
  },
};

// ── Page Component ──────────────────────────────────────────────────────────
export default function ContraCostaCountyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      {/* ═══ HERO ═══ */}
      <section className="hero-bg relative min-h-screen flex flex-col justify-center items-center pt-[15vh] pb-[6vh] text-center">
        <div className="absolute inset-0 bg-black/50 z-[1]" />
        <div className="relative z-[2] px-5 pb-10">
          <div className="mb-6">
            <h3 className="inline-block bg-tp-gold-dark text-white px-6 py-2 text-[13px] md:text-base font-bold rounded-[3px] font-[var(--font-poppins)]">
              Serving 26+ Cities Across Contra Costa County
            </h3>
          </div>
          <h1 className="font-[var(--font-oswald)] text-[26px] sm:text-[3rem] lg:text-[4.5rem] font-extrabold text-white uppercase leading-[1.1] mb-4 tracking-wide">
            CONTRA COSTA COUNTY<br />DUMPSTER RENTAL
          </h1>
          <h2 className="font-[var(--font-poppins)] text-base sm:text-[1.5rem] lg:text-[1.8rem] font-semibold text-white italic mb-2">
            One Call Covers the Entire County
          </h2>
          <p className="font-[var(--font-poppins)] text-sm sm:text-lg text-white/90 mb-8 max-w-3xl mx-auto">
            Concord • Walnut Creek • Richmond • Antioch • Martinez • Pittsburg • San Ramon • Danville • Pinole & More
          </p>
          <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-4 flex-wrap">
            <a
              href="/booking"
              className="inline-flex items-center gap-2 w-full sm:w-auto justify-center px-7 py-3 rounded-lg text-lg font-semibold bg-tp-red text-white hover:bg-tp-red-dark transition-all duration-300 font-[var(--font-poppins)]"
            >
              <FaCalendarDays /> Book Online — 5% Off
            </a>
            <a
              href="tel:+15106502083"
              className="inline-flex items-center gap-2 w-full sm:w-auto justify-center px-7 py-3 rounded-lg text-lg font-semibold bg-transparent text-white border-2 border-tp-red hover:bg-tp-red hover:text-white transition-all duration-300 font-[var(--font-poppins)]"
            >
              <FaPhone /> (510) 650-2083
            </a>
          </div>
        </div>

        {/* Hero Feature Cards */}
        <div className="relative z-[2] flex flex-col lg:flex-row justify-center gap-5 lg:gap-10 w-[90%] lg:w-[80%] max-w-[1080px] mx-auto px-6 py-6 md:px-8 lg:px-10 lg:py-8 bg-white/15 backdrop-blur-[10px] rounded-[10px] mt-5 -mb-[30px]">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-[#fbeaea] rounded-full flex items-center justify-center">
              <FaMapLocationDot className="text-tp-red text-xl" />
            </div>
            <div>
              <h4 className="text-white font-[var(--font-poppins)] text-base font-bold mb-1">26+ Cities Served</h4>
              <p className="text-white/85 text-[13px] leading-relaxed">Full Contra Costa County coverage</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-[#fbeaea] rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="#E02B20"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <div>
              <h4 className="text-white font-[var(--font-poppins)] text-base font-bold mb-1">Same-Day Delivery</h4>
              <p className="text-white/85 text-[13px] leading-relaxed">Call before noon for today&apos;s drop-off</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-[#fbeaea] rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="#E02B20"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>
            <div>
              <h4 className="text-white font-[var(--font-poppins)] text-base font-bold mb-1">Bilingual Support</h4>
              <p className="text-white/85 text-[13px] leading-relaxed">English &amp; Spanish — Hablamos Español</p>
            </div>
          </div>
        </div>
      </section>

      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />

      {/* ═══ 1. DUMPSTER SIZES ═══ */}
      <SizesSection />

      {/* ═══ 2. CITIES WE SERVE (hidden on mobile) ═══ */}
      <section className="hidden md:block py-16 bg-[#f8f8f8]">
        <div className="w-[80%] max-w-[1080px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center">
            CONTRA COSTA COUNTY
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-3 text-center">
            Cities We Serve
          </h2>
          <p className="font-[var(--font-poppins)] text-[#666] text-center mb-10 max-w-2xl mx-auto">
            Select a city below to view local pricing, delivery info, and availability for your area.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="group block bg-white rounded-xl border border-gray-200 hover:border-tp-red hover:shadow-lg transition-all duration-300 p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-[var(--font-poppins)] text-[16px] font-bold text-[#1a1a1a] group-hover:text-tp-red transition-colors">
                      {city.name}
                    </h3>
                    <p className="text-[12px] text-[#999] font-[var(--font-poppins)] mt-0.5">{city.tagline}</p>
                  </div>
                  <span className="text-tp-red opacity-0 group-hover:opacity-100 transition-opacity text-lg font-bold">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. GALLERY ═══ */}
      <DynamicGallery />

      {/* ═══ 4. FAQs (using CityFaqsSection component) ═══ */}
      <ErrorBoundary>
        <CityFaqsSection cityName="Contra Costa County" faqs={countyFaqs} />
      </ErrorBoundary>

      {/* ═══ 5. INTERACTIVE MAP ═══ */}
      <section className="py-16 bg-[#0d1117]">
        <div className="w-[90%] max-w-[1100px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center">
            OUR SERVICE AREA
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-white text-center mb-3">
            Interactive Map — Contra Costa County
          </h2>
          <p className="font-[var(--font-poppins)] text-white/70 text-center mb-10 max-w-2xl mx-auto">
            Click any marker to learn more about dumpster rental in that city. We deliver to every corner of Contra Costa County.
          </p>
          <CountyMapWrapper />
        </div>
      </section>

      {/* ═══ 6. SEO CONTENT (styled) ═══ */}
      <section className="py-20 bg-white">
        <div className="w-[90%] max-w-[1000px] mx-auto">
          <div className="bg-[#f8f8f8] rounded-2xl p-8 md:p-12 border border-gray-100">
            <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center">
              ABOUT US
            </h4>
            <h2 className="font-[var(--font-poppins)] text-[24px] md:text-[30px] font-bold text-[#1a1a1a] mb-8 text-center">
              Your Trusted Dumpster Rental Partner in Contra Costa County
            </h2>
            <div className="space-y-5 text-[#555] text-[15px] leading-[1.85] font-[var(--font-poppins)]">
              <p>
                Contra Costa County is one of the most dynamic and diverse counties in the San Francisco Bay Area, stretching from the waterfront communities of Richmond and El Cerrito in the west to the rapidly growing cities of Brentwood and Discovery Bay in the east. With a population of over one million residents, the county sees constant residential construction, home renovation, and commercial development — all of which generate waste that needs efficient, reliable removal.
              </p>
              <p>
                TP Dumpsters is proud to serve every city and community in Contra Costa County with affordable roll-off dumpster rentals. Whether you&apos;re a homeowner in Walnut Creek remodeling a kitchen, a contractor managing a multi-unit development in Concord, or a property manager clearing out units in Antioch, we have the right size dumpster for your project. Our fleet includes 10-yard, 20-yard, and 30-yard containers — designed to handle everything from small garage cleanouts to large-scale construction debris.
              </p>
              <p>
                Based in Pinole, we&apos;re centrally located to reach communities across the county quickly. Our same-day delivery service ensures your project stays on schedule, and our transparent pricing means no surprise fees. From the historic county seat of Martinez to the Lamorinda communities of Lafayette, Orinda, and Moraga, from the Tri-Valley cities of San Ramon and Danville to the Delta communities of Oakley and Bethel Island — one call to TP Dumpsters covers it all.
              </p>
              <p>
                We understand that navigating dumpster permits can be confusing, especially when each city in Contra Costa County has its own regulations. That&apos;s why our bilingual team (English and Spanish) is ready to help guide you through the process, answer your questions, and ensure your rental experience is smooth from start to finish. Whether you&apos;re cleaning up after a storm, demolishing a deck, or tackling a full home renovation, TP Dumpsters delivers reliability, affordability, and outstanding customer service throughout Contra Costa County.
              </p>
            </div>
            <div className="mt-8 text-center">
              <p className="font-[var(--font-poppins)] text-[#333] font-semibold text-lg mb-4">
                Ready to get started?
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-lg font-semibold bg-tp-red text-white hover:bg-tp-red-dark transition-all duration-300 font-[var(--font-poppins)]"
                >
                  <FaCalendarDays /> Book Online — 5% Off
                </a>
                <a
                  href="tel:+15106502083"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-lg font-semibold bg-white text-tp-red border-2 border-tp-red hover:bg-tp-red hover:text-white transition-all duration-300 font-[var(--font-poppins)]"
                >
                  <FaPhone /> (510) 650-2083
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </>
  );
}
