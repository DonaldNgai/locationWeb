'use client';

import { useEffect, useRef } from 'react';

export default function DocsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Readme.io integration
    // Replace 'YOUR_README_PROJECT' with your actual Readme.io project identifier
    const readmeProject = process.env.NEXT_PUBLIC_README_PROJECT || 'your-project';
    
    if (containerRef.current) {
      // Load Readme.io documentation
      const script = document.createElement('script');
      script.src = `https://${readmeProject}.readme.io/embed.js`;
      script.async = true;
      containerRef.current.appendChild(script);

      return () => {
        // Cleanup
        if (containerRef.current && script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete API reference and guides
          </p>
        </div>
        <div ref={containerRef} className="min-h-screen">
          {/* Readme.io embed will be loaded here */}
          <div className="text-center py-16 text-gray-500">
            Loading documentation...
          </div>
        </div>
      </div>
    </div>
  );
}

