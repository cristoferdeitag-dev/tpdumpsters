import type { Metadata } from "next";
import Header from "@/components/Header";
import SizesSection from "@/components/SizesSection";
import DumpsterPhotosGrid from "@/components/DumpsterPhotosGrid";
import FaqsSection from "@/components/FaqsSection";
import CityFaqsSection from "@/components/CityFaqsSection";
import AboutCitySection from "@/components/AboutCitySection";
import ErrorBoundary from "@/components/ErrorBoundary";
import DynamicReviews from "@/components/DynamicReviews";
import WhyUsSection from "@/components/WhyUsSection";
import DynamicGallery from "@/components/DynamicGallery";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import ClaytonHero from "./components/ClaytonHero";
import DynamicServiceAreaMap from '@/components/DynamicServiceAreaMap';
import ClaytonLocation from "./components/ClaytonLocation";

const claytonFaqs = [
  {
    question: "How do I handle debris removal for projects near Mt. Diablo?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For projects in the Mt. Diablo foothills, our drivers are experienced with winding roads and
        hillside driveways. We&apos;ll work with you to find the best placement for your dumpster,
        even on sloped properties. A <strong>10 or 20-yard dumpster</strong> is ideal for brush clearing
        and debris removal in the area.
      </p>
    ),
  },
  {
    question: "What is the permit process for dumpster placement in Clayton?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Clayton is a small city with straightforward permitting. If the dumpster is placed on your
        private driveway, no permit is needed. For street placement, contact the City of Clayton for a
        temporary encroachment permit. We can help guide you through the process.
      </p>
    ),
  },
  {
    question: "Can you deliver to hillside properties in Clayton?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We regularly deliver to hillside properties in Clayton Valley and the Mt. Diablo foothills.
        Our drivers know the terrain and can navigate steep driveways and narrow roads. Just provide
        your address and we&apos;ll confirm access before delivery.
      </p>
    ),
  },
  {
    question: "What size dumpster works best for home renovation projects in Clayton?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        For typical kitchen or bathroom remodels in Clayton homes, a <strong>20-yard dumpster</strong> is
        the most popular choice. For larger whole-home renovations or additions, the 30-yard is
        recommended. Smaller cleanouts and concrete work are perfect for the 10-yard.
      </p>
    ),
  },
  {
    question: "Do you offer dumpster rentals for wildfire prep cleanup in Clayton?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Absolutely. Many Clayton residents near the Mt. Diablo foothills use our dumpsters for
        defensible space clearing and wildfire preparation. We can deliver quickly during fire season
        to help you clear brush, dead trees, and yard debris efficiently.
      </p>
    ),
  },
  {
    question: "Do you serve the Clayton ZIP code 94517?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        Yes! We serve Clayton ZIP code 94517 and all surrounding areas including Clayton Valley,
        Oakhurst Country Club, Stranahan, and Diablo Creek. No matter where you are in Clayton,
        we can deliver.
      </p>
    ),
  },
];

const claytonAbout = {
  cityName: "Clayton",
  intro:
    "Clayton is a charming small city nestled at the base of Mt. Diablo in Contra Costa County. Known for its historic downtown, scenic trails, and tight-knit community, Clayton is home to many homeowners who take pride in maintaining their properties. Whether you&apos;re renovating a classic home near downtown, clearing brush for wildfire safety, or tackling a landscaping project in the foothills, TP Dumpsters provides reliable, hassle-free dumpster rental service throughout Clayton.",
  highlights: [
    "Experienced with hillside and foothill property deliveries",
    "Familiar with Clayton's small-town permit requirements",
    "Fast delivery to all Clayton neighborhoods and Mt. Diablo area",
    "Trusted by Clayton homeowners and contractors",
    "Bilingual team (English & Spanish) for clear communication",
  ],
  commonProjects: [
    "Home renovations in Downtown Clayton and Clayton Valley",
    "Wildfire prep and defensible space clearing near Mt. Diablo",
    "Landscaping and yard debris removal in Oakhurst Country Club",
    "Kitchen and bathroom remodels in Stranahan and Diablo Creek",
    "Garage and estate cleanouts throughout Clayton",
    "Construction and demolition projects in the foothills",
  ],
  closingText:
    "Whether you're a homeowner preparing for wildfire season or a contractor running a renovation in Clayton Valley, TP Dumpsters makes waste removal easy. We offer transparent pricing, same-day delivery, and the local expertise to get your dumpster exactly where you need it. Call us at (510) 650-2083 for a free quote.",
};

export const metadata: Metadata = {
  title: "Dumpster Rental in Clayton, CA | Mt. Diablo Area - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in Clayton, CA. Serving Downtown Clayton, Clayton Valley, Mt. Diablo foothills & ZIP code 94517. Same-day delivery. Bilingual support (EN/ES). Call (510) 650-2083",
  keywords: [
    "dumpster rental Clayton CA",
    "Clayton dumpster rental",
    "roll-off dumpster Clayton",
    "construction dumpster Clayton",
    "Clayton waste removal",
    "dumpster rental 94517",
    "Mt. Diablo dumpster rental",
    "Clayton Valley dumpster",
    "wildfire cleanup Clayton",
    "home renovation dumpster Clayton",
  ],
  openGraph: {
    title: "Dumpster Rental in Clayton, CA - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in Clayton. 10, 20 & 30 yard dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com/clayton",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tpdumpsters.com/clayton",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TP Dumpsters - Clayton",
  description:
    "Fast, reliable dumpster rentals in Clayton, CA. Serving all Clayton neighborhoods with same-day delivery.",
  url: "https://tpdumpsters.com/clayton",
  telephone: "+1-510-650-2083",
  email: "contact@tpdumpsters.com",
  image: "/images/logo/TP.png",
  logo: "/images/logo/TP.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Clayton",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Clayton",
      "@id": "https://en.wikipedia.org/wiki/Clayton,_California",
    },
  ],
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "07:00",
    closes: "18:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dumpster Rental Sizes",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "10 Yard Dumpster Rental",
          description:
            "Compact dumpster ideal for tight spaces and heavy debris like soil, concrete, and bricks.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "20 Yard Dumpster Rental",
          description:
            "Versatile dumpster for kitchen/bathroom remodels, roofing projects, and yard cleanups.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "30 Yard Dumpster Rental",
          description:
            "Extra capacity dumpster for whole-home cleanouts, large renovations, and construction debris.",
        },
      },
    ],
  },
};

export default function ClaytonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <ClaytonHero />
      {/* Red Divider */}
      <div className="h-[60px] bg-tp-red w-full" />
      <AboutCitySection {...claytonAbout} />
      <SizesSection />
<DumpsterPhotosGrid />
      <ErrorBoundary>
        <CityFaqsSection cityName="Clayton" faqs={claytonFaqs} />
      </ErrorBoundary>
      <FaqsSection />
      <DynamicReviews />
      <WhyUsSection />
      <DynamicGallery />
      <DynamicServiceAreaMap />
      <ClaytonLocation />

      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="w-[85%] max-w-[800px] mx-auto">
          <h2 className="font-[var(--font-poppins)] text-2xl md:text-3xl font-bold text-[#222] mb-6 text-center">
            Why Rent a Dumpster in Clayton, California?
          </h2>
          <div className="text-[#555] text-base leading-[1.8] font-[var(--font-poppins)] space-y-4">
            <p>
              Clayton is a unique small city at the foot of Mt. Diablo where homeowners take pride in
              their properties. From clearing brush for wildfire safety to renovating charming homes in
              the downtown area, residents here frequently need reliable waste removal. The city&apos;s
              proximity to open space and the Mt. Diablo foothills means landscaping debris and outdoor
              cleanup projects are common year-round.
            </p>
            <p>
              TP Dumpsters understands the specific needs of Clayton residents. Our drivers are
              experienced navigating the hillside roads and narrow streets that characterize much of the
              area. Whether you&apos;re a homeowner tackling a weekend garage cleanout in Clayton Valley
              or a contractor working on a remodel near Oakhurst Country Club, we deliver the right size
              dumpster directly to your property with same-day service available. Our transparent pricing
              and bilingual team make the process simple from start to finish.
            </p>
          </div>
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </>
  );
}
