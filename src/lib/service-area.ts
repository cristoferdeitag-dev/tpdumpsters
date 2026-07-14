// Cities/ZIPs TP does NOT service. Checked in the booking wizard
// (AddressStep) and enforced again in /api/checkout so a direct POST can't
// slip through. City match is case-insensitive on the Google Places locality;
// ZIPs cover manual entry. First entry: Mountain View, Santa Clara County —
// an online booking came in there 2026-07-06 and TP doesn't go that far south.
// (The "Mountain View" NEIGHBORHOOD of Martinez is unaffected: its Places
// locality is "Martinez".)
// Milpitas added 2026-07-14: booking TP-MRKVLJ3P came in there and TP doesn't
// service it (Cris msg 2385). ZIPs 95035/95036 cover manual entry.
export const EXCLUDED_CITIES = ["mountain view", "milpitas"];
export const EXCLUDED_ZIPS = [
  "94035", "94039", "94040", "94041", "94042", "94043", // Mountain View
  "95035", "95036", // Milpitas
];

export function isOutsideServiceArea(city?: string, zip?: string): boolean {
  const c = (city || "").trim().toLowerCase();
  const z = (zip || "").trim().slice(0, 5);
  return EXCLUDED_CITIES.includes(c) || EXCLUDED_ZIPS.includes(z);
}
