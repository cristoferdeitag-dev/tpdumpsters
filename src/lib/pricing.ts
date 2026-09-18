// FUENTE ÚNICA de los precios que se COBRAN.
//
// Hasta hoy esta tabla vivía dentro de `src/app/api/checkout/route.ts` y el
// resto del sitio la repetía a mano. Esa duplicación es la causa raíz de los
// dos bugs de precio que ya nos costaron dinero: el doble descuento de $50 de
// junio (memoria `project_tp_pricing_integrity`) y el ladrillo que hoy se
// anuncia en $899 en el sitio mientras el checkout cobra $1,100.
//
// El Booking v2 (`/booking-v2`) importa de aquí, igual que /api/checkout, para
// que la pantalla no pueda decir un precio distinto del que se cobra.
//
// Los valores son los autorizados por Asaí el 15-sep (bajada) y el 17-sep
// (Bricks Only aparte). Cualquier cambio de precio se hace AQUÍ.

/** Precio ONLINE por servicio + tamaño. El de lista es este + LIST_PREMIUM. */
export const ONLINE_PRICES: Record<string, Record<string, number>> = {
  "General Debris":      { "10": 599, "20": 649, "30": 749 },
  "Household Clean Out": { "10": 599, "20": 649, "30": 749 },
  "Construction Debris": { "10": 599, "20": 649, "30": 749 },
  "Roofing":             { "10": 599, "20": 649, "30": 749 },
  "Green Waste":         { "10": 599, "20": 649, "30": 749 },
  "Clean Soil":          { "10": 599 },
  "Clean Concrete":      { "10": 599 },
  "Mixed Materials":     { "10": 899 },
  "Bricks":              { "10": 1100 },
  "Clean Asphalt":       { "10": 899 },
};

/** Lo que se anuncia tachado: el precio de lista es $50 más que el online. */
export const LIST_PREMIUM = 50;

/** Día extra de renta. Asaí, 15-sep-2026 (antes $75). */
export const EXTRA_DAY_FEE = 49;

/** Tonelada extra sobre el peso incluido. Asaí, 15-sep-2026 (antes $199). */
export const OVERWEIGHT_PER_TON = 179;

/** Peso incluido y días de renta por tamaño (los 10 yd son de 3 días). */
export const SIZE_SPECS: Record<string, { tons: number; days: number; dims: string }> = {
  "10": { tons: 1, days: 3, dims: "12′×8′×2.5′" },
  "20": { tons: 2, days: 7, dims: "16′×8′×4′" },
  "30": { tons: 3, days: 7, dims: "16′×8′×6′" },
};

/** Sólo dígitos: "20 Yard" y "20" y "20yd" son el mismo tamaño. */
export function normalizeSize(size: string): string {
  return String(size || "").replace(/[^0-9]/g, "");
}

/**
 * Precio online autoritativo, o null si el servicio/tamaño no está en el
 * catálogo. Quien llame decide qué hacer con el null — el checkout responde
 * 400 en vez de confiar en un total que venga del navegador.
 */
export function onlinePriceFor(serviceType: string, size: string): number | null {
  const base = ONLINE_PRICES[serviceType]?.[normalizeSize(size)];
  return base == null ? null : base;
}

/** Precio de lista (el tachado) para un servicio + tamaño. */
export function listPriceFor(serviceType: string, size: string): number | null {
  const online = onlinePriceFor(serviceType, size);
  return online == null ? null : online + LIST_PREMIUM;
}
