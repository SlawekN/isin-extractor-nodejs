class ConverterError extends Error{
  constructor(message: string) {
    super(message);
    this.name = "ParserError";
  }

  Message(): string {
    return this.message;
  }
}

const ConverterErrorEmptyJSONString = new ConverterError("provided empty JSON string");
const ConverterErrorMissingProperties = new ConverterError("missing properties in JSON String");
const ConverterErrorEmptyPropertyValue = new ConverterError("property has empty value");

export  {
  ConverterErrorEmptyJSONString,
  ConverterErrorMissingProperties,
  ConverterErrorEmptyPropertyValue
}
