'use client';

import {
  Box,
  VStack,
  Heading,
  Text,
  HStack,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  CardRoot as Card,
  CardHeader,
  CardBody,
  Heading as CardTitle,
} from '@chakra-ui/react';
import {
  FileText,
  Code,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  const sections = [
    {
      title: 'Getting Started',
      description: 'Learn how to create an API key and make your first request',
      href: '#',
    },
    {
      title: 'Authentication',
      description: 'Understand how to authenticate your API requests',
      href: '#',
    },
    {
      title: 'Location Endpoints',
      description: 'Query location data, get real-time updates, and set up webhooks',
      href: '#',
    },
    {
      title: 'SDKs & Libraries',
      description: 'Official SDKs for popular programming languages',
      href: '#',
    },
    {
      title: 'Webhooks',
      description: 'Receive real-time location updates via webhooks',
      href: '#',
    },
    {
      title: 'Rate Limits',
      description: 'Understand API rate limits and best practices',
      href: '#',
    },
  ];

  return (
    <Box flex="1" maxW="7xl" w="full">
      <VStack align="stretch" gap={6}>
        {/* Header */}
        <Box>
          <HStack justify="space-between" align="start" flexWrap="wrap" gap={4}>
            <Box>
              <Heading as="h1" size={{ base: 'lg', lg: 'xl' }} fontWeight="medium">
                API Documentation
              </Heading>
              <Text color="fg.muted" mt={1}>
                Complete guide to integrating location services into your application
              </Text>
            </Box>
            <Button
              asChild
              size="lg"
              colorScheme="blue"
            >
              <Link href="https://github.com/DonaldNgai/locationWeb/blob/main/README.md" target="_blank" rel="noopener noreferrer">
                <FileText size={18} className="mr-2" />
                View Full README
                <ExternalLink size={16} className="ml-2" />
              </Link>
            </Button>
          </HStack>
        </Box>

        {/* Quick Start */}
        <Card>
          <CardHeader>
            <HStack gap={2}>
              <Code size={20} />
              <CardTitle>Quick Start</CardTitle>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" gap={4}>
              <Box
                p={4}
                borderRadius="md"
                bg="bg.muted"
                fontFamily="mono"
                fontSize="sm"
              >
                <Text>curl https://api.gofindme.com/v1/locations \</Text>
                <Text pl={4}>-H "Authorization: Bearer YOUR_API_KEY"</Text>
              </Box>
              <Text fontSize="sm" color="fg.muted">
                Replace <code className="bg-bg-muted px-1 py-0.5 rounded">YOUR_API_KEY</code> with your actual API key.
              </Text>
            </VStack>
          </CardBody>
        </Card>

        {/* Documentation Sections */}
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          {sections.map((section) => (
            <Card key={section.title} height="full">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardBody>
                <VStack align="stretch" gap={3}>
                  <Text fontSize="sm" color="fg.muted">
                    {section.description}
                  </Text>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    width="full"
                  >
                    <Link href={section.href}>
                      Read More
                      <ArrowRight size={14} className="ml-2" />
                    </Link>
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        {/* Additional Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" gap={3}>
              <HStack justify="space-between" align="center">
                <VStack align="start" gap={0}>
                  <Text fontWeight="medium">OpenAPI Specification</Text>
                  <Text fontSize="sm" color="fg.muted">
                    Download our OpenAPI spec for code generation
                  </Text>
                </VStack>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                >
                  <Link href="#" target="_blank">
                    Download
                    <ExternalLink size={14} className="ml-2" />
                  </Link>
                </Button>
              </HStack>
              <HStack justify="space-between" align="center">
                <VStack align="start" gap={0}>
                  <Text fontWeight="medium">Postman Collection</Text>
                  <Text fontSize="sm" color="fg.muted">
                    Import our Postman collection to test endpoints
                  </Text>
                </VStack>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                >
                  <Link href="#" target="_blank">
                    Import
                    <ExternalLink size={14} className="ml-2" />
                  </Link>
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
}

