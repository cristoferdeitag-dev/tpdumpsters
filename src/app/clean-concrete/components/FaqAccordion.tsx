"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

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
            aria-controls={`cc-faq-answer-${i}`}
            className="flex items-center justify-between px-5 py-[18px] cursor-pointer bg-white transition-colors duration-300 w-full border-none text-left"
            onClick={() => toggle(i)}
          >
            <h3 className="font-[var(--font-poppins)] text-[13px] sm:text-[15px] font-semibold text-[#333] flex-1 pr-2.5">
              {faq.question}
            </h3>
            <span className="faq-arrow text-[#333] text-sm transition-transform duration-300 flex-shrink-0" aria-hidden="true">
              <FaChevronDown />
            </span>
          </button>
          <div id={`cc-faq-answer-${i}`} role="region" className="faq-answer">
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
}
