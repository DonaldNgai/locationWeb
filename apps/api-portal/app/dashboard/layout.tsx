'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Key, LayoutDashboard, BarChart3, User, Book, LogOut } from 'lucide-react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Location API
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/docs"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <Book className="h-4 w-4" />
                Docs
              </Link>
              <Link
                href="/api/auth/logout"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              <NavLink href="/dashboard" icon={LayoutDashboard}>
                Dashboard
              </NavLink>
              <NavLink href="/dashboard/keys" icon={Key}>
                API Keys
              </NavLink>
              <NavLink href="/dashboard/usage" icon={BarChart3}>
                Usage
              </NavLink>
              <NavLink href="/dashboard/account" icon={User}>
                Account
              </NavLink>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}

function NavLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <Icon className="h-5 w-5" />
      {children}
    </Link>
  );
}

