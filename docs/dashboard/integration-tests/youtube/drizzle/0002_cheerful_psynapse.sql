CREATE TABLE `payhip_events` (
	`user_id` text NOT NULL,
	`event_hash` text NOT NULL,
	`transaction_id` text NOT NULL,
	`type` text NOT NULL,
	`currency` text NOT NULL,
	`price` integer NOT NULL,
	`refunded` integer NOT NULL,
	`occurred_at` integer NOT NULL,
	`received_at` integer NOT NULL,
	`items_json` text NOT NULL,
	PRIMARY KEY(`user_id`, `event_hash`)
);
--> statement-breakpoint
CREATE TABLE `payhip_settings` (
	`user_id` text PRIMARY KEY NOT NULL,
	`connection_id` text NOT NULL,
	`signature_ciphertext` text,
	`monthly_target` integer,
	`updated_at` integer NOT NULL,
	`verified_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `payhip_settings_connection_id_unique` ON `payhip_settings` (`connection_id`);