import { ArrowDown, Square } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useLangchain } from "../../model/useLangchain";
import { useLangchainStore } from "../../model/useLangchainStore";
import { useQnA } from "../../model/useQnA";

export function QuestionForm() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [newQuestion, setnewQuestion] = useState("");
  const { setCurrAnswer } = useLangchainStore();
  const { mutateLangchain, stopStreaming, isLoading } = useLangchain();
  const { updateQnA } = useQnA();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newQuestion]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) stopStreaming();
    else if (!newQuestion) return;
    else {
      setnewQuestion("");
      updateQnA(newQuestion);

      await mutateLangchain(newQuestion, (chunk: string) => {
        setCurrAnswer((prev) => prev + chunk);
      });
    }
  };

  return (
    <form
      className="flex w-full justify-between rounded-md border-[1px] border-[#d0d9e0] bg-[#f5f6fa] px-3 py-2"
      onSubmit={handleSubmit}
    >
      <textarea
        ref={textareaRef}
        value={newQuestion}
        onChange={(e) => setnewQuestion(e.target.value)}
        rows={1}
        className="mt-[2px] max-h-[150px] flex-1 resize-none overflow-y-auto bg-[#f5f6fa] outline-none"
        placeholder="어떤 정보를 알고 싶으신가요? 질문을 남겨주세요."
      />
      <button
        aria-label="AISubmitBtn"
        className="ml-2 flex size-7 items-center justify-center rounded-full bg-black"
      >
        {isLoading ? (
          <Square size={16} color="#ffffff" />
        ) : (
          <ArrowDown size={20} color="#ffffff" />
        )}
      </button>
    </form>
  );
}
