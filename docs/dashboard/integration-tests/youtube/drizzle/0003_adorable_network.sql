CREATE TABLE `payhip_exclusions` (
	`user_id` text NOT NULL,
	`transaction_id` text NOT NULL,
	`updated_at` integer NOT NULL,
	PRIMARY KEY(`user_id`, `transaction_id`)
);
--> statement-breakpoint
CREATE TABLE `payhip_mappings` (
	`user_id` text NOT NULL,
	`option_key` text NOT NULL,
	`tier` text NOT NULL,
	`updated_at` integer NOT NULL,
	PRIMARY KEY(`user_id`, `option_key`)
);
