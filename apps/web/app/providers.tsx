'use client';

import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { useMemo } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  // Create system on client side only to avoid SSR issues
  const system = useMemo(() => {
    const { globalCss: _, ...restConfig } = defaultConfig;
    return createSystem(restConfig);
  }, []);

  return (
    <ChakraProvider value={system}>
      {children}
    </ChakraProvider>
  );
}

