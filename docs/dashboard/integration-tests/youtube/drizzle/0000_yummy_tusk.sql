CREATE TABLE `youtube_connections` (
	`user_id` text PRIMARY KEY NOT NULL,
	`client_id` text NOT NULL,
	`refresh_ciphertext` text NOT NULL,
	`access_ciphertext` text NOT NULL,
	`expires_at` integer NOT NULL,
	`scopes` text NOT NULL,
	`channels_json` text NOT NULL,
	`updated_at` integer NOT NULL,
	`revision` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `youtube_oauth_states` (
	`state_hash` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL
);
