import type { ExceptionDetail } from "./exceptions";

export interface Serializer<T> {
  toEntity: () => object;
  isValid: () => boolean;
  getExceptions: () => ExceptionDetail[];
  getData: () => T;
}
