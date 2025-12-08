'use client';

import { useEffect, useState } from 'react';
import { MapPin, Users, Activity, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useSWR from 'swr';

interface LocationUpdate {
  deviceId: string;
  latitude: number;
  longitude: number;
  accuracy: number | null;
  recordedAt: string;
}

interface DashboardStats {
  totalDevices: number;
  activeDevices: number;
  totalUpdates: number;
  lastUpdate: string | null;
}

export default function Page() {
  const [locations, setLocations] = useState<LocationUpdate[]>([]);
  const { data: stats, mutate: mutateStats } = useSWR<DashboardStats>(
    '/api/dashboard/stats',
    (url) => fetch(url).then(res => res.json()),
    { refreshInterval: 5000 }
  );

  useEffect(() => {
    // Load recent locations
    fetch('/api/dashboard/locations')
      .then(res => res.json())
      .then(data => setLocations(data.items || []))
      .catch(console.error);

    // Set up polling for updates
    const interval = setInterval(() => {
      fetch('/api/dashboard/locations')
        .then(res => res.json())
        .then(data => setLocations(data.items || []))
        .catch(console.error);
      mutateStats();
    }, 5000);

    return () => clearInterval(interval);
  }, [mutateStats]);

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Location Tracking Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor live location updates and account usage
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalDevices || 0}</div>
            <p className="text-xs text-muted-foreground">Registered devices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeDevices || 0}</div>
            <p className="text-xs text-muted-foreground">Sending updates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Updates</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalUpdates || 0}</div>
            <p className="text-xs text-muted-foreground">Location updates received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Update</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.lastUpdate
                ? new Date(stats.lastUpdate).toLocaleTimeString()
                : 'Never'}
            </div>
            <p className="text-xs text-muted-foreground">Most recent location</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Locations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Location Updates</CardTitle>
          <CardDescription>Live location updates from your devices</CardDescription>
        </CardHeader>
        <CardContent>
          {locations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No location updates yet. Start tracking locations to see them here.
            </div>
          ) : (
            <div className="space-y-2">
              {locations.slice(0, 10).map((location, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{location.deviceId}</p>
                      <p className="text-sm text-muted-foreground">
                        {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                        {location.accuracy && ` (±${Math.round(location.accuracy)}m)`}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(location.recordedAt).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
