import { AIButton } from "@/features/AI";
import { useState } from "react";

export function AIToolView() {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative">
      <AIButton onExpand={handleExpand} />
      {isExpanded && (
        <div className="z-8 absolute left-0 top-full mt-2 flex h-[720px] w-[460px] items-center justify-center rounded-md border-[1px] border-neutral-200 bg-white text-black shadow-md">
          <div className="flex flex-col items-center gap-6">
            <div className="text-center text-lg font-semibold">간편 로그인</div>
          </div>
        </div>
      )}
    </div>
  );
}
