import { create } from "zustand";

interface DeletePageStore {
  noteIdToDelete: number | null;
  setNoteIdToDelete: (noteIdToDelete: number | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: () => void;
}

export const useDeletePageStore = create<DeletePageStore>((set) => ({
  noteIdToDelete: null,
  setNoteIdToDelete: (noteIdToDelete: number | null) => set({ noteIdToDelete }),
  isModalOpen: false,
  setIsModalOpen: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}));
