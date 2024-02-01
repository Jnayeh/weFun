CREATE TABLE `activities` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`label` varchar(255),
	`description` text,
	`cover` varchar(255),
	`location` varchar(255),
	`price` real NOT NULL,
	`visible` smallint NOT NULL DEFAULT 1,
	`discount` int DEFAULT 0,
	`capacity` int NOT NULL,
	`activity_duration` int NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`modifiedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`categoryId` int NOT NULL,
	CONSTRAINT `activities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`label` varchar(255),
	`details` text,
	`cover` varchar(255),
	`visible` smallint DEFAULT 1,
	`createdAt` timestamp DEFAULT (now()),
	`modifiedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `images` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`filename` varchar(255),
	`size` int,
	`createdAt` timestamp DEFAULT (now()),
	`modifiedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`activityId` int,
	CONSTRAINT `images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `activities` ADD CONSTRAINT `activities_categoryId_categories_id_fk` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `images` ADD CONSTRAINT `images_activityId_categories_id_fk` FOREIGN KEY (`activityId`) REFERENCES `categories`(`id`) ON DELETE cascade ON UPDATE no action;