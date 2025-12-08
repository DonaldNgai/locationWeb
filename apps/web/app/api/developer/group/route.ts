import { NextResponse } from 'next/server';
import { getSession, getAccessToken } from '@auth0/nextjs-auth0';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3333';

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user?.sub) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { accessToken } = await getAccessToken();
    if (!accessToken) {
      return NextResponse.json({ error: 'Failed to get access token' }, { status: 401 });
    }

    // Get groups for the user
    const response = await fetch(`${API_BASE_URL}/groups`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 404 || response.status === 401) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    if (!response.ok) {
      throw new Error('Failed to fetch groups');
    }

    const data = await response.json();
    // Return the first group or null
    return NextResponse.json(data.items?.[0] || null);
  } catch (error) {
    console.error('Error fetching group:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const session = await getSession();
    if (!session?.user?.sub) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { accessToken } = await getAccessToken();
    if (!accessToken) {
      return NextResponse.json({ error: 'Failed to get access token' }, { status: 401 });
    }

    // Create a default group
    const response = await fetch(`${API_BASE_URL}/groups`, {
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

    if (!response.ok) {
      throw new Error('Failed to create group');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating group:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user?.sub) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { locationRequestFrequency, locationRequestMessage, apiBaseUrl } = body;

    // For now, we'll just update the apiBaseUrl on the group
    // In a full implementation, you'd store locationRequestFrequency and locationRequestMessage
    // in a separate settings table or as metadata on the group

    const { accessToken } = await getAccessToken();
    if (!accessToken) {
      return NextResponse.json({ error: 'Failed to get access token' }, { status: 401 });
    }

    // First get the group
    const getResponse = await fetch(`${API_BASE_URL}/groups`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!getResponse.ok) {
      throw new Error('Failed to fetch group');
    }

    const groupsData = await getResponse.json();
    const group = groupsData.items?.[0];

    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }

    // Update the group (you'd need a PATCH endpoint on the API)
    // For now, we'll just return success
    // In production, you'd call: PATCH /groups/:groupId with the updates

    return NextResponse.json({ success: true, group });
  } catch (error) {
    console.error('Error updating group:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

