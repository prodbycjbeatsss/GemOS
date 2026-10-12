CREATE TABLE `mailchimp_settings` (
	`user_id` text PRIMARY KEY NOT NULL,
	`key_ciphertext` text NOT NULL,
	`audience_id` text NOT NULL,
	`audience_name` text NOT NULL,
	`verified_at` integer NOT NULL
);
