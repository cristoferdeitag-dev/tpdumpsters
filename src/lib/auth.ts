import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual, randomBytes } from "crypto";
import { readFileSync } from "fs";

// The dashboard password is read from a file on the server (same pattern as the
// Stripe/Twilio keys, which live in /home/u781187371/*.json). Hostinger does NOT
// inject env vars into the Node process, so process.env.DASHBOARD_PASSWORD is
// empty in prod — reading from a file is the reliable source. Env is kept as a
// fallback for local/dev. Cached after first read.
//
// FAIL-CLOSED: if no password can be resolved (file missing AND env empty) we
// return an unguessable per-process random value instead of "". Many routes do
// `incoming !== getDashboardPassword()`; returning "" there let anyone in with a
// blank `?auth=`. A random sentinel makes every such comparison reject.
const AUTH_FILE = "/home/u781187371/dashboard-auth.json";
const UNCONFIGURED_SENTINEL = "__no_dashboard_password__" + randomBytes(24).toString("hex");
let cachedPassword: string | null = null;

export function getDashboardPassword(): string {
  if (cachedPassword !== null) return cachedPassword;
  let resolved = "";
  try {
    const parsed = JSON.parse(readFileSync(AUTH_FILE, "utf8"));
    if (typeof parsed.password === "string") resolved = parsed.password;
  } catch {
    resolved = process.env.DASHBOARD_PASSWORD || "";
  }
  cachedPassword = resolved || UNCONFIGURED_SENTINEL;
  return cachedPassword;
}

// True when a real password is configured (not the fail-closed sentinel).
export function isDashboardPasswordConfigured(): boolean {
  return getDashboardPassword() !== UNCONFIGURED_SENTINEL;
}

// Constant-time compare that won't throw on length mismatch.
function safeEqual(a: string, b: string): boolean {
  if (!a || !b) return false;
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function checkAuth(request: NextRequest): NextResponse | null {
  const password = getDashboardPassword();
  const auth = request.nextUrl.searchParams.get("auth");
  // Fail closed: never authorize against an empty password (previously an empty
  // server password let anyone in with `?auth=`).
  if (!password || !safeEqual(auth || "", password)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

// Flexible auth for mutating API routes (POST). Accepts the dashboard token via
// `?auth=`, an `Authorization: Bearer <token>` header, or a JSON body `auth`
// field, so existing admin callers keep working regardless of how they send it.
// Returns a 401 NextResponse when unauthorized, or null when OK.
export function requireAuth(
  request: NextRequest,
  body?: Record<string, unknown> | null
): NextResponse | null {
  if (!isDashboardPasswordConfigured()) {
    // Fail closed: if the server has no password configured, deny mutations.
    return NextResponse.json({ error: "Server auth not configured" }, { status: 503 });
  }
  const password = getDashboardPassword();
  const fromQuery = request.nextUrl.searchParams.get("auth") || "";
  const header = request.headers.get("authorization") || "";
  const fromHeader = header.toLowerCase().startsWith("bearer ")
    ? header.slice(7).trim()
    : "";
  const fromBody = body && typeof body.auth === "string" ? (body.auth as string) : "";
  const provided = fromQuery || fromHeader || fromBody;
  if (!safeEqual(provided, password)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

// Booking IDs are of the form "TP-XXXXXXXX". Validate before interpolating into
// a Stripe Search query string to prevent query injection / metadata scraping.
const BOOKING_ID_RE = /^TP-[A-Z0-9-]{3,40}$/i;
export function isValidBookingId(id: unknown): id is string {
  return typeof id === "string" && BOOKING_ID_RE.test(id);
}
