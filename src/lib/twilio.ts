import * as fs from "fs";

const TWILIO_KEYS_PATH = "/home/u781187371/twilio-keys.json";

interface TwilioConfig {
  accountSid: string;
  authToken: string;
  fromNumber: string;
}

let _cachedConfig: TwilioConfig | null = null;

function getTwilioConfig(): TwilioConfig | null {
  if (_cachedConfig) return _cachedConfig;
  try {
    const keys = JSON.parse(fs.readFileSync(TWILIO_KEYS_PATH, "utf8"));
    _cachedConfig = {
      accountSid: keys.accountSid,
      authToken: keys.authToken,
      fromNumber: keys.dumpsterNumber || keys.fromNumber,
    };
    return _cachedConfig;
  } catch {
    // Fallback to env vars
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_FROM_NUMBER;
    if (sid && token && from) {
      _cachedConfig = { accountSid: sid, authToken: token, fromNumber: from };
      return _cachedConfig;
    }
    console.error("⚠️ Twilio keys not found. Create /home/u781187371/twilio-keys.json or set env vars.");
    return null;
  }
}

export async function sendSMS(to: string, body: string): Promise<{ success: boolean; sid?: string; error?: string }> {
  try {
    const config = getTwilioConfig();
    if (!config) {
      return { success: false, error: "Twilio not configured" };
    }

    // Normalize phone number
    let phone = to.replace(/\D/g, "");
    if (phone.length === 10) phone = "1" + phone;
    if (!phone.startsWith("+")) phone = "+" + phone;

    const auth = Buffer.from(`${config.accountSid}:${config.authToken}`).toString("base64");
    const postData = new URLSearchParams({
      To: phone,
      From: config.fromNumber,
      Body: body,
    }).toString();

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: postData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log(`📱 SMS sent to ${phone}: ${data.sid}`);
      return { success: true, sid: data.sid };
    } else {
      console.error(`❌ SMS failed to ${phone}:`, data.message || data);
      return { success: false, error: data.message || "SMS send failed" };
    }
  } catch (err) {
    console.error("❌ SMS error:", err);
    return { success: false, error: String(err) };
  }
}

const WHATSAPP_SANDBOX = "whatsapp:+14155238886";

export async function sendWhatsApp(to: string, body: string): Promise<{ success: boolean; sid?: string; error?: string }> {
  try {
    const config = getTwilioConfig();
    if (!config) {
      return { success: false, error: "Twilio not configured" };
    }

    // Normalize phone number for WhatsApp
    let phone = to.replace(/\D/g, "");
    if (phone.length === 10) phone = "1" + phone;
    if (!phone.startsWith("+")) phone = "+" + phone;
    const whatsappTo = `whatsapp:${phone}`;

    const auth = Buffer.from(`${config.accountSid}:${config.authToken}`).toString("base64");
    const postData = new URLSearchParams({
      To: whatsappTo,
      From: WHATSAPP_SANDBOX,
      Body: body,
    }).toString();

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: postData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log(`📱 WhatsApp sent to ${phone}: ${data.sid}`);
      return { success: true, sid: data.sid };
    } else {
      console.error(`❌ WhatsApp failed to ${phone}:`, data.message || data);
      return { success: false, error: data.message || "WhatsApp send failed" };
    }
  } catch (err) {
    console.error("❌ WhatsApp error:", err);
    return { success: false, error: String(err) };
  }
}
