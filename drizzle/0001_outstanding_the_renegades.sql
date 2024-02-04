CREATE TABLE `locations` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`label` varchar(255),
	`cover` varchar(255),
	`visible` smallint DEFAULT 1,
	`latitude` real,
	`longitude` real,
	`createdAt` timestamp DEFAULT (now()),
	`modifiedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `locations_id` PRIMARY KEY(`id`)
);
