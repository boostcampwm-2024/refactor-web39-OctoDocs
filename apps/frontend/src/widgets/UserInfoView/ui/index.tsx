import { lazy, memo } from "react";
import { LogoBtn } from "@/features/pageSidebar";
import { WorkspacePanelSkeleton } from "@/features/workspace/ui/WorkspacePanelSkeleton";
import { Popover } from "@/shared/ui";
import { Suspense } from "react";

const WorkspacePanel = lazy(
  () => import("@/features/workspace/ui/WorkspacePanel"),
);

function UserInfoViewComponent() {
  return (
    <div className="flex flex-row items-center gap-2">
      <Popover align="start" offset={{ x: -7, y: 16 }}>
        <Popover.Trigger>
          <LogoBtn />
        </Popover.Trigger>
        <Popover.Content className="rounded-lg border border-neutral-200 bg-white shadow-md">
          <Suspense fallback={<WorkspacePanelSkeleton />}>
            <WorkspacePanel />
          </Suspense>
        </Popover.Content>
      </Popover>
    </div>
  );
}

export const UserInfoView = memo(UserInfoViewComponent);
