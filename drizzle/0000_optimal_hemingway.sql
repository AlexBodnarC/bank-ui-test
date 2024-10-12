CREATE TABLE `test-bank-ui_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `test-bank-ui_invoices` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`invoice_id` text NOT NULL,
	`type` text NOT NULL,
	`amount` integer NOT NULL,
	`transfer_type` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`invoice_owner` integer,
	FOREIGN KEY (`invoice_owner`) REFERENCES `test-bank-ui_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `test-bank-ui_invoices_invoice_id_unique` ON `test-bank-ui_invoices` (`invoice_id`);