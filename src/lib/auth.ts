import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD || "";

// Constant-time compare that won't throw on length mismatch.
function safeEqual(a: string, b: string): boolean {
  if (!a || !b) return false;
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function checkAuth(request: NextRequest): NextResponse | null {
  const auth = request.nextUrl.searchParams.get("auth");
  if (!safeEqual(auth || "", DASHBOARD_PASSWORD)) {
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
  if (!DASHBOARD_PASSWORD) {
    // Fail closed: if the server has no password configured, deny mutations.
    return NextResponse.json({ error: "Server auth not configured" }, { status: 503 });
  }
  const fromQuery = request.nextUrl.searchParams.get("auth") || "";
  const header = request.headers.get("authorization") || "";
  const fromHeader = header.toLowerCase().startsWith("bearer ")
    ? header.slice(7).trim()
    : "";
  const fromBody = body && typeof body.auth === "string" ? (body.auth as string) : "";
  const provided = fromQuery || fromHeader || fromBody;
  if (!safeEqual(provided, DASHBOARD_PASSWORD)) {
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
