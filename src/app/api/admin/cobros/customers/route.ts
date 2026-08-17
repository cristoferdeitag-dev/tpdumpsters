import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { requireAuth } from "@/lib/auth";
import {
  requireCobrosPlatform,
  sanitizeSearchTerm,
  isValidCustomerId,
} from "@/lib/cobros";

// Customers live on TP's connected account — the SAME customers Asaí sees in
// the Stripe dashboard. Everything here goes through the platform client with
// the Stripe-Account header (read-only ops, no fee involved).

interface CustomerRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  line1: string;
  created: number;
  hasDefaultPm: boolean;
}

function toRow(c: Stripe.Customer): CustomerRow {
  return {
    id: c.id,
    name: c.name || "(sin nombre)",
    email: c.email || "",
    phone: c.phone || "",
    city: c.address?.city || c.shipping?.address?.city || "",
    line1: c.address?.line1 || c.shipping?.address?.line1 || "",
    created: c.created,
    hasDefaultPm: Boolean(c.invoice_settings?.default_payment_method),
  };
}

export async function GET(req: NextRequest) {
  const unauthorized = requireAuth(req);
  if (unauthorized) return unauthorized;
  const gate = requireCobrosPlatform();
  if (gate.error) return gate.error;
  const { client, account } = gate.platform;

  try {
    // ?cards=cus_… → saved cards for one customer (fetched lazily when the
    // operator selects them; drives the "Cobrar ahora" button).
    const cardsFor = req.nextUrl.searchParams.get("cards");
    if (cardsFor) {
      if (!isValidCustomerId(cardsFor)) {
        return NextResponse.json({ error: "Invalid customer id" }, { status: 400 });
      }
      const [customer, pms] = await Promise.all([
        client.customers.retrieve(cardsFor, undefined, { stripeAccount: account }),
        client.paymentMethods.list(
          { customer: cardsFor, type: "card", limit: 10 },
          { stripeAccount: account }
        ),
      ]);
      const defaultPm =
        customer && !("deleted" in customer)
          ? (typeof customer.invoice_settings?.default_payment_method === "string"
              ? customer.invoice_settings.default_payment_method
              : customer.invoice_settings?.default_payment_method?.id) || ""
          : "";
      const cards = pms.data.map((pm) => ({
        id: pm.id,
        brand: pm.card?.brand || "card",
        last4: pm.card?.last4 || "????",
        expMonth: pm.card?.exp_month || 0,
        expYear: pm.card?.exp_year || 0,
        isDefault: pm.id === defaultPm,
        created: pm.created,
      }));
      // Newest first; default card pinned on top.
      cards.sort((a, b) => Number(b.isDefault) - Number(a.isDefault) || b.created - a.created);
      return NextResponse.json({ cards });
    }

    const q = sanitizeSearchTerm(req.nextUrl.searchParams.get("q") || "");
    if (!q) {
      // Recent customers — a plain list has no search-index lag, so a customer
      // created seconds ago (e.g. by an online booking) is already here.
      const recent = await client.customers.list({ limit: 15 }, { stripeAccount: account });
      return NextResponse.json({ customers: recent.data.map(toRow), mode: "recent" });
    }

    const clauses = [`name~'${q}'`, `email~'${q}'`];
    const digits = q.replace(/\D/g, "");
    if (digits.length >= 4) clauses.push(`phone~'${digits}'`);
    const found = await client.customers.search(
      { query: clauses.join(" OR "), limit: 15 },
      { stripeAccount: account }
    );
    return NextResponse.json({ customers: found.data.map(toRow), mode: "search" });
  } catch (err) {
    console.error("cobros/customers GET error:", err);
    const message = err instanceof Error ? err.message : "Customer lookup failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST → create a new customer on TP's account (shows up instantly in the
// Stripe dashboard too — same account, two windows).
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

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 120) : "";
  const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 30) : "";
  const addr = (body.address || {}) as Record<string, string>;
  const address =
    addr.line1 || addr.city
      ? {
          line1: String(addr.line1 || "").slice(0, 200),
          city: String(addr.city || "").slice(0, 80),
          state: String(addr.state || "CA").slice(0, 20),
          postal_code: String(addr.zip || "").slice(0, 12),
          country: "US",
        }
      : undefined;

  try {
    const customer = await client.customers.create(
      {
        name,
        email: email || undefined,
        phone: phone || undefined,
        address,
        shipping: address ? { name, phone: phone || undefined, address } : undefined,
        metadata: { source: "admin_cobros" },
      },
      { stripeAccount: account }
    );
    console.log(`👤 COBROS customer created: ${customer.id} | ${name}`);
    return NextResponse.json({ customer: toRow(customer) });
  } catch (err) {
    console.error("cobros/customers POST error:", err);
    const message = err instanceof Error ? err.message : "Customer create failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
