"use client";

import { useState } from "react";
import { FaChevronDown, FaCalendarDays } from "react-icons/fa6";

export interface CityFaqItem {
  question: string;
  answer: React.ReactNode;
}

function FaqColumn({ faqs, initialOpen = 0 }: { faqs: CityFaqItem[]; initialOpen?: number }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(initialOpen);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className={`faq-item border-2 border-tp-red rounded-[10px] overflow-hidden transition-all duration-300 ${activeIndex === i ? "active" : ""}`}
        >
          <button
            type="button"
            aria-expanded={activeIndex === i}
            aria-controls={`city-faq-answer-${i}`}
            className="flex items-center justify-between px-5 py-[18px] cursor-pointer bg-white transition-colors duration-300 w-full border-none text-left"
            onClick={() => toggle(i)}
          >
            <h5 className="font-[var(--font-poppins)] text-[13px] sm:text-[15px] font-semibold text-[#333] flex-1 pr-2.5">
              {faq.question}
            </h5>
            <span className="faq-arrow text-[#333] text-sm transition-transform duration-300 flex-shrink-0" aria-hidden="true">
              <FaChevronDown />
            </span>
          </button>
          <div id={`city-faq-answer-${i}`} role="region" className="faq-answer">{faq.answer}</div>
        </div>
      ))}
    </div>
  );
}

interface CityFaqsSectionProps {
  cityName: string;
  faqs: CityFaqItem[];
}

export default function CityFaqsSection({ cityName, faqs }: CityFaqsSectionProps) {
  const mid = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, mid);
  const rightFaqs = faqs.slice(mid);

  return (
    <section className="py-20 pb-15 bg-white">
      <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
        <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
          {cityName.toUpperCase()} FAQ&apos;S
        </h4>
        <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-10">
          Common questions about dumpster rental in {cityName}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FaqColumn faqs={leftFaqs} initialOpen={0} />
          <div className="flex flex-col gap-4">
            <FaqColumn faqs={rightFaqs} initialOpen={0} />
            <a
              href="tel:+15106502083"
              className="flex items-center justify-center gap-2 w-full py-4 px-5 bg-tp-red text-white rounded-lg text-lg font-semibold transition-colors duration-300 hover:bg-tp-red-dark font-[var(--font-poppins)] text-center mt-2.5"
            >
              <FaCalendarDays /> Check availability in {cityName}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
