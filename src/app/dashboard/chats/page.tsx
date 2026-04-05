"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const AUTH_KEY = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || "";

interface ChatSession {
  id: number;
  session_id: string;
  first_message: string;
  last_message: string;
  message_count: number;
  language: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ChatMessage {
  id: number;
  session_id: string;
  role: string;
  content: string;
  language: string;
  created_at: string;
}

interface Stats {
  chatsToday: number;
  chatsThisWeek: number;
  totalMessages: number;
  totalSessions: number;
  activeChats: number;
  languageBreakdown: { language: string; count: number }[];
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function ChatDashboardWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Loading...</p></div>}>
      <ChatDashboard />
    </Suspense>
  );
}

function ChatDashboard() {
  const searchParams = useSearchParams();
  const auth = searchParams.get("auth");

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("");
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const apiBase = `/api/dashboard/chats?auth=${AUTH_KEY}`;

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`/api/dashboard/chats/stats?auth=${AUTH_KEY}`);
      if (res.ok) setStats(await res.json());
    } catch (e) {
      console.error("Failed to fetch stats", e);
    }
  }, []);

  const fetchSessions = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ auth: AUTH_KEY, page: String(page), limit: "20" });
      if (search) params.set("search", search);
      if (language) params.set("language", language);
      if (status) params.set("status", status);
      if (dateFrom) params.set("dateFrom", dateFrom);
      if (dateTo) params.set("dateTo", dateTo);

      const res = await fetch(`/api/dashboard/chats?${params}`);
      if (res.ok) {
        const data = await res.json();
        setSessions(data.sessions);
        setPagination(data.pagination);
      }
    } catch (e) {
      console.error("Failed to fetch sessions", e);
    }
    setLoading(false);
  }, [search, language, status, dateFrom, dateTo]);

  const fetchMessages = async (sessionId: string) => {
    setMessagesLoading(true);
    setSelectedSession(sessionId);
    try {
      const res = await fetch(`/api/dashboard/chats/${sessionId}?auth=${AUTH_KEY}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages);
      }
    } catch (e) {
      console.error("Failed to fetch messages", e);
    }
    setMessagesLoading(false);
  };

  useEffect(() => {
    if (auth !== AUTH_KEY) return;
    fetchStats();
    fetchSessions();

    const interval = setInterval(() => {
      fetchStats();
      fetchSessions(pagination.page);
    }, 30000);

    return () => clearInterval(interval);
  }, [auth, fetchStats, fetchSessions]);

  useEffect(() => {
    if (auth === AUTH_KEY) fetchSessions(1);
  }, [search, language, status, dateFrom, dateTo]);

  if (auth !== AUTH_KEY) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">🔒 Access Denied</h1>
          <p className="text-gray-500">Invalid or missing auth parameter.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const truncate = (str: string, len = 60) => {
    if (!str) return "—";
    return str.length > len ? str.slice(0, len) + "…" : str;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-tp-red text-white py-4 px-4 sm:px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">💬 Chat Dashboard</h1>
            <p className="text-sm opacity-80">TP Dumpsters — Live Conversations</p>
          </div>
          <div className="text-xs opacity-60">Auto-refresh: 30s</div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <StatCard label="Chats Today" value={stats.chatsToday} icon="📅" />
            <StatCard label="This Week" value={stats.chatsThisWeek} icon="📊" />
            <StatCard label="Total Messages" value={stats.totalMessages} icon="💬" />
            <StatCard label="Active Now" value={stats.activeChats} icon="🟢" />
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <input
              type="text"
              placeholder="🔍 Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tp-red/30 focus:border-tp-red"
            />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tp-red/30 focus:border-tp-red"
            >
              <option value="">All Languages</option>
              <option value="en">🇺🇸 English</option>
              <option value="es">🇲🇽 Español</option>
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tp-red/30 focus:border-tp-red"
            >
              <option value="">All Status</option>
              <option value="active">🟢 Active</option>
              <option value="closed">🔴 Closed</option>
            </select>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tp-red/30 focus:border-tp-red"
              placeholder="From"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tp-red/30 focus:border-tp-red"
              placeholder="To"
            />
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sessions list */}
          <div className={`${selectedSession ? "hidden lg:block" : ""} lg:w-1/2 w-full`}>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-700">
                  Conversations ({pagination.total})
                </h2>
              </div>

              {loading ? (
                <div className="p-8 text-center text-gray-400">Loading...</div>
              ) : sessions.length === 0 ? (
                <div className="p-8 text-center text-gray-400">No conversations found</div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {sessions.map((s) => (
                    <button
                      key={s.session_id}
                      onClick={() => fetchMessages(s.session_id)}
                      className={`w-full text-left px-4 py-3 hover:bg-red-50/50 transition-colors ${
                        selectedSession === s.session_id ? "bg-red-50 border-l-4 border-tp-red" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-400">
                          {s.language === "es" ? "🇲🇽" : "🇺🇸"} {formatDate(s.created_at)}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          s.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}>
                          {s.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 font-medium">{truncate(s.first_message, 80)}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-400">{s.message_count} msgs</span>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-gray-400">{truncate(s.last_message, 40)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                  <button
                    disabled={pagination.page <= 1}
                    onClick={() => fetchSessions(pagination.page - 1)}
                    className="text-sm text-tp-red disabled:opacity-30 disabled:cursor-not-allowed hover:underline"
                  >
                    ← Previous
                  </button>
                  <span className="text-xs text-gray-400">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <button
                    disabled={pagination.page >= pagination.totalPages}
                    onClick={() => fetchSessions(pagination.page + 1)}
                    className="text-sm text-tp-red disabled:opacity-30 disabled:cursor-not-allowed hover:underline"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Conversation detail */}
          <div className={`${selectedSession ? "" : "hidden lg:block"} lg:w-1/2 w-full`}>
            {selectedSession ? (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-700 text-sm">
                    Session: {selectedSession.slice(0, 12)}...
                  </h2>
                  <button
                    onClick={() => { setSelectedSession(null); setMessages([]); }}
                    className="lg:hidden text-sm text-tp-red hover:underline"
                  >
                    ← Back
                  </button>
                </div>

                {messagesLoading ? (
                  <div className="p-8 text-center text-gray-400">Loading messages...</div>
                ) : (
                  <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                            m.role === "user"
                              ? "bg-tp-red text-white rounded-tr-sm"
                              : "bg-gray-100 text-gray-800 rounded-tl-sm"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{m.content}</p>
                          <p className={`text-[10px] mt-1 ${
                            m.role === "user" ? "text-white/60" : "text-gray-400"
                          }`}>
                            {formatDate(m.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400">
                <p className="text-4xl mb-2">💬</p>
                <p>Select a conversation to view messages</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}
