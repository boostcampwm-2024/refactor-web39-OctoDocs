import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function QuestionForm() {
  const [question, setQuestion] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [question]);

  return (
    <form className="flex w-full justify-between rounded-md border-[1px] border-[#d0d9e0] bg-[#f5f6fa] px-3 py-2">
      <textarea
        ref={textareaRef}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={1}
        className="mt-[2px] max-h-[150px] w-[360px] resize-none overflow-y-auto bg-[#f5f6fa] outline-none"
        placeholder="어떤 정보를 찾고 계신가요? 질문을 남겨주세요."
      />
      <button
        aria-label="AISubmitBtn"
        className="flex size-7 items-center justify-center rounded-full bg-black"
      >
        <ArrowDown size={20} color="#ffffff" />
      </button>
    </form>
  );
}
