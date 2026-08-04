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
// by the success page. The saved createdAt is stamped ONCE per journey and
// never refreshed on restore (Hermes B3: a sliding TTL kept stale sessions
// alive forever); stale saves (>20h — Stripe sessions die at 24h) drop.
export const WIZARD_STORAGE_KEY = "tp_wizard_v1";
const STORAGE_MAX_AGE_MS = 20 * 60 * 60 * 1000;

interface SavedPayment {
  clientSecret: string;
  publishableKey: string;
  stripeAccount?: string;
  sessionId?: string;
}

// A restored save is customer-visible state — never trust a corrupt or
// hand-edited blob (Hermes M3): validate the shape before using it.
function isValidSave(s: unknown): s is { v: 1; createdAt: number; step: number; booking: BookingData; payment: SavedPayment | null } {
  if (!s || typeof s !== "object") return false;
  const o = s as Record<string, unknown>;
  if (o.v !== 1 || typeof o.createdAt !== "number" || typeof o.step !== "number") return false;
  const b = o.booking as Record<string, unknown> | null;
  if (!b || typeof b !== "object") return false;
  if (b.service !== null) {
    const svc = b.service as Record<string, unknown> | null;
    if (!svc || typeof svc !== "object" || typeof svc.serviceType !== "string") return false;
  }
  for (const k of ["deliveryDate", "pickupDate", "address", "city", "zipCode", "customerName", "customerPhone", "customerEmail"]) {
    if (typeof b[k] !== "string") return false;
  }
  if (typeof b.totalPrice !== "number") return false;
  if (o.payment !== null && o.payment !== undefined) {
    const p = o.payment as Record<string, unknown>;
    if (typeof p !== "object" || typeof p.clientSecret !== "string" || typeof p.publishableKey !== "string") return false;
  }
  return true;
}

export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingData>(initialBooking);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [payment, setPayment] = useState<SavedPayment | null>(null);
  // Gates saving until the one-time restore ran, so an empty initial render
  // can't clobber a saved session. resumeNote surfaces the state of an email
  // resume link (welcome back / already paid / date passed).
  const [restored, setRestored] = useState(false);
  const [resumeNote, setResumeNote] = useState<string | null>(null);
  const wizardTopRef = useRef<HTMLDivElement>(null);
  // createdAt of the current journey's save — immutable across restores.
  const saveCreatedAtRef = useRef<number | null>(null);
  // gclid recovered from the original session on an email resume: the click
  // attribution survives even when the customer opens the email on another
  // device (where the tp_gclid cookie doesn't exist).
  const resumeGclidRef = useRef("");

  // One-time restore: an email resume link (?resume=TP-X&e=exp&t=sig) wins
  // over the local save; otherwise reload continues exactly where the
  // customer left off. A saved payment step is only re-mounted after the
  // server confirms the Stripe session is still OPEN (Hermes B3) — a
  // completed session clears everything, an expired one falls back to the
  // Summary with the data intact.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resumeBid = params.get("resume");
    const resumeTok = params.get("t");
    const resumeExp = params.get("e");
    if (resumeBid && resumeTok && resumeExp) {
      // Scrub the token from the address bar FIRST — analytics (GTM/GA load
      // in the layout) snapshot the URL, and a PII-reading capability must
      // not end up in Analytics or browser history (Hermes A1).
      window.history.replaceState(null, "", window.location.pathname);
      (async () => {
        try {
          const res = await fetch(
            `/api/checkout/resume?bid=${encodeURIComponent(resumeBid)}&t=${encodeURIComponent(resumeTok)}&e=${encodeURIComponent(resumeExp)}`
          );
          const data = await res.json();
          if (res.ok && data.success && data.booking) {
            setBooking({ ...initialBooking, ...data.booking });
            if (typeof data.gclid === "string") resumeGclidRef.current = data.gclid;
            if (data.booking.deliveryWindow) {
              setStep(4);
              setResumeNote("Welcome back! Your booking is saved — review it and pay below.");
            } else {
              // The original delivery window couldn't be recovered — never
              // charge with an incomplete order (Hermes B4): one quick
              // re-pick on the Dates step, everything else stays filled.
              setStep(2);
              setResumeNote("Welcome back! Please confirm your delivery date and time window — the rest of your booking is already filled in.");
            }
          } else if (data.alreadyHandled) {
            setResumeNote("This booking was already completed. Questions? Call us at (510) 650-2083.");
          } else if (data.expired) {
            setResumeNote("The delivery date on this booking already passed — call us at (510) 650-2083 and we'll set you up with a new date.");
          } else {
            setResumeNote("That link expired. You can book again below in a couple of minutes, or call us at (510) 650-2083.");
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
        if (isValidSave(saved) && Date.now() - saved.createdAt < STORAGE_MAX_AGE_MS) {
          saveCreatedAtRef.current = saved.createdAt;
          setBooking(saved.booking);
          if (saved.step >= 1 && saved.step <= 4) setStep(saved.step);
          const p = saved.payment;
          if (p?.clientSecret && p?.publishableKey && p.sessionId) {
            // Ask the server whether the session is still payable before
            // showing card fields again. Conservative on any failure: stay
            // on Summary (data intact), never re-mount blind.
            fetch(`/api/checkout/session?id=${encodeURIComponent(p.sessionId)}`)
              .then((r) => (r.ok ? r.json() : null))
              .then((info: { status?: string } | null) => {
                if (info?.status === "open") {
                  setPayment(p);
                } else if (info?.status === "complete") {
                  localStorage.removeItem(WIZARD_STORAGE_KEY);
                  saveCreatedAtRef.current = null;
                  setBooking(initialBooking);
                  setStep(1);
                  setResumeNote("Looks like that booking was already paid — check your email for the confirmation. Need another dumpster? Book below, or call us at (510) 650-2083.");
                }
                /* expired → stay on Summary; Pay creates a fresh session */
              })
              .catch(() => {});
          }
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
  // simply visiting the page never overwrites a meaningful session. The
  // journey's createdAt is stamped once and reused — restoring never
  // refreshes it, so the 20h staleness cutoff is absolute.
  useEffect(() => {
    if (!restored) return;
    if (!booking.service && !payment) return;
    try {
      if (saveCreatedAtRef.current === null) saveCreatedAtRef.current = Date.now();
      localStorage.setItem(
        WIZARD_STORAGE_KEY,
        JSON.stringify({ v: 1, createdAt: saveCreatedAtRef.current, step, booking, payment })
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
        body: JSON.stringify({ ...booking, gclid: getGclid() || resumeGclidRef.current, embedded: true }),
      });
      const data = await res.json();
      if (res.ok && data.clientSecret && data.publishableKey) {
        // Mount Stripe's payment form right here in the wizard
        setPayment({ clientSecret: data.clientSecret, publishableKey: data.publishableKey, stripeAccount: data.stripeAccount, sessionId: data.sessionId });
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
            updateBooking={updateBooking}
            onBack={prevStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
