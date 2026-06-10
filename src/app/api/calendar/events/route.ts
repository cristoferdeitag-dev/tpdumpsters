import { NextRequest, NextResponse } from 'next/server';
import { getDashboardPassword } from "@/lib/auth";
import { getCalendarEvents } from '@/lib/calendar';

// Read-only feed of Google Calendar events for the Dumpsterin app's Schedule
// screen. The TP service account already has access to tppaver@gmail.com —
// we just shape the events into a simple JSON the client can render.
//
// CORS is open to dumpsterin.com so the SPA bundle can call from the browser.
//
// SECURITY: this endpoint is publicly reachable (CORS does NOT stop a direct
// curl). The raw Google Calendar event descriptions contain customer PII —
// phone, email, full street address, dollar amounts. By default we REDACT that
// PII so an anonymous caller only sees the operational shape (type/size/window)
// the Schedule UI needs. A trusted caller that passes the dashboard token
// (`?auth=`, `Authorization: Bearer`, or that secret) gets the full detail.

const DASHBOARD_PASSWORD = getDashboardPassword();

function isTrusted(req: NextRequest): boolean {
  if (!DASHBOARD_PASSWORD) return false;
  const fromQuery = req.nextUrl.searchParams.get('auth') || '';
  const header = req.headers.get('authorization') || '';
  const fromHeader = header.toLowerCase().startsWith('bearer ') ? header.slice(7).trim() : '';
  return fromQuery === DASHBOARD_PASSWORD || fromHeader === DASHBOARD_PASSWORD;
}

// Strip PII lines from a Google Calendar event description, keeping only the
// non-sensitive operational lines (Booking ID, Service, Delivery Window, size).
function redactDescription(description: string): string {
  if (!description) return '';
  const SENSITIVE = /^(phone|email|e-mail|address|delivery address|billing address|total|amount|price|card|name|customer)\s*:/i;
  return description
    .split('\n')
    .filter((line) => !SENSITIVE.test(line.trim()))
    .join('\n');
}

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

  const trusted = isTrusted(req);

  try {
    const raw = await getCalendarEvents(timeMin, timeMax);
    const events = raw.map((ev: any) => ({
      id: ev.id,
      summary: ev.summary || '',
      description: trusted ? (ev.description || '') : redactDescription(ev.description || ''),
      // location is the customer's street address — PII. Only for trusted callers.
      location: trusted ? (ev.location || '') : '',
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
