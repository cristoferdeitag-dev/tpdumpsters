import { NextRequest, NextResponse } from "next/server";
import * as mysql from "mysql2/promise";
import { getCalendarAccessToken } from "@/lib/calendar";

const AUTH_CODE = process.env.DASHBOARD_PASSWORD || "";
const CALENDAR_ID = "tppaver@gmail.com";

// Type codes from calendar event format: "Name SizeTypeAction"
const TYPE_CODES: Record<string, string> = {
  GD: "General Debris",
  HJ: "Household Junk",
  CD: "Construction Debris",
  RF: "Roofing",
  GW: "Green Waste",
  YW: "Yard Waste",
  MM: "Mixed Materials",
  SC: "Clean Soil/Concrete",
  BK: "Brick",
  CS: "Clean Soil",
  CC: "Clean Concrete",
};

interface CalendarEvent {
  summary: string;
  date: string;
  location: string;
  customerName: string;
  size: string;
  serviceType: string;
  action: "delivery" | "pickup";
}

// Parse event summary: "Kenny 20GDdelivery" or "Rod Volz-30pickup"
function parseEventSummary(summary: string): {
  customerName: string;
  size: string;
  typeCode: string;
  action: "delivery" | "pickup";
} | null {
  // Match patterns like "Name 20GDdelivery" or "Name-30pickup" or "Name 10CSpickup"
  const match = summary.match(
    /^(.+?)[\s-]+(\d+)(GD|HJ|CD|RF|GW|YW|MM|SC|BK|CS|CC)?(delivery|pickup)$/i
  );
  if (!match) return null;

  return {
    customerName: match[1].trim(),
    size: match[2],
    typeCode: match[3]?.toUpperCase() || "GD",
    action: match[4].toLowerCase() as "delivery" | "pickup",
  };
}

// Access token now provided by shared @/lib/calendar module

async function getCalendarEvents(token: string, dateStr?: string): Promise<CalendarEvent[]> {
  const targetDate = dateStr ? new Date(dateStr + "T00:00:00-07:00") : new Date();
  const startOfDay = new Date(targetDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(targetDate);
  endOfDay.setHours(23, 59, 59, 999);

  const url =
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?` +
    new URLSearchParams({
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: "true",
      orderBy: "startTime",
      maxResults: "50",
    });

  const res = await fetch(url, {
    headers: { Authorization: "Bearer " + token },
  });

  const data = await res.json();
  const events: CalendarEvent[] = [];

  for (const item of data.items || []) {
    if (!item.summary) continue;
    const parsed = parseEventSummary(item.summary);
    if (!parsed) continue;

    events.push({
      summary: item.summary,
      date: item.start?.dateTime || item.start?.date || "",
      location: item.location || "",
      customerName: parsed.customerName,
      size: parsed.size,
      serviceType: TYPE_CODES[parsed.typeCode] || "General Debris",
      action: parsed.action,
    });
  }

  return events;
}

function getDbConfig() {
  return {
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
  };
}

async function autoAssignDumpsters(events: CalendarEvent[]) {
  let conn: mysql.Connection | null = null;
  const results: Array<{ event: string; dumpsterId: string | null; action: string; status: string }> = [];

  try {
    conn = await mysql.createConnection(getDbConfig());

    for (const event of events) {
      if (event.action === "delivery") {
        // Check if this event is already assigned (prevent duplicates)
        const [existing] = await conn.execute(
          "SELECT id FROM dumpsters WHERE customer = ? AND size = ? AND status IN ('en-route', 'deployed', 'pickup-scheduled') LIMIT 1",
          [event.customerName, event.size]
        );
        if ((existing as Array<{ id: string }>).length > 0) {
          results.push({
            event: event.summary,
            dumpsterId: (existing as Array<{ id: string }>)[0].id,
            action: "already-assigned",
            status: `ℹ️ Already assigned: ${(existing as Array<{ id: string }>)[0].id} → ${event.customerName}`,
          });
          continue;
        }

        // Find an available dumpster of the right size in yard
        const [rows] = await conn.execute(
          "SELECT id FROM dumpsters WHERE size = ? AND status = 'yard' LIMIT 1",
          [event.size]
        );

        const available = (rows as Array<{ id: string }>)[0];
        if (available) {
          // Extract city from location
          const cityMatch = event.location.match(/,\s*([^,]+),\s*CA/i);
          const city = cityMatch ? cityMatch[1].trim() : "";

          await conn.execute(
            `UPDATE dumpsters SET 
              status = 'en-route',
              customer = ?,
              address = ?,
              city = ?,
              service_type = ?,
              delivery_date = ?,
              updated_at = NOW()
            WHERE id = ?`,
            [
              event.customerName,
              event.location,
              city,
              event.serviceType,
              new Date(event.date).toISOString().split("T")[0],
              available.id,
            ]
          );

          results.push({
            event: event.summary,
            dumpsterId: available.id,
            action: "assigned-delivery",
            status: `✅ ${available.id} → ${event.customerName} (${event.location})`,
          });
        } else {
          results.push({
            event: event.summary,
            dumpsterId: null,
            action: "no-available",
            status: `⚠️ No ${event.size}yd dumpsters available in yard`,
          });
        }
      } else if (event.action === "pickup") {
        // Find the deployed dumpster for this customer
        const [rows] = await conn.execute(
          "SELECT id FROM dumpsters WHERE customer LIKE ? AND size = ? AND status IN ('deployed', 'pickup-scheduled') LIMIT 1",
          [`%${event.customerName}%`, event.size]
        );

        const deployed = (rows as Array<{ id: string }>)[0];
        if (deployed) {
          await conn.execute(
            `UPDATE dumpsters SET 
              status = 'pickup-scheduled',
              pickup_date = ?,
              updated_at = NOW()
            WHERE id = ?`,
            [new Date(event.date).toISOString().split("T")[0], deployed.id]
          );

          results.push({
            event: event.summary,
            dumpsterId: deployed.id,
            action: "scheduled-pickup",
            status: `✅ ${deployed.id} pickup scheduled for ${event.customerName}`,
          });
        } else {
          results.push({
            event: event.summary,
            dumpsterId: null,
            action: "no-match",
            status: `⚠️ No deployed ${event.size}yd dumpster found for ${event.customerName}`,
          });
        }
      }
    }
  } catch (err) {
    console.error("DB error:", err);
  } finally {
    if (conn) await conn.end();
  }

  return results;
}

// GET: View today's calendar events + current assignments
export async function GET(req: NextRequest) {
  const auth = req.nextUrl.searchParams.get("auth");
  if (auth !== AUTH_CODE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const date = req.nextUrl.searchParams.get("date") || undefined;

  const token = await getCalendarAccessToken();
  if (!token) {
    return NextResponse.json({ error: "Failed to get calendar access token" }, { status: 500 });
  }

  const events = await getCalendarEvents(token, date);

  return NextResponse.json({
    date: date || new Date().toISOString().split("T")[0],
    events,
    count: events.length,
  });
}

// POST: Sync calendar events → auto-assign dumpsters
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("x-dashboard-auth");
  if (authHeader !== AUTH_CODE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const date = body.date || undefined;

  const token = await getCalendarAccessToken();
  if (!token) {
    return NextResponse.json({ error: "Failed to get calendar access token" }, { status: 500 });
  }

  const events = await getCalendarEvents(token, date);
  const results = await autoAssignDumpsters(events);

  return NextResponse.json({
    synced: true,
    date: date || new Date().toISOString().split("T")[0],
    events: events.length,
    results,
  });
}
