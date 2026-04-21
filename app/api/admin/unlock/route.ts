import { NextRequest, NextResponse } from 'next/server';

const UNLOCK_SECRET = process.env.PROTOCOL_UNLOCK_SECRET || 'default-secret-change-in-env';

export async function POST(req: NextRequest) {
  try {
    const { secret, protocolId, email, unlockToken } = await req.json();

    // Verify secret
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
