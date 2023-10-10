import {
  FolderValidator,
  FolderExceptionMap,
  DocFolder
} from "./docs.interface";
import { FOLDER_NAME_MAX_LENGTH } from "../../policies/document.policy";
import { Serializer, DefaultSerializerMixin } from "../../utils/serializer";

export const folderExceptionMap: FolderExceptionMap = {
  FOLDER_NAME_IS_BLANK: {
    name: "FORDER_NAME_IS_BLANK",
    message: "폴더명을 입력해주세요."
  },
  FOLDER_NAME_MAX_LENGTH_OVER: {
    name: "FORDER_NAME_MAX_LENGTH_OVER",
    message: "폴더명은 25자 이내로 입력해주세요."
  }
}

export const folderValidator: FolderValidator = {
  checkBlankFolderName(value) {
    return value === "" ? folderExceptionMap.FOLDER_NAME_IS_BLANK : null;
  },
  checkFolderNameMaxLength(value) {
    return value.length > FOLDER_NAME_MAX_LENGTH ? folderExceptionMap.FOLDER_NAME_MAX_LENGTH_OVER : null;
  },
}

export class DocFolderRequest
  extends DefaultSerializerMixin
  implements Serializer<DocFolder> {
  constructor(private data: DocFolder) {
    super();
  }

  toEntity() {
    return {
      'folder_name': this.data.name,
      'parent_folder_id': this.data.parent
    }
  }

  getData() { return this.data }
}
