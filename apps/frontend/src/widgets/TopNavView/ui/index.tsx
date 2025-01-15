import { Menu, X } from "lucide-react";

import { WorkspaceNav } from "@/features/pageSidebar";
import { useCurrentWorkspace } from "@/features/workspace";
import { UserInfoView } from "@/widgets/UserInfoView";
import { Divider, Skeleton } from "@/shared/ui";
import { Suspense } from "react";

interface TopNavProps {
  onExpand: () => void;
  isExpanded: boolean;
}
export function TopNavView({ onExpand, isExpanded }: TopNavProps) {
  const { data } = useCurrentWorkspace();

  const getWorkspaceTitle = () => {
    if (!data) return "";

    if (data.workspace.workspaceId === "main") return "공용 워크스페이스";

    return data.workspace.title;
  };

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-2">
        <UserInfoView />
        <Divider direction="vertical" className="h-3" />
        <Suspense fallback={<Skeleton className="h-[24px] w-[110px]" />}>
          <WorkspaceNav title={getWorkspaceTitle()} />
        </Suspense>
      </div>
      <div className="flex h-7 w-7 items-center justify-center">
        <button onClick={onExpand} aria-label="MenuBtn">
          {isExpanded ? (
            <X color="#3F3F3F" />
          ) : (
            <Menu size={24} color="#3F3F3F" />
          )}
        </button>
      </div>
    </div>
  );
}
