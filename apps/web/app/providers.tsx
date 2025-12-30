'use client';

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";

// Create system at module level (client component context)
// This ensures the system is created once and reused
const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        // your custom colors
      }
    }
  }
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <ChakraProvider value={system}>
        {children}
      </ChakraProvider>
  );
}