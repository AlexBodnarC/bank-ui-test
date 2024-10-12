import { type ReactNode } from "react";
import { cn } from "~/utils/tailwind-merge";

interface IContainer extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export default function Container({ className, children }: IContainer) {
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
