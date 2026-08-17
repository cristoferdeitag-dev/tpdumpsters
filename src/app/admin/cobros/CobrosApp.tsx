"use client";

// /admin/cobros — pantalla interna de facturas y cobros de TP Dumpsters.
// Reemplaza el flujo manual del dashboard de Stripe: todo lo que nace aquí
// pasa por la plataforma (Stripe Connect) y trae la comisión integrada.
// La contraseña es la misma del dashboard interno; se verifica en el server
// en CADA petición (los endpoints rechazan sin ella).

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SERVICES } from "@/lib/invoice-catalog";

/* ── Tipos ── */
interface CustomerRow {
  id: string; name: string; email: string; phone: string;
  city: string; line1: string; created: number; hasDefaultPm: boolean;
}
interface CardRow {
  id: string; brand: string; last4: string; expMonth: number; expYear: number; isDefault: boolean;
}
interface LineRow {
  key: number;
  catalog: string; // "serviceType|size" o "" para personalizado
  description: string;
  amount: string;  // dólares como texto (input)
  quantity: number;
}
interface InvoiceRow {
  id: string; number: string; customerName: string; customerEmail: string;
  amount: number; amountPaid: number; status: string; hostedUrl: string;
  created: number; fee: number; fromCobros: boolean; collectionMethod: string;
}
type ResultPanel =
  | { kind: "ok"; title: string; detail: string; hostedUrl?: string }
  | { kind: "warn" | "error"; title: string; detail: string; hostedUrl?: string; invoiceId?: string };

const CATALOG_OPTIONS: { value: string; label: string; price: number }[] = [];
for (const [service, sizes] of Object.entries(SERVICES)) {
  for (const [size, info] of Object.entries(sizes)) {
    CATALOG_OPTIONS.push({ value: `${service}|${size}`, label: `${service} — ${size} ($${info.price})`, price: info.price });
  }
}
const QUICK_EXTRAS: { label: string; description: string; amount: number }[] = [
  { label: "+ Día extra ($75)", description: "Extra rental day", amount: 75 },
  { label: "+ Sobrepeso ($199/ton)", description: "Overweight fee (per extra ton, prorated)", amount: 199 },
  { label: "+ Cancelación ($150)", description: "Cancellation fee (less than 24h notice)", amount: 150 },
];

const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
let lineKeySeq = 1;

export default function CobrosApp() {
  /* ── Auth ── */
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(false);

  /* ── Tabs ── */
  const [tab, setTab] = useState<"nuevo" | "recientes">("nuevo");

  /* ── Cliente ── */
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [listMode, setListMode] = useState<"recent" | "search">("recent");
  const [selected, setSelected] = useState<CustomerRow | null>(null);
  const [cards, setCards] = useState<CardRow[] | null>(null);
  const [chosenCard, setChosenCard] = useState<string>("");
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [nc, setNc] = useState({ name: "", email: "", phone: "", line1: "", city: "", state: "CA", zip: "" });
  const [ncBusy, setNcBusy] = useState(false);

  /* ── Líneas ── */
  const [lines, setLines] = useState<LineRow[]>([
    { key: lineKeySeq++, catalog: "", description: "", amount: "", quantity: 1 },
  ]);
  const [notes, setNotes] = useState("");
  const [feePct, setFeePct] = useState<number | null>(null);

  /* ── Confirmación / resultado ── */
  const [confirming, setConfirming] = useState<null | { mode: "link" | "charge"; opKey: string }>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ResultPanel | null>(null);

  /* ── Recientes ── */
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [invoiceMsg, setInvoiceMsg] = useState("");

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const api = useCallback(
    async (path: string, init?: RequestInit) => {
      const res = await fetch(path, {
        ...init,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${password}`,
          ...(init?.headers || {}),
        },
      });
      const data = await res.json().catch(() => ({}));
      return { res, data };
    },
    [password]
  );

  /* ── Login ── */
  const tryLogin = useCallback(
    async (pwd: string) => {
      setCheckingAuth(true);
      setAuthError("");
      try {
        const res = await fetch("/api/admin/cobros/invoices", {
          headers: { authorization: `Bearer ${pwd}` },
        });
        if (res.ok) {
          const data = await res.json();
          setFeePct(typeof data.feePct === "number" ? data.feePct : null);
          setInvoices(data.invoices || []);
          setAuthed(true);
          sessionStorage.setItem("cobros_auth", pwd);
        } else if (res.status === 503) {
          const data = await res.json().catch(() => ({}));
          setAuthError(data.error || "Plataforma no configurada (503).");
        } else {
          setAuthError("Contraseña incorrecta.");
        }
      } catch {
        setAuthError("No se pudo conectar. Intenta de nuevo.");
      } finally {
        setCheckingAuth(false);
      }
    },
    []
  );

  useEffect(() => {
    const saved = sessionStorage.getItem("cobros_auth");
    if (saved) {
      setPassword(saved);
      tryLogin(saved);
    }
  }, [tryLogin]);

  /* ── Búsqueda de clientes (debounce) ── */
  const runSearch = useCallback(
    async (q: string) => {
      setSearching(true);
      try {
        const { res, data } = await api(`/api/admin/cobros/customers?q=${encodeURIComponent(q)}`);
        if (res.ok) {
          setCustomers(data.customers || []);
          setListMode(data.mode || "recent");
        }
      } finally {
        setSearching(false);
      }
    },
    [api]
  );

  useEffect(() => {
    if (!authed) return;
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => runSearch(query), query ? 350 : 0);
    return () => { if (searchTimer.current) clearTimeout(searchTimer.current); };
  }, [query, authed, runSearch]);

  /* ── Selección de cliente → tarjetas ── */
  const selectCustomer = useCallback(
    async (c: CustomerRow) => {
      setSelected(c);
      setCards(null);
      setChosenCard("");
      setResult(null);
      const { res, data } = await api(`/api/admin/cobros/customers?cards=${c.id}`);
      if (res.ok) {
        const list: CardRow[] = data.cards || [];
        setCards(list);
        if (list.length > 0) setChosenCard(list[0].id);
      } else {
        setCards([]);
      }
    },
    [api]
  );

  /* ── Cliente nuevo ── */
  const createCustomer = async () => {
    if (!nc.name.trim()) return;
    setNcBusy(true);
    try {
      const { res, data } = await api("/api/admin/cobros/customers", {
        method: "POST",
        body: JSON.stringify({
          name: nc.name, email: nc.email, phone: nc.phone,
          address: { line1: nc.line1, city: nc.city, state: nc.state, zip: nc.zip },
        }),
      });
      if (res.ok && data.customer) {
        setShowNewCustomer(false);
        setNc({ name: "", email: "", phone: "", line1: "", city: "", state: "CA", zip: "" });
        selectCustomer(data.customer);
      } else {
        alert(data.error || "No se pudo crear el cliente");
      }
    } finally {
      setNcBusy(false);
    }
  };

  /* ── Líneas ── */
  const updateLine = (key: number, patch: Partial<LineRow>) =>
    setLines((ls) => ls.map((l) => (l.key === key ? { ...l, ...patch } : l)));
  const removeLine = (key: number) => setLines((ls) => ls.filter((l) => l.key !== key));
  const addLine = (preset?: Partial<LineRow>) =>
    setLines((ls) => [...ls, { key: lineKeySeq++, catalog: "", description: "", amount: "", quantity: 1, ...preset }]);

  const onCatalogPick = (key: number, value: string) => {
    if (!value) { updateLine(key, { catalog: "" }); return; }
    const [service, size] = value.split("|");
    const info = SERVICES[service]?.[size];
    updateLine(key, {
      catalog: value,
      description: `${size.replace(" Yard", "-yard")} dumpster for ${service.toLowerCase()}`,
      amount: info ? String(info.price) : "",
    });
  };

  const parsedLines = useMemo(() => {
    return lines
      .map((l) => {
        const amount = Math.round(parseFloat(l.amount || "0") * 100);
        const [serviceType, size] = l.catalog ? l.catalog.split("|") : [undefined, undefined];
        return {
          description: l.description.trim(),
          amountCents: amount,
          quantity: l.quantity,
          serviceType, size,
          valid: Boolean(l.description.trim()) && Number.isFinite(amount) && amount > 0 && l.quantity >= 1,
        };
      })
      .filter((l) => l.description || l.amountCents > 0);
  }, [lines]);

  const allValid = parsedLines.length > 0 && parsedLines.every((l) => l.valid);
  const totalCents = parsedLines.reduce((s, l) => s + (l.valid ? l.amountCents * l.quantity : 0), 0);
  const feeCents = feePct ? Math.round((totalCents * feePct) / 100) : 0;
  const selectedCard = cards?.find((c) => c.id === chosenCard) || null;

  /* ── Ejecutar operación ── */
  const execute = async () => {
    if (!confirming || !selected) return;
    setBusy(true);
    setResult(null);
    const payload = {
      customerId: selected.id,
      items: parsedLines.map(({ description, amountCents, quantity, serviceType, size }) => ({
        description, amountCents, quantity, serviceType, size,
      })),
      notes,
      opKey: confirming.opKey,
      ...(confirming.mode === "charge" && chosenCard ? { paymentMethodId: chosenCard } : {}),
    };
    try {
      const path = confirming.mode === "link" ? "/api/admin/cobros/invoice" : "/api/admin/cobros/charge";
      const { res, data } = await api(path, { method: "POST", body: JSON.stringify(payload) });
      if (res.ok && confirming.mode === "link") {
        setResult({
          kind: "ok",
          title: `Factura ${data.number} enviada ${data.emailed ? "por correo ✉️" : "(correo falló — usa el link)"}`,
          detail: `Total ${money(data.amount)} · el cliente paga con el link de Stripe de siempre.`,
          hostedUrl: data.hostedUrl,
        });
        resetForm();
      } else if (res.ok && data.paid) {
        setResult({
          kind: "ok",
          title: `Cobrado ${money(data.amount)} ✅ (factura ${data.number})`,
          detail: "El cargo entró a la tarjeta guardada. El recibo de Stripe le llega al cliente.",
          hostedUrl: data.hostedUrl,
        });
        resetForm();
      } else if (data.requiresAction) {
        setResult({
          kind: "warn",
          title: "El banco pide verificación (3D Secure)",
          detail: data.message,
          hostedUrl: data.hostedUrl,
          invoiceId: data.id,
        });
      } else if (data.declined) {
        setResult({
          kind: "error",
          title: "Tarjeta rechazada",
          detail: data.message,
          hostedUrl: data.hostedUrl,
          invoiceId: data.id,
        });
      } else {
        setResult({ kind: "error", title: "Error", detail: data.error || `HTTP ${res.status}` });
      }
    } catch (e) {
      setResult({
        kind: "error",
        title: "Fallo de red",
        detail: `No hubo respuesta. Reintenta con el MISMO formulario (la protección anti-duplicados reconoce la operación). ${e instanceof Error ? e.message : ""}`,
      });
    } finally {
      setBusy(false);
      setConfirming(null);
      loadInvoices();
    }
  };

  const resetForm = () => {
    setLines([{ key: lineKeySeq++, catalog: "", description: "", amount: "", quantity: 1 }]);
    setNotes("");
  };

  /* ── Recientes ── */
  const loadInvoices = useCallback(async () => {
    setLoadingInvoices(true);
    try {
      const { res, data } = await api("/api/admin/cobros/invoices");
      if (res.ok) {
        setInvoices(data.invoices || []);
        if (typeof data.feePct === "number") setFeePct(data.feePct);
      }
    } finally {
      setLoadingInvoices(false);
    }
  }, [api]);

  useEffect(() => {
    if (authed && tab === "recientes") loadInvoices();
  }, [authed, tab, loadInvoices]);

  const invoiceAction = async (invoiceId: string, action: "send" | "void") => {
    if (action === "void" && !window.confirm("¿Anular esta factura? El cliente ya no podrá pagarla.")) return;
    setInvoiceMsg("");
    const { res, data } = await api("/api/admin/cobros/invoices", {
      method: "POST",
      body: JSON.stringify({ action, invoiceId, opKey: crypto.randomUUID() }),
    });
    setInvoiceMsg(res.ok ? (action === "send" ? "📤 Reenviada." : "🗑️ Anulada.") : `Error: ${data.error || res.status}`);
    loadInvoices();
  };

  /* ══ RENDER ══ */
  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <form
          className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm"
          onSubmit={(e) => { e.preventDefault(); tryLogin(password); }}
        >
          <h1 className="text-2xl font-bold text-slate-800">💳 Cobros TP</h1>
          <p className="text-sm text-slate-500 mt-1">Acceso interno. Usa la contraseña del dashboard.</p>
          <input
            type="password"
            className="mt-4 w-full border border-slate-300 rounded-lg px-3 py-2"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {authError && <p className="text-sm text-red-600 mt-2">{authError}</p>}
          <button
            type="submit"
            disabled={checkingAuth || !password}
            className="mt-4 w-full bg-slate-800 text-white rounded-lg py-2 font-semibold disabled:opacity-50"
          >
            {checkingAuth ? "Verificando…" : "Entrar"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 pb-24">
      {/* Header */}
      <header className="bg-slate-800 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">💳 Cobros TP</span>
          {feePct !== null && (
            <span className="text-xs bg-emerald-600/80 rounded-full px-2 py-0.5">fee {feePct}% activa</span>
          )}
        </div>
        <nav className="flex gap-1">
          {(["nuevo", "recientes"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${tab === t ? "bg-white text-slate-800" : "text-slate-200 hover:bg-slate-700"}`}
            >
              {t === "nuevo" ? "➕ Nuevo cobro" : "📋 Recientes"}
            </button>
          ))}
        </nav>
      </header>

      {tab === "nuevo" && (
        <main className="max-w-3xl mx-auto p-4 space-y-4">
          {/* Paso 1: cliente */}
          <section className="bg-white rounded-2xl shadow p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-700">1 · Cliente</h2>
              <button
                onClick={() => setShowNewCustomer((v) => !v)}
                className="text-sm text-blue-600 font-medium"
              >
                {showNewCustomer ? "← Volver a buscar" : "+ Cliente nuevo"}
              </button>
            </div>

            {selected && !showNewCustomer && (
              <div className="mt-3 border border-emerald-300 bg-emerald-50 rounded-xl p-3 flex items-start justify-between">
                <div>
                  <p className="font-semibold text-slate-800">{selected.name}</p>
                  <p className="text-sm text-slate-500">{selected.email || "sin correo"} · {selected.phone || "sin tel."}</p>
                  {cards === null && <p className="text-xs text-slate-400 mt-1">Buscando tarjetas guardadas…</p>}
                  {cards !== null && cards.length === 0 && (
                    <p className="text-xs text-amber-600 mt-1">Sin tarjeta guardada — solo se puede mandar link de pago.</p>
                  )}
                  {cards !== null && cards.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {cards.map((c) => (
                        <label key={c.id} className={`text-xs border rounded-lg px-2 py-1 cursor-pointer ${chosenCard === c.id ? "border-emerald-500 bg-white font-semibold" : "border-slate-300 bg-slate-50"}`}>
                          <input
                            type="radio"
                            name="card"
                            className="mr-1"
                            checked={chosenCard === c.id}
                            onChange={() => setChosenCard(c.id)}
                          />
                          💳 {c.brand.toUpperCase()} ****{c.last4} ({c.expMonth}/{String(c.expYear).slice(-2)}){c.isDefault ? " · predet." : ""}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={() => { setSelected(null); setCards(null); }} className="text-slate-400 text-sm">✕</button>
              </div>
            )}

            {!selected && !showNewCustomer && (
              <>
                <input
                  className="mt-3 w-full border border-slate-300 rounded-lg px-3 py-2"
                  placeholder="Buscar por nombre, correo o teléfono…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <p className="text-xs text-slate-400 mt-1">
                  {searching ? "Buscando…" : listMode === "recent" ? "Clientes recientes de Stripe (en vivo):" : "Resultados:"}
                </p>
                <ul className="mt-2 divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {customers.map((c) => (
                    <li key={c.id}>
                      <button
                        onClick={() => selectCustomer(c)}
                        className="w-full text-left py-2 px-2 hover:bg-slate-50 rounded-lg"
                      >
                        <span className="font-medium text-slate-800">{c.name}</span>
                        <span className="text-sm text-slate-500 block">
                          {c.email || "sin correo"} · {c.phone || "sin tel."}{c.city ? ` · ${c.city}` : ""}
                        </span>
                      </button>
                    </li>
                  ))}
                  {!searching && customers.length === 0 && (
                    <li className="text-sm text-slate-400 py-2 px-2">Nada por aquí. Prueba otro término o crea el cliente.</li>
                  )}
                </ul>
              </>
            )}

            {showNewCustomer && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <input className="col-span-2 border border-slate-300 rounded-lg px-3 py-2" placeholder="Nombre *" value={nc.name} onChange={(e) => setNc({ ...nc, name: e.target.value })} />
                <input className="border border-slate-300 rounded-lg px-3 py-2" placeholder="Correo" value={nc.email} onChange={(e) => setNc({ ...nc, email: e.target.value })} />
                <input className="border border-slate-300 rounded-lg px-3 py-2" placeholder="Teléfono" value={nc.phone} onChange={(e) => setNc({ ...nc, phone: e.target.value })} />
                <input className="col-span-2 border border-slate-300 rounded-lg px-3 py-2" placeholder="Dirección (línea 1)" value={nc.line1} onChange={(e) => setNc({ ...nc, line1: e.target.value })} />
                <input className="border border-slate-300 rounded-lg px-3 py-2" placeholder="Ciudad" value={nc.city} onChange={(e) => setNc({ ...nc, city: e.target.value })} />
                <div className="flex gap-2">
                  <input className="w-16 border border-slate-300 rounded-lg px-3 py-2" placeholder="Edo." value={nc.state} onChange={(e) => setNc({ ...nc, state: e.target.value })} />
                  <input className="flex-1 border border-slate-300 rounded-lg px-3 py-2" placeholder="ZIP" value={nc.zip} onChange={(e) => setNc({ ...nc, zip: e.target.value })} />
                </div>
                <button
                  onClick={createCustomer}
                  disabled={ncBusy || !nc.name.trim()}
                  className="col-span-2 bg-slate-800 text-white rounded-lg py-2 font-semibold disabled:opacity-50"
                >
                  {ncBusy ? "Creando…" : "Crear cliente"}
                </button>
              </div>
            )}
          </section>

          {/* Paso 2: conceptos */}
          <section className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-bold text-slate-700">2 · Conceptos</h2>
            <div className="mt-2 space-y-2">
              {lines.map((l) => (
                <div key={l.key} className="flex flex-wrap gap-2 items-center border border-slate-200 rounded-xl p-2">
                  <select
                    className="border border-slate-300 rounded-lg px-2 py-2 text-sm max-w-[210px]"
                    value={l.catalog}
                    onChange={(e) => onCatalogPick(l.key, e.target.value)}
                  >
                    <option value="">Cargo personalizado…</option>
                    {CATALOG_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <input
                    className="flex-1 min-w-[160px] border border-slate-300 rounded-lg px-3 py-2 text-sm"
                    placeholder="Descripción (le aparece al cliente)"
                    value={l.description}
                    onChange={(e) => updateLine(l.key, { description: e.target.value })}
                  />
                  <div className="flex items-center gap-1">
                    <span className="text-slate-400">$</span>
                    <input
                      className="w-24 border border-slate-300 rounded-lg px-2 py-2 text-sm text-right"
                      placeholder="0.00"
                      inputMode="decimal"
                      value={l.amount}
                      onChange={(e) => updateLine(l.key, { amount: e.target.value.replace(/[^0-9.]/g, "") })}
                    />
                  </div>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    className="w-14 border border-slate-300 rounded-lg px-2 py-2 text-sm text-center"
                    value={l.quantity}
                    onChange={(e) => updateLine(l.key, { quantity: Math.max(1, Math.min(10, Number(e.target.value) || 1)) })}
                    title="Cantidad"
                  />
                  {lines.length > 1 && (
                    <button onClick={() => removeLine(l.key)} className="text-slate-400 hover:text-red-500 px-1">✕</button>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <button onClick={() => addLine()} className="text-sm text-blue-600 font-medium">+ Otro concepto</button>
              {QUICK_EXTRAS.map((x) => (
                <button
                  key={x.label}
                  onClick={() => addLine({ description: x.description, amount: String(x.amount) })}
                  className="text-xs bg-slate-100 hover:bg-slate-200 rounded-full px-3 py-1"
                >
                  {x.label}
                </button>
              ))}
            </div>
            <textarea
              className="mt-3 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              rows={2}
              placeholder="Notas para la factura (opcional, salen al pie)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <div className="mt-3 border-t border-slate-100 pt-3 text-right">
              <p className="text-xl font-bold text-slate-800">Total: {money(totalCents / 100)}</p>
              {feePct !== null && totalCents > 0 && (
                <p className="text-xs text-slate-400">comisión HTM interna {feePct}%: {money(feeCents / 100)} (el cliente no la ve)</p>
              )}
            </div>
          </section>

          {/* Paso 3: acción */}
          <section className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-bold text-slate-700">3 · Cobrar</h2>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              <button
                disabled={!selected || !allValid || busy}
                onClick={() => setConfirming({ mode: "link", opKey: crypto.randomUUID() })}
                className="border-2 border-slate-800 text-slate-800 rounded-xl py-3 font-semibold disabled:opacity-40"
              >
                ✉️ Enviar factura con link de pago
              </button>
              <button
                disabled={!selected || !allValid || busy || !selectedCard}
                onClick={() => setConfirming({ mode: "charge", opKey: crypto.randomUUID() })}
                className="bg-emerald-600 text-white rounded-xl py-3 font-semibold disabled:opacity-40"
                title={!selectedCard ? "Este cliente no tiene tarjeta guardada" : ""}
              >
                ⚡ Cobrar ahora {selectedCard ? `a ****${selectedCard.last4}` : "(sin tarjeta)"}
              </button>
            </div>
            {!selected && <p className="text-xs text-slate-400 mt-2">Elige primero un cliente.</p>}
            {selected && !allValid && <p className="text-xs text-slate-400 mt-2">Completa descripción y monto de cada concepto.</p>}

            {result && (
              <div
                className={`mt-4 rounded-xl p-4 border ${
                  result.kind === "ok"
                    ? "bg-emerald-50 border-emerald-300"
                    : result.kind === "warn"
                    ? "bg-amber-50 border-amber-300"
                    : "bg-red-50 border-red-300"
                }`}
              >
                <p className="font-semibold text-slate-800">{result.title}</p>
                <p className="text-sm text-slate-600 mt-1">{result.detail}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {result.hostedUrl && (
                    <>
                      <a href={result.hostedUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 underline">
                        Abrir link de pago
                      </a>
                      <button
                        onClick={() => navigator.clipboard.writeText(result.hostedUrl!)}
                        className="text-sm text-blue-600"
                      >
                        📋 Copiar link
                      </button>
                    </>
                  )}
                  {"invoiceId" in result && result.invoiceId && (
                    <button
                      onClick={() => invoiceAction(result.invoiceId!, "void")}
                      className="text-sm text-red-600"
                    >
                      🗑️ Anular factura
                    </button>
                  )}
                </div>
              </div>
            )}
          </section>
        </main>
      )}

      {tab === "recientes" && (
        <main className="max-w-4xl mx-auto p-4">
          <div className="bg-white rounded-2xl shadow p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-700">Facturas recientes (cuenta Stripe de TP, en vivo)</h2>
              <button onClick={loadInvoices} className="text-sm text-blue-600">↻ Actualizar</button>
            </div>
            {invoiceMsg && <p className="text-sm text-slate-600 mt-1">{invoiceMsg}</p>}
            {loadingInvoices && <p className="text-sm text-slate-400 mt-2">Cargando…</p>}
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-100">
                    <th className="py-2 pr-2">Factura</th>
                    <th className="py-2 pr-2">Cliente</th>
                    <th className="py-2 pr-2 text-right">Monto</th>
                    <th className="py-2 pr-2 text-right">Fee HTM</th>
                    <th className="py-2 pr-2">Estado</th>
                    <th className="py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-slate-50">
                      <td className="py-2 pr-2 font-medium text-slate-700">
                        {inv.number}
                        {inv.fromCobros && <span className="ml-1 text-[10px] bg-blue-100 text-blue-700 rounded-full px-1.5 py-0.5">pantalla</span>}
                      </td>
                      <td className="py-2 pr-2">
                        {inv.customerName || "—"}
                        <span className="block text-xs text-slate-400">{inv.customerEmail}</span>
                      </td>
                      <td className="py-2 pr-2 text-right">{money(inv.amount)}</td>
                      <td className="py-2 pr-2 text-right text-slate-500">{inv.fee ? money(inv.fee) : "—"}</td>
                      <td className="py-2 pr-2">
                        <span
                          className={`text-xs rounded-full px-2 py-0.5 ${
                            inv.status === "paid"
                              ? "bg-emerald-100 text-emerald-700"
                              : inv.status === "open"
                              ? "bg-amber-100 text-amber-700"
                              : inv.status === "void"
                              ? "bg-slate-100 text-slate-500"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-2">
                        <div className="flex gap-2">
                          {inv.hostedUrl && (
                            <a href={inv.hostedUrl} target="_blank" rel="noreferrer" className="text-blue-600">ver</a>
                          )}
                          {inv.status === "open" && (
                            <>
                              <button onClick={() => invoiceAction(inv.id, "send")} className="text-blue-600">reenviar</button>
                              <button onClick={() => invoiceAction(inv.id, "void")} className="text-red-600">anular</button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!loadingInvoices && invoices.length === 0 && (
                    <tr><td colSpan={6} className="py-4 text-center text-slate-400">Sin facturas.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      {/* Modal de confirmación */}
      {confirming && selected && (
        <div className="fixed inset-0 bg-black/50 z-30 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-slate-800">
              {confirming.mode === "link" ? "✉️ Confirmar envío de factura" : "⚡ Confirmar cobro inmediato"}
            </h3>
            <div className="mt-3 text-sm text-slate-600 space-y-1">
              <p><span className="text-slate-400">Cliente:</span> <strong>{selected.name}</strong> {selected.email && `(${selected.email})`}</p>
              {parsedLines.map((l, i) => (
                <p key={i} className="flex justify-between">
                  <span>{l.quantity > 1 ? `${l.quantity}× ` : ""}{l.description}</span>
                  <span>{money((l.amountCents * l.quantity) / 100)}</span>
                </p>
              ))}
              <p className="flex justify-between font-bold text-slate-800 border-t border-slate-100 pt-1">
                <span>Total</span><span>{money(totalCents / 100)}</span>
              </p>
              {confirming.mode === "charge" && selectedCard && (
                <p className="text-amber-700 bg-amber-50 rounded-lg p-2 mt-2">
                  Se cobrará AHORA a la tarjeta {selectedCard.brand.toUpperCase()} ****{selectedCard.last4}.
                </p>
              )}
              {confirming.mode === "link" && (
                <p className="text-slate-500 mt-2">El cliente recibirá el correo de Stripe con su link de pago (7 días para pagar).</p>
              )}
            </div>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setConfirming(null)}
                disabled={busy}
                className="flex-1 border border-slate-300 rounded-lg py-2 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={execute}
                disabled={busy}
                className={`flex-1 rounded-lg py-2 font-semibold text-white ${confirming.mode === "charge" ? "bg-emerald-600" : "bg-slate-800"} disabled:opacity-50`}
              >
                {busy ? "Procesando…" : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
