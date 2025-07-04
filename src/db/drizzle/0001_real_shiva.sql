ALTER TABLE `locales` RENAME COLUMN "name" TO "code";--> statement-breakpoint
DROP INDEX `locales_name_unique`;--> statement-breakpoint
ALTER TABLE `locales` ADD `tag` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `locales_code_unique` ON `locales` (`code`);--> statement-breakpoint
CREATE UNIQUE INDEX `locales_tag_unique` ON `locales` (`tag`);