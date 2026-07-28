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

// Fire-and-forget error reporter — a browser-side failure becomes a line in
// the server log, so support can see WHY a customer's form didn't load.
function beacon(where: string, err: string) {
  try {
    fetch("/api/client-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ where, err, ua: navigator.userAgent }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* never break payment over logging */
  }
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
    // Never leave an infinite spinner (the 24-jul symptom): if the element
    // hasn't mounted after 12s, flip to the failed state (retry + phone) and
    // report the stall server-side.
    const stallTimer = setTimeout(() => {
      if (!cancelled) {
        beacon("embedded-mount-timeout", "PaymentElement not ready after 12s");
        setFailed(true);
      }
    }, 12_000);

    (async () => {
      try {
        // Same key context that created the session: platform key + connected
        // account in commission mode, plain key otherwise.
        // Stage beacons: when a mount stalls in a customer's browser, the log
        // shows exactly how far it got.
        const stripe = await loadStripe(publishableKey, stripeAccount ? { stripeAccount } : undefined);
        if (!stripe) throw new Error("Stripe.js failed to load");
        if (cancelled) return;
        beacon("embedded-stage", "1-stripejs-loaded");
        const checkout = stripe.initCheckout({ clientSecret });
        checkoutRef.current = checkout;
        beacon("embedded-stage", "2-initCheckout-returned");
        // We collect the cardholder name with our own input; hide Stripe's
        // duplicate so the form stays as lean as possible.
        // If the wizard collected an EXPLICIT billing address we attach it at
        // confirm() and the element must not double-collect it. Without one,
        // the element collects the card's real billing address itself — using
        // the delivery address as billing would hardcode state "CA" and could
        // fail AVS for out-of-state cards (Hermes audit).
        const hasExplicitBilling = Boolean(booking.billingAddress?.line1);
        // With an explicit billing address, OUR name input + the wizard data
        // ride along at confirm() and the element collects nothing. Without
        // one, the element collects BOTH (confirm() rejects a name-only
        // contact) — the customer's name is still prefilled via defaultValues.
        const paymentElement = checkout.createPaymentElement({
          fields: {
            billingDetails: hasExplicitBilling
              ? { name: "never", address: "never" }
              : { name: "auto", address: "auto" },
          },
          ...(hasExplicitBilling
            ? {}
            : { defaultValues: { billingDetails: { name: booking.customerName || "" } } }),
        });
        if (containerRef.current) {
          paymentElement.mount(containerRef.current);
          beacon("embedded-stage", "3-mount-called");
          paymentElement.on("loaderror" as never, (ev: unknown) => {
            beacon("embedded-loaderror", JSON.stringify(ev).slice(0, 400));
          });
          paymentElement.on("ready", () => {
            clearTimeout(stallTimer);
            beacon("embedded-stage", "4-READY");
            if (!cancelled) setMounted(true);
          });
        }
      } catch (err) {
        console.error("In-page payment failed to mount:", err);
        beacon("embedded-mount-error", String(err));
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(stallTimer);
      try {
        // getPaymentElement can throw if unmounting before init finished
        // (Hermes audit) — never break the React tree over cleanup.
        checkoutRef.current?.getPaymentElement()?.destroy();
      } catch {
        /* already gone */
      }
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
      // The email is NOT passed here: the session's customer already carries
      // it, and current Stripe.js rejects setting it twice at confirm().
      // Without an explicit billing address the element collected name AND
      // address itself, so confirm() takes no contact at all.
      const result = b?.line1
        ? await loaded.actions.confirm({
            billingAddress: {
              name: cardName.trim() || booking.customerName,
              address: { line1: b.line1, city: b.city, state: b.state || "CA", postal_code: b.zip, country: "US" },
            },
          })
        : await loaded.actions.confirm();
      // On success Stripe redirects to return_url; reaching here with an
      // error type means the charge didn't go through (declined, 3DS fail…).
      if (result && result.type === "error") {
        setPayError(result.error.message || "Your card was declined. Please try another card.");
        setPaying(false);
      }
    } catch (err) {
      console.error("Payment confirm error:", err);
      beacon("embedded-confirm-error", String(err));
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

      {mounted && Boolean(booking.billingAddress?.line1) && (
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
