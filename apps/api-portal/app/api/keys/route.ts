import { NextResponse } from 'next/server';
import { auth0 } from '@repo/next-utils/auth/getAuth0Client';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3333';

export async function GET() {
  try {
    const session = await auth0.getSession();
    if (!session?.user?.sub) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const accessToken = await auth0.getAccessToken();
    if (!accessToken) {
      return NextResponse.json({ error: 'Failed to get access token' }, { status: 401 });
    }

    // Get user's groups
    const groupsResponse = await fetch(`${API_BASE_URL}/groups`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!groupsResponse.ok) {
      return NextResponse.json({ items: [] });
    }

    const groupsData = await groupsResponse.json();
    const group = groupsData.items?.[0];

    if (!group) {
      return NextResponse.json({ items: [] });
    }

    // Get API keys for the group
    const keysResponse = await fetch(`${API_BASE_URL}/groups/${group.id}/api-keys`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!keysResponse.ok) {
      return NextResponse.json({ items: [] });
    }

    const keysData = await keysResponse.json();
    return NextResponse.json(keysData);
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth0.getSession();
    if (!session?.user?.sub) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const accessToken = await auth0.getAccessToken();
    if (!accessToken) {
      return NextResponse.json({ error: 'Failed to get access token' }, { status: 401 });
    }

    const body = await request.json();
    const { label } = body;

    // Get or create user's group
    let groupsResponse = await fetch(`${API_BASE_URL}/groups`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let group;
    if (groupsResponse.ok) {
      const groupsData = await groupsResponse.json();
      group = groupsData.items?.[0];
    }

    // Create group if it doesn't exist
    if (!group) {
      const createResponse = await fetch(`${API_BASE_URL}/groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: `${session.user.name || session.user.email}'s Group`,
          description: 'Default location tracking group',
        }),
      });

      if (createResponse.ok) {
        group = await createResponse.json();
      } else {
        throw new Error('Failed to create group');
      }
    }

    // Create API key
    const response = await fetch(`${API_BASE_URL}/groups/${group.id}/api-keys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ label: label || 'My API Key' }),
    });

    if (!response.ok) {
      throw new Error('Failed to create API key');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating API key:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

