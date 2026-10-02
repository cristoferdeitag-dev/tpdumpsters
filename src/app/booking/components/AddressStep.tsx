"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { BookingData } from "./BookingWizard";
import { isOutsideServiceArea } from "@/lib/service-area";
import { IconUser, IconPin, IconCard, IconAlert } from "@/components/MaterialIcons";
import { useBookingLang } from "@/lib/i18n/useBookingLang";
import type { BookingDict } from "@/lib/i18n/booking";

interface Props {
  booking: BookingData;
  updateBooking: (updates: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

/* Marca de campo obligatorio. El asterisco gris del label pasaba
   desapercibido — va en rojo y anunciado a lectores de pantalla. */
function Req() {
  const { t } = useBookingLang();
  return (
    <>
      <span className="text-tp-red font-bold" aria-hidden="true"> *</span>
      <span className="sr-only">{t.common.required}</span>
    </>
  );
}

/* ───────── Validation helpers ─────────
   Same rules as always; they now return an error CODE (still a truthy
   string, so every `!validateX()` check is unchanged) and errorText() turns
   it into the message in the customer's language. "didYouMean:<email>"
   carries the suggested address. */
type ErrorCode = Exclude<keyof BookingDict["address"]["errors"], "didYouMean"> | `didYouMean:${string}`;

function errorText(code: string | null | undefined, t: BookingDict): string {
  if (!code) return "";
  if (code.startsWith("didYouMean:")) return t.address.errors.didYouMean(code.slice("didYouMean:".length));
  const msg = t.address.errors[code as Exclude<ErrorCode, `didYouMean:${string}`>];
  return typeof msg === "string" ? msg : code;
}

function validateName(name: string): ErrorCode | null {
  if (name.trim().length < 2) return "nameShort";
  if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑüÜ0-9\s'.,&-]+$/.test(name.trim()))
    return "nameInvalid";
  return null;
}

function validatePhone(phone: string): ErrorCode | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) return "phoneShort";
  if (digits.length > 15) return "phoneLong";
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

function validateEmail(email: string): ErrorCode | null {
  if (!email || !email.trim()) return "emailRequired";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "emailInvalid";

  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return "emailInvalid";

  // Check for exact known typos
  if (DOMAIN_TYPOS[domain]) {
    return `didYouMean:${email.split("@")[0]}@${DOMAIN_TYPOS[domain]}`;
  }

  // Check TLD
  const tld = domain.split(".").pop() || "";
  if (tld.length < 2) return "emailDomain";
  
  // Common TLD typos
  if (["con", "cim", "vom", "comm", "cm", "om"].includes(tld)) {
    return "emailTld";
  }

  // Fuzzy match: if domain is close to a known domain (1-2 chars off), suggest
  if (!VALID_DOMAINS.includes(domain)) {
    for (const valid of VALID_DOMAINS) {
      if (levenshtein(domain, valid) <= 2) {
        return `didYouMean:${email.split("@")[0]}@${valid}`;
      }
    }
  }

  return null;
}

function validateZip(zip: string): ErrorCode | null {
  if (!/^\d{5}(-\d{4})?$/.test(zip)) return "zipInvalid";
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
  const { t } = useBookingLang();
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showBilling, setShowBilling] = useState(booking.billingAddress !== null);
  // El cliente ya intentó continuar: a partir de aquí se le dice qué falta.
  const [attempted, setAttempted] = useState(false);
  const notesRef = useRef<HTMLTextAreaElement>(null);
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

  // Init billing autocomplete — parses address_components into a structured
  // {line1, city, state, zip} object so the backend can use it directly
  // instead of trying to read string.line1 (the bug Asaí caught 2026-05-05).
  useEffect(() => {
    if (!showBilling || !window.google || !billingInputRef.current || billingAutocompleteRef.current) return;
    billingAutocompleteRef.current = new window.google.maps.places.Autocomplete(
      billingInputRef.current,
      { componentRestrictions: { country: "us" }, types: ["address"], fields: ["address_components", "formatted_address"] }
    );
    billingAutocompleteRef.current.addListener("place_changed", () => {
      const place = billingAutocompleteRef.current?.getPlace();
      if (!place?.address_components) return;
      let line1 = "", city = "", state = "", zip = "";
      for (const c of place.address_components) {
        const types = c.types as string[];
        if (types.includes("street_number")) line1 = c.long_name + " ";
        if (types.includes("route")) line1 += c.long_name;
        if (types.includes("locality")) city = c.long_name;
        if (types.includes("administrative_area_level_1")) state = c.short_name;
        if (types.includes("postal_code")) zip = c.long_name;
      }
      updateBooking({ billingAddress: { line1: line1.trim() || place.formatted_address || "", city, state, zip } });
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
  const billingComplete =
    !showBilling ||
    (!!booking.billingAddress &&
      !!booking.billingAddress.line1 &&
      !!booking.billingAddress.city &&
      !!booking.billingAddress.state &&
      !!booking.billingAddress.zip);

  const outsideArea = isOutsideServiceArea(booking.city, booking.zipCode);

  // Dónde colocar el dumpster: obligatorio (Asaí, 9-sep-2026). Se pide algo
  // escrito de verdad, no un punto ni una letra suelta.
  const notesValid = (booking.notes ?? "").trim().length >= 5;

  const allValid =
    !outsideArea &&
    notesValid &&
    booking.address.trim() !== "" &&
    booking.city.trim() !== "" &&
    booking.zipCode.trim() !== "" &&
    booking.customerName.trim().length >= 2 &&
    booking.customerPhone.replace(/\D/g, "").length >= 10 &&
    booking.customerEmail.trim() !== "" &&
    !validateName(booking.customerName) &&
    !validatePhone(booking.customerPhone) &&
    !validateEmail(booking.customerEmail) &&
    !validateZip(booking.zipCode) &&
    billingComplete;

  // Qué falta, en el orden en que aparece en pantalla. Un cliente se atoró el
  // 9-sep-2026: llenó todo menos la nota (que se volvió obligatoria ese mismo
  // día), el botón se quedó gris SIN decir por qué y el aviso del textarea sólo
  // salía si lo habías enfocado y salido. Ahora el paso nunca falla en silencio.
  const missing: string[] = [];
  if (booking.customerName.trim().length < 2 || validateName(booking.customerName))
    missing.push(t.address.miss.name);
  if (booking.customerPhone.replace(/\D/g, "").length < 10 || validatePhone(booking.customerPhone))
    missing.push(t.address.miss.phone);
  if (booking.customerEmail.trim() === "" || validateEmail(booking.customerEmail))
    missing.push(t.address.miss.email);
  if (booking.address.trim() === "") missing.push(t.address.miss.street);
  if (booking.city.trim() === "") missing.push(t.address.miss.city);
  if (booking.zipCode.trim() === "" || validateZip(booking.zipCode))
    missing.push(t.address.miss.zip);
  if (!billingComplete) missing.push(t.address.miss.billing);
  if (!notesValid) missing.push(t.address.miss.place);

  // El botón ya NO va disabled: si algo falta, marca todos los campos como
  // tocados (para que sus avisos aparezcan) y sube al primero que falta.
  const handleNext = () => {
    if (allValid) {
      onNext();
      return;
    }
    setAttempted(true);
    setTouched({
      customerName: true,
      customerPhone: true,
      customerEmail: true,
      zipCode: true,
      notes: true,
    });
    setErrors({
      customerName: validateName(booking.customerName),
      customerPhone: validatePhone(booking.customerPhone),
      customerEmail: validateEmail(booking.customerEmail),
      zipCode: validateZip(booking.zipCode),
    });
    if (!notesValid) {
      notesRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const inputClass = (field: string, hasError: boolean, isEmpty = false) =>
    `w-full px-4 py-3 border-2 rounded-xl text-sm font-[var(--font-poppins)] focus:outline-none transition-colors ${
      (hasError && touched[field]) || (attempted && isEmpty)
        ? "border-red-400 bg-red-50 focus:border-red-500"
        : "border-gray-200 focus:border-tp-red"
    }`;

  return (
    <div>
      <h2 className="font-[var(--font-poppins)] text-2xl font-bold text-[#333] mb-2">
        {t.address.title}
      </h2>
      <p className="text-sm text-[#888] mb-2 font-[var(--font-poppins)]">
        {t.address.subtitle}
      </p>
      <p className="text-xs text-[#888] mb-8 font-[var(--font-poppins)]">
        {t.common.requiredPrefix} <span className="text-tp-red font-bold">*</span> {t.address.requiredSuffix}
      </p>

      {/* Contact info */}
      <div className="mb-6">
        <h3 className="flex items-center gap-2 font-[var(--font-poppins)] font-semibold text-[#1d2329] mb-3 text-sm">
          <IconUser size={18} className="text-[#4b5156]" /> {t.address.yourInfo}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#555] mb-1 font-[var(--font-poppins)]">
              {t.address.name}<Req />
            </label>
            <input
              type="text"
              placeholder={t.address.namePh}
              value={booking.customerName}
              onChange={(e) => updateBooking({ customerName: e.target.value })}
              onBlur={() => handleBlur("customerName")}
              aria-required="true"
              className={inputClass("customerName", !!errors.customerName)}
            />
            {touched.customerName && errors.customerName && (
              <p className="text-xs text-red-500 mt-1 font-[var(--font-poppins)]">
                {errorText(errors.customerName, t)}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#555] mb-1 font-[var(--font-poppins)]">
              {t.address.phone}<Req />
            </label>
            <input
              type="tel"
              placeholder="(510) 555-1234"
              value={booking.customerPhone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onBlur={() => handleBlur("customerPhone")}
              aria-required="true"
              className={inputClass("customerPhone", !!errors.customerPhone)}
              maxLength={14}
            />
            {touched.customerPhone && errors.customerPhone && (
              <p className="text-xs text-red-500 mt-1 font-[var(--font-poppins)]">
                {errorText(errors.customerPhone, t)}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#555] mb-1 font-[var(--font-poppins)]">
              {t.address.email}<Req />
            </label>
            <input
              type="email"
              placeholder={t.address.emailPh}
              value={booking.customerEmail}
              onChange={(e) => updateBooking({ customerEmail: e.target.value })}
              onBlur={() => handleBlur("customerEmail")}
              aria-required="true"
              className={inputClass("customerEmail", !!errors.customerEmail)}
            />
            {touched.customerEmail && errors.customerEmail && (
              <p className="text-xs text-red-500 mt-1 font-[var(--font-poppins)]">
                {errorText(errors.customerEmail, t)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="mb-6">
        <h3 className="flex items-center gap-2 font-[var(--font-poppins)] font-semibold text-[#1d2329] mb-1 text-sm">
          <IconPin size={18} className="text-[#4b5156]" /> {t.address.deliveryAddress}
          {GOOGLE_MAPS_KEY && (
            <span className="text-xs text-[#aaa] font-normal ml-2">
              {t.address.startTyping}
            </span>
          )}
        </h3>
        {/* 18-sep: era la lista completa de 6 condados en un párrafo. La
            zona ya se valida sola al escribir la dirección, así que aquí basta
            una línea (Cris msg 22094: "el paso tres no se ve tan limpio"). */}
        <p className="text-xs text-[#4b5156] mb-3 font-[var(--font-poppins)]">
          {t.address.weServe}
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#555] mb-1 font-[var(--font-poppins)]">
              {t.address.street}<Req />
            </label>
            <input
              ref={addressInputRef}
              type="text"
              placeholder={GOOGLE_MAPS_KEY ? t.address.streetPhSearch : "123 Main Street"}
              value={booking.address}
              onChange={(e) => updateBooking({ address: e.target.value })}
              aria-required="true"
              className={inputClass("address", false, booking.address.trim() === "")}
              autoComplete="off"
            />
            {attempted && booking.address.trim() === "" && (
              <p className="text-xs text-red-500 mt-1 font-[var(--font-poppins)]">
                {t.address.streetRequired}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#555] mb-1 font-[var(--font-poppins)]">
                {t.address.city}<Req />
              </label>
              {/* Sin readOnly (9-sep-2026). Estaba como
                  `!!GOOGLE_MAPS_KEY && booking.city !== ""`, o sea: se bloqueaba
                  en cuanto el campo tenía UN carácter. Quien escribía la ciudad
                  a mano — porque no usó el desplegable de Google — se quedaba
                  atorado en la primera letra y ya no podía continuar. Que
                  Google la autocomplete está bien; impedir corregirla, no. */}
              <input
                type="text"
                placeholder="Oakland"
                value={booking.city}
                onChange={(e) => updateBooking({ city: e.target.value })}
                aria-required="true"
                className={`${inputClass("city", false, booking.city.trim() === "")} bg-white`}
              />
              {attempted && booking.city.trim() === "" && (
                <p className="text-xs text-red-500 mt-1 font-[var(--font-poppins)]">
                  {t.address.cityRequired}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#555] mb-1 font-[var(--font-poppins)]">
                {t.address.zip}<Req />
              </label>
              <input
                type="text"
                placeholder="94601"
                value={booking.zipCode}
                onChange={(e) => updateBooking({ zipCode: e.target.value })}
                onBlur={() => handleBlur("zipCode")}
                aria-required="true"
              className={inputClass("zipCode", !!errors.zipCode)}
                maxLength={10}
              />
              {touched.zipCode && errors.zipCode && (
                <p className="text-xs text-red-500 mt-1 font-[var(--font-poppins)]">
                  {errorText(errors.zipCode, t)}
                </p>
              )}
            </div>
          </div>
        </div>
        {outsideArea && (
          <div className="mt-3 rounded-xl border-2 border-red-300 bg-red-50 px-4 py-3">
            <p className="text-sm font-semibold text-red-600 font-[var(--font-poppins)]">
              {t.address.outside(booking.city.trim() || t.address.thatArea)}
            </p>
            <p className="text-xs text-red-500 mt-1 font-[var(--font-poppins)]">
              {t.address.outsideDetail}
            </p>
          </div>
        )}
      </div>

      {/* Billing address (optional) */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="flex items-center gap-2 font-[var(--font-poppins)] font-semibold text-[#1d2329] text-sm">
            <IconCard size={18} className="text-[#4b5156]" /> {t.address.billing}
            <span className="text-xs text-[#aaa] font-normal ml-2">{t.address.optional}</span>
          </h3>
          {!showBilling && (
            <button
              onClick={() => setShowBilling(true)}
              className="text-xs text-[#4b5156] font-medium font-[var(--font-poppins)] underline decoration-[#c9ccd0] hover:text-[#1d2329]"
            >
              {t.address.addBilling}
            </button>
          )}
        </div>
        {!showBilling && (
          <p className="text-xs text-[#999] font-[var(--font-poppins)]">
            {t.address.sameAsDelivery}
          </p>
        )}
        {showBilling && (
          <div className="space-y-2">
            <input
              ref={billingInputRef}
              type="text"
              placeholder={t.address.billingPh}
              defaultValue={booking.billingAddress ? `${booking.billingAddress.line1}, ${booking.billingAddress.city}` : ""}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-[var(--font-poppins)] focus:border-tp-red focus:outline-none transition-colors"
              autoComplete="off"
            />
            {booking.billingAddress ? (
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-[#555] font-[var(--font-poppins)]">
                <div className="font-semibold text-[#333] mb-1">{t.address.billingCaptured}</div>
                <div>{booking.billingAddress.line1}</div>
                <div>{booking.billingAddress.city}, {booking.billingAddress.state} {booking.billingAddress.zip}</div>
                {(!booking.billingAddress.line1 || !booking.billingAddress.city || !booking.billingAddress.state || !booking.billingAddress.zip) && (
                  <div className="text-red-500 mt-1">{t.address.billingIncomplete}</div>
                )}
              </div>
            ) : (
              <p className="text-xs text-[#888] font-[var(--font-poppins)]">
                {t.address.billingPick}
              </p>
            )}
            <button
              onClick={() => {
                setShowBilling(false);
                updateBooking({ billingAddress: null });
                if (billingInputRef.current) billingInputRef.current.value = "";
              }}
              className="text-xs text-[#999] font-[var(--font-poppins)] hover:text-tp-red"
            >
              {t.address.useDelivery}
            </button>
          </div>
        )}
      </div>

      {/* Dónde se coloca el dumpster — OBLIGATORIO (Asaí, 9-sep-2026).
          Antes era "Additional comments (optional)" y la gente escribía
          cualquier cosa o nada; el driver llegaba sin saber dónde dejarlo. */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-[#555] mb-1 font-[var(--font-poppins)]">
          <IconPin size={18} className="text-[#4b5156]" /> {t.address.place}<Req />
        </label>
        <p className="text-xs text-[#999] mb-2 font-[var(--font-poppins)]">
          {t.address.placeHelp}
        </p>
        <textarea
          ref={notesRef}
          placeholder={t.address.placePh}
          value={booking.notes}
          onChange={(e) => updateBooking({ notes: e.target.value })}
          aria-required="true"
          onBlur={() => setTouched((prev) => ({ ...prev, notes: true }))}
          rows={3}
          className={`w-full px-4 py-3 border-2 rounded-xl text-sm font-[var(--font-poppins)] focus:outline-none transition-colors resize-none ${
            (touched.notes || attempted) && !notesValid
              ? "border-red-400 bg-red-50 focus:border-red-500"
              : "border-gray-200 focus:border-tp-red"
          }`}
        />
        {(touched.notes || attempted) && !notesValid && (
          <p className="text-xs text-red-500 mt-1 font-[var(--font-poppins)]">
            {t.address.placeMissing}
          </p>
        )}
      </div>

      {/* Por qué no puedes seguir. Se muestra en cuanto el cliente intenta
          continuar (o ya empezó a llenar): antes el botón gris era la única
          señal y no decía nada. */}
      {!allValid && (attempted || Object.keys(touched).length > 0) && (
        <div role="alert" aria-live="polite" className="rounded-xl border-2 border-amber-300 bg-amber-50 px-4 py-3 mb-4">
          {outsideArea ? (
            <p className="text-sm font-semibold text-amber-800 font-[var(--font-poppins)]">
              {t.address.outsideAlert(booking.city.trim() || t.address.thatArea)}
            </p>
          ) : (
            <>
              <p className="text-sm font-semibold text-amber-800 font-[var(--font-poppins)]">
                {t.address.stillNeed(missing)}
              </p>
              {!notesValid && (
                <p className="text-xs text-amber-700 mt-1 font-[var(--font-poppins)]">
                  {t.address.placeRequired}
                </p>
              )}
            </>
          )}
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg font-[var(--font-poppins)] font-semibold text-sm text-[#666] bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          {t.common.back}
        </button>
        {/* Sin `disabled`: un botón muerto no explica nada. Si falta algo, el
            clic destapa los avisos y sube al campo que falta. */}
        <button
          onClick={handleNext}
          aria-disabled={!allValid}
          className={`px-8 py-3 rounded-lg font-[var(--font-poppins)] font-semibold text-base transition-all duration-200 ${
            allValid
              ? "bg-tp-red text-white hover:bg-tp-red-dark shadow-md"
              : "bg-gray-200 text-gray-500 hover:bg-gray-300"
          }`}
        >
          {t.address.next}
        </button>
      </div>
    </div>
  );
}
