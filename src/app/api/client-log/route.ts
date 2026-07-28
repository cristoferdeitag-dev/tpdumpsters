import { NextResponse } from "next/server";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

// Tiny client-error beacon: the embedded payment posts mount failures here so
// a customer's browser problem becomes visible in journalctl instead of being
// an invisible infinite spinner on their side (the 24-jul lesson).
export async function POST(request: Request) {
  // Rate-limited (Hermes audit 28-jul): without this, a script could flood
  // journalctl through the beacon. 10 reports / 10 min per IP is plenty for
  // a real browser having trouble.
  const rl = checkRateLimit(`client-log:${clientIp(request.headers)}`, 10, 10 * 60 * 1000);
  if (!rl.allowed) return new NextResponse(null, { status: 429 });
  try {
    const body = await request.json();
    console.error(
      `🧭 CLIENT-LOG [${String(body.where || "?").slice(0, 40)}] ${String(body.err || "").slice(0, 500)} | UA: ${String(body.ua || "").slice(0, 160)}`
    );
  } catch {
    // never fail the client over logging
  }
  return new NextResponse(null, { status: 204 });
}
