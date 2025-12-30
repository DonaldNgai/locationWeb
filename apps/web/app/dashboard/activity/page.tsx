'use client';

import {
  Box,
  VStack,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
} from '@chakra-ui/react';
import { Activity } from 'lucide-react';

export default function ActivityPage() {
  return (
    <Box flex="1" maxW="7xl" w="full">
      <VStack align="stretch" gap={6}>
        {/* Header */}
        <Box>
          <Heading as="h1" size={{ base: 'lg', lg: 'xl' }} fontWeight="medium">
            API Activity
          </Heading>
          <Text color="fg.muted" mt={1}>
            Real-time log of API requests and location data updates
          </Text>
        </Box>

        {/* Activity Log */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardBody>
            <VStack align="center" justify="center" py={12}>
              <Activity size={48} className="text-muted-foreground" />
              <Text color="fg.muted" textAlign="center" mt={4}>
                Activity log coming soon
              </Text>
              <Text fontSize="sm" color="fg.muted" textAlign="center">
                View real-time API requests, location updates, and system events
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
}

