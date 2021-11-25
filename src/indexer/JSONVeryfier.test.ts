import { JSONVerifier, ErrorCodes } from './JSONVerifier';

describe('JSONVerifier', () => {
  describe('checkJSONObject', () => {
    it('when there is less than 4 properties in JSON string, then return error with INSUFFICIENT_PROPERTIES_NUMBER code', () => {
      // Arrange
      const jsonText = `{"isin": "test2", "companyName": "test3"}`;
      const input = JSON.parse(jsonText);
      const verifier = new JSONVerifier();

      // Act
      const verifierError = verifier.checkJSONObject(input);

      // Assert
      expect(verifierError.isNull()).toBe(false);
      expect(verifierError.code).toBe(ErrorCodes.INSUFFICIENT_PROPERTIES_NUMBER);
    });

    it('when there is more than 6 properties in JSON string, then returns error with PROPERTIES_NUMBER_EXCEEDED code', () => {
      // Arrange
      const jsonText = `{"figiId": "test1", "isin": "test2", "companyName": "test3", "documentId": "123456", "foundText" : "abc", "ticker": "tikcer", "dummy": "hello"}`;
      const input = JSON.parse(jsonText);
      const verifier = new JSONVerifier();

      // Act
      const verifierError = verifier.checkJSONObject(input);

      // Assert
      expect(verifierError.isNull()).toBe(false);
      expect(verifierError.code).toBe(ErrorCodes.PROPERTIES_NUMBER_EXCEEDED);
    });

    it('when missing figiId property in JSON string, then return error with INSUFFICIENT_PROPERTIES_NUMBER code', () => {
      // Arrange
      const jsonText = `{"documentId": "12321321", "isin": "test2", "companyName": "test3", "ticker": "test4", "foundText": "abc" }`;
      const input = JSON.parse(jsonText);
      const verifier = new JSONVerifier();

      // Act
      const verifierError = verifier.checkJSONObject(input);

      // Assert
      expect(verifierError.isNull()).toBe(false);
      expect(verifierError.code).toBe(ErrorCodes.INSUFFICIENT_PROPERTIES_NUMBER);
    });

    it('when empty figiId property value in JSON string, then return error with EMPTY_PROPERTY_VALUE code', () => {
      // Arrange
      const jsonText = `{"documentId": "12321321", "isin": "test2", "companyName": "test3", "figiId": "" }`;
      const input = JSON.parse(jsonText);
      const verifier = new JSONVerifier();

      // Act
      const verifierError = verifier.checkJSONObject(input);

      // Assert
      expect(verifierError.isNull()).toBe(false);
      expect(verifierError.code).toBe(ErrorCodes.EMPTY_PROPERTY_VALUE);
    });

    it('when invalid property name in JSON string, then return error with UNKNOWN_PROPERTY code', () => {
      // Arrange
      const jsonText = `{"documentId": "12321321", "isin": "test2", "companyName": "test3", "figiId": "1234", "dummy": "Hello" }`;
      const input = JSON.parse(jsonText);
      const verifier = new JSONVerifier();

      // Act
      const verifierError = verifier.checkJSONObject(input);

      // Assert
      expect(verifierError.isNull()).toBe(false);
      expect(verifierError.code).toBe(ErrorCodes.UNKNOWN_PROPERTY);
    });
  });
});
