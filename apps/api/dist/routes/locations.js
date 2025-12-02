import { nanoid } from "nanoid";
import { z } from "zod";
import { db } from "../db/client.js";
import { locations } from "../db/schema.js";
import { locationBus } from "../services/bus.js";
import { requireApiKey } from "../utils/api-key.js";
const locationPayload = z.object({
    deviceId: z.string().min(3).max(128),
    latitude: z.number().gte(-90).lte(90),
    longitude: z.number().gte(-180).lte(180),
    accuracy: z.number().nonnegative().optional(),
    heading: z.number().min(0).max(360).optional(),
    speed: z.number().min(0).optional(),
    recordedAt: z.coerce.date(),
    payloadVersion: z.string().default("v1"),
    metadata: z.record(z.any()).optional(),
});
const ingestionResponse = z.object({
    id: z.string(),
    receivedAt: z.string(),
});
const KEEPALIVE_MS = 15000;
export async function registerLocationRoutes(app) {
    app.post("/locations", {
        schema: {
            tags: ["Locations"],
            summary: "Submit a device location update",
            body: locationPayload,
            response: { 202: ingestionResponse },
            security: [{ apiKey: [] }],
        },
    }, async (request, reply) => {
        const apiKey = await requireApiKey(request, reply);
        const body = locationPayload.parse(request.body);
        const payload = {
            id: nanoid(16),
            groupId: apiKey.groupId,
            deviceId: body.deviceId,
            latitude: body.latitude,
            longitude: body.longitude,
            accuracy: body.accuracy ?? null,
            heading: body.heading ?? null,
            speed: body.speed ?? null,
            recordedAt: body.recordedAt,
            payloadVersion: body.payloadVersion,
            metadata: body.metadata ? JSON.stringify(body.metadata) : null,
            receivedAt: new Date(),
        };
        const [record] = await db.insert(locations).values(payload).returning();
        locationBus.publishLocation(apiKey.groupId, {
            deviceId: body.deviceId,
            latitude: body.latitude,
            longitude: body.longitude,
            accuracy: body.accuracy ?? null,
            heading: body.heading ?? null,
            speed: body.speed ?? null,
            recordedAt: body.recordedAt,
            metadata: body.metadata ?? null,
            payloadVersion: body.payloadVersion,
        });
        reply.code(202).send({
            id: record.id,
            receivedAt: record.receivedAt?.toISOString() ?? new Date().toISOString(),
        });
    });
    app.get("/stream", {
        schema: {
            tags: ["Locations"],
            summary: "Subscribe to live location events",
            security: [{ apiKey: [] }],
        },
    }, async (request, reply) => {
        const apiKey = await requireApiKey(request, reply);
        openLocationStream(reply, apiKey.groupId);
    });
}
function openLocationStream(reply, groupId) {
    reply.raw.setHeader("Content-Type", "text/event-stream");
    reply.raw.setHeader("Cache-Control", "no-cache");
    reply.raw.setHeader("Connection", "keep-alive");
    reply.raw.setHeader("X-Accel-Buffering", "no");
    reply.hijack();
    const res = reply.raw;
    const send = (event, data) => {
        res.write(`event: ${event}\n`);
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };
    send("ready", { groupId });
    const unsubscribe = locationBus.subscribe(groupId, (event) => {
        send(event.type, event.data);
    });
    const heartbeat = setInterval(() => {
        send("heartbeat", { groupId, timestamp: new Date().toISOString() });
    }, KEEPALIVE_MS);
    heartbeat.unref?.();
    res.on("close", () => {
        clearInterval(heartbeat);
        unsubscribe();
        res.end();
    });
}
