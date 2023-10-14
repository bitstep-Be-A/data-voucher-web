import { atom } from "recoil";

import type { DocFolderId } from "../../domain/doc-management/docs.interface";

export type DocFileRequest = {
  file: File | null;
  folderId: DocFolderId;
}

export const docFileRequestState = atom<DocFileRequest>({
  key: "recoil/schema/DocFileRequest",
  default: {
    file: null,
    folderId: null
  }
});
