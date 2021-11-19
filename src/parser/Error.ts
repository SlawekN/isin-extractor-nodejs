class ParserError extends Error{
  constructor(message: string) {
    super(message);
    this.name = "ParserError";
  }

  Message(): string {
    return this.message;
  }
}

const ParserErrorEmptyJSONString = new ParserError("provided empty in JSON string");
const ParserErrorMissingProperties = new ParserError("missing properties in JSON String");

export  {
  ParserErrorEmptyJSONString,
  ParserErrorMissingProperties
}
