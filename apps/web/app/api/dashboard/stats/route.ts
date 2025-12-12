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

    // Get groups for the user
    const groupsResponse = await fetch(`${API_BASE_URL}/groups`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!groupsResponse.ok) {
      return NextResponse.json({
        totalDevices: 0,
        activeDevices: 0,
        totalUpdates: 0,
        lastUpdate: null,
      });
    }

    const groupsData = await groupsResponse.json();
    const group = groupsData.items?.[0];

    if (!group) {
      return NextResponse.json({
        totalDevices: 0,
        activeDevices: 0,
        totalUpdates: 0,
        lastUpdate: null,
      });
    }

    // Get locations for the group (you'd need to add this endpoint to the API)
    // For now, return placeholder data
    return NextResponse.json({
      totalDevices: 0,
      activeDevices: 0,
      totalUpdates: 0,
      lastUpdate: null,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({
      totalDevices: 0,
      activeDevices: 0,
      totalUpdates: 0,
      lastUpdate: null,
    });
  }
}

