import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

const AUTH_CODE = process.env.DASHBOARD_PASSWORD || "";

function checkAuth(req: NextRequest): boolean {
  const headerAuth = req.headers.get("x-dashboard-auth");
  const queryAuth = req.nextUrl.searchParams.get("auth");
  return headerAuth === AUTH_CODE || queryAuth === AUTH_CODE;
}

// GET: list all customers with their bookings
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = getPool();
    const [rows] = await db.execute(`
      SELECT c.id, c.name, c.phone, c.email, c.created_at,
        c.stripe_id, c.total_revenue, c.total_services,
        b.id as booking_db_id, b.booking_id, b.service_type, b.dumpster_size,
        b.total_price, b.delivery_date, b.pickup_date, b.status, b.address, b.city
      FROM customers c
      LEFT JOIN bookings b ON c.id = b.customer_id
      ORDER BY c.total_revenue DESC, c.created_at DESC
    `);

    // Group bookings by customer
    const customerMap = new Map<string, any>();
    for (const row of rows as any[]) {
      if (!customerMap.has(row.id)) {
        customerMap.set(row.id, {
          id: row.id,
          name: row.name,
          phone: row.phone || "",
          email: row.email || "",
          created_at: row.created_at,
          stripe_id: row.stripe_id || "",
          total_revenue: Number(row.total_revenue) || 0,
          total_services: Number(row.total_services) || 0,
          bookings: [],
        });
      }
      if (row.booking_db_id) {
        customerMap.get(row.id)!.bookings.push({
          id: row.booking_db_id,
          booking_id: row.booking_id,
          service_type: row.service_type,
          dumpster_size: row.dumpster_size,
          total_price: Number(row.total_price),
          delivery_date: row.delivery_date,
          pickup_date: row.pickup_date,
          status: row.status,
          address: row.address,
          city: row.city,
        });
      }
    }

    return NextResponse.json({ customers: Array.from(customerMap.values()) });
  } catch (err) {
    console.error("Customers GET error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// PUT: update customer data
export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, name, phone, email } = body;

    if (!id || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = getPool();
    await db.execute(
      `UPDATE customers SET name = ?, phone = ?, email = ? WHERE id = ?`,
      [name, phone || "", email || "", id]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Customers PUT error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// DELETE: remove customer and their bookings
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing customer id" }, { status: 400 });
    }

    const db = getPool();
    // Delete bookings first (foreign key)
    await db.execute(`DELETE FROM bookings WHERE customer_id = ?`, [id]);
    await db.execute(`DELETE FROM customers WHERE id = ?`, [id]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Customers DELETE error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
