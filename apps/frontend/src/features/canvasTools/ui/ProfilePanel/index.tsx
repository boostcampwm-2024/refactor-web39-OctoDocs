import { CursorPreview } from "../CursorPreview";
import { ProfileForm } from "../ProfileForm";
import { usePopover } from "@/shared/model";

interface ProfilePanelProps {
  color: string;
  clientId: string;
  onColorChange: (color: string) => void;
  onClientIdChange: (clientId: string) => void;
}

export default function ProfilePanel({
  color,
  clientId,
  onColorChange,
  onClientIdChange,
}: ProfilePanelProps) {
  const { close } = usePopover();

  const handleSave = () => {
    close();
  };

  return (
    <div className="m-2 flex flex-row gap-4 p-4">
      <CursorPreview
        defaultCoors={{ x: 90, y: 80 }}
        clientId={clientId}
        color={color}
      />
      <ProfileForm
        color={color}
        clientId={clientId}
        onColorChange={onColorChange}
        onClientIdChange={onClientIdChange}
        onSave={handleSave}
      />
    </div>
  );
}
