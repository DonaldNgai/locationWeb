import { Button } from '@repo/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/card';
import { Badge } from '@repo/ui/badge';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '@repo/ui/fade-in';
import { ArrowRight, Code, Zap, Rocket, Terminal, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { WordDivider } from '@repo/ui/word-divider';

export default function HomePage() {
  return (
    <main className="min-h-screen relative bg-background">
      {/* Subtle background image */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/50 to-white/90 dark:from-gray-950/90 dark:via-gray-950/50 dark:to-gray-950/90" />
      </div>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInStagger className="text-center max-w-4xl mx-auto">
            <FadeInStaggerItem>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Badge variant="outline" className="text-sm py-1 px-3 border-primary">
                  <Code className="h-3 w-3 mr-1" />
                  For Developers
                </Badge>
              </div>
            </FadeInStaggerItem>
            <FadeInStaggerItem>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                Location Tracking Backend
                <br />
                <span className="text-primary">Scaffolded by AI</span>
              </h1>
            </FadeInStaggerItem>
            <FadeInStaggerItem>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Get location tracking up and running in minutes, not weeks. No need to build an entire
                tech stack just to track where your people are.
              </p>
            </FadeInStaggerItem>
            <FadeInStaggerItem>
              <div className="flex flex-wrap gap-3 justify-center mb-12">
                <Badge variant="secondary" className="text-sm py-2 px-4">
                  <Sparkles className="h-3 w-3 mr-1 inline" />
                  AI-Powered
                </Badge>
                <Badge variant="secondary" className="text-sm py-2 px-4">
                  <Zap className="h-3 w-3 mr-1 inline" />
                  Quick Setup
                </Badge>
                <Badge variant="secondary" className="text-sm py-2 px-4">
                  <Rocket className="h-3 w-3 mr-1 inline" />
                  Production Ready
                </Badge>
              </div>
            </FadeInStaggerItem>
            <FadeInStaggerItem>
              <p className="text-sm text-muted-foreground mb-8 pt-12">
                Built for developers who need location tracking <span className="font-bold italic">fast</span>
              </p>
            </FadeInStaggerItem>
          </FadeInStagger>
        </div>
      </section>

      {/* AI Scaffolding Section */}
      <section className="py-16 bg-muted/50 spotlight-blur relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">AI-Powered Scaffolding</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                This location tracking backend was created so AI can help scaffold projects easily.
                Get a complete, production-ready location tracking system without building databases,
                APIs, authentication, or mapping infrastructure from scratch.
              </p>
            </div>
          </FadeIn>

          <FadeInStagger className="grid md:grid-cols-3 gap-8">
            <FadeInStaggerItem>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <CardTitle>AI-Assisted Setup</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Let AI help you scaffold and customize your location tracking project in minutes.
                  </CardDescription>
                </CardContent>
              </Card>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Zap className="h-6 w-6" />
                  </div>
                  <CardTitle>No Tech Stack Overhead</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Skip building databases, APIs, and infrastructure. Everything you need is already
                    here.
                  </CardDescription>
                </CardContent>
              </Card>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Rocket className="h-6 w-6" />
                  </div>
                  <CardTitle>Get Started in Minutes</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Clone, configure, and deploy. Start tracking locations without weeks of setup.
                  </CardDescription>
                </CardContent>
              </Card>
            </FadeInStaggerItem>
          </FadeInStagger>
        </div>
      </section>

      {/* Easy Setup Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInStagger className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInStaggerItem>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Get Location Tracking Running Fast
                </h2>
                <p className="text-lg text-muted-foreground mb-4">
                  You don't need to build an entire tech stack just to get the location of some people.
                  This backend gives you everything you need: user management, location tracking, APIs,
                  and a complete admin dashboard.
                </p>
                <p className="text-lg text-muted-foreground">
                  Perfect for developers who need location tracking functionality without the weeks of
                  infrastructure setup. Let AI help you scaffold and customize it to your needs.
                </p>
              </div>
            </FadeInStaggerItem>
            <FadeInStaggerItem>
              <div className="relative rounded-lg overflow-hidden aspect-video bg-muted flex items-center justify-center">
                <Terminal className="h-24 w-24 text-muted-foreground/50" />
              </div>
            </FadeInStaggerItem>
          </FadeInStagger>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 bg-muted/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInStagger className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInStaggerItem>
              <div className="order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative rounded-lg overflow-hidden aspect-square bg-primary/10 flex items-center justify-center">
                    <Code className="h-16 w-16 text-primary" />
                  </div>
                  <div className="relative rounded-lg overflow-hidden aspect-square bg-primary/10 flex items-center justify-center">
                    <Terminal className="h-16 w-16 text-primary" />
                  </div>
                </div>
              </div>
            </FadeInStaggerItem>
            <FadeInStaggerItem>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Everything You Need</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  A complete location tracking backend with user management, authentication, APIs,
                  database schemas, and admin dashboard—all ready to deploy.
                </p>
                <p className="text-lg text-muted-foreground">
                  No need to piece together multiple services or build infrastructure from scratch.
                  Everything is included and ready for AI-assisted customization.
                </p>
              </div>
            </FadeInStaggerItem>
          </FadeInStagger>
        </div>
      </section>

      {/* Developer Benefits Section */}
      <section className="py-16 relative spotlight-blur z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Built for Developers, Powered by AI
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                This location tracking backend was designed from the ground up to be easily scaffolded
                and customized with AI assistance. Get started in minutes, not weeks.
              </p>
            </div>
          </FadeIn>

          <FadeInStagger className="grid md:grid-cols-2 gap-8">
            <FadeInStaggerItem>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Code className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">AI-Assisted Customization</h3>
                  <p className="text-muted-foreground">
                    Let AI help you scaffold and customize this backend to match your exact needs.
                    The codebase is structured to make AI-assisted modifications easy and reliable.
                  </p>
                </CardContent>
              </Card>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Rocket className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Skip the Infrastructure Setup</h3>
                  <p className="text-muted-foreground">
                    No need to build databases, set up authentication, create APIs, or configure
                    mapping services. Everything is already here and ready to deploy.
                  </p>
                </CardContent>
              </Card>
            </FadeInStaggerItem>
          </FadeInStagger>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Clone the repository and let AI help you scaffold your location tracking project. Get
              up and running in minutes, not weeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-in">
                <Button size="lg" className="text-lg cursor-pointer w-full sm:w-auto">
                  View Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="lg" variant="outline" className="text-lg cursor-pointer w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
