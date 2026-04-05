import type { Metadata } from "next";
import { Poppins, Oswald, Red_Hat_Display, Open_Sans } from "next/font/google";
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
  title: "Rent a Dumpster in California! - TP Dumpsters",
  description:
    "Fast, reliable dumpster rentals in the Bay Area. 10, 20 & 30 yard roll-off dumpsters for contractors, remodelers & cleanups. Same-day delivery. Bilingual support. Transparent pricing.",
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
    title: "Rent a Dumpster in California! - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in the Bay Area. 10, 20 & 30 yard roll-off dumpsters. Same-day delivery available.",
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
    title: "Rent a Dumpster in California! - TP Dumpsters",
    description:
      "Fast, reliable dumpster rentals in the Bay Area. Same-day delivery available.",
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
  alternates: {
    canonical: "https://tpdumpsters.com",
  },
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
        <GoogleAnalytics />
        {children}
        <AppBottomNav />
      </body>
    </html>
  );
}
