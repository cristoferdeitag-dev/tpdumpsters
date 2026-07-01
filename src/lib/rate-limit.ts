// ── Simple in-memory rate limiter ────────────────────────────────────
// First line of defense against automated card-testing ("carding"): a bot
// blasting stolen cards through /api/checkout gets throttled per IP. This
// is per-worker in-memory (not shared across Hostinger workers or restarts)
// — good enough to kill automated abuse cheaply. For a hard, shared limit,
// move to Upstash/Redis later.

type Hit = number[]; // timestamps (ms) within the window

const buckets = new Map<string, Hit>();
let lastSweep = 0;

/**
 * Records a hit for `key` and reports whether it's within the limit.
 * @param key      identity to limit on (usually client IP)
 * @param max      max allowed hits per window
 * @param windowMs window length in ms
 */
export function checkRateLimit(
  key: string,
  max = 6,
  windowMs = 10 * 60 * 1000
): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();

  // Periodic sweep so the map doesn't grow unbounded across many IPs.
  if (now - lastSweep > windowMs) {
    for (const [k, arr] of buckets) {
      const fresh = arr.filter((t) => now - t < windowMs);
      if (fresh.length === 0) buckets.delete(k);
      else buckets.set(k, fresh);
    }
    lastSweep = now;
  }

  const recent = (buckets.get(key) || []).filter((t) => now - t < windowMs);

  if (recent.length >= max) {
    const retryAfterSec = Math.max(1, Math.ceil((windowMs - (now - recent[0])) / 1000));
    return { allowed: false, retryAfterSec };
  }

  recent.push(now);
  buckets.set(key, recent);
  return { allowed: true, retryAfterSec: 0 };
}

/** Best-effort client IP from proxy headers (Hostinger sits behind a proxy). */
export function clientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return headers.get("x-real-ip") || "unknown";
}
