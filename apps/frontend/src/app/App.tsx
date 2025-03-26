import { lazy, Suspense } from "react";
import { useSyncedUsers } from "@/entities/user";
import { usePageStore } from "@/entities/page";
import { useProtectedWorkspace } from "@/features/workspace";
import { CanvasView } from "@/widgets/CanvasView";
import { PageSideBarView } from "@/widgets/PageSideBarView";
import { AIToolView } from "@/widgets/AIToolView";
import { CanvasToolsView } from "@/widgets/CanvasToolsView";
import { EditorViewSkeleton } from "@/widgets/EditorView";
import { SideWrapper, Skeleton } from "@/shared/ui";

const EditorView = lazy(() => import("@/widgets/EditorView"));
const NodeToolsView = lazy(() => import("@/widgets/NodeToolsView"));

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
          <Suspense fallback={<EditorViewSkeleton />}>
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
        <AIToolView />
        <CanvasToolsView />
        {currentPage && (
          <Suspense
            fallback={<Skeleton className="h-[48px] w-[48px] rounded-xl" />}
          >
            <NodeToolsView />
          </Suspense>
        )}
      </SideWrapper>
    </div>
  );
}

export default App;
