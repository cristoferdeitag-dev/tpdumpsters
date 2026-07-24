import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("id");

  if (!sessionId || !sessionId.startsWith("cs_")) {
    return NextResponse.json({ error: "Invalid session id" }, { status: 400 });
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId, {
      expand: ["invoice"],
    });

    const invoice = (session.invoice && typeof session.invoice !== "string")
      ? session.invoice
      : null;

    const md = session.metadata || {};
    const windowLabels: Record<string, string> = {
      morning: "Morning (7AM-12PM)",
      midday: "Midday (11AM-3PM)",
      afternoon: "Afternoon (2PM-7PM)",
    };

    return NextResponse.json({
      // The success page must not celebrate (nor fire the Ads conversion)
      // for a session that was never paid — anyone with the session id could
      // open the URL of an open/abandoned session (3-AI flow review).
      paymentStatus: session.payment_status || null,
      bookingId: md.booking_id || null,
      customerName: md.customer_name || null,
      customerEmail: session.customer_details?.email || null,
      customerPhone: md.customer_phone || null,
      address: md.address || null,
      city: md.city || null,
      zipCode: md.zip_code || null,
      deliveryDate: md.delivery_date || null,
      deliveryWindow: windowLabels[md.delivery_window || ""] || md.delivery_window || null,
      pickupDate: md.pickup_date || null,
      dumpsterSize: md.dumpster_size || null,
      serviceType: md.service_type || null,
      amountTotal: typeof session.amount_total === "number" ? session.amount_total / 100 : null,
      hostedInvoiceUrl: invoice?.hosted_invoice_url || null,
      invoicePdf: invoice?.invoice_pdf || null,
    });
  } catch (err) {
    console.error("Session lookup error:", err);
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
}
