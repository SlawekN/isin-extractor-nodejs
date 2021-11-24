import { Converter, ErrorCodes } from './Converter';

describe('Converter', () => {
  describe('ToISINIndexItem', () => {
    it('when valid JSON string is specified, then returns IsInIndexItem', () => {
      // Arrange
      const json = `{"figiId": "test1", "isin": "test2", "companyName": "test3", "documentId": "123456"}`;
      const converter = new Converter();

      // Act
      const result = converter.ToISINIndexItem(json);

      // Assert
      expect(result.error).toBe(null);
      expect(result.item.figiId).toBe('test1');
      expect(result.item.isin).toBe('test2');
      expect(result.item.companyName).toBe('test3');
      expect(result.item.documentId).toBe('123456');
    });

    it('when empty JSON string is specified, then returns error with EMPTY_STRING code', () => {
      // Arrange
      const converter = new Converter();

      // Act
      const result = converter.ToISINIndexItem('');

      // Assert
      expect(result.item).toBe(null);
      expect(result.error.code).toBe(ErrorCodes.EMPTY_STRING);
    });

    it('when non JSON string is specified, then return error with JSON_PARSE_EXCEPTION code', () => {
      // Arrange
      const converter = new Converter();

      // Act
      const result = converter.ToISINIndexItem('abcd');

      // Assert
      expect(result.item).toBe(null);
      expect(result.error.code).toBe(ErrorCodes.JSON_PARSE_EXCEPTION);
    });

    it('when there is less than 4 properties in JSON string, then return error with INSUFFICIENT_PROPERTIES_NUMBER code', () => {
      // Arrange
      const input = `{"isin": "test2", "companyName": "test3"}`;
      const converter = new Converter();

      // Act
      const result = converter.ToISINIndexItem(input);

      // Assert
      expect(result.item).toBe(null);
      expect(result.error.code).toBe(ErrorCodes.INSUFFICIENT_PROPERTIES_NUMBER);
    });

    it('when there is more than 6 properties in JSON string, then returns error with PROPERTIES_NUMBER_EXCEEDED code', () => {
      // Arrange
      const input = `{"figiId": "test1", "isin": "test2", "companyName": "test3", "documentId": "123456", "foundText" : "abc", "ticker": "tikcer", "dummy": "hello"}`;
      const converter = new Converter();

      // Act
      const result = converter.ToISINIndexItem(input);

      // Assert
      expect(result.item).toBe(null);
      expect(result.error.code).toBe(ErrorCodes.PROPERTIES_NUMBER_EXCEEDED);
    });

    it('when missing figiId property in JSON string, then return error with INSUFFICIENT_PROPERTIES_NUMBER code', () => {
      // Arrange
      const input = `{"documentId": "12321321", "isin": "test2", "companyName": "test3", "ticker": "test4", "foundText": "abc" }`;
      const converter = new Converter();

      // Act
      const result = converter.ToISINIndexItem(input);

      // Assert
      expect(result.item).toBe(null);
      expect(result.error.code).toBe(ErrorCodes.INSUFFICIENT_PROPERTIES_NUMBER);
    });


    it('when empty figiId property value in JSON string, then return error with EMPTY_PROPERTY_VALUE code', () => {
      // Arrange
      const input = `{"documentId": "12321321", "isin": "test2", "companyName": "test3", "figiId": "" }`;
      const converter = new Converter();

      // Act
      const result = converter.ToISINIndexItem(input);

      // Assert
      expect(result.item).toBe(null);
      expect(result.error.code).toBe(ErrorCodes.EMPTY_PROPERTY_VALUE);
    });

    it('when invalid property name in JSON string, then return error with UNKNOWN_PROPERTY code', () => {
      // Arrange
      const input = `{"documentId": "12321321", "isin": "test2", "companyName": "test3", "figiId": "1234", "dummy": "Hello" }`;
      const converter = new Converter();

      // Act
      const result = converter.ToISINIndexItem(input);

      // Assert
      expect(result.item).toBe(null);
      expect(result.error.code).toBe(ErrorCodes.UNKNOWN_PROPERTY);
    });
  });
});
