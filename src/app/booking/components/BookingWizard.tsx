"use client";

import { useState, useEffect, useRef } from "react";
import ServiceStep from "./ServiceStep";
import DateStep from "./DateStep";
import AddressStep from "./AddressStep";
import SummaryStep from "./SummaryStep";
import ConfirmationStep from "./ConfirmationStep";
import EmbeddedPayment from "./EmbeddedPayment";
import { trackBookingStarted, trackBookingStep, trackBookingPayment, getGclid } from "@/lib/tracking";

/* ───────── Types ───────── */
export interface BillingAddress {
  line1: string;
  city: string;
  state: string;
  zip: string;
}

export interface ServiceSelection {
  serviceType: string;
  size: string;
  basePrice: number;
  baseDays: number;
  weightLimit: string;
  dimensions: string;
}

export interface BookingData {
  service: ServiceSelection | null;
  deliveryDate: string;
  deliveryWindow: string; // "morning" | "midday" | "afternoon"
  pickupDate: string;
  extraDays: number;
  extraDayFee: number;
  totalPrice: number;
  subtotal: number;
  onlineDiscount: number;
  address: string;
  city: string;
  zipCode: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;
  billingAddress: BillingAddress | null;
  authorizedCharges: boolean;
}

const EXTRA_DAY_FEE = 75; // $75/day — updated 2026-06-24
const ONLINE_DISCOUNT_FLAT = 50; // $50 flat discount for online booking

const initialBooking: BookingData = {
  service: null,
  deliveryDate: "",
  deliveryWindow: "",
  pickupDate: "",
  extraDays: 0,
  extraDayFee: EXTRA_DAY_FEE,
  totalPrice: 0,
  subtotal: 0,
  onlineDiscount: 0,
  address: "",
  city: "",
  zipCode: "",
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  notes: "",
  billingAddress: null,
  authorizedCharges: false,
};

const STEPS = [
  { id: 1, label: "Service", icon: "🗑️" },
  { id: 2, label: "Dates", icon: "📅" },
  { id: 3, label: "Address", icon: "📍" },
  { id: 4, label: "Summary", icon: "📋" },
];

// Wizard progress survives a page reload. The failure this kills (Aug-2026
// audit): mobile customers leave the tab to fetch their card, the browser
// discards the page, and coming back wiped everything — 4 of 5 customers had
// to redo the whole wizard, and 2 walked away. Saved on every change, cleared
// by the success page; stale saves (>20h — Stripe sessions die at 24h) are
// dropped on restore. SuccessContent clears this same key.
export const WIZARD_STORAGE_KEY = "tp_wizard_v1";
const STORAGE_MAX_AGE_MS = 20 * 60 * 60 * 1000;

export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingData>(initialBooking);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [payment, setPayment] = useState<{ clientSecret: string; publishableKey: string; stripeAccount?: string } | null>(null);
  // Gates saving until the one-time restore ran, so an empty initial render
  // can't clobber a saved session. resumeNote surfaces the state of an email
  // resume link (welcome back / already paid / date passed).
  const [restored, setRestored] = useState(false);
  const [resumeNote, setResumeNote] = useState<string | null>(null);
  const wizardTopRef = useRef<HTMLDivElement>(null);

  // One-time restore: an email resume link (?resume=TP-X&t=sig) wins over the
  // local save; otherwise reload continues exactly where the customer left
  // off — including the payment step, re-mounting the SAME Stripe session.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resumeBid = params.get("resume");
    const resumeTok = params.get("t");
    if (resumeBid && resumeTok) {
      (async () => {
        try {
          const res = await fetch(
            `/api/checkout/resume?bid=${encodeURIComponent(resumeBid)}&t=${encodeURIComponent(resumeTok)}`
          );
          const data = await res.json();
          if (res.ok && data.success && data.booking) {
            setBooking({ ...initialBooking, ...data.booking });
            setStep(4);
            setResumeNote("Welcome back! Your booking is saved — review it and pay below.");
          } else if (data.alreadyHandled) {
            setResumeNote("This booking was already completed. Questions? Call us at (510) 650-2083.");
          } else if (data.expired) {
            setResumeNote("The delivery date on this booking already passed — call us at (510) 650-2083 and we'll set you up with a new date.");
          }
        } catch {
          /* fall through to a normal blank wizard */
        } finally {
          setRestored(true);
        }
      })();
      return;
    }
    try {
      const raw = localStorage.getItem(WIZARD_STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved?.v === 1 && Date.now() - saved.ts < STORAGE_MAX_AGE_MS && saved.booking) {
          setBooking(saved.booking);
          if (typeof saved.step === "number" && saved.step >= 1 && saved.step <= 4) setStep(saved.step);
          if (saved.payment?.clientSecret && saved.payment?.publishableKey) setPayment(saved.payment);
        } else {
          localStorage.removeItem(WIZARD_STORAGE_KEY);
        }
      }
    } catch {
      /* corrupt/blocked storage — start clean */
    }
    setRestored(true);
  }, []);

  // Persist on every change (post-restore). A blank wizard isn't saved, so
  // simply visiting the page never overwrites a meaningful session.
  useEffect(() => {
    if (!restored) return;
    if (!booking.service && !payment) return;
    try {
      localStorage.setItem(
        WIZARD_STORAGE_KEY,
        JSON.stringify({ v: 1, ts: Date.now(), step, booking, payment })
      );
    } catch {
      /* storage full/blocked — feature degrades to the old behavior */
    }
  }, [restored, step, booking, payment]);

  // Each step has a different height, so the browser keeps a stale scroll
  // offset on step change and the user lands way down by the footer. Jump
  // back INSTANTLY (no smooth animation — seeing the footer flash by feels
  // broken, per Cris 2026-07-23) whenever the step changes, not on mount.
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    wizardTopRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
  }, [step]);

  const updateBooking = (updates: Partial<BookingData>) => {
    setBooking((prev) => {
      const updated = { ...prev, ...updates };
      // Recalculate total price with flat $50 online booking discount
      if (updated.service) {
        const subtotal = updated.service.basePrice + updated.extraDays * updated.extraDayFee;
        const discount = ONLINE_DISCOUNT_FLAT;
        updated.subtotal = subtotal;
        updated.onlineDiscount = discount;
        updated.totalPrice = Math.round((subtotal - discount) * 100) / 100;
      }
      return updated;
    });
  };

  // Track booking started on mount
  useEffect(() => {
    trackBookingStarted();
  }, []);

  const stepNames = ["", "Service", "Dates", "Address", "Summary"];

  const nextStep = () => {
    const next = Math.min(step + 1, 5);
    if (next >= 2 && next <= 4) {
      trackBookingStep(next, stepNames[next]);
    }
    setStep(next);
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    // Track payment click
    if (booking.service) {
      trackBookingPayment(
        booking.service.serviceType,
        booking.service.size,
        booking.totalPrice
      );
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Attach the Google Ads click id so a paid booking can be uploaded
        // back as an offline conversion (server-side, tied to the real click).
        // embedded:true asks for a client_secret to mount Stripe's form
        // in-page instead of a redirect URL.
        body: JSON.stringify({ ...booking, gclid: getGclid(), embedded: true }),
      });
      const data = await res.json();
      if (res.ok && data.clientSecret && data.publishableKey) {
        // Mount Stripe's payment form right here in the wizard
        setPayment({ clientSecret: data.clientSecret, publishableKey: data.publishableKey, stripeAccount: data.stripeAccount });
        setIsSubmitting(false);
        wizardTopRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
      } else if (res.ok && data.checkoutUrl) {
        // Server answered with the redirect flow (rollback safety net)
        window.location.href = data.checkoutUrl;
      } else {
        alert("Error creating payment session. Please call us at (510) 650-2083.");
        setIsSubmitting(false);
      }
    } catch {
      alert("Error creating payment session. Please call us at (510) 650-2083.");
      setIsSubmitting(false);
    }
  };

  if (isConfirmed) {
    return <ConfirmationStep booking={booking} />;
  }

  return (
    <div ref={wizardTopRef} className="w-[92%] sm:w-[85%] max-w-[900px] mx-auto py-10 scroll-mt-24">
      {/* Progress bar */}
      <div className="flex items-center justify-between mb-10 px-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold transition-all duration-300 ${
                  step >= s.id
                    ? "bg-tp-red text-white shadow-lg"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {step > s.id ? "✓" : s.icon}
              </div>
              <span
                className={`text-[10px] sm:text-xs mt-1.5 font-[var(--font-poppins)] font-semibold ${
                  step >= s.id ? "text-tp-red" : "text-gray-400"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${
                  step > s.id ? "bg-tp-red" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {resumeNote && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-900 font-[var(--font-poppins)]">{resumeNote}</p>
        </div>
      )}

      {/* Step content */}
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 min-h-[400px]">
        {payment && (
          <EmbeddedPayment
            clientSecret={payment.clientSecret}
            publishableKey={payment.publishableKey}
            stripeAccount={payment.stripeAccount}
            booking={booking}
            onBack={() => setPayment(null)}
          />
        )}
        {!payment && step === 1 && (
          <ServiceStep
            booking={booking}
            updateBooking={updateBooking}
            onNext={nextStep}
          />
        )}
        {!payment && step === 2 && (
          <DateStep
            booking={booking}
            updateBooking={updateBooking}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {!payment && step === 3 && (
          <AddressStep
            booking={booking}
            updateBooking={updateBooking}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {!payment && step === 4 && (
          <SummaryStep
            booking={booking}
            onBack={prevStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
