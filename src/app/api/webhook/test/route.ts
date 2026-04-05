import { NextRequest, NextResponse } from "next/server";
import { createCalendarEvent } from "@/lib/calendar";

const AUTH_CODE = process.env.DASHBOARD_PASSWORD || "";

export async function GET(req: NextRequest) {
  const auth = req.nextUrl.searchParams.get("auth");
  if (auth !== AUTH_CODE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Test dates: delivery = tomorrow, pickup = 7 days from now
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const pickupDay = new Date();
  pickupDay.setDate(pickupDay.getDate() + 7);

  const deliveryDate = tomorrow.toISOString().split("T")[0];
  const pickupDate = pickupDay.toISOString().split("T")[0];

  const testDescription = [
    "Booking ID: TP-TEST123",
    "Service: General Debris - 20 Yard",
    "Phone: (510) 555-0000",
    "Email: test@tpdumpsters.com",
    "Total: $650.00",
    "Address: 123 Test St, Oakland, CA 94601",
    "⚠️ TEST EVENT — delete after verifying",
  ].join("\n");

  console.log(`🧪 Test calendar events: delivery=${deliveryDate}, pickup=${pickupDate}`);

  // Delivery: timed event (Morning 7AM-11AM)
  const deliveryResult = await createCalendarEvent({
    summary: "TestBooking 20GDdelivery",
    date: deliveryDate,
    description: testDescription,
    location: "123 Test St, Oakland, CA 94601",
    colorId: "10",
    startTime: "07:00:00",
    endTime: "11:00:00",
  });

  // Pickup: all-day event (no time window)
  const pickupResult = await createCalendarEvent({
    summary: "TestBooking 20GDpickup",
    date: pickupDate,
    description: testDescription,
    location: "123 Test St, Oakland, CA 94601",
    colorId: "11",
  });

  return NextResponse.json({
    test: true,
    deliveryDate,
    pickupDate,
    delivery: deliveryResult,
    pickup: pickupResult,
  });
}
