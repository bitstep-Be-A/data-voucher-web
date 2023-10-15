import { atom, selector } from "recoil";

import { DocFileId, type DocFolderId } from "../../domain/doc-management/docs.interface";
import DocFileDriver from "../../driver/DocFileDriver";
import { getAxiosResponse } from "../../api/axios";

export type DocFileRequest = {
  file: File;
  folderId: DocFolderId;
}

export const docFileRequestState = atom<DocFileRequest | undefined>({
  key: "recoil/schema/DocFileRequest",
  default: undefined
});

export const docFileKeyState = atom<DocFileId>({
  key: "recoil/schema/DocFileKey",
  default: undefined
})

export const docFileMutation_create = selector({
  key: "recoil/schema/DocFileMutation/create",
  get: async ({get}) => {
    const req = get(docFileRequestState);
    if (req) {
      const driver = await DocFileDriver.manager.create(req);
      try {
        await driver.save();
        return 1;
      } catch (e) {
        const detail = getAxiosResponse(e);
        throw detail;
      }
    }
    return 0;
  },
  set: ({set}) => set(docFileRequestState, undefined)
});

export const docFileMutation_delete = selector({
  key: "recoil/schema/DocFileMutation/delete",
  get: async ({get}) => {
    const key = get(docFileKeyState);
    if (key) {
      const driver = await DocFileDriver.manager.delete(key);
      try {
        await driver.save();
        return 1;
      } catch (e) {
        const detail = getAxiosResponse(e);
        throw detail;
      }
    }
    return 0;
  }
})
