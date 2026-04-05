import { NextRequest, NextResponse } from "next/server";
import { sendWhatsApp } from "@/lib/twilio";
import { getCalendarEvents } from "@/lib/calendar";

const AUTH_CODE = process.env.DASHBOARD_PASSWORD || "";

// Notify numbers — team members who receive daily reminders
const NOTIFY_NUMBERS = [
  "+527717948624",  // Cristofer
  "+15102536230",   // Driver
  "+522225238131",  // Asai
];

// GET /api/reminders?auth=<DASHBOARD_PASSWORD> — sends WhatsApp with tomorrow's calendar events
export async function GET(req: NextRequest) {
  const auth = req.nextUrl.searchParams.get("auth");
  if (auth !== AUTH_CODE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get tomorrow's date range in Pacific Time
    const now = new Date();
    const pacific = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
    const tomorrow = new Date(pacific);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    // Start and end of tomorrow in Pacific Time
    const timeMin = `${tomorrowStr}T00:00:00-07:00`;
    const timeMax = `${tomorrowStr}T23:59:59-07:00`;

    // Fetch calendar events
    const events = await getCalendarEvents(timeMin, timeMax);

    if (!events || events.length === 0) {
      return NextResponse.json({
        date: tomorrowStr,
        message: "No services scheduled for tomorrow",
        eventCount: 0,
      });
    }

    // Separate deliveries and pickups
    const deliveries: any[] = [];
    const pickups: any[] = [];

    for (const event of events) {
      const summary = event.summary || "";
      const location = event.location || "";
      const start = event.start?.dateTime || event.start?.date || "";

      if (summary.toLowerCase().includes("delivery")) {
        deliveries.push({ summary, location, start });
      } else if (summary.toLowerCase().includes("pickup")) {
        pickups.push({ summary, location, start });
      } else {
        // Default to delivery if unclear
        deliveries.push({ summary, location, start });
      }
    }

    // Format the WhatsApp message
    const dateFormatted = new Date(tomorrowStr + "T12:00:00").toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric", year: "numeric",
    });

    let message = `🚛 *TP Dumpsters — Tomorrow's Services*\n`;
    message += `📅 ${dateFormatted}\n\n`;

    if (deliveries.length > 0) {
      message += `📦 *DELIVERIES (${deliveries.length}):*\n`;
      for (const d of deliveries) {
        const time = d.start ? new Date(d.start).toLocaleTimeString("en-US", {
          hour: "numeric", minute: "2-digit", timeZone: "America/Los_Angeles",
        }) : "TBD";
        message += `  • ${d.summary}\n`;
        if (d.location) {
          message += `    📍 ${d.location}\n`;
          // Add Google Maps link
          const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(d.location)}`;
          message += `    🗺️ ${mapsUrl}\n`;
        }
        message += `    ⏰ ${time}\n\n`;
      }
    }

    if (pickups.length > 0) {
      message += `🔄 *PICKUPS (${pickups.length}):*\n`;
      for (const p of pickups) {
        message += `  • ${p.summary}\n`;
        if (p.location) {
          message += `    📍 ${p.location}\n`;
          const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(p.location)}`;
          message += `    🗺️ ${mapsUrl}\n`;
        }
        message += `\n`;
      }
    }

    message += `Total: ${deliveries.length} deliveries, ${pickups.length} pickups\n`;
    message += `— TP Dumpsters 🚛`;

    // Also send Spanish version
    let mensajeES = `🚛 *TP Dumpsters — Servicios del día*\n`;
    mensajeES += `📅 ${dateFormatted}\n\n`;

    if (deliveries.length > 0) {
      mensajeES += `📦 *ENTREGAS (${deliveries.length}):*\n`;
      for (const d of deliveries) {
        const time = d.start ? new Date(d.start).toLocaleTimeString("en-US", {
          hour: "numeric", minute: "2-digit", timeZone: "America/Los_Angeles",
        }) : "Por definir";
        mensajeES += `  • ${d.summary}\n`;
        if (d.location) {
          mensajeES += `    📍 ${d.location}\n`;
          const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(d.location)}`;
          mensajeES += `    🗺️ ${mapsUrl}\n`;
        }
        mensajeES += `    ⏰ ${time}\n\n`;
      }
    }

    if (pickups.length > 0) {
      mensajeES += `🔄 *RECOLECCIONES (${pickups.length}):*\n`;
      for (const p of pickups) {
        mensajeES += `  • ${p.summary}\n`;
        if (p.location) {
          mensajeES += `    📍 ${p.location}\n`;
          const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(p.location)}`;
          mensajeES += `    🗺️ ${mapsUrl}\n`;
        }
        mensajeES += `\n`;
      }
    }

    mensajeES += `Total: ${deliveries.length} entregas, ${pickups.length} recolecciones\n`;
    mensajeES += `— TP Dumpsters 🚛`;

    // Send to all notify numbers (English version)
    const results: any[] = [];
    for (const phone of NOTIFY_NUMBERS) {
      const result = await sendWhatsApp(phone, message);
      results.push({ phone, ...result });
    }

    return NextResponse.json({
      date: tomorrowStr,
      deliveries: deliveries.length,
      pickups: pickups.length,
      totalEvents: events.length,
      results,
      message: mensajeES,
    });
  } catch (err) {
    console.error("Reminder error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
