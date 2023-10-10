export type DocForderId = number | null;

export interface DocForder {
  id: DocForderId;
  parent: DocForderId;
  name: string;
}

export type DocFileId = number;

export interface DocFile {
  id: DocFileId;
  name: string;
  forderId: DocForderId;
}
