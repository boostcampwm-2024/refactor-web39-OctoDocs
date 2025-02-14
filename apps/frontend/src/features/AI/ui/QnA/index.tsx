import { Divider } from "@/shared/ui";

interface QnAType {
  question: string;
  answer: string;
}

export function QnA({ question, answer }: QnAType) {
  return (
    <div>
      <div className="font-bold">{question}</div>
      <Divider direction="horizontal" className="my-3" />
      <div className="font-light">{answer}</div>
    </div>
  );
}
