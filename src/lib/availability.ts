/**
 * Days where TP cannot accept online bookings (yard is full / no driver capacity).
 * Format: ISO yyyy-mm-dd, in Pacific local date (the same string the booking
 * <input type="date"> emits).
 *
 * Keep this list short and prune past dates regularly. Edit by hand — when
 * the operations team is full on a given day, drop the date in and ship.
 */
export const BLOCKED_DATES: ReadonlySet<string> = new Set<string>([
  "2026-05-16", // Saturday 5/16 — fully booked (Asaí, 2026-05-15)
]);

// Standing rule: TP does not deliver on Sundays.
// Set per Asaí 2026-05-20. If this ever changes, flip ALLOW_SUNDAY_DELIVERY.
const ALLOW_SUNDAY_DELIVERY = false;

function isSunday(iso: string): boolean {
  // Parse the date as a Pacific local date — the <input type="date"> value is
  // already a wall-clock yyyy-mm-dd in Pacific. Using a plain Date(iso) would
  // shift one day on hosts not in PT, so we build the date manually.
  const [y, m, d] = iso.split("-").map((s) => parseInt(s, 10));
  if (!y || !m || !d) return false;
  // Date constructor uses local time; on Vercel (UTC) we need to use UTC and
  // not shift. Day-of-week is the same regardless of tz when constructed UTC.
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay() === 0;
}

export function isDateBlocked(iso: string): boolean {
  if (!ALLOW_SUNDAY_DELIVERY && isSunday(iso)) return true;
  return BLOCKED_DATES.has(iso);
}

export function blockedReason(iso: string): string {
  if (!ALLOW_SUNDAY_DELIVERY && isSunday(iso)) {
    return "We don't deliver on Sundays. Please pick another day.";
  }
  return BLOCKED_DATES.has(iso)
    ? "Sorry — we're fully booked on that day. Please pick another date."
    : "";
}
