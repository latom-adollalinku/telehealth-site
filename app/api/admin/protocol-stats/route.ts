/**
 * GET /api/admin/protocol-stats
 *
 * Auth-gated aggregate of protocol purchases/unlocks from D1 bookings
 * (tier = 'protocol'), grouped by protocol_id.
 *
 * Response: { stats: Array<{ protocol_id, total, paid, pending, revenue_cents, last_purchase_at }> }
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '../../../lib/db';

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

interface StatRow {
  protocol_id: string;
  total: number;
  paid: number;
  pending: number;
  revenue_cents: number;
  last_purchase_at: number | null;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    const db = getDB();
    const result = await db
      .prepare(
        `SELECT
           protocol_id,
           COUNT(*) AS total,
           SUM(CASE WHEN payment_status = 'paid' THEN 1 ELSE 0 END) AS paid,
           SUM(CASE WHEN payment_status IN ('pending', 'invoice_sent') THEN 1 ELSE 0 END) AS pending,
           SUM(CASE WHEN payment_status = 'paid' THEN COALESCE(amount_cents, 0) ELSE 0 END) AS revenue_cents,
           MAX(created_at) AS last_purchase_at
         FROM bookings
         WHERE tier = 'protocol' AND protocol_id IS NOT NULL
         GROUP BY protocol_id
         ORDER BY total DESC`,
      )
      .all<StatRow>();

    return NextResponse.json({ stats: result.results ?? [] });
  } catch (err) {
    console.error('[admin/protocol-stats] query failed:', err);
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }
}
