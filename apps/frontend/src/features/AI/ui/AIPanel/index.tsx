export function AIPanel() {
  return (
    <div className="z-8 absolute left-0 top-full mt-2 flex h-[720px] w-[460px] flex-col items-center rounded-md border-[1px] border-neutral-200 bg-white p-4 text-black shadow-md">
      <div className="text-md mt-4 flex h-full items-center text-center font-medium">
        문서에서 원하는 정보를 찾아드릴게요.
        <br />
        질문을 입력해 주세요!
      </div>
    </div>
  );
}
