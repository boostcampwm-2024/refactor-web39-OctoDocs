import { useState } from "react";
import { QuestionForm } from "../QuestionForm";
import { useLangchain } from "../../model/useLangchain";

export function AIPanel() {
  const [question, setQuestion] = useState("");
  const { data: answer, isPending, mutate } = useLangchain();
  console.log(answer);
  return (
    <div className="z-8 absolute left-0 top-full mt-2 flex h-[720px] w-[500px] flex-col items-center rounded-md border-[1px] border-neutral-200 bg-white p-4 text-black shadow-md">
      <QuestionForm onHandlePrevQustion={setQuestion} mutate={mutate} />

      <div className="mt-4 flex w-full flex-grow overflow-y-auto px-4">
        {question ? (
          <div className="text-md">
            <div className="font-bold">{question}</div>
            <hr className="my-3" />
            {isPending ? (
              <>로딩 중</>
            ) : (
              <div className="font-light">{answer?.response}</div>
            )}
          </div>
        ) : (
          <div className="text-md flex h-full w-full items-center justify-center text-center font-medium">
            문서에서 원하는 정보를 찾아드릴게요.
            <br />
            질문을 입력해 주세요!
          </div>
        )}
      </div>
    </div>
  );
}
