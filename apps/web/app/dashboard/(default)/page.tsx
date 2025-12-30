'use client';

import { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { OutlineButton } from '@DonaldNgai/chakra-ui';
import Link from 'next/link';

interface ApiKey {
  id: string;
  label: string;
  createdAt: string;
  lastUsedAt: string | null;
}

interface UsageStats {
  totalRequests: number;
  requestsToday: number;
  activeDevices: number;
  dataPoints: number;
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

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load API keys
      const keysResponse = await fetch('/api/keys');
      if (keysResponse.ok) {
        const keysData = await keysResponse.json();
        setApiKeys(keysData.items || []);
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
            <OutlineButton
              onClick={() => router.push('/dashboard/keys?create=true')}
              size="md"
            >
              <Plus size={16} className="mr-2" />
              Create API Key
            </OutlineButton>
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

        {/* Recent Activity & Quick Actions */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
          {/* Recent API Keys */}
          <Card>
            <CardHeader>
              <HStack justify="space-between" align="center">
                <CardTitle>Recent API Keys</CardTitle>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                >
                  <Link href="/dashboard/keys">
                    View All
                    <ArrowRight size={14} className="ml-1" />
                  </Link>
                </Button>
              </HStack>
            </CardHeader>
            <CardBody>
              {loading ? (
                <Text color="fg.muted">Loading...</Text>
              ) : recentKeys.length === 0 ? (
                <VStack gap={4} py={8}>
                  <Text color="fg.muted" textAlign="center">
                    No API keys yet. Create your first API key to get started.
                  </Text>
                  <OutlineButton
                    onClick={() => router.push('/dashboard/keys?create=true')}
                    size="sm"
                  >
                    <Plus size={16} className="mr-2" />
                    Create API Key
                  </OutlineButton>
                </VStack>
              ) : (
                <VStack align="stretch" gap={3}>
                  {recentKeys.map((key) => (
                    <Box
                      key={key.id}
                      p={3}
                      borderRadius="md"
                      borderWidth="1px"
                      _hover={{ bg: 'bg.muted' }}
                    >
                      <HStack justify="space-between" align="start">
                        <VStack align="start" gap={1}>
                          <Text fontWeight="medium">{key.label}</Text>
                          <Text fontSize="xs" color="fg.muted">
                            Created {new Date(key.createdAt).toLocaleDateString()}
                          </Text>
                          {key.lastUsedAt && (
                            <Text fontSize="xs" color="fg.muted">
                              Last used {new Date(key.lastUsedAt).toLocaleDateString()}
                            </Text>
                          )}
                        </VStack>
                        {!key.lastUsedAt && (
                          <Box
                            px={2}
                            py={1}
                            borderRadius="md"
                            bg="yellow.100"
                            className="dark:bg-yellow-900 dark:text-yellow-300"
                            color="yellow.700"
                            fontSize="xs"
                            fontWeight="medium"
                          >
                            New
                          </Box>
                        )}
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
