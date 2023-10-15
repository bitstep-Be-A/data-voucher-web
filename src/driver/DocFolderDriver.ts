import {
  DocFolder,
  DocFolderId
} from "../domain/doc-management/docs.interface";
import { docManagementApi } from "../api/doc-management";
import AbstractDriver from "./AbstractDriver";

export class DocFolderManager {
  create(data: DocFolder) {
    return Promise.resolve(new DocFolderDriver({
      method: 'create',
      data: {
        'folder_name': data.name,
        'parent_folder_id': data.parent ?? undefined
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
    switch (this.action.method) {
      case "create":
        await docManagementApi.createFolder(this.action.data);
        break;
      case "delete":
        await docManagementApi.deleteFolder(this.action.data);
        break;
      default:
        throw new Error('INVALID_METHOD');
    }
  }

  query() {}
}
