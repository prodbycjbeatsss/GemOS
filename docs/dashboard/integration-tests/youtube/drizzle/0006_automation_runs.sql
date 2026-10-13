CREATE TABLE `automation_locks` (
	`user_id` text NOT NULL,
	`automation` text NOT NULL,
	`run_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	PRIMARY KEY(`user_id`, `automation`)
);
--> statement-breakpoint
CREATE TABLE `automation_runs` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`automation` text NOT NULL,
	`trigger` text NOT NULL,
	`status` text NOT NULL,
	`started_at` integer NOT NULL,
	`finished_at` integer,
	`error_code` text,
	`result_json` text,
	`context_key` text,
	`retry_of` text,
	`root_id` text NOT NULL,
	`issue_state` text DEFAULT 'none' NOT NULL,
	`resolved_by` text,
	`dismissed_reason` text,
	`dismissed_at` integer
);
--> statement-breakpoint
CREATE INDEX `automation_runs_owner_time` ON `automation_runs` (`user_id`,`started_at`);--> statement-breakpoint
CREATE INDEX `automation_runs_owner_issue` ON `automation_runs` (`user_id`,`issue_state`,`status`);