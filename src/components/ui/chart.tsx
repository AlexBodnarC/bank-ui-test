"use client";

import { cn } from "~/utils/tailwind-merge";

interface CartItem {
  name: string;
  value: number;
  color: string;
}

export type CartConfig = CartItem[];

export default function Cart({
  className,
  chartData,
}: {
  className?: string;
  chartData: CartConfig;
}) {
  const biggestValue = chartData.reduce((max, item) =>
    item.value > max.value ? item : max,
  ).value;

  return (
    <div className="flex h-full w-full items-center justify-start gap-2">
      <div className="flex h-full flex-col items-start justify-center gap-2 pb-5 text-white">
        {chartData.map((item) => (
          <span key={item.name} className="rotate-45">
            {item.name}
          </span>
        ))}
      </div>
      <div className="flex h-full w-full flex-col items-start justify-center gap-2">
        {chartData.map((item) => (
          <div
            key={item.name}
            className={cn(className, "h-10")}
            style={{
              width: `${(item.value / biggestValue) * 100}%`,
              backgroundColor: `${item.color}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
