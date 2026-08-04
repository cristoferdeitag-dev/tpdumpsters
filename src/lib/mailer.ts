import * as fs from "fs";
import nodemailer from "nodemailer";

// SMTP creds live in a file on the server (same pattern as the Stripe/Twilio
// keys — Hostinger does NOT inject env vars into the Node process). Env vars
// are the local/dev fallback. If neither exists, sendEmail reports "not
// configured" and callers degrade gracefully (the abandoned-cart watcher still
// sends the WhatsApp alert, it just skips the customer email).
const MAIL_KEYS_PATH = "/home/u781187371/mail-creds.json";

interface MailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  fromName: string;
  replyTo?: string;
}

let _cached: MailConfig | null = null;

function getMailConfig(): MailConfig | null {
  if (_cached) return _cached;
  try {
    const keys = JSON.parse(fs.readFileSync(MAIL_KEYS_PATH, "utf8"));
    if (keys.user && keys.pass) {
      _cached = {
        host: keys.host || "smtp.hostinger.com",
        port: Number(keys.port) || 465,
        user: keys.user,
        pass: keys.pass,
        fromName: keys.fromName || "TP Dumpsters",
        replyTo: keys.replyTo || undefined,
      };
      return _cached;
    }
  } catch {
    // file missing — fall through to env
  }
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;
  if (user && pass) {
    _cached = {
      host: process.env.MAIL_HOST || "smtp.hostinger.com",
      port: Number(process.env.MAIL_PORT) || 465,
      user,
      pass,
      fromName: process.env.MAIL_FROM_NAME || "TP Dumpsters",
      replyTo: process.env.MAIL_REPLY_TO || undefined,
    };
    return _cached;
  }
  return null;
}

export function isMailConfigured(): boolean {
  return getMailConfig() !== null;
}

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text: string
): Promise<{ success: boolean; error?: string }> {
  const config = getMailConfig();
  if (!config) {
    return { success: false, error: "Mail not configured (missing /home/u781187371/mail-creds.json)" };
  }
  try {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.user, pass: config.pass },
    });
    await transporter.sendMail({
      from: `"${config.fromName}" <${config.user}>`,
      to,
      subject,
      html,
      text,
      ...(config.replyTo ? { replyTo: config.replyTo } : {}),
    });
    return { success: true };
  } catch (err) {
    console.error("📧 sendEmail failed:", err);
    return { success: false, error: String(err) };
  }
}
