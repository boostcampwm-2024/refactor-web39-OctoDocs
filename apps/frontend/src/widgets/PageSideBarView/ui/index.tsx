import { useState, lazy, Suspense } from "react";

import { TopNavView } from "@/widgets/TopNavView";
import { PageListPanelSkelton } from "@/features/pageSidebar";

const PageListPanel = lazy(
  () => import("@/features/pageSidebar/ui/PageListPanel"),
);

export function PageSideBarView() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="z-10 flex w-60 flex-col rounded-xl border-[1px] border-neutral-200 bg-white text-black shadow-md">
      <div className="p-2">
        <TopNavView onExpand={handleExpand} isExpanded={isExpanded} />
      </div>
      {isExpanded && (
        <Suspense fallback={<PageListPanelSkelton />}>
          <PageListPanel />
        </Suspense>
      )}
    </div>
  );
}
