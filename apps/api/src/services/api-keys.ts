import crypto from "node:crypto";
import { and, eq, isNull } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "../db/client.js";
import { apiKeys } from "../db/schema.js";

const KEY_PREFIX = "loc";

function hashSecret(secret: string) {
  return crypto.createHash("sha256").update(secret).digest("hex");
}

export async function createApiKey(groupId: string, label: string) {
  const tokenId = nanoid(12);
  const secret = nanoid(32);
  const combined = `${KEY_PREFIX}_${tokenId}_${secret}`;

  await db.insert(apiKeys).values({
    id: tokenId,
    groupId,
    label,
    hashedSecret: hashSecret(combined),
    createdAt: new Date(),
  });

  return combined;
}

export async function revokeApiKey(keyId: string) {
  await db.update(apiKeys).set({ revokedAt: new Date() }).where(eq(apiKeys.id, keyId));
}

export async function resolveApiKey(rawKey: string) {
  const [prefix, tokenId] = rawKey.split("_", 2);
  if (prefix !== KEY_PREFIX || !tokenId) return null;

  const [record] = await db
    .select()
    .from(apiKeys)
    .where(and(eq(apiKeys.id, tokenId), isNull(apiKeys.revokedAt)))
    .limit(1);

  if (!record) return null;

  const hashed = hashSecret(rawKey);
  if (crypto.timingSafeEqual(Buffer.from(hashed), Buffer.from(record.hashedSecret))) {
    await db
      .update(apiKeys)
      .set({ lastUsedAt: new Date() })
      .where(eq(apiKeys.id, record.id));
    return record;
  }

  return null;
}
