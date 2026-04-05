"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";

const pills = [
  "Top-rated service in the Bay Area",
  "Transparent pricing",
  "Same-day availability in most ZIP codes",
  "Fast quotes by text or call",
  "Easy and secure booking",
];

export default function WhyUsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    let ticking = false;

    function updateTruckPosition() {
      if (!container || !img) return;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const startPoint = windowHeight;
      const endPoint = windowHeight * 0.35;

      if (rect.top >= startPoint) {
        img.style.transform = "translateX(-100%)";
      } else if (rect.top <= endPoint) {
        img.style.transform = "translateX(0%)";
      } else {
        const progress = 1 - (rect.top - endPoint) / (startPoint - endPoint);
        const translateValue = -100 + progress * 100;
        img.style.transform = `translateX(${translateValue}%)`;
      }
      ticking = false;
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateTruckPosition);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTruckPosition();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="us" className="py-20 bg-white overflow-hidden">
      <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div ref={containerRef} className="w-full lg:flex-[0_0_55%] lg:max-w-[55%] lg:-ml-[5vw] overflow-visible">
            <Image
              ref={imgRef}
              src="/images/why-us/tp-dumpster-1.png"
              alt="TP Dumpsters California Truck"
              width={800}
              height={500}
              className="truck-img w-[110%] max-w-none"
              style={{ transform: "translateX(-100%)" }}
            />
          </div>
          <div className="flex-1 bg-black rounded-[20px] lg:ml-5 p-[35px_30px]">
            <h4 className="font-[var(--font-poppins)] text-sm font-semibold text-tp-red uppercase tracking-[2px] mb-2">
              US
            </h4>
            <h2 className="font-[var(--font-poppins)] text-[28px] font-bold text-white mb-6">
              Why choose us?
            </h2>
            <div className="flex flex-col gap-3">
              {pills.map((pill) => (
                <div
                  key={pill}
                  className="flex items-center gap-3 bg-gradient-to-br from-tp-red to-tp-red-dark text-white px-[15px] py-2.5 sm:px-5 sm:py-3 rounded-[30px] font-[var(--font-poppins)] text-xs sm:text-sm font-medium"
                >
                  <span className="w-7 h-7 bg-tp-green rounded-full flex items-center justify-center flex-shrink-0">
                    <FaCheck className="text-white text-sm" />
                  </span>
                  <span>{pill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
