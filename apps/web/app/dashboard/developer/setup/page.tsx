'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Copy, Check, Key, Settings, MessageSquare, Clock, Loader2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/card';
import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import { Label } from '@repo/ui/label';
import { Textarea } from '@repo/ui/textarea';
import { Badge } from '@repo/ui/badge';
import { Alert, AlertDescription } from '@repo/ui/alert';

interface ApiKey {
  id: string;
  label: string;
  createdAt: string;
  lastUsedAt: string | null;
}

interface Group {
  id: string;
  name: string;
  description: string | null;
  apiBaseUrl: string | null;
}

export default function DeveloperSetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [group, setGroup] = useState<Group | null>(null);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [newApiKey, setNewApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [settings, setSettings] = useState({
    locationRequestFrequency: '30', // seconds
    locationRequestMessage: 'Please share your location',
    apiBaseUrl: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [groupRes, keysRes] = await Promise.all([
        fetch('/api/developer/group'),
        fetch('/api/developer/api-keys'),
      ]);

      if (groupRes.ok) {
        const groupData = await groupRes.json();
        setGroup(groupData);
        if (groupData.apiBaseUrl) {
          setSettings(prev => ({ ...prev, apiBaseUrl: groupData.apiBaseUrl }));
        }
      } else if (groupRes.status === 404) {
        // Create group if it doesn't exist
        const createRes = await fetch('/api/developer/group', { method: 'POST' });
        if (createRes.ok) {
          const newGroup = await createRes.json();
          setGroup(newGroup);
        }
      }

      if (keysRes.ok) {
        const keysData = await keysRes.json();
        setApiKeys(keysData.items || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateApiKey = async () => {
    if (!group) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/developer/api-keys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: 'Default Key' }),
      });

      if (response.ok) {
        const data = await response.json();
        setNewApiKey(data.apiKey);
        await loadData();
      }
    } catch (error) {
      console.error('Error creating API key:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!group) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/developer/group`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationRequestFrequency: parseInt(settings.locationRequestFrequency),
          locationRequestMessage: settings.locationRequestMessage,
          apiBaseUrl: settings.apiBaseUrl,
        }),
      });

      if (response.ok) {
        // Show success message
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Developer Setup</h1>
        <p className="text-muted-foreground">
          Get your API key and configure location tracking settings
        </p>
      </div>

      {/* API Key Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            <CardTitle>API Key</CardTitle>
          </div>
          <CardDescription>
            Use this API key to authenticate requests to the location tracking API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {newApiKey && (
            <Alert>
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">{newApiKey}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(newApiKey)}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs mt-2 text-muted-foreground">
                  ⚠️ Save this key now. You won't be able to see it again!
                </p>
              </AlertDescription>
            </Alert>
          )}

          {apiKeys.length > 0 && (
            <div className="space-y-2">
              <Label>Existing API Keys</Label>
              {apiKeys.map(key => (
                <div
                  key={key.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{key.label}</p>
                    <p className="text-xs text-muted-foreground">
                      Created {new Date(key.createdAt).toLocaleDateString()}
                      {key.lastUsedAt && ` • Last used ${new Date(key.lastUsedAt).toLocaleDateString()}`}
                    </p>
                  </div>
                  <Badge variant="secondary">{key.id}</Badge>
                </div>
              ))}
            </div>
          )}

          <Button onClick={handleCreateApiKey} disabled={saving || !!newApiKey}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Key className="mr-2 h-4 w-4" />
                Generate New API Key
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Settings Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <CardTitle>Location Request Settings</CardTitle>
          </div>
          <CardDescription>
            Configure how often and what message users see when requesting location
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="frequency">
              <Clock className="inline h-4 w-4 mr-1" />
              Request Frequency (seconds)
            </Label>
            <Input
              id="frequency"
              type="number"
              min="1"
              value={settings.locationRequestFrequency}
              onChange={e =>
                setSettings(prev => ({ ...prev, locationRequestFrequency: e.target.value }))
              }
              placeholder="30"
            />
            <p className="text-xs text-muted-foreground">
              How often to request location updates from users (in seconds)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              <MessageSquare className="inline h-4 w-4 mr-1" />
              Request Message
            </Label>
            <Textarea
              id="message"
              value={settings.locationRequestMessage}
              onChange={e =>
                setSettings(prev => ({ ...prev, locationRequestMessage: e.target.value }))
              }
              placeholder="Please share your location"
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Message shown to users when requesting their location
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiBaseUrl">API Base URL</Label>
            <Input
              id="apiBaseUrl"
              type="url"
              value={settings.apiBaseUrl}
              onChange={e => setSettings(prev => ({ ...prev, apiBaseUrl: e.target.value }))}
              placeholder="https://api.example.com"
            />
            <p className="text-xs text-muted-foreground">
              Base URL for your location tracking API endpoint
            </p>
          </div>

          <Button onClick={handleSaveSettings} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Settings'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>You're all set!</CardTitle>
          <CardDescription>Start tracking locations in your application</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => router.push('/dashboard')} className="w-full">
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

