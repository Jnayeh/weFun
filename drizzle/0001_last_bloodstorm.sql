ALTER TABLE `images` DROP FOREIGN KEY `images_activityId_categories_id_fk`;
--> statement-breakpoint
ALTER TABLE `activities` MODIFY COLUMN `visible` boolean NOT NULL DEFAULT true;--> statement-breakpoint
ALTER TABLE `categories` MODIFY COLUMN `visible` boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE `images` MODIFY COLUMN `size` bigint unsigned;--> statement-breakpoint
ALTER TABLE `images` ADD CONSTRAINT `images_activityId_activities_id_fk` FOREIGN KEY (`activityId`) REFERENCES `activities`(`id`) ON DELETE cascade ON UPDATE no action;