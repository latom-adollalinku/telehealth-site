/**
 * GET /api/admin/list-bookings
 *
 * Auth-gated endpoint that returns recent D1 bookings.
 *
 * Query params:
 *   ?status=pending  — filter by payment_status (optional)
 *   ?limit=100       — default 100, max 500 (optional)
 *
 * Response: { bookings: BookingRow[], count: number }
 *
 * Env:
 *   ADMIN_SECRET_TOKEN — required
 */

import { NextRequest, NextResponse } from 'next/server';
import { listBookings, BookingRow } from '../../../lib/db';

export const runtime = 'edge';

function requireAdmin(req: NextRequest): NextResponse | null {
  const expected = process.env.ADMIN_SECRET_TOKEN;
  if (!expected) {
    return NextResponse.json(
      { error: 'Server misconfiguration: ADMIN_SECRET_TOKEN not set' },
      { status: 503 },
    );
  }
  const provided =
    req.headers.get('x-admin-token') ||
    req.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ||
    new URL(req.url).searchParams.get('token');
  if (provided !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const authError = requireAdmin(req);
  if (authError) return authError;

  const { searchParams } = new URL(req.url);

  const status = searchParams.get('status') ?? undefined;
  const limitParam = Number(searchParams.get('limit') ?? '100');
  const limit = Number.isFinite(limitParam) && limitParam > 0
    ? Math.min(limitParam, 500)
    : 100;

  try {
    const bookings: BookingRow[] = await listBookings({ status, limit });
    return NextResponse.json({ bookings, count: bookings.length }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
