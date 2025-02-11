import { useState } from "react";
import { QuestionForm } from "../QuestionForm";
import { Divider } from "@/shared/ui";

export function AIPanel() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  return (
    <div className="z-8 absolute left-0 top-full mt-2 flex h-[720px] w-[500px] flex-col items-center rounded-md border-[1px] border-neutral-200 bg-white p-4 text-black shadow-md">
      <QuestionForm
        onHandlePrevQustion={setQuestion}
        onHandleAnswer={setAnswer}
      />

      <div className="mt-4 flex w-full flex-grow overflow-y-auto px-4">
        {question ? (
          <div className="text-md">
            <div className="font-bold">{question}</div>
            <Divider direction="horizontal" className="my-3" />
            <div className="font-light">{answer}</div>
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
