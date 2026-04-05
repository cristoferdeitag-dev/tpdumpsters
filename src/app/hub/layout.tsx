import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Hub | TP Dumpsters",
  robots: { index: false, follow: false },
  manifest: "/manifest-dashboard.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "TP Hub",
  },
  icons: {
    apple: "/images/logo/TP.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
