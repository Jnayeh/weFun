ALTER TABLE `activities` MODIFY COLUMN `visible` smallint NOT NULL DEFAULT 1;--> statement-breakpoint
ALTER TABLE `categories` MODIFY COLUMN `visible` smallint DEFAULT 1;