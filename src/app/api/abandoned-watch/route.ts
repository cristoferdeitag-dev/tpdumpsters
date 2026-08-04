import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";
import { getPool, dateToYMD } from "@/lib/db";
import { buildResumeUrl } from "@/lib/resume-token";
import { sendEmail, isMailConfigured } from "@/lib/mailer";
import { sendWhatsApp } from "@/lib/twilio";
import type { RowDataPacket } from "mysql2";

// GET /api/abandoned-watch?auth=<DASHBOARD_PASSWORD>[&dry=1][&test=<email>]
//
// Abandoned-checkout watcher, hit by cron every ~20 min. Every booking is
// saved with status awaiting_payment BEFORE the customer sees the card form
// (see /api/checkout), so an abandoned checkout is a fully-identified lead
// that today dies in silence. This route finds bookings stuck unpaid for
// 30min-20h and, once per booking:
//   1. emails the customer a signed resume link (straight back to payment),
//   2. WhatsApps the team (Asaí/Cris) name+phone for a closing call.
//
// &dry=1     → report what WOULD be sent, send nothing, record nothing.
// &test=addr → send one sample recovery email to addr (fake data), nothing else.
//
// Sends are capped per run: a runaway backlog alerts loudly instead of
// mass-blasting customers.
const MAX_SENDS_PER_RUN = 5;

// Team members who get the closing-call alert (same numbers as /api/reminders).
const TEAM_NUMBERS = [
  "+522225238131", // Asaí
  "+527717948624", // Cristofer
];

interface CandidateRow extends RowDataPacket {
  booking_id: string;
  service_type: string;
  dumpster_size: string;
  total_price: number;
  delivery_date: string | Date;
  city: string;
  created_at: string | Date;
  cust_name: string;
  cust_phone: string;
  cust_email: string | null;
}

function firstName(full: string): string {
  return (full || "").trim().split(/\s+/)[0] || "there";
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
    <p>Hi ${firstName(name)},</p>
    <p>Your <strong>${sizeNum}-yard dumpster</strong> for ${serviceType.toLowerCase()}
    (delivery <strong>${deliveryDate}</strong>) is still saved — your info is already filled in.</p>
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

export async function GET(request: NextRequest) {
  const denied = checkAuth(request);
  if (denied) return denied;

  const dry = request.nextUrl.searchParams.get("dry") === "1";
  const testAddr = request.nextUrl.searchParams.get("test");

  // Cold test: one sample email to the given address, nothing touched.
  if (testAddr) {
    const sample = recoveryEmail("Test Customer", "10", "General Debris", "2026-08-15", 599, "https://tpdumpsters.com/booking");
    const result = await sendEmail(testAddr, `[TEST] ${sample.subject}`, sample.html, sample.text);
    return NextResponse.json({ test: true, to: testAddr, ...result });
  }

  try {
    const db = getPool();
    await db.execute(`
      CREATE TABLE IF NOT EXISTS recovery_notices (
        booking_id VARCHAR(20) PRIMARY KEY,
        customer_email VARCHAR(255),
        emailed TINYINT DEFAULT 0,
        whatsapp TINYINT DEFAULT 0,
        skip_reason VARCHAR(40),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const [candidates] = await db.execute<CandidateRow[]>(
      `SELECT b.booking_id, b.service_type, b.dumpster_size, b.total_price,
              b.delivery_date, b.city, b.created_at,
              c.name AS cust_name, c.phone AS cust_phone, c.email AS cust_email
         FROM bookings b
         JOIN customers c ON c.id = b.customer_id
        WHERE b.status = 'awaiting_payment'
          AND b.created_at <= NOW() - INTERVAL 30 MINUTE
          AND b.created_at >= NOW() - INTERVAL 20 HOUR
          AND b.booking_id NOT IN (SELECT booking_id FROM recovery_notices)
        ORDER BY b.created_at DESC`
    );

    const report: Array<Record<string, unknown>> = [];
    const seenCustomers = new Set<string>();
    let sends = 0;

    for (const row of candidates) {
      const custKey = `${row.cust_phone}|${row.cust_email || ""}`.toLowerCase();

      // Retry-duplicates (the Nathan/Oscar pattern: same customer, wizard
      // redone minutes later): rows are newest-first, so the first row per
      // customer is the live one and older siblings are superseded.
      if (seenCustomers.has(custKey)) {
        if (!dry) {
          await db.execute(
            "INSERT IGNORE INTO recovery_notices (booking_id, customer_email, skip_reason) VALUES (?, ?, 'superseded')",
            [row.booking_id, row.cust_email]
          );
        }
        report.push({ booking: row.booking_id, action: "skip:superseded" });
        continue;
      }
      seenCustomers.add(custKey);

      // Customer already completed a sibling booking (paid on 2nd try) —
      // never nag someone who paid.
      const [paid] = await db.execute<RowDataPacket[]>(
        `SELECT 1
           FROM bookings b2
           JOIN customers c2 ON c2.id = b2.customer_id
          WHERE b2.status = 'confirmed'
            AND b2.created_at >= NOW() - INTERVAL 2 DAY
            AND (c2.phone = ? OR (c2.email IS NOT NULL AND c2.email != '' AND c2.email = ?))
          LIMIT 1`,
        [row.cust_phone, row.cust_email || ""]
      );
      if (paid.length > 0) {
        if (!dry) {
          await db.execute(
            "INSERT IGNORE INTO recovery_notices (booking_id, customer_email, skip_reason) VALUES (?, ?, 'paid_sibling')",
            [row.booking_id, row.cust_email]
          );
        }
        report.push({ booking: row.booking_id, action: "skip:paid_sibling" });
        continue;
      }

      if (sends >= MAX_SENDS_PER_RUN) {
        // Not marked — next run picks it up. Loud so a backlog is visible.
        console.warn(`🛒 abandoned-watch: send cap reached, ${row.booking_id} deferred to next run`);
        report.push({ booking: row.booking_id, action: "deferred:cap" });
        continue;
      }
      sends++;

      const resumeUrl = buildResumeUrl(row.booking_id);
      const sizeNum = String(row.dumpster_size || "").replace(/[^0-9]/g, "") || "?";
      const deliveryDay = dateToYMD(row.delivery_date);
      const total = Number(row.total_price) || 0;

      if (dry) {
        report.push({
          booking: row.booking_id,
          action: "WOULD send",
          customer: row.cust_name,
          phone: row.cust_phone,
          email: row.cust_email || "(none)",
          mailConfigured: isMailConfigured(),
        });
        continue;
      }

      // 1. Customer email (skipped gracefully when no address / no SMTP creds)
      let emailed = 0;
      let emailNote = "no email on file";
      if (row.cust_email) {
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
        `🔗 Link para reanudar (se lo pueden reenviar): ${resumeUrl}`;
      let whatsapp = 0;
      for (const phone of TEAM_NUMBERS) {
        const r = await sendWhatsApp(phone, alertMsg);
        if (r.success) whatsapp = 1;
      }

      await db.execute(
        "INSERT IGNORE INTO recovery_notices (booking_id, customer_email, emailed, whatsapp) VALUES (?, ?, ?, ?)",
        [row.booking_id, row.cust_email, emailed, whatsapp]
      );
      console.log(`🛒 abandoned-watch: ${row.booking_id} ${row.cust_name} — email ${emailNote}, team alert ${whatsapp ? "ok" : "FAILED"}`);
      report.push({ booking: row.booking_id, action: "notified", email: emailNote, teamAlert: !!whatsapp });
    }

    return NextResponse.json({
      dry,
      candidates: candidates.length,
      processed: report.length,
      mailConfigured: isMailConfigured(),
      report,
    });
  } catch (err) {
    console.error("abandoned-watch error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
