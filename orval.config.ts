import dotenv from 'dotenv';
import { defineConfig } from 'orval';

// Load environment variables from .env file
dotenv.config();

// Get backend API URL from .env, with fallback to localhost
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3000';

console.log(`Using backend API URL: ${BACKEND_API_URL}`);

export default defineConfig({
  api: {
    input: {
      // Point to your Fastify Swagger JSON endpoint
      target: `${BACKEND_API_URL}/docs/json`,
    },
    output: {
      target: './lib/generated/api/index.ts',
      baseUrl: BACKEND_API_URL,
    }
  }
});
