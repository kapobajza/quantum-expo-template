CREATE TABLE `mutations` (
	`id` text PRIMARY KEY NOT NULL,
	`mutationKey` text,
	`value` text NOT NULL,
	`queryClientId` integer,
	FOREIGN KEY (`queryClientId`) REFERENCES `query_clients`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `queries` (
	`queryHash` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	`queryClientId` integer NOT NULL,
	FOREIGN KEY (`queryClientId`) REFERENCES `query_clients`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `query_clients` (
	`id` integer PRIMARY KEY NOT NULL,
	`timestamp` integer NOT NULL,
	`buster` text NOT NULL
);
