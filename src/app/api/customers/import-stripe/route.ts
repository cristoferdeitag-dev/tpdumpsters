import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import Stripe from "stripe";
import { readFileSync } from "fs";

const AUTH_CODE = process.env.DASHBOARD_PASSWORD || "";

function getStripeKey(): string {
  if (process.env.STRIPE_SECRET_KEY) return process.env.STRIPE_SECRET_KEY;
  try {
    const keys = JSON.parse(readFileSync("/home/u781187371/stripe-keys.json", "utf-8"));
    return keys.secret;
  } catch {
    return "";
  }
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-dashboard-auth") || req.nextUrl.searchParams.get("auth");
  if (auth !== AUTH_CODE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secretKey = getStripeKey();
  if (!secretKey) {
    return NextResponse.json({ error: "Stripe key not found" }, { status: 500 });
  }

  const stripe = new Stripe(secretKey, { apiVersion: "2025-02-24.acacia" as Stripe.LatestApiVersion });
  const db = getPool();

  let imported = 0;
  let skipped = 0;
  let updated = 0;
  let hasMore = true;
  let startingAfter: string | undefined;

  try {
    while (hasMore) {
      const params: Stripe.CustomerListParams = { limit: 100 };
      if (startingAfter) params.starting_after = startingAfter;

      const customers = await stripe.customers.list(params);

      for (const c of customers.data) {
        const name = c.name || c.email || "Unknown";
        const email = c.email || "";
        const phone = c.phone || "";

        if (!name && !email && !phone) {
          skipped++;
          continue;
        }

        // Check if customer already exists by email or phone
        const [existing] = await db.execute(
          `SELECT id, name, phone, email FROM customers WHERE (email = ? AND email != '') OR (phone = ? AND phone != '') OR name = ? LIMIT 1`,
          [email, phone, name]
        ) as any[];

        if (existing.length > 0) {
          // Update if we have more data from Stripe
          const ex = existing[0];
          const needsUpdate =
            (!ex.email && email) ||
            (!ex.phone && phone) ||
            (!ex.name && name && name !== "Unknown");

          if (needsUpdate) {
            await db.execute(
              `UPDATE customers SET name = COALESCE(NULLIF(?, ''), name), email = COALESCE(NULLIF(?, ''), email), phone = COALESCE(NULLIF(?, ''), phone) WHERE id = ?`,
              [name, email, phone, ex.id]
            );
            updated++;
          } else {
            skipped++;
          }
        } else {
          // Insert new customer
          await db.execute(
            `INSERT INTO customers (name, email, phone, created_at) VALUES (?, ?, ?, NOW())`,
            [name, email, phone]
          );
          imported++;
        }
      }

      hasMore = customers.has_more;
      if (customers.data.length > 0) {
        startingAfter = customers.data[customers.data.length - 1].id;
      }
    }

    return NextResponse.json({
      success: true,
      imported,
      updated,
      skipped,
      total: imported + updated + skipped,
    });
  } catch (err) {
    console.error("Stripe import error:", err);
    return NextResponse.json({ error: "Import failed", details: String(err) }, { status: 500 });
  }
}
