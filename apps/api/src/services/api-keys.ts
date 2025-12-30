import crypto from "node:crypto";
import { nanoid } from "nanoid";
import { prisma as db } from "@db/prisma.js";

const KEY_PREFIX = "loc";

function hashSecret(secret: string) {
  return crypto.createHash("sha256").update(secret).digest("hex");
}

export async function createApiKey(groupId: string, label: string, userId?: string) {
  const tokenId = nanoid(12);
  const secret = nanoid(32);
  const combined = `${KEY_PREFIX}_${tokenId}_${secret}`;
  const hashed = hashSecret(combined);

  await db.apiKey.create({
    data: {
      id: tokenId,
      groupId,
      userId: userId ?? null,
      label,
      hashedSecret: hashed,
    },
  });

  return combined;
}

export async function revokeApiKey(keyId: string) {
  await db.apiKey.update({
    where: { id: keyId },
    data: { revokedAt: new Date() },
  });
}

export async function resolveApiKey(rawKey: string) {
  const [prefix, tokenId] = rawKey.split("_", 2);
  if (prefix !== KEY_PREFIX || !tokenId) return null;

  const record = await db.apiKey.findFirst({
    where: {
      id: tokenId,
      revokedAt: null,
    },
  });

  if (!record) return null;

  const hashed = hashSecret(rawKey);
  if (crypto.timingSafeEqual(Buffer.from(hashed), Buffer.from(record.hashedSecret))) {
    await db.apiKey.update({
      where: { id: record.id },
      data: { lastUsedAt: new Date() },
    });
    return record;
  }

  return null;
}
