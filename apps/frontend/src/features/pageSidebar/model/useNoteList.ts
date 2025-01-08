import { useEffect, useState } from "react";

import { Node, NoteNodeData } from "@/entities/node";
import { useDeletePage, usePageStore } from "@/entities/page";
import useConnectionStore from "@/shared/model/useConnectionStore";

export const useNoteList = () => {
  const { setCurrentPage } = usePageStore();

  const [pages, setPages] = useState<NoteNodeData[]>();
  const { canvas } = useConnectionStore();

  useEffect(() => {
    if (!canvas.provider) return;
    const nodesMap = canvas.provider.doc.getMap("nodes");

    nodesMap.observe(() => {
      const yNodes = Array.from(nodesMap.values()) as Node[];
      const data = yNodes.map((yNode) => yNode.data) as NoteNodeData[];
      setPages(data);
    });
  }, [canvas.provider]);

  const [noteIdToDelete, setNoteIdToDelete] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteMutation = useDeletePage();

  const handleNoteClick = (id: number) => {
    setCurrentPage(id);
  };

  const openModal = (noteId: number) => {
    setNoteIdToDelete(noteId);
    setIsModalOpen(true);
  };

  const onConfirm = () => {
    if (noteIdToDelete === null) {
      return;
    }

    if (!canvas.provider) return;

    const nodesMap = canvas.provider.doc.getMap("nodes");
    nodesMap.delete(noteIdToDelete.toString());
    deleteMutation.mutate({ id: noteIdToDelete });

    setIsModalOpen(false);
    setCurrentPage(null);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
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
