import { relations } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const groups = sqliteTable("groups", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    ownerId: text("owner_id").notNull(),
    apiBaseUrl: text("api_base_url"),
    createdAt: integer("created_at", { mode: "timestamp" }),
});
export const members = sqliteTable("members", {
    id: text("id").primaryKey(),
    groupId: text("group_id")
        .notNull()
        .references(() => groups.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    status: text("status").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }),
});
export const apiKeys = sqliteTable("api_keys", {
    id: text("id").primaryKey(),
    groupId: text("group_id")
        .notNull()
        .references(() => groups.id, { onDelete: "cascade" }),
    label: text("label").notNull(),
    hashedSecret: text("hashed_secret").notNull(),
    lastUsedAt: integer("last_used_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" }),
    revokedAt: integer("revoked_at", { mode: "timestamp" }),
});
export const locations = sqliteTable("locations", {
    id: text("id").primaryKey(),
    groupId: text("group_id")
        .notNull()
        .references(() => groups.id, { onDelete: "cascade" }),
    deviceId: text("device_id").notNull(),
    latitude: real("latitude").notNull(),
    longitude: real("longitude").notNull(),
    accuracy: real("accuracy"),
    speed: real("speed"),
    heading: real("heading"),
    recordedAt: integer("recorded_at", { mode: "timestamp" }).notNull(),
    receivedAt: integer("received_at", { mode: "timestamp" }),
    payloadVersion: text("payload_version").default("v1"),
    metadata: text("metadata"),
});
export const groupRelations = relations(groups, ({ many }) => ({
    members: many(members),
    apiKeys: many(apiKeys),
    locations: many(locations),
}));
export const memberRelations = relations(members, ({ one }) => ({
    group: one(groups, {
        fields: [members.groupId],
        references: [groups.id],
    }),
}));
export const apiKeyRelations = relations(apiKeys, ({ one }) => ({
    group: one(groups, {
        fields: [apiKeys.groupId],
        references: [groups.id],
    }),
}));
export const locationRelations = relations(locations, ({ one }) => ({
    group: one(groups, {
        fields: [locations.groupId],
        references: [groups.id],
    }),
}));
