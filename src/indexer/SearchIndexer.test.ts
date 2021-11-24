import { SearchIndexer } from './SearchIndexer';

jest.mock('fs');

describe('SearchIndexer', () => {
  describe('IndexDocument', () => {
    beforeAll(() => jest.spyOn(console, 'error').mockImplementation());
    afterAll(() => jest.spyOn(console, 'error').mockRestore());

    it('when valid JSON string is specified, then return OK', () => {
      // Arrange
      const input = `{"figiId": "test1", "isin": "test2", "companyName": "test3", "documentId" : "12342"}`;
      const indexer = new SearchIndexer();

      // Act
      const result = indexer.IndexDocument(input);

      // Assert
      expect(result).toBe('OK');
    });

    it('when empty JSON string is specified, then return NOT OK', () => {
      // Arrange
      const input = '';
      const indexer = new SearchIndexer();

      // Act
      const result = indexer.IndexDocument(input);

      // Assert
      expect(result).toBe('NOT OK');
    });
  });
});
