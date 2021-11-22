import { SearchIndexer } from './SearchIndexer';
import {vol} from 'memfs';

jest.mock("fs");

describe('SearchIndexer', () => {
  beforeEach(() => {
    vol.reset();
  });

  it('should add line to empty output.csv file', () => {
    const input = `{"figi": "test1", "isin": "test2", "companyname": "test3"}`;
    const indexer = new SearchIndexer();
    indexer.IndexDocument(input);



  });
});
