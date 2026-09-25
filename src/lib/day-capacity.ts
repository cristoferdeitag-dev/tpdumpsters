import { getCalendarEvents } from "@/lib/calendar";
import { isDateBlocked } from "@/lib/availability";

/**
 * Daily capacity cap for ONLINE bookings (Asaí, 2026-09-25 msgs 3452/3460):
 * once a day has DAILY_ONLINE_CAP deliveries + swaps on the TP calendar, the
 * website stops taking online bookings for it and points to the next open day.
 * Pickups don't count. Phone / manual bookings are not affected — only the
 * public booking flow (DateStep + /api/checkout) calls this.
 *
 * Server-only: reads Google Calendar through the service account.
 */
export const DAILY_ONLINE_CAP = 6;

const PICKUP_RE = /p[io]c?k\s*-?\s*c?up|pikcup/i;
const LOAD_RE = /deliver|delviery|delivey|swap/i;

const cache = new Map<string, { at: number; count: number }>();
const CACHE_MS = 60_000;

/** Deliveries + swaps on the calendar for a Pacific yyyy-mm-dd. */
export async function countDeliveriesAndSwaps(iso: string): Promise<number> {
  const hit = cache.get(iso);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.count;

  // Wide window (-08:00 min, -07:00 max) covers the whole Pacific day in PST
  // and PDT; the literal date check below drops spill-over from neighbours.
  const events = await getCalendarEvents(`${iso}T00:00:00-08:00`, `${iso}T23:59:59-07:00`);
  let count = 0;
  for (const ev of events) {
    const summary = String(ev?.summary || "");
    const start: string = ev?.start?.dateTime || ev?.start?.date || "";
    if (!start.startsWith(iso)) continue;
    if (PICKUP_RE.test(summary)) continue; // "...swappickup" is a pickup
    if (LOAD_RE.test(summary)) count++;
  }
  cache.set(iso, { at: Date.now(), count });
  return count;
}

/**
 * True when the day already reached the cap. Fails OPEN: if the calendar
 * can't be read we don't block sales — the error is logged instead.
 */
export async function isDayFull(iso: string): Promise<boolean> {
  try {
    return (await countDeliveriesAndSwaps(iso)) >= DAILY_ONLINE_CAP;
  } catch (err) {
    console.error(`day-capacity: calendar read failed for ${iso} (not blocking):`, err);
    return false;
  }
}

function addDaysIso(iso: string, n: number): string {
  const [y, m, d] = iso.split("-").map((s) => parseInt(s, 10));
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return dt.toISOString().slice(0, 10);
}

/** Next date after `iso` that is neither blocked nor full (looks 21 days ahead). */
export async function nextOpenDate(iso: string, size?: string): Promise<string | null> {
  for (let i = 1; i <= 21; i++) {
    const cand = addDaysIso(iso, i);
    if (isDateBlocked(cand, size)) continue;
    if (await isDayFull(cand)) continue;
    return cand;
  }
  return null;
}

export function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split("-").map((s) => parseInt(s, 10));
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export async function fullDayMessage(iso: string, size?: string): Promise<string> {
  const next = await nextOpenDate(iso, size);
  const nextPart = next
    ? ` The next available delivery date is ${formatLongDate(next)}`
    : " Please choose another day";
  return `We're fully booked for deliveries on ${formatLongDate(iso)}.${nextPart} — or call us at (510) 650-2083.`;
}
