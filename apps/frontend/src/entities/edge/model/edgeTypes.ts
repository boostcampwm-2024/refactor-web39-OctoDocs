export interface Edge {
  fromNode: number;
  toNode: number;
}

export interface CreatePageRequest {
  fromNode: number;
  toNode: number;
  workspaceId: string;
}
