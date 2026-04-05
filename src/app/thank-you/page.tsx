"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaCircleCheck } from "react-icons/fa6";
import { trackConversion } from "@/components/GoogleAnalytics";

export default function ThankYouPage() {
  useEffect(() => {
    trackConversion();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f9f9f9] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">
        <FaCircleCheck className="text-green-500 text-6xl mx-auto mb-6" />
        <h1 className="font-[var(--font-poppins)] text-3xl font-bold text-[#333] mb-3">
          Thank You!
        </h1>
        <p className="text-[#666] text-base mb-8 leading-relaxed">
          We&apos;ve received your request and will get back to you shortly.
          <br />
          If you need immediate assistance, call us at{" "}
          <a
            href="tel:+15106502083"
            className="text-tp-red font-semibold hover:underline"
          >
            (510) 650-2083
          </a>
        </p>
        <Link
          href="/"
          className="inline-block py-3 px-8 bg-tp-red text-white rounded-lg text-lg font-semibold transition-colors duration-300 hover:bg-tp-red-dark font-[var(--font-poppins)]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
