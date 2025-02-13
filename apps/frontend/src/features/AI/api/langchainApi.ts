export const postLangchain = async (query: string): Promise<Response> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return fetch(`${apiUrl}/api/langchain`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify({ query }),
  });
};
