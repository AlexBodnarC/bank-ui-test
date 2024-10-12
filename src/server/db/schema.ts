import { sql } from "drizzle-orm";
import { int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => `test-bank-ui_${name}`);

export const users = createTable("users", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

export const invoices = createTable("invoices", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  invoiceId: text("invoice_id").unique().notNull(),
  type: text("type", { enum: ["Paid", "Income"] }).notNull(),
  amount: int("amount").notNull(),
  transferType: text("transfer_type", { enum: ["Bank", "Paypal"] }).notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
  invoiceOwner: int("invoice_owner").references(() => users.id),
});

export const balance = createTable("balance", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  balance: int("balance", { mode: "number" }).notNull(),
  balanceOwner: int("balance_owner").references(() => users.id),
});
