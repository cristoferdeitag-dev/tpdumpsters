import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

/* ───────── Service pricing ───────── */
const SERVICES: Record<string, Record<string, { price: number; dims: string; weight: string; days: number }>> = {
  "General Debris": {
    "10 Yard": { price: 649, dims: "12'L × 8'W × 2.5'H", weight: "1 ton", days: 7 },
    "20 Yard": { price: 649, dims: "16'L × 8'W × 4'H", weight: "2 tons", days: 7 },
    "30 Yard": { price: 749, dims: "16'L × 8'W × 6'H", weight: "3 tons", days: 7 },
  },
  "Household Clean Out": {
    "10 Yard": { price: 599, dims: "12'L × 8'W × 2.5'H", weight: "1 ton", days: 7 },
    "20 Yard": { price: 649, dims: "16'L × 8'W × 4'H", weight: "2 tons", days: 7 },
    "30 Yard": { price: 749, dims: "16'L × 8'W × 6'H", weight: "3 tons", days: 7 },
  },
  "Construction Debris": {
    "10 Yard": { price: 599, dims: "12'L × 8'W × 2.5'H", weight: "1 ton", days: 7 },
    "20 Yard": { price: 649, dims: "16'L × 8'W × 4'H", weight: "2 tons", days: 7 },
    "30 Yard": { price: 749, dims: "16'L × 8'W × 6'H", weight: "3 tons", days: 7 },
  },
  "Roofing": {
    "10 Yard": { price: 599, dims: "12'L × 8'W × 2.5'H", weight: "1 ton", days: 7 },
    "20 Yard": { price: 649, dims: "16'L × 8'W × 4'H", weight: "2 tons", days: 7 },
    "30 Yard": { price: 749, dims: "16'L × 8'W × 6'H", weight: "3 tons", days: 7 },
  },
  "Green Waste": {
    "10 Yard": { price: 599, dims: "12'L × 8'W × 2.5'H", weight: "1 ton", days: 7 },
    "20 Yard": { price: 649, dims: "16'L × 8'W × 4'H", weight: "2 tons", days: 7 },
    "30 Yard": { price: 749, dims: "16'L × 8'W × 6'H", weight: "3 tons", days: 7 },
  },
  "Clean Soil": {
    "10 Yard": { price: 599, dims: "12'L × 8'W × 2.5'H", weight: "No weight limit", days: 3 },
  },
  "Clean Concrete": {
    "10 Yard": { price: 599, dims: "12'L × 8'W × 2.5'H", weight: "No weight limit", days: 3 },
  },
  "Mixed Materials": {
    "10 Yard": { price: 749, dims: "12'L × 8'W × 2.5'H", weight: "No weight limit", days: 3 },
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, deliveryAddress, billingAddress, notes, extras, bookingId } = body;

    if (!customerName || !deliveryAddress) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Support multi-item invoices: items[] array OR legacy single fields
    interface InvoiceItem {
      serviceType: string;
      size: string;
      quantity: number;
      customPrice?: number;
      unitPrice: number;
      dims: string;
      weight: string;
      days: number;
    }

    const rawItems: Array<{ serviceType: string; size: string; quantity: number; customPrice?: number }> =
      body.items && Array.isArray(body.items) && body.items.length > 0
        ? body.items
        : [{ serviceType: body.serviceType, size: body.size, quantity: body.quantity || 1, customPrice: body.customPrice }];

    const items: InvoiceItem[] = rawItems.map((item) => {
      const sizeInfo = SERVICES[item.serviceType]?.[item.size];
      if (!sizeInfo && !item.customPrice) {
        throw new Error(`Unknown service/size: ${item.serviceType} / ${item.size}`);
      }
      return {
        serviceType: item.serviceType,
        size: item.size,
        quantity: item.quantity || 1,
        customPrice: item.customPrice,
        unitPrice: item.customPrice || sizeInfo!.price,
        dims: sizeInfo?.dims || "",
        weight: sizeInfo?.weight || "",
        days: sizeInfo?.days || 7,
      };
    });

    // Legacy compat values (use first item)
    const serviceType = items[0].serviceType;
    const size = items[0].size;
    const unitPrice = items[0].unitPrice;
    const qty = items.reduce((sum, i) => sum + i.quantity, 0);
    const dims = items[0].dims;
    const weight = items[0].weight;
    const days = Math.max(...items.map((i) => i.days));
    // Parse extras
    interface ExtraCharge { name: string; price: number; quantity: number }
    const extraCharges: ExtraCharge[] = (extras && Array.isArray(extras))
      ? extras.filter((e: ExtraCharge) => e.name && e.price > 0).map((e: ExtraCharge) => ({
          name: e.name,
          price: Number(e.price),
          quantity: e.quantity || 1,
        }))
      : [];
    const extrasTotal = extraCharges.reduce((sum, e) => sum + e.price * e.quantity, 0);
    const grandTotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0) + extrasTotal;

    const stripe = getStripe();

    // Parse delivery address into components
    const addressParts = deliveryAddress.split(",").map((s: string) => s.trim());
    const shipLine1 = addressParts[0] || deliveryAddress;
    const shipCity = addressParts[1] || "";
    const shipStateZip = addressParts[2] || "";
    const shipState = shipStateZip.split(/\s+/)[0] || "";
    const shipZip = shipStateZip.split(/\s+/).slice(1).join(" ") || "";

    // Parse billing address
    const billParts = (billingAddress || deliveryAddress).split(",").map((s: string) => s.trim());
    const billLine1 = billParts[0] || "";
    const billCity = billParts[1] || "";
    const billStateZip = billParts[2] || "";
    const billState = billStateZip.split(/\s+/)[0] || "";
    const billZip = billStateZip.split(/\s+/).slice(1).join(" ") || "";

    // Create customer with full address details
    const customer = await stripe.customers.create({
      name: customerName,
      email: customerEmail || "contact@tpdumpsters.com",
      phone: customerPhone || undefined,
      address: {
        line1: billLine1,
        city: billCity,
        state: billState,
        postal_code: billZip,
        country: "US",
      },
      shipping: {
        name: customerName,
        phone: customerPhone || undefined,
        address: {
          line1: shipLine1,
          city: shipCity,
          state: shipState,
          postal_code: shipZip,
          country: "US",
        },
      },
    });

    // Create invoice items for each service line
    for (const item of items) {
      const itemDesc = `${item.size.replace(" Yard", "-yard")} dumpster for ${item.serviceType.toLowerCase()}`;
      for (let i = 0; i < item.quantity; i++) {
        const desc = item.quantity > 1
          ? `${itemDesc} (${i + 1} of ${item.quantity})`
          : itemDesc;
        await stripe.invoiceItems.create({
          customer: customer.id,
          description: desc,
          amount: item.unitPrice * 100,
          currency: "usd",
        });
      }
    }

    // Create invoice items for extras
    for (const extra of extraCharges) {
      for (let i = 0; i < extra.quantity; i++) {
        const desc = extra.quantity > 1
          ? `${extra.name} (${i + 1} of ${extra.quantity})`
          : extra.name;
        await stripe.invoiceItems.create({
          customer: customer.id,
          description: desc,
          amount: extra.price * 100,
          currency: "usd",
        });
      }
    }

    // Build detailed rental terms note
    const termsLines = items.map((item) =>
      `${item.size} Dumpster — ${item.serviceType} | ${item.days}-day rental | Weight limit: ${item.weight}`
    );
    const termsNote = termsLines.join(" | ");

    // Build invoice metadata. booking_id is what the Supabase webhook keys on
    // to auto-mark the corresponding Dumpsterin booking as paid.
    const invoiceMetadata: Record<string, string> = {
      customer_name: customerName,
      service_type: serviceType,
      dumpster_size: size,
      source: bookingId ? "dumpsterin_quote" : "quote_generator",
    };
    if (bookingId) invoiceMetadata.booking_id = bookingId;
    if (customerPhone) invoiceMetadata.customer_phone = customerPhone;

    // Create invoice with detailed terms
    const invoiceParams: Record<string, unknown> = {
      customer: customer.id,
      collection_method: "send_invoice" as const,
      days_until_due: 7,
      description: termsNote,
      custom_fields: [
        { name: "Delivery Address", value: deliveryAddress.substring(0, 40) },
      ],
      footer: "Extra days: $49/day • Overweight: $125/ton • Mattresses: $60 • Appliances: $40 • Tires: $20\nKeep debris below fill line. No hazardous materials. 24h cancellation notice ($150 fee).\nZelle: TP PAVERS SERVICE INC — (510) 253-6230\n\nThanks for choosing TP Dumpsters!",
      pending_invoice_items_behavior: "include" as const,
      metadata: invoiceMetadata,
    };

    if (billingAddress) {
      (invoiceParams.custom_fields as Array<{name: string; value: string}>).push({
        name: "Billing Address",
        value: billingAddress.substring(0, 40),
      });
    }
    if (bookingId) {
      (invoiceParams.custom_fields as Array<{name: string; value: string}>).push({
        name: "Booking ID",
        value: bookingId,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invoice = await stripe.invoices.create(invoiceParams as any);

    // Finalize to get PDF
    const finalized = await stripe.invoices.finalizeInvoice(invoice.id);

    // Create a clean Checkout Session for payment (separate from invoice)
    let checkoutUrl = "";
    try {
      const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer: customer.id,
        payment_intent_data: {
          setup_future_usage: "off_session",
          statement_descriptor: "TP DUMPSTERS",
        },
        line_items: [
          ...items.map((item) => ({
            price_data: {
              currency: "usd",
              product_data: {
                name: `Dumpster Rental - ${item.serviceType} ${item.size}`,
                description: `${item.size} — ${item.serviceType} | ${item.days}-day rental | Weight: ${item.weight}`,
                images: ["https://tpdumpsters.com/images/hero/red-dumpster-construction.png"],
              },
              unit_amount: item.unitPrice * 100,
            },
            quantity: item.quantity,
          })),
          ...extraCharges.map((extra) => ({
            price_data: {
              currency: "usd",
              product_data: {
                name: extra.name,
                description: `Additional charge: ${extra.name}`,
              },
              unit_amount: extra.price * 100,
            },
            quantity: extra.quantity,
          })),
        ],
        metadata: {
          invoice_id: finalized.id,
          customer_name: customerName,
          service_type: serviceType,
          dumpster_size: size,
          source: bookingId ? "dumpsterin_quote" : "quote_generator",
          ...(bookingId ? { booking_id: bookingId } : {}),
        },
        success_url: "https://tpdumpsters.com/booking/success?source=invoice",
        cancel_url: "https://tpdumpsters.com",
      });
      checkoutUrl = checkoutSession.url || "";
    } catch (checkoutErr) {
      console.error("Checkout session error:", checkoutErr);
    }

    // Auto-send to customer if they have a real email
    let sentEmail = false;
    if (customerEmail && customerEmail !== "contact@tpdumpsters.com") {
      try {
        await stripe.invoices.sendInvoice(finalized.id);
        sentEmail = true;
      } catch (sendErr) {
        console.error("Failed to send invoice email:", sendErr);
      }
    }

    // Auto-send SMS with payment link if phone provided
    let sentSms = false;
    if (customerPhone) {
      try {
        // Load Twilio keys from server (not in repo)
        const fs = await import("fs");
        const twilioKeys = JSON.parse(fs.readFileSync("/home/u781187371/twilio-keys.json", "utf8"));
        const twilioSid = twilioKeys.accountSid;
        const twilioToken = twilioKeys.authToken;
        const fromNumber = twilioKeys.dumpsterNumber;
        
        // Format phone number - ensure it starts with +
        let toNumber = customerPhone.replace(/[\s()-]/g, "");
        if (!toNumber.startsWith("+")) toNumber = "+" + toNumber;

        const totalAmount = ((finalized.amount_due || 0) / 100).toFixed(2);
        const payLink = checkoutUrl || finalized.hosted_invoice_url;
        const itemLines = items.length > 1
          ? items.map((item) => `${item.quantity}× ${item.size} ${item.serviceType}`).join("\n")
          : `${qty > 1 ? `${qty}x ` : ""}${size} ${serviceType}`;
        const extraLines = extraCharges.length > 0
          ? "\n" + extraCharges.map((e) => `+ ${e.quantity > 1 ? `${e.quantity}× ` : ""}${e.name} ($${e.price})`).join("\n")
          : "";
        const smsBody = [
          `Hi ${customerName}!`,
          ``,
          `Your invoice from TP Dumpsters:`,
          itemLines + extraLines,
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
              "Authorization": "Basic " + Buffer.from(`${twilioSid}:${twilioToken}`).toString("base64"),
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
          }
        );
        const smsResult = await twilioRes.json();
        sentSms = twilioRes.ok && !smsResult.error_code;
        if (!sentSms) console.error("SMS failed:", smsResult);
      } catch (smsErr) {
        console.error("Failed to send SMS:", smsErr);
      }
    }

    console.log(`📄 INVOICE: ${finalized.id} | ${customerName} | ${serviceType} ${size} x${qty} | $${(finalized.amount_due || 0) / 100} | Email: ${sentEmail} | SMS: ${sentSms}`);

    return NextResponse.json({
      id: finalized.id,
      number: finalized.number,
      status: finalized.status,
      amount: (finalized.amount_due || 0) / 100,
      url: finalized.hosted_invoice_url,
      pdf: finalized.invoice_pdf,
      checkoutUrl,
      customerName,
      customerEmail: customerEmail || null,
      customerPhone: customerPhone || null,
      serviceType,
      size,
      quantity: qty,
      sentEmail,
      sentSms,
      items: items.map((i) => ({ serviceType: i.serviceType, size: i.size, quantity: i.quantity, unitPrice: i.unitPrice })),
    });
  } catch (err) {
    console.error("Invoice error:", err);
    const message = err instanceof Error ? err.message : "Failed to create invoice";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
