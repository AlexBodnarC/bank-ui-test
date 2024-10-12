CREATE TABLE `test-bank-ui_balance` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`balance` integer NOT NULL,
	`balance_owner` integer,
	FOREIGN KEY (`balance_owner`) REFERENCES `test-bank-ui_users`(`id`) ON UPDATE no action ON DELETE no action
);
