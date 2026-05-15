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

export function isDateBlocked(iso: string): boolean {
  return BLOCKED_DATES.has(iso);
}

export function blockedReason(iso: string): string {
  // Single canned reason for now. If we ever need per-date reasons swap
  // BLOCKED_DATES for a Record<string, string>.
  return isDateBlocked(iso)
    ? "Sorry — we're fully booked on that day. Please pick another date."
    : "";
}
