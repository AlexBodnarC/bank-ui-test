import { select, user } from "@nextui-org/react";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { balance, invoices, users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const user = await db
        .insert(users)
        .values({ name: input.name })
        .returning();
      await db
        .insert(balance)
        .values({ balanceOwner: user[0]?.id, balance: 0 });

      return user;
    }),

  topup: publicProcedure
    .input(z.object({ userId: z.number(), amount: z.number() }))
    .mutation(async ({ input }) => {
      const userBalance = await db
        .select()
        .from(balance)
        .where(eq(balance.balanceOwner, input.userId));
      if (!userBalance[0]) return;

      await db.insert(invoices).values({
        invoiceId: `INV${Math.random().toString().slice(2, 6)}`,
        type: "Income",
        transferType: "Bank",
        invoiceOwner: input.userId,
        amount: input.amount,
      });

      const newAmount = userBalance[0]?.balance + input.amount;
      return await db
        .update(balance)
        .set({ balance: newAmount })
        .where(eq(balance.balanceOwner, input.userId));
    }),

  withdrow: publicProcedure
    .input(z.object({ userId: z.number(), amount: z.number() }))
    .mutation(async ({ input }) => {
      const userBalance = await db
        .select()
        .from(balance)
        .where(eq(balance.balanceOwner, input.userId));
      if (!userBalance[0]) return;

      await db.insert(invoices).values({
        invoiceId: `INV${Math.random().toString().slice(2, 6)}`,
        type: "Paid",
        transferType: "Bank",
        invoiceOwner: input.userId,
        amount: input.amount,
      });

      const difference = userBalance[0]?.balance - input.amount;
      return await db
        .update(balance)
        .set({ balance: difference })
        .where(eq(balance.balanceOwner, input.userId));
    }),

  getBalanceIncomeExpences: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const userBalance = await db
        .select()
        .from(balance)
        .where(eq(balance.balanceOwner, input.userId));
      console.log(userBalance);
      const userInvoices = await db
        .select()
        .from(invoices)
        .where(eq(invoices.invoiceOwner, input.userId));
      const expenses = userInvoices
        .filter((invoice) => invoice.type === "Paid")
        .reduce((acc, cur) => acc + cur.amount, 0);

      const income = userInvoices
        .filter((invoice) => invoice.type === "Income")
        .reduce((acc, cur) => acc + cur.amount, 0);

      return {
        balance: userBalance[0]?.balance,
        expenses: expenses,
        income: income,
      };
    }),
  getInvoices: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      return await db
        .select()
        .from(invoices)
        .where(eq(invoices.invoiceOwner, input.userId));
    }),
});
