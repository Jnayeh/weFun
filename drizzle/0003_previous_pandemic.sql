CREATE TABLE `activities` (
	`id` int NOT NULL,
	`label` varchar(255),
	`description` text,
	`location` varchar(255),
	`price` real,
	`visible` int DEFAULT 1,
	`discount` real DEFAULT 0,
	`capacity` int,
	`activity_duration` int,
	`createdAt` timestamp,
	`modifiedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`categoryId` int NOT NULL,
	CONSTRAINT `activities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int NOT NULL,
	`label` varchar(255),
	`details` text,
	`image` varchar(255),
	`visible` int DEFAULT 1,
	`createdAt` timestamp,
	`modifiedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `images` (
	`id` int NOT NULL,
	`filename` varchar(255),
	`size` int,
	`createdAt` timestamp,
	`modifiedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`activityId` int,
	CONSTRAINT `images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `activities` ADD CONSTRAINT `activities_categoryId_categories_id_fk` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `images` ADD CONSTRAINT `images_activityId_categories_id_fk` FOREIGN KEY (`activityId`) REFERENCES `categories`(`id`) ON DELETE cascade ON UPDATE no action;