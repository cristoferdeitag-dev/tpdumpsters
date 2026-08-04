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
    if (p.sessionId !== undefined && typeof p.sessionId !== "string") return false;
    if (p.stripeAccount !== undefined && typeof p.stripeAccount !== "string") return false;
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
  // While a saved payment step is being validated server-side the whole
  // wizard is blocked (Hermes round-2 bloqueante: a usable Summary during
  // the async check let the customer create a SECOND session before knowing
  // whether the first was already paid). restoreBlocked = the check failed;
  // the customer gets retry / start over / phone — never a silent new session.
  const [restoringPayment, setRestoringPayment] = useState(false);
  const [restoreBlocked, setRestoreBlocked] = useState(false);
  const wizardTopRef = useRef<HTMLDivElement>(null);
  // createdAt of the current journey's save — immutable across restores.
  const saveCreatedAtRef = useRef<number | null>(null);
  // Payment blob waiting for its server-side session check.
  const pendingPaymentRef = useRef<SavedPayment | null>(null);
  // gclid recovered from the original session on an email resume: the click
  // attribution survives even when the customer opens the email on another
  // device (where the tp_gclid cookie doesn't exist).
  const resumeGclidRef = useRef("");

  // What "Try again" on the blocked panel retries: the local session check
  // or the email-resume exchange.
  const retryKindRef = useRef<"session" | "resume" | null>(null);
  const resumeParamsRef = useRef<{ b: string; t: string; e: string } | null>(null);

  // Email-resume exchange, fully gated (Hermes round-3): the wizard stays on
  // the blocking loader from first render until the server answers. blocked /
  // network error → blocked panel (retry or call) — never a silent fresh
  // wizard over a session in unknown state. A success here is already
  // reconciled server-side (the original session was completed → refused, or
  // expired before we got data), so paying from Summary can't double-charge.
  const runResumeFetch = async () => {
    const params = resumeParamsRef.current;
    if (!params) {
      setRestoringPayment(false);
      return;
    }
    try {
      const res = await fetch("/api/checkout/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // POST body, not query string — the token must not reach access
        // logs (Hermes round-2).
        body: JSON.stringify({ bid: params.b, t: params.t, e: params.e }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success && data.booking) {
        resumeParamsRef.current = null;
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
        setRestoringPayment(false);
      } else if (data.alreadyHandled) {
        resumeParamsRef.current = null;
        setRestoringPayment(false);
        setResumeNote("This booking was already completed. Questions? Call us at (510) 650-2083.");
      } else if (data.expired) {
        resumeParamsRef.current = null;
        setRestoringPayment(false);
        setResumeNote("The delivery date on this booking already passed — call us at (510) 650-2083 and we'll set you up with a new date.");
      } else if (data.blocked) {
        retryKindRef.current = "resume";
        setRestoringPayment(false);
        setRestoreBlocked(true);
      } else {
        // invalid/expired token — a fresh wizard is safe (no session context)
        resumeParamsRef.current = null;
        setRestoringPayment(false);
        setResumeNote("That link expired. You can book again below in a couple of minutes, or call us at (510) 650-2083.");
      }
    } catch {
      retryKindRef.current = "resume";
      setRestoringPayment(false);
      setRestoreBlocked(true);
    }
  };

  // Server-side verdict on a restored session before any card fields render:
  // open → re-mount the SAME session; complete → already paid, clear and say
  // so; expired → Summary with the data intact (Pay creates a fresh session);
  // unreachable → blocked state, never a blind new session.
  const checkRestoredSession = async () => {
    const p = pendingPaymentRef.current;
    if (!p?.sessionId) {
      pendingPaymentRef.current = null;
      setRestoringPayment(false);
      return;
    }
    try {
      const r = await fetch(`/api/checkout/session?id=${encodeURIComponent(p.sessionId)}`);
      if (!r.ok) throw new Error(`session check ${r.status}`);
      const info: { status?: string } = await r.json();
      if (info.status === "open") {
        pendingPaymentRef.current = null;
        setPayment(p);
        setRestoringPayment(false);
      } else if (info.status === "complete") {
        try {
          localStorage.removeItem(WIZARD_STORAGE_KEY);
        } catch {
          /* ignore */
        }
        saveCreatedAtRef.current = null;
        pendingPaymentRef.current = null;
        setBooking(initialBooking);
        setStep(1);
        setRestoringPayment(false);
        setResumeNote("Looks like that booking was already paid — check your email for the confirmation. Need another dumpster? Book below, or call us at (510) 650-2083.");
      } else {
        // expired (or any terminal state): drop the payment, keep the data
        pendingPaymentRef.current = null;
        setRestoringPayment(false);
      }
    } catch {
      retryKindRef.current = "session";
      setRestoringPayment(false);
      setRestoreBlocked(true);
    }
  };

  // One-time restore: an email resume link (?resume=TP-X&e=exp&t=sig) wins
  // over the local save; otherwise reload continues exactly where the
  // customer left off. A saved payment step is only re-mounted after the
  // server confirms the Stripe session is still OPEN (Hermes B3) — a
  // completed session clears everything, an expired one falls back to the
  // Summary with the data intact.
  useEffect(() => {
    // Email resume tokens normally arrive via sessionStorage: the layout's
    // beforeInteractive scrub script moved them there and cleaned the URL
    // before GTM/GA could snapshot it (Hermes A1). The URL params remain as
    // a fallback for any path that skipped the scrub — cleaned here too.
    let resumeBid: string | null = null;
    let resumeTok: string | null = null;
    let resumeExp: string | null = null;
    try {
      const stashed = sessionStorage.getItem("tp_resume");
      if (stashed) {
        sessionStorage.removeItem("tp_resume");
        const parsed = JSON.parse(stashed);
        if (typeof parsed?.b === "string" && typeof parsed?.t === "string" && typeof parsed?.e === "string") {
          resumeBid = parsed.b;
          resumeTok = parsed.t;
          resumeExp = parsed.e;
        }
      }
    } catch {
      /* fall through to URL params */
    }
    if (!resumeBid) {
      // Fallback for any path that skipped the layout scrub. Links use the
      // hash (never sent to the server); query is legacy-defensive. URL is
      // cleaned before anything else can observe it.
      const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
      const raw = hash.includes("resume=") ? hash : window.location.search;
      const params = new URLSearchParams(raw);
      resumeBid = params.get("resume");
      resumeTok = params.get("t");
      resumeExp = params.get("e");
      if (resumeBid) window.history.replaceState(null, "", window.location.pathname);
    }
    if (resumeBid && resumeTok && resumeExp) {
      // Gate the whole wizard behind the loader from the FIRST render until
      // the exchange resolves (Hermes round-3): a usable blank wizard here
      // could start a second checkout over a session in unknown state.
      resumeParamsRef.current = { b: resumeBid, t: resumeTok, e: resumeExp };
      retryKindRef.current = "resume";
      setRestoringPayment(true);
      setRestored(true);
      void runResumeFetch();
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
            // Block the wizard until the server says whether the session is
            // still payable — a usable Summary here could mint a second
            // session before the verdict (Hermes round-2).
            pendingPaymentRef.current = p;
            setRestoringPayment(true);
            void checkRestoredSession();
          }
          // A payment blob without sessionId can't be validated — treated
          // as expired: Summary with the data intact, Pay starts fresh.
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
    // While a restored payment awaits its verdict, saving would overwrite
    // the stored blob (payment state is still null) and lose the session —
    // hold off until the check resolves.
    if (restoringPayment || restoreBlocked) return;
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
  }, [restored, restoringPayment, restoreBlocked, step, booking, payment]);

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
        {restoringPayment && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="animate-spin w-10 h-10 border-4 border-tp-red border-t-transparent rounded-full" />
            <p className="text-sm text-[#666] font-[var(--font-poppins)]">Restoring your session...</p>
          </div>
        )}
        {!restoringPayment && restoreBlocked && (
          <div className="text-center py-10">
            <p className="text-[#333] font-[var(--font-poppins)] font-semibold mb-2">
              We couldn&apos;t verify your previous payment session.
            </p>
            <p className="text-sm text-[#888] font-[var(--font-poppins)] mb-6">
              To make sure you&apos;re never charged twice, we paused here.
              Try again, or call us and we&apos;ll sort it out on the spot.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => {
                  // Retries the SAME pending verification (local session or
                  // email resume) — a brand-new booking is deliberately not
                  // offered while the previous session's state is unknown
                  // (Hermes round-3: no new session without reconciling).
                  setRestoreBlocked(false);
                  setRestoringPayment(true);
                  if (retryKindRef.current === "resume") void runResumeFetch();
                  else void checkRestoredSession();
                }}
                className="px-6 py-3 rounded-lg font-[var(--font-poppins)] font-bold text-sm bg-tp-red text-white hover:bg-tp-red-dark transition-colors"
              >
                Try again
              </button>
              <a
                href="tel:+15106502083"
                className="flex items-center justify-center px-6 py-3 rounded-lg font-[var(--font-poppins)] font-semibold text-sm border-2 border-tp-red text-tp-red hover:bg-tp-red hover:text-white transition-colors"
              >
                (510) 650-2083
              </a>
            </div>
          </div>
        )}
        {!restoringPayment && !restoreBlocked && payment && (
          <EmbeddedPayment
            clientSecret={payment.clientSecret}
            publishableKey={payment.publishableKey}
            stripeAccount={payment.stripeAccount}
            booking={booking}
            onBack={() => setPayment(null)}
          />
        )}
        {!restoringPayment && !restoreBlocked && !payment && step === 1 && (
          <ServiceStep
            booking={booking}
            updateBooking={updateBooking}
            onNext={nextStep}
          />
        )}
        {!restoringPayment && !restoreBlocked && !payment && step === 2 && (
          <DateStep
            booking={booking}
            updateBooking={updateBooking}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {!restoringPayment && !restoreBlocked && !payment && step === 3 && (
          <AddressStep
            booking={booking}
            updateBooking={updateBooking}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {!restoringPayment && !restoreBlocked && !payment && step === 4 && (
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
