// Shared catalog + manual-invoice terms for /admin/cobros.
// Prices/dims/terms mirror /api/invoice/route.ts (Asaí's MANUAL v3 format).
// TODO(unify): /api/invoice still carries its own copy — fold it onto this
// module the next time that route is touched.

const DIMS_MAP: Record<string, string> = {
  "10": "12' L × 8' W × 2.5' H",
  "20": "16' L × 8' W × 4' H",
  "30": "16' L × 8' W × 6' H",
};

export function getDims(size: string): string {
  const sizeNum = size.replace(/[^0-9]/g, "");
  return DIMS_MAP[sizeNum] || "";
}

export interface CatalogEntry { price: number; dims: string; weight: string; days: number }

export const SERVICES: Record<string, Record<string, CatalogEntry>> = {
  "General Debris": {
    "10 Yard": { price: 649, dims: getDims("10"), weight: "1 ton", days: 3 },
    "20 Yard": { price: 699, dims: getDims("20"), weight: "2 tons", days: 7 },
    "30 Yard": { price: 749, dims: getDims("30"), weight: "3 tons", days: 7 },
  },
  "Household Clean Out": {
    "10 Yard": { price: 599, dims: getDims("10"), weight: "1 ton", days: 3 },
    "20 Yard": { price: 699, dims: getDims("20"), weight: "2 tons", days: 7 },
    "30 Yard": { price: 749, dims: getDims("30"), weight: "3 tons", days: 7 },
  },
  "Construction Debris": {
    "10 Yard": { price: 599, dims: getDims("10"), weight: "1 ton", days: 3 },
    "20 Yard": { price: 699, dims: getDims("20"), weight: "2 tons", days: 7 },
    "30 Yard": { price: 749, dims: getDims("30"), weight: "3 tons", days: 7 },
  },
  "Roofing": {
    "10 Yard": { price: 599, dims: getDims("10"), weight: "1 ton", days: 3 },
    "20 Yard": { price: 699, dims: getDims("20"), weight: "2 tons", days: 7 },
    "30 Yard": { price: 749, dims: getDims("30"), weight: "3 tons", days: 7 },
  },
  "Green Waste": {
    "10 Yard": { price: 599, dims: getDims("10"), weight: "1 ton", days: 3 },
    "20 Yard": { price: 699, dims: getDims("20"), weight: "2 tons", days: 7 },
    "30 Yard": { price: 749, dims: getDims("30"), weight: "3 tons", days: 7 },
  },
  "Clean Soil": {
    "10 Yard": { price: 599, dims: getDims("10"), weight: "No weight limit", days: 3 },
  },
  "Clean Concrete": {
    "10 Yard": { price: 599, dims: getDims("10"), weight: "No weight limit", days: 3 },
  },
  // Mixed Materials = clean soil + clean concrete mixed in the same load.
  // Bricks are billed under the separate "Bricks" service below.
  "Mixed Materials": {
    "10 Yard": { price: 749, dims: getDims("10"), weight: "No weight limit", days: 3 },
  },
  "Bricks": {
    "10 Yard": { price: 749, dims: getDims("10"), weight: "No weight limit", days: 3 },
  },
  "Clean Asphalt": {
    "10 Yard": { price: 749, dims: getDims("10"), weight: "No weight limit", days: 3 },
  },
};

const LIGHT_SERVICES = [
  "Clean Soil",
  "Clean Concrete",
  "Mixed Materials",
  "Bricks",
  "Clean Asphalt",
];

export interface TermsItem { serviceType: string; size: string }

// MANUAL v3 terms (Asaí's exact wording, fits Stripe's 500-char description
// cap). "Thanks for choosing TP Dumpsters!" lives INSIDE the block per Asaí
// (2026-05-01); the invoice footer is reserved for per-invoice notes.
export function buildManualTerms(items: TermsItem[]): string {
  const resolved = items
    .map((i) => ({ ...i, info: SERVICES[i.serviceType]?.[i.size] }))
    .filter((i) => i.info);
  if (resolved.length === 0) return "";

  const allLight = resolved.every((i) => LIGHT_SERVICES.includes(i.serviceType));
  const rentalDays = resolved.length === 1
    ? resolved[0].info!.days
    : Math.max(...resolved.map((i) => i.info!.days));
  const weightSummary = resolved.length === 1
    ? resolved[0].info!.weight
    : resolved.map((i) => `${i.size} = ${i.info!.weight}`).join(", ");

  const sizeBullets = resolved.map((item) => {
    const sizeNum = item.size.replace(" Yard", "");
    const d = item.info!.dims || getDims(item.size);
    return `• ${sizeNum}-yard dumpster for ${item.serviceType.toLowerCase()}${d ? ` (${d})` : ""}`;
  });

  const termLines = [
    ...sizeBullets,
    `• Rental includes ${rentalDays} days; extra days: $75/day`,
    `• Weight limit: ${weightSummary}${allLight ? "" : ". Overweight: $199 per extra ton (prorated)"}`,
    `• Mattresses/appliances/tires: $20-$60 each (size dependent)`,
    `• Do not exceed the marked fill line. No prohibited materials`,
    `• 24h notice - $150 cancellation fee`,
    `• Payment upon arrival or via the "pay online" link above`,
    `• Zelle: TP PAVERS SERVICE INC - 510 253 62 30`,
  ];
  return `General Rental Terms:\n${termLines.join("\n")}\n\nThanks for choosing TP Dumpsters!`;
}
