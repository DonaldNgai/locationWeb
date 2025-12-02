import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';

const protectedRoutes = '/dashboard';

/**
 * Middleware to protect routes using Auth0 authentication.
 * Redirects unauthenticated users to the Auth0 login page.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = pathname.startsWith(protectedRoutes);

  // For protected routes, check if user is authenticated
  if (isProtectedRoute) {
    const session = await getSession(request, NextResponse.next());

    if (!session || !session.user) {
      // Redirect to Auth0 login with return URL
      const loginUrl = new URL('/api/auth/login', request.url);
      loginUrl.searchParams.set('returnTo', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  runtime: 'nodejs',
};
