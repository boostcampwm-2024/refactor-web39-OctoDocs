import { lazy, Suspense } from "react";
import { useSyncedUsers } from "@/entities/user";
import { useProtectedWorkspace } from "@/features/workspace";
import { CanvasView } from "@/widgets/CanvasView";
import { NodeToolsView } from "@/widgets/NodeToolsView";
import { PageSideBarView } from "@/widgets/PageSideBarView";
import { CanvasToolsView } from "@/widgets/CanvasToolsView";
import { SideWrapper, Skeleton } from "@/shared/ui";
import { usePageStore } from "@/entities/page";

const EditorView = lazy(() => import("@/widgets/EditorView"));

function App() {
  useSyncedUsers();
  const { isLoading } = useProtectedWorkspace();
  const { currentPage } = usePageStore();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white">
      {currentPage && (
        <SideWrapper side="right" className="z-50">
          <Suspense
            fallback={
              <Skeleton className="absolute right-4 top-4 flex h-[720px] w-[520px] flex-col rounded-lg border bg-white shadow-lg" />
            }
          >
            <EditorView />
          </Suspense>
        </SideWrapper>
      )}
      <CanvasView />
      <SideWrapper
        side="left"
        className="left-4 top-4 flex flex-row items-start gap-2"
      >
        <PageSideBarView />
        <CanvasToolsView />
        <NodeToolsView />
      </SideWrapper>
    </div>
  );
}

export default App;
