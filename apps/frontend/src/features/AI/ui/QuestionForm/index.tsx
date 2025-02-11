import { ArrowDown } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useLangchain } from "../../model/useLangchain";
interface QuestionFormType {
  onHandlePrevQustion: React.Dispatch<React.SetStateAction<string>>;
  onHandleAnswer: React.Dispatch<React.SetStateAction<string>>;
}

export function QuestionForm({
  onHandlePrevQustion,
  onHandleAnswer,
}: QuestionFormType) {
  const [question, setQuestion] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { mutateLangchain } = useLangchain();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [question]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onHandleAnswer("");
    onHandlePrevQustion(question);

    await mutateLangchain(question, (chunk: string) => {
      onHandleAnswer((prev) => prev + chunk);
    });
  };

  return (
    <form
      className="flex w-full justify-between rounded-md border-[1px] border-[#d0d9e0] bg-[#f5f6fa] px-3 py-2"
      onSubmit={handleSubmit}
    >
      <textarea
        ref={textareaRef}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={1}
        className="mt-[2px] max-h-[150px] flex-1 resize-none overflow-y-auto bg-[#f5f6fa] outline-none"
        placeholder="어떤 정보를 찾고 계신가요? 질문을 남겨주세요."
      />
      <button
        aria-label="AISubmitBtn"
        className="ml-2 flex size-7 items-center justify-center rounded-full bg-black"
      >
        <ArrowDown size={20} color="#ffffff" />
      </button>
    </form>
  );
}
