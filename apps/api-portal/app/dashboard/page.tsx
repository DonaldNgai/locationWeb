'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { Key, Activity, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';

interface Stats {
  totalKeys: number;
  activeKeys: number;
  totalRequests: number;
  requestsToday: number;
}

export default function DashboardPage() {
  const { user } = useUser();
  const [stats, setStats] = useState<Stats>({
    totalKeys: 0,
    activeKeys: 0,
    totalRequests: 0,
    requestsToday: 0,
  });

  useEffect(() => {
    // Fetch dashboard stats
    fetch('/api/dashboard/stats')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {user?.name || user?.email}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total API Keys"
          value={stats.totalKeys}
          icon={Key}
          description="All time"
        />
        <StatCard
          title="Active Keys"
          value={stats.activeKeys}
          icon={Activity}
          description="Last 30 days"
        />
        <StatCard
          title="Total Requests"
          value={stats.totalRequests.toLocaleString()}
          icon={TrendingUp}
          description="All time"
        />
        <StatCard
          title="Requests Today"
          value={stats.requestsToday.toLocaleString()}
          icon={Clock}
          description="Last 24 hours"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Link
            href="/dashboard/keys?create=true"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create New API Key
          </Link>
          <Link
            href="/docs"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            View Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  description,
}: {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <Icon className="h-8 w-8 text-blue-600" />
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{description}</div>
    </div>
  );
}

