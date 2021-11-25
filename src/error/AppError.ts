class AppError extends Error {
  public readonly name: string;
  public readonly code: number;

  constructor(name: string, code: number, description: string) {
    super(description);
    this.name = name;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  isNull(): boolean {
    return this.code == 0;
  }
}

class NullError extends AppError {
  constructor() {
    super('', 0, '');
  }

  isNull(): boolean {
    return true;
  }
}

export {
  NullError,
  AppError,
};
