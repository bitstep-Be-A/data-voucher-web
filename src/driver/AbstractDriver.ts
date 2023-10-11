import { ErrorDetail } from "../types/common";
import type { DriverAction, Manager } from "./types";

export default abstract class AbstractDriver {
  constructor(public action: DriverAction) {}

  static manager: Manager;

  async save(): Promise<ErrorDetail | null> {
    return null;
  }
}
