import { type ReactNode } from "react";
import { cn } from "~/utils/tailwind-merge";

export default function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        className,
        `rounded-lg border-2 border-white bg-transparent p-3`,
      )}
    >
      {children}
    </div>
  );
}
