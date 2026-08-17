import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getPlatform, type PlatformConfig } from "@/lib/stripe";

// ── /admin/cobros: shared plumbing ────────────────────────────────────
// Every operation on this screen runs EXCLUSIVELY through the HTM platform
// (Stripe Connect direct ops on TP's connected account + application fee).
// FAIL-CLOSED by design: unlike /api/checkout (where a sale must never be
// lost, so it falls back to legacy no-fee mode), this screen's whole reason
// to exist is that every charge carries the fee — a broken htm_* config must
// stop the operation loudly, never quietly create fee-less invoices.

export function requireCobrosPlatform():
  | { platform: PlatformConfig; error?: undefined }
  | { platform?: undefined; error: NextResponse } {
  const platform = getPlatform();
  if (!platform) {
    return {
      error: NextResponse.json(
        {
          error:
            "Cobros unavailable: HTM platform config (htm_* in stripe-keys.json) is missing or invalid. This screen never charges without it.",
        },
        { status: 503 }
      ),
    };
  }
  return { platform };
}

export function feeCentsFor(totalCents: number, feePct: number): number {
  return Math.round((totalCents * feePct) / 100);
}

// Stripe search queries wrap values in quotes; strip quote/backslash chars so
// a crafted search term can't break out of the quoted literal (same concern
// as isValidBookingId in lib/auth).
export function sanitizeSearchTerm(q: string): string {
  return q.replace(/['"\\]/g, "").trim().slice(0, 80);
}

const CUSTOMER_ID_RE = /^cus_[A-Za-z0-9]{8,40}$/;
export function isValidCustomerId(id: unknown): id is string {
  return typeof id === "string" && CUSTOMER_ID_RE.test(id);
}

const PM_ID_RE = /^pm_[A-Za-z0-9]{8,40}$/;
export function isValidPaymentMethodId(id: unknown): id is string {
  return typeof id === "string" && PM_ID_RE.test(id);
}

const INVOICE_ID_RE = /^in_[A-Za-z0-9]{8,40}$/;
export function isValidInvoiceId(id: unknown): id is string {
  return typeof id === "string" && INVOICE_ID_RE.test(id);
}

// Client-generated idempotency root for one logical operation (create+send /
// charge). Retrying the SAME op reuses the SAME key so a network blip can't
// double-invoice or double-charge (Hermes gotcha #3, 17-ago).
const OP_KEY_RE = /^[A-Za-z0-9-]{16,64}$/;
export function isValidOpKey(key: unknown): key is string {
  return typeof key === "string" && OP_KEY_RE.test(key);
}

// ── Line items ────────────────────────────────────────────────────────
export interface CobroLine {
  description: string;
  amountCents: number; // unit price in cents
  quantity: number;
  serviceType?: string; // set for catalog dumpster lines (drives terms block)
  size?: string;
}

// Validates and normalizes the lines coming from the UI. Amounts are
// server-clamped: positive integers, ≤ $20,000/line, ≤ 20 lines, qty ≤ 10.
export function parseLines(raw: unknown): { lines: CobroLine[]; totalCents: number } | { invalid: string } {
  if (!Array.isArray(raw) || raw.length === 0) return { invalid: "No line items" };
  if (raw.length > 20) return { invalid: "Too many line items (max 20)" };
  const lines: CobroLine[] = [];
  for (const item of raw) {
    const desc = typeof item?.description === "string" ? item.description.trim().slice(0, 200) : "";
    const amount = Number(item?.amountCents);
    const qty = Number(item?.quantity ?? 1);
    if (!desc) return { invalid: "Line item without description" };
    if (!Number.isInteger(amount) || amount <= 0 || amount > 2_000_000) {
      return { invalid: `Invalid amount on "${desc}"` };
    }
    if (!Number.isInteger(qty) || qty < 1 || qty > 10) {
      return { invalid: `Invalid quantity on "${desc}"` };
    }
    lines.push({
      description: desc,
      amountCents: amount,
      quantity: qty,
      serviceType: typeof item?.serviceType === "string" ? item.serviceType : undefined,
      size: typeof item?.size === "string" ? item.size : undefined,
    });
  }
  const totalCents = lines.reduce((sum, l) => sum + l.amountCents * l.quantity, 0);
  if (totalCents <= 0) return { invalid: "Total must be positive" };
  if (totalCents > 5_000_000) return { invalid: "Total exceeds $50,000 safety cap" };
  return { lines, totalCents };
}

// Creates the invoice items attached to a specific draft invoice (no floating
// pending items — avoids the pending-items race the old /api/invoice had).
export async function createInvoiceLines(
  client: Stripe,
  account: string,
  opKey: string,
  customerId: string,
  invoiceId: string,
  lines: CobroLine[]
): Promise<void> {
  let n = 0;
  for (const line of lines) {
    for (let i = 0; i < line.quantity; i++) {
      const desc = line.quantity > 1 ? `${line.description} (${i + 1} of ${line.quantity})` : line.description;
      await client.invoiceItems.create(
        {
          customer: customerId,
          invoice: invoiceId,
          description: desc,
          amount: line.amountCents,
          currency: "usd",
        },
        { stripeAccount: account, idempotencyKey: `${opKey}:item:${n++}` }
      );
    }
  }
}
