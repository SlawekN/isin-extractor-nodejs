import { Converter } from './Converter';
import { ISINIndexItem } from './ISINIndexItem';
import { AppError } from '../error/AppError';

describe('Converter', () => {
  describe('ToISINIndexItem', () => {
    it('when valid JSON string is specified, then returns IsInIndexItem', () => {
      const json = `{"figiId": "test1", "isin": "test2", "companyName": "test3", "documentId": "123456"}`;
      const converter = new Converter();

      const item: ISINIndexItem = converter.ToISINIndexItem(json);

      expect(item.figiId).toBe('test1');
      expect(item.isin).toBe('test2');
      expect(item.companyName).toBe('test3');
      expect(item.documentId).toBe('123456');
    });

    it('when empty JSON string is specified, then throws AppError', () => {
      const converter = new Converter();

      expect(() => converter.ToISINIndexItem('')).toThrowError(AppError);
    });

    it('when non JSON string is specified, then throws AppError', () => {
      const converter = new Converter();

      expect(() => converter.ToISINIndexItem('abcd')).toThrowError(AppError);
    });

    it('when there is less than 4 properties in JSON string, then throws AppError', () => {
      const input = `{"isin": "test2", "companyName": "test3"}`;

      const converter = new Converter();

      expect(() => converter.ToISINIndexItem(input)).toThrow(AppError);
    });

    it('when there is more than 6 properties in JSON string, then throws AppError', () => {
      const input = `{"figiId": "test1", "isin": "test2", "companyName": "test3", "documentId": "123456", "foundText" : "abc", "ticker": "tikcer", "dummy": "hello"}`;
      const converter = new Converter();

      expect(() => converter.ToISINIndexItem(input)).toThrow(AppError);
    });

    it('when missing figiId property in JSON string, then throws AppError', () => {
      const input = `{"documentId": "12321321", "isin": "test2", "companyName": "test3", "ticker": "test4", "foundText": "abc" }`;
      const converter = new Converter();

      expect(() => converter.ToISINIndexItem(input)).toThrow(AppError);
    });

    it('when empty figiId property value in JSON string, then throws AppError', () => {
      const input = `{"documentId": "12321321", "isin": "test2", "companyName": "test3", "figiId": "" }`;
      const converter = new Converter();

      expect(() => converter.ToISINIndexItem(input)).toThrow(AppError);
    });

    it('when invalid property name in JSON string, then throws AppError', () => {
      const input = `{"documentId": "12321321", "isin": "test2", "companyName": "test3", "figiId": "1234", "dummy": "Hello" }`;
      const converter = new Converter();

      expect(() => converter.ToISINIndexItem(input)).toThrow(AppError);
    });
  });
});
