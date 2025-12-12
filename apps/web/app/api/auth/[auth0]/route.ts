import { auth0 } from '@repo/next-utils/auth/getAuth0Client';

/**
 * Auth0 API route handler.
 * This handles all Auth0 authentication routes:
 * - /api/auth/login - Initiates login flow
 * - /api/auth/logout - Logs user out
 * - /api/auth/callback - OAuth callback
 * - /api/auth/me - Returns user profile
 */
export const GET = auth0.handleAuth();
