/**
 * Auth0 Helper Components
 *
 * These components provide easy-to-use buttons for Auth0 authentication flows.
 * Use these instead of the deprecated custom auth actions.
 */

'use client';

import { Button } from '@/components/ui/button';
import { LogIn, LogOut, UserPlus } from 'lucide-react';

interface AuthButtonProps {
  className?: string;
  returnTo?: string;
}

/**
 * Login button that redirects to Auth0 login page
 */
export function LoginButton({ className, returnTo = '/dashboard' }: AuthButtonProps) {
  const handleLogin = () => {
    window.location.href = `/api/auth/login?returnTo=${encodeURIComponent(returnTo)}`;
  };

  return (
    <Button onClick={handleLogin} className={className}>
      <LogIn className="mr-2 h-4 w-4" />
      Sign In
    </Button>
  );
}

/**
 * Signup button that redirects to Auth0 signup page
 */
export function SignupButton({ className, returnTo = '/dashboard' }: AuthButtonProps) {
  const handleSignup = () => {
    window.location.href = `/api/auth/login?screen_hint=signup&returnTo=${encodeURIComponent(returnTo)}`;
  };

  return (
    <Button onClick={handleSignup} className={className}>
      <UserPlus className="mr-2 h-4 w-4" />
      Sign Up
    </Button>
  );
}

/**
 * Logout button that signs user out via Auth0
 */
export function LogoutButton({ className }: { className?: string }) {
  const handleLogout = () => {
    window.location.href = '/api/auth/logout';
  };

  return (
    <Button onClick={handleLogout} variant="ghost" className={className}>
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  );
}
