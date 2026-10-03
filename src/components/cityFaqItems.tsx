import type { CityFaqItem } from "@/components/CityFaqsSection";
import type { CityFaqText } from "@/lib/cityLanding";

// Turns plain-text city FAQs into the items CityFaqsSection renders, so the
// visible FAQ and the FAQPage JSON-LD come from the same array.
export function toFaqItems(faqs: CityFaqText[]): CityFaqItem[] {
  return faqs.map((f) => ({
    question: f.question,
    answer: (
      <>
        {f.answer.map((t, i) => (
          <p key={i} className="text-sm text-[#666] leading-[1.7] mb-2.5">
            {t}
          </p>
        ))}
      </>
    ),
  }));
}
