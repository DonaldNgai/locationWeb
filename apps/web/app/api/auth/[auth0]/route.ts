import { handleAuth } from '@auth0/nextjs-auth0';

/**
 * Auth0 API route handler.
 * This handles all Auth0 authentication routes:
 * - /api/auth/login - Initiates login flow
 * - /api/auth/logout - Logs user out
 * - /api/auth/callback - OAuth callback
 * - /api/auth/me - Returns user profile
 */
export const GET = handleAuth();
