import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '../../../lib/rateLimit';

export const runtime = 'edge';

const UNLOCK_SECRET = process.env.PROTOCOL_UNLOCK_SECRET;

export async function POST(req: NextRequest) {
  const limit = rateLimit(req, { max: 10, windowMs: 60_000, bucket: 'admin-unlock' });
  if (!limit.ok) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
    });
  }
  // Fail closed if env var is not configured. Never accept a literal fallback.
  if (!UNLOCK_SECRET) {
    return NextResponse.json(
      { error: 'Server misconfiguration: PROTOCOL_UNLOCK_SECRET not set' },
      { status: 503 }
    );
  }
  try {
    const { secret, protocolId, email, unlockToken } = await req.json();

    // Verify secret (constant-time would be ideal but Web Crypto in edge is overkill for this)
    if (secret !== UNLOCK_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid secret' },
        { status: 401 }
      );
    }

    // Validate protocol ID
    const validProtocols = ['cardiovascular', 'metabolic', 'hormone-optimization', 'longevity', 'surgical-preop'];
    if (!protocolId || !validProtocols.includes(protocolId)) {
      return NextResponse.json(
        { error: 'Invalid protocol ID' },
        { status: 400 }
      );
    }

    // Generate unlock link for manual email or return token
    const unlockLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://latom-wellness.pages.dev'}/protocols/${protocolId}?unlock=${unlockToken}`;

    return NextResponse.json(
      {
        success: true,
        message: `Protocol unlock generated for ${email}`,
        protocolId,
        email,
        unlockLink,
        unlockToken,
        instructions: `Send this link to the customer: ${unlockLink}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Protocol unlock error:', error);
    return NextResponse.json(
      { error: 'Failed to generate unlock' },
      { status: 500 }
    );
  }
}
