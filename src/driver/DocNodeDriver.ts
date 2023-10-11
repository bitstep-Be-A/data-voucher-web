import { docManagementApi } from "../api/doc-management";
import type { DocFolderId } from "../domain/doc-management/docs.interface";
import { DocNode } from "../domain/doc-management/docs.interface";
import AbstractDriver from "./AbstractDriver";
import { Queue } from "../utils/queue";
import { getAxiosResponse } from "../api/axios";

export class DocNodeManager {
  get(folderId: DocFolderId) {
    return Promise.resolve(new DocNodeDriver({
      method: 'get',
      key: folderId
    }));
  }
}

export default class DocNodeDriver extends AbstractDriver<DocNode> {
  static manager = new DocNodeManager();

  async query() {
    if (this.action.method === 'get') {
      try {
        const doc = await docManagementApi.getDoc();
        return getNodeFromTree(this.action.key as DocFolderId, doc);
      } catch(e) {
        return getAxiosResponse(e);
      }
    }

    throw Error('INVALID_METHOD');
  }

  save() {}
}

type _File = {
  file_id: number;
  file_name: string;
  "folderID of file": number;
}

type _Folder = {
  folder_id: number;
  parent_folder_id: number | null;
  folder_name: string;
  files: _File[];
  subfolders: _Folder[]
}

type _Tree = {
  message: string;
  folder_name: string;
  folder_tree: _Folder[];
}

export const getNodeFromTree = (id: DocFolderId, tree: _Tree): DocNode => {
  const folders = tree['folder_tree'];
  if (!folders.length) {
    throw Error('NOT_FOUND');
  }

  const q = new Queue<_Folder>(folders);

  while (!q.isEmpty()) {
    const folder = q.popleft() as _Folder;

    if (folder['folder_id'] === id)
      return {
        rootFolderName: tree['folder_name'],
        parentFolderId: folder['parent_folder_id'],
        folderId: id,
        files: folder['files'].map((v) => {
          return {
            id: v.file_id,
            name: v.file_name,
            folderId: v["folderID of file"]
          }
        }),
        folders: folder['subfolders'].map((v) => {
          return {
            id: v.folder_id,
            parent: v.parent_folder_id,
            name: v.folder_name
          }
        })
      };

    for (let f of folder['subfolders']) {
      q.push(f);
    }
  }

  throw Error('NOT_FOUND');
}
