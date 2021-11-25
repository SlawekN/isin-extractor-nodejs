import { Converter } from './Converter';
import { RowAppender } from './RowAppender';

interface ISearchIndexer {
  IndexDocument(jsonText: string): string;
}

const OK = 'OK';
const NOT_OK = 'NOT OK';

export class SearchIndexer implements ISearchIndexer {
  private converter: Converter = new Converter();
  private readonly path: string = 'output.csv';

  public IndexDocument(jsonText: string): string {
    const conversionResult = this.converter.ToISINIndexItem(jsonText);
    if (!conversionResult.error.isNull())
      return NOT_OK;

    const item = conversionResult.item;
    const row: string = item.figiId + ',' + item.documentId + ',' + item.isin + ',' + item.companyName + '\n';

    const appenderResultError = RowAppender(this.path, row);
    if (!appenderResultError.isNull())
      return NOT_OK;

    return OK;
  }
}
