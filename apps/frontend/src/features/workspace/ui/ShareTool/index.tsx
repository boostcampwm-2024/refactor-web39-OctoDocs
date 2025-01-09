import { lazy, Suspense } from "react";
import { Sharebutton } from "./ShareButton";
import { Popover, Skeleton } from "@/shared/ui";

const SharePanel = lazy(() => delayForDemo(import("./SharePanel")));

export function ShareTool() {
  return (
    <div className="mr-1">
      <Popover placement="bottom" align="start" offset={{ x: -6, y: 16 }}>
        <Popover.Trigger>
          <Sharebutton />
        </Popover.Trigger>
        <Popover.Content className="rounded-lg border border-neutral-200 bg-white p-2 shadow-md">
          <Suspense fallback={<Skeleton className="h-[92px] w-[240px]" />}>
            <SharePanel />
          </Suspense>
        </Popover.Content>
      </Popover>
    </div>
  );
}

function delayForDemo(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}
