import {
  CreateWorkSpaceResponse,
  CreateWorkSpaceResquest,
  GetCurrentUserWorkspaceResponse,
  GetUserWorkspaceResponse,
  RemoveWorkSpaceResponse,
} from "../model/workspaceTypes";
import { Delete, Get, Post } from "@/shared/api";

const BASE_URL = "/api/workspace";

export const createWorkspace = async (payload: CreateWorkSpaceResquest) => {
  const res = await Post<CreateWorkSpaceResponse, CreateWorkSpaceResquest>(
    BASE_URL,
    payload,
  );
  return res.data;
};

export const removeWorkspace = async (workspaceId: string) => {
  const url = `${BASE_URL}/${workspaceId}`;

  const res = await Delete<RemoveWorkSpaceResponse>(url);
  return res.data;
};

export const getUserWorkspaces = async () => {
  const url = `${BASE_URL}/user`;

  const res = await Get<GetUserWorkspaceResponse>(url);
  return res.data;
};

export const getCurrentWorkspace = async (
  workspaceId: string,
  userId: string,
) => {
  const url = `${BASE_URL}/${workspaceId}/${userId}`;

  const res = await Get<GetCurrentUserWorkspaceResponse>(url);
  return res.data;
};
