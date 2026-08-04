import { NextRequest, NextResponse } from "next/server";
import { getDashboardPassword, isDashboardPasswordConfigured, isValidBookingId } from "@/lib/auth";
import { timingSafeEqual } from "crypto";
import { getPool, dateToYMD } from "@/lib/db";
import { buildResumeUrl, isResumeConfigured } from "@/lib/resume-token";
import { sendEmail, isMailConfigured } from "@/lib/mailer";
import { sendWhatsApp } from "@/lib/twilio";
import { getStripe } from "@/lib/stripe";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

// POST /api/abandoned-watch   (Authorization: Bearer <DASHBOARD_PASSWORD>)
// Body (optional): { "dry": true }            → report only, zero side effects
//                  { "test": "you@x.com" }    → one sample email, nothing else
//
// Abandoned-checkout watcher, hit by cron every ~20 min. Every booking is
// saved with status awaiting_payment BEFORE the customer sees the card form
// (see /api/checkout), so an abandoned checkout is a fully-identified lead
// that today dies in silence. This route finds bookings stuck unpaid for
// 30min-20h and, once per booking:
//   1. emails the customer a signed resume link (straight back to payment),
//   2. WhatsApps the team (Asaí/Cris) name+phone for a closing call.
//
// Concurrency model (Hermes B1): each booking is CLAIMED in recovery_notices
// before any external send — INSERT IGNORE means exactly one of two
// overlapping runs owns a booking. Send results are recorded per channel;
// a claim whose sends all failed becomes retryable after 45 min, max 3
// attempts. Before sending, the booking is revalidated against MySQL AND
// against Stripe's paid invoices (Hermes B2) so a webhook that failed to
// update the DB can't cause a "finish your booking" email after a payment.
//
// POST + Bearer only (Hermes A3): effects never ride a GET and the secret
// never rides a query string.
const MAX_SENDS_PER_RUN = 5;
const RETRY_AFTER_MINUTES = 45;
const MAX_ATTEMPTS = 3;
const COOLDOWN_DAYS = 3;

// Team members who get the closing-call alert (same numbers as /api/reminders).
const TEAM_NUMBERS = [
  "+522225238131", // Asaí
  "+527717948624", // Cristofer
];

interface CandidateRow extends RowDataPacket {
  booking_id: string;
  service_type: string;
  dumpster_size: string;
  total_price: number | string;
  delivery_date: string | Date;
  city: string;
  created_at: string | Date;
  cust_name: string;
  cust_phone: string;
  cust_email: string | null;
}

// Only ensure the notices table once per process — DDL on every request is
// wasted round-trips (Hermes L1).
let tableEnsured = false;

function normPhone(p: string): string {
  const digits = (p || "").replace(/\D/g, "");
  return digits.length > 10 ? digits.slice(-10) : digits;
}

function normEmail(e: string | null | undefined): string {
  return (e || "").trim().toLowerCase();
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function firstName(full: string): string {
  return (full || "").trim().split(/\s+/)[0] || "there";
}

function bearerAuthDenied(request: NextRequest): NextResponse | null {
  if (!isDashboardPasswordConfigured()) {
    return NextResponse.json({ error: "Server auth not configured" }, { status: 503 });
  }
  const header = request.headers.get("authorization") || "";
  const provided = header.toLowerCase().startsWith("bearer ") ? header.slice(7).trim() : "";
  const password = getDashboardPassword();
  const a = Buffer.from(provided);
  const b = Buffer.from(password);
  if (!provided || a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

function recoveryEmail(name: string, sizeNum: string, serviceType: string, deliveryDate: string, total: number, resumeUrl: string) {
  const subject = "Your dumpster is still reserved — finish your booking";
  const text =
    `Hi ${firstName(name)},\n\n` +
    `Your ${sizeNum}-yard dumpster for ${serviceType.toLowerCase()} (delivery ${deliveryDate}) is still saved.\n\n` +
    `Finish your booking here — it takes less than a minute and your info is already filled in:\n${resumeUrl}\n\n` +
    `Total: $${total.toFixed(2)} (online discount included)\n\n` +
    `Questions, or prefer to book by phone? Call or text us at (510) 650-2083.\n\n` +
    `— TP Dumpsters\nhttps://tpdumpsters.com`;
  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;color:#333">
    <h2 style="color:#C62828;margin-bottom:4px">Your dumpster is still reserved</h2>
    <p>Hi ${escapeHtml(firstName(name))},</p>
    <p>Your <strong>${escapeHtml(sizeNum)}-yard dumpster</strong> for ${escapeHtml(serviceType.toLowerCase())}
    (delivery <strong>${escapeHtml(deliveryDate)}</strong>) is still saved — your info is already filled in.</p>
    <p style="text-align:center;margin:28px 0">
      <a href="${resumeUrl}" style="background:#C62828;color:#fff;text-decoration:none;
         padding:14px 28px;border-radius:8px;font-weight:bold;display:inline-block">
        Finish my booking — $${total.toFixed(2)}
      </a>
    </p>
    <p style="font-size:13px;color:#777">Takes less than a minute. Online discount included.</p>
    <p style="font-size:13px;color:#777">Questions, or prefer to book by phone?
      Call or text <a href="tel:+15106502083" style="color:#C62828">(510) 650-2083</a>.</p>
    <p style="margin-top:24px">— TP Dumpsters<br>
      <a href="https://tpdumpsters.com" style="color:#C62828">tpdumpsters.com</a></p>
  </div>`;
  return { subject, text, html };
}

// True when Stripe shows a PAID invoice for this booking — the source of
// truth the DB status can lag behind (webhook UPDATE can fail after a real
// charge). Online bookings auto-create an invoice carrying booking_id in
// metadata (see /api/checkout invoice_creation).
async function paidInStripe(bookingId: string): Promise<boolean> {
  if (!isValidBookingId(bookingId)) return false;
  try {
    const found = await getStripe().invoices.search({
      query: `metadata['booking_id']:'${bookingId}' AND status:'paid'`,
      limit: 1,
    });
    return found.data.length > 0;
  } catch (err) {
    console.warn(`abandoned-watch: Stripe check failed for ${bookingId}: ${String(err).slice(0, 120)}`);
    return false; // fail open on the CHECK; the DB status was already verified
  }
}

export async function POST(request: NextRequest) {
  const denied = bearerAuthDenied(request);
  if (denied) return denied;

  let body: { dry?: boolean; test?: string } = {};
  try {
    body = await request.json();
  } catch {
    /* empty body is fine */
  }
  const dry = body.dry === true;
  const testAddr = typeof body.test === "string" ? body.test : "";

  // Cold test: one sample email to the given address, nothing touched.
  if (testAddr) {
    const sample = recoveryEmail("Test Customer", "10", "General Debris", "2026-08-15", 599, "https://tpdumpsters.com/booking");
    const result = await sendEmail(testAddr, `[TEST] ${sample.subject}`, sample.html, sample.text);
    return NextResponse.json({ test: true, to: testAddr, ...result });
  }

  try {
    const db = getPool();
    if (!tableEnsured) {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS recovery_notices (
          booking_id VARCHAR(20) PRIMARY KEY,
          customer_email VARCHAR(255),
          customer_phone VARCHAR(50),
          claimed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          attempts INT DEFAULT 1,
          emailed TINYINT DEFAULT 0,
          whatsapp TINYINT DEFAULT 0,
          skip_reason VARCHAR(40)
        )
      `);
      tableEnsured = true;
    }

    const [candidates] = await db.execute<CandidateRow[]>(
      `SELECT b.booking_id, b.service_type, b.dumpster_size, b.total_price,
              b.delivery_date, b.city, b.created_at,
              c.name AS cust_name, c.phone AS cust_phone, c.email AS cust_email
         FROM bookings b
         JOIN customers c ON c.id = b.customer_id
        WHERE b.status = 'awaiting_payment'
          AND b.created_at <= NOW() - INTERVAL 30 MINUTE
          AND b.created_at >= NOW() - INTERVAL 20 HOUR
        ORDER BY b.created_at DESC`
    );

    // Customers who completed ANY booking in the last 2 days — never nag
    // someone who paid (e.g. on their 2nd wizard attempt). Normalized in JS
    // rather than SQL regex so it works on any MySQL/MariaDB flavor.
    const [paidRows] = await db.execute<RowDataPacket[]>(
      `SELECT c2.phone, c2.email
         FROM bookings b2
         JOIN customers c2 ON c2.id = b2.customer_id
        WHERE b2.status = 'confirmed'
          AND b2.created_at >= NOW() - INTERVAL 2 DAY`
    );
    const paidPhones = new Set(paidRows.map((r) => normPhone(String(r.phone || ""))).filter(Boolean));
    const paidEmails = new Set(paidRows.map((r) => normEmail(r.email as string | null)).filter(Boolean));

    const report: Array<Record<string, unknown>> = [];
    const seenPhones = new Set<string>();
    const seenEmails = new Set<string>();
    let sends = 0;

    for (const row of candidates) {
      const phone = normPhone(row.cust_phone);
      const email = normEmail(row.cust_email);

      const markSkip = async (reason: string) => {
        if (dry) return;
        await db.execute(
          `INSERT INTO recovery_notices (booking_id, customer_email, customer_phone, skip_reason)
           VALUES (?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE skip_reason = VALUES(skip_reason)`,
          [row.booking_id, email, phone, reason]
        );
      };

      // Retry-duplicates (the Nathan/Oscar pattern: same customer, wizard
      // redone minutes later): rows are newest-first, so the first row per
      // customer is the live one and older siblings are superseded. Phone
      // and email are matched separately and normalized (Hermes M1).
      if ((phone && seenPhones.has(phone)) || (email && seenEmails.has(email))) {
        await markSkip("superseded");
        report.push({ booking: row.booking_id, action: "skip:superseded" });
        continue;
      }
      if (phone) seenPhones.add(phone);
      if (email) seenEmails.add(email);

      // Customer already completed a sibling booking (paid on 2nd try) —
      // never nag someone who paid.
      if ((phone && paidPhones.has(phone)) || (email && paidEmails.has(email))) {
        await markSkip("paid_sibling");
        report.push({ booking: row.booking_id, action: "skip:paid_sibling" });
        continue;
      }

      // Cooldown: this customer already got a recovery notice in the last
      // days (for another booking attempt) — one nudge is marketing, two is
      // harassment.
      const [cooled] = await db.execute<RowDataPacket[]>(
        `SELECT 1 FROM recovery_notices
          WHERE claimed_at >= NOW() - INTERVAL ${COOLDOWN_DAYS} DAY
            AND (emailed = 1 OR whatsapp = 1)
            AND ((customer_phone != '' AND customer_phone = ?)
                 OR (customer_email != '' AND customer_email = ?))
          LIMIT 1`,
        [phone, email]
      );
      if (cooled.length > 0) {
        await markSkip("cooldown");
        report.push({ booking: row.booking_id, action: "skip:cooldown" });
        continue;
      }

      if (sends >= MAX_SENDS_PER_RUN) {
        // Not claimed — next run picks it up. Loud so a backlog is visible.
        console.warn(`🛒 abandoned-watch: send cap reached, ${row.booking_id} deferred to next run`);
        report.push({ booking: row.booking_id, action: "deferred:cap" });
        continue;
      }

      if (dry) {
        report.push({
          booking: row.booking_id,
          action: "WOULD claim+send",
          customer: row.cust_name,
          phone: row.cust_phone,
          email: row.cust_email || "(none)",
          mailConfigured: isMailConfigured(),
          resumeConfigured: isResumeConfigured(),
        });
        sends++;
        continue;
      }

      // CLAIM before any external effect (Hermes B1): exactly one concurrent
      // run wins the INSERT; a lost claim is only retryable when every
      // channel failed, after a cooldown, up to MAX_ATTEMPTS.
      const [claimed] = await db.execute<ResultSetHeader>(
        "INSERT IGNORE INTO recovery_notices (booking_id, customer_email, customer_phone) VALUES (?, ?, ?)",
        [row.booking_id, email, phone]
      );
      if (claimed.affectedRows === 0) {
        const [retry] = await db.execute<ResultSetHeader>(
          `UPDATE recovery_notices
              SET claimed_at = NOW(), attempts = attempts + 1
            WHERE booking_id = ?
              AND emailed = 0 AND whatsapp = 0 AND skip_reason IS NULL
              AND attempts < ${MAX_ATTEMPTS}
              AND claimed_at <= NOW() - INTERVAL ${RETRY_AFTER_MINUTES} MINUTE`,
          [row.booking_id]
        );
        if (retry.affectedRows === 0) {
          report.push({ booking: row.booking_id, action: "skip:already_claimed" });
          continue;
        }
      }
      sends++;

      // REVALIDATE post-claim (Hermes B2): the candidate list is a snapshot —
      // the customer may have paid seconds ago, or paid while the webhook's
      // DB update failed. MySQL first, then Stripe as the source of truth.
      const [fresh] = await db.execute<RowDataPacket[]>(
        "SELECT status FROM bookings WHERE booking_id = ? LIMIT 1",
        [row.booking_id]
      );
      if (!fresh[0] || fresh[0].status !== "awaiting_payment") {
        await markSkip("paid_db");
        report.push({ booking: row.booking_id, action: "skip:paid_db" });
        continue;
      }
      if (await paidInStripe(row.booking_id)) {
        await markSkip("paid_stripe");
        console.error(`🚨 abandoned-watch: ${row.booking_id} is PAID in Stripe but awaiting_payment in MySQL — webhook missed an update, check it`);
        report.push({ booking: row.booking_id, action: "skip:paid_stripe_DB_STALE" });
        continue;
      }

      const resumeUrl = buildResumeUrl(row.booking_id); // null when secret unconfigured (Hermes A2)
      const sizeNum = String(row.dumpster_size || "").replace(/[^0-9]/g, "") || "?";
      const deliveryDay = dateToYMD(row.delivery_date);
      const total = Number(row.total_price) || 0;

      // 1. Customer email (needs an address, SMTP creds AND a signable link)
      let emailed = 0;
      let emailNote = !row.cust_email ? "no email on file" : !resumeUrl ? "resume secret not configured" : "";
      if (row.cust_email && resumeUrl) {
        const msg = recoveryEmail(row.cust_name, sizeNum, row.service_type, deliveryDay, total, resumeUrl);
        const sent = await sendEmail(row.cust_email, msg.subject, msg.html, msg.text);
        emailed = sent.success ? 1 : 0;
        emailNote = sent.success ? "sent" : `failed: ${sent.error}`;
      }

      // 2. Team alert for the closing call
      const alertMsg =
        `🛒 *Carrito abandonado — TP Dumpsters*\n` +
        `${row.cust_name} · ${row.cust_phone}\n` +
        `${sizeNum}yd ${row.service_type} · $${total.toFixed(0)} · entrega ${deliveryDay} · ${row.city}\n` +
        `📧 Correo de rescate: ${emailed ? "enviado ✅" : emailNote}\n` +
        (resumeUrl ? `🔗 Link para reanudar (se lo pueden reenviar): ${resumeUrl}` : `🔗 Sin link de reanudar (falta configurar el secreto)`);
      let whatsapp = 0;
      for (const phoneTo of TEAM_NUMBERS) {
        const r = await sendWhatsApp(phoneTo, alertMsg);
        if (r.success) whatsapp = 1;
      }

      await db.execute(
        "UPDATE recovery_notices SET emailed = ?, whatsapp = ? WHERE booking_id = ?",
        [emailed, whatsapp, row.booking_id]
      );
      console.log(`🛒 abandoned-watch: ${row.booking_id} ${row.cust_name} — email ${emailNote || "skipped"}, team alert ${whatsapp ? "ok" : "FAILED"}`);
      report.push({ booking: row.booking_id, action: "notified", email: emailNote || "skipped", teamAlert: !!whatsapp });
    }

    return NextResponse.json({
      dry,
      candidates: candidates.length,
      processed: report.length,
      mailConfigured: isMailConfigured(),
      resumeConfigured: isResumeConfigured(),
      report,
    });
  } catch (err) {
    console.error("abandoned-watch error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
