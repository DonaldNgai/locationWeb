'use client';
import { motion } from 'framer-motion';
import { 
  Button, 
  Badge,
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Avatar,
  SimpleGrid,
  Grid,
  GridItem
} from '@chakra-ui/react';

const MotionBox = motion(Box);
import { 
  CardRoot as Card, 
  CardBody as CardContent, 
  Text as CardDescription, 
  CardHeader, 
  Heading as CardTitle 
} from '@chakra-ui/react';

import { useRouter } from 'next/navigation';
import { OutlineButton, EmailSubscribe } from '@DonaldNgai/chakra-ui';

import { FadeIn, FadeInStagger, FadeInStaggerItem, WordDivider } from '@DonaldNgai/chakra-ui';
import { ArrowRight, Code, Zap, Shield, Cpu, Smartphone, Sparkles, Lock, Database, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Terminal } from './terminal';

const techLogos = [
  { name: 'TypeScript', url: 'https://cdn.simpleicons.org/typescript' },
  { name: 'Node.js', url: 'https://cdn.simpleicons.org/nodedotjs' },
  { name: 'Python', url: 'https://cdn.simpleicons.org/python' },
  { name: 'React', url: 'https://cdn.simpleicons.org/react' },
  { name: 'Next.js', url: 'https://cdn.simpleicons.org/nextdotjs' },
];

function LogoTicker({ slides }: { slides: typeof techLogos }) {
  const duplicatedSlides = [...slides, ...slides, ...slides];
  const setWidth = slides.length * 160;
  
  return (
    <Box
      position="relative"
      overflow="hidden"
      width="full"
      className="ticker-fade"
    >
      <MotionBox
        display="flex"
        animate={{
          x: [0, -setWidth],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          },
        }}
        style={{
          width: 'fit-content',
        }}
      >
        {duplicatedSlides.map((logo, i) => (
          <Box
            key={i}
            flexShrink="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="32"
            h="16"
            mx="4"
            bg="white/80"
            className="dark:bg-gray-800/80"
            borderRadius="lg"
            backdropFilter="blur-sm"
            p="3"
          >
            <Image
              src={logo.url}
              alt={logo.name}
              width={120}
              height={60}
              unoptimized
              className="w-full h-full object-contain"
            />
          </Box>
        ))}
      </MotionBox>
    </Box>
  );
}

export default function HomePage() {
  const router = useRouter();

  return (
    <Box as="main" minH="100vh" position="relative" bg="bg.canvas">
      {/* Tech-inspired background */}
      <Box
        position="fixed"
        inset="0"
        pointerEvents="none"
        zIndex="0"
      >
        <Box
          position="absolute"
          inset="0"
          opacity="0.4"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
          }}
        />
        <Box
          position="absolute"
          inset="0"
          bgGradient="to-br"
          bg="white/95"
          className="dark:bg-gray-950/95"
        />
        {/* Grid pattern overlay */}
        <Box
          position="absolute"
          inset="0"
          opacity="0.03"
          className="dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </Box>

      {/* Hero Section */}
      <Box as="section" position="relative" py={{ base: 15, lg: 20 }} overflow="hidden" zIndex="10">
        <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <FadeInStagger>
            <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 8, lg: 12 }} alignItems="center">
              <FadeInStaggerItem>
                <VStack gap="6" alignItems={{ base: 'center', lg: 'start' }} textAlign={{ base: 'center', lg: 'left' }}>
                  <Badge variant="subtle" size="lg" px="4" py="2" colorScheme="blue">
                    By Developers, For Developers
                  </Badge>
                  
                  <Heading
                    as="h1"
                    size={{ base: '3xl', md: '4xl', lg: '5xl' }}
                    fontWeight="bold"
                    letterSpacing="tight"
                    lineHeight="1.1"
                  >
                    Add Location Features to Your App in{' '}
                    <Text as="span" color="blue.600" className="dark:text-blue-400">
                      Seconds
                    </Text>
                  </Heading>

                  <Text
                    fontSize={{ base: 'xl', md: '2xl' }}
                    color="fg.muted"
                    maxW="2xl"
                  >
                    Powerful location API with intelligent caching, permission handling, and AI-friendly design. 
                    No mobile app required—we've got that covered.
                  </Text>

                  <HStack gap="4" flexWrap="wrap" justify={{ base: 'center', lg: 'start' }}>
                    <OutlineButton
                      onClick={() => router.push('/dashboard')}
                      size="lg"
                      fontWeight="bold"
                      px="8"
                    >
                      Create API Key Now
                      <ArrowRight className="ml-2" size={20} />
                    </OutlineButton>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => router.push('/docs')}
                    >
                      View Docs
                    </Button>
                  </HStack>

                  <HStack gap="3" justify={{ base: 'center', lg: 'start' }} flexWrap="wrap">
                    <Badge variant="subtle" size="lg" px="4" py="2">
                      <Sparkles className="inline mr-1" size={14} />
                      AI-Friendly
                    </Badge>
                    <Badge variant="subtle" size="lg" px="4" py="2">
                      <Zap className="inline mr-1" size={14} />
                      Fast Integration
                    </Badge>
                    <Badge variant="subtle" size="lg" px="4" py="2">
                      <Shield className="inline mr-1" size={14} />
                      Built-in Security
                    </Badge>
                  </HStack>
                </VStack>
              </FadeInStaggerItem>

              <FadeInStaggerItem>
                <Box display={{ base: 'none', lg: 'block' }}>
                  <Terminal />
                </Box>
              </FadeInStaggerItem>
            </Grid>
          </FadeInStagger>
        </Container>
      </Box>

      {/* Email Subscribe Section */}
      <Box as="section" pb="16" position="relative" zIndex="10">
        <Container maxW="2xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <FadeIn>
            <VStack gap="6" textAlign="center">
              <Text fontSize="lg" color="fg.muted" mb="4">
                Get notified about new features, updates, and best practices
              </Text>
              <Box width="full" maxW="md" mx="auto">
                <EmailSubscribe
                  showNameFields={true}
                  emailPlaceholder="Enter your email"
                  buttonText="Subscribe"
                  subscriberGroup="Early Adopters"
                  toastMessage="Successfully subscribed!"
                  successMessage="Thanks for subscribing! We'll keep you updated."
                />
              </Box>
            </VStack>
          </FadeIn>
        </Container>
      </Box>

      {/* Features Section */}
      <Box as="section" py="16" bg="bg.muted" position="relative" zIndex="10" className="spotlight-blur">
        <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }} position="relative" zIndex="10">
          <FadeIn>
            <VStack gap="4" mb="16" textAlign="center">
              <Heading as="h2" size={{ base: '3xl', md: '4xl' }} fontWeight="bold">
                Built for Developers Who Ship Fast
              </Heading>
              <Text fontSize="lg" color="fg.muted" maxW="3xl" mx="auto">
                Stop wrestling with location permissions, caching strategies, and mobile app development. 
                We handle the complexity so you can focus on building features.
              </Text>
            </VStack>
          </FadeIn>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="8">
            <FadeInStaggerItem>
              <Card height="full">
                <CardHeader>
                  <Box
                    mb="4"
                    display="flex"
                    h="12"
                    w="12"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="lg"
                    bg="blue.600"
                    color="white"
                    className="dark:bg-blue-500"
                  >
                    <Zap size={24} />
                  </Box>
                  <CardTitle>Deploy in Seconds</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Get started with a single API call. No complex setup, no mobile SDKs to manage. 
                    Just install, authenticate, and start tracking.
                  </CardDescription>
                </CardContent>
              </Card>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <Card height="full">
                <CardHeader>
                  <Box
                    mb="4"
                    display="flex"
                    h="12"
                    w="12"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="lg"
                    bg="purple.600"
                    color="white"
                    className="dark:bg-purple-500"
                  >
                    <Database size={24} />
                  </Box>
                  <CardTitle>Intelligent Caching</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    We handle caching, rate limiting, and data optimization automatically. 
                    Your location data is always fresh and efficiently stored.
                  </CardDescription>
                </CardContent>
              </Card>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <Card height="full">
                <CardHeader>
                  <Box
                    mb="4"
                    display="flex"
                    h="12"
                    w="12"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="lg"
                    bg="green.600"
                    color="white"
                    className="dark:bg-green-500"
                  >
                    <Lock size={24} />
                  </Box>
                  <CardTitle>Permission Handling</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    We manage location permissions, privacy compliance, and access control. 
                    No need to deal with platform-specific permission flows.
                  </CardDescription>
                </CardContent>
              </Card>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <Card height="full">
                <CardHeader>
                  <Box
                    mb="4"
                    display="flex"
                    h="12"
                    w="12"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="lg"
                    bg="orange.600"
                    color="white"
                    className="dark:bg-orange-500"
                  >
                    <Smartphone size={24} />
                  </Box>
                  <CardTitle>Mobile App Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Don't build a mobile app—we've got you covered. Use our ready-made app 
                    or integrate our API into your existing mobile solution.
                  </CardDescription>
                </CardContent>
              </Card>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <Card height="full">
                <CardHeader>
                  <Box
                    mb="4"
                    display="flex"
                    h="12"
                    w="12"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="lg"
                    bg="pink.600"
                    color="white"
                    className="dark:bg-pink-500"
                  >
                    <Sparkles size={24} />
                  </Box>
                  <CardTitle>AI-Friendly Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Built with AI agents in mind. Clean, predictable APIs that work seamlessly 
                    with LLMs and AI-powered tools.
                  </CardDescription>
                </CardContent>
              </Card>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <Card height="full">
                <CardHeader>
                  <Box
                    mb="4"
                    display="flex"
                    h="12"
                    w="12"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="lg"
                    bg="cyan.600"
                    color="white"
                    className="dark:bg-cyan-500"
                  >
                    <Code size={24} />
                  </Box>
                  <CardTitle>Developer Experience First</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    TypeScript-first, comprehensive docs, and SDKs for your favorite languages. 
                    Built by developers who understand what you need.
                  </CardDescription>
                </CardContent>
              </Card>
            </FadeInStaggerItem>
          </SimpleGrid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box as="section" py="16" position="relative" zIndex="10">
        <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <FadeInStagger>
            <VStack gap="8" alignItems="start" maxW="4xl" mx="auto">
              <FadeInStaggerItem>
                <VStack gap="6" alignItems="start">
                  <Heading as="h2" size={{ base: '3xl', md: '4xl' }} fontWeight="bold">
                    Stop Building, Start Shipping
                  </Heading>
                  <Text fontSize="lg" color="fg.muted">
                    We've solved the hard problems so you don't have to. Location tracking shouldn't 
                    require a team of mobile developers, backend engineers, and DevOps specialists. 
                    Get a production-ready location API in minutes, not months.
                  </Text>
                </VStack>
              </FadeInStaggerItem>
              <FadeInStaggerItem>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" width="full">
                  <HStack gap="3">
                    <Box
                      display="flex"
                      h="10"
                      w="10"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="md"
                      bg="blue.100"
                      className="dark:bg-blue-900"
                      color="blue.600"
                      flexShrink="0"
                    >
                      <Cpu size={18} />
                    </Box>
                    <Text fontWeight="medium">Automatic caching and optimization</Text>
                  </HStack>
                  <HStack gap="3">
                    <Box
                      display="flex"
                      h="10"
                      w="10"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="md"
                      bg="green.100"
                      className="dark:bg-green-900"
                      color="green.600"
                      flexShrink="0"
                    >
                      <Shield size={18} />
                    </Box>
                    <Text fontWeight="medium">Built-in permission and privacy management</Text>
                  </HStack>
                  <HStack gap="3">
                    <Box
                      display="flex"
                      h="10"
                      w="10"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="md"
                      bg="purple.100"
                      className="dark:bg-purple-900"
                      color="purple.600"
                      flexShrink="0"
                    >
                      <Smartphone size={18} />
                    </Box>
                    <Text fontWeight="medium">Ready-to-use mobile app included</Text>
                  </HStack>
                  <HStack gap="3">
                    <Box
                      display="flex"
                      h="10"
                      w="10"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="md"
                      bg="orange.100"
                      className="dark:bg-orange-900"
                      color="orange.600"
                      flexShrink="0"
                    >
                      <Sparkles size={18} />
                    </Box>
                    <Text fontWeight="medium">AI-friendly API design</Text>
                  </HStack>
                </SimpleGrid>
              </FadeInStaggerItem>
            </VStack>
          </FadeInStagger>
        </Container>
      </Box>

      {/* Tech Stack Section */}
      <Box as="section" py="16" bg="bg.muted" position="relative" zIndex="10">
        <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <FadeInStagger>
            <VStack gap="8" alignItems="center" textAlign="center" maxW="4xl" mx="auto">
              <FadeInStaggerItem>
                <VStack gap="6" alignItems="center">
                  <Heading as="h2" size={{ base: '3xl', md: '4xl' }} fontWeight="bold">
                    Works with Your Stack
                  </Heading>
                  <Text fontSize="lg" color="fg.muted" maxW="3xl">
                    Whether you're building with TypeScript, Python, or any other language, 
                    we've got SDKs and clear REST APIs that integrate seamlessly. 
                    No vendor lock-in, no proprietary protocols—just clean, standard APIs.
                  </Text>
                </VStack>
              </FadeInStaggerItem>
              <FadeInStaggerItem>
                <Box width="full" maxW="4xl">
                  <LogoTicker slides={techLogos} />
                </Box>
              </FadeInStaggerItem>
            </VStack>
          </FadeInStagger>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box as="section" py="16" position="relative" zIndex="10" className="spotlight-blur">
        <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }} position="relative" zIndex="10">
          <FadeIn>
            <VStack gap="4" mb="16" textAlign="center">
              <Heading as="h2" size={{ base: '3xl', md: '4xl' }} fontWeight="bold">
                Built by Developers, Trusted by Teams
              </Heading>
              <Text fontSize="lg" color="fg.muted" mb="12" maxW="3xl" mx="auto">
                See how other developers are shipping location features faster with our API.
              </Text>
            </VStack>
          </FadeIn>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap="8">
            <FadeInStaggerItem>
              <Card>
                <CardContent pt="6">
                  <HStack gap="1" mb="4">
                    {[...Array(5)].map((_, i) => (
                      <Box key={i} color="yellow.500" as="span">
                        <Star size={20} fill="currentColor" />
                      </Box>
                    ))}
                  </HStack>
                  <Text color="fg.muted" mb="6" fontSize="md" lineHeight="relaxed">
                    "We were spending weeks building location tracking infrastructure. 
                    With this API, we had it working in an afternoon. The caching and permission 
                    handling alone saved us months of work."
                  </Text>
                  <HStack gap="3" alignItems="center">
                    <Avatar.Root size="md">
                      <Avatar.Fallback>SM</Avatar.Fallback>
                    </Avatar.Root>
                    <VStack gap="0" alignItems="start">
                      <Text fontWeight="semibold">Sarah Martinez</Text>
                      <Text fontSize="sm" color="fg.muted">Senior Engineer, TechCorp</Text>
                    </VStack>
                  </HStack>
                </CardContent>
              </Card>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <Card>
                <CardContent pt="6">
                  <HStack gap="1" mb="4">
                    {[...Array(5)].map((_, i) => (
                      <Box key={i} color="yellow.500" as="span">
                        <Star size={20} fill="currentColor" />
                      </Box>
                    ))}
                  </HStack>
                  <Text color="fg.muted" mb="6" fontSize="md" lineHeight="relaxed">
                    "The AI-friendly design means our agents can integrate location features 
                    without custom code. Plus, having the mobile app ready means we didn't need 
                    to hire iOS/Android developers. Game changer."
                  </Text>
                  <HStack gap="3" alignItems="center">
                    <Avatar.Root size="md">
                      <Avatar.Fallback>JD</Avatar.Fallback>
                    </Avatar.Root>
                    <VStack gap="0" alignItems="start">
                      <Text fontWeight="semibold">James Davis</Text>
                      <Text fontSize="sm" color="fg.muted">CTO, StartupXYZ</Text>
                    </VStack>
                  </HStack>
                </CardContent>
              </Card>
            </FadeInStaggerItem>
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box as="section" py="20" bg="bg.muted" position="relative" zIndex="10">
        <Container maxW="4xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <FadeIn>
            <VStack gap="6" textAlign="center">
              <Heading as="h2" size={{ base: '3xl', md: '4xl' }} fontWeight="bold">
                Ready to Ship Location Features?
              </Heading>
              <Text fontSize="lg" color="fg.muted" mb="8">
                Get your API key and start tracking locations in seconds
              </Text>
              <VStack gap="4" width="full">
                <OutlineButton
                  onClick={() => router.push('/dashboard/keys?create=true')}
                  width="full"
                  size="lg"
                  fontWeight="bold"
                >
                  Create API Key Now
                  <ArrowRight className="ml-2" size={20} />
                </OutlineButton>
                <WordDivider word="or" />
                <Link href="/docs" style={{ width: '100%' }}>
                  <Button size="lg" variant="outline" width="full" fontSize="lg">
                    Read the Documentation
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
              </VStack>
            </VStack>
          </FadeIn>
        </Container>
      </Box>

      
    </Box>
  );
}
