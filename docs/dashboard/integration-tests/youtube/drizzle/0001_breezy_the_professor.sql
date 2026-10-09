CREATE TABLE `youtube_capture_runs` (
	`id` text PRIMARY KEY NOT NULL,
	`started_at` integer NOT NULL,
	`finished_at` integer NOT NULL,
	`captured` integer NOT NULL,
	`outcome` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `youtube_release_selections` (
	`user_id` text NOT NULL,
	`channel_id` text NOT NULL,
	`name` text NOT NULL,
	`video_ids_json` text NOT NULL,
	`metadata_json` text NOT NULL,
	`fetched_at` integer NOT NULL,
	PRIMARY KEY(`user_id`, `channel_id`)
);
--> statement-breakpoint
CREATE TABLE `youtube_view_snapshots` (
	`user_id` text NOT NULL,
	`channel_id` text NOT NULL,
	`video_id` text NOT NULL,
	`published_at` text NOT NULL,
	`views` integer NOT NULL,
	`requested_at` integer NOT NULL,
	`captured_at` integer NOT NULL,
	`source` text NOT NULL,
	PRIMARY KEY(`user_id`, `channel_id`, `video_id`, `published_at`)
);
