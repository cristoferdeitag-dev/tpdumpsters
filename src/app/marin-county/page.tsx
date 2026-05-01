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
  title: "Dumpster Rental in Marin County, CA | TP Dumpsters",
  description:
    "Affordable dumpster rental across all Marin County cities. 10, 20 & 30 yard roll-off containers with same-day delivery. Serving San Rafael, Novato, Mill Valley, Sausalito, Tiburon, Corte Madera, Larkspur, San Anselmo, Fairfax & more. Call (510) 650-2083.",
  keywords: [
    "dumpster rental Marin County",
    "roll-off dumpster Marin County",
    "San Rafael dumpster rental",
    "Novato dumpster rental",
    "Mill Valley dumpster rental",
    "Sausalito dumpster rental",
    "Tiburon dumpster rental",
    "Corte Madera dumpster rental",
    "Larkspur dumpster rental",
    "San Anselmo dumpster rental",
    "Fairfax dumpster rental",
    "Marin County waste removal",
    "construction dumpster Marin",
    "same day dumpster delivery Marin County",
    "TP Dumpsters",
  ],
  openGraph: {
    title: "Dumpster Rental in Marin County, CA | TP Dumpsters",
    description:
      "Serving 9+ cities across Marin County. Same-day delivery, transparent pricing, bilingual support. Book online or call (510) 650-2083.",
    url: "https://tpdumpsters.com/marin-county",
    siteName: "TP Dumpsters",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/hero/red-dumpster-construction.png",
        width: 1200,
        height: 630,
        alt: "TP Dumpsters serving Marin County",
      },
    ],
  },
  alternates: {
    canonical: "https://tpdumpsters.com/marin-county",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

// ── City Data ───────────────────────────────────────────────────────────────
const CITIES = [
  { name: "San Rafael", slug: "san-rafael", tagline: "County Seat" },
  { name: "Novato", slug: "novato", tagline: "Largest by Area" },
  { name: "Mill Valley", slug: "mill-valley", tagline: "Mt. Tam Gateway" },
  { name: "Sausalito", slug: "sausalito", tagline: "Waterfront City" },
  { name: "Tiburon", slug: "tiburon", tagline: "Peninsula Town" },
  { name: "Corte Madera", slug: "corte-madera", tagline: "Central Marin" },
  { name: "Larkspur", slug: "larkspur", tagline: "Ferry Landing" },
  { name: "San Anselmo", slug: "san-anselmo", tagline: "Ross Valley" },
  { name: "Fairfax", slug: "fairfax", tagline: "West Marin" },
];

// ── FAQs (using CityFaqsSection format) ─────────────────────────────────────
const countyFaqs = [
  {
    question: "What cities in Marin County do you serve?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        We serve all <strong>9+ cities and communities</strong> across Marin County including San Rafael, Novato, Mill Valley, Sausalito, Tiburon, Corte Madera, Larkspur, San Anselmo, and Fairfax. If you&apos;re in Marin County, we deliver.
      </p>
    ),
  },
  {
    question: "How much does a dumpster rental cost in Marin County?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Pricing starts at <strong>$649</strong> for a 10-yard dumpster (7-day rental, 1 ton included), <strong>$699</strong> for a 20-yard (2 tons), and <strong>$849</strong> for a 30-yard (3 tons). No hidden fees, no surprise charges. Book online and get an additional <strong>$50 discount</strong>.
      </p>
    ),
  },
  {
    question: "Do you offer same-day delivery in Marin County?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We offer <strong>same-day delivery</strong> to most Marin County cities when you call before noon. From San Rafael to Sausalito, from Novato to Fairfax, we can get a dumpster to your site quickly and efficiently.
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
    question: "Do I need a permit for a dumpster in Marin County?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on your <strong>private property</strong> (driveway, yard), no permit is needed. For street placement, permit requirements vary by city — San Rafael, Mill Valley, and Sausalito each have their own rules. We&apos;ll guide you through the process for your specific city.
      </p>
    ),
  },
  {
    question: "Can you deliver to hillside properties in Marin County?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely! Many Marin County communities have steep, winding roads and hillside properties. Our drivers are experienced with narrow access in areas like Mill Valley, Tiburon, Fairfax, and San Anselmo. Just provide your address and we&apos;ll confirm the best delivery approach.
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
    question: "What areas outside Marin County do you serve?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        In addition to all of Marin County, we also serve <strong>Contra Costa County</strong> (Concord, Walnut Creek, Richmond), <strong>Alameda County</strong> (Oakland, Berkeley, Fremont, Hayward), <strong>Solano County</strong> (Vallejo, Benicia), <strong>San Francisco</strong>, and <strong>San Jose</strong>. We cover the entire Bay Area!
      </p>
    ),
  },
];

// ── JSON-LD ─────────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Marin County",
  description:
    "Affordable dumpster rental across all Marin County cities. Same-day delivery, transparent pricing, bilingual support.",
  url: "https://tpdumpsters.com/marin-county",
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
export default function MarinCountyPage() {
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
              Serving 9+ Cities Across Marin County
            </h3>
          </div>
          <h1 className="font-[var(--font-oswald)] text-[26px] sm:text-[3rem] lg:text-[4.5rem] font-extrabold text-white uppercase leading-[1.1] mb-4 tracking-wide">
            MARIN COUNTY<br />DUMPSTER RENTAL
          </h1>
          <h2 className="font-[var(--font-poppins)] text-base sm:text-[1.5rem] lg:text-[1.8rem] font-semibold text-white italic mb-2">
            One Call Covers the Entire County
          </h2>
          <p className="font-[var(--font-poppins)] text-sm sm:text-lg text-white/90 mb-8 max-w-3xl mx-auto">
            San Rafael • Novato • Mill Valley • Sausalito • Tiburon • Corte Madera • Larkspur • San Anselmo • Fairfax
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
              <h4 className="text-white font-[var(--font-poppins)] text-base font-bold mb-1">9+ Cities Served</h4>
              <p className="text-white/85 text-[13px] leading-relaxed">Full Marin County coverage</p>
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
            MARIN COUNTY
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
        <CityFaqsSection cityName="Marin County" faqs={countyFaqs} />
      </ErrorBoundary>

      {/* ═══ 5. INTERACTIVE MAP ═══ */}
      <section className="py-16 bg-[#0d1117]">
        <div className="w-[90%] max-w-[1100px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center">
            OUR SERVICE AREA
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-white text-center mb-3">
            Interactive Map — Marin County
          </h2>
          <p className="font-[var(--font-poppins)] text-white/70 text-center mb-10 max-w-2xl mx-auto">
            Click any marker to learn more about dumpster rental in that city. We deliver to every corner of Marin County.
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
              Your Trusted Dumpster Rental Partner in Marin County
            </h2>
            <div className="space-y-5 text-[#555] text-[15px] leading-[1.85] font-[var(--font-poppins)]">
              <p>
                Marin County is one of the most beautiful and affluent counties in the San Francisco Bay Area, stretching from the Golden Gate Bridge north to the rolling hills of Novato. Known for its stunning natural landscapes, charming small towns, and well-maintained homes, the county sees constant residential renovation, home improvement, and construction projects — all of which generate waste that needs efficient, reliable removal.
              </p>
              <p>
                TP Dumpsters is proud to serve every city and community in Marin County with affordable roll-off dumpster rentals. Whether you&apos;re a homeowner in Mill Valley remodeling a kitchen, a contractor managing a hillside renovation in Tiburon, or a property manager clearing out units in San Rafael, we have the right size dumpster for your project. Our fleet includes 10-yard, 20-yard, and 30-yard containers — designed to handle everything from small garage cleanouts to large-scale construction debris.
              </p>
              <p>
                We understand that Marin County&apos;s terrain presents unique challenges — narrow hillside roads in Fairfax, steep driveways in Sausalito, and tight access in historic downtown areas like Larkspur. Our experienced drivers navigate these conditions every day, ensuring your dumpster is placed safely and conveniently. From the county seat of San Rafael to the Ross Valley communities of San Anselmo and Fairfax, from the waterfront towns of Sausalito and Tiburon to the suburban neighborhoods of Corte Madera and Larkspur — one call to TP Dumpsters covers it all.
              </p>
              <p>
                Our bilingual team (English and Spanish) is ready to help guide you through the permit process, answer your questions, and ensure your rental experience is smooth from start to finish. Whether you&apos;re cleaning up after a storm, demolishing a deck, or tackling a full home renovation, TP Dumpsters delivers reliability, affordability, and outstanding customer service throughout Marin County.
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
