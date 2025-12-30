import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Auth0Client } from '@auth0/nextjs-auth0/server';

// Create Auth0Client instance directly in proxy
// Proxy has restrictions on imports, so we create it here instead of importing
const auth0 = new Auth0Client();

export async function proxy(request: NextRequest) {
  const authRes = await auth0.middleware(request);

  if (request.nextUrl.pathname.startsWith("/auth")) {
    return authRes;
  }

  const session = await auth0.getSession();  // <----  Do not pass the request and let the package handle getting the cookies

  if (!session) {
    // user is not authenticated, redirect to login page
    return NextResponse.redirect(
      new URL("/auth/login", request.nextUrl.origin)
    );
  }

  // the headers from the auth middleware should always be returned
  return authRes;
}
