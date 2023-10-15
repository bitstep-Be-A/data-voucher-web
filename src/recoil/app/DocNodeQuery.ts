import { atom, selector, useRecoilRefresher_UNSTABLE, useSetRecoilState } from "recoil";

import type { DocFile, DocFolder, DocFolderId } from "../../domain/doc-management/docs.interface";
import DocNodeDriver from "../../driver/DocNodeDriver";

export type DocNode = {
  rootFolderName: string;
  folderName: string;
  parentFolderId?: DocFolderId;
  folderId: DocFolderId;
  files: DocFile[];
  folders: DocFolder[];
}

export type DocNodeRequest = {
  init: boolean;
  folderId: DocFolderId;
}

const docNodeQuery_request = atom<DocNodeRequest>({
  key: "recoil/schema/DocNodeQuery/request",
  default: {
    init: true,
    folderId: null
  }
});

export const docNodeState = selector<DocNode>({
  key: "recoil/schema/DocNodeQuery",
  get: async ({get}) => {
    const req = get(docNodeQuery_request);
    const driver = await DocNodeDriver.manager.get(req.folderId);
    const data = await driver.query();
    return {...data}  // 동일한 output이더라도 schema에서 정의한 타입과 domain에서 정의한 타입을 구분해주어야 합니다.
  },
  set: ({set}) => set(docNodeQuery_request, {
    init: false,
    folderId: null
  })
});

export const useDocNodeQuery = () => {
  const setReq = useSetRecoilState(docNodeQuery_request);

  return {
    query: (folderId: DocFolderId) => setReq({
      init: true,
      folderId
    }),
    refresh: useRecoilRefresher_UNSTABLE(docNodeState)
  }
}
