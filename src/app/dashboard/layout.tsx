import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Dashboard | TP Dumpsters",
  robots: { index: false, follow: false },
  manifest: "/manifest-dashboard.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "TP Manager",
  },
  icons: {
    apple: "/images/logo/TP.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
