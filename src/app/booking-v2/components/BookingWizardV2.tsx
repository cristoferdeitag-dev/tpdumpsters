"use client";

import { useState, useEffect } from "react";
import ServiceStepV2 from "./ServiceStepV2";
import DateStep from "../../booking/components/DateStep";
import AddressStep from "../../booking/components/AddressStep";
import SummaryStep from "../../booking/components/SummaryStep";
import ConfirmationStep from "../../booking/components/ConfirmationStep";
import type { BookingData } from "../../booking/components/BookingWizard";
import { trackBookingStarted, trackBookingStep, trackBookingPayment } from "@/lib/tracking";

const EXTRA_DAY_FEE = 49;
const ONLINE_DISCOUNT_FLAT = 50;

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
  { id: 1, label: "Service" },
  { id: 2, label: "Dates" },
  { id: 3, label: "Address" },
  { id: 4, label: "Review" },
];

export default function BookingWizardV2() {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingData>(initialBooking);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed] = useState(false);

  const updateBooking = (updates: Partial<BookingData>) => {
    setBooking((prev) => {
      const updated = { ...prev, ...updates };
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

  useEffect(() => {
    trackBookingStarted();
  }, []);

  const stepNames = ["", "Service", "Dates", "Address", "Summary"];

  const nextStep = () => {
    const next = Math.min(step + 1, 5);
    if (next >= 2 && next <= 4) trackBookingStep(next, stepNames[next]);
    setStep(next);
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    if (booking.service) {
      trackBookingPayment(booking.service.serviceType, booking.service.size, booking.totalPrice);
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

  if (isConfirmed) return <ConfirmationStep booking={booking} />;

  return (
    <div className="w-[92%] sm:w-[88%] max-w-[960px] mx-auto -mt-6 relative z-20">
      {/* Stitch-style progress tracker */}
      <nav className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] px-4 sm:px-6 py-5 mb-6">
        <div className="flex items-center justify-between max-w-[700px] mx-auto">
          {STEPS.map((s, i) => {
            const active = step === s.id;
            const done = step > s.id;
            return (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <button
                  type="button"
                  onClick={() => done && setStep(s.id)}
                  disabled={!done}
                  className="flex flex-col items-center min-w-[60px] disabled:cursor-default"
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold mb-1.5 transition-all ${
                      done
                        ? "bg-tp-red text-white"
                        : active
                        ? "bg-tp-red text-white ring-4 ring-tp-red/20"
                        : "bg-[#e5e5e5] text-[#999]"
                    }`}
                  >
                    {done ? "✓" : s.id}
                  </div>
                  <span
                    className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider font-[var(--font-poppins)] ${
                      active || done ? "text-tp-red" : "text-[#999]"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div
                    className={`h-px flex-grow mx-2 sm:mx-3 min-w-[12px] mb-5 ${
                      done ? "bg-tp-red" : "bg-[#e5e5e5]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Step content */}
      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-5 sm:p-8 min-h-[400px]">
        {step === 1 && (
          <ServiceStepV2 booking={booking} updateBooking={updateBooking} onNext={nextStep} />
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
