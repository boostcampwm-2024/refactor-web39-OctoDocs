import { useEffect, useState } from "react";

import { Node, NoteNodeData } from "@/entities/node";
import {
  useDeletePage,
  useDeletePageStore,
  usePageStore,
} from "@/entities/page";
import useConnectionStore from "@/shared/model/useConnectionStore";

export const useNoteList = () => {
  const { setCurrentPage } = usePageStore();

  const [pages, setPages] = useState<NoteNodeData[]>();
  const { canvas } = useConnectionStore();

  useEffect(() => {
    if (!canvas.provider) return;
    const nodesMap = canvas.provider.doc.getMap("nodes");

    const initializePages = () => {
      const yNodes = Array.from(nodesMap.values()) as Node[];
      const data = yNodes.map((yNode) => yNode.data) as NoteNodeData[];
      setPages(data);
    };

    initializePages();

    nodesMap.observe(() => {
      initializePages();
    });

    return () => {
      nodesMap.unobserve(initializePages);
    };
  }, [canvas.provider]);

  const { noteIdToDelete, setNoteIdToDelete, isModalOpen, setIsModalOpen } =
    useDeletePageStore();

  const deleteMutation = useDeletePage();

  const handleNoteClick = (id: number) => {
    setCurrentPage(id);
  };

  const openModal = (noteId: number) => {
    setNoteIdToDelete(noteId);
    setIsModalOpen();
  };

  const onConfirm = () => {
    if (noteIdToDelete === null) {
      return;
    }

    if (!canvas.provider) return;

    const nodesMap = canvas.provider.doc.getMap("nodes");
    nodesMap.delete(noteIdToDelete.toString());
    deleteMutation.mutate({ id: noteIdToDelete });

    setIsModalOpen();
    setCurrentPage(null);
  };

  const onCloseModal = () => {
    setIsModalOpen();
  };

  return {
    pages,
    isModalOpen,
    handleNoteClick,
    openModal,
    onConfirm,
    onCloseModal,
  };
};
