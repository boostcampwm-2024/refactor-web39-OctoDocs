import { Skeleton } from "@/shared/ui";

export function ProfilePanelSkeleton() {
  return (
    <div className="m-2 flex h-[242px] w-[450px] flex-row gap-4 p-6">
      <Skeleton className="h-[192px] w-[240px]"></Skeleton>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-[62px] w-[144px]"></Skeleton>
        <Skeleton className="h-[62px] w-[144px]"></Skeleton>
      </div>
    </div>
  );
}
