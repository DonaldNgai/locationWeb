import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma as db } from "@db/prisma.js";
import { createApiKey } from "@services/api-keys.js";
import { requireAuth } from "@utils/auth.js";
import { zodToJsonSchemaFastify } from "@utils/zod-to-json-schema.js";

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
        params: zodToJsonSchemaFastify(z.object({ groupId: z.string().min(4) })),
        body: zodToJsonSchemaFastify(z.object({ label: z.string().min(3) })),
        response: {
          201: zodToJsonSchemaFastify(z.object({ apiKey: z.string() })),
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const auth = await requireAuth(request, reply);
      const { groupId } = request.params as { groupId: string };
      const body = request.body as { label: string };

      // Find user
      let user = await db.user.findFirst({
        where: {
          OR: [{ email: auth.email as string }, { id: auth.sub }],
        },
      });

      if (!user && auth.email) {
        user = await db.user.create({
          data: {
            email: auth.email as string,
            name: auth.name as string | undefined,
          },
        });
      }

      const group = await db.group.findFirst({
        where: {
          id: groupId,
          ownerId: user?.id ?? auth.sub ?? "anonymous",
        },
      });

      if (!group) {
        reply.code(404);
        throw new Error("Group not found");
      }

      const apiKey = await createApiKey(group.id, body.label, user?.id);
      reply.code(201).send({ apiKey });
    }
  );

  app.get(
    "/groups/:groupId/api-keys",
    {
      schema: {
        tags: ["API Keys"],
        summary: "List API keys",
        params: zodToJsonSchemaFastify(z.object({ groupId: z.string().min(4) })),
        response: {
          200: zodToJsonSchemaFastify(z.object({ items: z.array(apiKeyResponse) })),
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const auth = await requireAuth(request, reply);
      const { groupId } = request.params as { groupId: string };

      // Find user
      let user = await db.user.findFirst({
        where: {
          OR: [{ email: auth.email as string }, { id: auth.sub }],
        },
      });

      if (!user && auth.email) {
        user = await db.user.create({
          data: {
            email: auth.email as string,
            name: auth.name as string | undefined,
          },
        });
      }

      const group = await db.group.findFirst({
        where: {
          id: groupId,
          ownerId: user?.id ?? auth.sub ?? "anonymous",
        },
      });

      if (!group) {
        reply.code(404);
        throw new Error("Group not found");
      }

      const rows = await db.apiKey.findMany({
        where: { groupId: group.id, revokedAt: null },
      });

      reply.send({
        items: rows.map((row) => ({
          id: row.id,
          label: row.label,
          createdAt: row.createdAt.toISOString(),
          lastUsedAt: row.lastUsedAt?.toISOString() ?? null,
        })),
      });
    }
  );
}
