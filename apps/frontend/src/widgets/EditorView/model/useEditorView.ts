import { useEffect } from "react";

import { useUserStore } from "@/entities/user";
import { usePageStore } from "@/entities/page";
import { useEditorStore } from "@/features/editor";
import useConnectionStore from "@/shared/model/useConnectionStore";
import { useEdtorConnection } from "@/features/editor/model/useEditorConnection";

export const useEditorView = () => {
  const { currentPage } = usePageStore();
  const { isPanelOpen, isMaximized, setIsPanelOpen } = useEditorStore();
  useEdtorConnection(currentPage);
  const { editor } = useConnectionStore();
  const { users } = useUserStore();

  useEffect(() => {
    if (currentPage) return;
    setIsPanelOpen(false);
  }, [currentPage]);

  useEffect(() => {
    if (!currentPage) return;
    setIsPanelOpen(true);
  }, [currentPage]);

  return {
    currentPage,
    isPanelOpen,
    isMaximized,
    ydoc: editor.provider?.doc,
    provider: editor.provider,
    users,
  };
};
