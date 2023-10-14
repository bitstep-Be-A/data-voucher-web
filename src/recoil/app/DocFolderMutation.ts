import { atom, selector } from "recoil";

import type { DocFolderId } from "../../domain/doc-management/docs.interface";
import DocFolderDriver from "../../driver/DocFolderDriver";

export type DocFolderRequest = {
  parent: DocFolderId;
  name: string;
}

export const docFolderRequestState = atom<DocFolderRequest | undefined>({
  key: "recoil/schema/DocFolderRequest",
  default: undefined
});

export const docFolderMutation_create = selector({
  key: "recoil/schema/DocFolderMutation/create",
  get: async ({get}) => {
    const req = get(docFolderRequestState);
    if (req) {
      DocFolderDriver.manager.create(req)
        .then(driver => driver.save());
    }
  },
  set: ({set}) => set(docFolderRequestState, undefined)
});
