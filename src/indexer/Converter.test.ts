import { Converter } from './Converter';
import {
  ConverterErrorEmptyJSONString,
  ConverterErrorEmptyPropertyValue,
  ConverterErrorMissingProperties,
} from './Error';

describe('Converter', () => {
  it('should convert valid JSON string describing single element to IsInIndexItem class Object', () => {
    const input = `{"figi": "test1", "isin": "test2", "companyname": "test3"}`;
    const converter = new Converter();
    const item = converter.ToIsInIndexItem(input);

    expect(item.figi).toBe("test1");
    expect(item.isIn).toBe("test2");
    expect(item.companyName).toBe("test3");
  });

  it ('should throw ParserErrorEmptyJSONString error for empty JSON string', () => {
    const input = "";
    const converter = new Converter();

    expect(() =>  converter.ToIsInIndexItem(input)).toThrowError(ConverterErrorEmptyJSONString);
  });

  it ('should throw ParserErrorMissingProperties error for missing figi property in JSON string', () => {
    const input = `{"isin": "test2", "companyname": "test3"}`;
    const converter = new Converter();

    expect(() =>  converter.ToIsInIndexItem(input)).toThrowError(ConverterErrorMissingProperties);
  })

  it ('should throw ConverterErrorEmptyPropertyValue error for empty figi property in JSON string', () => {
    const input = `{"isin": "test2", "companyname": "test3", "figi": ""}`;
    const converter = new Converter();

    expect(() =>  converter.ToIsInIndexItem(input)).toThrowError(ConverterErrorEmptyPropertyValue);
  })
});
