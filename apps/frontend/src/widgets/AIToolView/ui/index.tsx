import { AIButton, AIPanel } from "@/features/AI";
import { useState } from "react";

export function AIToolView() {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative">
      <AIButton onExpand={handleExpand} />
      {isExpanded && <AIPanel />}
    </div>
  );
}
