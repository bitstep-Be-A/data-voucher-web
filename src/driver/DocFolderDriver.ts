import type { DriverAction } from "./types";
import {
  DocFolder
} from "../domain/doc-management/docs.interface";

export class DocFolderManager {
  create(data: DocFolder) {
    return Promise.resolve(new DocFolderDriver({
      name: 'create',
      data: {
        'folder_name': data.name,
        'parent_folder_id': data.parent
      }
    }));
  }
}

export default class DocFolderDriver {
  constructor(public action: DriverAction) {}

  static manager = new DocFolderManager();

  async save() {
    if (this.action.name === 'create') {
      
    }
  }
}
