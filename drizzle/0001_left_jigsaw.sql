ALTER TABLE `activities` ADD `categoryId` bigint NOT NULL;--> statement-breakpoint
ALTER TABLE `images` ADD `activityId` bigint;--> statement-breakpoint
ALTER TABLE `activities` ADD CONSTRAINT `activities_categoryId_categories_id_fk` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `images` ADD CONSTRAINT `images_activityId_activities_id_fk` FOREIGN KEY (`activityId`) REFERENCES `activities`(`id`) ON DELETE cascade ON UPDATE no action;