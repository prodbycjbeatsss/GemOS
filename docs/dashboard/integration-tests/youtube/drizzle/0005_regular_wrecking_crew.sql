CREATE TABLE `studio_payment_snapshots` (
	`user_id` text NOT NULL,
	`account_id` text NOT NULL,
	`channel_id` text NOT NULL,
	`snapshot_json` text NOT NULL,
	`updated_at` integer NOT NULL,
	PRIMARY KEY(`user_id`, `account_id`, `channel_id`)
);
