import { create } from "zustand";

interface langchainStore {
  prevQustions: string[];
  prevAnswers: string[];
  setPrevQustions: (currQuestion: string) => void;
  setPrevAnswers: (currQuestion: string) => void;
  currQuestion: string;
  currAnswer: string;
  setCurrQuestion: (newQuestion: string) => void;
  setCurrAnswer: (answerOrUpdater: string | ((prev: string) => string)) => void;
}

export const useLangchainStore = create<langchainStore>((set) => ({
  prevQustions: [],
  prevAnswers: [],
  setPrevQustions: (currQuestion: string) =>
    set((state) => ({
      prevQustions: [currQuestion, ...state.prevQustions],
    })),
  setPrevAnswers: (currAnswer: string) =>
    set((state) => ({
      prevAnswers: [currAnswer, ...state.prevAnswers],
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
