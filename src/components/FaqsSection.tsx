"use client";

import { useState } from "react";
import { FaChevronDown, FaCalendarDays } from "react-icons/fa6";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

const leftFaqs: FaqItem[] = [
  {
    question: "How much space do I need to fit the dumpster?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
          Ensure clear, level space like a driveway or open area with no overhead obstacles. (L x W x H)
        </p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">10-yard: 12&apos;L x 8&apos;W x 2.5&apos;H</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">20-yard: 16&apos;L x 8&apos;W x 4&apos;H</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">30-yard: 16&apos;L x 8&apos;W x 6&apos;H</li>
        </ul>
      </>
    ),
  },
  {
    question: "How long can I keep the dumpster?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Standard rental includes:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">
            <strong>3 days</strong> for 10-yard dumpsters used for clean soil, concrete, bricks, or mixed materials.
          </li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">
            <strong>7 days</strong> for all dumpsters used for debris (10, 20, and 30-yard).
          </li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">
            Need more time? Additional days are available at <strong>$49/day</strong> (24-hour notice required).
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "What can I throw in the dumpster?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">We accept:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">General debris from home remodels, cleanouts, light demolition, landscaping, etc.</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Clean soil, concrete, bricks or mixed materials (in 10-yard dumpsters only).</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Not allowed:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>Hazardous waste</strong>, wet paint, batteries, propane tanks, medical waste, refrigerants, etc.</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>Treated wood, tires, mattresses, and appliances</strong> may incur extra fees.</li>
        </ul>
      </>
    ),
  },
  {
    question: "What happens if I overload the dumpster?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Each dumpster has a weight limit:</p>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Heavy materials:</p>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">10-yard for heavy materials (clean soil, concrete, bricks, or mixed materials) has no weight limit.</p>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">For general debris:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">10-yard: 1 ton</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">20-yard: 2 tons</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">30-yard: 3 tons</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Extra weight is charged at <strong>$125 per ton (prorated)</strong>. Fill to the marked line.</p>
      </>
    ),
  },
  {
    question: "Do I need a permit?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        If the dumpster is placed on private property (like your driveway), usually no.<br />
        If it&apos;s going on the street, a city permit may be required.
      </p>
    ),
  },
];

const rightFaqs: FaqItem[] = [
  {
    question: "Do you offer same-day delivery?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        In most cases, yes &mdash; especially if you call in the morning. Availability depends on your location and demand.
      </p>
    ),
  },
  {
    question: "What if I cancel my order?",
    answer: (
      <>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>$150 cancellation fee</strong>: 24-hour notice required.</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1"><strong>No cancellations</strong> after the dumpster has been dispatched.</li>
        </ul>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">No refunds for unused rental time once delivered.</p>
      </>
    ),
  },
  {
    question: "Do you charge for specific items?",
    answer: (
      <>
        <p className="text-sm text-[#666] leading-[1.7] mb-2.5">Yes. These items incur extra fees:</p>
        <ul className="list-disc pl-5 mb-2.5">
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Tires: $30 each</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Mattresses: $35 each</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Appliances (with Freon): $40-$80</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Treated wood: to be determined</li>
          <li className="text-sm text-[#666] leading-[1.7] mb-1">Electronics: $20-$40 depending on size</li>
        </ul>
      </>
    ),
  },
  {
    question: "When do I pay, and how?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        You can reserve it quickly and safely here. We accept <strong>credit cards</strong> via secure link. Full payment is due at booking to reserve your dumpster.
      </p>
    ),
  },
  {
    question: "How do I book a dumpster?",
    answer: (
      <p className="text-sm text-[#666] leading-[1.7] mb-2.5">
        You can reserve it quickly and safely here. Just click on Book Online, check availability, pay securely and you&apos;re good to go.
      </p>
    ),
  },
];

function FaqColumn({ faqs, initialOpen = 0 }: { faqs: FaqItem[]; initialOpen?: number }) {
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
            aria-controls={`faq-answer-${i}`}
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
          <div id={`faq-answer-${i}`} role="region" className="faq-answer">{faq.answer}</div>
        </div>
      ))}
    </div>
  );
}

export default function FaqsSection() {
  return (
    <section id="fqa" className="py-20 pb-15 bg-white">
      <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
        <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
          FAQ&apos;S
        </h4>
        <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-10">
          Common questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FaqColumn faqs={leftFaqs} initialOpen={0} />
          <div className="flex flex-col gap-4">
            <FaqColumn faqs={rightFaqs} initialOpen={0} />
            <a
              href="tel:+15106502083"
              className="flex items-center justify-center gap-2 w-full py-4 px-5 bg-tp-red text-white rounded-lg text-lg font-semibold transition-colors duration-300 hover:bg-tp-red-dark font-[var(--font-poppins)] text-center mt-2.5"
            >
              <FaCalendarDays /> Check availability
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
