import { Metadata } from "next";
import QuoteForm from "./QuoteForm";

export const metadata: Metadata = {
  title: "Internal Quote Generator | TP Dumpsters",
  robots: { index: false, follow: false },
};

export default function InternalQuotePage() {
  return <QuoteForm />;
}
