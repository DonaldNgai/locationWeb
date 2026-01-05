import { Auth0Client } from '@auth0/nextjs-auth0/server';

export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  secret: process.env.AUTH0_SECRET!,
  authorizationParameters: {
    audience: process.env.AUTH0_AUDIENCE,
    // The scope of the access request, expressed as a list of space-delimited, case-sensitive strings.
    // Defaults to "openid profile email offline_access".
    scope: "openid profile email offline_access",
  }
});