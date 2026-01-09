'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import {
  CardRoot as Card,
  CardHeader,
  CardBody,
  Heading as CardTitle,
} from '@chakra-ui/react';
import {
  Key,
  Activity,
  TrendingUp,
  MapPin,
  ArrowRight,
  Plus,
  Copy,
  Check,
  AlertCircle,
  Trash2,
  ChevronDown,
} from 'lucide-react';
import { OutlineButton } from '@DonaldNgai/chakra-ui';
import Link from 'next/link';
import { getApiKeys, createApiKey, deleteApiKey, getUserGroups, createGroup } from '@/app/actions/keys';
import { Input, Checkbox, Alert, AlertIndicator, AlertTitle, AlertDescription, Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/react';

interface ApiKey {
  id: string;
  label: string;
  createdAt: string;
  lastUsedAt: string | null;
}

interface CreateApiKeyResult {
  apiKey?: string;
  id?: string;
  label?: string;
  error?: string;
  status?: number;
  created?: number;
}

interface UsageStats {
  totalRequests: number;
  requestsToday: number;
  activeDevices: number;
  dataPoints: number;
}

interface Group {
  id: string;
  name: string;
  description: string | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [usageStats, setUsageStats] = useState<UsageStats>({
    totalRequests: 0,
    requestsToday: 0,
    activeDevices: 0,
    dataPoints: 0,
  });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [showNewKey, setShowNewKey] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newKeyLabel, setNewKeyLabel] = useState('');
  const [creating, setCreating] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [groupSearchQuery, setGroupSearchQuery] = useState('');
  const [isGroupPopoverOpen, setIsGroupPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Handle clicks outside the popover to close it
  useEffect(() => {
    if (!isGroupPopoverOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsGroupPopoverOpen(false);
        setGroupSearchQuery('');
      }
    };

    // Add event listener with a small delay to avoid immediate closing
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isGroupPopoverOpen]);

  const loadDashboardData = async () => {
    try {
      // Load API keys
      const keysResult = await getApiKeys();
      if (keysResult.items) {
        setApiKeys(keysResult.items);
      }

      // Load user groups
      const groupsResult = await getUserGroups();
      if (groupsResult.groups) {
        setGroups(groupsResult.groups);
        // Auto-select all groups if none selected
        if (selectedGroupIds.length === 0 && groupsResult.groups.length > 0) {
          setSelectedGroupIds(groupsResult.groups.map(g => g.id));
        }
      }

      // Load usage stats (mock for now - replace with actual API call)
      // TODO: Replace with actual API endpoint
      setUsageStats({
        totalRequests: 125430,
        requestsToday: 3420,
        activeDevices: 156,
        dataPoints: 892340,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total API Keys',
      value: apiKeys.length,
      icon: Key,
      color: 'blue',
      description: 'Active API keys',
    },
    {
      title: 'Requests Today',
      value: usageStats.requestsToday.toLocaleString(),
      icon: Activity,
      color: 'green',
      description: 'API calls in last 24h',
    },
    {
      title: 'Active Devices',
      value: usageStats.activeDevices,
      icon: MapPin,
      color: 'purple',
      description: 'Currently tracking',
    },
    {
      title: 'Total Data Points',
      value: usageStats.dataPoints.toLocaleString(),
      icon: TrendingUp,
      color: 'orange',
      description: 'Location updates received',
    },
  ];

  const handleCreateKey = async () => {
    if (!newKeyLabel.trim()) {
      return;
    }

    setCreating(true);
    try {
      const result: CreateApiKeyResult = await createApiKey(newKeyLabel.trim(), selectedGroupIds);
      if (result.apiKey) {
        setNewKey(result.apiKey);
        setShowNewKey(true);
        setNewKeyLabel('');
        setSelectedGroupIds([]);
        setShowCreateForm(false);
        await loadDashboardData();
        
        // Show message if multiple keys were created
        if (result.created && result.created > 1) {
          setTimeout(() => {
            alert(`Successfully created ${result.created} API keys (one for each selected group).`);
          }, 500);
        }
      } else if (result.error) {
        alert(`Failed to create API key: ${result.error}`);
      }
    } catch (error) {
      console.error('Error creating key:', error);
      alert('Error creating API key. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) {
      return;
    }

    setCreatingGroup(true);
    try {
      const result = await createGroup(newGroupName.trim(), newGroupDescription.trim() || undefined);
      if (result.group) {
        setNewGroupName('');
        setNewGroupDescription('');
        setShowCreateGroupForm(false);
        await loadDashboardData();
        // Auto-select the newly created group
        setSelectedGroupIds([result.group.id]);
      } else if (result.error) {
        alert(`Failed to create group: ${result.error}`);
      }
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Error creating group. Please try again.');
    } finally {
      setCreatingGroup(false);
    }
  };

  const toggleGroupSelection = (groupId: string) => {
    setSelectedGroupIds(prev => 
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(groupSearchQuery.toLowerCase()) ||
    (group.description && group.description.toLowerCase().includes(groupSearchQuery.toLowerCase()))
  );

  const selectedGroupsText = selectedGroupIds.length === 0
    ? 'Select groups...'
    : selectedGroupIds.length === 1
    ? groups.find(g => g.id === selectedGroupIds[0])?.name || '1 group selected'
    : `${selectedGroupIds.length} groups selected`;

  const handleDeleteKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      return;
    }

    try {
      const result = await deleteApiKey(keyId);
      if (result.success) {
        await loadDashboardData();
      } else if (result.error) {
        alert(`Failed to delete API key: ${result.error}`);
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

  const recentKeys = apiKeys
    .sort((a, b) => {
      const aTime = a.lastUsedAt ? new Date(a.lastUsedAt).getTime() : 0;
      const bTime = b.lastUsedAt ? new Date(b.lastUsedAt).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 5);

  return (
    <Box flex="1" maxW="7xl" w="full">
      <VStack align="stretch" gap={6}>
        {/* Header */}
        <HStack justify="space-between" align="center" flexWrap="wrap" gap={4}>
          <Box>
            <Heading as="h1" size={{ base: 'lg', lg: 'xl' }} fontWeight="medium">
              Dashboard
            </Heading>
            <Text color="fg.muted" mt={1}>
              Monitor your location API usage and manage API keys
            </Text>
          </Box>
          <HStack gap={2}>
            {!showCreateForm && (
              <OutlineButton
                onClick={() => setShowCreateForm(true)}
                size="md"
              >
                <Plus size={16} className="mr-2" />
                Create API Key
              </OutlineButton>
            )}
            <Button
              asChild
              variant="outline"
              size="md"
            >
              <Link href="/dashboard/docs">
                View Docs
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </HStack>
        </HStack>

        {/* Stats Grid */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4}>
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} height="full">
                <CardHeader>
                  <HStack justify="space-between" align="start">
                    <VStack align="start" gap={1}>
                      <Text fontSize="sm" color="fg.muted" fontWeight="medium">
                        {stat.title}
                      </Text>
                      <Text fontSize="2xl" fontWeight="bold">
                        {stat.value}
                      </Text>
                      <Text fontSize="xs" color="fg.muted">
                        {stat.description}
                      </Text>
                    </VStack>
                    <Box
                      display="flex"
                      h="10"
                      w="10"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="lg"
                      bg={`${stat.color}.100`}
                      color={`${stat.color}.600`}
                    >
                      <Icon size={20} />
                    </Box>
                  </HStack>
                </CardHeader>
                <CardBody>
                  {/* Empty content for now */}
                </CardBody>
              </Card>
            );
          })}
        </SimpleGrid>

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

        {/* Create API Key Form */}
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

                {/* Group Selection */}
                {loadingGroups ? (
                  <Text color="fg.muted">Loading groups...</Text>
                ) : groups.length === 0 ? (
                  <Alert.Root status="warning" borderRadius="md">
                    <AlertIndicator />
                    <VStack align="start" gap={2} flex={1}>
                      <AlertTitle>No Groups Found</AlertTitle>
                      <AlertDescription>
                        You need to be part of at least one group to create an API key. Create a group first.
                      </AlertDescription>
                      {!showCreateGroupForm && (
                        <Button
                          size="sm"
                          onClick={() => setShowCreateGroupForm(true)}
                          mt={2}
                        >
                          <Plus size={16} className="mr-2" />
                          Create Group
                        </Button>
                      )}
                    </VStack>
                  </Alert.Root>
                ) : (
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Associate with Groups
                    </Text>
                    <Text fontSize="xs" color="fg.muted" mb={3}>
                      Select one or more groups to associate this API key with.
                    </Text>
                    <Box ref={popoverRef} position="relative">
                      <Popover.Root 
                        open={isGroupPopoverOpen} 
                        onOpenChange={(open) => {
                          setIsGroupPopoverOpen(open.open);
                          if (!open) {
                            setGroupSearchQuery('');
                          }
                        }}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between"
                            size="md"
                          >
                            <Text className="truncate flex-1 text-left">
                              {selectedGroupsText}
                            </Text>
                            <ChevronDown
                              size={16}
                              className={`ml-2 transition-transform ${isGroupPopoverOpen ? 'rotate-180' : ''}`}
                            />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent 
                          className="w-[var(--reference-width)] p-0" 
                          alignItems="start"
                        >
                        <VStack align="stretch" gap={0}>
                          {/* Search Input */}
                          <Box p={3} borderBottomWidth="1px">
                            <Input
                              placeholder="Search groups..."
                              value={groupSearchQuery}
                              onChange={(e) => setGroupSearchQuery(e.target.value)}
                              size="sm"
                              autoFocus
                            />
                          </Box>
                          
                          {/* Group List */}
                          <Box maxH="300px" overflowY="auto">
                            {filteredGroups.length === 0 ? (
                              <Box p={4} textAlign="center">
                                <Text fontSize="sm" color="fg.muted">
                                  {groupSearchQuery ? 'No groups found' : 'No groups available'}
                                </Text>
                              </Box>
                            ) : (
                              <VStack align="stretch" gap={0}>
                                {filteredGroups.map((group) => (
                                  <Box
                                    key={group.id}
                                    p={3}
                                    _hover={{ bg: 'bg.muted' }}
                                    cursor="pointer"
                                    onClick={() => toggleGroupSelection(group.id)}
                                  >
                                    <HStack gap={2}>
                                      <Checkbox.Root
                                        checked={selectedGroupIds.includes(group.id)}
                                        onCheckedChange={() => toggleGroupSelection(group.id)}
                                      >
                                        <Checkbox.Indicator />
                                      </Checkbox.Root>
                                      <VStack align="start" gap={0} flex={1}>
                                        <Text fontSize="sm" fontWeight="medium">
                                          {group.name}
                                        </Text>
                                        {group.description && (
                                          <Text fontSize="xs" color="fg.muted">
                                            {group.description}
                                          </Text>
                                        )}
                                      </VStack>
                                    </HStack>
                                  </Box>
                                ))}
                              </VStack>
                            )}
                          </Box>
                          
                          {/* Footer with select all/none */}
                          {filteredGroups.length > 0 && (
                            <Box p={2} borderTopWidth="1px" bg="bg.muted">
                              <HStack justify="space-between">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const allFilteredIds = filteredGroups.map(g => g.id);
                                    const allSelected = allFilteredIds.every(id => selectedGroupIds.includes(id));
                                    if (allSelected) {
                                      setSelectedGroupIds(prev => prev.filter(id => !allFilteredIds.includes(id)));
                                    } else {
                                      setSelectedGroupIds(prev => [...new Set([...prev, ...allFilteredIds])]);
                                    }
                                  }}
                                >
                                  {filteredGroups.every(g => selectedGroupIds.includes(g.id))
                                    ? 'Deselect All'
                                    : 'Select All'}
                                </Button>
                                <Text fontSize="xs" color="fg.muted">
                                  {selectedGroupIds.length} selected
                                </Text>
                              </HStack>
                            </Box>
                          )}
                        </VStack>
                      </PopoverContent>
                    </Popover.Root>
                    </Box>
                    {selectedGroupIds.length === 0 && (
                      <Text fontSize="xs" color="orange.600" mt={2}>
                        Please select at least one group.
                      </Text>
                    )}
                    {selectedGroupIds.length > 0 && (
                      <Box mt={2}>
                        <Text fontSize="xs" color="fg.muted" mb={1}>
                          Selected groups:
                        </Text>
                        <HStack gap={1} flexWrap="wrap">
                          {selectedGroupIds.map((groupId) => {
                            const group = groups.find(g => g.id === groupId);
                            if (!group) return null;
                            return (
                              <Box
                                key={groupId}
                                px={2}
                                py={1}
                                borderRadius="md"
                                bg="blue.100"
                                className="dark:bg-blue-900"
                                fontSize="xs"
                                display="flex"
                                alignItems="center"
                                gap={1}
                              >
                                <Text>{group.name}</Text>
                                <Button
                                  variant="ghost"
                                  size="xs"
                                  p={0}
                                  minW="auto"
                                  h="auto"
                                  onClick={() => toggleGroupSelection(groupId)}
                                >
                                  <Trash2 size={12} />
                                </Button>
                              </Box>
                            );
                          })}
                        </HStack>
                      </Box>
                    )}
                  </Box>
                )}

                {/* Create Group Form */}
                {showCreateGroupForm && (
                  <Box p={4} borderRadius="md" borderWidth="1px" bg="bg.muted">
                    <VStack align="stretch" gap={3}>
                      <Text fontSize="sm" fontWeight="medium">
                        Create New Group
                      </Text>
                      <Box>
                        <Text fontSize="xs" fontWeight="medium" mb={1}>
                          Group Name
                        </Text>
                        <Input
                          placeholder="e.g., Production, Development, Team Alpha"
                          value={newGroupName}
                          onChange={(e) => setNewGroupName(e.target.value)}
                          size="sm"
                        />
                      </Box>
                      <Box>
                        <Text fontSize="xs" fontWeight="medium" mb={1}>
                          Description (Optional)
                        </Text>
                        <Input
                          placeholder="Brief description of this group"
                          value={newGroupDescription}
                          onChange={(e) => setNewGroupDescription(e.target.value)}
                          size="sm"
                        />
                      </Box>
                      <HStack gap={2}>
                        <Button
                          size="sm"
                          onClick={handleCreateGroup}
                          disabled={!newGroupName.trim() || creatingGroup}
                        >
                          {creatingGroup ? 'Creating...' : 'Create Group'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setShowCreateGroupForm(false);
                            setNewGroupName('');
                            setNewGroupDescription('');
                          }}
                        >
                          Cancel
                        </Button>
                      </HStack>
                    </VStack>
                  </Box>
                )}

                <HStack gap={2}>
                  <OutlineButton
                    onClick={handleCreateKey}
                    disabled={!newKeyLabel.trim() || creating || groups.length === 0 || selectedGroupIds.length === 0}
                    size="md"
                  >
                    {creating ? 'Creating...' : 'Create API Key'}
                  </OutlineButton>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowCreateForm(false);
                      setNewKeyLabel('');
                      setSelectedGroupIds([]);
                      setShowCreateGroupForm(false);
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

        {/* Recent Activity & Quick Actions */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
          {/* Recent API Keys */}
          <Card>
            <CardHeader>
              <CardTitle>Your API Keys</CardTitle>
            </CardHeader>
            <CardBody>
              {loading ? (
                <Text color="fg.muted">Loading...</Text>
              ) : apiKeys.length === 0 ? (
                <VStack gap={4} py={8}>
                  <Text color="fg.muted" textAlign="center">
                    No API keys yet. Create your first API key to get started.
                  </Text>
                  <OutlineButton
                    onClick={() => setShowCreateForm(true)}
                    size="sm"
                  >
                    <Plus size={16} className="mr-2" />
                    Create API Key
                  </OutlineButton>
                </VStack>
              ) : (
                <VStack align="stretch" gap={3}>
                  {apiKeys.map((key) => (
                    <Box
                      key={key.id}
                      p={4}
                      borderRadius="md"
                      borderWidth="1px"
                      _hover={{ bg: 'bg.muted' }}
                    >
                      <HStack justify="space-between" align="start" flexWrap="wrap" gap={4}>
                        <VStack align="start" gap={1} flex={1}>
                          <Text fontWeight="semibold">{key.label}</Text>
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
                              display="inline-block"
                              mt={1}
                            >
                              Never Used
                            </Box>
                          )}
                          <Text fontSize="xs" color="fg.muted" fontFamily="mono">
                            ID: {key.id}
                          </Text>
                        </VStack>
                        <HStack gap={2}>
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

          {/* Quick Start Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
            </CardHeader>
            <CardBody>
              <VStack align="stretch" gap={4}>
                <Box>
                  <Text fontWeight="medium" mb={2}>
                    1. Create an API Key
                  </Text>
                  <Text fontSize="sm" color="fg.muted">
                    Generate an API key to authenticate your requests to our location API.
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={2}>
                    2. Integrate with Your App
                  </Text>
                  <Text fontSize="sm" color="fg.muted">
                    Use our mobile app or SDK to send location data from your users' devices.
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={2}>
                    3. Receive Location Data
                  </Text>
                  <Text fontSize="sm" color="fg.muted">
                    Query our API endpoints to retrieve location updates in real-time or via webhooks.
                  </Text>
                </Box>
                <Button
                  asChild
                  variant="outline"
                  width="full"
                  mt={2}
                >
                  <Link href="/dashboard/docs">
                    Read Full Documentation
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
              <VStack align="start" gap={2}>
                <Box
                  display="flex"
                  h="12"
                  w="12"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="lg"
                  bg="blue.100"
                  className="dark:bg-blue-900"
                  color="blue.600"
                >
                  <MapPin size={24} />
                </Box>
                <Text fontWeight="semibold">Location App</Text>
                <Text fontSize="sm" color="fg.muted">
                  Our mobile app collects location data from users and sends it securely to our servers.
                </Text>
              </VStack>
              <VStack align="start" gap={2}>
                <Box
                  display="flex"
                  h="12"
                  w="12"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="lg"
                  bg="purple.100"
                  className="dark:bg-purple-900"
                  color="purple.600"
                >
                  <Activity size={24} />
                </Box>
                <Text fontWeight="semibold">Our API</Text>
                <Text fontSize="sm" color="fg.muted">
                  We process, cache, and manage location data with intelligent permission handling.
                </Text>
              </VStack>
              <VStack align="start" gap={2}>
                <Box
                  display="flex"
                  h="12"
                  w="12"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="lg"
                  bg="green.100"
                  className="dark:bg-green-900"
                  color="green.600"
                >
                  <TrendingUp size={24} />
                </Box>
                <Text fontWeight="semibold">Your App</Text>
                <Text fontSize="sm" color="fg.muted">
                  Query our REST API or receive webhooks to get location updates in your application.
                </Text>
              </VStack>
            </SimpleGrid>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
}
