import { SearchIndexer } from './SearchIndexer';
import { appendFile } from 'fs';

jest.mock('fs');

describe('SearchIndexer', () => {
  beforeAll(() => jest.spyOn(console, 'error').mockImplementation());
  afterAll(() => jest.spyOn(console, 'error').mockRestore());

  it('should call appendFile once with: output.csv, test1,test2,test3, ErrorCallback', () => {
    const input = `{"figiId": "test1", "isin": "test2", "companyName": "test3", "documentId" : "12342"}`;

    const indexer = new SearchIndexer();

    expect(indexer.IndexDocument(input)).toBe('OK');
    expect(appendFile).toHaveBeenCalledTimes(1);
  });

  it('should return NOT OK for passing empty string argument to IndexDocument method', () => {
    const input = '';

    const indexer = new SearchIndexer();

    expect(indexer.IndexDocument(input)).toBe('NOT OK');
  });
});
