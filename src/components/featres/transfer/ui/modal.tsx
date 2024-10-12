"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useState, type ReactNode } from "react";
import { z } from "zod";
import { useSession } from "~/hooks/useSession";
import { api } from "~/trpc/react";

const transferSchema = z.object({
  iban: z.string().regex(/^[A-Za-z]{2}/, {
    message: "IBAN must start with exactly two letters.",
  }),
  amount: z.number(),
});

export default function FormModal({ children }: { children?: ReactNode }) {
  const [iban, setIban] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [error, setError] = useState<string[]>();
  const { user } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const utils = api.useUtils();
  const { mutate } = api.user.withdrow.useMutation({
    onSuccess: () => utils.invalidate(),
  });

  const handleSubmit = (onClose: () => void) => {
    const res = transferSchema.safeParse({
      iban: iban,
      amount: amount,
    });
    if (!res.success) {
      const messges = res.error.issues.map((m) => m.message);
      return setError(messges);
    }

    mutate({ userId: user?.id ?? 0, amount: res.data?.amount ?? 0 });
    onClose();
    setError(undefined);
  };

  return (
    <>
      <div onClick={onOpen}>{children}</div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="text-white dark"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Transfer by Iban
              </ModalHeader>
              <ModalBody className="pb-4">
                <Input
                  onChange={(e) => setIban(e.target.value)}
                  label="IBAN"
                  size="sm"
                  variant="bordered"
                />
                {error?.[0] ? (
                  <span className="rounded-md bg-red-500 p-2 text-white">
                    {error[0]}
                  </span>
                ) : null}
                <div className="flex gap-2">
                  <Input
                    type="number"
                    onChange={(e) => setAmount(Number(e.target.value))}
                    label="Amount"
                    size="sm"
                    variant="bordered"
                  />
                  <Button
                    size="lg"
                    onClick={() => handleSubmit(onClose)}
                    className="rounded-md bg-white text-black"
                  >
                    Submit
                  </Button>
                </div>
                {error?.[1] ? (
                  <span className="rounded-md bg-red-500 p-2 text-white">
                    {error[0]}
                  </span>
                ) : null}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
