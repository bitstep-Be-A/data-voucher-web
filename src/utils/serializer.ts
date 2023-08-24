import type { ExceptionDetail } from "./exceptions";

export interface Serializer<T> {
  toObject: () => object;
  isValid: () => boolean;
  getExceptions: () => ExceptionDetail[];
  toData: () => T;
}
