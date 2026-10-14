CREATE TABLE `analytics_sync_cache` (
	`user_id` text PRIMARY KEY NOT NULL,
	`report_json` text NOT NULL,
	`updated_at` integer NOT NULL
);
