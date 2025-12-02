import { initAuth0 } from '@auth0/nextjs-auth0';

/**
 * Auth0 configuration for the application.
 * This replaces the custom JWT-based authentication.
 */
export const auth0 = initAuth0({
  // These values are pulled from environment variables
  secret: process.env.AUTH0_SECRET!,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL!,
  baseURL: process.env.AUTH0_BASE_URL!,
  clientID: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,

  // Session configuration
  session: {
    rollingDuration: 60 * 60 * 24, // 24 hours
    absoluteDuration: 60 * 60 * 24 * 7, // 7 days
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  },

  // Routes configuration
  routes: {
    callback: '/api/auth/callback',
    postLogoutRedirect: '/',
  },
});

// Export commonly used methods for convenience
export const getSession = auth0.getSession;
export const getAccessToken = auth0.getAccessToken;
export const withApiAuthRequired = auth0.withApiAuthRequired;
export const withPageAuthRequired = auth0.withPageAuthRequired;
