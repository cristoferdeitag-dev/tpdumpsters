import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

// Auto-charge an open invoice using the customer's default payment method.
// Per Asaí 2026-04-30: "auto-charge si tarjeta guardada". Fails cleanly if
// there's no saved card on the Stripe customer — Asaí can fall back to the
// hosted invoice URL for manual payment.
//
// Body: { bookingId }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId } = body as { bookingId?: string };
    if (!bookingId) {
      return NextResponse.json({ error: "Missing bookingId" }, { status: 400 });
    }

    const stripe = getStripe();
    const search = await stripe.invoices.search({
      query: `metadata['booking_id']:'${bookingId}'`,
      limit: 1,
    });
    const invoice = search.data[0];
    if (!invoice) {
      return NextResponse.json(
        { error: `No Stripe invoice found for booking ${bookingId}` },
        { status: 404 }
      );
    }

    if (invoice.status === "paid") {
      return NextResponse.json({ ok: true, alreadyPaid: true, invoiceId: invoice.id });
    }

    // Finalize draft first.
    let workingInvoice = invoice;
    if (workingInvoice.status === "draft") {
      workingInvoice = await stripe.invoices.finalizeInvoice(workingInvoice.id);
    }
    if (workingInvoice.status !== "open") {
      return NextResponse.json(
        { error: `Invoice is ${workingInvoice.status}; can't charge.` },
        { status: 400 }
      );
    }

    // Verify the customer actually has a default payment method saved before
    // attempting the charge — otherwise Stripe returns a 400 we'd just have
    // to interpret anyway.
    const customerId = typeof workingInvoice.customer === "string"
      ? workingInvoice.customer
      : workingInvoice.customer?.id;
    if (!customerId) {
      return NextResponse.json({ error: "Invoice has no customer attached" }, { status: 400 });
    }
    const customer = await stripe.customers.retrieve(customerId);
    const defaultPm = (customer && !("deleted" in customer))
      ? customer.invoice_settings?.default_payment_method
      : null;
    if (!defaultPm) {
      return NextResponse.json(
        {
          error: "Customer has no saved card. Send the invoice link instead.",
          hostedUrl: workingInvoice.hosted_invoice_url,
        },
        { status: 400 }
      );
    }

    const paid = await stripe.invoices.pay(workingInvoice.id);

    console.log(
      `⚡ INVOICE AUTO-CHARGED: ${paid.id} | booking=${bookingId} | $${(paid.amount_paid || 0) / 100}`
    );

    return NextResponse.json({
      ok: true,
      invoiceId: paid.id,
      amount: (paid.amount_paid || 0) / 100,
      status: paid.status,
    });
  } catch (err) {
    console.error("invoice/charge error:", err);
    const message = err instanceof Error ? err.message : "Failed to auto-charge invoice";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
