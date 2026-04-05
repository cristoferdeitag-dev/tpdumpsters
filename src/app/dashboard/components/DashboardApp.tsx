"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import InstallPrompt from "@/components/InstallPrompt";

const AUTH_CODE = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || "";
const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";

interface Dumpster {
  id: string;
  size: string;
  status: "yard" | "en-route" | "deployed" | "pickup-scheduled";
  address?: string;
  city?: string;
  customer?: string;
  phone?: string;
  serviceType?: string;
  deliveryDate?: string;
  pickupDate?: string;
  notes?: string;
  lat?: number;
  lng?: number;
  updatedAt: string;
}

interface Stats {
  total: number;
  yard: number;
  enRoute: number;
  deployed: number;
  pickupScheduled: number;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; dotClass: string }> = {
  yard: { label: "In Yard", color: "#22c55e", dotClass: "bg-green-500" },
  "en-route": { label: "En Route", color: "#3b82f6", dotClass: "bg-blue-500" },
  deployed: { label: "Deployed", color: "#f97316", dotClass: "bg-orange-500" },
  "pickup-scheduled": { label: "Pickup", color: "#a855f7", dotClass: "bg-purple-500" },
};

// SVG Icon components
function IconMap({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  );
}

function IconList({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function IconSync({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

function IconPlus({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function IconCalendar({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconUser({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconPin({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconPhone({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconTruck({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function IconTrash({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function IconEdit({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function IconChat({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconChevron({ className = "w-4 h-4", direction = "down" }: { className?: string; direction?: "down" | "up" }) {
  return (
    <svg className={`${className} transition-transform duration-200 ${direction === "up" ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IconNote({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function IconGps({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /><line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" />
    </svg>
  );
}

function IconBox({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function IconMore({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="19" r="2" />
    </svg>
  );
}

export default function DashboardApp() {
  const [authenticated, setAuthenticated] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [dumpsters, setDumpsters] = useState<Dumpster[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, yard: 0, enRoute: 0, deployed: 0, pickupScheduled: 0 });
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"list" | "map">("list");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showManualBooking, setShowManualBooking] = useState(false);
  const [editDumpster, setEditDumpster] = useState<Dumpster | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dashboard", {
        headers: { "x-dashboard-auth": AUTH_CODE },
      });
      const data = await res.json();
      setDumpsters(data.dumpsters || []);
      setStats(data.stats || { total: 0, yard: 0, enRoute: 0, deployed: 0, pickupScheduled: 0 });
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Register service worker for PWA
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchData();
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }
  }, [authenticated, fetchData]);

  const handleLogin = () => {
    if (code === AUTH_CODE) {
      setAuthenticated(true);
      setCodeError("");
    } else {
      setCodeError("Codigo incorrecto");
    }
  };

  const getCurrentLocation = (): Promise<{ lat: number; lng: number } | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => resolve(null),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  };

  const updateDumpster = async (id: string, updates: Record<string, unknown>) => {
    try {
      if (updates.status === "deployed" || updates.status === "en-route") {
        const loc = await getCurrentLocation();
        if (loc) {
          updates.lat = loc.lat;
          updates.lng = loc.lng;
        }
      }

      await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-dashboard-auth": AUTH_CODE },
        body: JSON.stringify({ action: "update", id, ...updates }),
      });
      await fetchData();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const addDumpster = async (size: string, notes?: string) => {
    try {
      const res = await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-dashboard-auth": AUTH_CODE },
        body: JSON.stringify({ action: "add", size, notes }),
      });
      const data = await res.json();
      if (data.ok) {
        await fetchData();
        setShowAddModal(false);
      }
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const deleteDumpster = async (id: string) => {
    if (!confirm(`Delete dumpster ${id}?`)) return;
    try {
      await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-dashboard-auth": AUTH_CODE },
        body: JSON.stringify({ action: "delete", id }),
      });
      await fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filtered = filter === "all" ? dumpsters : dumpsters.filter((d) => d.status === filter);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });

  // ── Login Screen ──────────────────────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-black text-2xl font-black tracking-tight">TP</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Fleet Dashboard</h1>
            <p className="text-neutral-500 text-sm mt-1">TP Dumpsters</p>
          </div>
          <input
            type="password"
            placeholder="Access code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full bg-neutral-900 rounded-xl px-4 py-3.5 text-white text-center text-lg tracking-widest focus:outline-none focus:ring-1 focus:ring-neutral-700 mb-3 placeholder:text-neutral-600"
          />
          {codeError && <p className="text-red-400 text-sm text-center mb-3">{codeError}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-white hover:bg-neutral-200 text-black font-bold py-3.5 rounded-xl transition-colors"
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  // ── Main Dashboard ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-xl border-b border-neutral-900 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div>
          <h1 className="text-lg font-bold leading-tight">Fleet Dashboard</h1>
          <p className="text-xs text-neutral-500">{today}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView(view === "list" ? "map" : "list")}
            className="bg-neutral-900 hover:bg-neutral-800 px-3 py-2 rounded-xl text-sm transition-colors flex items-center gap-1.5"
          >
            {view === "list" ? <><IconMap /> Map</> : <><IconList /> List</>}
          </button>
          <button
            onClick={async () => {
              if (!confirm("Sync today's services from Google Calendar?")) return;
              try {
                const res = await fetch("/api/calendar-sync", {
                  method: "POST",
                  headers: { "Content-Type": "application/json", "x-dashboard-auth": AUTH_CODE },
                  body: JSON.stringify({}),
                });
                const data = await res.json();
                const msgs = data.results?.map((r: { status: string }) => r.status).join("\n") || "No events";
                alert(`Calendar Sync\n${data.events} events found\n\n${msgs}`);
                await fetchData();
              } catch (err) {
                alert("Error syncing calendar");
                console.error(err);
              }
            }}
            className="bg-neutral-900 hover:bg-neutral-800 px-3 py-2 rounded-xl text-sm transition-colors flex items-center gap-1.5"
          >
            <IconSync /> Sync
          </button>
          <a
            href="/internal/customers"
            className="bg-neutral-900 hover:bg-neutral-800 px-3 py-2 rounded-xl text-sm transition-colors flex items-center gap-1.5"
          >
            <IconUser /> Customers
          </a>
          <button
            onClick={() => setShowManualBooking(true)}
            className="bg-neutral-900 hover:bg-neutral-800 px-3 py-2 rounded-xl text-sm transition-colors flex items-center gap-1.5"
          >
            <IconCalendar /> Booking
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-white hover:bg-neutral-200 text-black px-3 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-1.5"
          >
            <IconPlus /> Add
          </button>
        </div>
      </header>

      {/* Stats Pills */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        <StatPill label="Total" value={stats.total} color="#737373" active={filter === "all"} onClick={() => setFilter("all")} />
        <StatPill label="Yard" value={stats.yard} color="#22c55e" active={filter === "yard"} onClick={() => setFilter("yard")} />
        <StatPill label="En Route" value={stats.enRoute} color="#3b82f6" active={filter === "en-route"} onClick={() => setFilter("en-route")} />
        <StatPill label="Deployed" value={stats.deployed} color="#f97316" active={filter === "deployed"} onClick={() => setFilter("deployed")} />
        <StatPill label="Pickup" value={stats.pickupScheduled} color="#a855f7" active={filter === "pickup-scheduled"} onClick={() => setFilter("pickup-scheduled")} />
      </div>

      {/* Content */}
      <div className="px-4 pb-20">
        {loading && dumpsters.length === 0 ? (
          <div className="text-center py-20 text-neutral-600">Loading...</div>
        ) : dumpsters.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-neutral-700 mb-4 flex justify-center">
              <IconBox className="w-16 h-16" />
            </div>
            <h2 className="text-xl font-bold text-neutral-300 mb-2">No dumpsters yet</h2>
            <p className="text-neutral-600 mb-6">Add your dumpster inventory to start tracking</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-white hover:bg-neutral-200 text-black px-6 py-3 rounded-xl font-bold transition-colors inline-flex items-center gap-2"
            >
              <IconPlus /> Add First Dumpster
            </button>
          </div>
        ) : view === "list" ? (
          <div className="space-y-2">
            {filtered.map((d) => (
              <DumpsterCard
                key={d.id}
                dumpster={d}
                onStatusChange={(status) => updateDumpster(d.id, { status })}
                onEdit={() => setEditDumpster(d)}
                onDelete={() => deleteDumpster(d.id)}
              />
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-neutral-600 py-10">No dumpsters with this status</p>
            )}
          </div>
        ) : (
          <MapView dumpsters={filtered} apiKey={GOOGLE_MAPS_KEY} />
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && <AddDumpsterModal onAdd={addDumpster} onClose={() => setShowAddModal(false)} />}

      {/* Edit Modal */}
      {editDumpster && (
        <EditDumpsterModal
          dumpster={editDumpster}
          onSave={async (updates) => {
            await updateDumpster(editDumpster.id, updates);
            setEditDumpster(null);
          }}
          onClose={() => setEditDumpster(null)}
        />
      )}

      {/* Manual Booking Modal */}
      {showManualBooking && (
        <ManualBookingModal
          onClose={() => setShowManualBooking(false)}
          onSuccess={() => {
            setShowManualBooking(false);
            fetchData();
          }}
        />
      )}

      {/* Chat with AI Assistant */}
      <a
        href="https://t.me/Tp_Services_bot"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-neutral-900 hover:bg-neutral-800 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 z-50"
        title="Chat with TP Assistant"
      >
        <IconChat className="w-6 h-6 text-white" />
      </a>

      <InstallPrompt appName="TP Dumpsters Manager" />
    </div>
  );
}

// ── Stat Pill ─────────────────────────────────────────────────────────────
function StatPill({ label, value, color, active, onClick }: {
  label: string; value: number; color: string; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
        active
          ? "bg-neutral-900 ring-1 ring-neutral-700"
          : "bg-neutral-900/50 hover:bg-neutral-900"
      }`}
    >
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
      <span className="text-white font-bold">{value}</span>
      <span className="text-neutral-500">{label}</span>
    </button>
  );
}

// ── Dumpster Card ────────────────────────────────────────────────────────
function DumpsterCard({ dumpster: d, onStatusChange, onEdit, onDelete }: {
  dumpster: Dumpster;
  onStatusChange: (status: string) => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const cfg = STATUS_CONFIG[d.status] || STATUS_CONFIG.yard;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-neutral-900 rounded-2xl overflow-hidden transition-all duration-200">
      {/* Compact Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <span className="text-black text-sm font-black">{d.size}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-white text-sm">{d.id}</p>
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.color }} />
              <span className="text-xs text-neutral-500">{cfg.label}</span>
            </div>
            <p className="text-xs text-neutral-600">{d.size}-yard dumpster</p>
          </div>
        </div>
        <IconChevron className="w-5 h-5 text-neutral-600" direction={expanded ? "up" : "down"} />
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="px-4 pb-4 space-y-3 animate-in fade-in duration-200">
          {/* Details */}
          {(d.customer || d.address || d.serviceType || d.deliveryDate || d.pickupDate || d.notes) && (
            <div className="space-y-2 text-sm">
              {d.customer && (
                <div className="flex items-center gap-2 text-neutral-300">
                  <IconUser className="w-3.5 h-3.5 text-neutral-600" />
                  <span>{d.customer}{d.phone ? ` \u00b7 ${d.phone}` : ""}</span>
                </div>
              )}
              {d.address && (
                <div className="flex items-center gap-2 text-neutral-400">
                  <IconPin className="w-3.5 h-3.5 text-neutral-600" />
                  <span>{d.address}{d.city ? `, ${d.city}` : ""}</span>
                </div>
              )}
              {d.phone && !d.customer && (
                <div className="flex items-center gap-2 text-neutral-400">
                  <IconPhone className="w-3.5 h-3.5 text-neutral-600" />
                  <span>{d.phone}</span>
                </div>
              )}
              {d.serviceType && (
                <div className="flex items-center gap-2 text-neutral-400">
                  <IconTruck className="w-3.5 h-3.5 text-neutral-600" />
                  <span>{d.serviceType}</span>
                </div>
              )}
              {d.deliveryDate && (
                <div className="flex items-center gap-2 text-neutral-400">
                  <IconCalendar className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Delivery: {d.deliveryDate}</span>
                </div>
              )}
              {d.pickupDate && (
                <div className="flex items-center gap-2 text-neutral-400">
                  <IconSync className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Pickup: {d.pickupDate}</span>
                </div>
              )}
              {d.lat && d.lng && (
                <div className="flex items-center gap-2 text-green-500 text-xs">
                  <IconGps className="w-3 h-3" />
                  <span>GPS: {d.lat.toFixed(4)}, {d.lng.toFixed(4)}</span>
                </div>
              )}
              {d.notes && (
                <div className="flex items-start gap-2 text-neutral-500 italic">
                  <IconNote className="w-3.5 h-3.5 text-neutral-600 mt-0.5" />
                  <span>{d.notes}</span>
                </div>
              )}
            </div>
          )}

          {/* Status Change Buttons */}
          <div className="flex gap-2 flex-wrap pt-1">
            {Object.entries(STATUS_CONFIG).map(([key, val]) => (
              key !== d.status && (
                <button
                  key={key}
                  onClick={(e) => { e.stopPropagation(); onStatusChange(key); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-neutral-700 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: val.color }} />
                  {val.label}
                </button>
              )
            ))}
          </div>

          {/* Edit / Delete */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-400 transition-colors"
            >
              <IconEdit className="w-3.5 h-3.5" /> Edit
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-red-900/50 text-neutral-400 hover:text-red-400 transition-colors"
            >
              <IconTrash className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Add Dumpster Modal ───────────────────────────────────────────────────
function AddDumpsterModal({ onAdd, onClose }: { onAdd: (size: string, notes?: string) => void; onClose: () => void }) {
  const [size, setSize] = useState("10");
  const [notes, setNotes] = useState("");
  const [qty, setQty] = useState(1);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-neutral-900 rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Add Dumpster</h2>

        <label className="block text-sm text-neutral-500 mb-2">Size</label>
        <div className="flex gap-2 mb-4">
          {["10", "20", "30"].map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`flex-1 py-3 rounded-xl font-bold text-lg transition-colors ${
                size === s ? "bg-white text-black" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              {s} yd
            </button>
          ))}
        </div>

        <label className="block text-sm text-neutral-500 mb-2">Quantity</label>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 bg-neutral-800 rounded-xl text-xl hover:bg-neutral-700 transition-colors flex items-center justify-center">&minus;</button>
          <span className="text-2xl font-bold w-10 text-center">{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="w-10 h-10 bg-neutral-800 rounded-xl text-xl hover:bg-neutral-700 transition-colors flex items-center justify-center">+</button>
        </div>

        <label className="block text-sm text-neutral-500 mb-2">Notes (optional)</label>
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Blue dumpster, new"
          className="w-full bg-neutral-800 rounded-xl px-4 py-2.5 text-white mb-6 focus:outline-none focus:ring-1 focus:ring-neutral-600 placeholder:text-neutral-600"
        />

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 bg-neutral-800 hover:bg-neutral-700 py-3 rounded-xl font-bold transition-colors">Cancel</button>
          <button
            onClick={() => {
              for (let i = 0; i < qty; i++) onAdd(size, notes || undefined);
            }}
            className="flex-1 bg-white hover:bg-neutral-200 text-black py-3 rounded-xl font-bold transition-colors"
          >
            Add {qty > 1 ? `${qty} Dumpsters` : "Dumpster"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Edit Dumpster Modal ──────────────────────────────────────────────────
function EditDumpsterModal({ dumpster, onSave, onClose }: {
  dumpster: Dumpster;
  onSave: (updates: Record<string, unknown>) => void;
  onClose: () => void;
}) {
  const [customer, setCustomer] = useState(dumpster.customer || "");
  const [phone, setPhone] = useState(dumpster.phone || "");
  const [address, setAddress] = useState(dumpster.address || "");
  const [city, setCity] = useState(dumpster.city || "");
  const [serviceType, setServiceType] = useState(dumpster.serviceType || "");
  const [deliveryDate, setDeliveryDate] = useState(dumpster.deliveryDate || "");
  const [pickupDate, setPickupDate] = useState(dumpster.pickupDate || "");
  const [notes, setNotes] = useState(dumpster.notes || "");

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-neutral-900 rounded-2xl p-6 w-full max-w-md my-8" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Edit {dumpster.id}</h2>

        <div className="space-y-3">
          <Field label="Customer Name" value={customer} onChange={setCustomer} />
          <Field label="Phone" value={phone} onChange={setPhone} type="tel" />
          <Field label="Address" value={address} onChange={setAddress} />
          <Field label="City" value={city} onChange={setCity} />
          <Field label="Service Type" value={serviceType} onChange={setServiceType} placeholder="e.g. General Debris" />
          <Field label="Delivery Date" value={deliveryDate} onChange={setDeliveryDate} type="date" />
          <Field label="Pickup Date" value={pickupDate} onChange={setPickupDate} type="date" />
          <Field label="Notes" value={notes} onChange={setNotes} />
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 bg-neutral-800 hover:bg-neutral-700 py-3 rounded-xl font-bold transition-colors">Cancel</button>
          <button
            onClick={() => onSave({ customer, phone, address, city, serviceType: serviceType || undefined, deliveryDate: deliveryDate || undefined, pickupDate: pickupDate || undefined, notes: notes || undefined })}
            className="flex-1 bg-white hover:bg-neutral-200 text-black py-3 rounded-xl font-bold transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs text-neutral-500 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        className="w-full bg-neutral-800 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-neutral-600 placeholder:text-neutral-600"
      />
    </div>
  );
}

// ── Manual Booking Modal ─────────────────────────────────────────────────
const SERVICE_TYPES = [
  "General Debris",
  "Household Clean Out",
  "Construction Debris",
  "Roofing",
  "Green Waste",
  "Clean Soil",
  "Clean Concrete",
  "Mixed Materials",
];

const HEAVY_MATERIALS = ["Construction Debris", "Roofing", "Clean Soil", "Clean Concrete", "Mixed Materials"];

function ManualBookingModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [dumpsterSize, setDumpsterSize] = useState("20yd");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryWindow, setDeliveryWindow] = useState("morning");
  const [pickupDate, setPickupDate] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Zelle");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (deliveryDate) {
      const d = new Date(deliveryDate + "T00:00:00");
      const days = HEAVY_MATERIALS.includes(serviceType) ? 3 : 7;
      d.setDate(d.getDate() + days);
      setPickupDate(d.toISOString().split("T")[0]);
    }
  }, [deliveryDate, serviceType]);

  const handleSubmit = async () => {
    setError("");
    if (!customerName || !phone || !serviceType || !dumpsterSize || !address || !city || !zipCode || !deliveryDate || !pickupDate || !totalPrice) {
      setError("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/manual-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-dashboard-auth": AUTH_CODE },
        body: JSON.stringify({
          customerName, phone, email, serviceType, dumpsterSize, address, city, zipCode,
          deliveryDate, deliveryWindow, pickupDate, totalPrice: parseFloat(totalPrice),
          paymentMethod, notes,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        alert(`Booking created: ${data.bookingId}\n${data.calendarErrors?.length ? "Calendar warnings: " + data.calendarErrors.join(", ") : "Calendar events created"}`);
        onSuccess();
      } else {
        setError(data.error || "Failed to create booking");
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-neutral-900 rounded-2xl p-6 w-full max-w-lg my-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-1">New Manual Booking</h2>
        <p className="text-neutral-500 text-sm mb-4">For Zelle, cash, or phone payments</p>

        {error && <p className="text-red-400 text-sm mb-3 bg-red-900/20 px-3 py-2 rounded-xl">{error}</p>}

        <div className="space-y-3">
          <Field label="Customer Name *" value={customerName} onChange={setCustomerName} />
          <Field label="Phone *" value={phone} onChange={setPhone} type="tel" />
          <Field label="Email" value={email} onChange={setEmail} type="email" placeholder="Optional" />

          <div>
            <label className="block text-xs text-neutral-500 mb-1">Service Type *</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full bg-neutral-800 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-neutral-600"
            >
              <option value="">Select service type...</option>
              {SERVICE_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-neutral-500 mb-1">Dumpster Size *</label>
            <div className="flex gap-2">
              {["10yd", "20yd", "30yd"].map((s) => (
                <button
                  key={s}
                  onClick={() => setDumpsterSize(s)}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                    dumpsterSize === s ? "bg-white text-black" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <Field label="Address *" value={address} onChange={setAddress} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="City *" value={city} onChange={setCity} />
            <Field label="ZIP Code *" value={zipCode} onChange={setZipCode} />
          </div>

          <Field label="Delivery Date *" value={deliveryDate} onChange={setDeliveryDate} type="date" />

          <div>
            <label className="block text-xs text-neutral-500 mb-1">Delivery Window *</label>
            <div className="flex gap-2">
              {[
                { key: "morning", label: "Morning", sub: "7-11 AM" },
                { key: "midday", label: "Midday", sub: "11AM-3PM" },
                { key: "afternoon", label: "Afternoon", sub: "3-7 PM" },
              ].map((w) => (
                <button
                  key={w.key}
                  onClick={() => setDeliveryWindow(w.key)}
                  className={`flex-1 py-2.5 rounded-xl text-sm transition-colors ${
                    deliveryWindow === w.key ? "bg-white text-black" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                  }`}
                >
                  <div className="font-bold">{w.label}</div>
                  <div className="text-xs opacity-60">{w.sub}</div>
                </button>
              ))}
            </div>
          </div>

          <Field label="Pickup Date *" value={pickupDate} onChange={setPickupDate} type="date" />

          <div className="grid grid-cols-2 gap-3">
            <Field label="Total Price ($) *" value={totalPrice} onChange={setTotalPrice} type="number" placeholder="0.00" />
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-neutral-800 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-neutral-600"
              >
                {["Zelle", "Cash", "Check", "Other"].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          <Field label="Notes" value={notes} onChange={setNotes} placeholder="Optional notes" />
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 bg-neutral-800 hover:bg-neutral-700 py-3 rounded-xl font-bold transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 bg-white hover:bg-neutral-200 disabled:bg-neutral-700 disabled:text-neutral-500 text-black py-3 rounded-xl font-bold transition-colors"
          >
            {submitting ? "Creating..." : "Create Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Map View ─────────────────────────────────────────────────────────────
function MapView({ dumpsters, apiKey }: { dumpsters: Dumpster[]; apiKey: string }) {
  const withLocation = dumpsters.filter((d) => d.lat && d.lng);
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (withLocation.length === 0) return;

    const initMap = () => {
      if (!mapRef.current || !(window as unknown as Record<string, unknown>).google) return;
      const g = (window as unknown as Record<string, unknown>).google as Record<string, unknown>;
      const maps = g.maps as Record<string, unknown>;
      const MapClass = maps.Map as new (el: HTMLElement, opts: Record<string, unknown>) => unknown;
      const MarkerClass = maps.Marker as new (opts: Record<string, unknown>) => unknown;
      const InfoClass = maps.InfoWindow as new (opts: Record<string, unknown>) => { open: (map: unknown, marker: unknown) => void };

      const map = new MapClass(mapRef.current!, {
        center: { lat: withLocation[0].lat!, lng: withLocation[0].lng! },
        zoom: 11,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#212121" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#2c2c2c" }] },
          { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212121" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          { featureType: "transit", stylers: [{ visibility: "off" }] },
        ],
        mapTypeControl: false,
        streetViewControl: false,
        backgroundColor: "#000000",
      });

      withLocation.forEach((d) => {
        const cfg = STATUS_CONFIG[d.status] || STATUS_CONFIG.yard;
        const marker = new MarkerClass({
          position: { lat: d.lat!, lng: d.lng! },
          map,
          title: `${d.id} - ${d.size}yd`,
          icon: {
            path: (maps as Record<string, unknown>).SymbolPath ? ((maps as Record<string, Record<string, unknown>>).SymbolPath.CIRCLE as unknown) : 0,
            scale: 14,
            fillColor: cfg.color,
            fillOpacity: 1,
            strokeColor: "#000",
            strokeWeight: 3,
          },
          label: { text: d.size, color: "#fff", fontSize: "11px", fontWeight: "bold" },
        });

        const info = new InfoClass({
          content: `<div style="padding:8px;font-family:system-ui,sans-serif;background:#171717;color:#fff;border-radius:12px;">
            <strong>${d.id}</strong> (${d.size}yd)<br/>
            <span style="color:${cfg.color};font-weight:bold;">${cfg.label}</span><br/>
            ${d.customer ? `${d.customer}<br/>` : ""}
            ${d.address ? `${d.address}${d.city ? `, ${d.city}` : ""}<br/>` : ""}
            ${d.serviceType ? `${d.serviceType}<br/>` : ""}
          </div>`,
        });

        (marker as unknown as Record<string, (event: string, fn: () => void) => void>).addListener("click", () => {
          info.open(map, marker);
        });
      });

      setMapReady(true);
    };

    if ((window as unknown as Record<string, unknown>).google) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, [withLocation, apiKey]);

  if (withLocation.length === 0) {
    return (
      <div className="rounded-2xl bg-neutral-900 flex items-center justify-center" style={{ height: "60vh" }}>
        <div className="text-center px-6">
          <div className="text-neutral-700 mb-4 flex justify-center">
            <IconPin className="w-12 h-12" />
          </div>
          <h3 className="text-lg font-bold text-neutral-300 mb-2">GPS activates automatically</h3>
          <p className="text-neutral-600 max-w-sm">When you mark a dumpster as <strong className="text-blue-400">&quot;En Route&quot;</strong> or <strong className="text-orange-400">&quot;Deployed&quot;</strong> from your phone, GPS location is captured automatically</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden relative" style={{ height: "60vh" }}>
      <div ref={mapRef} className="w-full h-full" />
      {!mapReady && (
        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center rounded-2xl">
          <p className="text-neutral-600">Loading map...</p>
        </div>
      )}
    </div>
  );
}
