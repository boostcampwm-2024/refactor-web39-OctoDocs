import { useQuery } from "@tanstack/react-query";

import { getUser, getUserStatus } from "../api/authApi";

export const useGetUser = () => {
  const { data: loggedIn } = useGetUserStatus();

  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!loggedIn,
  });
};

export const useGetUserStatus = () => {
  return useQuery({
    queryKey: ["userStatus"],
    queryFn: getUserStatus,
    retry: false,
    refetchOnWindowFocus: false,
    select: (data) => data.loggedIn,
  });
};
