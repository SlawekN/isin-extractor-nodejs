import { Converter } from './Converter';
import { AppError } from '../error/AppError';
import { ISINIndexItem } from './ISINIndexItem';

describe('Converter', () => {
  it('should convert valid JSON string describing single element to IsInIndexItem class Object', () => {
    const input = `{"figiId": "test1", "isin": "test2", "companyName": "test3"}`;
    const converter = new Converter();
    const item: ISINIndexItem = converter.ToISINIndexItem(input);

    expect(item.figiId).toBe('test1');
    expect(item.isin).toBe('test2');
    expect(item.companyName).toBe('test3');
  });

  it('should throw ConverterError error for empty JSON string', () => {
    const input = '';
    const converter = new Converter();

    expect(() => converter.ToISINIndexItem(input)).toThrowError(AppError);
  });

  xit('should throw ConverterError error for missing figiId property in JSON string', () => {
    const input = `{"isin": "test2", "companyName": "test3"}`;
    const converter = new Converter();

    expect(() => converter.ToISINIndexItem(input)).toThrow(AppError);
  });

  it('should throw ConverterErrorEmptyPropertyValue error for empty figiId property in JSON string', () => {
    const input = `{"isin": "test2", "companyName": "test3", "figi": ""}`;
    const converter = new Converter();

    expect(() => converter.ToISINIndexItem(input)).toThrow(AppError);
  });

  it('should throw ConverterErrorEmptyPropertyValue error for invalid property in JSON string', () => {
    const input = `{"isin": "test2", "companyName": "test3", "random": ""}`;
    const converter = new Converter();

    expect(() => converter.ToISINIndexItem(input)).toThrow(AppError);
  });

  it('should throw ConverterErrorNonStringPropertyValue error for more than 3 properties in JSON string', () => {
    const input = `{"isin": "test2", "companyName": "test3", "figi": "test4", "dummy": "dummy"}`;
    const converter = new Converter();

    expect(() => converter.ToISINIndexItem(input)).toThrow(AppError);
  });
});
