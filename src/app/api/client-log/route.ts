import { NextResponse } from "next/server";

// Tiny client-error beacon: the embedded payment posts mount failures here so
// a customer's browser problem becomes visible in journalctl instead of being
// an invisible infinite spinner on their side (the 24-jul lesson).
export async function POST(request: Request) {
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
