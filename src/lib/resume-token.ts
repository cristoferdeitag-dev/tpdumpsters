import { createHmac, timingSafeEqual } from "crypto";
import { readFileSync } from "fs";

// Booking IDs are sequential-ish (base36 timestamp), so a bare
// /booking?resume=TP-XXX would let anyone enumerate ids and read customer
// PII (name, phone, email, address) through the resume API. Every resume
// link therefore carries an HMAC over booking id + expiry; only holders of
// the emailed link can open it, and only while it's fresh (Hermes audit
// 4-ago: an eternal token that lands in URLs is a standing capability —
// 72h covers every realistic "finish your booking" window).
//
// The secret lives in a server file (Hostinger doesn't inject env vars),
// env is the local/dev fallback. FAIL-CLOSED for real (Hermes A2): with no
// secret configured, minting returns null and verification always fails —
// the feature is OFF, not running on an ephemeral secret.
const SECRET_PATH = "/home/u781187371/resume-secret.json";
// 24h (Hermes round-2): the watcher emails 30min-20h after abandonment, so a
// day covers every realistic click; later clicks get "link expired" + phone.
const TOKEN_TTL_SECONDS = 24 * 60 * 60;
let cachedSecret: string | null = null;

function getSecret(): string {
  if (cachedSecret !== null) return cachedSecret;
  let resolved = "";
  try {
    const parsed = JSON.parse(readFileSync(SECRET_PATH, "utf8"));
    if (typeof parsed.secret === "string" && parsed.secret.length >= 32) {
      resolved = parsed.secret;
    }
  } catch {
    resolved = process.env.RESUME_SECRET || "";
  }
  cachedSecret = resolved;
  return cachedSecret;
}

export function isResumeConfigured(): boolean {
  return getSecret().length >= 32;
}

function sign(bookingId: string, exp: number): string {
  return createHmac("sha256", getSecret())
    .update(`${bookingId}.${exp}`)
    .digest("hex")
    .slice(0, 32);
}

export function verifyBookingToken(bookingId: string, token: string, exp: string): boolean {
  if (!isResumeConfigured()) return false;
  if (!bookingId || !token || token.length !== 32) return false;
  const expNum = Number(exp);
  if (!Number.isInteger(expNum) || expNum <= 0) return false;
  if (expNum * 1000 < Date.now()) return false; // link expired
  const expected = Buffer.from(sign(bookingId, expNum));
  const provided = Buffer.from(token);
  if (expected.length !== provided.length) return false;
  return timingSafeEqual(expected, provided);
}

// Null when the server secret isn't configured — callers (the watcher) must
// then skip the email link instead of shipping a dead URL.
// The token rides the URL FRAGMENT (Hermes round-3): fragments never leave
// the browser, so the capability can't reach server access logs, CDN logs or
// the Referer header — only the layout's scrub script ever reads it.
export function buildResumeUrl(bookingId: string): string | null {
  if (!isResumeConfigured()) return null;
  const exp = Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS;
  return `https://tpdumpsters.com/booking#resume=${encodeURIComponent(bookingId)}&e=${exp}&t=${sign(bookingId, exp)}`;
}
