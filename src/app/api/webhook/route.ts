import { NextRequest, NextResponse } from "next/server";
import { createCalendarEvent } from "@/lib/calendar";
import { sendSMS } from "@/lib/twilio";
import { notifyAdminsTelegram } from "@/lib/telegram";
import * as mysql from "mysql2/promise";
import * as fs from "fs";
import * as crypto from "crypto";

// Type codes mapping (service name → short code for calendar summary)
const TYPE_CODES: Record<string, string> = {
  "General Debris": "GD",
  "Household Clean Out": "HJ",
  "Construction Debris": "CD",
  "Roofing": "RF",
  "Green Waste": "GW",
  "Clean Soil": "CS",
  "Clean Concrete": "CC",
  "Mixed Materials": "MM",
};

function getDbConfig() {
  return {
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
  };
}

function getWebhookSecret(): string | null {
  try {
    const keys = JSON.parse(fs.readFileSync("/home/u781187371/stripe-keys.json", "utf8"));
    return keys.webhook_secret || null;
  } catch {
    return null;
  }
}

function verifyStripeSignature(payload: string, sigHeader: string, secret: string): boolean {
  const parts = sigHeader.split(",").reduce((acc, part) => {
    const [key, val] = part.split("=");
    acc[key.trim()] = val;
    return acc;
  }, {} as Record<string, string>);

  const timestamp = parts["t"];
  const signature = parts["v1"];
  if (!timestamp || !signature) return false;

  // Reject if timestamp is older than 5 minutes
  const age = Math.floor(Date.now() / 1000) - parseInt(timestamp, 10);
  if (age > 300) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const expected = crypto.createHmac("sha256", secret).update(signedPayload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export async function POST(req: NextRequest) {
  try {
    // Verify Stripe webhook signature
    const rawBody = await req.text();
    const sigHeader = req.headers.get("stripe-signature") || "";
    const webhookSecret = getWebhookSecret();

    if (webhookSecret) {
      if (!verifyStripeSignature(rawBody, sigHeader, webhookSecret)) {
        console.error("❌ Webhook: Invalid Stripe signature");
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
      console.log("✅ Webhook: Stripe signature verified");
    } else {
      console.warn("⚠️ Webhook: No webhook secret configured, skipping verification");
    }

    const event = JSON.parse(rawBody);

    // Manual-invoice flow — Asaí creates invoices in the Stripe Dashboard
    // and the customer pays them. We don't auto-classify line items here
    // (that lived in the legacy tp-dumpsters repo against Supabase); we
    // just ping Cris + Asaí so they know cash landed.
    if (event.type === "invoice.payment_succeeded") {
      const inv = event.data?.object || {};
      const amountPaid = ((inv.amount_paid || 0) / 100).toFixed(2);
      const customerName: string =
        inv.customer_name || inv.customer_details?.name || "";
      const customerEmail: string = inv.customer_email || "";
      const invoiceNumber: string = inv.number || inv.id || "";
      const lineDescription: string =
        (inv.description as string) ||
        (inv.lines?.data?.[0]?.description as string) ||
        "";

      const text =
        `💰 *Stripe invoice paid — $${amountPaid}*\n\n` +
        `👤 ${customerName || "(sin nombre)"}` +
        (customerEmail ? ` — ${customerEmail}` : "") +
        `\n🧾 ${invoiceNumber}` +
        (lineDescription ? `\n📝 ${lineDescription.slice(0, 200)}` : "") +
        `\n🔗 https://dashboard.stripe.com/invoices/${inv.id}`;
      try {
        await notifyAdminsTelegram(text);
      } catch (telErr) {
        console.error("📨 Admin Telegram (invoice) error:", telErr);
      }
      return NextResponse.json({
        received: true,
        type: "invoice.payment_succeeded",
        invoice: invoiceNumber,
      });
    }

    // Only handle checkout.session.completed for the online booking flow
    if (event.type !== "checkout.session.completed") {
      console.log(`⏭️ Webhook: ignoring event type ${event.type}`);
      return NextResponse.json({ received: true, ignored: true });
    }

    const session = event.data?.object;
    if (!session?.metadata) {
      console.error("⚠️ Webhook: no metadata in session");
      return NextResponse.json({ received: true, error: "no metadata" });
    }

    const meta = session.metadata;
    const bookingId = meta.booking_id;
    const customerName = meta.customer_name;
    const customerPhone = meta.customer_phone;
    const customerEmail = session.customer_details?.email || "";
    const serviceType = meta.service_type;
    const dumpsterSize = meta.dumpster_size;
    const deliveryDate = meta.delivery_date;
    const pickupDate = meta.pickup_date;
    const address = meta.address;
    const city = meta.city;
    const zipCode = meta.zip_code;
    const deliveryWindow = meta.delivery_window || "";

    // Map delivery windows to start/end times
    const WINDOWS: Record<string, { start: string; end: string; label: string }> = {
      morning: { start: "07:00:00", end: "11:00:00", label: "Morning (7AM-11AM)" },
      midday: { start: "11:00:00", end: "15:00:00", label: "Midday (11AM-3PM)" },
      afternoon: { start: "15:00:00", end: "19:00:00", label: "Afternoon (3PM-7PM)" },
    };
    const windowInfo = WINDOWS[deliveryWindow];
    const totalPaid = session.amount_total
      ? `$${(session.amount_total / 100).toFixed(2)}`
      : "N/A";

    console.log(
      `💰 PAYMENT RECEIVED: ${bookingId} | ${customerName} | ${serviceType} ${dumpsterSize} | ${totalPaid}`
    );

    // Build type code for calendar summary
    const typeCode = TYPE_CODES[serviceType] || "GD";
    const fullAddress = [address, city, zipCode].filter(Boolean).join(", ");

    // Build description for calendar events
    const customerNotes = (session.metadata?.notes || "").trim();
    const eventDescription = [
      `Booking ID: ${bookingId}`,
      `Service: ${serviceType} - ${dumpsterSize} Yard`,
      windowInfo ? `Delivery Window: ${windowInfo.label}` : null,
      `Phone: ${customerPhone}`,
      `Email: ${customerEmail}`,
      `Total: ${totalPaid}`,
      `Address: ${fullAddress}`,
      customerNotes ? `Notes: ${customerNotes}` : null,
      `Booked online via tpdumpsters.com`,
    ].filter(Boolean).join("\n");

    // 1. Update booking status in MySQL
    let dbUpdated = false;
    try {
      const conn = await mysql.createConnection(getDbConfig());
      await conn.execute(
        "UPDATE bookings SET status = 'confirmed', updated_at = NOW() WHERE booking_id = ?",
        [bookingId]
      );
      await conn.end();
      dbUpdated = true;
      console.log(`✅ DB: Booking ${bookingId} status → confirmed`);
    } catch (dbErr) {
      console.error("❌ DB update error:", dbErr);
    }

    // 2. Create delivery calendar event (timed if window selected, otherwise all-day)
    const deliverySummary = `${customerName} ${dumpsterSize}${typeCode}delivery`;
    const deliveryResult = await createCalendarEvent({
      summary: deliverySummary,
      date: deliveryDate,
      description: eventDescription,
      location: fullAddress,
      colorId: "10", // green for delivery
      ...(windowInfo ? { startTime: windowInfo.start, endTime: windowInfo.end } : {}),
    });

    // 3. Create pickup calendar event
    const pickupSummary = `${customerName} ${dumpsterSize}${typeCode}pickup`;
    const pickupResult = await createCalendarEvent({
      summary: pickupSummary,
      date: pickupDate,
      description: eventDescription,
      location: fullAddress,
      colorId: "11", // red for pickup
    });

    console.log(
      `📅 Calendar events: delivery=${deliveryResult.success ? deliveryResult.eventId : "FAILED"}, pickup=${pickupResult.success ? pickupResult.eventId : "FAILED"}`
    );

    // Send booking confirmation SMS (non-blocking — failures don't affect response)
    let smsSent = false;
    if (customerPhone) {
      try {
        const windowLabels: Record<string, string> = {
          morning: "7:00 AM - 11:00 AM",
          midday: "11:00 AM - 3:00 PM",
          afternoon: "3:00 PM - 7:00 PM",
        };
        const deliveryWindowMeta = meta.delivery_window || "";
        const windowLabel = windowLabels[deliveryWindowMeta] || "7:00 AM - 5:00 PM";

        const formattedDate = new Date(deliveryDate + "T12:00:00").toLocaleDateString("en-US", {
          weekday: "short", month: "short", day: "numeric",
        });

        const smsBody = `Hi ${customerName.split(" ")[0]}! Your dumpster rental is confirmed ✅\n\n` +
          `📋 Booking: ${bookingId}\n` +
          `🗑️ ${serviceType} - ${dumpsterSize} Yard\n` +
          `📦 Delivery: ${formattedDate} (${windowLabel})\n` +
          `📍 ${fullAddress}\n\n` +
          `Questions? Call (510) 650-2083\n` +
          `— TP Dumpsters`;

        const smsResult = await sendSMS(customerPhone, smsBody);
        smsSent = smsResult.success;
        console.log(`📱 Confirmation SMS: ${smsResult.success ? "sent" : "failed"}`);
      } catch (smsErr) {
        console.error("📱 SMS error (non-blocking):", smsErr);
      }
    }

    // Admin Telegram notification (Cristofer + Asaí). Migrated 2026-04-28
    // in the legacy tp-dumpsters repo but never landed on this live repo —
    // ported here on 2026-05-04 after Asaí flagged she wasn't being paged.
    const adminWindowLabel = windowInfo?.label || "TBD";
    const deliveryDateLabel = deliveryDate
      ? new Date(deliveryDate + "T12:00:00").toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      : "";
    const adminTelegram =
      `💰 *New booking paid — ${totalPaid}*\n\n` +
      `👤 ${customerName}${customerPhone ? ` — ${customerPhone}` : ""}\n` +
      `🗑️ ${dumpsterSize} ${serviceType}\n` +
      `📦 ${deliveryDateLabel || deliveryDate} — ${adminWindowLabel}\n` +
      `📍 ${fullAddress}\n` +
      `📋 ${bookingId}`;
    let adminNotified = false;
    try {
      await notifyAdminsTelegram(adminTelegram);
      adminNotified = true;
      console.log("📨 Admin Telegram notified");
    } catch (telErr) {
      console.error("📨 Admin Telegram error (non-blocking):", telErr);
    }

    // Forward the confirmed booking to the Dumpsterin app so Asaí can see
    // the customer with full address details in the operations CRM. Same
    // contract that lived in the legacy tp-dumpsters repo. Non-blocking —
    // if the Edge Function is down the booking still completes here.
    let dumpsterinSynced = false;
    try {
      const totalPriceUsd = session.amount_total ? session.amount_total / 100 : 0;
      const dumpsterinRes = await fetch(
        "https://mbirzaocjkhqydtuqmze.supabase.co/functions/v1/webhook-booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-webhook-secret": "tp-dumpsters-webhook-2026",
          },
          body: JSON.stringify({
            bookingId,
            customerName,
            customerPhone,
            customerEmail,
            service: {
              serviceType,
              size: dumpsterSize,
              basePrice: totalPriceUsd,
            },
            deliveryDate,
            pickupDate,
            deliveryWindow,
            address,
            city,
            zipCode,
            totalPrice: totalPriceUsd,
            notes: `Paid online via Stripe | ${totalPaid}`,
          }),
        }
      );
      dumpsterinSynced = dumpsterinRes.ok;
      if (!dumpsterinRes.ok) {
        const body = await dumpsterinRes.text().catch(() => "");
        console.error(
          `🔗 Dumpsterin sync HTTP ${dumpsterinRes.status}: ${body.slice(0, 300)}`
        );
      } else {
        console.log("🔗 Dumpsterin sync: success");
      }
    } catch (syncErr) {
      console.error("🔗 Dumpsterin sync error (non-blocking):", syncErr);
    }

    return NextResponse.json({
      received: true,
      bookingId,
      dbUpdated,
      calendarEvents: {
        delivery: deliveryResult,
        pickup: pickupResult,
      },
      smsSent,
      adminNotified,
      dumpsterinSynced,
    });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
