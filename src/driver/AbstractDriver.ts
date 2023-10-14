import type { DriverAction, Manager } from "./types";

export default abstract class AbstractDriver<T> {
  constructor(public action: DriverAction) {}

  static manager: Manager;

  abstract save(): Promise<void> | void;

  abstract query(): Promise<T> | void;
}
