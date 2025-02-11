import { ArrowDown } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [question]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onHandlePrevQustion(question);
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/api/langchain",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify({ query: question }),
      },
    );

    const reader = response
      .body!!.pipeThrough(new TextDecoderStream())
      .getReader();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      console.log("Received: ", value);
      onHandleAnswer((prev) => prev + value);
    }
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
