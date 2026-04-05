"use client";

import { useState, useEffect, useMemo } from "react";

const AUTH_CODE = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || "";

interface Booking {
  id: string;
  booking_id: string;
  service_type: string;
  dumpster_size: string;
  total_price: number;
  delivery_date: string;
  pickup_date: string;
  status: string;
  address: string;
  city: string;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  created_at: string;
  stripe_id: string;
  total_revenue: number;
  total_services: number;
  bookings: Booking[];
}

// SVG Icons
function IconSearch({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconUser({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
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

function IconMail({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
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

function IconPackage({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
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

function IconChevron({ className = "w-4 h-4", direction = "down" }: { className?: string; direction?: "down" | "up" }) {
  return (
    <svg className={`${className} transition-transform duration-300 ${direction === "up" ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
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

function IconX({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconBack({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

const STATUS_COLORS: Record<string, string> = {
  confirmed: "bg-green-500",
  pending: "bg-yellow-500",
  completed: "bg-blue-500",
  cancelled: "bg-red-500",
  "pickup-scheduled": "bg-purple-500",
};

function formatDate(dateStr: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatShortDate(dateStr: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatPhone(phone: string) {
  if (!phone) return "";
  const clean = phone.replace(/\D/g, "");
  if (clean.length === 11 && clean[0] === "1") {
    return `+1 (${clean.slice(1, 4)}) ${clean.slice(4, 7)}-${clean.slice(7)}`;
  }
  if (clean.length === 10) {
    return `(${clean.slice(0, 3)}) ${clean.slice(3, 6)}-${clean.slice(6)}`;
  }
  return phone;
}

export default function CustomersApp() {
  const [authed, setAuthed] = useState(false);
  const [authInput, setAuthInput] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [editForm, setEditForm] = useState({ name: "", phone: "", email: "" });
  const [saving, setSaving] = useState(false);

  // Check stored auth
  useEffect(() => {
    const stored = localStorage.getItem("tp-dash-auth");
    if (stored === AUTH_CODE) setAuthed(true);
    else setLoading(false);
  }, []);

  // Fetch customers
  useEffect(() => {
    if (!authed) return;
    fetchCustomers();
  }, [authed]);

  async function fetchCustomers() {
    setLoading(true);
    try {
      const res = await fetch("/api/customers", {
        headers: { "x-dashboard-auth": AUTH_CODE },
      });
      const data = await res.json();
      setCustomers(data.customers || []);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
    }
    setLoading(false);
  }

  function handleLogin() {
    if (authInput === AUTH_CODE) {
      localStorage.setItem("tp-dash-auth", AUTH_CODE);
      setAuthed(true);
    }
  }

  async function handleSave() {
    if (!editCustomer) return;
    setSaving(true);
    try {
      await fetch("/api/customers", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-dashboard-auth": AUTH_CODE },
        body: JSON.stringify({ id: editCustomer.id, ...editForm }),
      });
      setEditCustomer(null);
      await fetchCustomers();
    } catch (err) {
      console.error("Failed to save:", err);
    }
    setSaving(false);
  }

  const filtered = useMemo(() => {
    if (!search.trim()) return customers;
    const q = search.toLowerCase();
    return customers.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.phone?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q)
    );
  }, [customers, search]);

  const stats = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return {
      total: customers.length,
      withBookings: customers.filter((c) => c.bookings.length > 0 || c.total_services > 0).length,
      thisWeek: customers.filter((c) => new Date(c.created_at) >= weekAgo).length,
      totalRevenue: customers.reduce((sum, c) => sum + (c.total_revenue || 0), 0),
    };
  }, [customers]);

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-neutral-900 rounded-2xl p-8 w-full max-w-sm">
          <h1 className="text-xl font-bold text-white mb-1">TP Dumpsters</h1>
          <p className="text-neutral-400 text-sm mb-6">Customer Management</p>
          <input
            type="password"
            placeholder="Enter access code"
            value={authInput}
            onChange={(e) => setAuthInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full bg-neutral-800 text-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-600 mb-4"
            autoFocus
          />
          <button
            onClick={handleLogin}
            className="w-full bg-white text-black font-bold rounded-xl py-3 text-sm hover:bg-neutral-200 transition-colors"
          >
            Access
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-xl border-b border-neutral-900 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/dashboard" className="p-1.5 hover:bg-neutral-800 rounded-lg transition-colors">
              <IconBack className="w-5 h-5 text-neutral-400" />
            </a>
            <div>
              <h1 className="text-lg font-bold leading-tight">Customers</h1>
              <p className="text-xs text-neutral-500">TP Dumpsters</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span>{stats.total} total</span>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-4 py-4">
        <div className="bg-neutral-900 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold">{stats.total}</p>
          <p className="text-xs text-neutral-400 mt-1">Total</p>
        </div>
        <div className="bg-neutral-900 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold">{stats.withBookings}</p>
          <p className="text-xs text-neutral-400 mt-1">With Services</p>
        </div>
        <div className="bg-neutral-900 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-green-400">${stats.totalRevenue >= 1000 ? `${(stats.totalRevenue / 1000).toFixed(1)}k` : stats.totalRevenue.toFixed(0)}</p>
          <p className="text-xs text-neutral-400 mt-1">Revenue</p>
        </div>
        <div className="bg-neutral-900 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold">{stats.thisWeek}</p>
          <p className="text-xs text-neutral-400 mt-1">This Week</p>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pb-4">
        <div className="relative">
          <IconSearch className="w-5 h-5 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-900 text-white rounded-2xl pl-12 pr-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-neutral-700 placeholder-neutral-500"
          />
        </div>
      </div>

      {/* Customer List */}
      <div className="px-4 pb-8 space-y-3">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-neutral-700 border-t-white rounded-full animate-spin mx-auto" />
            <p className="text-neutral-500 text-sm mt-4">Loading customers...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <IconUser className="w-12 h-12 text-neutral-700 mx-auto mb-3" />
            <p className="text-neutral-500">{search ? "No matches found" : "No customers yet"}</p>
          </div>
        ) : (
          filtered.map((customer) => (
            <div key={customer.id} className="bg-neutral-900 rounded-2xl overflow-hidden transition-all duration-300">
              {/* Customer Header */}
              <div className="p-4">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-11 h-11 bg-neutral-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-neutral-300">
                      {customer.name?.[0]?.toUpperCase() || "?"}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white truncate">{customer.name}</h3>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditCustomer(customer);
                            setEditForm({ name: customer.name, phone: customer.phone, email: customer.email });
                          }}
                          className="p-2 hover:bg-neutral-800 rounded-xl transition-colors"
                        >
                          <IconEdit className="w-4 h-4 text-neutral-400" />
                        </button>
                        <button
                          onClick={async (e) => {
                            e.stopPropagation();
                            if (!confirm(`¿Eliminar a ${customer.name} y todas sus reservaciones?`)) return;
                            try {
                              await fetch("/api/customers", {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json", "x-dashboard-auth": AUTH_CODE },
                                body: JSON.stringify({ id: customer.id }),
                              });
                              fetchCustomers();
                            } catch (err) {
                              console.error("Delete error:", err);
                            }
                          }}
                          className="p-2 hover:bg-red-900/50 rounded-xl transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-500 hover:text-red-400">
                            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {customer.phone && (
                      <div className="flex items-center gap-2 mt-1.5">
                        <IconPhone className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
                        <a href={`tel:${customer.phone}`} className="text-sm text-neutral-400 hover:text-white transition-colors">
                          {formatPhone(customer.phone)}
                        </a>
                      </div>
                    )}

                    {customer.email && (
                      <div className="flex items-center gap-2 mt-1">
                        <IconMail className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
                        <a href={`mailto:${customer.email}`} className="text-sm text-neutral-400 hover:text-white transition-colors truncate">
                          {customer.email}
                        </a>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-1">
                      <IconCalendar className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
                      <span className="text-sm text-neutral-500">Member since {formatDate(customer.created_at)}</span>
                    </div>

                    {/* Revenue & Services from Stripe */}
                    {(customer.total_revenue > 0 || customer.total_services > 0) && (
                      <div className="flex items-center gap-4 mt-2">
                        {customer.total_revenue > 0 && (
                          <span className="inline-flex items-center gap-1.5 bg-green-900/30 text-green-400 px-2.5 py-1 rounded-lg text-xs font-semibold">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                            ${customer.total_revenue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                          </span>
                        )}
                        {customer.total_services > 0 && (
                          <span className="inline-flex items-center gap-1.5 bg-blue-900/30 text-blue-400 px-2.5 py-1 rounded-lg text-xs font-semibold">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
                            {customer.total_services} service{customer.total_services > 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bookings toggle */}
                {customer.bookings.length > 0 && (
                  <button
                    onClick={() => setExpandedId(expandedId === customer.id ? null : customer.id)}
                    className="flex items-center gap-2 mt-3 ml-14 text-sm text-neutral-400 hover:text-white transition-colors py-1"
                  >
                    <IconPackage className="w-4 h-4" />
                    <span>{customer.bookings.length} booking{customer.bookings.length > 1 ? "s" : ""}</span>
                    <IconChevron className="w-4 h-4" direction={expandedId === customer.id ? "up" : "down"} />
                  </button>
                )}
                {customer.bookings.length === 0 && customer.total_services === 0 && (
                  <p className="text-xs text-neutral-600 mt-3 ml-14">No bookings</p>
                )}
              </div>

              {/* Expanded Bookings */}
              {expandedId === customer.id && customer.bookings.length > 0 && (
                <div className="px-4 pb-4 space-y-2">
                  {customer.bookings.map((b) => (
                    <div key={b.id} className="bg-neutral-800/60 rounded-xl p-3.5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-neutral-400">{b.booking_id}</span>
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${STATUS_COLORS[b.status] || "bg-neutral-500"}`} />
                          <span className="text-xs text-neutral-400 capitalize">{b.status}</span>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-white">
                        {b.dumpster_size}yd {b.service_type}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-neutral-400">
                        <IconCalendar className="w-3 h-3" />
                        <span>{formatShortDate(b.delivery_date)} → {formatShortDate(b.pickup_date)}</span>
                      </div>
                      {(b.address || b.city) && (
                        <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
                          <IconPin className="w-3 h-3" />
                          <span>{[b.address, b.city].filter(Boolean).join(", ")}</span>
                        </div>
                      )}
                      <p className="text-sm font-semibold text-white mt-2">${b.total_price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editCustomer && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
          onClick={() => setEditCustomer(null)}
        >
          <div
            className="bg-neutral-900 rounded-2xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Edit Customer</h2>
              <button onClick={() => setEditCustomer(null)} className="p-2 hover:bg-neutral-800 rounded-xl transition-colors">
                <IconX className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-neutral-400 mb-1.5 block">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-neutral-800 text-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-600"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-400 mb-1.5 block">Phone</label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full bg-neutral-800 text-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-600"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-400 mb-1.5 block">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full bg-neutral-800 text-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-600"
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving || !editForm.name.trim()}
              className="w-full bg-white text-black font-bold rounded-xl py-3 text-sm mt-6 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
