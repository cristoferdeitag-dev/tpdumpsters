import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

// Resend an existing Stripe invoice (email + SMS) without creating a new one.
// Looks up the invoice by metadata.booking_id, then re-fires Stripe's email
// delivery and our own Twilio SMS with the same payment link.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, customerName, customerEmail, customerPhone } = body as {
      bookingId?: string;
      customerName?: string;
      customerEmail?: string;
      customerPhone?: string;
    };

    if (!bookingId) {
      return NextResponse.json({ error: "Missing bookingId" }, { status: 400 });
    }

    const stripe = getStripe();

    // Find the invoice via metadata.booking_id. Search returns the most recent
    // matching invoice; that's what we want for "resend the latest one".
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

    // Stripe only allows sendInvoice on open invoices. Already-paid ones can
    // still be re-emailed via a different endpoint, but for a "resend the
    // payment link" use case the customer typically wants an open one.
    let sentEmail = false;
    if (invoice.status === "open" || invoice.status === "draft") {
      try {
        const finalized = invoice.status === "draft"
          ? await stripe.invoices.finalizeInvoice(invoice.id)
          : invoice;
        await stripe.invoices.sendInvoice(finalized.id);
        sentEmail = true;
      } catch (err) {
        console.error("Stripe sendInvoice failed:", err);
      }
    } else {
      // For paid/uncollectible/void: just confirm to the caller — Stripe
      // doesn't expose a "resend receipt" API for paid invoices.
      return NextResponse.json({
        ok: true,
        sentEmail: false,
        sentSms: false,
        invoiceStatus: invoice.status,
        note: `Invoice already ${invoice.status}; nothing to resend.`,
      });
    }

    // Resend SMS with the hosted payment link (Twilio).
    let sentSms = false;
    if (customerPhone) {
      try {
        const fs = await import("fs");
        const twilioKeys = JSON.parse(
          fs.readFileSync("/home/u781187371/twilio-keys.json", "utf8")
        );
        const twilioSid = twilioKeys.accountSid;
        const twilioToken = twilioKeys.authToken;
        const fromNumber = twilioKeys.dumpsterNumber;

        let toNumber = customerPhone.replace(/[\s()-]/g, "");
        if (!toNumber.startsWith("+")) toNumber = "+" + toNumber;

        const totalAmount = ((invoice.amount_due || 0) / 100).toFixed(2);
        const payLink = invoice.hosted_invoice_url || "";
        const smsBody = [
          `Hi ${customerName || "there"}!`,
          ``,
          `Reminder — your invoice from TP Dumpsters:`,
          `Total: $${totalAmount}`,
          ``,
          `Pay securely online:`,
          `${payLink}`,
          ``,
          `Questions? (510) 650-2083`,
          `— TP Dumpsters`,
        ].join("\n");

        const params = new URLSearchParams();
        params.append("To", toNumber);
        params.append("From", fromNumber);
        params.append("Body", smsBody);

        const twilioRes = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
          {
            method: "POST",
            headers: {
              Authorization:
                "Basic " +
                Buffer.from(`${twilioSid}:${twilioToken}`).toString("base64"),
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
          }
        );
        const smsResult = await twilioRes.json();
        sentSms = twilioRes.ok && !smsResult.error_code;
      } catch (err) {
        console.error("SMS resend failed:", err);
      }
    }

    console.log(
      `🔁 INVOICE RESEND: ${invoice.id} | ${customerName} | email=${sentEmail} sms=${sentSms}`
    );

    return NextResponse.json({
      ok: true,
      invoiceId: invoice.id,
      invoiceUrl: invoice.hosted_invoice_url,
      amount: (invoice.amount_due || 0) / 100,
      sentEmail,
      sentSms,
      customerName: customerName || null,
    });
  } catch (err) {
    console.error("invoice/resend error:", err);
    const message = err instanceof Error ? err.message : "Failed to resend invoice";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
