import type { ExceptionDetail } from "../../types/common";

export type DocFolderId = number | null | undefined;

export interface DocFolder {
  id?: DocFolderId;
  parent: DocFolderId;
  name: string;
}

export type DocFileId = number;

export interface DocFile {
  id: DocFileId;
  name: string;
  folderId: DocFolderId;
}

export interface FolderValidator {
  checkBlankFolderName: (value: string) => ExceptionDetail | null;
  checkFolderNameMaxLength: (value: string) => ExceptionDetail | null;
}

export interface FolderExceptionMap {
  FOLDER_NAME_IS_BLANK: ExceptionDetail;
  FOLDER_NAME_MAX_LENGTH_OVER: ExceptionDetail;
}