interface AIButtonProps {
  onExpand: () => void;
}
export function AIButton({ onExpand }: AIButtonProps) {
  return (
    <button
      className="z-8 flex h-[50px] w-[116px] items-center justify-center rounded-xl border-[1px] border-neutral-200 bg-white text-black shadow-md"
      onClick={onExpand}
    >
      AI 매니저 ✨
    </button>
  );
}
