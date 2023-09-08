import type { ExceptionDetail } from "../types/common";

export interface Serializer<T> {
  toEntity: () => object;
  isValid: () => boolean;
  getExceptions: () => ExceptionDetail[];
  getData: () => T;
}
