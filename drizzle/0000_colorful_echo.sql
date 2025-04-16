CREATE TABLE `game` (
	`id` text(21) PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`deleted_at` integer,
	`date` integer NOT NULL,
	`season` text NOT NULL,
	`home_team_id` text NOT NULL,
	`visitor_team_id` text NOT NULL,
	`home_team_score` integer,
	`visitor_team_score` integer,
	FOREIGN KEY (`home_team_id`) REFERENCES `team`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`visitor_team_id`) REFERENCES `team`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `player_game_stats` (
	`id` text(21) PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`deleted_at` integer,
	`minutes_played` integer,
	`fg_made` integer,
	`fg_attempts` integer,
	`fg_three_made` integer,
	`fg_three_att` integer,
	`ft_made` integer,
	`ft_att` integer,
	`offensive_rebounds` integer,
	`defensive_rebounds` integer,
	`blocks` integer,
	`assists` integer,
	`steals` integer,
	`turnovers` integer,
	`points` integer,
	`game_id` text NOT NULL,
	`player_id` text NOT NULL,
	FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`player_id`) REFERENCES `player`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `player` (
	`id` text(21) PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`deleted_at` integer,
	`name` text NOT NULL,
	`position` text,
	`height` text,
	`weight` integer,
	`team_id` text,
	FOREIGN KEY (`team_id`) REFERENCES `team`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `team` (
	`id` text(21) PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`deleted_at` integer,
	`name` text NOT NULL,
	`conference` text,
	`division` text,
	`city` text,
	`full_name` text,
	`abbreviation` text
);
--> statement-breakpoint
CREATE TABLE `user_favorite_player` (
	`id` text(21) PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`deleted_at` integer,
	`user_id` text NOT NULL,
	`player_id` text NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `player`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_favorite_team` (
	`id` text(21) PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`deleted_at` integer,
	`user_id` text NOT NULL,
	`team_id` text NOT NULL,
	FOREIGN KEY (`team_id`) REFERENCES `team`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text(21) PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`deleted_at` integer,
	`name` text,
	`email` text NOT NULL,
	`role` text NOT NULL,
	`last_seen` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);