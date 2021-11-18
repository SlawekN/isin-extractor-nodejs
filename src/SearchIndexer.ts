interface ISearchIndexer {
  IndexDocument(jsonText: string): string
}

class SearchIndexer implements ISearchIndexer {
  IndexDocument(_jsonText: string): string {
    return "OK";
  }
}
