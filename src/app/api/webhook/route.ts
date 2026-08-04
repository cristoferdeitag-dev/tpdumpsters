import { NextRequest, NextResponse } from "next/server";
import { createCalendarEvent, findNextPickupSlot } from "@/lib/calendar";
// sendSMS import removed — customer SMS disabled by Cris 2026-08-04 (msg
// 4487); re-add the import from "@/lib/twilio" when SMS comes back.
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
  // Hostinger does NOT inject env vars, so the env-only version of this ran
  // with user ''/password '' in prod — every webhook DB write (dedupe AND the
  // status→confirmed UPDATE) failed with "Access denied ''@127.0.0.1". Found
  // 4-ago-2026 on the first live event after the webhook-secret fix. Same
  // file-based creds pattern as lib/db (which was fixed on 10-jun; this
  // route's own copy was missed). Env stays as the local/dev fallback.
  let password = process.env.DB_PASSWORD || "";
  try {
    const parsed = JSON.parse(fs.readFileSync("/home/u781187371/db-creds.json", "utf8"));
    if (typeof parsed.password === "string" && parsed.password) password = parsed.password;
  } catch {
    /* file missing (local/dev) — env fallback stands */
  }
  return {
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "u781187371_cristoferdeita",
    password,
    database: process.env.DB_NAME || "u781187371_DumspterBookin",
  };
}

// Idempotency (Sol audit 2026-07-23): Stripe retries deliveries, and the
// handlers below have side effects (calendar, SMS, Telegram, CRM mirror).
// First claim of an event id wins; replays return early. The claim happens
// BEFORE any side effect. On a DB hiccup we process anyway — a duplicate
// SMS is cheaper than a paying customer's booking never being fulfilled.
async function claimEvent(eventId: string): Promise<boolean> {
  let conn: mysql.Connection | null = null;
  try {
    conn = await mysql.createConnection(getDbConfig());
    await conn.execute(
      "CREATE TABLE IF NOT EXISTS stripe_webhook_events (event_id VARCHAR(255) PRIMARY KEY, received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
    );
    await conn.execute("INSERT INTO stripe_webhook_events (event_id) VALUES (?)", [eventId]);
    return true;
  } catch (err) {
    if ((err as { code?: string }).code === "ER_DUP_ENTRY") return false;
    console.error("⚠️ Webhook dedupe unavailable, processing anyway:", (err as Error).message);
    return true;
  } finally {
    await conn?.end().catch(() => {});
  }
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

    if (!webhookSecret) {
      // Fail closed: never process an unverified event. If the secret can't be
      // read, that's a server misconfig — reject rather than trust the payload.
      console.error("❌ Webhook: No webhook secret configured — rejecting event");
      return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
    }
    if (!verifyStripeSignature(rawBody, sigHeader, webhookSecret)) {
      console.error("❌ Webhook: Invalid Stripe signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
    console.log("✅ Webhook: Stripe signature verified");

    const event = JSON.parse(rawBody);

    if (event.id && !(await claimEvent(event.id))) {
      console.log(`⏭️ Webhook: duplicate delivery of ${event.id} — already processed`);
      return NextResponse.json({ received: true, duplicate: true });
    }

    // Manual-invoice flow — Asaí or Thiago creates invoices in the Stripe
    // Dashboard and the customer pays them (Stripe link OR offline marked
    // paid manually). For each one we (a) notify admins and (b) mirror the
    // booking into Dumpsterin so the CRM stays in sync with cash flow.
    if (event.type === "invoice.payment_succeeded") {
      const inv = event.data?.object || {};
      const amountPaid = ((inv.amount_paid || 0) / 100).toFixed(2);
      const customerName: string =
        inv.customer_name || inv.customer_details?.name || "";
      const customerEmail: string = inv.customer_email || "";
      const customerPhone: string = inv.customer_phone || "";
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

      // Sync to Dumpsterin so Asaí / Cris see this paid invoice in the CRM.
      // We POST directly to the Supabase bookings table because the
      // webhook-booking Edge Function expects fields we don't have here
      // (deliveryWindow, etc.). One row per invoice; multi-dumpster invoices
      // get a single row matching the total — same convention used by the
      // existing Dumpsterin sync.
      try {
        const supaUrl =
          process.env.NEXT_PUBLIC_SUPABASE_URL ||
          "https://mbirzaocjkhqydtuqmze.supabase.co";
        const supaKey = process.env.SUPABASE_SERVICE_KEY || "";
        if (!supaKey) {
          console.warn(
            "⚠️ Dumpsterin invoice sync skipped — SUPABASE_SERVICE_KEY not set"
          );
        } else {
          // De-dupe: skip if a booking with this stripe_invoice_id already
          // exists. The backfill script + checkout.session.completed sync
          // both can produce rows for the same invoice in edge cases.
          const checkUrl = `${supaUrl}/rest/v1/bookings?select=id&stripe_invoice_id=eq.${inv.id}`;
          const checkRes = await fetch(checkUrl, {
            headers: { apikey: supaKey, Authorization: `Bearer ${supaKey}` },
          });
          const existing = checkRes.ok ? await checkRes.json() : [];
          if (Array.isArray(existing) && existing.length > 0) {
            console.log(
              `🔗 Dumpsterin invoice sync: ${inv.id} already exists, skipping insert`
            );
          } else {
            // Classify sales rep by customer email/name against Thiago's
            // known clients. Anything else defaults to Asaí. Online bookings
            // go through checkout.session.completed, not this path.
            const THIAGO_NEEDLES = [
              "villatoro",
              "rockandr",
              "rock & rose",
              "buildhaven",
              "build haven",
              "kingdomconcrete",
              "kingdom concrete",
            ];
            const haystack = (
              (customerName || "") +
              " " +
              (customerEmail || "")
            ).toLowerCase();
            const salesRep = THIAGO_NEEDLES.some((n) => haystack.includes(n))
              ? "tiago"
              : "asai";

            // Derive size + service_type from the first dumpster-ish line
            // item. Falls back to "20 / General Debris" if nothing matches.
            const lines = (inv.lines?.data || []) as Array<{
              description?: string;
            }>;
            let size = 20;
            let serviceType = "General Debris";
            for (const li of lines) {
              const d = (li.description || "").toLowerCase();
              const m = d.match(/(\d+)[\s-]*yard/);
              if (m) size = parseInt(m[1], 10);
              if (d.includes("general debris")) serviceType = "General Debris";
              else if (d.includes("household")) serviceType = "Household Clean Out";
              else if (d.includes("construction"))
                serviceType = "Construction Debris";
              else if (d.includes("roofing")) serviceType = "Roofing";
              else if (d.includes("green waste") || d.includes("yard"))
                serviceType = "Green Waste";
              else if (d.includes("clean soil") || d.includes("clean concrete"))
                serviceType = "Clean Materials";
              else if (d.includes("mixed")) serviceType = "Mixed Materials";
              else if (d.includes("base rock") || d.includes("base gravel"))
                serviceType = "Base Rock";
              if (size && serviceType) break;
            }

            const paidAtTs =
              inv.status_transitions?.paid_at || Math.floor(Date.now() / 1000);
            const paidAtIso = new Date(paidAtTs * 1000).toISOString();
            const scheduledDate = paidAtIso.slice(0, 10);

            const addr = inv.customer_address || {};
            const addrLine = [addr.line1, addr.line2].filter(Boolean).join(" ");

            const row: Record<string, unknown> = {
              company_id: "a0000000-0000-0000-0000-000000000001",
              booking_number: invoiceNumber || `INV-${(inv.id as string).slice(0, 8)}`,
              customer_name: customerName.trim() || "Unknown",
              customer_email: customerEmail || "",
              customer_phone: customerPhone || "",
              address: addrLine,
              city: addr.city || "",
              state: addr.state || "CA",
              zip: addr.postal_code || "",
              service_type: serviceType,
              dumpster_size: size,
              scheduled_date: scheduledDate,
              status: "completed",
              base_price: (inv.total || 0) / 100,
              paid_amount: (inv.amount_paid || 0) / 100,
              paid_at: paidAtIso,
              payment_status: "paid",
              stripe_invoice_id: inv.id,
              sales_rep: salesRep,
              source: "phone",
              notes: `Auto-sync from Stripe invoice ${inv.id} paid $${amountPaid} on ${scheduledDate}`,
            };

            const insertRes = await fetch(`${supaUrl}/rest/v1/bookings`, {
              method: "POST",
              headers: {
                apikey: supaKey,
                Authorization: `Bearer ${supaKey}`,
                "Content-Type": "application/json",
                Prefer: "return=minimal",
              },
              body: JSON.stringify(row),
            });
            if (!insertRes.ok) {
              const body = await insertRes.text().catch(() => "");
              console.error(
                `🔗 Dumpsterin invoice sync HTTP ${insertRes.status}: ${body.slice(0, 300)}`
              );
            } else {
              console.log(
                `🔗 Dumpsterin invoice sync: inserted ${invoiceNumber} (${salesRep}, $${amountPaid})`
              );
            }
          }
        }
      } catch (syncErr) {
        console.error(
          "🔗 Dumpsterin invoice sync error (non-blocking):",
          syncErr
        );
      }

      // ── Radar Ads: TELEPHONE jobs (~90% of revenue). When Asaí's manually
      // created invoice is PAID, upload it as an offline conversion matched by
      // the customer's PHONE (Enhanced Conversions for Leads), so Google Ads
      // finally learns which ad-driven CALLS become paying jobs — not just the
      // 10% that book online. No gclid on a phone sale → we match by hashed
      // phone/email. Non-blocking: never affects the webhook response.
      try {
        const phoneRaw = (
          inv.customer_phone ||
          inv.metadata?.customer_phone ||
          ""
        ).trim();
        if (phoneRaw) {
          let radar: {
            offline_conv_secret?: string;
            endpoint_url?: string;
            tp_customer_id?: string;
            tp_conversion_action?: string;
          } | null = null;
          try {
            radar = JSON.parse(
              fs.readFileSync("/home/u781187371/radar-keys.json", "utf8")
            );
          } catch {
            radar = null;
          }
          if (radar?.offline_conv_secret && radar?.endpoint_url) {
            const valueUsd = inv.amount_paid ? inv.amount_paid / 100 : 0;
            const now = new Date();
            const pad = (n: number) => String(n).padStart(2, "0");
            const dt =
              `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(now.getUTCDate())} ` +
              `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}+00:00`;
            const resp = await fetch(radar.endpoint_url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                secret: radar.offline_conv_secret,
                customerId: radar.tp_customer_id,
                conversionAction: radar.tp_conversion_action,
                phone: phoneRaw,
                email: customerEmail || undefined,
                value: valueUsd,
                currency: "USD",
                conversionDateTime: dt,
                orderId: invoiceNumber || inv.id,
              }),
            });
            console.log(
              `🎯 Radar phone conversion: HTTP ${resp.status} (phone=***${phoneRaw.slice(-4)}, $${valueUsd})`
            );
          } else {
            console.warn(
              "🎯 Radar phone conversion skipped — radar-keys.json missing/incomplete"
            );
          }
        }
      } catch (radarErr) {
        console.error(
          "🎯 Radar phone conversion error (non-blocking):",
          radarErr
        );
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

    // Fulfill only PAID sessions (Sol audit): checkout.session.completed can
    // arrive with payment_status=unpaid for delayed payment methods. Cards
    // settle inline, so anything not "paid" here gets logged and skipped.
    if (session.payment_status && session.payment_status !== "paid") {
      console.warn(
        `⏳ Webhook: session ${session.id} completed with payment_status=${session.payment_status} — not fulfilling`
      );
      return NextResponse.json({ received: true, awaiting_payment: true });
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
      morning: { start: "07:00:00", end: "12:00:00", label: "Morning (7AM-12PM)" },
      midday: { start: "11:00:00", end: "15:00:00", label: "Midday (11AM-3PM)" },
      afternoon: { start: "13:00:00", end: "18:00:00", label: "Afternoon (1PM-6PM)" },
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

    // Pick one Google Calendar color per booking so the delivery and the
    // pickup events for the same customer read as a pair (was green/red).
    // Hash bookingId to a stable id in 1..11 (Google's slot range).
    let _h = 0;
    for (let i = 0; i < bookingId.length; i++) _h = ((_h << 5) - _h + bookingId.charCodeAt(i)) | 0;
    const bookingColorId = String((Math.abs(_h) % 11) + 1);

    // 2. Create delivery calendar event (timed if window selected, otherwise all-day)
    const deliverySummary = `${customerName} ${dumpsterSize}${typeCode}delivery`;
    const deliveryResult = await createCalendarEvent({
      summary: deliverySummary,
      date: deliveryDate,
      description: eventDescription,
      location: fullAddress,
      colorId: bookingColorId,
      ...(windowInfo ? { startTime: windowInfo.start, endTime: windowInfo.end } : {}),
    });

    // 3. Create pickup calendar event — timed 1-hour afternoon slot that
    //    stacks: 1-2pm, then 3-4pm, then 5-6pm... so two pickups the same
    //    day don't land on top of each other. Same colorId as the delivery
    //    so a single customer's two events read as a pair.
    const pickupSlot = await findNextPickupSlot(pickupDate);
    const pickupSummary = `${customerName} ${dumpsterSize}${typeCode}pickup`;
    const pickupResult = await createCalendarEvent({
      summary: pickupSummary,
      date: pickupDate,
      description: eventDescription,
      location: fullAddress,
      colorId: bookingColorId,
      startTime: pickupSlot.startTime,
      endTime: pickupSlot.endTime,
    });

    console.log(
      `📅 Calendar events: delivery=${deliveryResult.success ? deliveryResult.eventId : "FAILED"}, pickup=${pickupResult.success ? pickupResult.eventId : "FAILED"}`
    );

    // Send booking confirmation SMS (non-blocking — failures don't affect response)
    let smsSent = false;
    if (customerPhone) {
      try {
        const windowLabels: Record<string, string> = {
          morning: "7:00 AM - 12:00 PM",
          midday: "11:00 AM - 3:00 PM",
          afternoon: "1:00 PM - 6:00 PM",
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

        // Customer SMS OFF by Cris (2026-08-04 msg 4487, "ahorita no tenemos
        // sistema para hacerlo") — keep the body build so re-enabling is a
        // one-line change when SMS comes back.
        void smsBody;
        console.log("📱 Confirmation SMS skipped (disabled by Cris 2026-08-04)");
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
    // the customer with full address details in the operations CRM. The
    // webhook-booking Edge Function creates the booking row; we then PATCH
    // it with the extra fields it doesn't natively accept (billing,
    // customer notes, authorized_charges). Non-blocking — if Dumpsterin is
    // down the booking still completes here.
    let dumpsterinSynced = false;
    let dumpsterinId = "";
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
        const json = (await dumpsterinRes.json().catch(() => ({}))) as {
          dumpsterin_id?: string;
        };
        dumpsterinId = json.dumpsterin_id || "";
        console.log(`🔗 Dumpsterin sync: success (id=${dumpsterinId})`);
      }
    } catch (syncErr) {
      console.error("🔗 Dumpsterin sync error (non-blocking):", syncErr);
    }

    // Patch the Dumpsterin booking row with the extra fields the Edge
    // Function doesn't capture today: billing_address (jsonb), the
    // customer's freeform notes, and authorized_charges. Done as a direct
    // Supabase PATCH so we don't have to redeploy the Edge Function. Also
    // best-effort: a failure here doesn't roll back the rest.
    if (dumpsterinId) {
      try {
        const billing = {
          line1: meta.billing_line1 || "",
          city: meta.billing_city || "",
          state: meta.billing_state || "",
          zip: meta.billing_zip || "",
        };
        const hasBilling =
          !!billing.line1 || !!billing.city || !!billing.state || !!billing.zip;
        const customerNotes = meta.notes || "";
        const authorized = meta.authorized_charges === "true";
        const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mbirzaocjkhqydtuqmze.supabase.co";
        const supaKey = process.env.SUPABASE_SERVICE_KEY || "";
        if (supaKey) {
          const patchBody: Record<string, unknown> = {
            authorized_charges: authorized,
          };
          if (hasBilling) patchBody.billing_address = billing;
          if (customerNotes) patchBody.notes_from_customer = customerNotes;
          await fetch(
            `${supaUrl}/rest/v1/bookings?id=eq.${dumpsterinId}`,
            {
              method: "PATCH",
              headers: {
                apikey: supaKey,
                Authorization: `Bearer ${supaKey}`,
                "Content-Type": "application/json",
                Prefer: "return=minimal",
              },
              body: JSON.stringify(patchBody),
            }
          );
          console.log("🔗 Dumpsterin extras PATCHed (billing/notes/authorized)");
        } else {
          console.warn("⚠️ Dumpsterin PATCH skipped — SUPABASE_SERVICE_KEY not set");
        }
      } catch (patchErr) {
        console.error("🔗 Dumpsterin PATCH error (non-blocking):", patchErr);
      }
    }

    // ── Radar Ads: upload the paid booking as an OFFLINE conversion tied to
    // its gclid, so Google Ads learns which clicks become paying jobs. The
    // Google Ads credentials live on the VPS endpoint; here we only hold a
    // shared secret (radar-keys.json). Non-blocking — never affects the
    // booking response.
    let offlineConvUploaded = false;
    try {
      const gclid = (meta.gclid || "").trim();
      if (gclid) {
        let radar: {
          offline_conv_secret?: string;
          endpoint_url?: string;
          tp_customer_id?: string;
          tp_conversion_action?: string;
        } | null = null;
        try {
          radar = JSON.parse(
            fs.readFileSync("/home/u781187371/radar-keys.json", "utf8")
          );
        } catch {
          radar = null;
        }
        if (radar?.offline_conv_secret && radar?.endpoint_url) {
          const valueUsd = session.amount_total ? session.amount_total / 100 : 0;
          const now = new Date();
          const pad = (n: number) => String(n).padStart(2, "0");
          const dt =
            `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(now.getUTCDate())} ` +
            `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}+00:00`;
          const resp = await fetch(radar.endpoint_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              secret: radar.offline_conv_secret,
              customerId: radar.tp_customer_id,
              conversionAction: radar.tp_conversion_action,
              gclid,
              value: valueUsd,
              currency: "USD",
              conversionDateTime: dt,
              orderId: bookingId,
            }),
          });
          offlineConvUploaded = resp.ok;
          console.log(
            `🎯 Radar offline conversion: HTTP ${resp.status} (gclid=${gclid.slice(0, 12)}…, $${valueUsd})`
          );
        } else {
          console.warn(
            "🎯 Radar offline conversion skipped — radar-keys.json missing/incomplete"
          );
        }
      }
    } catch (radarErr) {
      console.error("🎯 Radar offline conversion error (non-blocking):", radarErr);
    }

    return NextResponse.json({
      received: true,
      bookingId,
      dbUpdated,
      offlineConvUploaded,
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
