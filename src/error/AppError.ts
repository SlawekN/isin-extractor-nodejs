export class AppError extends Error {
  public readonly name: string;
  public readonly code: number;

  constructor(name: string, code: number, description: string) {
    super(description);
    this.name = name;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  public get Code(): number {
    return this.code;
  }
}
