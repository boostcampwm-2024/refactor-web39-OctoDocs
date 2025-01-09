import { JSONContent } from "novel";

export interface Page {
  id: number;
  title: string;
  content: JSONContent;
  emoji: string | null;
}

export interface CreatePageRequest {
  title: string;
  content: JSONContent;
  emoji: string | null;
  x: number;
  y: number;
  workspaceId: string;
}

export interface CreatePageResponse {
  message: string;
  pageId: number;
}
