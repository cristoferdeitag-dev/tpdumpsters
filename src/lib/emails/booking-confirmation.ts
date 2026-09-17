// Branded booking confirmation email (TP Dumpsters).
//
// Until now the only rental emails the customer got were Stripe's own receipt
// and invoice — verified 2026-09-17 by `receipt_number` on the charges plus 100
// `invoice.sent` events. Those work, but they wear Stripe's face: no logo, no
// phone number, nothing about what to have ready on delivery day. This is the
// brand one, fired from the payment webhook.
//
import {
  BODY,
  GOLD,
  INK,
  FONT,
  esc,
  firstName,
  helpBox,
  primaryButton,
  wrapBrandedEmail,
  PHONE,
  SUPPORT_EMAIL,
} from "./layout";

export interface BookingConfirmationData {
  customerName: string;
  bookingId: string;
  serviceType: string;
  dumpsterSize: string;
  deliveryDateLabel: string;
  deliveryWindowLabel: string;
  pickupDateLabel?: string;
  fullAddress: string;
  totalPaid?: string;
  /** Stripe hosted invoice page — same link the success screen shows. */
  invoiceUrl?: string;
  notes?: string;
}

/** Prep notes. Kept short on purpose — the full terms ride on the invoice. */
const PREP_ITEMS = [
  "Clear about 60 feet of straight space for the truck, and keep cars off the drop spot.",
  "Load level — nothing above the marked fill line, or we can't haul it.",
  "No paint, chemicals, batteries, or tires. Mattresses, appliances and electronics carry a per-item fee.",
];

export function buildBookingConfirmationSubject(data: BookingConfirmationData): string {
  return `Your dumpster is confirmed for ${data.deliveryDateLabel} — ${data.bookingId}`;
}

export function buildBookingConfirmationHtml(data: BookingConfirmationData): string {
  // Values go in already escaped, so the only raw markup here is ours.
  const rows: Array<[string, string]> = [
    ["Booking ID", esc(data.bookingId)],
    ["Service", `${esc(data.serviceType)} — ${esc(data.dumpsterSize)} Yard`],
    [
      "Delivery",
      `${esc(data.deliveryDateLabel)}<br><span style="color:${BODY};font-weight:normal;">${esc(data.deliveryWindowLabel)}</span>`,
    ],
  ];
  if (data.pickupDateLabel) rows.push(["Pickup", esc(data.pickupDateLabel)]);
  rows.push(["Address", esc(data.fullAddress)]);
  if (data.totalPaid) rows.push(["Total paid", esc(data.totalPaid)]);
  if (data.notes) rows.push(["Your notes", esc(data.notes)]);

  const detailRows = rows
    .map(([label, value], i) => {
      const divider = i > 0 ? "border-top:1px solid #eeeeee;" : "";
      return `
              <tr>
                <td style="padding:12px 0;${divider}${FONT}font-size:13px;color:${BODY};text-transform:uppercase;letter-spacing:.04em;width:38%;vertical-align:top;">${esc(label)}</td>
                <td style="padding:12px 0;${divider}${FONT}font-size:15px;color:${INK};font-weight:bold;vertical-align:top;">${value}</td>
              </tr>`;
    })
    .join("");

  const prepList = PREP_ITEMS.map(
    (item) =>
      `<tr><td style="padding:0 0 10px 0;${FONT}font-size:14px;line-height:21px;color:${BODY};"><span style="color:${GOLD};font-weight:bold;">&bull;</span>&nbsp; ${esc(item)}</td></tr>`
  ).join("");

  const invoiceButton = data.invoiceUrl
    ? primaryButton(data.invoiceUrl, "View receipt & invoice")
    : "";

  return wrapBrandedEmail({
    title: "Your rental is confirmed",
    preheader: `Booking ${data.bookingId} — delivery ${data.deliveryDateLabel}, ${data.deliveryWindowLabel}.`,
    footerReason: "You're getting this because you booked a dumpster rental with us.",
    cardRows: [
      `
          <tr>
            <td style="padding:32px 32px 0 32px;">
              <p style="margin:0 0 6px 0;${FONT}font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:${GOLD};font-weight:bold;">Rental confirmed</p>
              <h1 style="margin:0 0 16px 0;${FONT}font-size:26px;line-height:32px;color:${INK};">You're all set, ${esc(firstName(data.customerName))}.</h1>
              <p style="margin:0 0 24px 0;${FONT}font-size:15px;line-height:23px;color:${BODY};">Your dumpster is booked and on the schedule. Here are the details — keep this email handy on delivery day.</p>
            </td>
          </tr>`,
      `
          <tr>
            <td style="padding:0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #eeeeee;border-radius:6px;">
                <tr><td style="padding:4px 20px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${detailRows}
                  </table>
                </td></tr>
              </table>
            </td>
          </tr>`,
      `
          <tr>
            <td style="padding:28px 32px 0 32px;">
              ${invoiceButton}
              <h2 style="margin:0 0 14px 0;${FONT}font-size:17px;color:${INK};">Before we arrive</h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${prepList}
              </table>
            </td>
          </tr>`,
      helpBox("Need to change a date, move the drop spot, or ask about what fits?"),
    ],
  });
}

export function buildBookingConfirmationText(data: BookingConfirmationData): string {
  const lines = [
    `You're all set, ${firstName(data.customerName)}.`,
    "",
    "Your dumpster rental is confirmed. Details:",
    "",
    `Booking ID: ${data.bookingId}`,
    `Service: ${data.serviceType} - ${data.dumpsterSize} Yard`,
    `Delivery: ${data.deliveryDateLabel} (${data.deliveryWindowLabel})`,
  ];
  if (data.pickupDateLabel) lines.push(`Pickup: ${data.pickupDateLabel}`);
  lines.push(`Address: ${data.fullAddress}`);
  if (data.totalPaid) lines.push(`Total paid: ${data.totalPaid}`);
  if (data.notes) lines.push(`Your notes: ${data.notes}`);
  if (data.invoiceUrl) {
    lines.push("", `Receipt & invoice: ${data.invoiceUrl}`);
  }
  lines.push("", "BEFORE WE ARRIVE", ...PREP_ITEMS.map((i) => `- ${i}`));
  lines.push(
    "",
    `Questions, date changes, or anything else: call or text ${PHONE}, or reply to this email.`,
    "",
    "TP Dumpsters",
    `${PHONE} · ${SUPPORT_EMAIL} · tpdumpsters.com`
  );
  return lines.join("\n");
}
