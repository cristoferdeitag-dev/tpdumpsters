// Cities/ZIPs TP does NOT service. Checked in the booking wizard
// (AddressStep) and enforced again in /api/checkout so a direct POST can't
// slip through. City match is case-insensitive on the Google Places locality;
// ZIPs cover manual entry.
// History: Mountain View excluded 2026-07-06 (stray booking), Milpitas
// 2026-07-14 (TP-MRKVLJ3P, Cris msg 2385), San Jose 2026-07-30 (TP-MS3QJP2U,
// Cris msg 17440) — all Santa Clara County. On 2026-08-05 Cris ordered the
// WHOLE county excluded (msg 18098), so every county locality is listed.
// (The "Mountain View" NEIGHBORHOOD of Martinez is unaffected: its Places
// locality is "Martinez". "San José" accented variant covers manual entry.)
export const EXCLUDED_CITIES = [
  // Santa Clara County — entire county excluded
  "san jose", "san josé", "santa clara", "sunnyvale", "mountain view",
  "milpitas", "palo alto", "cupertino", "campbell", "los gatos", "saratoga",
  "los altos", "los altos hills", "morgan hill", "gilroy", "monte sereno",
  "san martin", "stanford", "alviso",
];
export const EXCLUDED_ZIPS = [
  // ── Santa Clara County ──
  "94035", "94039", "94040", "94041", "94042", "94043", // Mountain View
  "95035", "95036", // Milpitas
  // San Jose (residential/deliverable ZIPs)
  "95110", "95111", "95112", "95113", "95116", "95117", "95118", "95119",
  "95120", "95121", "95122", "95123", "95124", "95125", "95126", "95127",
  "95128", "95129", "95130", "95131", "95132", "95133", "95134", "95135",
  "95136", "95138", "95139", "95148",
  "95050", "95051", "95052", "95053", "95054", "95055", "95056", // Santa Clara
  "94085", "94086", "94087", "94088", "94089", // Sunnyvale
  "94301", "94302", "94303", "94304", "94306", // Palo Alto
  "94305", "94309", // Stanford
  "94022", "94023", "94024", // Los Altos / Los Altos Hills
  "95014", "95015", // Cupertino
  "95008", "95009", "95011", // Campbell
  "95030", "95031", "95032", "95033", // Los Gatos / Monte Sereno
  "95070", "95071", // Saratoga
  "95037", "95038", // Morgan Hill
  "95020", "95021", // Gilroy
  "95046", // San Martin
  "95013", "95042", "95044", "95140", // Coyote, New Almaden, Redwood Estates, Mt Hamilton
];

export function isOutsideServiceArea(city?: string, zip?: string): boolean {
  const c = (city || "").trim().toLowerCase();
  const z = (zip || "").trim().slice(0, 5);
  return EXCLUDED_CITIES.includes(c) || EXCLUDED_ZIPS.includes(z);
}
