class ConverterError extends Error{
  constructor(message: string) {
    super(message);
    this.name = "ParserError";
  }

  Message(): string {
    return this.message;
  }
}

export  {
  ConverterError,
}
