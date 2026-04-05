import Stripe from "stripe";
import { readFileSync } from "fs";

// Lazy-loaded Stripe keys (only resolved at runtime, not build time)
let _keys: { secret: string; publishable: string } | null = null;

function getKeys(): { secret: string; publishable: string } {
  if (_keys) return _keys;

  // Check env vars first
  if (process.env.STRIPE_SECRET_KEY) {
    _keys = {
      secret: process.env.STRIPE_SECRET_KEY,
      publishable: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
    };
    return _keys;
  }

  // Read from server config file (Hostinger doesn't support env vars)
  try {
    const raw = readFileSync("/home/u781187371/stripe-keys.json", "utf-8");
    const config = JSON.parse(raw);
    _keys = {
      secret: config.secret_key || "",
      publishable: config.publishable_key || "",
    };
    return _keys;
  } catch {
    console.error("⚠️ Stripe keys not found. Set env vars or create /home/u781187371/stripe-keys.json");
    _keys = { secret: "", publishable: "" };
    return _keys;
  }
}

// Lazy Stripe instance — only created on first use
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const keys = getKeys();
    _stripe = new Stripe(keys.secret, {
      apiVersion: "2026-02-25.clover",
    });
  }
  return _stripe;
}

export function getPublishableKey(): string {
  return getKeys().publishable;
}
