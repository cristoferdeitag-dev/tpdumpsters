import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteView from "./QuoteView";

export const metadata: Metadata = {
  title: "Your Quote | TP Dumpsters",
  description: "View your dumpster rental quote from TP Dumpsters.",
  robots: { index: false, follow: false },
};

export default async function QuotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <Header />
      <section className="bg-[#f5f5f5] min-h-screen pt-24 pb-16">
        <div className="w-[92%] sm:w-[80%] max-w-[800px] mx-auto">
          <QuoteView quoteId={id} />
        </div>
      </section>
      <Footer />
    </>
  );
}
