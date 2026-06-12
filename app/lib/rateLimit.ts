/**
 * In-memory sliding-window rate limiter for Cloudflare Workers (edge runtime).
 *
 * Note: each CF isolate has its own Map, so this limits per-isolate, not globally.
 * This is sufficient to slow down attackers without requiring KV or Durable Objects.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// One Map per named bucket, allocated lazily at module scope.
const buckets = new Map<string, Map<string, RateLimitEntry>>();

function getBucket(bucket: string): Map<string, RateLimitEntry> {
  let b = buckets.get(bucket);
  if (!b) {
    b = new Map<string, RateLimitEntry>();
    buckets.set(bucket, b);
  }
  return b;
}

function getIP(request: Request): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

interface RateLimitOptions {
  max: number;
  windowMs: number;
  bucket: string;
}

interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(
  request: Request,
  options: RateLimitOptions,
): RateLimitResult {
  const { max, windowMs, bucket } = options;
  const ip = getIP(request);
  const now = Date.now();
  const store = getBucket(bucket);

  const entry = store.get(ip);

  if (!entry || now >= entry.resetAt) {
    // New window
    const resetAt = now + windowMs;
    store.set(ip, { count: 1, resetAt });
    return { ok: true, remaining: max - 1, resetAt };
  }

  entry.count += 1;

  if (entry.count > max) {
    return { ok: false, remaining: 0, resetAt: entry.resetAt };
  }

  return { ok: true, remaining: max - entry.count, resetAt: entry.resetAt };
}
