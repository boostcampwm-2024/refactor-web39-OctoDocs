import { Post, Delete } from "@/shared/api";
import { CreatePageRequest, CreatePageResponse } from "../model/pageTypes";

export const createPage = async (pageData: CreatePageRequest) => {
  const url = `/api/page`;

  const res = await Post<CreatePageResponse, CreatePageRequest>(url, pageData);
  return res.data;
};

export const deletePage = async (id: number) => {
  const url = `/api/page/${id}`;

  const res = await Delete<null>(url);
  return res.data;
};
