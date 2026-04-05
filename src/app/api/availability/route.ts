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

/**
 * GET /api/availability?size=20&date=2026-03-25
 * Returns how many dumpsters of that size are available on that date
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get("x-dashboard-auth");
  if (auth !== AUTH_CODE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const size = req.nextUrl.searchParams.get("size") || "";
  const date = req.nextUrl.searchParams.get("date") || "";

  if (!size) {
    return NextResponse.json({ error: "size is required" }, { status: 400 });
  }

  try {
    const conn = await mysql.createConnection(getDbConfig());

    // Total dumpsters of this size
    const [totalRows] = await conn.execute(
      `SELECT COUNT(*) as total FROM dumpsters WHERE size = ?`,
      [size]
    );
    const total = ((totalRows as any[])[0]?.total as number) || 0;

    // Dumpsters currently NOT in yard (deployed, en-route, pickup-scheduled)
    const [busyRows] = await conn.execute(
      `SELECT COUNT(*) as busy FROM dumpsters WHERE size = ? AND status != 'in-yard'`,
      [size]
    );
    const busy = ((busyRows as any[])[0]?.busy as number) || 0;

    const available = Math.max(0, total - busy);

    await conn.end();

    return NextResponse.json({
      size,
      date,
      total,
      busy,
      available,
      warning: available <= 2 ? (available === 0 ? "none_available" : "low_stock") : null,
    });
  } catch (err) {
    console.error("Availability check error:", err);
    // If DB fails, don't block — just return unknown
    return NextResponse.json({ size, date, total: 0, available: -1, warning: null });
  }
}
