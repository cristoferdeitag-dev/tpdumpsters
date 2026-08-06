/**
 * Days where TP cannot accept online bookings (yard is full / no driver capacity).
 * Format: ISO yyyy-mm-dd, in Pacific local date (the same string the booking
 * <input type="date"> emits).
 *
 * Keep this list short and prune past dates regularly. Edit by hand — when
 * the operations team is full on a given day, drop the date in and ship.
 */
export const BLOCKED_DATES: ReadonlySet<string> = new Set<string>([
  "2026-06-10", // Wednesday 6/10 — fully booked (Asaí, 2026-06-09)
  "2026-07-07", // Tuesday 7/7 — truck down, no deliveries today (Cris, 2026-07-07)
  "2026-08-07", // Friday 8/7 — closed for online booking (Asaí, 2026-08-06)
  "2026-08-08", // Saturday 8/8 — closed for online booking (Asaí, 2026-08-06)
]);

// Standing rule: TP does not deliver on Sundays.
// Set per Asaí 2026-05-20. If this ever changes, flip ALLOW_SUNDAY_DELIVERY.
const ALLOW_SUNDAY_DELIVERY = false;

// Standing rule (Asaí, 2026-07-17): online bookings need at least one day of
// lead time — same-day (and past) dates are NOT accepted through the website.
// Same-day service still happens by phone / manual booking, whose code paths
// don't call isDateBlocked, so this only gates the public online flow.
// Compare against "today" in Pacific, since the <input type="date"> value is a
// Pacific wall-clock yyyy-mm-dd (the truck operates in PT).
function pacificToday(): string {
  // en-CA formats as yyyy-mm-dd, which sorts identically to chronological order.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
  }).format(new Date());
}

function isSameDayOrPast(iso: string): boolean {
  return iso <= pacificToday();
}

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
  if (isSameDayOrPast(iso)) return true;
  if (!ALLOW_SUNDAY_DELIVERY && isSunday(iso)) return true;
  return BLOCKED_DATES.has(iso);
}

export function blockedReason(iso: string): string {
  if (isSameDayOrPast(iso)) {
    return "Online bookings need at least one day's notice — please choose tomorrow or later. For same-day service, call us at (510) 650-2083.";
  }
  if (!ALLOW_SUNDAY_DELIVERY && isSunday(iso)) {
    return "We don't deliver on Sundays. Please pick another day.";
  }
  return BLOCKED_DATES.has(iso)
    ? "Sorry — we're fully booked on that day. Please pick another date."
    : "";
}
