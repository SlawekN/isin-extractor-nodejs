export class ISINIndexItem {
  public readonly figiId: string;
  public readonly isin: string;
  public readonly companyName: string;
  public readonly documentId: string;

  constructor(figiId: string, documentId: string, isin: string, companyName: string) {
    this.documentId = documentId;
    this.isin = isin;
    this.figiId = figiId;
    this.companyName = companyName;
  }
}
