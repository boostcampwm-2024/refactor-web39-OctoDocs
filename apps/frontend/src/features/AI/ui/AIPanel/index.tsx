import { QuestionForm } from "../QuestionForm";
import { Divider } from "@/shared/ui";
import { useLangchainStore } from "../../model/useLangchainStore";
import { ExampleBlock } from "../ExampleBlock";

export function AIPanel() {
  const { question, answer } = useLangchainStore();

  return (
    <div className="z-8 absolute left-0 top-full mt-2 flex h-[76vh] w-[26vw] min-w-[340px] flex-col items-center rounded-md border-[1px] border-neutral-200 bg-white p-4 text-black shadow-md">
      <QuestionForm />

      <div className="mt-4 flex w-full flex-grow overflow-y-auto px-4">
        {question ? (
          <div className="text-md w-full">
            <div className="font-bold">{question}</div>
            <Divider direction="horizontal" className="my-3" />
            <div className="font-light">{answer}</div>
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
