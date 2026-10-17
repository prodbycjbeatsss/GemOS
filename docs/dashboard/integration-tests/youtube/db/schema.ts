import { sqliteTable, text, integer, primaryKey, index } from "drizzle-orm/sqlite-core";
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

export const payhipSettings = sqliteTable("payhip_settings", {
 userId: text("user_id").primaryKey(), connectionId: text("connection_id").notNull().unique(), signature: text("signature_ciphertext"), target: integer("monthly_target"), updatedAt: integer("updated_at").notNull(), verifiedAt: integer("verified_at")
});
export const payhipEvents = sqliteTable("payhip_events", {
 userId: text("user_id").notNull(), eventHash: text("event_hash").notNull(), transactionId: text("transaction_id").notNull(), type: text("type").notNull(), currency: text("currency").notNull(), price: integer("price").notNull(), refunded: integer("refunded").notNull(), occurredAt: integer("occurred_at").notNull(), receivedAt: integer("received_at").notNull(), items: text("items_json").notNull()
}, table => [primaryKey({ columns: [table.userId, table.eventHash] })]);

export const payhipMappings = sqliteTable("payhip_mappings", {
 userId: text("user_id").notNull(), optionKey: text("option_key").notNull(), tier: text("tier").notNull(), updatedAt: integer("updated_at").notNull()
}, table => [primaryKey({ columns: [table.userId, table.optionKey] })]);
export const payhipExclusions = sqliteTable("payhip_exclusions", {
 userId: text("user_id").notNull(), transactionId: text("transaction_id").notNull(), updatedAt: integer("updated_at").notNull()
}, table => [primaryKey({ columns: [table.userId, table.transactionId] })]);

export const mailchimpSettings = sqliteTable('mailchimp_settings', {
 userId:text('user_id').primaryKey(), key:text('key_ciphertext').notNull(), audienceId:text('audience_id').notNull(), audienceName:text('audience_name').notNull(), verifiedAt:integer('verified_at').notNull()
});

export const studioPaymentSnapshots = sqliteTable('studio_payment_snapshots', {
 userId:text('user_id').notNull(), accountId:text('account_id').notNull(), channelId:text('channel_id').notNull(), snapshotJson:text('snapshot_json').notNull(), updatedAt:integer('updated_at').notNull()
}, table=>[primaryKey({columns:[table.userId,table.accountId,table.channelId]})]);

// Durable automation attempts and per-owner checker execution lease.
export const automationRuns = sqliteTable('automation_runs', {
 id:text('id').primaryKey(), userId:text('user_id').notNull(), automation:text('automation').notNull(), trigger:text('trigger').notNull(), status:text('status').notNull(), startedAt:integer('started_at').notNull(), finishedAt:integer('finished_at'), errorCode:text('error_code'), resultJson:text('result_json'), contextKey:text('context_key'), retryOf:text('retry_of'), rootId:text('root_id').notNull(), issueState:text('issue_state').notNull().default('none'), resolvedBy:text('resolved_by'), dismissedReason:text('dismissed_reason'), dismissedAt:integer('dismissed_at')
},table=>[index('automation_runs_owner_time').on(table.userId,table.startedAt),index('automation_runs_owner_issue').on(table.userId,table.issueState,table.status)]);
export const automationLocks = sqliteTable('automation_locks', {
 userId:text('user_id').notNull(), automation:text('automation').notNull(), runId:text('run_id').notNull(), expiresAt:integer('expires_at').notNull()
},table=>[primaryKey({columns:[table.userId,table.automation]})]);

// Last successful, allowlisted read-only sync selections; never credentials/provider payloads.
export const automationSyncTargets = sqliteTable('automation_sync_targets', {
 userId:text('user_id').notNull(),automation:text('automation').notNull(),targetJson:text('target_json').notNull(),updatedAt:integer('updated_at').notNull()
},table=>[primaryKey({columns:[table.userId,table.automation]})]);

export const analyticsSyncCache=sqliteTable('analytics_sync_cache',{userId:text('user_id').primaryKey(),reportJson:text('report_json').notNull(),updatedAt:integer('updated_at').notNull()});

export const publishingSettings=sqliteTable('publishing_settings',{userId:text('user_id').primaryKey(),settingsJson:text('settings_json').notNull(),revision:integer('revision').notNull(),updatedAt:integer('updated_at').notNull()});
export const releasePlanState=sqliteTable('release_plan_state',{userId:text('user_id').primaryKey(),stateJson:text('state_json').notNull(),revision:integer('revision').notNull(),updatedAt:integer('updated_at').notNull()});
