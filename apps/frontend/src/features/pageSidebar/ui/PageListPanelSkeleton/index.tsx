import { Skeleton } from "@/shared/ui";

export function PageListPanelSkelton() {
  return (
    <div className="mx-4 mb-4 h-[30px] w-[206px] flex-col pb-4">
      <Skeleton className="mt-2 h-[28px] w-[207px] px-4" />
    </div>
  );
}
