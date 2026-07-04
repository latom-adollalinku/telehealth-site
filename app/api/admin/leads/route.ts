/**
 * GET /api/admin/leads
 *
 * Auth-gated list of captured leads from the D1 leads table (written by
 * /api/leads/capture). Newest first.
 *
 * Query params:
 *   ?limit=200 (default 200, max 1000)
 *
 * Response: { leads: LeadRow[], count: number }
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
    req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (provided !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

interface LeadRow {
  id: number;
  created_at: string;
  name: string | null;
  email: string;
  phone: string | null;
  interest: string | null;
  page: string | null;
  source: string | null;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const authError = requireAdmin(req);
  if (authError) return authError;

  const limitParam = Number(new URL(req.url).searchParams.get('limit') ?? '200');
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 1000) : 200;

  try {
    const db = getDB();
    // Table may not exist until the first lead is captured.
    await db
      .prepare(
        `CREATE TABLE IF NOT EXISTS leads (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           created_at TEXT NOT NULL,
           name TEXT,
           email TEXT NOT NULL,
           phone TEXT,
           interest TEXT,
           page TEXT,
           source TEXT
         )`,
      )
      .run();

    const result = await db
      .prepare('SELECT * FROM leads ORDER BY id DESC LIMIT ?')
      .bind(limit)
      .all<LeadRow>();

    const leads = result.results ?? [];
    return NextResponse.json({ leads, count: leads.length });
  } catch (err) {
    console.error('[admin/leads] query failed:', err);
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }
}
