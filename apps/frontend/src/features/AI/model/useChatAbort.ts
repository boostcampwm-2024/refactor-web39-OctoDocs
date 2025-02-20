import { useQuery } from "@tanstack/react-query";
import { getChatAbort } from "../api/chatAbortApi";

export const useChatAbort = (requestId: string) => {
  return useQuery({
    queryKey: ["chatAbort", requestId],
    queryFn: () => getChatAbort(requestId),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
