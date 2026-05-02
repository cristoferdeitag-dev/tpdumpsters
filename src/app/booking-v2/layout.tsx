import { Work_Sans, Inter } from "next/font/google";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function BookingV2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${workSans.variable} ${inter.variable}`}>
      {children}
    </div>
  );
}
