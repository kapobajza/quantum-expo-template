CREATE TABLE `locales` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `locales_name_unique` ON `locales` (`name`);