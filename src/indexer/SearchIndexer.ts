import { Converter } from './Converter';
import { ISINIndexItem } from './ISINIndexItem';
import { appendFile } from 'fs';
import { AppError } from '../error/AppError';

interface ISearchIndexer {
  IndexDocument(jsonText: string): string;
}

enum ErrorCodes {
  APPEND_FILE_FAILED,
}

const INDEXER_ERROR = 'INDEXER_ERROR';

const AppendFileErrorCallback = (err) => {
  if (err)
    throw new AppError(INDEXER_ERROR, ErrorCodes.APPEND_FILE_FAILED, err.message);
};

export class SearchIndexer implements ISearchIndexer {
  private converter: Converter = new Converter();
  private readonly path: string = 'output.csv';

  public IndexDocument(jsonText: string): string {
    try {
      const item: ISINIndexItem = this.converter.ToISINIndexItem(jsonText);
      const row: string = item.figiId + ',' + item.isin + ',' + item.companyName + '\n';
      appendFile(this.path, row, AppendFileErrorCallback);
    } catch (err) {
      console.error(err);
      return 'NOT OK';
    }
    return 'OK';
  }
}
