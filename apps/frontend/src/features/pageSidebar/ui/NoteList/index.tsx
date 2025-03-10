import { Trash2 } from "lucide-react";

import { useNoteList } from "@/shared/model/useNoteList";
import { cn } from "@/shared/lib";
import { Button, Emoji } from "@/shared/ui";

interface NoteListProps {
  className?: string;
}

export function NoteList({ className }: NoteListProps) {
  const { pages, handleNoteClick, openModal } = useNoteList();

  return (
    <div className={cn("flex flex-col gap-0.5 text-sm font-medium", className)}>
      {pages &&
        pages.map(({ id, title, emoji }) => (
          <Button
            onClick={() => handleNoteClick(id)}
            key={id}
            className="group flex flex-row items-center justify-between gap-1 rounded-sm px-3 py-1 hover:bg-neutral-100"
          >
            <Emoji emoji={emoji} width="w-5" height="h-5" />
            <div className="flex-1 truncate text-start">{title}</div>
            <span
              className="hidden text-neutral-400 transition-colors group-hover:block hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                openModal(id);
              }}
            >
              <Trash2 width={18} height={18} />
            </span>
          </Button>
        ))}
    </div>
  );
}
