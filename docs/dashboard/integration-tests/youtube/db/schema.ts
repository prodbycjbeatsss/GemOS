import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const connections = sqliteTable("youtube_connections", {
 userId: text("user_id").primaryKey(), clientId: text("client_id").notNull(), refresh: text("refresh_ciphertext").notNull(), access: text("access_ciphertext").notNull(), expiresAt: integer("expires_at").notNull(), scopes: text("scopes").notNull(), channels: text("channels_json").notNull(), updatedAt: integer("updated_at").notNull(), revision: text("revision").notNull()
});
export const pending = sqliteTable("youtube_oauth_states", {
 hash: text("state_hash").primaryKey(), userId: text("user_id").notNull(), expiresAt: integer("expires_at").notNull()
});
