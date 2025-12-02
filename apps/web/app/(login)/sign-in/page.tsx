'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { Globe, Loader2 } from 'lucide-react';

import { APP_CONFIG } from '@/config/app-config';
import { Button } from '@/components/ui/button';

export default function SignIn() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');

  useEffect(() => {
    // Build Auth0 login URL with return parameters
    const params = new URLSearchParams();
    if (redirect) params.set('redirect', redirect);
    if (priceId) params.set('priceId', priceId);

    const returnTo = params.toString() ? `/dashboard?${params.toString()}` : '/dashboard';
    const loginUrl = `/api/auth/login?returnTo=${encodeURIComponent(returnTo)}`;

    // Redirect to Auth0 login
    window.location.href = loginUrl;
  }, [redirect, priceId]);

  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px]">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-medium">Redirecting to Login...</h1>
          <p className="text-muted-foreground text-sm">
            Please wait while we redirect you to the login page.
          </p>
        </div>
        <div className="flex justify-center">
          <Loader2 className="animate-spin h-8 w-8" />
        </div>
      </div>

      <div className="absolute top-5 flex w-full justify-end px-10">
        <div className="text-muted-foreground text-sm">
          Don&apos;t have an account?{' '}
          <Link className="text-foreground" href="sign-up">
            Register
          </Link>
        </div>
      </div>

      <div className="absolute bottom-5 flex w-full justify-between px-10">
        <div className="text-sm">{APP_CONFIG.copyright}</div>
        <div className="flex items-center gap-1 text-sm">
          <Globe className="text-muted-foreground size-4" />
          ENG
        </div>
      </div>
    </>
  );
}
