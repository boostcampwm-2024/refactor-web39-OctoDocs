import { useLangchainStore } from "./useLangchainStore";

export const useQnA = () => {
  const {
    setPrevQustions,
    setPrevAnswers,
    currQuestion,
    currAnswer,
    setCurrAnswer,
    setCurrQuestion,
  } = useLangchainStore();

  const updateQnA = (newQuestion: string) => {
    setPrevQustions(currQuestion);
    setPrevAnswers(currAnswer);

    setCurrAnswer("");
    setCurrQuestion(newQuestion);
  };

  return { updateQnA };
};
