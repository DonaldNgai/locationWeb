import Link from 'next/link';
import { ArrowRight, Key, Zap, Shield, Book } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Location Tracking API
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Real-time location tracking made simple. Get started in seconds with our powerful API.
          </p>
          <Link
            href="/api/auth/login?returnTo=/dashboard/keys"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
          >
            Create API Key
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <Key className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Instant API Keys</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get your API key in seconds. No credit card required to start.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <Zap className="h-12 w-12 text-yellow-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Stream location updates in real-time with our WebSocket API.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <Shield className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enterprise-grade security with 99.9% uptime SLA.
            </p>
          </div>
        </div>

        {/* Documentation CTA */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <Book className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Comprehensive Documentation</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Explore our API documentation with interactive examples and guides.
            </p>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              View Documentation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

