import type { Metadata } from "next";
import { Poppins, Oswald, Red_Hat_Display, Open_Sans } from "next/font/google";
import Script from "next/script";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AppBottomNav from "@/components/AppBottomNav";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tpdumpsters.com"),
  title: "Dumpster Rental Bay Area | Same-Day Roll-Off Delivery - TP Dumpsters",
  description:
    "Dumpster rental across the Bay Area & Contra Costa. 10, 20 & 30 yard roll-off dumpsters for contractors, remodelers & cleanups. Same-day delivery. Bilingual support. Transparent pricing.",
  keywords: [
    "dumpster rental",
    "Bay Area dumpster",
    "California dumpster rental",
    "roll-off dumpster",
    "construction dumpster",
    "TP Dumpsters",
    "10 yard dumpster",
    "20 yard dumpster",
    "30 yard dumpster",
    "same day dumpster delivery",
    "Oakland dumpster rental",
    "Pinole dumpster",
  ],
  icons: {
    icon: "/images/logo/favicon-32x32.png",
  },
  openGraph: {
    title: "Dumpster Rental Bay Area | Same-Day Roll-Off Delivery - TP Dumpsters",
    description:
      "Dumpster rental across the Bay Area & Contra Costa. 10, 20 & 30 yard roll-off dumpsters. Same-day delivery available.",
    url: "https://tpdumpsters.com",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://tpdumpsters.com/images/hero/red-dumpster-construction.png",
        width: 1200,
        height: 630,
        alt: "TP Dumpsters - Fast, Reliable Dumpster Rentals in California",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental Bay Area | Same-Day Roll-Off Delivery - TP Dumpsters",
    description:
      "Dumpster rental across the Bay Area & Contra Costa. Same-day delivery available.",
    images: [
      "https://tpdumpsters.com/images/hero/red-dumpster-construction.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "GtNKIqE6hxon63WpRDS_-4Y6U0_tqinf0wvazM2Nn00",
  },
  // NOTE: no global `alternates.canonical` here on purpose. A canonical set in
  // the root layout is inherited by every child page that doesn't override it,
  // which silently de-indexed /booking (pointed it at the homepage). Each page
  // now declares its own canonical; the homepage's lives in app/page.tsx.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} ${oswald.variable} ${redHatDisplay.variable} ${openSans.variable} font-[var(--font-open-sans)] text-sm text-[#666] bg-white leading-[1.7em] font-medium antialiased`}
      >
        {/* Resume-token scrub — MUST run before GTM/GA can snapshot the URL
            (Hermes round-2): the abandoned-cart email link carries a signed
            token that reads customer PII; beforeInteractive runs pre-hydration,
            so the token moves to sessionStorage (where the wizard picks it up)
            and vanishes from the address bar, history and analytics. */}
        <Script id="resume-scrub" strategy="beforeInteractive">
          {`(function(){try{var raw="";if(location.hash.indexOf("resume=")>-1){raw=location.hash.slice(1);}else if(location.search.indexOf("resume=")>-1){raw=location.search;}if(!raw)return;var p=new URLSearchParams(raw),b=p.get("resume"),e=p.get("e"),t=p.get("t");history.replaceState(null,"",location.pathname);if(b&&e&&t){try{sessionStorage.setItem("tp_resume",JSON.stringify({b:b,e:e,t:t}));}catch(s){}}}catch(x){}})();`}
        </Script>
        <GoogleAnalytics />
        {children}
        <AppBottomNav />
      </body>
    </html>
  );
}
