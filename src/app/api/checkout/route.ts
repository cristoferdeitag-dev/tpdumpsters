import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { randomUUID } from "crypto";
import { getPool, initDB } from "@/lib/db";

let dbInitialized = false;

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
          booking.totalPrice,
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
    const lightServices = ["Clean Soil", "Clean Concrete", "Mixed Materials"];
    const isLight = lightServices.includes(booking.service.serviceType);
    const rentalDays = isLight ? 3 : 7;
    const weightLimit = isLight
      ? "No weight limit"
      : ({ "10": "1 ton", "20": "2 tons", "30": "3 tons" } as Record<string, string>)[sizeNum] || "N/A";
    const sizeBullet = dims
      ? `${sizeNum}-yard dumpster for ${booking.service.serviceType.toLowerCase()} (${dims})`
      : `${sizeNum}-yard dumpster for ${booking.service.serviceType.toLowerCase()}`;
    const rentalTerms = [
      sizeBullet,
      `Rental includes ${rentalDays} days — extra days: $49/day`,
      `Weight limit: ${weightLimit}`,
      ...(isLight ? [] : [`Overweight fee: $135 per extra ton (prorated)`]),
      `Mattresses / appliances / electronics / tires: $20-$60 each`,
      `Do not exceed the marked fill line`,
      `No prohibited materials`,
    ].map((line) => `• ${line}`).join("\n");

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
            unit_amount: Math.round(booking.totalPrice * 100), // cents
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
      },
      success_url: `${origin}/booking/success?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
      cancel_url: `${origin}/booking?cancelled=true`,
    });

    console.log(
      `💳 CHECKOUT: ${bookingId} | ${booking.service.serviceType} ${booking.service.size} | ${booking.customerName} | $${booking.totalPrice} | Session: ${session.id}`
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
