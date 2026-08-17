import type { Metadata } from "next";
import CobrosApp from "./CobrosApp";

export const metadata: Metadata = {
  title: "Cobros — TP Dumpsters (interno)",
  robots: { index: false, follow: false },
};

export default function CobrosPage() {
  return <CobrosApp />;
}
