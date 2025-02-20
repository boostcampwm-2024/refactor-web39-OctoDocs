import { Get } from "@/shared/api";

export const getChatAbort = async (requestId: string) => {
  const url = `/api/abort/${requestId}`;

  const res = await Get(url);
  return res.data;
};
