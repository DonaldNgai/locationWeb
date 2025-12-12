import { NextResponse } from 'next/server';
import { auth0 } from '@repo/next-utils/auth/getAuth0Client';

export async function GET() {
  try {
    const session = await auth0.getSession();
    if (!session?.user?.sub) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Fetch actual stats from the API
    // For now, return placeholder data
    return NextResponse.json({
      totalKeys: 0,
      activeKeys: 0,
      totalRequests: 0,
      requestsToday: 0,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({
      totalKeys: 0,
      activeKeys: 0,
      totalRequests: 0,
      requestsToday: 0,
    });
  }
}

