import { NextRequest, NextResponse } from 'next/server';
import { getCalendarEvents } from '@/lib/calendar';

// Read-only feed of Google Calendar events for the Dumpsterin app's Schedule
// screen. The TP service account already has access to tppaver@gmail.com —
// we just shape the events into a simple JSON the client can render.
//
// CORS is open to dumpsterin.com so the SPA bundle can call from the browser.
// No payment data, just event titles/times/locations the staff already see in
// Google Calendar.

const ALLOWED_ORIGINS = new Set([
  'https://dumpsterin.com',
  'https://www.dumpsterin.com',
  'http://localhost:8081',
  'http://localhost:19006',
]);

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.has(origin) ? origin : 'https://dumpsterin.com';
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'public, max-age=60, stale-while-revalidate=30',
  };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req.headers.get('origin')) });
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  const headers = corsHeaders(origin);

  const url = new URL(req.url);
  const from = url.searchParams.get('from');
  const to = url.searchParams.get('to');

  // Default to a 6-week window centered on today so a missing range still
  // returns something useful for the calendar UI.
  const now = new Date();
  const defaultFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14);
  const defaultTo = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 28);

  const timeMin = from ? new Date(from).toISOString() : defaultFrom.toISOString();
  const timeMax = to ? new Date(to).toISOString() : defaultTo.toISOString();

  try {
    const raw = await getCalendarEvents(timeMin, timeMax);
    const events = raw.map((ev: any) => ({
      id: ev.id,
      summary: ev.summary || '',
      description: ev.description || '',
      location: ev.location || '',
      // Google returns dateTime for timed events, date for all-day events.
      start: ev.start?.dateTime || ev.start?.date || null,
      end: ev.end?.dateTime || ev.end?.date || null,
      allDay: !ev.start?.dateTime, // truthy if it's a date-only event
      colorId: ev.colorId || null,
      htmlLink: ev.htmlLink || null,
      status: ev.status || 'confirmed',
    })).filter((e) => e.start);

    return NextResponse.json({ events, count: events.length, timeMin, timeMax }, { headers });
  } catch (e: any) {
    return NextResponse.json(
      { error: 'Failed to fetch calendar events', detail: e?.message },
      { status: 500, headers }
    );
  }
}
