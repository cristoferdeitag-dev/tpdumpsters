"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { BookingData } from "./BookingWizard";

interface Props {
  booking: BookingData;
  updateBooking: (updates: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

/* ───────── Validation helpers ───────── */
function validateName(name: string): string | null {
  if (name.trim().length < 2) return "Name must be at least 2 characters";
  if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑüÜ0-9\s'.,&-]+$/.test(name.trim()))
    return "Name contains invalid characters";
  return null;
}

function validatePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) return "Phone must be at least 10 digits";
  if (digits.length > 15) return "Phone number is too long";
  return null;
}

/* Common valid email domains */
const VALID_DOMAINS = [
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com",
  "aol.com", "mail.com", "protonmail.com", "zoho.com", "ymail.com",
  "live.com", "msn.com", "comcast.net", "att.net", "verizon.net",
  "sbcglobal.net", "me.com", "mac.com", "pm.me",
];

/* Common email domain typos → correction */
const DOMAIN_TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com", "gmaill.com": "gmail.com", "gmal.com": "gmail.com",
  "gmil.com": "gmail.com", "gmai.com": "gmail.com", "gmail.co": "gmail.com",
  "gnail.com": "gmail.com", "gmsil.com": "gmail.com", "gamil.com": "gmail.com",
  "gmail.con": "gmail.com", "gmail.om": "gmail.com", "gmail.cm": "gmail.com",
  "gmail.comm": "gmail.com", "gmail.cim": "gmail.com", "gmail.vom": "gmail.com",
  "gmaul.com": "gmail.com", "gmali.com": "gmail.com", "gimail.com": "gmail.com",
  "yaho.com": "yahoo.com", "yahooo.com": "yahoo.com", "yhoo.com": "yahoo.com",
  "yahoo.co": "yahoo.com", "yhaoo.com": "yahoo.com", "yahoo.con": "yahoo.com",
  "hotmal.com": "hotmail.com", "hotmial.com": "hotmail.com", "hotmil.com": "hotmail.com",
  "hotmail.co": "hotmail.com", "hotamil.com": "hotmail.com", "hotmail.con": "hotmail.com",
  "outlok.com": "outlook.com", "outloo.com": "outlook.com", "outlool.com": "outlook.com",
  "outlook.co": "outlook.com", "outllok.com": "outlook.com", "outlook.con": "outlook.com",
  "iclod.com": "icloud.com", "icoud.com": "icloud.com", "icloud.co": "icloud.com",
  "icloud.con": "icloud.com",
};

/* Levenshtein distance for fuzzy domain matching */
function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1]
        ? dp[i-1][j-1]
        : 1 + Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]);
  return dp[m][n];
}

function validateEmail(email: string): string | null {
  if (!email || !email.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Please enter a valid email";

  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return "Please enter a valid email";

  // Check for exact known typos
  if (DOMAIN_TYPOS[domain]) {
    return `Did you mean ${email.split("@")[0]}@${DOMAIN_TYPOS[domain]}?`;
  }

  // Check TLD
  const tld = domain.split(".").pop() || "";
  if (tld.length < 2) return "Email domain looks incorrect";
  
  // Common TLD typos
  if (["con", "cim", "vom", "comm", "cm", "om"].includes(tld)) {
    return "Check your email — the domain ending looks incorrect";
  }

  // Fuzzy match: if domain is close to a known domain (1-2 chars off), suggest
  if (!VALID_DOMAINS.includes(domain)) {
    for (const valid of VALID_DOMAINS) {
      if (levenshtein(domain, valid) <= 2) {
        return `Did you mean ${email.split("@")[0]}@${valid}?`;
      }
    }
  }

  return null;
}

function validateZip(zip: string): string | null {
  if (!/^\d{5}(-\d{4})?$/.test(zip)) return "Enter a valid ZIP code (e.g. 94601)";
  return null;
}

/* ───────── Format phone as user types ───────── */
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

/* ───────── Google Places types ───────── */
declare global {
  interface Window {
    google?: {
      maps: {
        places: {
          Autocomplete: new (
            input: HTMLInputElement,
            opts?: Record<string, unknown>
          ) => {
            addListener: (event: string, cb: () => void) => void;
            getPlace: () => {
              address_components?: Array<{
                long_name: string;
                short_name: string;
                types: string[];
              }>;
              formatted_address?: string;
            };
          };
        };
        LatLng: new (lat: number, lng: number) => unknown;
        LatLngBounds: new (sw: unknown, ne: unknown) => unknown;
      };
    };
    initGooglePlaces?: () => void;
    initGooglePlacesInternal?: () => void;
  }
}

const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";

export default function AddressStep({ booking, updateBooking, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showBilling, setShowBilling] = useState(booking.billingAddress !== "");
  const addressInputRef = useRef<HTMLInputElement>(null);
  const billingInputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const autocompleteRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const billingAutocompleteRef = useRef<any>(null);

  // Load Google Places script
  useEffect(() => {
    if (!GOOGLE_MAPS_KEY || typeof window === "undefined") return;
    if (document.getElementById("google-places-script")) return;

    const script = document.createElement("script");
    script.id = "google-places-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&libraries=places&callback=initGooglePlaces`;
    script.async = true;
    script.defer = true;

    window.initGooglePlaces = () => {
      if (addressInputRef.current && window.google) {
        initAutocomplete();
      }
    };

    document.head.appendChild(script);

    return () => {
      delete window.initGooglePlaces;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Init autocomplete when Google loads
  const initAutocomplete = useCallback(() => {
    if (!addressInputRef.current || !window.google) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      addressInputRef.current,
      {
        componentRestrictions: { country: "us" },
        types: ["address"],
        fields: ["address_components", "formatted_address"],
        /* Restrict to Bay Area / service counties:
           Contra Costa, Alameda, San Francisco, San Mateo, Marin, Solano, Sonoma, Napa, Santa Clara */
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(37.1, -122.6), // SW corner (south Bay Area)
          new window.google.maps.LatLng(38.5, -121.5)  // NE corner (north Bay Area + Solano)
        ),
        strictBounds: true,
      }
    );

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (!place?.address_components) return;

      let street = "";
      let city = "";
      let zip = "";

      for (const component of place.address_components) {
        const types = component.types;
        if (types.includes("street_number")) {
          street = component.long_name + " ";
        }
        if (types.includes("route")) {
          street += component.long_name;
        }
        if (types.includes("locality")) {
          city = component.long_name;
        }
        if (types.includes("postal_code")) {
          zip = component.long_name;
        }
      }

      updateBooking({
        address: street || place.formatted_address || "",
        city,
        zipCode: zip,
      });

      // Clear address errors
      setErrors((prev) => ({ ...prev, address: null, city: null, zipCode: null }));
    });
  }, [updateBooking]);

  // Re-init if Google is already loaded
  useEffect(() => {
    if (window.google && addressInputRef.current && !autocompleteRef.current) {
      initAutocomplete();
    }
  }, [initAutocomplete]);

  // Init billing autocomplete
  useEffect(() => {
    if (!showBilling || !window.google || !billingInputRef.current || billingAutocompleteRef.current) return;
    billingAutocompleteRef.current = new window.google.maps.places.Autocomplete(
      billingInputRef.current,
      { componentRestrictions: { country: "us" }, types: ["address"], fields: ["formatted_address"] }
    );
    billingAutocompleteRef.current.addListener("place_changed", () => {
      const place = billingAutocompleteRef.current?.getPlace();
      if (place?.formatted_address) {
        updateBooking({ billingAddress: place.formatted_address });
      }
    });
  }, [showBilling, updateBooking]);

  /* ───────── Validation on blur ───────── */
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    let error: string | null = null;
    switch (field) {
      case "customerName":
        error = validateName(booking.customerName);
        break;
      case "customerPhone":
        error = validatePhone(booking.customerPhone);
        break;
      case "customerEmail":
        error = validateEmail(booking.customerEmail);
        break;
      case "zipCode":
        error = validateZip(booking.zipCode);
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  /* ───────── Phone formatting ───────── */
  const handlePhoneChange = (value: string) => {
    updateBooking({ customerPhone: formatPhone(value) });
  };

  /* ───────── Can proceed? ───────── */
  const allValid =
    booking.address.trim() !== "" &&
    booking.city.trim() !== "" &&
    booking.zipCode.trim() !== "" &&
    booking.customerName.trim().length >= 2 &&
    booking.customerPhone.replace(/\D/g, "").length >= 10 &&
    booking.customerEmail.trim() !== "" &&
    !validateName(booking.customerName) &&
    !validatePhone(booking.customerPhone) &&
    !validateEmail(booking.customerEmail) &&
    !validateZip(booking.zipCode);

  const inputClass = (field: string, hasError: boolean) =>
    `w-full px-4 py-3 border-2 rounded-xl text-sm font-[var(--font-poppins)] focus:outline-none transition-colors ${
      hasError && touched[field]
        ? "border-red-400 bg-red-50 focus:border-red-500"
        : "border-gray-200 focus:border-tp-red"
    }`;

  return (
    <div>
      <h2 className="font-[var(--font-poppins)] text-2xl font-bold text-[#333] mb-2">
        Delivery address & contact
      </h2>
      <p className="text-sm text-[#888] mb-8 font-[var(--font-poppins)]">
        Where should we deliver the dumpster?
      </p>

      {/* Contact info */}
      <div className="mb-6">
        <h3 className="font-[var(--font-poppins)] font-semibold text-[#333] mb-3 text-sm">
          👤 Your information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#555] mb-1 font-[var(--font-poppins)]">
              Name or company *
            </label>
            <input
              type="text"
              placeholder="John Smith or Company Name"
              value={booking.customerName}
              onChange={(e) => updateBooking({ customerName: e.target.value })}
              onBlur={() => handleBlur("customerName")}
              className={inputClass("customerName", !!errors.customerName)}
            />
            {touched.customerName && errors.customerName && (
              <p className="text-xs text-red-500 mt-1 font-[var(--font-poppins)]">
                ⚠️ {errors.customerName}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#555] mb-1 font-[var(--font-poppins)]">
              Phone number *
            </label>
            <input
              type="tel"
              placeholder="(510) 555-1234"
              value={booking.customerPhone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onBlur={() => handleBlur("customerPhone")}
              className={inputClass("customerPhone", !!errors.customerPhone)}
              maxLength={14}
            />
            {touched.customerPhone && errors.customerPhone && (
              <p className="text-xs text-red-500 mt-1 font-[var(--font-poppins)]">
                ⚠️ {errors.customerPhone}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#555] mb-1 font-[var(--font-poppins)]">
              Email *
            </label>
            <input
              type="email"
              placeholder="john@email.com"
              value={booking.customerEmail}
              onChange={(e) => updateBooking({ customerEmail: e.target.value })}
              onBlur={() => handleBlur("customerEmail")}
              className={inputClass("customerEmail", !!errors.customerEmail)}
            />
            {touched.customerEmail && errors.customerEmail && (
              <p className="text-xs text-red-500 mt-1 font-[var(--font-poppins)]">
                ⚠️ {errors.customerEmail}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="mb-6">
        <h3 className="font-[var(--font-poppins)] font-semibold text-[#333] mb-1 text-sm">
          📍 Delivery address
          {GOOGLE_MAPS_KEY && (
            <span className="text-xs text-[#aaa] font-normal ml-2">
              — Start typing to search
            </span>
          )}
        </h3>
        <p className="text-xs text-[#999] mb-3 font-[var(--font-poppins)]">
          We deliver to the San Francisco Bay Area — Contra Costa, Alameda, San Francisco, San Mateo, Marin, Solano, and surrounding counties.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#555] mb-1 font-[var(--font-poppins)]">
              Street address *
            </label>
            <input
              ref={addressInputRef}
              type="text"
              placeholder={GOOGLE_MAPS_KEY ? "Start typing your address..." : "123 Main Street"}
              value={booking.address}
              onChange={(e) => updateBooking({ address: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-[var(--font-poppins)] focus:border-tp-red focus:outline-none transition-colors"
              autoComplete="off"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#555] mb-1 font-[var(--font-poppins)]">
                City *
              </label>
              <input
                type="text"
                placeholder="Oakland"
                value={booking.city}
                onChange={(e) => updateBooking({ city: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-[var(--font-poppins)] focus:border-tp-red focus:outline-none transition-colors bg-gray-50"
                readOnly={!!GOOGLE_MAPS_KEY && booking.city !== ""}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#555] mb-1 font-[var(--font-poppins)]">
                ZIP code *
              </label>
              <input
                type="text"
                placeholder="94601"
                value={booking.zipCode}
                onChange={(e) => updateBooking({ zipCode: e.target.value })}
                onBlur={() => handleBlur("zipCode")}
                className={inputClass("zipCode", !!errors.zipCode)}
                maxLength={10}
              />
              {touched.zipCode && errors.zipCode && (
                <p className="text-xs text-red-500 mt-1 font-[var(--font-poppins)]">
                  ⚠️ {errors.zipCode}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Billing address (optional) */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-[var(--font-poppins)] font-semibold text-[#333] text-sm">
            💳 Billing address
            <span className="text-xs text-[#aaa] font-normal ml-2">(optional)</span>
          </h3>
          {!showBilling && (
            <button
              onClick={() => setShowBilling(true)}
              className="text-xs text-tp-red font-semibold font-[var(--font-poppins)] hover:underline"
            >
              + Add different billing address
            </button>
          )}
        </div>
        {!showBilling && (
          <p className="text-xs text-[#999] font-[var(--font-poppins)]">
            Same as delivery address by default.
          </p>
        )}
        {showBilling && (
          <div className="space-y-2">
            <input
              ref={billingInputRef}
              type="text"
              placeholder="Start typing your billing address..."
              value={booking.billingAddress}
              onChange={(e) => updateBooking({ billingAddress: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-[var(--font-poppins)] focus:border-tp-red focus:outline-none transition-colors"
              autoComplete="off"
            />
            <button
              onClick={() => { setShowBilling(false); updateBooking({ billingAddress: "" }); }}
              className="text-xs text-[#999] font-[var(--font-poppins)] hover:text-tp-red"
            >
              ✕ Use delivery address instead
            </button>
          </div>
        )}
      </div>

      {/* Additional comments */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-[#555] mb-1 font-[var(--font-poppins)]">
          Additional comments (optional)
        </label>
        <textarea
          placeholder="Gate code, placement instructions, special access notes..."
          value={booking.notes}
          onChange={(e) => updateBooking({ notes: e.target.value })}
          rows={2}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-[var(--font-poppins)] focus:border-tp-red focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg font-[var(--font-poppins)] font-semibold text-sm text-[#666] bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!allValid}
          className={`px-8 py-3 rounded-lg font-[var(--font-poppins)] font-semibold text-base transition-all duration-200 ${
            allValid
              ? "bg-tp-red text-white hover:bg-tp-red-dark shadow-md"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Next: Review & confirm →
        </button>
      </div>
    </div>
  );
}
