import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { requireCobrosPlatform, isValidInvoiceId, isValidOpKey } from "@/lib/cobros";

// GET  /api/admin/cobros/invoices — recent invoices on TP's account (both the
//      ones born on this screen and any others), with fee + status.
// POST /api/admin/cobros/invoices — housekeeping actions on one invoice:
//      { action: "send" | "void", invoiceId, opKey } — re-send the hosted
//      link email, or void an open invoice (e.g. after a decline).

export async function GET(req: NextRequest) {
  const unauthorized = requireAuth(req);
  if (unauthorized) return unauthorized;
  const gate = requireCobrosPlatform();
  if (gate.error) return gate.error;
  const { client, account } = gate.platform;

  try {
    const invoices = await client.invoices.list(
      { limit: 25, expand: ["data.customer"] },
      { stripeAccount: account }
    );
    const rows = invoices.data.map((inv) => {
      const customer =
        inv.customer && typeof inv.customer !== "string" && !("deleted" in inv.customer)
          ? inv.customer
          : null;
      return {
        id: inv.id,
        number: inv.number || "(draft)",
        customerName: customer?.name || inv.customer_name || "",
        customerEmail: customer?.email || inv.customer_email || "",
        amount: (inv.total || 0) / 100,
        amountPaid: (inv.amount_paid || 0) / 100,
        status: inv.status,
        hostedUrl: inv.hosted_invoice_url || "",
        created: inv.created,
        // The clover API version no longer returns application_fee_amount on
        // the Invoice object, so screen-created invoices carry the fee in
        // metadata.fee_cents (set at create time).
        fee: (Number(inv.metadata?.fee_cents) || 0) / 100,
        fromCobros: inv.metadata?.source === "admin_cobros",
        collectionMethod: inv.collection_method,
      };
    });
    return NextResponse.json({ invoices: rows, feePct: gate.platform.feePct });
  } catch (err) {
    console.error("cobros/invoices GET error:", err);
    const message = err instanceof Error ? err.message : "Invoice list failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

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
  const { client, account } = gate.platform;

  const action = body.action;
  if (action !== "send" && action !== "void") {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
  if (!isValidInvoiceId(body.invoiceId)) {
    return NextResponse.json({ error: "Invalid invoiceId" }, { status: 400 });
  }
  if (!isValidOpKey(body.opKey)) {
    return NextResponse.json({ error: "Invalid or missing opKey" }, { status: 400 });
  }
  const invoiceId = body.invoiceId as string;
  const opKey = body.opKey as string;

  try {
    if (action === "send") {
      const sent = await client.invoices.sendInvoice(invoiceId, undefined, {
        stripeAccount: account,
        idempotencyKey: `${opKey}:resend`,
      });
      console.log(`📤 COBROS invoice re-sent: ${sent.id} (${sent.number})`);
      return NextResponse.json({ ok: true, id: sent.id, status: sent.status });
    }
    const voided = await client.invoices.voidInvoice(invoiceId, undefined, {
      stripeAccount: account,
      idempotencyKey: `${opKey}:void`,
    });
    console.log(`🗑️ COBROS invoice voided: ${voided.id} (${voided.number})`);
    return NextResponse.json({ ok: true, id: voided.id, status: voided.status });
  } catch (err) {
    console.error(`cobros/invoices ${action} error:`, err);
    const message = err instanceof Error ? err.message : `Invoice ${action} failed`;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
