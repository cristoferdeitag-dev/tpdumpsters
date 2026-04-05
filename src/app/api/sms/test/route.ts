import { NextRequest, NextResponse } from "next/server";
import { sendSMS } from "@/lib/twilio";

const AUTH_CODE = process.env.DASHBOARD_PASSWORD || "";

// GET /api/sms/test?auth=<DASHBOARD_PASSWORD>&to=+15106502083
// Sends a test SMS to the specified number
export async function GET(req: NextRequest) {
  const auth = req.nextUrl.searchParams.get("auth");
  if (auth !== AUTH_CODE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const to = req.nextUrl.searchParams.get("to");
  if (!to) {
    return NextResponse.json({ error: "Missing 'to' parameter" }, { status: 400 });
  }

  const message = req.nextUrl.searchParams.get("message") ||
    `✅ TP Dumpsters SMS test successful!\n\nIf you received this, Twilio is configured correctly.\n— TP Dumpsters`;

  const result = await sendSMS(to, message);

  return NextResponse.json({
    ...result,
    to,
  });
}
