import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/client.js";
import { apiKeys, groups } from "../db/schema.js";
import { createApiKey } from "../services/api-keys.js";
import { requireAuth } from "../utils/auth.js";

const apiKeyResponse = z.object({
  id: z.string(),
  label: z.string(),
  createdAt: z.string(),
  lastUsedAt: z.string().nullable(),
});

export async function registerApiKeyRoutes(app: FastifyInstance) {
  app.post(
    "/groups/:groupId/api-keys",
    {
      schema: {
        tags: ["API Keys"],
        summary: "Issue a new API key",
        params: z.object({ groupId: z.string().min(4) }),
        body: z.object({ label: z.string().min(3) }),
        response: {
          201: z.object({ apiKey: z.string() }),
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const auth = await requireAuth(request, reply);
      const { groupId } = request.params as { groupId: string };
      const body = request.body as { label: string };

      const ownerId = auth.sub ?? "anonymous";
      const [group] = await db
        .select()
        .from(groups)
        .where(and(eq(groups.id, groupId), eq(groups.ownerId, ownerId)));

      if (!group) {
        reply.code(404);
        throw new Error("Group not found");
      }

      const apiKey = await createApiKey(group.id, body.label);
      reply.code(201).send({ apiKey });
    }
  );

  app.get(
    "/groups/:groupId/api-keys",
    {
      schema: {
        tags: ["API Keys"],
        summary: "List API keys",
        params: z.object({ groupId: z.string().min(4) }),
        response: {
          200: z.object({ items: z.array(apiKeyResponse) }),
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const auth = await requireAuth(request, reply);
      const { groupId } = request.params as { groupId: string };
      const ownerId = auth.sub ?? "anonymous";

      const [group] = await db
        .select()
        .from(groups)
        .where(and(eq(groups.id, groupId), eq(groups.ownerId, ownerId)));

      if (!group) {
        reply.code(404);
        throw new Error("Group not found");
      }

      const rows = await db.select().from(apiKeys).where(eq(apiKeys.groupId, group.id));
      reply.send({
        items: rows.map((row: typeof apiKeys.$inferSelect) => ({
          id: row.id,
          label: row.label,
          createdAt: row.createdAt?.toISOString() ?? new Date().toISOString(),
          lastUsedAt: row.lastUsedAt?.toISOString() ?? null,
        })),
      });
    }
  );
}
