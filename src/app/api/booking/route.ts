import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getPool, initDB } from "@/lib/db";

let dbInitialized = false;

export async function POST(request: Request) {
  try {
    const booking = await request.json();

    // Validate required fields
    if (
      !booking.service ||
      !booking.deliveryDate ||
      !booking.pickupDate ||
      !booking.address ||
      !booking.customerName ||
      !booking.customerPhone
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate IDs
    const customerId = randomUUID();
    const bookingDbId = randomUUID();
    const bookingId = `TP-${Date.now().toString(36).toUpperCase()}`;

    const db = getPool();

    // Initialize tables on first request
    if (!dbInitialized) {
      try {
        await initDB();
        dbInitialized = true;
      } catch (dbError) {
        console.error("DB init error (continuing without DB):", dbError);
        // Still accept booking even if DB isn't available
        console.log(
          `📋 BOOKING (no DB): ${bookingId} | ${booking.service.serviceType} ${booking.service.size} | ${booking.customerName} | ${booking.city} | $${booking.totalPrice}`
        );
        return NextResponse.json({
          success: true,
          bookingId,
          message: "Booking request received",
        });
      }
    }

    try {
      // Insert customer
      await db.execute(
        "INSERT INTO customers (id, name, phone, email) VALUES (?, ?, ?, ?)",
        [customerId, booking.customerName, booking.customerPhone, booking.customerEmail || null]
      );

      // Insert booking
      await db.execute(
        `INSERT INTO bookings (id, booking_id, customer_id, service_type, dumpster_size, 
         base_price, extra_days, extra_day_fee, total_price, delivery_date, pickup_date, 
         address, city, zip_code, notes, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
        [
          bookingDbId,
          bookingId,
          customerId,
          booking.service.serviceType,
          booking.service.size,
          booking.service.basePrice,
          booking.extraDays,
          booking.extraDayFee,
          booking.totalPrice,
          booking.deliveryDate,
          booking.pickupDate,
          booking.address,
          booking.city,
          booking.zipCode,
          booking.notes || null,
        ]
      );

      console.log(
        `✅ NEW BOOKING: ${bookingId} | ${booking.service.serviceType} ${booking.service.size} | ${booking.customerName} | ${booking.city} | $${booking.totalPrice}`
      );
    } catch (dbError) {
      // Log but don't fail — accept booking even if DB write fails
      console.error("DB write error:", dbError);
      console.log(
        `📋 BOOKING (DB error): ${bookingId} | ${booking.service.serviceType} ${booking.service.size} | ${booking.customerName} | $${booking.totalPrice}`
      );
    }

    return NextResponse.json({
      success: true,
      bookingId,
      message: "Booking request received",
    });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
