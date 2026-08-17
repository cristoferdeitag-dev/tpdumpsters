import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { requireAuth } from "@/lib/auth";
import {
  requireCobrosPlatform,
  feeCentsFor,
  parseLines,
  createInvoiceLines,
  isValidCustomerId,
  isValidPaymentMethodId,
  isValidOpKey,
} from "@/lib/cobros";
import { buildManualTerms } from "@/lib/invoice-catalog";

// POST /api/admin/cobros/charge — charge a saved card RIGHT NOW, off-session,
// through the platform with the HTM fee. Builds a charge_automatically
// invoice (so the customer still gets a proper receipt/invoice and the fee
// rides on the invoice object), then pays it against the chosen saved card.
//
// Failure handling (Hermes gotchas, 17-ago):
//  - SCA/requires_action → 402 { requiresAction, hostedUrl } — the operator
//    sends the hosted link so the customer authenticates the charge.
//  - Card declined → 402 { declined, hostedUrl } — invoice stays open and
//    VISIBLE; the operator can send the link or void it from "Recientes".
//  - Idempotency: the whole op is keyed on opKey; a retry after a network
//    blip can't double-charge.
//
// Body: { customerId, items: [...], notes?, paymentMethodId?, opKey }

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
  if (body.paymentMethodId !== undefined && !isValidPaymentMethodId(body.paymentMethodId)) {
    return NextResponse.json({ error: "Invalid paymentMethodId" }, { status: 400 });
  }
  const parsed = parseLines(body.items);
  if ("invalid" in parsed) {
    return NextResponse.json({ error: parsed.invalid }, { status: 400 });
  }
  const { lines, totalCents } = parsed;
  const opKey = body.opKey as string;
  const customerId = body.customerId as string;
  const notes = typeof body.notes === "string" ? body.notes.trim().slice(0, 500) : "";

  try {
    // Resolve which saved card to charge: explicit pick > customer default >
    // newest attached card (cards saved by the online checkout are attached
    // but usually NOT set as invoice default, so the fallback matters).
    let paymentMethod = typeof body.paymentMethodId === "string" ? body.paymentMethodId : "";
    if (!paymentMethod) {
      const customer = await client.customers.retrieve(customerId, undefined, {
        stripeAccount: account,
      });
      if (customer && !("deleted" in customer)) {
        const def = customer.invoice_settings?.default_payment_method;
        paymentMethod = (typeof def === "string" ? def : def?.id) || "";
      }
    }
    if (!paymentMethod) {
      const pms = await client.paymentMethods.list(
        { customer: customerId, type: "card", limit: 5 },
        { stripeAccount: account }
      );
      const newest = pms.data.sort((a, b) => b.created - a.created)[0];
      paymentMethod = newest?.id || "";
    }
    if (!paymentMethod) {
      return NextResponse.json(
        { error: "Este cliente no tiene tarjeta guardada. Mándale la factura con link de pago." },
        { status: 400 }
      );
    }

    const feeCents = feeCentsFor(totalCents, feePct);
    const termsNote = buildManualTerms(
      lines
        .filter((l) => l.serviceType && l.size)
        .map((l) => ({ serviceType: l.serviceType!, size: l.size! }))
    );

    const invoice = await client.invoices.create(
      {
        customer: customerId,
        collection_method: "charge_automatically",
        default_payment_method: paymentMethod,
        description: termsNote || undefined,
        footer: notes ? `Notes:\n- ${notes}` : undefined,
        pending_invoice_items_behavior: "exclude",
        auto_advance: false,
        application_fee_amount: feeCents > 0 ? feeCents : undefined,
        metadata: {
          source: "admin_cobros",
          variant: "manual",
          created_via: "charge_now",
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

    try {
      const paid = await client.invoices.pay(finalized.id, {}, {
        stripeAccount: account,
        idempotencyKey: `${opKey}:pay`,
      });
      console.log(
        `⚡ COBROS charged: ${paid.id} (${paid.number}) | ${customerId} | $${((paid.amount_paid || 0) / 100).toFixed(2)} | HTM fee $${(feeCents / 100).toFixed(2)} (${feePct}%) | pm=${paymentMethod}`
      );
      return NextResponse.json({
        paid: true,
        id: paid.id,
        number: paid.number,
        amount: (paid.amount_paid || 0) / 100,
        fee: feeCents / 100,
        hostedUrl: paid.hosted_invoice_url,
      });
    } catch (payErr) {
      const stripeErr = payErr as Stripe.errors.StripeError;
      const code = stripeErr?.code || "";
      const declineCode =
        (stripeErr as Stripe.errors.StripeCardError)?.decline_code || "";
      console.error(
        `🚫 COBROS charge FAILED for ${finalized.id} (${code}${declineCode ? `/${declineCode}` : ""}):`,
        stripeErr?.message
      );
      // The finalized invoice stays OPEN — visible in "Recientes" where the
      // operator can send its hosted link or void it. Never a silent 500.
      if (code === "invoice_payment_intent_requires_action") {
        return NextResponse.json(
          {
            requiresAction: true,
            id: finalized.id,
            number: finalized.number,
            hostedUrl: finalized.hosted_invoice_url,
            message:
              "El banco del cliente exige verificación (3D Secure). Mándale el link de la factura para que autorice el pago él mismo.",
          },
          { status: 402 }
        );
      }
      return NextResponse.json(
        {
          declined: true,
          id: finalized.id,
          number: finalized.number,
          hostedUrl: finalized.hosted_invoice_url,
          code: declineCode || code || "card_error",
          message: `Tarjeta rechazada (${declineCode || code || "error"}). La factura quedó ABIERTA: mándale el link de pago o anúlala desde Recientes.`,
        },
        { status: 402 }
      );
    }
  } catch (err) {
    console.error("cobros/charge error:", err);
    const message = err instanceof Error ? err.message : "Charge failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
