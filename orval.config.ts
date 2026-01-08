import dotenv from 'dotenv';
import { defineConfig } from 'orval';

// Load environment variables from .env file
dotenv.config();

// Get server URL from .env, with fallback to localhost
const SERVER_URL = process.env.SERVER_URL || process.env.EXPO_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3000';

console.log(`Using server URL: ${SERVER_URL}`);

export default defineConfig({
  api: {
    input: {
      // Point to your Fastify Swagger JSON endpoint
      target: `${SERVER_URL}/docs/json`,
    },
    output: {
      target: './lib/generated/api/index.ts',
      baseUrl: SERVER_URL,
    }
  }
});
