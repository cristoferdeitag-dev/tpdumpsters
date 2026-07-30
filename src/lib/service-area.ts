// Cities/ZIPs TP does NOT service. Checked in the booking wizard
// (AddressStep) and enforced again in /api/checkout so a direct POST can't
// slip through. City match is case-insensitive on the Google Places locality;
// ZIPs cover manual entry. First entry: Mountain View, Santa Clara County —
// an online booking came in there 2026-07-06 and TP doesn't go that far south.
// (The "Mountain View" NEIGHBORHOOD of Martinez is unaffected: its Places
// locality is "Martinez".)
// Milpitas added 2026-07-14: booking TP-MRKVLJ3P came in there and TP doesn't
// service it (Cris msg 2385). ZIPs 95035/95036 cover manual entry.
// San Jose added 2026-07-30: booking TP-MS3QJP2U came in (95124) and Cris
// confirmed TP doesn't service San Jose (msg 17440). Accented variant covers
// manual "San José" entry; Places locality is "San Jose".
export const EXCLUDED_CITIES = ["mountain view", "milpitas", "san jose", "san josé"];
export const EXCLUDED_ZIPS = [
  "94035", "94039", "94040", "94041", "94042", "94043", // Mountain View
  "95035", "95036", // Milpitas
  // San Jose (residential/deliverable ZIPs)
  "95110", "95111", "95112", "95113", "95116", "95117", "95118", "95119",
  "95120", "95121", "95122", "95123", "95124", "95125", "95126", "95127",
  "95128", "95129", "95130", "95131", "95132", "95133", "95134", "95135",
  "95136", "95138", "95139", "95148",
];

export function isOutsideServiceArea(city?: string, zip?: string): boolean {
  const c = (city || "").trim().toLowerCase();
  const z = (zip || "").trim().slice(0, 5);
  return EXCLUDED_CITIES.includes(c) || EXCLUDED_ZIPS.includes(z);
}
