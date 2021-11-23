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
  private _converter: Converter = new Converter();
  private readonly _path: string = 'output.csv';

  public IndexDocument(jsonText: string): string {
    try {
      const item: ISINIndexItem = this._converter.ToISINIndexItem(jsonText);
      const row: string = item.FIGI + ',' + item.ISIN + ',' + item.companyName + '\n';
      appendFile(this._path, row, AppendFileErrorCallback);
    } catch (err) {
      console.error(err);
      return 'NOT OK';
    }
    return 'OK';
  }
}
