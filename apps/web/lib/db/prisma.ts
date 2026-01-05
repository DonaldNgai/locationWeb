import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env files in workspace root
// From apps/web/lib/db/prisma.ts, go up 4 levels to workspace root
const workspaceRoot = resolve(__dirname, '../../../../');
dotenv.config(); // Loads .env
dotenv.config({ path: resolve(workspaceRoot, '.env') });

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is not set');
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
