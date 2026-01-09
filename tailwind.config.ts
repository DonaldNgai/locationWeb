import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Scan the package source files directly (since tsconfig maps to them)
    './packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
    './packages/ui/dist/**/*.{js,mjs,tsx,jsx}',
    // Also scan node_modules as fallback
    './node_modules/@DonaldNgai/chakra-ui/src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@DonaldNgai/chakra-ui/dist/**/*.{js,mjs,tsx,jsx}',
  ],
  // @ts-expect-error - corePlugins is valid but not in TypeScript types for Tailwind v4
  corePlugins: {
    preflight: false,
  },
};

export default config;

