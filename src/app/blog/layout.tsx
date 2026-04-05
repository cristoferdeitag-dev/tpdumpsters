import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | TP Dumpsters — Guides, Tips & Dumpster Rental Info",
  description:
    "Expert guides on dumpster rentals, waste disposal, construction debris removal, and home project planning. Serving the Bay Area, California.",
  keywords: [
    "dumpster rental blog",
    "dumpster rental cost",
    "what size dumpster do i need",
    "construction debris disposal",
    "yard waste disposal",
    "home renovation dumpster",
    "demolition debris removal",
    "dumpster rental tips",
    "roll-off dumpster guide",
    "bay area dumpster rental",
  ],
  openGraph: {
    title: "TP Dumpsters Blog — Guides, Tips & Rental Info",
    description:
      "Expert guides on dumpster rentals, waste disposal, and project planning for the Bay Area.",
    url: "https://tpdumpsters.com/blog",
    siteName: "TP Dumpsters",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://tpdumpsters.com/images/logo/TP.png",
        width: 1200,
        height: 630,
        alt: "TP Dumpsters Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TP Dumpsters Blog — Guides, Tips & Rental Info",
    description:
      "Expert guides on dumpster rentals, waste disposal, and project planning.",
    images: ["https://tpdumpsters.com/images/logo/TP.png"],
  },
  alternates: {
    canonical: "https://tpdumpsters.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
