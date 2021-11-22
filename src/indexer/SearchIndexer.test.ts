import { SearchIndexer, ErrorCallback } from './SearchIndexer';
import * as fs from 'fs';

jest.mock('fs');

describe('SearchIndexer', () => {
  it('should call appendFile once with: output.csv, test1,test2,test3, ErrorCallback', () => {
    const input = `{"figi": "test1", "isin": "test2", "companyname": "test3"}`;
    const indexer = new SearchIndexer();

    expect(indexer.IndexDocument(input)).toBe('OK');
    expect(fs.appendFile).toHaveBeenCalledTimes(1);
    expect(fs.appendFile).toHaveBeenCalledWith('output.csv', 'test1,test2,test3\n', ErrorCallback);
  })
});
