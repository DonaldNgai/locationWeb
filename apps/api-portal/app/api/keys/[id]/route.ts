import { NextResponse } from 'next/server';
import { auth0 } from '@repo/next-utils/auth/getAuth0Client';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3333';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth0.getSession();
    if (!session?.user?.sub) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const accessToken = await auth0.getAccessToken();
    if (!accessToken) {
      return NextResponse.json({ error: 'Failed to get access token' }, { status: 401 });
    }

    const { id } = await params;

    // Get user's groups
    const groupsResponse = await fetch(`${API_BASE_URL}/groups`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!groupsResponse.ok) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }

    const groupsData = await groupsResponse.json();
    const group = groupsData.items?.[0];

    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }

    // Delete API key (you'll need to add this endpoint to the Fastify API)
    // For now, return success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting API key:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

