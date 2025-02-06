import { Post } from "@/shared/api";
import {
  PostLangchainResponse,
  PostLangchainResquest,
} from "../model/langchainTypes";

export const postLangchain = async (query: PostLangchainResquest) => {
  const url = `/api/langchain`;
  const res = await Post<PostLangchainResponse, PostLangchainResquest>(
    url,
    query,
  );
  return res.data;
};
