import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

// Void a Stripe invoice — invalidates without refund. Use when the booking
// got cancelled and the customer was never going to pay (vs. refund which
// reverses a successful payment). Per Asaí 2026-04-30.
//
// Body: { bookingId, reason? }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, reason } = body as { bookingId?: string; reason?: string };
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

    // Stripe only voids "open" invoices. paid → needs refund instead.
    if (invoice.status !== "open" && invoice.status !== "draft") {
      return NextResponse.json(
        { error: `Invoice is ${invoice.status}; can't void. ${invoice.status === "paid" ? "Use refund instead." : ""}` },
        { status: 400 }
      );
    }

    let workingInvoice = invoice;
    if (workingInvoice.status === "draft") {
      // Drafts can be deleted directly — cleaner than voiding.
      await stripe.invoices.del(workingInvoice.id);
      return NextResponse.json({ ok: true, action: "deleted_draft", invoiceId: workingInvoice.id });
    }

    const voided = await stripe.invoices.voidInvoice(workingInvoice.id);
    if (reason) {
      await stripe.invoices.update(voided.id, {
        metadata: { ...(voided.metadata || {}), void_reason: reason.slice(0, 500), voided_at_iso: new Date().toISOString() },
      });
    }

    console.log(`🚫 INVOICE VOIDED: ${voided.id} | booking=${bookingId} | reason=${reason || "(none)"}`);

    return NextResponse.json({
      ok: true,
      action: "voided",
      invoiceId: voided.id,
      status: voided.status,
    });
  } catch (err) {
    console.error("invoice/void error:", err);
    const message = err instanceof Error ? err.message : "Failed to void invoice";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
