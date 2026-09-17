// Branded booking confirmation email (TP Dumpsters).
//
// Until now the only rental emails the customer got were Stripe's own receipt
// and invoice — verified 2026-09-17 by `receipt_number` on the charges plus 100
// `invoice.sent` events. Those work, but they wear Stripe's face: no logo, no
// phone number, nothing about what to have ready on delivery day. This is the
// brand one, fired from the payment webhook.
//
// Email rules that are not optional here: table layout, inline styles, no web
// fonts (Oswald/Poppins don't load in a mail client — Arial is what actually
// renders), absolute URLs for images.

// Brand tokens measured in the repo (ref_tp_vs_wise_identidad_visual):
// red is reserved for the primary button and the phone, gold is the
// personality color, body copy is #666 on white.
const RED = "#E02B20";
const GOLD = "#e7ac3c";
const INK = "#1d2329";
const BODY = "#666666";
const SITE = "https://tpdumpsters.com";
const PHONE = "(510) 650-2083";
const PHONE_TEL = "+15106502083";
const SUPPORT_EMAIL = "contact@tpdumpsters.com";

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

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function firstName(fullName: string): string {
  return (fullName || "").trim().split(/\s+/)[0] || "there";
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
                <td style="padding:12px 0;${divider}font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${BODY};text-transform:uppercase;letter-spacing:.04em;width:38%;vertical-align:top;">${esc(label)}</td>
                <td style="padding:12px 0;${divider}font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${INK};font-weight:bold;vertical-align:top;">${value}</td>
              </tr>`;
    })
    .join("");

  const prepList = PREP_ITEMS.map(
    (item) =>
      `<tr><td style="padding:0 0 10px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:${BODY};"><span style="color:${GOLD};font-weight:bold;">&bull;</span>&nbsp; ${esc(item)}</td></tr>`
  ).join("");

  const invoiceButton = data.invoiceUrl
    ? `
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 28px 0;">
                <tr>
                  <td style="background-color:${RED};border-radius:4px;">
                    <a href="${esc(data.invoiceUrl)}" style="display:inline-block;padding:14px 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;">View receipt &amp; invoice</a>
                  </td>
                </tr>
              </table>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Your rental is confirmed</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Booking ${esc(data.bookingId)} — delivery ${esc(data.deliveryDateLabel)}, ${esc(data.deliveryWindowLabel)}.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f5f5;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background-color:#ffffff;border-radius:6px;overflow:hidden;">

          <tr>
            <td align="center" style="background-color:${INK};padding:24px;">
              <a href="${SITE}" style="text-decoration:none;">
                <img src="${SITE}/images/logo/TP.png" width="72" height="72" alt="TP Dumpsters" style="display:block;border:0;width:72px;height:auto;">
              </a>
            </td>
          </tr>
          <tr><td style="height:4px;background-color:${GOLD};font-size:0;line-height:0;">&nbsp;</td></tr>

          <tr>
            <td style="padding:32px 32px 0 32px;">
              <p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:${GOLD};font-weight:bold;">Rental confirmed</p>
              <h1 style="margin:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:26px;line-height:32px;color:${INK};">You're all set, ${esc(firstName(data.customerName))}.</h1>
              <p style="margin:0 0 24px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:23px;color:${BODY};">Your dumpster is booked and on the schedule. Here are the details — keep this email handy on delivery day.</p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #eeeeee;border-radius:6px;">
                <tr><td style="padding:4px 20px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${detailRows}
                  </table>
                </td></tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px 0 32px;">
              ${invoiceButton}
              <h2 style="margin:0 0 14px 0;font-family:Arial,Helvetica,sans-serif;font-size:17px;color:${INK};">Before we arrive</h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${prepList}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f7f7f7;border-radius:6px;">
                <tr>
                  <td style="padding:20px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:${BODY};">
                    Need to change a date, move the drop spot, or ask about what fits? Call or text
                    <a href="tel:${PHONE_TEL}" style="color:${RED};font-weight:bold;text-decoration:none;">${PHONE}</a>
                    — or just reply to this email.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color:${INK};padding:22px 32px;">
              <p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#ffffff;font-weight:bold;">TP Dumpsters</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:19px;color:#9aa1a8;">
                <a href="tel:${PHONE_TEL}" style="color:#9aa1a8;text-decoration:none;">${PHONE}</a> &nbsp;·&nbsp;
                <a href="mailto:${SUPPORT_EMAIL}" style="color:#9aa1a8;text-decoration:none;">${SUPPORT_EMAIL}</a> &nbsp;·&nbsp;
                <a href="${SITE}" style="color:#9aa1a8;text-decoration:none;">tpdumpsters.com</a><br>
                You're getting this because you booked a dumpster rental with us.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
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
