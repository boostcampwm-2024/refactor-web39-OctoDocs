import { useState } from "react";
import { postLangchain } from "../api/langchainApi";

export const useLangchain = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function mutateLangchain(
    query: string,
    onData: (chunk: string) => void,
  ) {
    setIsLoading(true);
    try {
      const response = await postLangchain(query);

      if (!response.body) return;

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const convertValue = value.replace(/\n/g, "");

        onData(convertValue);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { mutateLangchain, isLoading };
};
