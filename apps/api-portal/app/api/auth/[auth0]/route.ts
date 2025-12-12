import { auth0 } from '@repo/next-utils/auth/getAuth0Client';

export const GET = auth0.handleAuth();

