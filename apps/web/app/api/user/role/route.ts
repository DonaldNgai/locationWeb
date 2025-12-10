import { NextResponse } from 'next/server';
import { auth0 } from '@repo/api/auth/getAuth0Client';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { eq, and, isNull } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const session = await auth0.getSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userType } = await request.json();
    if (!userType || !['developer', 'user'].includes(userType)) {
      return NextResponse.json({ error: 'Invalid user type' }, { status: 400 });
    }

    const email = session.user.email;
    await db
      .update(users)
      .set({ userType, updatedAt: new Date() })
      .where(and(eq(users.email, email), isNull(users.deletedAt)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

