import type { ExceptionDetail } from "./exceptions";

export abstract class BaseSerializer<T> {
  public exceptions: ExceptionDetail[] = [];

  public isValid() {
    const rst = !!this.exceptions.length;
    this.exceptions = [];
    return rst;
  }

  public hasException() {
    return !!this.exceptions.length;
  }

  public abstract convert(): T | T[] | object;
}
