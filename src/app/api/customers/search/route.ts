import { NextRequest, NextResponse } from "next/server";
import * as mysql from "mysql2/promise";

const AUTH_CODE = process.env.DASHBOARD_PASSWORD || "";

function getDbConfig() {
  return {
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
  };
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("x-dashboard-auth");
  if (auth !== AUTH_CODE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const query = req.nextUrl.searchParams.get("q") || "";
  if (query.length < 2) {
    return NextResponse.json({ customers: [] });
  }

  try {
    const conn = await mysql.createConnection(getDbConfig());
    
    // Search customers by name, also get their most recent booking for address info
    const [rows] = await conn.execute(
      `SELECT c.id, c.name, c.phone, c.email, 
              b.address, b.city, b.zip_code, b.service_type, b.dumpster_size,
              b.created_at as last_booking
       FROM customers c
       LEFT JOIN bookings b ON c.id = b.customer_id
       WHERE c.name LIKE ?
       ORDER BY b.created_at DESC
       LIMIT 10`,
      [`%${query}%`]
    );
    
    await conn.end();

    // Deduplicate by customer name (keep the one with most recent booking)
    const seen = new Map();
    for (const row of rows as any[]) {
      if (!seen.has(row.name)) {
        seen.set(row.name, {
          id: row.id,
          name: row.name,
          phone: row.phone || "",
          email: row.email || "",
          address: row.address || "",
          city: row.city || "",
          zipCode: row.zip_code || "",
          lastService: row.service_type || "",
          lastSize: row.dumpster_size || "",
        });
      }
    }

    return NextResponse.json({ customers: Array.from(seen.values()) });
  } catch (err) {
    console.error("Customer search error:", err);
    return NextResponse.json({ customers: [] });
  }
}
