'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { User, Mail, Calendar } from 'lucide-react';

export default function AccountPage() {
  const { user } = useUser();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Account</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account settings</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{user?.name || 'User'}</h2>
              <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                <div className="font-medium">{user?.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Name</div>
                <div className="font-medium">{user?.name || 'Not set'}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Member Since</div>
                <div className="font-medium">
                  {user?.updated_at
                    ? new Date(user.updated_at).toLocaleDateString()
                    : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

