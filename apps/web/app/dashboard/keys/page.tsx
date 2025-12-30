'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Input,
} from '@chakra-ui/react';
import {
  CardRoot as Card,
  CardHeader,
  CardBody,
  Heading as CardTitle,
} from '@chakra-ui/react';
import {
  Key,
  Plus,
  Copy,
  Check,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { OutlineButton } from '@DonaldNgai/chakra-ui';

interface ApiKey {
  id: string;
  label: string;
  createdAt: string;
  lastUsedAt: string | null;
  key?: string; // Only shown once when created
}

export default function ApiKeysPage() {
  const searchParams = useSearchParams();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [showNewKey, setShowNewKey] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newKeyLabel, setNewKeyLabel] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadKeys();
    // Check if we should create a key automatically (from splash page redirect)
    if (searchParams.get('create') === 'true') {
      setShowCreateForm(true);
    }
  }, [searchParams]);

  const loadKeys = async () => {
    try {
      const response = await fetch('/api/keys');
      if (response.ok) {
        const data = await response.json();
        setKeys(data.items || []);
      }
    } catch (error) {
      console.error('Error loading keys:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateKey = async () => {
    if (!newKeyLabel.trim()) {
      return;
    }

    setCreating(true);
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: newKeyLabel.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        setNewKey(data.apiKey);
        setShowNewKey(true);
        setNewKeyLabel('');
        setShowCreateForm(false);
        await loadKeys();
      } else {
        alert('Failed to create API key. Please try again.');
      }
    } catch (error) {
      console.error('Error creating key:', error);
      alert('Error creating API key. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/keys/${keyId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadKeys();
      } else {
        alert('Failed to delete API key. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting key:', error);
      alert('Error deleting API key. Please try again.');
    }
  };

  const copyToClipboard = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopied(keyId);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Box flex="1" maxW="6xl" w="full">
      <VStack align="stretch" gap={6}>
        {/* Header */}
        <HStack justify="space-between" align="center" flexWrap="wrap" gap={4}>
          <Box>
            <Heading as="h1" size={{ base: 'lg', lg: 'xl' }} fontWeight="medium">
              API Keys
            </Heading>
            <Text color="fg.muted" mt={1}>
              Manage your API keys to authenticate requests to the location API
            </Text>
          </Box>
          {!showCreateForm && (
            <OutlineButton
              onClick={() => setShowCreateForm(true)}
              size="md"
            >
              <Plus size={16} className="mr-2" />
              Create API Key
            </OutlineButton>
          )}
        </HStack>

        {/* New Key Display */}
        {newKey && showNewKey && (
          <Card borderColor="green.500" borderWidth="2px">
            <CardHeader>
              <HStack justify="space-between" align="center">
                <HStack gap={2}>
                  <AlertCircle size={20} className="text-green-600" />
                  <CardTitle color="green.600">API Key Created</CardTitle>
                </HStack>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNewKey(false)}
                >
                  Dismiss
                </Button>
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack align="stretch" gap={4}>
                <Box>
                  <Text fontSize="sm" color="fg.muted" mb={2}>
                    Your API key has been created. Copy it now - you won't be able to see it again!
                  </Text>
                  <Box
                    p={4}
                    borderRadius="md"
                    bg="bg.muted"
                    fontFamily="mono"
                    fontSize="sm"
                    position="relative"
                  >
                    <Text>{newKey}</Text>
                    <Button
                      variant="ghost"
                      size="sm"
                      position="absolute"
                      top={2}
                      right={2}
                      onClick={() => copyToClipboard(newKey, 'new-key')}
                    >
                      {copied === 'new-key' ? (
                        <Check size={16} className="text-green-600" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </Button>
                  </Box>
                </Box>
                <Text fontSize="xs" color="fg.muted">
                  Use this key in the Authorization header: <code className="bg-bg-muted px-1 py-0.5 rounded">Authorization: Bearer {newKey.substring(0, 20)}...</code>
                </Text>
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* Create Form */}
        {showCreateForm && (
          <Card>
            <CardHeader>
              <CardTitle>Create New API Key</CardTitle>
            </CardHeader>
            <CardBody>
              <VStack align="stretch" gap={4}>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Label
                  </Text>
                  <Input
                    placeholder="e.g., Production API Key, Development Key"
                    value={newKeyLabel}
                    onChange={(e) => setNewKeyLabel(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleCreateKey();
                      }
                    }}
                  />
                  <Text fontSize="xs" color="fg.muted" mt={1}>
                    Give your API key a descriptive name to help you identify it later.
                  </Text>
                </Box>
                <HStack gap={2}>
                  <OutlineButton
                    onClick={handleCreateKey}
                    disabled={!newKeyLabel.trim() || creating}
                    size="md"
                  >
                    {creating ? 'Creating...' : 'Create API Key'}
                  </OutlineButton>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowCreateForm(false);
                      setNewKeyLabel('');
                    }}
                    size="md"
                  >
                    Cancel
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* API Keys List */}
        <Card>
          <CardHeader>
            <CardTitle>Your API Keys</CardTitle>
          </CardHeader>
          <CardBody>
            {loading ? (
              <Text color="fg.muted">Loading...</Text>
            ) : keys.length === 0 ? (
              <VStack gap={4} py={8}>
                <Key size={48} className="text-muted-foreground" />
                <Text color="fg.muted" textAlign="center">
                  No API keys yet. Create your first API key to start using the location API.
                </Text>
                <OutlineButton
                  onClick={() => setShowCreateForm(true)}
                  size="md"
                >
                  <Plus size={16} className="mr-2" />
                  Create Your First API Key
                </OutlineButton>
              </VStack>
            ) : (
              <VStack align="stretch" gap={3}>
                {keys.map((key) => (
                  <Box
                    key={key.id}
                    p={4}
                    borderRadius="md"
                    borderWidth="1px"
                    _hover={{ bg: 'bg.muted' }}
                  >
                    <HStack justify="space-between" align="start" flexWrap="wrap" gap={4}>
                      <VStack align="start" gap={1} flex={1}>
                        <HStack gap={2}>
                          <Text fontWeight="semibold">{key.label}</Text>
                          {!key.lastUsedAt && (
                            <Box
                              px={2}
                              py={0.5}
                              borderRadius="md"
                              bg="yellow.100"
                              className="dark:bg-yellow-900 dark:text-yellow-300"
                              color="yellow.700"
                              fontSize="xs"
                              fontWeight="medium"
                            >
                              Never Used
                            </Box>
                          )}
                        </HStack>
                        <Text fontSize="xs" color="fg.muted">
                          Created {new Date(key.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </Text>
                        {key.lastUsedAt && (
                          <Text fontSize="xs" color="fg.muted">
                            Last used {new Date(key.lastUsedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </Text>
                        )}
                        {key.id && (
                          <Text fontSize="xs" color="fg.muted" fontFamily="mono">
                            ID: {key.id}
                          </Text>
                        )}
                      </VStack>
                      <HStack gap={2}>
                        {key.id && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(key.id, key.id)}
                          >
                            {copied === key.id ? (
                              <Check size={16} className="text-green-600" />
                            ) : (
                              <Copy size={16} />
                            )}
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDeleteKey(key.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </HStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            )}
          </CardBody>
        </Card>

        {/* Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>API Key Security</CardTitle>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" gap={3}>
              <Text fontSize="sm" color="fg.muted">
                <strong>Best Practices:</strong>
              </Text>
              <Box as="ul" pl={4} fontSize="sm" color="fg.muted" style={{ listStyle: 'disc' }}>
                <li>Never commit API keys to version control</li>
                <li>Use environment variables to store API keys</li>
                <li>Rotate keys regularly for security</li>
                <li>Delete unused keys to minimize attack surface</li>
                <li>Use different keys for development and production</li>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
}

