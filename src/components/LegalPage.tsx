// Shared shell for the three legal pages (/privacy, /terms, /sms-policy).
// They exist for a concrete reason: Twilio rejected the TP A2P 10DLC campaign
// with 30909 ("CTA not verifiable") because the reviewer needs PUBLIC URLs
// where the SMS consent, the STOP/HELP keywords and the privacy language can
// be read — prose inside the campaign form is not enough (28-sep-2026).
// Keep them reachable, indexable and linked from the Footer.

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="bg-[#f9f9f9] py-12 sm:py-16">
        <article className="w-[90%] max-w-[820px] mx-auto bg-white rounded-2xl shadow-sm p-7 sm:p-12">
          <h1 className="font-[var(--font-oswald)] uppercase text-[30px] sm:text-[38px] font-bold text-[#1d2329] leading-tight">
            {title}
          </h1>
          <p className="font-[var(--font-poppins)] text-[13px] text-[#6b7176] mt-2 mb-8">
            Last updated: {updated}
          </p>
          <div className="legal-body font-[var(--font-poppins)] text-[15px] text-[#3a4045] leading-[1.75]">
            {children}
          </div>
        </article>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

// Section heading + paragraph helpers so the three pages stay readable as
// content instead of a wall of Tailwind classes.
export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[var(--font-oswald)] uppercase text-[20px] font-semibold text-[#1d2329] mt-9 mb-3">
      {children}
    </h2>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4">{children}</p>;
}

export function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 mb-4 space-y-1.5">{children}</ul>;
}
