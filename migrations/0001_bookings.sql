-- LATOM Wellness bookings table.
-- Captures every submission from /book/wellness, /book/medical, and /pay (protocol unlocks + paid services).

CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at INTEGER NOT NULL,                  -- unix ms timestamp
  tier TEXT NOT NULL,                            -- 'wellness' | 'medical' | 'protocol' | 'service'
  patient_name TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_dob TEXT,
  patient_state TEXT,
  service TEXT NOT NULL,
  amount_cents INTEGER,                          -- price in cents (e.g., 4900 for $49). null until known.
  goals TEXT,
  medical_history TEXT,
  current_medications TEXT,
  allergies TEXT,
  protocol_id TEXT,                              -- for /pay?protocol=cognitive style flows
  preferred_date TEXT,
  preferred_time TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'invoice_sent' | 'paid' | 'cancelled' | 'refunded'
  invoice_url TEXT,                              -- helcim hosted invoice URL once sent
  helcim_transaction_id TEXT,                    -- helcim txn id when paid via Pay.js
  notes TEXT,                                    -- free-form admin notes
  raw_payload TEXT                               -- JSON of original submission for audit
);

CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(patient_email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_tier ON bookings(tier);
