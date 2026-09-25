import { NextRequest, NextResponse } from "next/server";
import { isDayFull, fullDayMessage } from "@/lib/day-capacity";

// Public, PII-free: tells the booking wizard whether a delivery date already
// reached the daily online cap (see src/lib/day-capacity.ts). Returns only a
// boolean and the customer-facing message.
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date") || "";
  const size = req.nextUrl.searchParams.get("size") || undefined;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "date must be yyyy-mm-dd" }, { status: 400 });
  }
  const full = await isDayFull(date);
  return NextResponse.json(
    { date, full, message: full ? await fullDayMessage(date, size) : "" },
    { headers: { "Cache-Control": "no-store" } }
  );
}
