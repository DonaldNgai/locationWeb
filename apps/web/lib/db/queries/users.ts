import { auth0 } from '@repo/next-utils/auth/getAuth0Client';
import { db } from '../drizzle';
import { users, teamMembers } from '../schema';
import { eq, and, isNull } from 'drizzle-orm';

/**
 * Get the current authenticated user from Auth0 session.
 * Maps Auth0 user to database user by email.
 */
export async function getUser() {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    return null;
  }

  // Auth0 user object contains email
  const email = session.user.email;
  if (!email) {
    return null;
  }

  // Find user in database by email from Auth0
  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email), isNull(users.deletedAt)))
    .limit(1);

  if (user.length === 0) {
    return null;
  }

  return user[0];
}

export async function getUserWithTeam(userId: number) {
  const result = await db
    .select({
      user: users,
      teamId: teamMembers.teamId,
    })
    .from(users)
    .leftJoin(teamMembers, eq(users.id, teamMembers.userId))
    .where(eq(users.id, userId))
    .limit(1);

  return result[0];
}
