import { createHmac, timingSafeEqual } from "crypto";
import { readFileSync } from "fs";

// Signed, expiring resume links for abandoned bookings. The secret lives in a
// file on the server (same pattern as stripe-keys.json); RESUME_SECRET env is
// the local/dev fallback. Tokens are HMAC-SHA256 over `${bookingId}.${exp}`
// (plain) or `${bookingId}.${exp}.rescue` (rescue email: carries the $15
// book-now bonus, see RESCUE_BONUS in pricing.ts). Same URL shape for both —
// the kind is only recoverable by re-signing, so the bonus can't be bolted on
// by hand and the layout's URL scrub script needs no change.
const SECRET_PATH = "/home/u781187371/resume-secret.json";
const TOKEN_TTL_SECONDS = 24 * 60 * 60;

export type ResumeKind = "plain" | "rescue";

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

function sign(bookingId: string, exp: number, kind: ResumeKind = "plain"): string {
  return createHmac("sha256", getSecret())
    .update(kind === "rescue" ? `${bookingId}.${exp}.rescue` : `${bookingId}.${exp}`)
    .digest("hex")
    .slice(0, 32);
}

function tokenMatches(bookingId: string, exp: number, token: string, kind: ResumeKind): boolean {
  const expected = Buffer.from(sign(bookingId, exp, kind));
  const provided = Buffer.from(token);
  if (expected.length !== provided.length) return false;
  return timingSafeEqual(expected, provided);
}

/**
 * Which kind of link this is, or null when invalid/expired. graceSeconds lets
 * the checkout keep honoring the rescue bonus a while after the link itself
 * stopped opening (the customer already saw that total on screen).
 */
export function verifyBookingTokenKind(bookingId: string, token: string, exp: string, graceSeconds = 0): ResumeKind | null {
  if (!isResumeConfigured()) return null;
  if (!bookingId || !token || token.length !== 32) return null;
  const expNum = Number(exp);
  if (!Number.isInteger(expNum) || expNum <= 0) return null;
  if ((expNum + graceSeconds) * 1000 < Date.now()) return null; // link expired
  if (tokenMatches(bookingId, expNum, token, "plain")) return "plain";
  if (tokenMatches(bookingId, expNum, token, "rescue")) return "rescue";
  return null;
}

export function verifyBookingToken(bookingId: string, token: string, exp: string): boolean {
  return verifyBookingTokenKind(bookingId, token, exp) !== null;
}

export function buildResumeUrl(bookingId: string, opts: { rescue?: boolean } = {}): string | null {
  if (!isResumeConfigured()) return null;
  const exp = Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS;
  const kind: ResumeKind = opts.rescue ? "rescue" : "plain";
  return `https://tpdumpsters.com/booking#resume=${encodeURIComponent(bookingId)}&e=${exp}&t=${sign(bookingId, exp, kind)}`;
}
