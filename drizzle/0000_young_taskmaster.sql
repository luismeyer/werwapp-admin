CREATE TABLE `songs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` enum('day','night'),
	`artist` varchar(50) NOT NULL,
	`title` varchar(50) NOT NULL,
	`songPage` varchar(255) NOT NULL,
	`songUrl` varchar(255) NOT NULL,
	CONSTRAINT `songs_id` PRIMARY KEY(`id`)
);
