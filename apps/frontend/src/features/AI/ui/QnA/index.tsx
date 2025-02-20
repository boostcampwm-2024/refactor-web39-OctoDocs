import ReactMarkdown from "react-markdown";

interface QnAType {
  question: string;
  answer: string;
}

export function QnA({ question, answer }: QnAType) {
  return (
    <div className="py-3">
      <div className="mb-1 w-full rounded-md border-[1px] border-[#d0d9e0] bg-[#f5f6fa] px-3 py-2 font-bold">
        {question}
      </div>
      <div className="min-h-[100px] p-2">
        <ReactMarkdown>{answer}</ReactMarkdown>
      </div>
    </div>
  );
}
