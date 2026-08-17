import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import {
  requireCobrosPlatform,
  feeCentsFor,
  parseLines,
  createInvoiceLines,
  isValidCustomerId,
  isValidOpKey,
} from "@/lib/cobros";
import { buildManualTerms } from "@/lib/invoice-catalog";

// POST /api/admin/cobros/invoice — create + send a Stripe invoice on TP's
// account THROUGH the platform, with the HTM application fee baked in. The
// customer receives the exact same Stripe email + hosted payment link Asaí's
// dashboard invoices produce today; the fee is deducted pre-payout when the
// invoice gets paid.
//
// Body: {
//   customerId: "cus_…",
//   items: [{ description, amountCents, quantity, serviceType?, size? }],
//   notes?: string,
//   daysUntilDue?: number (1–60, default 7),
//   opKey: string  // client idempotency root; retries reuse it
// }

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const unauthorized = requireAuth(req, body);
  if (unauthorized) return unauthorized;
  const gate = requireCobrosPlatform();
  if (gate.error) return gate.error;
  const { client, account, feePct } = gate.platform;

  if (!isValidCustomerId(body.customerId)) {
    return NextResponse.json({ error: "Invalid or missing customerId" }, { status: 400 });
  }
  if (!isValidOpKey(body.opKey)) {
    return NextResponse.json({ error: "Invalid or missing opKey" }, { status: 400 });
  }
  const parsed = parseLines(body.items);
  if ("invalid" in parsed) {
    return NextResponse.json({ error: parsed.invalid }, { status: 400 });
  }
  const { lines, totalCents } = parsed;
  const opKey = body.opKey as string;
  const customerId = body.customerId as string;
  const notes = typeof body.notes === "string" ? body.notes.trim().slice(0, 500) : "";
  const rawDue = Number(body.daysUntilDue ?? 7);
  const daysUntilDue = Number.isInteger(rawDue) && rawDue >= 1 && rawDue <= 60 ? rawDue : 7;

  const feeCents = feeCentsFor(totalCents, feePct);
  const termsNote = buildManualTerms(
    lines
      .filter((l) => l.serviceType && l.size)
      .map((l) => ({ serviceType: l.serviceType!, size: l.size! }))
  );

  try {
    // Draft invoice first, then attach items directly to it (no floating
    // pending items). application_fee_amount rides on the invoice object and
    // is adjustable while draft — set at create, done.
    const invoice = await client.invoices.create(
      {
        customer: customerId,
        collection_method: "send_invoice",
        days_until_due: daysUntilDue,
        description: termsNote || undefined,
        footer: notes ? `Notes:\n- ${notes}` : undefined,
        pending_invoice_items_behavior: "exclude",
        auto_advance: false,
        application_fee_amount: feeCents > 0 ? feeCents : undefined,
        metadata: {
          source: "admin_cobros",
          variant: "manual",
          created_via: "send_link",
          op_key: opKey,
          // The clover API version stopped returning application_fee_amount
          // on the Invoice object; the list endpoint reads the fee from here.
          fee_cents: String(feeCents),
        },
      },
      { stripeAccount: account, idempotencyKey: `${opKey}:inv` }
    );

    await createInvoiceLines(client, account, opKey, customerId, invoice.id, lines);

    const finalized = await client.invoices.finalizeInvoice(invoice.id, undefined, {
      stripeAccount: account,
      idempotencyKey: `${opKey}:fin`,
    });

    // Send = Stripe emails the customer its standard invoice mail with the
    // hosted payment link (identical to today's dashboard flow).
    let sent = false;
    let sendError = "";
    try {
      await client.invoices.sendInvoice(finalized.id, undefined, {
        stripeAccount: account,
        idempotencyKey: `${opKey}:send`,
      });
      sent = true;
    } catch (sendErr) {
      sendError = sendErr instanceof Error ? sendErr.message : "send failed";
      console.error(`cobros/invoice send failed for ${finalized.id}:`, sendErr);
    }

    console.log(
      `🧾 COBROS invoice: ${finalized.id} (${finalized.number}) | ${customerId} | $${(totalCents / 100).toFixed(2)} | HTM fee $${(feeCents / 100).toFixed(2)} (${feePct}%) | emailed: ${sent}`
    );

    return NextResponse.json({
      id: finalized.id,
      number: finalized.number,
      status: finalized.status,
      amount: totalCents / 100,
      fee: feeCents / 100,
      hostedUrl: finalized.hosted_invoice_url,
      pdf: finalized.invoice_pdf,
      emailed: sent,
      ...(sendError ? { sendError } : {}),
    });
  } catch (err) {
    console.error("cobros/invoice error:", err);
    const message = err instanceof Error ? err.message : "Invoice create failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
