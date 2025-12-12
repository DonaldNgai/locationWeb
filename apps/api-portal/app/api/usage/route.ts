import { NextResponse } from 'next/server';
import { auth0 } from '@repo/next-utils/auth/getAuth0Client';

export async function GET() {
  try {
    const session = await auth0.getSession();
    if (!session?.user?.sub) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Fetch actual usage data from the API
    // For now, return placeholder data
    return NextResponse.json({
      requests: [],
      totalRequests: 0,
      averagePerDay: 0,
      peakDay: {
        date: new Date().toISOString(),
        count: 0,
      },
    });
  } catch (error) {
    console.error('Error fetching usage data:', error);
    return NextResponse.json({
      requests: [],
      totalRequests: 0,
      averagePerDay: 0,
      peakDay: {
        date: new Date().toISOString(),
        count: 0,
      },
    });
  }
}

