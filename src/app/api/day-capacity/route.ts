import { NextRequest, NextResponse } from "next/server";
import { countDeliveriesAndSwaps, DAILY_ONLINE_CAP, fullDayMessage } from "@/lib/day-capacity";

// Public, PII-free: tells the booking wizard whether a delivery date already
// reached the daily online cap (see src/lib/day-capacity.ts). Returns only a
// boolean and the customer-facing message.
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date") || "";
  const size = req.nextUrl.searchParams.get("size") || undefined;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "date must be yyyy-mm-dd" }, { status: 400 });
  }
  // `count` (just a number, no PII) lets us verify the calendar is really
  // being read: a failed read answers full:false with count:null.
  let count: number | null = null;
  try {
    count = await countDeliveriesAndSwaps(date);
  } catch (err) {
    console.error(`day-capacity: calendar read failed for ${date} (not blocking):`, err);
  }
  const full = count !== null && count >= DAILY_ONLINE_CAP;
  return NextResponse.json(
    { date, full, count, cap: DAILY_ONLINE_CAP, message: full ? await fullDayMessage(date, size) : "" },
    { headers: { "Cache-Control": "no-store" } }
  );
}
