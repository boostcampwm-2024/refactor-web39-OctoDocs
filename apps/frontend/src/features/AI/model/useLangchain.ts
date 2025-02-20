import { useRef, useState } from "react";
import { postLangchain } from "../api/langchainApi";

export const useLangchain = () => {
  const [requestId, setRequestId] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);
  const readerRef = useRef<ReadableStreamDefaultReader<string> | null>(null);

  const mutateLangchain = async (
    query: string,
    onData: (chunk: string) => void,
  ) => {
    setIsLoading(true);
    try {
      const response = await postLangchain(query);

      if (!response.body) return;

      setRequestId(response.headers.get("X-Request-Id"));
      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();
      readerRef.current = reader;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const convertValue = value.replace(/\n/g, "");

        onData(convertValue);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const stopStreaming = () => {
    if (readerRef.current) {
      readerRef.current.cancel();
      readerRef.current = null;
    }
  };

  return { mutateLangchain, stopStreaming, isLoading };
};
