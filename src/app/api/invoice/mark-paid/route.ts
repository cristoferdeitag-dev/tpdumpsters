import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

// Mark a Stripe invoice as paid out-of-band (cash, check, Zelle, manual
// transfer — anything that didn't flow through Stripe). Per Asaí 2026-04-30:
// "marcar como pagado en efectivo/cheque/Zelle, sin re-cobrar en Stripe".
//
// Body: { bookingId, method: 'cash'|'check'|'zelle'|'other', notes? }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, method, notes } = body as {
      bookingId?: string;
      method?: "cash" | "check" | "zelle" | "other";
      notes?: string;
    };
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
      return NextResponse.json({
        ok: true,
        alreadyPaid: true,
        invoiceId: invoice.id,
        amount: (invoice.amount_paid || 0) / 100,
      });
    }

    // Finalize first if it's still a draft so Stripe lets us pay it.
    let workingInvoice = invoice;
    if (workingInvoice.status === "draft") {
      workingInvoice = await stripe.invoices.finalizeInvoice(workingInvoice.id);
    }

    // paid_out_of_band marks it paid without going through a card charge.
    const updated = await stripe.invoices.pay(workingInvoice.id, {
      paid_out_of_band: true,
    });

    // Stash the payment method + notes on the invoice metadata so
    // reconciliation later knows how this was settled.
    await stripe.invoices.update(updated.id, {
      metadata: {
        ...(updated.metadata || {}),
        out_of_band_method: method || "other",
        out_of_band_notes: notes ? notes.slice(0, 500) : "",
        paid_at_iso: new Date().toISOString(),
      },
    });

    console.log(
      `💵 INVOICE MARKED PAID OOB: ${updated.id} | booking=${bookingId} | method=${method} | $${(updated.amount_paid || 0) / 100}`
    );

    return NextResponse.json({
      ok: true,
      invoiceId: updated.id,
      method: method || "other",
      amount: (updated.amount_paid || 0) / 100,
      status: updated.status,
    });
  } catch (err) {
    console.error("invoice/mark-paid error:", err);
    const message = err instanceof Error ? err.message : "Failed to mark invoice paid";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
