import { useQuery } from "@tanstack/react-query";

import { getUser, getUserStatus } from "../api/authApi";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: false,
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
