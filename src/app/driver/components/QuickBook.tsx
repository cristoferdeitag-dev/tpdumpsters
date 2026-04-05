"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";
const AUTH_CODE = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || "";

/* eslint-disable @typescript-eslint/no-explicit-any */

const SERVICE_TYPES = [
  { code: "GD", label: "General Debris" },
  { code: "HJ", label: "Household" },
  { code: "CD", label: "Construction" },
  { code: "RF", label: "Roofing" },
  { code: "GW", label: "Green Waste" },
  { code: "CS", label: "Clean Soil" },
  { code: "CC", label: "Clean Concrete" },
  { code: "MM", label: "Mixed Materials" },
];

const SIZES = ["10", "20", "30"];

type DateOption = "today" | "tomorrow" | "custom";

interface QuickBookProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function QuickBook({ onClose, onSuccess }: QuickBookProps) {
  // Form state
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [size, setSize] = useState("20");
  const [serviceType, setServiceType] = useState("GD");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [dateOption, setDateOption] = useState<DateOption>("today");
  const [customDate, setCustomDate] = useState("");
  const [notes, setNotes] = useState("");

  // Customer autocomplete
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  // Availability
  const [availability, setAvailability] = useState<{ available: number; total: number; warning: string | null } | null>(null);

  // UI state
  const [step, setStep] = useState(1); // 1=info, 2=address, 3=confirm
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Customer search
  const searchCustomers = useCallback(async (query: string) => {
    if (query.length < 2) { setSuggestions([]); return; }
    try {
      const res = await fetch(`/api/customers/search?q=${encodeURIComponent(query)}`, {
        headers: { "x-dashboard-auth": AUTH_CODE },
      });
      const data = await res.json();
      setSuggestions(data.customers || []);
      setShowSuggestions(true);
    } catch { setSuggestions([]); }
  }, []);

  const handleNameChange = (val: string) => {
    setCustomerName(val);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => searchCustomers(val), 300);
  };

  const selectCustomer = (c: any) => {
    setCustomerName(c.name);
    setPhone(c.phone || "");
    if (c.address) setAddress(c.address);
    if (c.city) setCity(c.city);
    if (c.zipCode) setZip(c.zipCode);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  // Google Places
  const addressInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);

  // Load Google Places script (only if not already loaded)
  useEffect(() => {
    if (typeof window === "undefined") return;
    // If already loaded, skip
    if ((window as any).google?.maps?.places) return;
    // If script tag already exists (from another component), skip
    if (document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) return;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  // Init autocomplete when on step 2 — poll for google to be ready
  useEffect(() => {
    if (step !== 2 || !addressInputRef.current) return;
    if (autocompleteRef.current) return; // already initialized

    const initAC = () => {
      if (!(window as any).google?.maps?.places || !addressInputRef.current) return false;

      const ac = new (window as any).google.maps.places.Autocomplete(
        addressInputRef.current,
        {
          types: ["address"],
          componentRestrictions: { country: "us" },
          fields: ["address_components", "formatted_address"],
          bounds: new (window as any).google.maps.LatLngBounds(
            { lat: 37.2, lng: -122.6 },
            { lat: 38.3, lng: -121.5 }
          ),
          strictBounds: true,
        }
      );

      ac.addListener("place_changed", () => {
        const place = ac.getPlace();
        if (place?.address_components) {
          const components = place.address_components;
          const getComp = (type: string) =>
            components.find((c: any) => c.types.includes(type))?.long_name || "";
          
          setAddress(place.formatted_address || "");
          setCity(getComp("locality") || getComp("sublocality_level_1"));
          setZip(getComp("postal_code"));
        }
      });

      autocompleteRef.current = ac;
      return true;
    };

    // Try immediately, then poll every 300ms for up to 5s
    if (!initAC()) {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (initAC() || attempts > 16) clearInterval(interval);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [step]);

  const getDeliveryDate = () => {
    const now = new Date();
    if (dateOption === "today") return now.toISOString().split("T")[0];
    if (dateOption === "tomorrow") {
      const tom = new Date(now);
      tom.setDate(tom.getDate() + 1);
      return tom.toISOString().split("T")[0];
    }
    return customDate;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    try {
      const deliveryDate = getDeliveryDate();
      const serviceLabel = SERVICE_TYPES.find((s) => s.code === serviceType)?.label || "General Debris";

      const res = await fetch("/api/manual-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-dashboard-auth": AUTH_CODE,
        },
        body: JSON.stringify({
          customerName,
          phone: phone || undefined,
          email: undefined,
          serviceType: serviceLabel,
          size: `${size}-yard`,
          deliveryDate,
          deliveryWindow: "morning",
          address,
          city,
          zip,
          paymentMethod: "cash",
          notes: notes || `Quick-booked by driver`,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create booking");

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-3xl p-8 text-center max-w-sm w-full">
          <div className="w-20 h-20 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-white mb-2">¡Agendado!</p>
          <p className="text-gray-400">Booking creado + eventos en calendario</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 flex items-end sm:items-center justify-center">
      <div className="bg-gray-900 rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">
            {step === 1 && "📦 Quick Book"}
            {step === 2 && "📍 Dirección"}
            {step === 3 && "✅ Confirmar"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Step indicators */}
        <div className="flex gap-2 px-5 pt-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                s <= step ? "bg-red-500" : "bg-gray-700"
              }`}
            />
          ))}
        </div>

        <div className="p-5 space-y-5">
          {/* ── STEP 1: Customer + Service ── */}
          {step === 1 && (
            <>
              {/* Customer Name with autocomplete */}
              <div className="relative">
                <label className="text-sm text-gray-400 mb-1.5 block">Nombre del cliente</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onFocus={() => { if (suggestions.length) setShowSuggestions(true); }}
                  placeholder="Escribe para buscar cliente..."
                  className="w-full bg-gray-800 text-white text-lg rounded-xl px-4 py-3.5 border border-gray-700 focus:border-red-500 focus:outline-none"
                  autoFocus
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-xl overflow-hidden z-50 max-h-48 overflow-y-auto shadow-xl">
                    {suggestions.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => selectCustomer(c)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-700 active:bg-gray-600 border-b border-gray-700 last:border-0 transition-colors"
                      >
                        <p className="text-white font-medium">{c.name}</p>
                        <p className="text-gray-400 text-xs">
                          {c.phone && `📞 ${c.phone}`}
                          {c.city && ` · 📍 ${c.city}`}
                          {c.lastSize && ` · 🗑️ ${c.lastSize}`}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Phone (optional) */}
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Teléfono (opcional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(510) 555-1234"
                  className="w-full bg-gray-800 text-white text-lg rounded-xl px-4 py-3.5 border border-gray-700 focus:border-red-500 focus:outline-none"
                />
              </div>

              {/* Dumpster Size - BIG BUTTONS */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Tamaño</label>
                <div className="grid grid-cols-3 gap-3">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`py-4 rounded-xl text-center font-bold text-xl transition-all ${
                        size === s
                          ? "bg-red-500 text-white shadow-lg shadow-red-500/30 scale-105"
                          : "bg-gray-800 text-gray-300 border border-gray-700 hover:border-red-500"
                      }`}
                    >
                      {s}
                      <span className="block text-xs font-normal mt-0.5 opacity-70">yard</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Tipo de servicio</label>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICE_TYPES.map((st) => (
                    <button
                      key={st.code}
                      onClick={() => setServiceType(st.code)}
                      className={`py-3 px-3 rounded-xl text-sm font-medium transition-all ${
                        serviceType === st.code
                          ? "bg-red-500 text-white"
                          : "bg-gray-800 text-gray-300 border border-gray-700 hover:border-red-500"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (!customerName.trim()) { setError("Nombre requerido"); return; }
                  setError("");
                  setStep(2);
                }}
                className="w-full bg-red-500 text-white font-bold text-lg py-4 rounded-xl hover:bg-red-600 transition-all"
              >
                Siguiente →
              </button>
            </>
          )}

          {/* ── STEP 2: Address + Date ── */}
          {step === 2 && (
            <>
              {/* Address with autocomplete */}
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Dirección de entrega</label>
                <input
                  ref={addressInputRef}
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Empieza a escribir la dirección..."
                  className="w-full bg-gray-800 text-white text-lg rounded-xl px-4 py-3.5 border border-gray-700 focus:border-red-500 focus:outline-none"
                  autoFocus
                />
                {city && (
                  <p className="text-sm text-gray-500 mt-1">📍 {city} {zip}</p>
                )}
              </div>

              {/* Date - BIG BUTTONS */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Fecha de entrega</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setDateOption("today")}
                    className={`py-4 rounded-xl text-center font-bold transition-all ${
                      dateOption === "today"
                        ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                        : "bg-gray-800 text-gray-300 border border-gray-700"
                    }`}
                  >
                    Hoy
                    <span className="block text-xs font-normal mt-0.5 opacity-70">
                      {new Date().toLocaleDateString("es", { month: "short", day: "numeric" })}
                    </span>
                  </button>
                  <button
                    onClick={() => setDateOption("tomorrow")}
                    className={`py-4 rounded-xl text-center font-bold transition-all ${
                      dateOption === "tomorrow"
                        ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                        : "bg-gray-800 text-gray-300 border border-gray-700"
                    }`}
                  >
                    Mañana
                    <span className="block text-xs font-normal mt-0.5 opacity-70">
                      {(() => { const d = new Date(); d.setDate(d.getDate()+1); return d.toLocaleDateString("es", { month: "short", day: "numeric" }); })()}
                    </span>
                  </button>
                  <button
                    onClick={() => setDateOption("custom")}
                    className={`py-4 rounded-xl text-center font-bold transition-all ${
                      dateOption === "custom"
                        ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                        : "bg-gray-800 text-gray-300 border border-gray-700"
                    }`}
                  >
                    Otra
                    <span className="block text-xs font-normal mt-0.5 opacity-70">📅</span>
                  </button>
                </div>
                {dateOption === "custom" && (
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="w-full bg-gray-800 text-white text-lg rounded-xl px-4 py-3 mt-3 border border-gray-700 focus:border-red-500 focus:outline-none"
                  />
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Notas (opcional)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Dejar al lado del garaje..."
                  className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-800 text-gray-300 font-bold text-lg py-4 rounded-xl hover:bg-gray-700 transition-all"
                >
                  ← Atrás
                </button>
                <button
                  onClick={async () => {
                    if (!address.trim()) { setError("Dirección requerida"); return; }
                    setError("");
                    // Check availability
                    try {
                      const dateStr = getDeliveryDate();
                      const res = await fetch(`/api/availability?size=${size}&date=${dateStr}`, {
                        headers: { "x-dashboard-auth": AUTH_CODE },
                      });
                      const data = await res.json();
                      setAvailability(data);
                    } catch { setAvailability(null); }
                    setStep(3);
                  }}
                  className="flex-1 bg-red-500 text-white font-bold text-lg py-4 rounded-xl hover:bg-red-600 transition-all"
                >
                  Siguiente →
                </button>
              </div>
            </>
          )}

          {/* ── STEP 3: Confirm ── */}
          {step === 3 && (
            <>
              {/* Availability warning */}
              {availability && availability.warning === "none_available" && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-start gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <p className="text-red-400 font-bold">No hay {size}-yard disponibles</p>
                    <p className="text-red-300 text-sm">Todos los {size}-yard están desplegados. Puedes continuar pero no habrá dumpster asignado.</p>
                  </div>
                </div>
              )}
              {availability && availability.warning === "low_stock" && (
                <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-4 flex items-start gap-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <p className="text-yellow-400 font-bold">Solo {availability.available} de {availability.total} disponibles</p>
                    <p className="text-yellow-300 text-sm">Quedan pocos {size}-yard. Confirma rápido.</p>
                  </div>
                </div>
              )}
              {availability && !availability.warning && availability.available > 0 && (
                <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-3 flex items-center gap-2">
                  <span className="text-lg">✅</span>
                  <p className="text-green-400 text-sm font-medium">{availability.available} de {availability.total} {size}-yard disponibles</p>
                </div>
              )}

              <div className="bg-gray-800 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Cliente</span>
                  <span className="text-white font-bold">{customerName}</span>
                </div>
                {phone && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Teléfono</span>
                    <span className="text-white">{phone}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Dumpster</span>
                  <span className="text-white font-bold">{size}-yard {SERVICE_TYPES.find(s => s.code === serviceType)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Dirección</span>
                  <span className="text-white text-right max-w-[60%]">{address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fecha</span>
                  <span className="text-white font-bold">
                    {dateOption === "today" && "Hoy"}
                    {dateOption === "tomorrow" && "Mañana"}
                    {dateOption === "custom" && customDate}
                    {" "}{getDeliveryDate()}
                  </span>
                </div>
                {notes && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Notas</span>
                    <span className="text-white text-right max-w-[60%]">{notes}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-gray-700">
                  <span className="text-gray-400">Pago</span>
                  <span className="text-yellow-400 font-bold">💰 Cash/Zelle</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-800 text-gray-300 font-bold text-lg py-4 rounded-xl hover:bg-gray-700 transition-all"
                >
                  ← Atrás
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 bg-green-500 text-white font-bold text-lg py-4 rounded-xl hover:bg-green-600 transition-all disabled:opacity-50"
                >
                  {submitting ? "Creando..." : "✅ Confirmar"}
                </button>
              </div>
            </>
          )}

          {error && (
            <p className="text-red-400 text-center text-sm bg-red-500/10 rounded-xl py-2">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
