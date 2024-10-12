"use client";
import { Banknote } from "lucide-react";
import Container from "~/components/ui/container";
import { cn } from "~/utils/tailwind-merge";

export default function AccountCard({
  className,
  balance,
  income,
  expenses,
}: {
  balance?: number;
  income?: number;
  expenses?: number;
  className?: string;
}) {
  return (
    <Container
      id="account-card"
      className={cn(
        className,
        `flex flex-col justify-between rounded-lg border-2 border-white bg-transparent p-3 text-white`,
      )}
    >
      <div className="flex justify-between text-lg font-medium">
        <span>Balance</span>
        <Banknote className="size-8" />
      </div>
      <div className="flex justify-between text-lg font-medium">
        <span className="text-xl font-bold uppercase">usd {balance}</span>
      </div>

      <div className="flex justify-between text-lg font-medium">
        <div className="flex flex-col gap-1">
          <span className="text-sm">Income</span>
          <span className="uppercase">usd {income}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm">Expenses</span>
          <span className="uppercase">usd {expenses}</span>
        </div>
      </div>
    </Container>
  );
}
