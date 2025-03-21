import {
  EditorRoot,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorContent,
  type JSONContent,
  EditorCommandList,
  EditorBubble,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { SocketIOProvider } from "y-socket.io";
import { handleImageDrop, handleImagePaste } from "novel/plugins";

import "./prosemirror.css";
import { slashCommand, suggestionItems } from "./slash-commands";
import { defaultExtensions } from "./extensions";
import { Separator } from "./ui/separator";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { MathSelector } from "./selectors/math-selector";
import { TextButtons } from "./selectors/text-buttons";
import { ColorSelector } from "./selectors/color-selector";
import { uploadFn } from "../../model/upload";
import { useEditor } from "../../model/useEditor";

interface EditorProp {
  pageId: number;
  initialContent?: JSONContent;
  ydoc: Y.Doc;
  provider: SocketIOProvider;
}

export function Editor({ ydoc, provider }: EditorProp) {
  const {
    openNode,
    openColor,
    openLink,
    setOpenNode,
    setOpenColor,
    setOpenLink,
  } = useEditor(provider);

  const extensions = [...defaultExtensions, slashCommand];

  return (
    <EditorRoot>
      <EditorContent
        enableContentCheck={true}
        onContentError={({ disableCollaboration }) => {
          disableCollaboration();
        }}
        extensions={[
          ...extensions,
          Collaboration.extend().configure({
            document: ydoc,
          }),
          CollaborationCursor.extend().configure({
            provider,
          }),
        ]}
        editorProps={{
          handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
          handleDrop: (view, event, _slice, moved) =>
            handleImageDrop(view, event, moved, uploadFn),
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class: `prose prose-lg prose-headings:font-title font-default focus:outline-none max-w-full`,
          },
        }}
        slotAfter={<ImageResizer />}
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
                className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm aria-selected:bg-accent hover:cursor-pointer hover:bg-accent"
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
          <Separator />
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <Separator />
          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <Separator />
          <MathSelector />
          <Separator />
          <TextButtons />
          <Separator />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  );
}
