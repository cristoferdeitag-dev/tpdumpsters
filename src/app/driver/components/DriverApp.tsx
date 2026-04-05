"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import QuickBook from "./QuickBook";

const AUTH_CODE = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || "";
const API = "/api/dashboard";

interface Dumpster {
  id: string;
  size: string;
  status: string;
  address?: string;
  city?: string;
  customer?: string;
  phone?: string;
  service_type?: string;
  delivery_date?: string;
  pickup_date?: string;
  notes?: string;
}

type JobType = "delivery" | "pickup";

interface Job {
  dumpster: Dumpster;
  type: JobType;
}

export default function DriverApp() {
  const [code, setCode] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [gpsStatus, setGpsStatus] = useState<string>("");
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [completedToday, setCompletedToday] = useState(0);

  // Photo capture state
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState<{ job: Job } | null>(null);
  const [photoCaptured, setPhotoCaptured] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  // PWA install prompt
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  // Expanded job
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  // Quick Book modal
  const [showQuickBook, setShowQuickBook] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowInstallBanner(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result.outcome === "accepted") {
      setShowInstallBanner(false);
    }
    setInstallPrompt(null);
  };

  const fetchData = useCallback(async () => {
    try {
      setRefreshing(true);
      const res = await fetch(API, {
        headers: { "x-dashboard-auth": AUTH_CODE },
      });
      const data = await res.json();
      if (data.dumpsters) {
        const todayJobs: Job[] = [];
        data.dumpsters.forEach((d: Dumpster) => {
          if (d.status === "en-route") todayJobs.push({ dumpster: d, type: "delivery" });
          if (d.status === "pickup-scheduled") todayJobs.push({ dumpster: d, type: "pickup" });
        });
        todayJobs.sort((a, b) => {
          const p: Record<string, number> = { "en-route": 0, "pickup-scheduled": 1 };
          return (p[a.dumpster.status] || 9) - (p[b.dumpster.status] || 9);
        });
        setJobs(todayJobs);

        const today = new Date().toISOString().slice(0, 10);
        const completed = data.dumpsters.filter((d: Dumpster) =>
          d.status === "deployed" && d.delivery_date?.startsWith(today)
        ).length;
        setCompletedToday(completed);
      }
      setLastRefresh(new Date());
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { if (authenticated) fetchData(); }, [authenticated, fetchData]);
  useEffect(() => {
    if (!authenticated) return;
    const i = setInterval(fetchData, 30000);
    return () => clearInterval(i);
  }, [authenticated, fetchData]);

  const getGPS = (): Promise<{ lat: number; lng: number } | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) { setGpsStatus("GPS no disponible"); resolve(null); return; }
      setGpsStatus("Obteniendo ubicación...");
      navigator.geolocation.getCurrentPosition(
        (pos) => { setGpsStatus(""); resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }); },
        () => { setGpsStatus(""); resolve(null); },
        { enableHighAccuracy: true, timeout: 15000 }
      );
    });
  };

  const startPhotoCapture = (job: Job) => {
    setShowCamera({ job });
    setPhotoData(null);
    fileInputRef.current?.click();
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoData(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const confirmAction = async () => {
    if (!showCamera) return;
    const job = showCamera.job;
    setShowCamera(null);
    setPhotoData(null);
    setPhotoCaptured(prev => new Set(prev).add(job.dumpster.id));
    await executeAction(job);
  };

  const cancelPhoto = () => { setShowCamera(null); setPhotoData(null); };

  const executeAction = async (job: Job) => {
    const id = job.dumpster.id;
    setActionLoading(id);
    try {
      const loc = await getGPS();
      const updates: Record<string, unknown> = {};
      if (job.type === "delivery") {
        updates.status = "deployed";
        if (loc) { updates.lat = loc.lat; updates.lng = loc.lng; }
        const ts = new Date().toLocaleString("es-MX");
        updates.notes = job.dumpster.notes ? `${job.dumpster.notes} | Foto ${ts}` : `Foto ${ts}`;
      } else {
        updates.status = "yard";
        updates.lat = null; updates.lng = null;
        updates.customer = ""; updates.address = ""; updates.city = "";
        updates.phone = ""; updates.delivery_date = ""; updates.pickup_date = "";
        updates.service_type = ""; updates.notes = "";
      }

      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-dashboard-auth": AUTH_CODE },
        body: JSON.stringify({ action: "update", id, ...updates }),
      });

      if (job.dumpster.phone) {
        fetch("/api/driver/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-dashboard-auth": AUTH_CODE },
          body: JSON.stringify({
            action: job.type === "delivery" ? "delivered" : "picked-up",
            customerName: job.dumpster.customer || "",
            customerPhone: job.dumpster.phone,
            dumpsterSize: job.dumpster.size,
            address: job.dumpster.address || "",
            city: job.dumpster.city || "",
          }),
        }).catch(() => {});
      }

      setSuccessId(id);
      setTimeout(() => { setSuccessId(null); setGpsStatus(""); fetchData(); }, 2000);
    } catch (err) {
      console.error("Action error:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogin = () => {
    if (code === AUTH_CODE) { setAuthenticated(true); setCodeError(""); }
    else { setCodeError("Código incorrecto"); }
  };

  const formatTime = (d: Date) => d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });

  const formatDate = (s?: string) => {
    if (!s) return "";
    try { const d = new Date(s); return isNaN(d.getTime()) ? s : d.toLocaleDateString("es-MX", { month: "short", day: "numeric" }); }
    catch { return s; }
  };

  // ══════════ LOGIN ══════════
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-5">
              <span className="text-black font-black text-2xl tracking-tighter">TP</span>
            </div>
            <h1 className="text-white text-2xl font-semibold tracking-tight">TP Driver</h1>
            <p className="text-neutral-500 text-sm mt-1">Ingresa tu código para continuar</p>
          </div>

          {/* Input */}
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Código de acceso"
            className="w-full px-4 py-4 rounded-xl bg-neutral-900 text-white text-center text-lg tracking-widest border border-neutral-800 focus:border-white/30 outline-none transition-colors placeholder:text-neutral-600 placeholder:tracking-normal"
          />
          {codeError && (
            <p className="text-red-400 text-sm text-center mt-2">{codeError}</p>
          )}

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full mt-4 py-4 bg-white text-black text-lg font-semibold rounded-xl active:bg-neutral-200 transition-colors"
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  const deliveryCount = jobs.filter(j => j.type === "delivery").length;
  const pickupCount = jobs.filter(j => j.type === "pickup").length;

  // ══════════ MAIN VIEW ══════════
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Quick Book Modal */}
      {showQuickBook && (
        <QuickBook
          onClose={() => setShowQuickBook(false)}
          onSuccess={() => fetchData()}
        />
      )}

      {/* Hidden camera input */}
      <input ref={fileInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handlePhotoCapture} />

      {/* ── Photo Modal ── */}
      {showCamera && (
        <div className="fixed inset-0 bg-black z-[60] flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between p-4 pt-6">
            <button onClick={cancelPhoto} className="text-neutral-400 text-sm font-medium">
              Cancelar
            </button>
            <span className="text-white font-semibold">
              {showCamera.job.type === "delivery" ? "Confirmar Entrega" : "Confirmar Recolección"}
            </span>
            <div className="w-16" />
          </div>

          {/* Photo preview */}
          <div className="flex-1 flex items-center justify-center px-6">
            {photoData ? (
              <img src={photoData} alt="Preview" className="max-w-full max-h-[55vh] rounded-2xl object-cover" />
            ) : (
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-neutral-900 flex items-center justify-center mx-auto mb-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-500">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
                <p className="text-neutral-400 text-base">Toma una foto del dumpster</p>
                <p className="text-neutral-600 text-sm mt-1">Opcional — puedes continuar sin foto</p>
              </div>
            )}
          </div>

          {/* Bottom actions */}
          <div className="p-5 pb-8 space-y-3">
            <button
              onClick={confirmAction}
              className="w-full py-4 bg-white text-black text-lg font-semibold rounded-xl active:bg-neutral-200 transition-colors"
            >
              Confirmar
            </button>
            {photoData ? (
              <button
                onClick={() => { setPhotoData(null); fileInputRef.current?.click(); }}
                className="w-full py-4 bg-neutral-900 text-white text-base font-medium rounded-xl active:bg-neutral-800 transition-colors"
              >
                Tomar otra foto
              </button>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 bg-neutral-900 text-white text-base font-medium rounded-xl active:bg-neutral-800 transition-colors"
              >
                Abrir cámara
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Install Banner ── */}
      {showInstallBanner && (
        <div className="bg-neutral-900 border-b border-neutral-800 px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-neutral-300">Instala la app para acceso rápido</span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleInstall}
              className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold active:bg-neutral-200"
            >
              Instalar
            </button>
            <button onClick={() => setShowInstallBanner(false)} className="text-neutral-600 text-lg">✕</button>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-neutral-900">
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">TP Driver</h1>
              <p className="text-neutral-500 text-xs mt-0.5 capitalize">
                {new Date().toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" })}
              </p>
            </div>
            <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQuickBook(true)}
              className="h-10 px-4 rounded-full bg-red-500 flex items-center justify-center gap-1.5 active:bg-red-600 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span className="text-white text-xs font-bold">Agendar</span>
            </button>
            <button
              onClick={fetchData}
              disabled={refreshing}
              className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center active:bg-neutral-800 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-neutral-400 ${refreshing ? "animate-spin" : ""}`}>
                <path d="M1 4v6h6" /><path d="M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" />
              </svg>
            </button>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex gap-3 mt-3">
            <div className="flex items-center gap-1.5 bg-neutral-900 rounded-full px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-xs text-neutral-300">{deliveryCount} {deliveryCount === 1 ? "entrega" : "entregas"}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-900 rounded-full px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs text-neutral-300">{pickupCount} {pickupCount === 1 ? "recolección" : "recolecciones"}</span>
            </div>
            {completedToday > 0 && (
              <div className="flex items-center gap-1.5 bg-neutral-900 rounded-full px-3 py-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs text-neutral-300">{completedToday} listo{completedToday > 1 ? "s" : ""}</span>
              </div>
            )}
          </div>
        </div>

        {/* GPS Status */}
        {gpsStatus && (
          <div className="px-5 pb-3">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              {gpsStatus}
            </div>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="px-4 py-4 space-y-3 pb-20">
        {loading ? (
          <div className="text-center py-24">
            <div className="w-12 h-12 border-2 border-neutral-700 border-t-white rounded-full animate-spin mx-auto" />
            <p className="text-neutral-500 text-sm mt-4">Cargando...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white">Todo en orden</h2>
            <p className="text-neutral-500 text-sm mt-1">No hay servicios pendientes</p>
            <button
              onClick={fetchData}
              className="mt-6 px-6 py-2.5 bg-neutral-900 rounded-full text-neutral-300 text-sm font-medium active:bg-neutral-800"
            >
              Actualizar
            </button>
          </div>
        ) : (
          jobs.map((job) => {
            const d = job.dumpster;
            const isDelivery = job.type === "delivery";
            const isLoading = actionLoading === d.id;
            const isSuccess = successId === d.id;
            const isExpanded = expandedJob === `${d.id}-${job.type}`;
            const jobKey = `${d.id}-${job.type}`;

            return (
              <div
                key={jobKey}
                className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                  isSuccess
                    ? "bg-green-500/10 ring-1 ring-green-500/30"
                    : "bg-neutral-900"
                }`}
              >
                {/* Card Header — tappable to expand */}
                <button
                  onClick={() => setExpandedJob(isExpanded ? null : jobKey)}
                  className="w-full px-4 py-4 flex items-center gap-4 text-left active:bg-neutral-800/50 transition-colors"
                >
                  {/* Type indicator */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isSuccess ? "bg-green-500/20" : isDelivery ? "bg-blue-500/15" : "bg-amber-500/15"
                  }`}>
                    {isSuccess ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-green-500">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : isDelivery ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-400">
                        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
                      </svg>
                    ) : (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400">
                        <path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
                        <path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1zM7 21h10M12 3v18M12 3a8 8 0 004 7M12 3a8 8 0 00-4 7" />
                      </svg>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-base">
                        {isDelivery ? "Entrega" : "Recolección"}
                      </span>
                      <span className="text-neutral-600 text-xs font-mono">{d.id}</span>
                    </div>
                    <p className="text-neutral-400 text-sm mt-0.5 truncate">
                      {d.customer || "Sin cliente"}{d.address ? ` · ${d.city || ""}` : ""}
                    </p>
                  </div>

                  {/* Size badge */}
                  <div className="flex-shrink-0 flex items-center gap-2">
                    <span className="bg-white text-black text-sm font-bold px-3 py-1 rounded-lg">
                      {d.size}yd
                    </span>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      className={`text-neutral-600 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </button>

                {/* Expanded details */}
                {isExpanded && !isSuccess && (
                  <div className="px-4 pb-4 space-y-3 border-t border-neutral-800 pt-3">
                    {/* Service type + date */}
                    <div className="flex flex-wrap gap-2">
                      {d.service_type && (
                        <span className="text-xs text-neutral-400 bg-neutral-800 rounded-lg px-2.5 py-1">
                          {d.service_type}
                        </span>
                      )}
                      {isDelivery && d.delivery_date && (
                        <span className="text-xs text-blue-400 bg-blue-500/10 rounded-lg px-2.5 py-1">
                          {formatDate(d.delivery_date)}
                        </span>
                      )}
                      {!isDelivery && d.pickup_date && (
                        <span className="text-xs text-amber-400 bg-amber-500/10 rounded-lg px-2.5 py-1">
                          {formatDate(d.pickup_date)}
                        </span>
                      )}
                    </div>

                    {/* Customer */}
                    {d.customer && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-semibold text-neutral-400">
                            {d.customer.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-white text-sm font-medium">{d.customer}</span>
                      </div>
                    )}

                    {/* Address */}
                    {d.address && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-neutral-400">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                          </svg>
                        </div>
                        <span className="text-neutral-300 text-sm leading-5">
                          {d.address}{d.city ? `, ${d.city}` : ""}
                        </span>
                      </div>
                    )}

                    {/* Phone */}
                    {d.phone && (
                      <a href={`tel:${d.phone}`} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-green-500">
                            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                          </svg>
                        </div>
                        <span className="text-green-400 text-sm font-medium">{d.phone}</span>
                      </a>
                    )}

                    {/* Notes */}
                    {d.notes && (
                      <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl px-3 py-2.5">
                        <p className="text-amber-200/80 text-xs">{d.notes}</p>
                      </div>
                    )}

                    {/* Navigation buttons */}
                    {d.address && (
                      <div className="flex gap-2 pt-1">
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(d.address + (d.city ? ", " + d.city : ""))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 bg-neutral-800 text-neutral-300 py-3 rounded-xl text-sm font-medium active:bg-neutral-700 transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          Ver mapa
                        </a>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(d.address + (d.city ? ", " + d.city : ""))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold active:bg-blue-700 transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                            <path d="M3 11l19-9-9 19-2-8-8-2z" />
                          </svg>
                          Navegar
                        </a>
                      </div>
                    )}

                    {/* Action button */}
                    <button
                      onClick={() => startPhotoCapture(job)}
                      disabled={isLoading}
                      className="w-full py-4 bg-white text-black text-base font-semibold rounded-xl active:bg-neutral-200 transition-colors disabled:opacity-50 mt-1"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-neutral-400 border-t-black rounded-full animate-spin" />
                          Guardando...
                        </span>
                      ) : isDelivery ? (
                        "Marcar como entregado"
                      ) : (
                        "Marcar como recogido"
                      )}
                    </button>
                  </div>
                )}

                {/* Success state */}
                {isSuccess && (
                  <div className="px-4 pb-4">
                    <div className="flex items-center justify-center gap-2 py-2 text-green-400 text-sm font-medium">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      Completado
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ── Bottom Bar ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-neutral-900 px-5 py-3 pb-6">
        <div className="flex items-center justify-between">
          <p className="text-neutral-600 text-xs">
            {formatTime(lastRefresh)}
          </p>
          <p className="text-neutral-600 text-xs">
            {jobs.length} pendiente{jobs.length !== 1 ? "s" : ""} · {completedToday} completado{completedToday !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
