import type { ExceptionDetail, InfoType } from "../types/common";

export interface Serializer<T> {
  toEntity: () => object;
  isValid: () => boolean;
  getExceptions: () => ExceptionDetail[];
  getData: () => T;
}

export class DefaultSerializerMixin {
  toEntity() {
    return {};
  }

  isValid() {
    return true;
  }

  getExceptions() {
    return [];
  }
}
