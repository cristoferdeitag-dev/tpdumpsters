import { redirect } from "next/navigation";

/**
 * /booking-v2 — DESACTIVADO 18-sep-2026 03:00Z, el mismo día que se subió.
 *
 * Se bajó por una razón concreta: NO PODÍA COBRAR. Faltaba `embedded: true`
 * en la llamada a /api/checkout, así que el 100% de los intentos de pago
 * moría en "the payment form couldn't load", y cada intento dejaba una fila
 * `awaiting_payment` en la base y una Checkout Session huérfana en Stripe.
 *
 * Y había más: cero eventos de analítica y sin `gclid` (Google Ads vería 0
 * ventas y apagaría la pauta que sí funciona), 3 SKUs de los 20 del catálogo
 * — el camino rápido no preguntaba el material, así que un cliente con
 * concreto o ladrillo pagaba $599 por lo que cuesta $899-$1,100 —, y se
 * perdieron la casilla de autorización de cargos, la nota de colocación, el
 * correo obligatorio, la persistencia, la recuperación por correo, el
 * autocompletado, la dirección de facturación y los avisos legales.
 *
 * Dictamen del Consejo IA (18-sep, `reports/consejo/2026-09-18-tp-booking-v2-optimizar/`):
 * **evolucionar el v1, no reemplazarlo.** Las 2,928 líneas de /booking son
 * requerimientos escritos con incidentes reales; el v2 se construyó mirando
 * una maqueta en vez del sistema que ya funciona.
 *
 * El flujo completo quedó en `page.tsx.flujo-completo-bak` y en
 * `components/BookingV2.tsx` para reaprovechar `recommendSize()` y la
 * validación de zona temprana cuando se le inyecte el agente al v1.
 *
 * Mientras, cualquiera con el enlace aterriza en el booking que SÍ cobra.
 */
export default function BookingV2Disabled() {
  redirect("/booking");
}
