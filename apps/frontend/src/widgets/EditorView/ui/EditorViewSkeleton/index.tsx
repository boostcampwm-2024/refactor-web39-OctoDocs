import { Skeleton } from "@/shared/ui";

export function EditorViewSkeleton() {
  return (
    <div className="absolute right-4 top-4 flex h-[720px] w-[520px] flex-col rounded-lg border bg-white shadow-lg">
      <Skeleton className="mx-4 my-2 h-[24px] w-[52px]"></Skeleton>
      <div className="flex flex-col gap-4 px-12 py-4">
        <div className="flex flex-1 flex-col gap-3">
          <Skeleton className="h-16 w-16"></Skeleton>
          <Skeleton className="h-[40px] w-full"></Skeleton>
        </div>
        <Skeleton className="h-[20px] w-[1/2]"></Skeleton>
        <Skeleton className="h-[30px] w-full"></Skeleton>
      </div>
    </div>
  );
}
