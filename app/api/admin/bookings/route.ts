/**
 * GET /api/admin/bookings
 *
 * Fetches bookings from Cal.com API v2 and returns a normalized shape
 * suitable for the admin dashboard.
 *
 * Docs: https://cal.com/docs/api-reference/v2
 *
 * Env:
 *   CAL_COM_API_KEY — personal API key (cal_live_...)
 *
 * Response shape:
 *   { bookings: AdminBooking[], fetchedAt: string, error?: string }
 */

import { NextResponse } from 'next/server';

export const runtime = 'edge';
// Revalidate every 60s when this route is called through a fetch with { next: { revalidate: 60 } }.
export const revalidate = 60;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AdminBooking {
  bookingId: string;
  uid: string;
  date: string;          // YYYY-MM-DD
  time: string;          // HH:MM (local-ish, from ISO)
  startTime: string;     // ISO
  endTime: string;       // ISO
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
  service: string;       // event type title
  eventTypeSlug: string;
  status: string;        // accepted, pending, cancelled, rejected
  paymentStatus: 'paid' | 'pending';
}

interface CalV2Attendee {
  name?: string;
  email?: string;
  phoneNumber?: string;
  timeZone?: string;
}

interface CalV2BookingFieldResponses {
  [key: string]: unknown;
  name?: string | { firstName?: string; lastName?: string };
  email?: string;
  phone?: string;
  attendeePhoneNumber?: string;
}

interface CalV2Booking {
  id?: number;
  uid?: string;
  title?: string;
  status?: string;
  start?: string;
  end?: string;
  eventType?: { id?: number; slug?: string; title?: string };
  eventTypeId?: number;
  attendees?: CalV2Attendee[];
  bookingFieldsResponses?: CalV2BookingFieldResponses;
  responses?: CalV2BookingFieldResponses;
  paid?: boolean;
  payment?: Array<{ success?: boolean; paymentOption?: string }> | { success?: boolean };
  metadata?: Record<string, unknown>;
}

interface CalV2ListResponse {
  status?: string;
  data?: CalV2Booking[];
  error?: { message?: string };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const EVENT_TYPE_SLUG = 'consultation';
const EVENT_TYPE_FULL = 'latom-wellness/consultation';

function splitDateTime(iso: string | undefined): { date: string; time: string } {
  if (!iso) return { date: '', time: '' };
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { date: '', time: '' };
  const date = d.toISOString().split('T')[0];
  // HH:MM in UTC — simple and consistent; the UI can reformat if needed.
  const time = d.toISOString().split('T')[1].slice(0, 5);
  return { date, time };
}

function extractPhone(b: CalV2Booking): string {
  const fromAttendee = b.attendees?.[0]?.phoneNumber;
  if (fromAttendee) return fromAttendee;

  const responses = b.bookingFieldsResponses ?? b.responses;
  if (!responses) return '';
  const phone =
    (responses.attendeePhoneNumber as string | undefined) ??
    (responses.phone as string | undefined) ??
    '';
  return typeof phone === 'string' ? phone : '';
}

function extractName(b: CalV2Booking): string {
  const first = b.attendees?.[0]?.name;
  if (first) return first;
  const responses = b.bookingFieldsResponses ?? b.responses;
  const raw = responses?.name;
  if (typeof raw === 'string') return raw;
  if (raw && typeof raw === 'object') {
    const { firstName = '', lastName = '' } = raw;
    return `${firstName} ${lastName}`.trim();
  }
  return 'Unknown';
}

function extractEmail(b: CalV2Booking): string {
  const first = b.attendees?.[0]?.email;
  if (first) return first;
  const responses = b.bookingFieldsResponses ?? b.responses;
  const raw = responses?.email;
  return typeof raw === 'string' ? raw : '';
}

function extractPaymentStatus(b: CalV2Booking): 'paid' | 'pending' {
  if (b.paid === true) return 'paid';
  if (Array.isArray(b.payment)) {
    if (b.payment.some(p => p?.success)) return 'paid';
  } else if (b.payment && typeof b.payment === 'object') {
    if ((b.payment as { success?: boolean }).success) return 'paid';
  }
  return 'pending';
}

function matchesEventType(b: CalV2Booking): boolean {
  const slug = b.eventType?.slug ?? '';
  if (!slug) return true; // if we can't tell, don't drop it — better UX than empty list
  return slug === EVENT_TYPE_SLUG || slug === EVENT_TYPE_FULL;
}

function normalizeBooking(b: CalV2Booking): AdminBooking {
  const { date, time } = splitDateTime(b.start);
  return {
    bookingId: String(b.id ?? b.uid ?? ''),
    uid: b.uid ?? String(b.id ?? ''),
    date,
    time,
    startTime: b.start ?? '',
    endTime: b.end ?? '',
    attendeeName: extractName(b),
    attendeeEmail: extractEmail(b),
    attendeePhone: extractPhone(b),
    service: b.eventType?.title ?? b.title ?? 'Consultation',
    eventTypeSlug: b.eventType?.slug ?? '',
    status: b.status ?? 'unknown',
    paymentStatus: extractPaymentStatus(b),
  };
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function GET() {
  const apiKey = process.env.CAL_COM_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { bookings: [], fetchedAt: new Date().toISOString(), error: 'CAL_COM_API_KEY not configured' },
      { status: 503 },
    );
  }

  try {
    // Cal.com API v2 — list bookings endpoint.
    // Docs: https://cal.com/docs/api-reference/v2/bookings/get-all-bookings
    const res = await fetch('https://api.cal.com/v2/bookings?take=100', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'cal-api-version': '2024-08-13',
        'Content-Type': 'application/json',
      },
      // ISR-style revalidation on the Next fetch cache.
      next: { revalidate: 60, tags: ['cal-bookings'] },
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        {
          bookings: [],
          fetchedAt: new Date().toISOString(),
          error: `Cal.com API returned ${res.status}: ${errText.slice(0, 200)}`,
        },
        { status: 502 },
      );
    }

    const data = (await res.json()) as CalV2ListResponse;
    const raw = data.data ?? [];
    const bookings = raw
      .filter(matchesEventType)
      .map(normalizeBooking)
      // newest first
      .sort((a, b) => (a.startTime < b.startTime ? 1 : -1));

    return NextResponse.json(
      { bookings, fetchedAt: new Date().toISOString() },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { bookings: [], fetchedAt: new Date().toISOString(), error: message },
      { status: 500 },
    );
  }
}
