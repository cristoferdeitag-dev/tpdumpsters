"use client";

// Stripe Embedded Checkout mounted inside the booking wizard (2026-07-24):
// same Checkout Session as the old redirect flow — Radar, AVS, 3DS, invoice
// and the platform fee are identical — the customer just never leaves the
// site. Uses the vanilla stripe-js API (no react-stripe-js dependency).
import { useEffect, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { FaPhone } from "react-icons/fa6";

interface Props {
  clientSecret: string;
  publishableKey: string;
  onBack: () => void;
}

export default function EmbeddedPayment({ clientSecret, publishableKey, onBack }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let checkout: { destroy: () => void } | null = null;

    (async () => {
      try {
        const stripe = await loadStripe(publishableKey);
        if (!stripe) throw new Error("Stripe.js failed to load");
        const instance = await stripe.initEmbeddedCheckout({ clientSecret });
        if (cancelled) {
          instance.destroy();
          return;
        }
        checkout = instance;
        if (containerRef.current) instance.mount(containerRef.current);
      } catch (err) {
        console.error("Embedded checkout failed to mount:", err);
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      checkout?.destroy();
    };
  }, [clientSecret, publishableKey]);

  if (failed) {
    return (
      <div className="text-center py-10">
        <p className="text-[#333] font-[var(--font-poppins)] font-semibold mb-2">
          The payment form couldn&apos;t load.
        </p>
        <p className="text-sm text-[#888] font-[var(--font-poppins)] mb-6">
          Please try again, or call us and we&apos;ll take your booking by phone.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-lg font-[var(--font-poppins)] font-semibold text-sm text-[#666] bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            ← Back to summary
          </button>
          <a
            href="tel:+15106502083"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-[var(--font-poppins)] font-semibold text-sm border-2 border-tp-red text-tp-red hover:bg-tp-red hover:text-white transition-colors"
          >
            <FaPhone /> (510) 650-2083
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-[var(--font-poppins)] text-2xl font-bold text-[#333]">
          Secure payment
        </h2>
        <button
          onClick={onBack}
          className="text-sm text-[#666] font-[var(--font-poppins)] font-semibold hover:text-tp-red transition-colors"
        >
          ← Back
        </button>
      </div>
      <p className="text-sm text-[#888] mb-5 font-[var(--font-poppins)]">
        🔒 Processed securely by Stripe — you never leave tpdumpsters.com.
      </p>
      {/* Stripe injects its iframe here */}
      <div ref={containerRef} className="min-h-[480px]" />
    </div>
  );
}
