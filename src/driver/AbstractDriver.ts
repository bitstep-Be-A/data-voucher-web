import { ErrorDetail } from "../types/common";
import type { DriverAction, Manager } from "./types";

export default abstract class AbstractDriver<T> {
  constructor(public action: DriverAction) {}

  static manager: Manager;

  abstract save(): Promise<ErrorDetail | null> | void;

  abstract query(): Promise<ErrorDetail | T> | void;
}
