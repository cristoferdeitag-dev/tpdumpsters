import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

// ── Dumpster inventory (in-memory for now, Phase 2 → MySQL) ────────────
export interface Dumpster {
  id: string;
  size: string;       // "10", "20", "30"
  status: "yard" | "en-route" | "deployed" | "pickup-scheduled";
  address?: string;
  city?: string;
  customer?: string;
  phone?: string;
  serviceType?: string;
  deliveryDate?: string;
  pickupDate?: string;
  notes?: string;
  lat?: number;
  lng?: number;
  updatedAt: string;
}

// Utility: get pool safely (re-exported from booking)
async function getDb() {
  try {
    return getPool();
  } catch {
    return null;
  }
}

// ── GET: Fetch all dumpsters + today's bookings ────────────────────────
export async function GET(req: NextRequest) {
  const auth = req.headers.get("x-dashboard-auth");
  if (auth !== (process.env.DASHBOARD_PASSWORD || "")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await getDb();

    // Fetch dumpsters from DB
    let dumpsters: Dumpster[] = [];
    if (db) {
      try {
        const [rows] = await db.execute(`SELECT * FROM dumpsters ORDER BY updated_at DESC`);
        dumpsters = (rows as Record<string, unknown>[]).map((r) => ({
          id: r.id as string,
          size: r.size as string,
          status: r.status as Dumpster["status"],
          address: (r.address as string) || undefined,
          city: (r.city as string) || undefined,
          customer: (r.customer as string) || undefined,
          phone: (r.phone as string) || undefined,
          serviceType: (r.service_type as string) || undefined,
          deliveryDate: r.delivery_date ? String(r.delivery_date).slice(0, 10) : undefined,
          pickupDate: r.pickup_date ? String(r.pickup_date).slice(0, 10) : undefined,
          notes: (r.notes as string) || undefined,
          lat: r.lat ? Number(r.lat) : undefined,
          lng: r.lng ? Number(r.lng) : undefined,
          updatedAt: String(r.updated_at),
        }));
      } catch {
        // Table might not exist yet — that's ok
      }
    }

    // Fetch today's bookings
    let todayBookings: Record<string, unknown>[] = [];
    if (db) {
      try {
        const today = new Date().toISOString().slice(0, 10);
        const [rows] = await db.execute(
          `SELECT b.*, c.name as customer_name, c.phone as customer_phone, c.email as customer_email
           FROM bookings b LEFT JOIN customers c ON b.customer_id = c.id
           WHERE b.delivery_date = ? OR b.pickup_date = ?
           ORDER BY b.delivery_date`,
          [today, today]
        );
        todayBookings = rows as Record<string, unknown>[];
      } catch {
        // OK
      }
    }

    return NextResponse.json({
      dumpsters,
      todayBookings,
      stats: {
        total: dumpsters.length,
        yard: dumpsters.filter((d) => d.status === "yard").length,
        enRoute: dumpsters.filter((d) => d.status === "en-route").length,
        deployed: dumpsters.filter((d) => d.status === "deployed").length,
        pickupScheduled: dumpsters.filter((d) => d.status === "pickup-scheduled").length,
      },
    });
  } catch (err) {
    console.error("Dashboard GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ── POST: Add or update a dumpster ─────────────────────────────────────
export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-dashboard-auth");
  if (auth !== (process.env.DASHBOARD_PASSWORD || "")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action } = body;
    const db = await getDb();
    if (!db) {
      return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    }

    // Ensure table exists
    await db.execute(`
      CREATE TABLE IF NOT EXISTS dumpsters (
        id VARCHAR(20) PRIMARY KEY,
        size VARCHAR(10) NOT NULL,
        status ENUM('yard','en-route','deployed','pickup-scheduled') DEFAULT 'yard',
        address VARCHAR(500),
        city VARCHAR(100),
        customer VARCHAR(255),
        phone VARCHAR(50),
        service_type VARCHAR(100),
        delivery_date DATE,
        pickup_date DATE,
        notes TEXT,
        lat DECIMAL(10,7),
        lng DECIMAL(10,7),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    if (action === "add") {
      const id = body.id || `D-${body.size || "10"}-${Date.now().toString(36).toUpperCase()}`;
      await db.execute(
        `INSERT INTO dumpsters (id, size, status, notes) VALUES (?, ?, 'yard', ?)`,
        [id, body.size || "10", body.notes || null]
      );
      return NextResponse.json({ ok: true, id });
    }

    if (action === "update") {
      // If returning to yard, clear all assignment data
      if (body.status === "yard") {
        await db.execute(
          `UPDATE dumpsters SET 
            status = 'yard', 
            customer = NULL, 
            address = NULL, 
            city = NULL, 
            phone = NULL, 
            service_type = NULL, 
            delivery_date = NULL, 
            pickup_date = NULL, 
            lat = NULL, 
            lng = NULL,
            notes = NULL
          WHERE id = ?`,
          [body.id]
        );
        return NextResponse.json({ ok: true, cleared: true });
      }

      const sets: string[] = [];
      const vals: (string | number | null)[] = [];

      for (const field of ["status", "address", "city", "customer", "phone", "service_type", "delivery_date", "pickup_date", "notes", "lat", "lng"]) {
        const camel = field.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
        if (body[camel] !== undefined || body[field] !== undefined) {
          sets.push(`${field} = ?`);
          vals.push(body[camel] ?? body[field]);
        }
      }

      if (sets.length === 0) {
        return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
      }

      vals.push(body.id);
      await db.execute(`UPDATE dumpsters SET ${sets.join(", ")} WHERE id = ?`, vals);
      return NextResponse.json({ ok: true });
    }

    if (action === "delete") {
      await db.execute(`DELETE FROM dumpsters WHERE id = ?`, [body.id]);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err) {
    console.error("Dashboard POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
