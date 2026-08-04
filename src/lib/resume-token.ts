import { createHmac, timingSafeEqual, randomBytes } from "crypto";
import { readFileSync } from "fs";

// Booking IDs are sequential-ish (base36 timestamp), so a bare
// /booking?resume=TP-XXX would let anyone enumerate ids and read customer
// PII (name, phone, email, address) through the resume API. Every resume
// link therefore carries an HMAC of the booking id; only holders of the
// emailed link can open it.
//
// The secret lives in a server file (Hostinger doesn't inject env vars),
// env is the local/dev fallback. FAIL-CLOSED: with no secret configured we
// sign with a per-process random value — links can't be minted or verified,
// so the resume feature is simply off instead of open.
const SECRET_PATH = "/home/u781187371/resume-secret.json";
const UNCONFIGURED_SENTINEL = randomBytes(32).toString("hex");
let cachedSecret: string | null = null;

function getSecret(): string {
  if (cachedSecret !== null) return cachedSecret;
  let resolved = "";
  try {
    const parsed = JSON.parse(readFileSync(SECRET_PATH, "utf8"));
    if (typeof parsed.secret === "string" && parsed.secret.length >= 16) {
      resolved = parsed.secret;
    }
  } catch {
    resolved = process.env.RESUME_SECRET || "";
  }
  cachedSecret = resolved || UNCONFIGURED_SENTINEL;
  return cachedSecret;
}

export function signBookingId(bookingId: string): string {
  return createHmac("sha256", getSecret()).update(bookingId).digest("hex").slice(0, 32);
}

export function verifyBookingToken(bookingId: string, token: string): boolean {
  if (!bookingId || !token || token.length !== 32) return false;
  const expected = Buffer.from(signBookingId(bookingId));
  const provided = Buffer.from(token);
  if (expected.length !== provided.length) return false;
  return timingSafeEqual(expected, provided);
}

export function buildResumeUrl(bookingId: string): string {
  return `https://tpdumpsters.com/booking?resume=${encodeURIComponent(bookingId)}&t=${signBookingId(bookingId)}`;
}
