"use client";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { z } from "zod";
import Container from "~/components/ui/container";
import { useCrateUser } from "~/hooks/useCreateUser";

const inputSchema = z.object({
  input: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(12, "Max lenght of name is 12 characters"),
});

export default function Login() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string>();
  const { mutate, isPending } = useCrateUser();

  const handleSetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    const res = inputSchema.safeParse({ input });

    if (!res.success) {
      setError(res.error.issues[0]?.message);
    }
    if (res.data) {
      mutate({ name: res.data.input });
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <Container className="flex max-w-[25em] flex-col gap-2 py-2 text-white">
        <h1 className="py-2 text-2xl font-bold">
          Please enter your name to create an account!
        </h1>
        <Input
          variant="bordered"
          label="Name"
          size="sm"
          onChange={handleSetInput}
        />
        {error ? (
          <span className="rounded-md bg-red-500 p-2 text-white">{error}</span>
        ) : null}
        <Button
          className="w-full rounded-md bg-white text-black"
          onClick={handleSubmit}
        >
          {isPending ? "Loading..." : "Create an account"}
        </Button>
      </Container>
    </div>
  );
}
