import { NextRequest, NextResponse } from "next/server";
import { sendSMS } from "@/lib/twilio";

const AUTH_CODE = process.env.DASHBOARD_PASSWORD || "";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-dashboard-auth");
  if (auth !== AUTH_CODE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { action, customerPhone, dumpsterSize, address, city } = await req.json();

  if (!customerPhone) {
    return NextResponse.json({ success: true, sms: false, reason: "no phone" });
  }

  let body = "";
  if (action === "delivered") {
    body = `Your ${dumpsterSize} yard dumpster has been delivered! 📦\n\n` +
      `📍 ${address}${city ? `, ${city}` : ""}\n\n` +
      `Important reminders:\n` +
      `• Don't overfill — keep debris below the rim\n` +
      `• No hazardous materials\n` +
      `• Pickup is scheduled automatically\n\n` +
      `Questions? Call (510) 650-2083\n` +
      `— TP Dumpsters`;
  } else if (action === "picked-up") {
    body = `Your dumpster has been picked up! ✅\n\n` +
      `Thank you for choosing TP Dumpsters. We hope we made your project easier!\n\n` +
      `Need another dumpster? Book online at tpdumpsters.com/booking for 5% off!\n\n` +
      `— TP Dumpsters`;
  }

  if (body) {
    const result = await sendSMS(customerPhone, body);
    return NextResponse.json({ success: true, sms: result.success, sid: result.sid });
  }

  return NextResponse.json({ success: true, sms: false });
}
