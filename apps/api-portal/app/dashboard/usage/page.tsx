'use client';

import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Clock } from 'lucide-react';

interface UsageData {
  requests: Array<{
    date: string;
    count: number;
  }>;
  totalRequests: number;
  averagePerDay: number;
  peakDay: {
    date: string;
    count: number;
  };
}

export default function UsagePage() {
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/usage')
      .then((res) => res.json())
      .then((data) => {
        setUsage(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading usage data...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Usage</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor your API usage and request patterns
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <h3 className="text-lg font-semibold">Total Requests</h3>
          </div>
          <div className="text-3xl font-bold">
            {usage?.totalRequests.toLocaleString() || 0}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <h3 className="text-lg font-semibold">Average per Day</h3>
          </div>
          <div className="text-3xl font-bold">
            {usage?.averagePerDay.toFixed(0) || 0}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="h-8 w-8 text-purple-600" />
            <h3 className="text-lg font-semibold">Peak Day</h3>
          </div>
          <div className="text-3xl font-bold">
            {usage?.peakDay.count.toLocaleString() || 0}
          </div>
          <div className="text-sm text-gray-500 mt-2">
            {usage?.peakDay.date
              ? new Date(usage.peakDay.date).toLocaleDateString()
              : 'N/A'}
          </div>
        </div>
      </div>

      {/* Usage Chart Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Request History (Last 30 Days)</h2>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Chart visualization would go here
        </div>
      </div>
    </div>
  );
}

