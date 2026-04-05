import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  manifest: "/manifest-booking.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TP Dumpsters",
  },
  icons: {
    apple: "/images/logo/TP.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#dc2626",
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
