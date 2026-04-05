/**
 * TP Dumpsters — Conversion & Event Tracking
 *
 * All events are sent to GA4 (G-RLV3201E1G) via gtag().
 * Each event includes page + context parameters for filtering in GA4.
 *
 * Events:
 *   call_click        — User clicks a phone/call button
 *   cta_click         — User clicks a CTA (Book Now, Get Quote, etc.)
 *   booking_started   — User lands on /booking (Step 1)
 *   dumpster_selected — User selects a specific service + size
 *   booking_step      — User advances to a booking step (2, 3, 4)
 *   booking_payment   — User clicks "Pay & confirm"
 *   booking_completed — User reaches /booking/success
 *   page_view_custom  — Custom page view for key landing pages
 */

function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

/** Get current page name from pathname */
function getPageName(): string {
  if (typeof window === "undefined") return "unknown";
  const path = window.location.pathname;
  if (path === "/") return "home";
  return path.replace(/^\//, "").replace(/\//g, "_") || "home";
}

/* ───────── Public tracking functions ───────── */

/** Track phone/call button clicks */
export function trackCallClick(buttonLocation: string) {
  gtag("event", "call_click", {
    page: getPageName(),
    button_location: buttonLocation,
  });
}

/** Track CTA button clicks (Book Now, Get Quote, etc.) */
export function trackCtaClick(ctaText: string, buttonLocation: string) {
  gtag("event", "cta_click", {
    page: getPageName(),
    cta_text: ctaText,
    button_location: buttonLocation,
  });
}

/** Track when user starts booking (Step 1 view) */
export function trackBookingStarted() {
  gtag("event", "booking_started", {
    page: getPageName(),
  });
}

/** Track when user selects a dumpster service + size */
export function trackDumpsterSelected(
  service: string,
  size: string,
  price: number
) {
  gtag("event", "dumpster_selected", {
    service_type: service,
    dumpster_size: size,
    price,
    currency: "USD",
  });
}

/** Track booking step progression */
export function trackBookingStep(step: number, stepName: string) {
  gtag("event", "booking_step", {
    step_number: step,
    step_name: stepName,
  });
}

/** Track when user clicks Pay & confirm */
export function trackBookingPayment(
  service: string,
  size: string,
  totalPrice: number
) {
  gtag("event", "booking_payment", {
    service_type: service,
    dumpster_size: size,
    value: totalPrice,
    currency: "USD",
  });
}

/** Track booking completion (success page) */
export function trackBookingCompleted(
  bookingId: string,
  totalPrice: number
) {
  gtag("event", "booking_completed", {
    booking_id: bookingId,
    value: totalPrice,
    currency: "USD",
  });

  // Also fire Google Ads conversion
  gtag("event", "conversion", {
    send_to: "AW-17134217839/EtBFCMDt_-EaEO_Uneo_",
    value: totalPrice,
    currency: "USD",
  });
}
