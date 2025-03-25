import { useEffect } from "react";

import { useUserStore } from "@/entities/user";
import { usePageStore } from "@/entities/page";
import { useEditorStore } from "@/features/editor";
import useConnectionStore from "@/shared/model/useConnectionStore";
import { useEdtorConnection } from "@/features/editor/model/useEditorConnection";

export const useEditorView = () => {
  const { currentPage } = usePageStore();
  const { isPanelOpen, isMaximized, setIsPanelOpen, toggleMaximized } =
    useEditorStore();
  useEdtorConnection(currentPage);
  const { editor } = useConnectionStore();
  const { users } = useUserStore();

  useEffect(() => {
    if (isMaximized) {
      history.pushState(null, "");
    }

    const handlePopState = () => {
      toggleMaximized();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isMaximized]);

  useEffect(() => {
    setIsPanelOpen(!!currentPage);
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
