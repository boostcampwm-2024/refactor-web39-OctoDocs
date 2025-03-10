import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { getUserWorkspaces, getCurrentWorkspace } from "../api/workspaceApi";
import { useGetUser, useGetUserStatus } from "@/features/auth";
import { useWorkspace } from "@/shared/lib/useWorkspace";

export const useUserWorkspace = () => {
  const { data: loggedIn } = useGetUserStatus();
  return useQuery({
    queryKey: ["userWorkspace"],
    queryFn: getUserWorkspaces,
    enabled: !!loggedIn,
  });
};

export const useCurrentWorkspace = () => {
  const workspaceId = useWorkspace();
  const { data: loggedIn } = useGetUserStatus();
  const { data: user } = useGetUser();

  const snowflakeId = loggedIn ? "null" : (user?.snowflakeId ?? "null");

  return useSuspenseQuery({
    queryKey: ["currentWorkspace", workspaceId, snowflakeId],
    queryFn: () => getCurrentWorkspace(workspaceId, snowflakeId),
    retry: false,
    refetchOnWindowFocus: false,
  });
};
