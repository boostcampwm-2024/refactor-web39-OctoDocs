import { useMutation } from "@tanstack/react-query";
import { postLangchain } from "../api/langchainApi";
import { PostLangchainResquest } from "./langchainTypes";

export const useLangchain = () => {
  return useMutation({
    mutationFn: (query: PostLangchainResquest) => postLangchain(query),
  });
};
