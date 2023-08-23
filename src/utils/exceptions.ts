export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export type ExceptionDetail = {
  name: string;
  message: string;
}
