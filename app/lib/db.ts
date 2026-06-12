/**
 * D1 database access helper.
 *
 * Cloudflare Pages + @cloudflare/next-on-pages exposes bindings via getRequestContext.
 * All routes that use this must set: export const runtime = 'edge'
 *
 * Binding name "DB" is configured in wrangler.toml.
 */
import { getRequestContext } from '@cloudflare/next-on-pages';

// D1Database type is provided by @cloudflare/workers-types
type D1Database = {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<D1ExecResult>;
};
type D1PreparedStatement = {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  all<T = unknown>(): Promise<D1Result<T>>;
  run(): Promise<D1Result>;
};
type D1Result<T = unknown> = {
  results?: T[];
  success: boolean;
  meta: { duration: number; rows_read?: number; rows_written?: number; last_row_id?: number; changes?: number };
};
type D1ExecResult = { count: number; duration: number };

export function getDB(): D1Database {
  const { env } = getRequestContext();
  const db = (env as unknown as { DB: D1Database }).DB;
  if (!db) {
    throw new Error('D1 binding "DB" not configured');
  }
  return db;
}

/** Booking row shape. Matches migrations/0001_bookings.sql */
export interface BookingRow {
  id: number;
  created_at: number;
  tier: 'wellness' | 'medical' | 'protocol' | 'service';
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  patient_dob: string | null;
  patient_state: string | null;
  service: string;
  amount_cents: number | null;
  goals: string | null;
  medical_history: string | null;
  current_medications: string | null;
  allergies: string | null;
  protocol_id: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  payment_status: 'pending' | 'invoice_sent' | 'paid' | 'cancelled' | 'refunded';
  invoice_url: string | null;
  helcim_transaction_id: string | null;
  notes: string | null;
  raw_payload: string | null;
}

export type NewBooking = Omit<BookingRow, 'id' | 'created_at' | 'payment_status'> & {
  payment_status?: BookingRow['payment_status'];
};

export async function insertBooking(b: NewBooking): Promise<number> {
  const db = getDB();
  const stmt = db
    .prepare(
      `INSERT INTO bookings
        (created_at, tier, patient_name, patient_email, patient_phone, patient_dob, patient_state,
         service, amount_cents, goals, medical_history, current_medications, allergies,
         protocol_id, preferred_date, preferred_time, payment_status, raw_payload)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      Date.now(),
      b.tier,
      b.patient_name,
      b.patient_email,
      b.patient_phone,
      b.patient_dob ?? null,
      b.patient_state ?? null,
      b.service,
      b.amount_cents ?? null,
      b.goals ?? null,
      b.medical_history ?? null,
      b.current_medications ?? null,
      b.allergies ?? null,
      b.protocol_id ?? null,
      b.preferred_date ?? null,
      b.preferred_time ?? null,
      b.payment_status ?? 'pending',
      b.raw_payload ?? null,
    );
  const result = await stmt.run();
  return Number(result.meta.last_row_id ?? 0);
}

export async function listBookings(opts: { limit?: number; status?: string } = {}): Promise<BookingRow[]> {
  const db = getDB();
  const limit = Math.min(opts.limit ?? 200, 500);
  let query = 'SELECT * FROM bookings';
  const params: unknown[] = [];
  if (opts.status) {
    query += ' WHERE payment_status = ?';
    params.push(opts.status);
  }
  query += ' ORDER BY created_at DESC LIMIT ?';
  params.push(limit);
  const result = await db
    .prepare(query)
    .bind(...params)
    .all<BookingRow>();
  return result.results ?? [];
}

export async function getBookingById(id: number): Promise<BookingRow | null> {
  const db = getDB();
  return db.prepare('SELECT * FROM bookings WHERE id = ?').bind(id).first<BookingRow>();
}

export async function updateBookingStatus(
  id: number,
  patch: Partial<Pick<BookingRow, 'payment_status' | 'invoice_url' | 'helcim_transaction_id' | 'notes' | 'amount_cents'>>,
): Promise<void> {
  const db = getDB();
  const fields: string[] = [];
  const values: unknown[] = [];
  for (const [key, value] of Object.entries(patch)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }
  if (fields.length === 0) return;
  values.push(id);
  await db
    .prepare(`UPDATE bookings SET ${fields.join(', ')} WHERE id = ?`)
    .bind(...values)
    .run();
}

export async function findPaidProtocolUnlock(email: string, protocolId: string): Promise<boolean> {
  const db = getDB();
  const row = await db
    .prepare(
      `SELECT 1 FROM bookings
       WHERE patient_email = ? AND protocol_id = ? AND payment_status = 'paid'
       LIMIT 1`,
    )
    .bind(email.toLowerCase().trim(), protocolId)
    .first();
  return !!row;
}
