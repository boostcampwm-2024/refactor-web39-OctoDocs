import { Skeleton } from "@/shared/ui";

export function WorkspacePanelSkeleton() {
  return (
    <div className="h-[228px] w-[282px] px-4 py-4">
      <Skeleton className="h-full w-full" />
    </div>
  );
}
