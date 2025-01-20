import { memo } from "react";

interface WorkspaceNavProps {
  title: string;
}

function WorkspaceNavComponent({ title }: WorkspaceNavProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <h1 className="text-md font-semibold">{title}</h1>
    </div>
  );
}

export const WorkspaceNav = memo(WorkspaceNavComponent);
