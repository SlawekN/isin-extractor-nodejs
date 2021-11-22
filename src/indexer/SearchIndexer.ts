import { Converter } from './Converter';
import { ISINIndexItem } from './ISINIndexItem';
import { appendFile } from 'fs';

interface ISearchIndexer {
  IndexDocument(jsonText: string): string;
}

const ErrorCallback = (err) => {
  if (err)
    throw err;
}

class SearchIndexer implements ISearchIndexer {
  private _converter: Converter;
  private readonly _path: string;

  constructor() {
    this._path = 'output.csv';
    this._converter = new Converter();
  }

  public IndexDocument(_jsonText: string): string {
    const item: ISINIndexItem = this._converter.ToISINIndexItem(_jsonText);
    const row: string = item.FIGI + ',' + item.ISIN + ',' + item.companyName + '\n';
    appendFile(this._path, row, ErrorCallback);
    return 'OK';
  }
}

export {
  ErrorCallback,
  SearchIndexer
}
