export function Sharebutton() {
  return (
    <div className="flex h-9 items-center justify-center">
      <button
        type="button"
        className="rounded-md bg-blue-600 px-2 py-1 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        공유
      </button>
    </div>
  );
}
