import React from "react";

export const ExampleBlock = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[35%] rounded-md border-[1px] border-[#d0d9e0] p-2 text-base text-slate-400 shadow-sm">
      {children}
    </div>
  );
};
