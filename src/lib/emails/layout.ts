// Shared shell for every customer email TP sends: dark header with the logo,
// gold stripe, white card, dark footer with phone / mailbox / site. Each email
// only supplies what goes inside the card, so they all look like they came
// from the same company.
//
// Email rules that are not optional here: table layout, inline styles, no web
// fonts (Oswald/Poppins don't load in a mail client — Arial is what actually
// renders), absolute URLs for images.

// Brand tokens measured in the repo (ref_tp_vs_wise_identidad_visual):
// red is reserved for the primary button and the phone, gold is the
// personality color, body copy is #666 on white.
export const RED = "#E02B20";
export const GOLD = "#e7ac3c";
export const INK = "#1d2329";
export const BODY = "#666666";
export const SITE = "https://tpdumpsters.com";
export const PHONE = "(510) 650-2083";
export const PHONE_TEL = "+15106502083";
export const SUPPORT_EMAIL = "contact@tpdumpsters.com";

export const FONT = "font-family:Arial,Helvetica,sans-serif;";

export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function firstName(fullName: string): string {
  return (fullName || "").trim().split(/\s+/)[0] || "there";
}

/** "2026-09-19" → "Friday, September 19". Noon avoids the UTC day-shift. */
export function formatLongDay(ymd: string): string {
  const d = new Date(ymd + "T12:00:00");
  if (Number.isNaN(d.getTime())) return ymd;
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

/** Red primary button. `label` is raw text; `href` must already be safe. */
export function primaryButton(href: string, label: string): string {
  return `
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 28px 0;">
                <tr>
                  <td style="background-color:${RED};border-radius:4px;">
                    <a href="${esc(href)}" style="display:inline-block;padding:14px 28px;${FONT}font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;">${esc(label)}</a>
                  </td>
                </tr>
              </table>`;
}

export interface BrandedEmailOptions {
  /** <title> and the hidden preview line inbox clients show under the subject. */
  title: string;
  preheader: string;
  /** Rows of the white card. Each entry is one <tr>; content already escaped. */
  cardRows: string[];
  /** One line under the contact info in the footer. */
  footerReason: string;
}

export function wrapBrandedEmail(opts: BrandedEmailOptions): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(opts.title)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(opts.preheader)}</div>
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
${opts.cardRows.join("\n")}
          <tr>
            <td style="background-color:${INK};padding:22px 32px;">
              <p style="margin:0 0 4px 0;${FONT}font-size:14px;color:#ffffff;font-weight:bold;">TP Dumpsters</p>
              <p style="margin:0;${FONT}font-size:12px;line-height:19px;color:#9aa1a8;">
                <a href="tel:${PHONE_TEL}" style="color:#9aa1a8;text-decoration:none;">${PHONE}</a> &nbsp;·&nbsp;
                <a href="mailto:${SUPPORT_EMAIL}" style="color:#9aa1a8;text-decoration:none;">${SUPPORT_EMAIL}</a> &nbsp;·&nbsp;
                <a href="${SITE}" style="color:#9aa1a8;text-decoration:none;">tpdumpsters.com</a><br>
                ${esc(opts.footerReason)}
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

/** Grey "need help?" box with the phone in red. Used above the footer. */
export function helpBox(leadIn: string): string {
  return `
          <tr>
            <td style="padding:24px 32px 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f7f7f7;border-radius:6px;">
                <tr>
                  <td style="padding:20px;${FONT}font-size:14px;line-height:22px;color:${BODY};">
                    ${esc(leadIn)} Call or text
                    <a href="tel:${PHONE_TEL}" style="color:${RED};font-weight:bold;text-decoration:none;">${PHONE}</a>
                    — or just reply to this email.
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
}
