import { Parser } from './Parser';
import {ParserErrorEmptyJSONString, ParserErrorMissingProperties} from './Error';

describe('Parser', () => {
  it('should convert valid JSON string describing single element to IsInIndexItem class Object', () => {
    const input = `{"figi": "test1", "isin": "test2", "companyname": "test3"}`;
    const parser = new Parser();
    const item = parser.ConvertToIsInIndexItem(input);

    expect(item.figi).toBe("test1");
    expect(item.isIn).toBe("test2");
    expect(item.companyName).toBe("test3");
  });

  it ('should throw ParserErrorEmptyJSONString error for empty JSON string', () => {
    const input = "";
    const parser = new Parser();

    expect(() =>  parser.ConvertToIsInIndexItem(input)).toThrowError(ParserErrorEmptyJSONString);
  });

  it ('should throw ParserErrorMissingProperties error for missing figi property in JSON string', () => {
    const input = `{"isin": "test2", "companyname": "test3"}`;
    const parser = new Parser();

    expect(() =>  parser.ConvertToIsInIndexItem(input)).toThrowError(ParserErrorMissingProperties);
  })
});
