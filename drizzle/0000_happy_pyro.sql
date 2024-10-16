CREATE TABLE `activities` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`label` varchar(255),
	`description` text,
	`cover` varchar(255),
	`location` varchar(255),
	`price` real NOT NULL,
	`visible` smallint NOT NULL DEFAULT 1,
	`discount` int DEFAULT 0,
	`capacity` int NOT NULL,
	`activity_duration` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `activities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`label` varchar(255),
	`details` text,
	`cover` varchar(255),
	`visible` smallint DEFAULT 1,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `images` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`filename` varchar(255),
	`url` text,
	`blur_url` text,
	`size` bigint unsigned,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`label` varchar(255),
	`cover` varchar(255),
	`visible` smallint DEFAULT 1,
	`latitude` real,
	`longitude` real,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `locations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `we_fun_post` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `we_fun_post_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `we_fun_post` (`name`);