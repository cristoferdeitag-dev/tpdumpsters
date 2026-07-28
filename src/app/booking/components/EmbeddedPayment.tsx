"use client";

// In-page card payment (2026-07-24, Booking-style look per Cris): a Checkout
// Session with ui_mode "custom" + Stripe's PaymentElement. The customer only
// sees card number / expiry / CVC and our Pay button — but unlike a bare
// card-only form, the name and billing address already collected by the
// wizard are attached at confirm(), so AVS + Radar keep their strongest
// anti-stolen-card signals. Vanilla stripe-js, no new dependencies.
import { useEffect, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import type { StripeCheckout, StripeCheckoutContact } from "@stripe/stripe-js";
import { FaLock, FaPhone } from "react-icons/fa6";
import type { BookingData } from "./BookingWizard";

interface Props {
  clientSecret: string;
  publishableKey: string;
  /** Connected account the session lives on (platform/commission mode). */
  stripeAccount?: string;
  booking: BookingData;
  onBack: () => void;
}

export default function EmbeddedPayment({ clientSecret, publishableKey, stripeAccount, booking, onBack }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<StripeCheckout | null>(null);
  const [mounted, setMounted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  // Cardholder name is its own editable field (Cris 2026-07-23): the person
  // booking (e.g. a worker) often pays with a card under someone else's or
  // the company's name — prefill with the contact name but let them fix it.
  const [cardName, setCardName] = useState(booking.customerName || "");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // Same key context that created the session: platform key + connected
        // account in commission mode, plain key otherwise.
        const stripe = await loadStripe(publishableKey, stripeAccount ? { stripeAccount } : undefined);
        if (!stripe) throw new Error("Stripe.js failed to load");
        if (cancelled) return;
        const checkout = stripe.initCheckout({ clientSecret });
        checkoutRef.current = checkout;
        // We collect the cardholder name with our own input; hide Stripe's
        // duplicate so the form stays as lean as possible.
        const paymentElement = checkout.createPaymentElement({
          fields: { billingDetails: { name: "never" } },
        });
        if (containerRef.current) {
          paymentElement.mount(containerRef.current);
          paymentElement.on("ready", () => {
            if (!cancelled) setMounted(true);
          });
        }
      } catch (err) {
        console.error("In-page payment failed to mount:", err);
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      checkoutRef.current?.getPaymentElement()?.destroy();
      checkoutRef.current = null;
    };
  }, [clientSecret, publishableKey, stripeAccount]);

  const handlePay = async () => {
    const checkout = checkoutRef.current;
    if (!checkout || paying) return;
    setPaying(true);
    setPayError(null);
    try {
      const loaded = await checkout.loadActions();
      if (loaded.type !== "success") throw new Error(loaded.error.message);

      // Billing address from the wizard (the dedicated billing address if the
      // customer gave one, else the delivery address) + the cardholder name
      // from the field above — full AVS/Radar signal without re-typing.
      const b = booking.billingAddress;
      const billingAddress: StripeCheckoutContact = {
        name: cardName.trim() || booking.customerName,
        address: b?.line1
          ? { line1: b.line1, city: b.city, state: b.state || "CA", postal_code: b.zip, country: "US" }
          : { line1: booking.address, city: booking.city, state: "CA", postal_code: booking.zipCode, country: "US" },
      };

      const result = await loaded.actions.confirm({
        billingAddress,
        ...(booking.customerEmail ? { email: booking.customerEmail } : {}),
      });
      // On success Stripe redirects to return_url; reaching here with an
      // error type means the charge didn't go through (declined, 3DS fail…).
      if (result && result.type === "error") {
        setPayError(result.error.message || "Your card was declined. Please try another card.");
        setPaying(false);
      }
    } catch (err) {
      console.error("Payment confirm error:", err);
      setPayError("We couldn't process the payment. Please try again or call us.");
      setPaying(false);
    }
  };

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
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-[var(--font-poppins)] text-2xl font-bold text-[#333]">
          Payment
        </h2>
        <button
          onClick={onBack}
          disabled={paying}
          className="text-sm text-[#666] font-[var(--font-poppins)] font-semibold hover:text-tp-red transition-colors disabled:opacity-50"
        >
          ← Back
        </button>
      </div>
      <p className="text-sm text-[#888] mb-5 font-[var(--font-poppins)]">
        {booking.customerName} · {booking.service?.serviceType} {booking.service?.size} yd
      </p>

      {!mounted && (
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin w-10 h-10 border-4 border-tp-red border-t-transparent rounded-full" />
        </div>
      )}

      {mounted && (
        <div className="mb-4">
          <label className="block text-[13px] font-semibold text-[#333] mb-1.5 font-[var(--font-poppins)]">
            Name on card
          </label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            autoComplete="cc-name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm font-[var(--font-poppins)] focus:outline-none focus:border-tp-red focus:ring-1 focus:ring-tp-red"
            placeholder="Exactly as it appears on the card"
          />
        </div>
      )}

      {/* Stripe injects the card fields here */}
      <div ref={containerRef} />

      {payError && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3">
          <p className="text-sm text-red-700 font-[var(--font-poppins)]">{payError}</p>
        </div>
      )}

      {mounted && (
        <>
          <button
            onClick={handlePay}
            disabled={paying}
            className="w-full mt-6 flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-[var(--font-poppins)] font-bold text-base bg-tp-red text-white hover:bg-tp-red-dark shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {paying ? "Processing..." : `Pay $${booking.totalPrice.toFixed(2)} & confirm booking`}
          </button>
          <p className="flex items-center justify-center gap-1.5 text-[11px] text-[#999] mt-3 font-[var(--font-poppins)]">
            <FaLock className="text-[10px]" /> Secure payment by Stripe · You never leave tpdumpsters.com
          </p>
        </>
      )}
    </div>
  );
}
