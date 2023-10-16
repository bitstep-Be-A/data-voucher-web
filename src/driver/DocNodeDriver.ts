import { docManagementApi } from "../api/doc-management";
import type { DocFolderId } from "../domain/doc-management/docs.interface";
import { DocNode } from "../domain/doc-management/docs.interface";
import AbstractDriver from "./AbstractDriver";
import { Queue } from "../utils/queue";

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
      const doc = await docManagementApi.getDoc();
      return getNodeFromTree(this.action.key as DocFolderId, doc);
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
  folder_id: number | null;
  parent_folder_id: number | null;
  folder_name: string;
  files: _File[];
  subfolders: _Folder[]
}

type _Tree = {
  message: string;
  user_root_folder_name: string;
  folder_tree: _Folder[];
}

export const getNodeFromTree = (id: DocFolderId, tree: _Tree): DocNode => {
  if (id === null || !tree['folder_tree'].length) {
    return {
      rootFolderName: tree['user_root_folder_name'],
      folderName: tree['user_root_folder_name'],
      parentFolderId: null,
      folderId: null,
      files: [],
      folders: tree['folder_tree'][0]['subfolders'].map((v) => {
        return {
          id: v.folder_id,
          parent: v.parent_folder_id,
          name: v.folder_name
        }
      })
    }
  }

  const folders = tree['folder_tree'][0]['subfolders'];
  if (!folders.length) {
    return {
      rootFolderName: tree['user_root_folder_name'],
      folderName: tree['user_root_folder_name'],
      parentFolderId: null,
      folderId: null,
      files: [],
      folders: []
    }
  }

  const q = new Queue<_Folder>(folders);

  while (!q.isEmpty()) {
    const folder = q.popleft() as _Folder;

    if (folder['folder_id'] === id)
      return {
        rootFolderName: tree['user_root_folder_name'],
        folderName: folder['folder_name'],
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
    
    folder['subfolders'].forEach((f) => q.push(f));
  }

  throw Error('NOT_FOUND');
}
