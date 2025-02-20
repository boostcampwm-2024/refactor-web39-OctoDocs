import { QuestionForm } from "../QuestionForm";
import { useLangchainStore } from "../../model/useLangchainStore";
import { ExampleBlock } from "../ExampleBlock";
import { QnA } from "../QnA";
import { useEffect, useRef } from "react";

export function AIPanel() {
  const { history, currQuestion, currAnswer } = useLangchainStore();
  const currQnARef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currQnARef.current) {
      currQnARef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currQuestion]);

  return (
    <div className="z-8 absolute left-0 top-full mt-2 flex h-[76vh] w-[26vw] min-w-[340px] flex-col items-center rounded-md border-[1px] border-neutral-200 bg-white p-4 text-black shadow-md">
      <QuestionForm />

      <div className="mt-2 flex w-full flex-grow overflow-y-auto">
        {currQuestion ? (
          <div className="text-md w-full p-1">
            <div ref={currQnARef}>
              <QnA question={currQuestion} answer={currAnswer} />
            </div>
            {history.map((h, i) => (
              <QnA key={i} question={h.question} answer={h.answer} />
            ))}
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-6 text-center text-lg font-medium">
            문서에서 원하는 정보를 찾아드릴게요.
            <br />
            질문을 입력해 주세요!
            <div className="flex w-full justify-center gap-6">
              <ExampleBlock>2월 12일에 하기로 한 작업이 있었나?</ExampleBlock>
              <ExampleBlock>모든 회의록을 모아서 요약해줘</ExampleBlock>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
