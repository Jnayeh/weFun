ALTER TABLE `activities` MODIFY COLUMN `price` real NOT NULL;--> statement-breakpoint
ALTER TABLE `activities` MODIFY COLUMN `visible` int NOT NULL DEFAULT 1;--> statement-breakpoint
ALTER TABLE `activities` MODIFY COLUMN `capacity` int NOT NULL;--> statement-breakpoint
ALTER TABLE `activities` MODIFY COLUMN `activity_duration` int NOT NULL;