import { cn } from "@/shared/lib";
import { memo } from "react";

interface DividerProps {
  className?: string;
  direction: "horizontal" | "vertical";
}

function DividerComponent({ className, direction }: DividerProps) {
  return (
    <div
      className={cn(
        "rounded-sm",
        direction === "horizontal" ? "h-0.5 bg-divider" : "w-0.5 bg-divider",
        className,
      )}
    ></div>
  );
}

export const Divider = memo(DividerComponent);
