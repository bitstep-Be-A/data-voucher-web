import {
  DocFolder,
  DocFolderId
} from "../domain/doc-management/docs.interface";
import { docManagementApi } from "../api/doc-management";
import AbstractDriver from "./AbstractDriver";
import { getAxiosResponse } from "../api/axios";

export class DocFolderManager {
  create(data: DocFolder) {
    return Promise.resolve(new DocFolderDriver({
      method: 'create',
      data: {
        'folder_name': data.name,
        'parent_folder_id': data.parent
      }
    }));
  }

  delete(key: DocFolderId) {
    return Promise.resolve(new DocFolderDriver({
      method: 'delete',
      data: {
        'folder_id': key
      }
    }));
  }
}

export default class DocFolderDriver extends AbstractDriver<undefined> {
  static manager = new DocFolderManager();

  async save() {
    if (this.action.method === 'create') {
      try {
        await docManagementApi.createFolder(this.action.data);
      } catch(e: unknown) {
        return getAxiosResponse(e);
      }
      return null;
    }
    if (this.action.method === 'delete') {
      try {
        await docManagementApi.deleteFolder(this.action.data);
      } catch(e: unknown) {
        return getAxiosResponse(e);
      }
    }
    throw new Error('INVALID_METHOD');
  }

  query() {}
}
