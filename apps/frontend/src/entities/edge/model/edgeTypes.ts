export interface Edge {
  fromNode: number;
  toNode: number;
}

export interface CreateEdgeRequest {
  fromNode: number;
  toNode: number;
  workspaceId: string;
}

export interface DeleteEdgeRequest {
  fromNode: number;
  toNode: number;
}
