import { useEffect, useState } from "react";
import {
  EditorRoot,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorContent,
  type JSONContent,
  EditorCommandList,
  EditorBubble,
  type EditorInstance,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";

import "./prosemirror.css";
import { slashCommand, suggestionItems } from "./slash-commands";
import { defaultExtensions } from "./extensions";
import { Separator } from "./ui/separator";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { MathSelector } from "./selectors/math-selector";
import { TextButtons } from "./selectors/text-buttons";
import { ColorSelector } from "./selectors/color-selector";

import { useDebouncedCallback } from "use-debounce";
import { useUpdatePage } from "@/hooks/usePages";

const extensions = [...defaultExtensions, slashCommand];

interface EditorProp {
  pageId: number;
  initialValue?: JSONContent;
  onChange?: (value: JSONContent) => void;
}

// TODO: 나중에 title input 추가해야함
const Editor = ({ pageId, initialValue }: EditorProp) => {
  const [initialContent, setInitialContent] = useState<null | JSONContent>(
    initialValue === undefined ? null : initialValue,
  );

  const updatePageMutation = useUpdatePage(pageId);

  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Saved");

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      if (pageId === undefined) return;

      const json = editor.getJSON();

      const response = await updatePageMutation.mutateAsync({
        id: pageId,
        pageData: {
          title: "제목 없음",
          content: json,
        },
      });
      if (response) {
        setSaveStatus("Saved");
      }
    },
    500,
  );

  useEffect(() => {
    const content = window.localStorage.getItem(pageId.toString());
    if (content) setInitialContent(JSON.parse(content));
  }, [pageId]);

  return (
    <div className="relative h-[720px] w-[520px] overflow-auto border-muted bg-background bg-white sm:rounded-lg sm:border sm:shadow-lg">
      <div className="absolute right-5 top-5 z-10 mb-5 flex gap-2">
        <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
          {saveStatus}
        </div>
      </div>
      <EditorRoot>
        <EditorContent
          initialContent={initialContent === null ? undefined : initialContent}
          className=""
          extensions={extensions}
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            attributes: {
              class: `prose prose-lg prose-headings:font-title font-default focus:outline-none max-w-full`,
            },
          }}
          slotAfter={<ImageResizer />}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor);
            setSaveStatus("Unsaved");
          }}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:cursor-pointer hover:bg-accent aria-selected:bg-accent"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>
          <EditorBubble
            tippyOptions={{
              placement: "top",
            }}
            className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
          >
            {" "}
            <Separator orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Separator orientation="vertical" />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Separator orientation="vertical" />
            <MathSelector />
            <Separator orientation="vertical" />
            <TextButtons />
            <Separator orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </EditorBubble>
        </EditorContent>
      </EditorRoot>
    </div>
  );
};

export default Editor;
