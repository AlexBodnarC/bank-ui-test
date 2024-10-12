"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useSession } from "~/hooks/useSession";
import { api } from "~/trpc/react";
import { cn } from "~/utils/tailwind-merge";

export default function InvoicesTable({ className }: { className?: string }) {
  const { user } = useSession();
  const { data: invoices } = api.user.getInvoices.useQuery({
    userId: user?.id ?? 0,
  });

  return (
    <Table aria-label="Invoices Table" className={cn(className)}>
      <TableHeader>
        <TableColumn>Invoice</TableColumn>
        <TableColumn>Type</TableColumn>
        <TableColumn>Method</TableColumn>
        <TableColumn>Amount</TableColumn>
      </TableHeader>
      {invoices ? (
        <TableBody>
          {invoices.map((i) => (
            <TableRow className="text-white" key={i.id}>
              <TableCell>{i.invoiceId}</TableCell>
              <TableCell>{i.type}</TableCell>
              <TableCell>{i.transferType}</TableCell>
              <TableCell>{i.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody>
          <TableRow className="text-white">
            <TableCell>no id</TableCell>
            <TableCell>no type</TableCell>
            <TableCell>no type</TableCell>
            <TableCell>no amount</TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  );
}
