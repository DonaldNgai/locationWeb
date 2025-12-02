import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { db } from "../db/client.js";
import { groups, members } from "../db/schema.js";
import { requireAuth } from "../utils/auth.js";
const groupResponse = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    apiBaseUrl: z.string().nullable(),
    createdAt: z.string(),
});
export async function registerGroupRoutes(app) {
    app.post("/groups", {
        schema: {
            tags: ["Groups"],
            summary: "Create a new location group",
            body: z.object({
                name: z.string().min(3),
                description: z.string().optional(),
                apiBaseUrl: z.string().url().optional(),
            }),
            response: {
                201: groupResponse,
            },
        },
    }, async (request, reply) => {
        const auth = await requireAuth(request, reply);
        const body = request.body;
        const [record] = await db
            .insert(groups)
            .values({
            id: nanoid(10),
            name: body.name,
            description: body.description,
            apiBaseUrl: body.apiBaseUrl,
            ownerId: auth.sub ?? "anonymous",
            createdAt: new Date(),
        })
            .returning();
        reply.code(201).send({
            id: record.id,
            name: record.name,
            description: record.description ?? null,
            apiBaseUrl: record.apiBaseUrl ?? null,
            createdAt: record.createdAt?.toISOString() ?? new Date().toISOString(),
        });
    });
    app.get("/groups", {
        schema: {
            tags: ["Groups"],
            summary: "List groups you own",
            response: {
                200: z.object({ items: z.array(groupResponse) }),
            },
        },
    }, async (request, reply) => {
        const auth = await requireAuth(request, reply);
        const ownerId = auth.sub ?? "anonymous";
        const rows = (await db.select().from(groups).where(eq(groups.ownerId, ownerId)));
        reply.send({
            items: rows.map((row) => ({
                id: row.id,
                name: row.name,
                description: row.description ?? null,
                apiBaseUrl: row.apiBaseUrl ?? null,
                createdAt: row.createdAt?.toISOString() ?? new Date().toISOString(),
            })),
        });
    });
    app.post("/groups/:groupId/join", {
        schema: {
            tags: ["Groups"],
            summary: "Submit a join request for a group",
            params: z.object({ groupId: z.string().min(4) }),
            body: z.object({
                email: z.string().email(),
                reason: z.string().max(500).optional(),
            }),
            response: {
                202: z.object({ status: z.literal("pending"), memberId: z.string() }),
            },
        },
    }, async (request, reply) => {
        const { groupId } = request.params;
        const body = request.body;
        const [member] = await db
            .insert(members)
            .values({
            id: nanoid(12),
            groupId,
            email: body.email,
            status: "pending",
            createdAt: new Date(),
        })
            .returning();
        reply.code(202).send({ status: "pending", memberId: member.id });
    });
}
