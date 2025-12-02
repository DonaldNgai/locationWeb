import { hash } from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * Hash a password for database storage
 * Used only for seeding the database with test users
 */
export async function hashPassword(password: string) {
  return hash(password, SALT_ROUNDS);
}
