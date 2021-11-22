import { Converter } from './Converter';
import { ISINIndexItem } from './ISINIndexItem';
import { appendFile } from 'fs';
import ErrnoException = NodeJS.ErrnoException;

interface ISearchIndexer {
  IndexDocument(jsonText: string): string;
}

export class SearchIndexer implements ISearchIndexer {
  private _converter: Converter;
  private readonly _path: string;

  constructor(path = 'output.csv') {
    this._path = path;
    this._converter = new Converter();
  }

  public IndexDocument(_jsonText: string): string {
    const item: ISINIndexItem = this._converter.ToISINIndexItem(_jsonText);
    const row : string = item.FIGI + "," + item.ISIN + "," + item.companyName + "\n";
    appendFile(this._path, row, (err: ErrnoException | null) => {
        if (err) throw err;
    });
    return 'OK';
  }
}
