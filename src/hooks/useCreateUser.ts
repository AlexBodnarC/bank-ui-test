import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import setToLocalStorage from "~/utils/local-storage/setToLocalStorage";

export function useCrateUser() {
  const router = useRouter();
  const { mutate, isPending } = api.user.create.useMutation({
    onSuccess: (data) => {
      setToLocalStorage("session", data);
      router.push("/");
    },
  });
  return { mutate, isPending };
}
