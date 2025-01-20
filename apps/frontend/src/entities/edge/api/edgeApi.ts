import { Post, Delete } from "@/shared/api";
import { CreateEdgeRequest, DeleteEdgeRequest } from "../model/edgeTypes";

export const createEdge = async (edgeData: CreateEdgeRequest) => {
  const url = `/api/edge`;

  const res = await Post<any, CreateEdgeRequest>(url, edgeData);
  return res.data;
};

export const deleteEdge = async (edgeData: DeleteEdgeRequest) => {
  const url = `/api/edge`;

  const res = await Delete<any, DeleteEdgeRequest>(url, edgeData);
  return res.data;
};
