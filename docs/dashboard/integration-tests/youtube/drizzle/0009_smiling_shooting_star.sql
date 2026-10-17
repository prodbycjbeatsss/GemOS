CREATE TABLE `publishing_settings` (
	`user_id` text PRIMARY KEY NOT NULL,
	`settings_json` text NOT NULL,
	`revision` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `release_plan_state` (
	`user_id` text PRIMARY KEY NOT NULL,
	`state_json` text NOT NULL,
	`revision` integer NOT NULL,
	`updated_at` integer NOT NULL
);
