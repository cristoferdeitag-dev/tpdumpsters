import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { randomUUID } from "crypto";
import { getPool, initDB } from "@/lib/db";
import { isDateBlocked, blockedReason } from "@/lib/availability";

let dbInitialized = false;

// ── SERVER-AUTHORITATIVE PRICING ──────────────────────────────────────
// The browser sends booking.totalPrice, but we DO NOT trust it for the
// actual charge. A client-side bug (e.g. the old double-$50-online-discount
// that undercharged booking TP-MQ5MS7Y0 / Louann $649 instead of $699 on
// 2026-06-08) or a tampered POST could under/over-charge. The server
// recomputes the real price from this ONE table — the ONLINE price the
// customer is shown (sticker − $50 online discount) per service + size —
// and charges THAT. Keep in sync with the booking flow (ServiceStep
// GENERAL_SIZES) and /api/invoice.
const ONLINE_PRICES: Record<string, Record<string, number>> = {
  "General Debris":      { "10": 599, "20": 699, "30": 799 },
  "Household Clean Out": { "10": 599, "20": 699, "30": 799 },
  "Construction Debris": { "10": 599, "20": 699, "30": 799 },
  "Roofing":             { "10": 599, "20": 699, "30": 799 },
  "Green Waste":         { "10": 599, "20": 699, "30": 799 },
  "Clean Soil":          { "10": 599 },
  "Clean Concrete":      { "10": 599 },
  "Mixed Materials":     { "10": 749 },
  "Bricks":              { "10": 749 },
  "Clean Asphalt":       { "10": 749 },
};
const EXTRA_DAY_FEE = 75;

// Authoritative total for a booking, or null if the service/size isn't in
// the catalog (caller then falls back to the client value, logged loudly).
function serverTotalFor(serviceType: string, size: string, extraDays: number): number | null {
  const sizeNum = String(size || "").replace(/[^0-9]/g, "");
  const base = ONLINE_PRICES[serviceType]?.[sizeNum];
  if (base == null) return null;
  const days = Number.isFinite(extraDays) && extraDays > 0 ? Math.min(extraDays, 60) : 0;
  return base + days * EXTRA_DAY_FEE;
}

export async function POST(request: Request) {
  try {
    const booking = await request.json();

    // Validate required fields
    if (
      !booking.service ||
      !booking.deliveryDate ||
      !booking.pickupDate ||
      !booking.address ||
      !booking.customerName ||
      !booking.customerPhone
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // PRICE INTEGRITY (server-authoritative): never trust booking.totalPrice
    // for the charge. Recompute from the catalog and charge THAT — this kills
    // the old double-$50-discount bug and any client-side tampering at the
    // source, regardless of what the (possibly stale/cached) browser sends.
    // For an uncatalogued service we fall back to the client value but log it
    // loudly so it can't slip by unnoticed.
    const clientTotal = Number(booking.totalPrice);
    const computedTotal = serverTotalFor(
      booking.service.serviceType,
      booking.service.size,
      Number(booking.extraDays)
    );
    let chargeTotal: number;
    if (computedTotal != null) {
      chargeTotal = computedTotal;
      if (!Number.isFinite(clientTotal) || Math.abs(clientTotal - computedTotal) > 1) {
        console.warn(
          `⚠️ CHECKOUT price corrected: ${booking.service.serviceType} ${booking.service.size} extraDays=${booking.extraDays} client=$${clientTotal} → charged server price $${computedTotal}`
        );
      }
    } else {
      if (!Number.isFinite(clientTotal) || clientTotal <= 0) {
        return NextResponse.json({ error: "Invalid total price" }, { status: 400 });
      }
      chargeTotal = clientTotal;
      console.warn(
        `⚠️ CHECKOUT uncatalogued service — charging client total: ${booking.service.serviceType} ${booking.service.size} total=$${clientTotal}`
      );
    }

    // Reject delivery dates the yard can't service (fully booked).
    // Belt-and-suspenders: the DateStep client also blocks these, but a
    // savvy customer could POST directly to /api/checkout.
    if (isDateBlocked(booking.deliveryDate)) {
      return NextResponse.json(
        { error: blockedReason(booking.deliveryDate) },
        { status: 400 }
      );
    }

    // Generate booking ID
    const bookingId = `TP-${Date.now().toString(36).toUpperCase()}`;
    const customerId = randomUUID();
    const bookingDbId = randomUUID();

    // Save booking to DB with status 'awaiting_payment'
    const db = getPool();
    if (!dbInitialized) {
      try {
        await initDB();
        dbInitialized = true;
      } catch (dbError) {
        console.error("DB init error (continuing):", dbError);
      }
    }

    try {
      await db.execute(
        "INSERT INTO customers (id, name, phone, email) VALUES (?, ?, ?, ?)",
        [customerId, booking.customerName, booking.customerPhone, booking.customerEmail || null]
      );

      await db.execute(
        `INSERT INTO bookings (id, booking_id, customer_id, service_type, dumpster_size, 
         base_price, extra_days, extra_day_fee, total_price, delivery_date, pickup_date, 
         address, city, zip_code, notes, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'awaiting_payment')`,
        [
          bookingDbId,
          bookingId,
          customerId,
          booking.service.serviceType,
          booking.service.size,
          booking.service.basePrice,
          booking.extraDays,
          booking.extraDayFee,
          chargeTotal,
          booking.deliveryDate,
          booking.pickupDate,
          booking.address,
          booking.city,
          booking.zipCode,
          booking.notes || null,
        ]
      );
    } catch (dbError) {
      console.error("DB write error (continuing):", dbError);
    }

    // Parse out billing address. If the form provided billingAddress as a
    // separate string, use it; otherwise fall back to the delivery address
    // (most customers bill where they get the dumpster).
    const billingLine1 = booking.billingAddress?.line1 || booking.address;
    const billingCity  = booking.billingAddress?.city  || booking.city;
    const billingState = booking.billingAddress?.state || booking.state || "CA";
    const billingZip   = booking.billingAddress?.zip   || booking.zipCode;

    // Create Stripe Customer with full billing AND shipping address so the
    // generated invoice renders both "Bill to" and "Ship to" sections, just
    // like Asaí's manual invoices.
    const stripeCustomer = await getStripe().customers.create({
      email: booking.customerEmail,
      name: booking.customerName,
      phone: booking.customerPhone,
      address: {
        line1: billingLine1,
        city: billingCity,
        state: billingState,
        postal_code: billingZip,
        country: "US",
      },
      shipping: {
        name: booking.customerName,
        phone: booking.customerPhone,
        address: {
          line1: booking.address,
          city: booking.city,
          state: booking.state || "CA",
          postal_code: booking.zipCode,
          country: "US",
        },
      },
      metadata: { booking_id: bookingId },
    });

    // Build line item description
    // Map delivery window to label
    // Display map: midday remains so legacy bookings still render correctly.
    const windowLabels: Record<string, string> = {
      morning: "Morning (7AM-12PM)",
      midday: "Midday (11AM-3PM)",
      afternoon: "Afternoon (2PM-7PM)",
    };
    const windowLabel = windowLabels[booking.deliveryWindow] || "";

    // Bare line-item description per Asaí (2026-05-01): no dates, no
    // address, no surcharges in description. Dates move to custom_fields,
    // address sits in Ship to, surcharges become their own line items.
    const sizeNumDesc = booking.service.size?.replace(" Yard", "").replace("yd", "") || "?";
    const description = `${sizeNumDesc}-yard dumpster for ${booking.service.serviceType.toLowerCase()}`;

    // Bulleted rental terms for the ONLINE flow — customer is paying right
    // now via Stripe Checkout, so we omit Zelle / pay-online / cancellation /
    // payment-upon-arrival lines (none of them apply to online bookings).
    const DIMS_MAP: Record<string, string> = {
      "10": "12' L × 8' W × 2.5' H",
      "20": "16' L × 8' W × 4' H",
      "30": "16' L × 8' W × 6' H",
    };
    const sizeNum = booking.service.size?.replace(" Yard", "").replace("yd", "") || "?";
    const dims = DIMS_MAP[sizeNum] || "";
    // Light loads: clean soil/concrete/mixed-of-those/bricks/asphalt. All
    // 10-yard only, 3-day rental, no weight limit, $150 prohibited-items
    // fee. They DO NOT carry the mattresses/appliances surcharge line that
    // belongs to general-debris-family services.
    const lightServices = [
      "Clean Soil",
      "Clean Concrete",
      "Mixed Materials",
      "Bricks",
      "Clean Asphalt",
    ];
    const isLight = lightServices.includes(booking.service.serviceType);
    const rentalDays = isLight ? 3 : 7;
    const weightLimit = isLight
      ? "No weight limit"
      : ({ "10": "1 ton", "20": "2 tons", "30": "3 tons" } as Record<string, string>)[sizeNum] || "N/A";

    // Per-service line copy. Mixed Materials = clean soil + clean concrete
    // (NOT bricks — bricks is its own service). Asphalt and Bricks each
    // get their own descriptive bullet.
    const LIGHT_DESCRIPTIONS: Record<string, string> = {
      "Clean Soil": "10-yard dumpster for clean soil",
      "Clean Concrete": "10-yard dumpster for clean concrete",
      "Mixed Materials": "10-yard dumpster for mixed materials (clean soil + clean concrete)",
      "Bricks": "10-yard dumpster for clean bricks",
      "Clean Asphalt": "10-yard dumpster for clean asphalt",
    };
    const baseBullet = isLight
      ? (LIGHT_DESCRIPTIONS[booking.service.serviceType] || `${sizeNum}-yard dumpster for ${booking.service.serviceType.toLowerCase()}`)
      : `${sizeNum}-yard dumpster for ${booking.service.serviceType.toLowerCase()}`;
    const sizeBullet = dims ? `${baseBullet} (${dims})` : baseBullet;

    // Per-service prohibited-materials guidance (Asaí 2026-05-16: light
    // loads must NOT carry the mattresses surcharge line — that's a
    // general-debris term and ends up wrong on a soil/concrete invoice).
    const LIGHT_PURITY: Record<string, string> = {
      "Clean Soil": "95% pure — no rocks, grass, gravel, mesh, wood, rebar, or garbage",
      "Clean Concrete": "95% pure — no rebar, wood, dirt, grass, or garbage",
      "Mixed Materials": "95% pure clean soil + clean concrete — no rocks, grass, gravel, mesh, wood, rebar, or garbage",
      "Bricks": "Clean bricks only — no rocks, grass, gravel, mesh, wood, rebar, or garbage",
      "Clean Asphalt": "95% pure — no dirt, concrete, rebar, gravel, wood, trash, grass, fabric, or mixed materials",
    };
    const rentalTerms = (
      isLight
        ? [
            sizeBullet,
            `Rental includes ${rentalDays} days — extra days: $75/day`,
            `Weight limit: ${weightLimit}`,
            LIGHT_PURITY[booking.service.serviceType] || "Clean loads must be 95% pure",
            `Extra fee: $150 if prohibited items are added`,
            `Do not exceed the marked fill line`,
          ]
        : [
            sizeBullet,
            `Rental includes ${rentalDays} days — extra days: $75/day`,
            `Weight limit: ${weightLimit}`,
            `Overweight fee: $199 per extra ton (prorated)`,
            `Mattresses / appliances / electronics / tires: $20-$60 each`,
            `Do not exceed the marked fill line`,
            `No prohibited materials`,
          ]
    ).map((line) => `• ${line}`).join("\n");

    // Create Stripe Checkout Session
    const origin = request.headers.get("origin") || "https://tpdumpsters.com";

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer: stripeCustomer.id,
      // Auto-generate a finalized invoice on payment success with the same
      // formatting Asaí uses on her manual invoices (bulleted terms +
      // ship-to address visible).
      invoice_creation: {
        enabled: true,
        invoice_data: {
          // Per Asaí (2026-05-01): "Thanks for choosing TP Dumpsters!" goes
          // INSIDE the General Rental Terms block, NOT in the footer (where
          // Stripe renders it below Amount Due).
          description: `General Rental Terms:\n${rentalTerms}\n\nThanks for choosing TP Dumpsters!`,
          metadata: {
            booking_id: bookingId,
            customer_name: booking.customerName,
            service_type: booking.service.serviceType,
            dumpster_size: booking.service.size,
          },
          custom_fields: [
            { name: "Booking ID", value: bookingId },
            { name: "Delivery Date", value: `${booking.deliveryDate}${windowLabel ? ` — ${windowLabel}` : ""}` },
            { name: "Pickup Date", value: booking.pickupDate || "" },
          ],
        },
      },
      payment_intent_data: {
        setup_future_usage: 'off_session',
        statement_descriptor: 'TP DUMPSTERS',
        statement_descriptor_suffix: 'DUMPSTER',
        receipt_email: booking.customerEmail,
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Dumpster Rental - ${booking.service.serviceType} ${booking.service.size}`,
              description,
              images: ["https://tpdumpsters.com/images/hero/red-dumpster-construction.png"],
            },
            unit_amount: Math.round(chargeTotal * 100), // cents (server-authoritative)
          },
          quantity: 1,
        },
      ],
      metadata: {
        booking_id: bookingId,
        customer_name: booking.customerName,
        customer_phone: booking.customerPhone,
        service_type: booking.service.serviceType,
        dumpster_size: booking.service.size,
        delivery_date: booking.deliveryDate,
        pickup_date: booking.pickupDate,
        address: booking.address,
        city: booking.city,
        zip_code: booking.zipCode,
        authorized_charges: String(booking.authorizedCharges || false),
        delivery_window: booking.deliveryWindow || "",
        notes: (booking.notes || "").slice(0, 500),
        billing_line1: booking.billingAddress?.line1 || "",
        billing_city: booking.billingAddress?.city || "",
        billing_state: booking.billingAddress?.state || "",
        billing_zip: booking.billingAddress?.zip || "",
      },
      success_url: `${origin}/booking/success?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
      cancel_url: `${origin}/booking?cancelled=true`,
    });

    console.log(
      `💳 CHECKOUT: ${bookingId} | ${booking.service.serviceType} ${booking.service.size} | ${booking.customerName} | $${chargeTotal} | Session: ${session.id}`
    );

    return NextResponse.json({
      success: true,
      bookingId,
      checkoutUrl: session.url,
    });
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
