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

export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingData>(initialBooking);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [payment, setPayment] = useState<{ clientSecret: string; publishableKey: string } | null>(null);
  const wizardTopRef = useRef<HTMLDivElement>(null);

  // Each step has a different height, so the browser keeps a stale scroll
  // offset on step change and the user lands way down by the footer. Snap
  // back to the top of the wizard whenever the step changes (not on mount).
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    wizardTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        setPayment({ clientSecret: data.clientSecret, publishableKey: data.publishableKey });
        setIsSubmitting(false);
        wizardTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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

      {/* Step content */}
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 min-h-[400px]">
        {payment && (
          <EmbeddedPayment
            clientSecret={payment.clientSecret}
            publishableKey={payment.publishableKey}
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
