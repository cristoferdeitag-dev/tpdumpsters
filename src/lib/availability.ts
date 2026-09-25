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
  "2026-09-05", // Saturday 9/5 — fully booked (Asaí, 2026-09-03)
  "2026-09-24", // Thursday 9/24 — fully booked, all sizes (Asaí, 2026-09-24 00:06Z: "ya no pueden apartar ningún tamaño para ser delivered mañana")
  "2026-09-25", // Friday 9/25 — fully booked, all sizes (Asaí, 2026-09-24 msgs 3407/3412: "que mañana ya no puedan bookear para delivery mañana… solo el sábado")
  "2026-09-26", // Saturday 9/26 — fully booked, all sizes (Asaí, 2026-09-25 msgs 3442/3446: "solo podemos 1 servicio más mañana y de ahí apartar el lunes en adelante")
]);

/**
 * Optional custom customer-facing message for a specific BLOCKED_DATES entry
 * (e.g. to point to the next open day). Falls back to the generic message.
 */
const BLOCKED_DATE_MESSAGES: ReadonlyMap<string, string> = new Map([
  ["2026-09-24", "We're fully booked for deliveries on Thursday, September 24. The next available delivery date is Friday, September 25 — or call us at (510) 650-2083."],
  ["2026-09-25", "We're fully booked for deliveries on Friday, September 25. The next available delivery date is Saturday, September 26 — or call us at (510) 650-2083."],
  ["2026-09-26", "We're fully booked for deliveries on Saturday, September 26. The next available delivery date is Monday, September 28 — or call us at (510) 650-2083."],
]);

/**
 * Per-date size restrictions: some days a size is temporarily unavailable
 * (yard/truck capacity) even though the day itself is open for other sizes.
 * Key = ISO delivery date, value = set of `SizeOption.size` strings closed
 * that day (must match ServiceStep exactly: "10 Yard" / "20 Yard" / "30 Yard").
 * Prune past dates regularly, same as BLOCKED_DATES.
 */
export const SIZE_BLOCKED_DATES: ReadonlyMap<string, ReadonlySet<string>> = new Map([
  ["2026-09-22", new Set(["30 Yard"])], // Tuesday 9/22 — only 30 Yard closed; 10/20 Yard both open (Asaí corrected 2026-09-21 23:52Z: "agrega que tambien se pueden 10yds")
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

export function isDateBlocked(iso: string, size?: string): boolean {
  if (isSameDayOrPast(iso)) return true;
  if (!ALLOW_SUNDAY_DELIVERY && isSunday(iso)) return true;
  if (BLOCKED_DATES.has(iso)) return true;
  if (size && SIZE_BLOCKED_DATES.get(iso)?.has(size)) return true;
  return false;
}

export function blockedReason(iso: string, size?: string): string {
  if (isSameDayOrPast(iso)) {
    return "Online bookings need at least one day's notice — please choose tomorrow or later. For same-day service, call us at (510) 650-2083.";
  }
  if (!ALLOW_SUNDAY_DELIVERY && isSunday(iso)) {
    return "We don't deliver on Sundays. Please pick another day.";
  }
  if (BLOCKED_DATES.has(iso)) {
    const custom = BLOCKED_DATE_MESSAGES.get(iso);
    if (custom) return custom;
    return "Sorry — we're fully booked on that day. Please choose the next available day, or call us at (510) 650-2083.";
  }
  if (size && SIZE_BLOCKED_DATES.get(iso)?.has(size)) {
    return `Sorry — the ${size} dumpster is fully booked for that delivery date. Please choose the next available day, pick a different size, or call us at (510) 650-2083.`;
  }
  return "";
}
