import { useLangchainStore } from "./useLangchainStore";

export const useQnA = () => {
  const {
    setHistory,
    currQuestion,
    currAnswer,
    setCurrAnswer,
    setCurrQuestion,
  } = useLangchainStore();

  const updateQnA = (newQuestion: string) => {
    if (currQuestion && currAnswer) {
      setHistory(currQuestion, currAnswer);
      setCurrAnswer("");
    }

    setCurrQuestion(newQuestion);
  };

  return { updateQnA };
};
