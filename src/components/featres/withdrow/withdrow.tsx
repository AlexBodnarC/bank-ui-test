"use client";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useSession } from "~/hooks/useSession";
import { api } from "~/trpc/react";
import { cn } from "~/utils/tailwind-merge";

export default function TopUp({ className }: { className?: string }) {
  const [amount, setAmount] = useState<number>();
  const { user } = useSession();

  const utils = api.useUtils();
  const { mutate, isPending } = api.user.withdrow.useMutation({
    onSuccess: () => utils.invalidate(),
  });

  const handleSubmit = () => {
    if (amount && user?.id) {
      mutate({ amount: Number(amount), userId: user.id });
    }
  };
  return (
    <div className={cn(className, "flex items-center gap-2")}>
      <Input
        type="number"
        label="Amount"
        size="sm"
        onChange={(e) => setAmount(Number(e.target.value))}
        variant="bordered"
        className="w-full text-white"
      />
      <Button
        onClick={handleSubmit}
        className="max-h-11 rounded-md bg-white text-black"
        size="lg"
      >
        {isPending ? "Loading..." : "Withdrow"}
      </Button>
    </div>
  );
}
