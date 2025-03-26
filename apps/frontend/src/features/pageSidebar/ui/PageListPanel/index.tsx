import { NoteList, Tools } from "@/features/pageSidebar";
import { ScrollWrapper } from "@/shared/ui";

export default function PageListPanel() {
  return (
    <div className="flex flex-col gap-3 pb-4">
      <div className="w-full px-4">
        <Tools />
      </div>
      <ScrollWrapper className="max-h-[604px] overflow-x-clip scrollbar scrollbar-track-transparent scrollbar-thumb-[#d9d9d9]">
        <NoteList className="px-4" />
      </ScrollWrapper>
    </div>
  );
}
