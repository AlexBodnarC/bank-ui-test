import { useEffect, useState } from "react";
import getFromLocalStorage from "~/utils/local-storage/getFromLocalStorage";
type Session = { id: number; name: string };

export function useSession() {
  const [user, setUser] = useState<Session>();
  useEffect(() => {
    const session = getFromLocalStorage<Session[]>("session");
    if (session) {
      setUser(session[0]);
    }
  }, []);

  return { user };
}
