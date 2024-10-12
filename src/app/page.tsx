"use client";
import { Avatar } from "@nextui-org/react";
import AccountCard from "~/components/featres/account/account-card";
import InvoicesTable from "~/components/featres/invoices-table/invoces-table";
import TopUp from "~/components/featres/top-up/topup";
import Transfer from "~/components/featres/transfer/transfer";
import WithDrow from "~/components/featres/withdrow/withdrow";
import Cart from "~/components/ui/chart";
import Container from "~/components/ui/container";
import { useSession } from "~/hooks/useSession";
import { api } from "~/trpc/react";

export default function HomePage() {
  const { user } = useSession();
  const { data } = api.user.getBalanceIncomeExpences.useQuery({
    userId: user?.id ?? 0,
  });

  const chartData = [
    { name: "Income", value: data?.income ?? 0, color: "#0033ff" },
    { name: "Balance", value: data?.balance ?? 0, color: "#248c49" },
    { name: "Expenses", value: data?.expenses ?? 0, color: "#ff3030" },
  ];

  return (
    <div className="grid h-full w-full gap-3 px-2 py-2 sm:pl-[4em] md:grid-flow-col md:grid-rows-12">
      <InvoicesTable className="md:row-span-7 md:min-w-[45dvw]" />

      <Container className="min-h-[20em] md:row-span-5">
        <h1 className="text-3xl font-bold text-white">Financial Overview</h1>
        <p className="text-white">Income, Expenses, and Balance</p>
        <Cart chartData={chartData} className="h-4 rounded-r-sm md:h-8" />
      </Container>
      <Container className="overflow-x-auto px-2 md:row-span-2">
        <Transfer
          trigger={
            <Avatar
              size="md"
              fallback="+"
              className="min-w-10 cursor-pointer text-3xl font-bold"
            />
          }
        />
      </Container>
      <AccountCard
        balance={data?.balance}
        expenses={data?.expenses}
        income={data?.income}
        className="md:row-span-4"
      />

      <Container className="flex flex-col gap-3 md:row-span-6">
        <span className="py-3 text-2xl font-bold text-white">
          Top up Withdrow operation
        </span>
        <Container className="flex flex-col gap-3">
          <span className="text-2xl font-bold text-white">
            Top up your account
          </span>
          <TopUp />
        </Container>

        <Container className="flex flex-col gap-3">
          <span className="text-2xl font-bold text-white">
            Withdrow your money
          </span>
          <WithDrow />
        </Container>
      </Container>
    </div>
  );
}
