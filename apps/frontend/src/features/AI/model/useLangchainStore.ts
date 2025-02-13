import { create } from "zustand";

interface langchainStore {
  question: string;
  answer: string;
  setQuestion: (question: string) => void;
  setAnswer: (answer: string | ((prev: string) => string)) => void;
}

export const useLangchainStore = create<langchainStore>((set) => ({
  question: "",
  answer: "",
  setQuestion: (question: string) => set({ question }),
  setAnswer: (answerOrUpdater: string | ((prev: string) => string)) =>
    set((state) => ({
      answer:
        typeof answerOrUpdater === "function"
          ? answerOrUpdater(state.answer)
          : answerOrUpdater,
    })),
}));
