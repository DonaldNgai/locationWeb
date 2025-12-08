'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Code, Users, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SelectRolePage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleRoleSelection = async (userType: 'developer' | 'user') => {
    setLoading(userType);
    try {
      const response = await fetch('/api/user/role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userType }),
      });

      if (!response.ok) {
        throw new Error('Failed to set user role');
      }

      if (userType === 'developer') {
        router.push('/dashboard/developer/setup');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error setting user role:', error);
      setLoading(null);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome! Let's get you set up</h1>
          <p className="text-muted-foreground">
            Choose how you'll be using this location tracking system
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="cursor-pointer hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10 mb-4">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>I'm a Developer</CardTitle>
              <CardDescription>
                I want to integrate location tracking into my application. I need API keys and
                configuration settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => handleRoleSelection('developer')}
                disabled={loading !== null}
                className="w-full"
                size="lg"
              >
                {loading === 'developer' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  'Continue as Developer'
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10 mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>I'm a User</CardTitle>
              <CardDescription>
                I'll be sharing my location with developers. I need to manage my location sharing
                preferences and see who can access my location.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => handleRoleSelection('user')}
                disabled={loading !== null}
                className="w-full"
                size="lg"
                variant="outline"
              >
                {loading === 'user' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  'Continue as User'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

