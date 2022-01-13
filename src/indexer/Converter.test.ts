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
      expect(result.error.isNull()).toBe(true);
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
      expect(result.item.isNull()).toBe(true);
      expect(result.error.code).toBe(ErrorCodes.EMPTY_STRING);
    });

    it('when non JSON string is specified, then return error with JSON_PARSE_EXCEPTION code', () => {
      // Arrange
      const converter = new Converter();

      // Act
      const result = converter.ToISINIndexItem('abcd');

      // Assert
      expect(result.item.isNull()).toBe(true);
      expect(result.error.code).toBe(ErrorCodes.JSON_PARSE_EXCEPTION);
    });
  });
});
