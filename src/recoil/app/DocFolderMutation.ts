import { atom, selector } from "recoil";

import type { DocFolderId } from "../../domain/doc-management/docs.interface";
import DocFolderDriver from "../../driver/DocFolderDriver";
import { getAxiosResponse } from "../../api/axios";

export type DocFolderRequest = {
  parent: DocFolderId;
  name: string;
}

export const docFolderRequestState = atom<DocFolderRequest | undefined>({
  key: "recoil/schema/DocFolderRequest",
  default: undefined
});

export const docFolderKeyState = atom<DocFolderId | undefined>({
  key: "recoil/schema/DocFolderKey",
  default: undefined
});

export const docFolderMutation_create = selector({
  key: "recoil/schema/DocFolderMutation/create",
  get: async ({get}) => {
    const req = get(docFolderRequestState);
    if (req) {
      const driver = await DocFolderDriver.manager.create(req);
      try {
        await driver.save();
        return 1;
      } catch(e) {
        const detail = getAxiosResponse(e);
        throw detail;
      }
    }
    return 0;
  },
  set: ({set}) => set(docFolderRequestState, undefined)
});

export const docFolderMutation_delete = selector({
  key: "recoil/schema/DocFolderMutation/delete",
  get: async ({get}) => {
    const key = get(docFolderKeyState);
    if (key) {
      const driver = await DocFolderDriver.manager.delete(key);
      try {
        await driver.save();
        return 1;
      } catch(e) {
        const detail = getAxiosResponse(e);
        throw detail;
      }
    }
    return 0;
  },
  set: ({set}) => set(docFolderKeyState, undefined)
});
