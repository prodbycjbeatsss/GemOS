CREATE TABLE `automation_sync_targets` (
	`user_id` text NOT NULL,
	`automation` text NOT NULL,
	`target_json` text NOT NULL,
	`updated_at` integer NOT NULL,
	PRIMARY KEY(`user_id`, `automation`)
);
