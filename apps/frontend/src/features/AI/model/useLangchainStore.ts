import { create } from "zustand";

interface langchainStore {
  history: { question: string; answer: string }[];
  setHistory: (currQuestion: string, currAnswer: string) => void;
  currQuestion: string;
  currAnswer: string;
  setCurrQuestion: (newQuestion: string) => void;
  setCurrAnswer: (answerOrUpdater: string | ((prev: string) => string)) => void;
}

export const useLangchainStore = create<langchainStore>((set) => ({
  history: [],
  setHistory: (currQuestion: string, currAnswer: string) =>
    set((state) => ({
      history: [
        { question: currQuestion, answer: currAnswer },
        ...state.history,
      ],
    })),
  currQuestion: "",
  currAnswer: "",
  setCurrQuestion: (newQuestion: string) => set({ currQuestion: newQuestion }),
  setCurrAnswer: (answerOrUpdater: string | ((prev: string) => string)) =>
    set((state) => ({
      currAnswer:
        typeof answerOrUpdater === "function"
          ? answerOrUpdater(state.currAnswer)
          : answerOrUpdater,
    })),
}));
