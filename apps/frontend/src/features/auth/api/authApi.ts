import { Get, Post } from "@/shared/api";

interface GetUserResponse {
  message: string;
  snowflakeId: string;
}

interface GetUserStatusResponse {
  message: string;
  loggedIn: boolean;
}

export const getUser = async () => {
  const url = `/api/auth/profile`;

  const res = await Get<GetUserResponse>(url);
  return res.data;
};

export const getUserStatus = async () => {
  const url = `/api/auth/status`;

  const res = await Get<GetUserStatusResponse>(url);
  return res.data;
};

export const logout = async () => {
  const url = "/api/auth/logout";

  await Post(url);
};
