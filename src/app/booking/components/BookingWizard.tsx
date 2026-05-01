"use client";

import { useState, useEffect } from "react";
import ServiceStep from "./ServiceStep";
import DateStep from "./DateStep";
import AddressStep from "./AddressStep";
import SummaryStep from "./SummaryStep";
import ConfirmationStep from "./ConfirmationStep";
import { trackBookingStarted, trackBookingStep, trackBookingPayment } from "@/lib/tracking";

/* ───────── Types ───────── */
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
  dumpsterContents: string;
  notes: string;
  billingAddress: string;
  authorizedCharges: boolean;
}

const EXTRA_DAY_FEE = 49; // $49/day — updated 2026-03-20
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
  dumpsterContents: "",
  notes: "",
  billingAddress: "",
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

  const updateBooking = (updates: Partial<BookingData>) => {
    setBooking((prev) => {
      const updated = { ...prev, ...updates };
      // Recalculate total price with 5% online discount
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
        body: JSON.stringify(booking),
      });
      const data = await res.json();
      if (res.ok && data.checkoutUrl) {
        // Redirect to Stripe Checkout
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
    <div className="w-[94%] sm:w-[88%] max-w-[1000px] mx-auto pt-12 pb-10">
      {/* ── Stepper — minimal numbered dots, Stitch-style ── */}
      <div className="flex items-center justify-center gap-1 sm:gap-3 mb-10 px-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div className="flex flex-col items-center min-w-[60px] sm:min-w-[80px]">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[13px] sm:text-sm font-bold font-[var(--font-poppins)] transition-all duration-300 ${
                  step > s.id
                    ? "bg-tp-red text-white"
                    : step === s.id
                    ? "bg-tp-red text-white ring-4 ring-tp-red/15 scale-110"
                    : "bg-white text-[#bbb] ring-1 ring-[#e5e5e5]"
                }`}
              >
                {step > s.id ? "✓" : s.id}
              </div>
              <span
                className={`text-[10px] sm:text-[11px] mt-2 font-[var(--font-poppins)] font-semibold uppercase tracking-wider ${
                  step >= s.id ? "text-[#1a1a1a]" : "text-[#bbb]"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 rounded-full transition-all duration-300 -mt-5 ${
                  step > s.id ? "bg-tp-red" : "bg-[#e5e5e5]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-white rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] ring-1 ring-[#eee] p-6 sm:p-10 min-h-[400px]">
        {step === 1 && (
          <ServiceStep
            booking={booking}
            updateBooking={updateBooking}
            onNext={nextStep}
          />
        )}
        {step === 2 && (
          <DateStep
            booking={booking}
            updateBooking={updateBooking}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 3 && (
          <AddressStep
            booking={booking}
            updateBooking={updateBooking}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 4 && (
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
