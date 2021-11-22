import { Converter, ConverterError } from './Converter';

describe('Converter', () => {
  it('should convert valid JSON string describing single element to IsInIndexItem class Object', () => {
    const input = `{"figi": "test1", "isin": "test2", "companyname": "test3"}`;
    const converter = new Converter();
    const item = converter.ToISINIndexItem(input);

    expect(item.FIGI).toBe('test1');
    expect(item.ISIN).toBe('test2');
    expect(item.companyName).toBe('test3');
  });

  it('should throw ConverterError error for empty JSON string', () => {
    const input = '';
    const converter = new Converter();

    expect(() => converter.ToISINIndexItem(input)).toThrow(ConverterError);
  });

  it('should throw ConverterError error for missing figi property in JSON string', () => {
    const input = `{"isin": "test2", "companyname": "test3"}`;
    const converter = new Converter();

    expect(() => converter.ToISINIndexItem(input)).toThrow(ConverterError);
  });

  it('should throw ConverterErrorEmptyPropertyValue error for empty figi property in JSON string', () => {
    const input = `{"isin": "test2", "companyname": "test3", "figi": ""}`;
    const converter = new Converter();

    expect(() => converter.ToISINIndexItem(input)).toThrow(ConverterError);
  });

  it('should throw ConverterErrorEmptyPropertyValue error for invalid property in JSON string', () => {
    const input = `{"isin": "test2", "companyname": "test3", "random": ""}`;
    const converter = new Converter();

    expect(() => converter.ToISINIndexItem(input)).toThrow(ConverterError);
  });

  it('should throw ConverterErrorNonStringPropertyValue error for more than 3 properties in JSON string', () => {
    const input = `{"isin": "test2", "companyname": "test3", "figi": "test4", "dummy": "dummy"}`;
    const converter = new Converter();

    expect(() => converter.ToISINIndexItem(input)).toThrow(ConverterError);
  });
});
