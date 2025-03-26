import { Skeleton } from "@/shared/ui";

export function SharePanelSkeleton() {
  return (
    <div className="flex h-[92px] w-[240px] flex-col gap-2 p-2">
      <Skeleton className="h-[32px] w-full"></Skeleton>
      <Skeleton className="h-[44px] w-full py-3"></Skeleton>
    </div>
  );
}
