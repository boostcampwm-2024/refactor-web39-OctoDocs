import { Suspense, useEffect, useState, lazy } from "react";

import { useUserStore } from "@/entities/user";
import { CursorButton } from "@/features/canvasTools";
import { ShareTool } from "@/features/workspace";
import { Popover, Skeleton } from "@/shared/ui";

const ProfilePanel = lazy(() => import("@/features/canvasTools"));

export function CanvasToolsView() {
  const { currentUser } = useUserStore();
  const [color, setColor] = useState(currentUser.color);
  const [clientId, setClientId] = useState(currentUser.clientId);

  useEffect(() => {
    setColor(currentUser.color);
    setClientId(currentUser.clientId);
  }, [currentUser]);

  return (
    <div className="z-10 flex flex-row rounded-xl border-[1px] border-neutral-200 bg-white p-1.5 text-black shadow-md">
      <ShareTool />
      <Popover placement="bottom" align="start" offset={{ x: -6, y: 16 }}>
        <Popover.Trigger>
          <CursorButton color={color} />
        </Popover.Trigger>
        <Popover.Content className="rounded-lg border border-neutral-200 bg-white shadow-md">
          <Suspense fallback={<Skeleton className="h-[240px] w-[448px]" />}>
            <ProfilePanel
              color={color}
              clientId={clientId}
              onColorChange={setColor}
              onClientIdChange={setClientId}
            />
          </Suspense>
        </Popover.Content>
      </Popover>
    </div>
  );
}
