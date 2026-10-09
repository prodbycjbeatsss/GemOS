import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
export const connections = sqliteTable("youtube_connections", {
 userId: text("user_id").primaryKey(), clientId: text("client_id").notNull(), refresh: text("refresh_ciphertext").notNull(), access: text("access_ciphertext").notNull(), expiresAt: integer("expires_at").notNull(), scopes: text("scopes").notNull(), channels: text("channels_json").notNull(), updatedAt: integer("updated_at").notNull(), revision: text("revision").notNull()
});
export const pending = sqliteTable("youtube_oauth_states", {
 hash: text("state_hash").primaryKey(), userId: text("user_id").notNull(), expiresAt: integer("expires_at").notNull()
});

export const releases = sqliteTable("youtube_release_selections", {
 userId: text("user_id").notNull(), channelId: text("channel_id").notNull(), name: text("name").notNull(), videoIds: text("video_ids_json").notNull(), metadata: text("metadata_json").notNull(), fetchedAt: integer("fetched_at").notNull()
}, table => [primaryKey({ columns: [table.userId, table.channelId] })]);
export const snapshots = sqliteTable("youtube_view_snapshots", {
 userId: text("user_id").notNull(), channelId: text("channel_id").notNull(), videoId: text("video_id").notNull(), publishedAt: text("published_at").notNull(), views: integer("views").notNull(), requestedAt: integer("requested_at").notNull(), capturedAt: integer("captured_at").notNull(), source: text("source").notNull()
}, table => [primaryKey({ columns: [table.userId, table.channelId, table.videoId, table.publishedAt] })]);
export const captureRuns = sqliteTable("youtube_capture_runs", {
 id: text("id").primaryKey(), startedAt: integer("started_at").notNull(), finishedAt: integer("finished_at").notNull(), captured: integer("captured").notNull(), outcome: text("outcome").notNull()
});
