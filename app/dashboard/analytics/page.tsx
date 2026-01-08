'use client';

import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  CardRoot as Card,
  CardHeader,
  CardBody,
  Heading as CardTitle,
} from '@chakra-ui/react';
import {
  Activity,
  TrendingUp,
  MapPin,
  Clock,
} from 'lucide-react';

export default function AnalyticsPage() {
  // Mock data - replace with actual API calls
  const stats = [
    {
      title: 'Total Requests',
      value: '125,430',
      change: '+12.5%',
      icon: Activity,
      color: 'blue',
    },
    {
      title: 'Requests Today',
      value: '3,420',
      change: '+8.2%',
      icon: TrendingUp,
      color: 'green',
    },
    {
      title: 'Active Devices',
      value: '156',
      change: '+5',
      icon: MapPin,
      color: 'purple',
    },
    {
      title: 'Avg Response Time',
      value: '45ms',
      change: '-2ms',
      icon: Clock,
      color: 'orange',
    },
  ];

  return (
    <Box flex="1" maxW="7xl" w="full">
      <VStack align="stretch" gap={6}>
        {/* Header */}
        <Box>
          <Heading as="h1" size={{ base: 'lg', lg: 'xl' }} fontWeight="medium">
            Usage & Analytics
          </Heading>
          <Text color="fg.muted" mt={1}>
            Monitor API usage, performance metrics, and location data statistics
          </Text>
        </Box>

        {/* Stats Grid */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4}>
          {stats.map((stat) => {
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
                      <Text
                        fontSize="xs"
                        color={stat.change.startsWith('+') ? 'green.600' : 'fg.muted'}
                      >
                        {stat.change} from last period
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
                  {/* Empty content for stat cards */}
                </CardBody>
              </Card>
            );
          })}
        </SimpleGrid>

        {/* Charts Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Request Volume</CardTitle>
          </CardHeader>
          <CardBody>
            <VStack align="center" justify="center" py={12}>
              <Text color="fg.muted" textAlign="center">
                Charts and detailed analytics coming soon
              </Text>
              <Text fontSize="sm" color="fg.muted" textAlign="center">
                View request trends, API key usage breakdown, and location data insights
              </Text>
            </VStack>
          </CardBody>
        </Card>

        {/* Usage by API Key */}
        <Card>
          <CardHeader>
            <CardTitle>Usage by API Key</CardTitle>
          </CardHeader>
          <CardBody>
            <VStack align="center" justify="center" py={12}>
              <Text color="fg.muted" textAlign="center">
                Detailed breakdown per API key coming soon
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
}

