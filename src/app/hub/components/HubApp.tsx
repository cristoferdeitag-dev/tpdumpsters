'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const AUTH_CODE = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || '';

// ── Types ───────────────────────────────────────────────────────────────
interface Stats {
  total: number;
  yard: number;
  enRoute: number;
  deployed: number;
  pickupScheduled: number;
}

interface CalendarEvent {
  time: string;
  customer: string;
  action: string;
  size: string;
}

interface Booking {
  customer: string;
  date: string;
  service: string;
  status: string;
}

// ── SVG Icons ───────────────────────────────────────────────────────────
function IconDashboard({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function IconTruck({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function IconCalendar({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconDollar({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 17.5v-11" />
    </svg>
  );
}

function IconUsers({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconPhone({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconGlobe({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconChart({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function IconCreditCard({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function IconCalendarSmall({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconClock({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// ── Quick Action Cards Config ───────────────────────────────────────────
const quickActions = [
  {
    href: '/dashboard',
    icon: IconDashboard,
    title: 'Dashboard',
    subtitle: 'Inventory & Map',
    gradient: 'from-red-600/20 to-red-900/10',
    border: 'border-red-800/30',
    iconColor: 'text-red-400',
  },
  {
    href: '/driver',
    icon: IconTruck,
    title: 'Driver',
    subtitle: "Today's Jobs",
    gradient: 'from-blue-600/20 to-blue-900/10',
    border: 'border-blue-800/30',
    iconColor: 'text-blue-400',
  },
  {
    href: '/booking',
    icon: IconCalendar,
    title: 'New Booking',
    subtitle: 'Book a Dumpster',
    gradient: 'from-green-600/20 to-green-900/10',
    border: 'border-green-800/30',
    iconColor: 'text-green-400',
  },
  {
    href: '/internal/quote',
    icon: IconDollar,
    title: 'Quotes',
    subtitle: 'Create Invoice',
    gradient: 'from-yellow-600/20 to-yellow-900/10',
    border: 'border-yellow-800/30',
    iconColor: 'text-yellow-400',
  },
  {
    href: '/internal/customers',
    icon: IconUsers,
    title: 'Customers',
    subtitle: 'Client Database',
    gradient: 'from-purple-600/20 to-purple-900/10',
    border: 'border-purple-800/30',
    iconColor: 'text-purple-400',
  },
  {
    href: 'tel:+15106502083',
    icon: IconPhone,
    title: 'Call Customer',
    subtitle: 'Main Line',
    gradient: 'from-emerald-600/20 to-emerald-900/10',
    border: 'border-emerald-800/30',
    iconColor: 'text-emerald-400',
    external: true,
  },
];

const quickLinks = [
  { href: 'https://tpdumpsters.com', label: 'tpdumpsters.com', icon: IconGlobe },
  { href: 'https://analytics.google.com', label: 'Google Analytics', icon: IconChart },
  { href: 'https://dashboard.stripe.com', label: 'Stripe Dashboard', icon: IconCreditCard },
  { href: 'https://calendar.google.com', label: 'Google Calendar', icon: IconCalendarSmall },
];

// ── Main Component ──────────────────────────────────────────────────────
export default function HubApp() {
  const [authenticated, setAuthenticated] = useState(false);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [stats, setStats] = useState<Stats>({ total: 0, yard: 0, enRoute: 0, deployed: 0, pickupScheduled: 0 });
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [eventsError, setEventsError] = useState(false);
  const [bookingsError, setBookingsError] = useState(false);

  const fetchStats = useCallback(async () => {
    setLoadingStats(true);
    try {
      const res = await fetch('/api/dashboard', {
        headers: { 'x-dashboard-auth': AUTH_CODE },
      });
      const data = await res.json();
      setStats(data.stats || { total: 0, yard: 0, enRoute: 0, deployed: 0, pickupScheduled: 0 });
    } catch {
      console.error('Failed to fetch stats');
    } finally {
      setLoadingStats(false);
    }
  }, []);

  const fetchEvents = useCallback(async () => {
    setLoadingEvents(true);
    try {
      const res = await fetch('/api/calendar/today', {
        headers: { 'x-dashboard-auth': AUTH_CODE },
      });
      if (!res.ok) throw new Error('Not found');
      const data = await res.json();
      setEvents(data.events || []);
      setEventsError(false);
    } catch {
      setEventsError(true);
      setEvents([]);
    } finally {
      setLoadingEvents(false);
    }
  }, []);

  const fetchBookings = useCallback(async () => {
    setLoadingBookings(true);
    try {
      const res = await fetch('/api/bookings/recent', {
        headers: { 'x-dashboard-auth': AUTH_CODE },
      });
      if (!res.ok) throw new Error('Not found');
      const data = await res.json();
      setBookings(data.bookings || []);
      setBookingsError(false);
    } catch {
      setBookingsError(true);
      setBookings([]);
    } finally {
      setLoadingBookings(false);
    }
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchStats();
      fetchEvents();
      fetchBookings();
      const interval = setInterval(fetchStats, 60000);
      return () => clearInterval(interval);
    }
  }, [authenticated, fetchStats, fetchEvents, fetchBookings]);

  const handleLogin = () => {
    if (code === AUTH_CODE) {
      setAuthenticated(true);
      setCodeError('');
    } else {
      setCodeError('Codigo incorrecto');
    }
  };

  // ── Auth Screen ─────────────────────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-black text-2xl font-black tracking-tight">TP</span>
            </div>
            <h1 className="text-2xl font-bold text-white">TP Dumpsters</h1>
            <p className="text-neutral-500 text-sm mt-1">Team Hub</p>
          </div>
          <input
            type="password"
            placeholder="Access code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
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

  // ── Main Hub ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24">
      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-black text-sm font-black tracking-tight">TP</span>
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">{getGreeting()}, Team</h1>
            <p className="text-xs text-gray-500">{formatDate()}</p>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <section className="px-4 mb-6">
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-gray-900 rounded-xl p-3 text-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mb-1.5" />
            <p className="text-xl font-bold">{loadingStats ? '–' : stats.yard}</p>
            <p className="text-[10px] text-gray-500 leading-tight">In Yard</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-3 text-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-1.5" />
            <p className="text-xl font-bold">{loadingStats ? '–' : stats.enRoute}</p>
            <p className="text-[10px] text-gray-500 leading-tight">En Route</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-3 text-center">
            <div className="w-2 h-2 bg-orange-500 rounded-full mx-auto mb-1.5" />
            <p className="text-xl font-bold">{loadingStats ? '–' : stats.deployed}</p>
            <p className="text-[10px] text-gray-500 leading-tight">Deployed</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-3 text-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mx-auto mb-1.5" />
            <p className="text-xl font-bold">{loadingStats ? '–' : stats.pickupScheduled}</p>
            <p className="text-[10px] text-gray-500 leading-tight">Pickup</p>
          </div>
        </div>
        <div className="mt-2 bg-gray-900 rounded-xl px-4 py-2.5 flex items-center justify-between">
          <span className="text-sm text-gray-400">Total Fleet</span>
          <span className="text-lg font-bold">{loadingStats ? '–' : stats.total}</span>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const content = (
              <div
                className={`bg-gradient-to-br ${action.gradient} border ${action.border} rounded-2xl p-4 flex flex-col gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer`}
              >
                <div className={action.iconColor}>
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{action.title}</p>
                  <p className="text-xs text-gray-500">{action.subtitle}</p>
                </div>
              </div>
            );

            if (action.external) {
              return (
                <a key={action.href} href={action.href}>
                  {content}
                </a>
              );
            }

            return (
              <Link key={action.href} href={action.href}>
                {content}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Today's Schedule */}
      <section className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Today&apos;s Schedule</h2>
        <div className="bg-gray-900 rounded-2xl overflow-hidden">
          {loadingEvents ? (
            <div className="p-6 text-center">
              <div className="w-6 h-6 border-2 border-gray-700 border-t-red-500 rounded-full animate-spin mx-auto" />
              <p className="text-xs text-gray-500 mt-2">Loading schedule...</p>
            </div>
          ) : eventsError || events.length === 0 ? (
            <div className="p-6 text-center">
              <IconCalendar className="w-10 h-10 text-gray-700 mx-auto mb-2" />
              <p className="text-sm text-gray-500">{eventsError ? 'No events loaded' : 'No events today'}</p>
              <p className="text-xs text-gray-600 mt-1">Schedule syncs from Google Calendar</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {events.map((event, i) => (
                <div key={i} className="px-4 py-3 flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-gray-500 min-w-[60px]">
                    <IconClock className="w-3.5 h-3.5" />
                    <span className="text-xs">{event.time}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{event.customer}</p>
                    <p className="text-xs text-gray-500">{event.action} · {event.size}</p>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    event.action.toLowerCase().includes('deliver')
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {event.action}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Bookings */}
      <section className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Recent Bookings</h2>
        <div className="bg-gray-900 rounded-2xl overflow-hidden">
          {loadingBookings ? (
            <div className="p-6 text-center">
              <div className="w-6 h-6 border-2 border-gray-700 border-t-red-500 rounded-full animate-spin mx-auto" />
              <p className="text-xs text-gray-500 mt-2">Loading bookings...</p>
            </div>
          ) : bookingsError || bookings.length === 0 ? (
            <div className="p-6 text-center">
              <IconCalendar className="w-10 h-10 text-gray-700 mx-auto mb-2" />
              <p className="text-sm text-gray-500">{bookingsError ? 'Could not load bookings' : 'No recent bookings'}</p>
              <p className="text-xs text-gray-600 mt-1">Bookings will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {bookings.slice(0, 5).map((booking, i) => (
                <div key={i} className="px-4 py-3 flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{booking.customer}</p>
                    <p className="text-xs text-gray-500">{booking.date} · {booking.service}</p>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
                    booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                    booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-700/50 text-gray-400'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Links</h2>
        <div className="grid grid-cols-2 gap-2">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 hover:bg-gray-800 rounded-xl px-3 py-3 flex items-center gap-2.5 transition-colors"
              >
                <Icon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-xs text-gray-300 truncate">{link.label}</span>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
