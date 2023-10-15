import type { DocFileId, DocFileRequest } from "../domain/doc-management/docs.interface";
import AbstractDriver from "./AbstractDriver";
import { docManagementApi } from "../api/doc-management";

export class DocFileManager {
  create(data: DocFileRequest) {
    return Promise.resolve(new DocFileDriver({
      method: "create",
      data: {
        'folder_id': data.folderId,
        'file': data.file
      }
    }));
  }

  delete(key: DocFileId) {
    return Promise.resolve(new DocFileDriver({
      method: "delete",
      data: {
        'file_id': key
      }
    }));
  }
}

export default class DocFileDriver extends AbstractDriver<undefined> {
  static manager = new DocFileManager();

  async save() {
    switch(this.action.method) {
      case "create":
        await docManagementApi.createFile(this.action.data);
        break
      case "delete":
        await docManagementApi.deleteFile(this.action.data);
        break
      default:
        throw Error("INVALID_METHOD");
    }
  }

  query() {}
}
