import Stripe from "stripe";
import { readFileSync } from "fs";

// Lazy-loaded Stripe keys (only resolved at runtime, not build time)
let _keys: { secret: string; publishable: string } | null = null;

function getKeys(): { secret: string; publishable: string } {
  if (_keys) return _keys;

  // Check env vars first
  if (process.env.STRIPE_SECRET_KEY) {
    _keys = {
      secret: process.env.STRIPE_SECRET_KEY,
      publishable: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
    };
    return _keys;
  }

  // Read from server config file (Hostinger doesn't support env vars)
  try {
    const raw = readFileSync("/home/u781187371/stripe-keys.json", "utf-8");
    const config = JSON.parse(raw);
    _keys = {
      secret: config.secret_key || "",
      publishable: config.publishable_key || "",
    };
    return _keys;
  } catch {
    console.error("⚠️ Stripe keys not found. Set env vars or create /home/u781187371/stripe-keys.json");
    _keys = { secret: "", publishable: "" };
    return _keys;
  }
}

// Lazy Stripe instance — only created on first use
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const keys = getKeys();
    _stripe = new Stripe(keys.secret, {
      apiVersion: "2026-02-25.clover",
    });
  }
  return _stripe;
}

// ── Un cliente = UNA ficha en Stripe ─────────────────────────────────
// Hasta el 4-sep cada compra del sitio y cada factura del generador interno de
// cotizaciones hacía `customers.create` a ciegas, así que un cliente que ya
// había comprado nacía otra vez: 53 clientes reales quedaron con 2+ fichas (69
// de más sobre 494). Con la ficha partida, la tarjeta guardada se queda en una
// y el historial en otra, y la pantalla de Cobros ve sólo la mitad — Asaí lo
// cazó con Jonah Abkowitz, que aparecía "sin tarjeta guardada" teniendo Visa.
//
// Se busca con `list({ email })`: coincidencia exacta y SIN el retraso de
// indexación de `search` (~1 min), que es justo el que dejaría duplicar dos
// compras seguidas. Si ya existe se actualiza (la dirección de ESTE trabajo
// puede ser otra) y se reusa. Si la búsqueda falla, se crea igual que antes:
// nunca se rompe un cobro por no poder consultar.
export async function findOrCreateCustomer(
  client: Stripe,
  params: Stripe.CustomerCreateParams,
  opts?: Stripe.RequestOptions
): Promise<Stripe.Customer> {
  const email = (params.email || "").trim();
  if (email) {
    try {
      const existing = await client.customers.list({ email, limit: 10 }, opts);
      if (existing.data.length > 0) {
        // La más reciente: trae los datos más frescos y, desde que el link de
        // pago obliga a guardar tarjeta, suele ser la que tiene el método.
        const target = [...existing.data].sort((a, b) => b.created - a.created)[0];
        return await client.customers.update(
          target.id,
          {
            ...(params.name ? { name: params.name } : {}),
            ...(params.phone ? { phone: params.phone } : {}),
            ...(params.address ? { address: params.address } : {}),
            ...(params.shipping ? { shipping: params.shipping } : {}),
            ...(params.metadata ? { metadata: params.metadata } : {}),
          },
          opts
        );
      }
    } catch (err) {
      console.warn("findOrCreateCustomer: no se pudo buscar por correo, se crea nueva ficha:", err);
    }
  }
  return await client.customers.create(params, opts);
}

export function getPublishableKey(): string {
  return getKeys().publishable;
}

// ── HTM platform commission (Stripe Connect direct charges) ──────────
// Optional config. When present, /api/checkout creates its sessions through
// the HTM platform account with a Stripe-Account header pointing at TP's
// connected account, plus an application fee — TP still collects in his own
// account (same emails, same payout flow) and the fee is deducted pre-payout.
// When absent, the checkout charges with TP's own key exactly as before, so
// removing the config (env vars or JSON fields) is the rollback switch.
export type PlatformConfig = { client: Stripe; account: string; feePct: number; publishable: string };

// The platform's PUBLISHABLE key (public by definition — it ships to every
// browser). Sessions created through the platform can only be fetched
// client-side with THIS key + the connected account header; TP's own
// publishable key gets checkout_connect_mismatched_key. Overridable via
// htm_platform_publishable_key in config.
const HTM_PLATFORM_PUBLISHABLE_FALLBACK =
  "pk_live_51PcYrKHiKMf1gBC8zWGcc2F9PekjSIeIbMweuDNHlL7n1tSMNtM8Wr5eQkARlnRP1pvaSgWUyyFtRzg2ZS1XlNNC00IoeGV5y1";

// Config is re-read at most once a minute so that editing stripe-keys.json
// takes effect without restarting next-server — deleting the htm_* fields
// really is an on-the-fly rollback switch, not a rollback-after-restart one.
const PLATFORM_TTL_MS = 60_000;
let _platform: PlatformConfig | null = null;
let _platformReadAt = 0;
let _platformSecret = "";

export function getPlatform(): PlatformConfig | null {
  const now = Date.now();
  if (now - _platformReadAt < PLATFORM_TTL_MS) return _platform;
  _platformReadAt = now;

  let secret = process.env.HTM_PLATFORM_SECRET_KEY || "";
  let account = process.env.HTM_CONNECTED_ACCOUNT_ID || "";
  let feePct = Number(process.env.HTM_APPLICATION_FEE_PCT);
  let publishable = process.env.HTM_PLATFORM_PUBLISHABLE_KEY || "";
  let anyFieldPresent = Boolean(secret || account || Number.isFinite(feePct));

  if (!secret || !account || !Number.isFinite(feePct) || !publishable) {
    try {
      const raw = readFileSync("/home/u781187371/stripe-keys.json", "utf-8");
      const config = JSON.parse(raw);
      anyFieldPresent = anyFieldPresent ||
        "htm_platform_secret_key" in config || "htm_connected_account_id" in config || "htm_application_fee_pct" in config;
      secret = secret || config.htm_platform_secret_key || "";
      account = account || config.htm_connected_account_id || "";
      publishable = publishable || config.htm_platform_publishable_key || "";
      if (!Number.isFinite(feePct)) feePct = Number(config.htm_application_fee_pct);
    } catch {
      // No config file — legacy single-account mode.
    }
  }
  if (!publishable) publishable = HTM_PLATFORM_PUBLISHABLE_FALLBACK;

  // Validity gate, incl. fee sanity: a typo like 20 (meaning 20%) must never
  // silently skim ten times the agreed commission off TP's payouts.
  // feePct 0 is VALID: validation mode — platform session without a fee.
  // Mode coherence (Hermes audit, the 24-jul bug class): a test secret with a
  // live publishable (or viceversa) would create a session the browser can't
  // open — reject the whole config instead (legacy mode + loud alert).
  const modeMismatch =
    secret.startsWith("sk_test_") !== publishable.startsWith("pk_test_");
  if (!secret || !account.startsWith("acct_") || !Number.isFinite(feePct) || feePct < 0 || feePct > 5 || modeMismatch) {
    // Partial/broken config is NOT the same as no config: sales must keep
    // flowing (legacy mode), but silently dropping the commission would look
    // like "everything works" while HTM earns $0 — scream in the logs.
    if (anyFieldPresent) {
      console.error(
        `🚨 HTM COMMISSION CONFIG INVALID — charging in legacy mode WITHOUT fee. Check htm_* fields (secret=${secret ? "set" : "MISSING"}, account=${account || "MISSING"}, feePct=${feePct})`
      );
    }
    _platform = null;
    return _platform;
  }

  if (!_platform || _platformSecret !== secret || _platform.account !== account || _platform.feePct !== feePct) {
    _platformSecret = secret;
    _platform = {
      client: new Stripe(secret, { apiVersion: "2026-02-25.clover" }),
      account,
      feePct,
      publishable,
    };
  }
  return _platform;
}
