import type { ExceptionDetail } from "./exceptions";

export interface Serializer<T> {
  convert: () => T | T[] | object;
  isValid: () => boolean;
  getExceptions: () => ExceptionDetail[];
}
