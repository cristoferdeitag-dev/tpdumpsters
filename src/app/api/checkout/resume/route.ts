import { NextRequest, NextResponse } from "next/server";
import { getPool, dateToYMD } from "@/lib/db";
import { verifyBookingToken } from "@/lib/resume-token";
import { isValidBookingId } from "@/lib/auth";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";
import { getStripe } from "@/lib/stripe";
import type { RowDataPacket } from "mysql2";

// POST /api/checkout/resume   body: { bid: "TP-XXX", e: "<exp>", t: "<hmac>" }
// (POST + body per Hermes round-2: the token must not ride a query string
// into access logs.)
//
// Powers the "finish your booking" link in the abandoned-cart recovery email:
// returns the saved booking (created before payment with status
// awaiting_payment) so the wizard can drop the customer straight on the
// Summary step — one tap from paying — instead of making them redo all four
// steps. The expiring HMAC token gates the PII (see lib/resume-token.ts); a
// bare, guessed or expired link gets a 404 indistinguishable from a missing
// row.
//
// The DB doesn't store delivery_window / billing / gclid (they only ride in
// the Checkout Session metadata), so we recover them from the customer's
// original session (Hermes B4). Best-effort: if the session can't be found,
// deliveryWindow comes back empty and the wizard re-asks the Dates step
// before allowing payment.

// Catalog presentation data the DB doesn't store — kept in sync with
// ServiceStep's GENERAL_SIZES / the checkout route's DIMS_MAP.
const DIMS_MAP: Record<string, string> = {
  "10": "12' L × 8' W × 2.5' H",
  "20": "16' L × 8' W × 4' H",
  "30": "16' L × 8' W × 6' H",
};
const LIGHT_SERVICES = [
  "Clean Soil",
  "Clean Concrete",
  "Mixed Materials",
  "Bricks",
  "Clean Asphalt",
];

interface BookingRow extends RowDataPacket {
  booking_id: string;
  service_type: string;
  dumpster_size: string;
  base_price: number | string;
  extra_days: number;
  extra_day_fee: number | string;
  total_price: number | string;
  delivery_date: string | Date;
  pickup_date: string | Date;
  address: string;
  city: string;
  zip_code: string;
  notes: string | null;
  status: string;
  created_at: string | Date;
  name: string;
  phone: string;
  email: string | null;
}

export async function POST(request: NextRequest) {
  // Token-guessing throttle: the HMAC is unguessable in practice, but no
  // reason to let anyone hammer the endpoint for free DB reads.
  const rl = checkRateLimit(`resume:${clientIp(request.headers)}`, 10, 10 * 60 * 1000);
  if (!rl.allowed) return NextResponse.json({ error: "Too many attempts" }, { status: 429 });

  let body: { bid?: string; t?: string; e?: string } = {};
  try {
    body = await request.json();
  } catch {
    /* handled below */
  }
  const bid = typeof body.bid === "string" ? body.bid : "";
  const token = typeof body.t === "string" ? body.t : "";
  const exp = typeof body.e === "string" ? body.e : "";
  if (!isValidBookingId(bid) || !verifyBookingToken(bid, token, exp)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const db = getPool();
    const [rows] = await db.execute<BookingRow[]>(
      `SELECT b.booking_id, b.service_type, b.dumpster_size, b.base_price,
              b.extra_days, b.extra_day_fee, b.total_price, b.delivery_date,
              b.pickup_date, b.address, b.city, b.zip_code, b.notes, b.status,
              b.created_at, c.name, c.phone, c.email
         FROM bookings b
         JOIN customers c ON c.id = b.customer_id
        WHERE b.booking_id = ?
        LIMIT 1`,
      [bid]
    );
    const row = rows[0];
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (row.status !== "awaiting_payment") {
      // Paid, cancelled, whatever — nothing to resume. The wizard shows a
      // friendly "already handled, call us if something's off" note.
      return NextResponse.json({ alreadyHandled: true });
    }

    // A delivery date that already passed can't just be re-charged — the
    // customer needs a human to pick a new date.
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });
    const deliveryDay = dateToYMD(row.delivery_date);
    if (deliveryDay && deliveryDay < today) {
      return NextResponse.json({ expired: true });
    }

    // Recover session-only fields from the customer's original Checkout
    // Session (matched by metadata.booking_id among sessions created since
    // the booking row). Best-effort — a miss degrades to re-asking the
    // delivery window, never to a wrong charge.
    let deliveryWindow = "";
    let gclid = "";
    let authorizedCharges = false;
    let billingAddress: { line1: string; city: string; state: string; zip: string } | null = null;
    try {
      const stripe = getStripe();
      const createdSec = Math.floor(new Date(row.created_at as string | Date).getTime() / 1000) - 300;
      const sessions = await stripe.checkout.sessions.list({ created: { gte: createdSec }, limit: 100 });
      const match = sessions.data.find((s) => s.metadata?.booking_id === bid);
      if (match) {
        // The original session's STATE decides what resuming even means
        // (Hermes round-2 bloqueante): a completed session = the customer
        // already paid and only the webhook's DB update is missing — never
        // offer to pay again. An open one is expired here so exactly one
        // payable session can exist once the customer hits Pay.
        if (match.status === "complete") {
          console.error(`🚨 Resume ${bid}: session ${match.id} is COMPLETE but booking is awaiting_payment in MySQL — webhook missed an update, check it`);
          return NextResponse.json({ alreadyHandled: true });
        }
        if (match.status === "open") {
          try {
            await stripe.checkout.sessions.expire(match.id);
          } catch (expireErr) {
            console.warn(`Resume ${bid}: couldn't expire open session ${match.id}: ${String(expireErr).slice(0, 120)}`);
          }
        }
        const md = match.metadata;
        if (md) {
          deliveryWindow = md.delivery_window || "";
          gclid = md.gclid || "";
          authorizedCharges = md.authorized_charges === "true";
          if (md.billing_line1) {
            billingAddress = {
              line1: md.billing_line1,
              city: md.billing_city || "",
              state: md.billing_state || "",
              zip: md.billing_zip || "",
            };
          }
        }
      }
    } catch (err) {
      console.warn(`Resume ${bid}: session metadata recovery failed (${String(err).slice(0, 120)})`);
    }

    const sizeNum = String(row.dumpster_size || "").replace(/[^0-9]/g, "");
    const isLight = LIGHT_SERVICES.includes(row.service_type);
    const weightLimit = isLight
      ? "No weight limit"
      : ({ "10": "1 ton", "20": "2 tons", "30": "3 tons" } as Record<string, string>)[sizeNum] || "N/A";

    return NextResponse.json({
      success: true,
      gclid,
      booking: {
        service: {
          serviceType: row.service_type,
          size: row.dumpster_size,
          basePrice: Number(row.base_price),
          baseDays: isLight ? 3 : 7,
          weightLimit,
          dimensions: DIMS_MAP[sizeNum] || "",
        },
        deliveryDate: deliveryDay,
        deliveryWindow,
        pickupDate: dateToYMD(row.pickup_date),
        extraDays: Number(row.extra_days) || 0,
        extraDayFee: Number(row.extra_day_fee) || 75,
        totalPrice: Number(row.total_price),
        // Summary hides the discount row when these are 0 (Hermes B4
        // residual) — reconstruct them the same way the wizard computes them.
        subtotal: Number(row.base_price) + (Number(row.extra_days) || 0) * (Number(row.extra_day_fee) || 75),
        onlineDiscount: 50,
        address: row.address,
        city: row.city,
        zipCode: row.zip_code,
        customerName: row.name,
        customerPhone: row.phone,
        customerEmail: row.email || "",
        notes: row.notes || "",
        billingAddress,
        authorizedCharges,
      },
    });
  } catch (err) {
    console.error("Resume lookup error:", err);
    return NextResponse.json({ error: "Lookup failed" }, { status: 500 });
  }
}
