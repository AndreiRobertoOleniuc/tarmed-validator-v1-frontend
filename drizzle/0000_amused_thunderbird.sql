CREATE TABLE `document_images` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`document_id` text NOT NULL,
	`uri` text NOT NULL,
	`width` integer NOT NULL,
	`height` integer NOT NULL,
	`exif` text,
	FOREIGN KEY (`document_id`) REFERENCES `documents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `documents` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `overall_summaries` (
	`document_id` text PRIMARY KEY NOT NULL,
	`datum` text NOT NULL,
	`titel` text NOT NULL,
	`gesamtbetrag` real NOT NULL,
	FOREIGN KEY (`document_id`) REFERENCES `documents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tarmed_positions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`document_id` text NOT NULL,
	`datum` text NOT NULL,
	`tarif` text NOT NULL,
	`tarifziffer` text NOT NULL,
	`bezugsziffer` text NOT NULL,
	`beschreibung` text NOT NULL,
	`anzahl` integer NOT NULL,
	`betrag` real NOT NULL,
	FOREIGN KEY (`document_id`) REFERENCES `documents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tarmed_summaries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`document_id` text NOT NULL,
	`datum` text NOT NULL,
	`emoji` text NOT NULL,
	`titel` text NOT NULL,
	`beschreibung` text NOT NULL,
	`operation` text NOT NULL,
	`reasoning` text,
	`betrag` real NOT NULL,
	FOREIGN KEY (`document_id`) REFERENCES `documents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tarmed_summary_relevant_ids` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tarmed_summary_id` integer NOT NULL,
	`relevant_id` integer NOT NULL,
	FOREIGN KEY (`tarmed_summary_id`) REFERENCES `tarmed_summaries`(`id`) ON UPDATE no action ON DELETE no action
);
