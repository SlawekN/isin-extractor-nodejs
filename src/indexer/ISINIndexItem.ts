export class ISINIndexItem {
  public readonly figiId: string;
  public readonly isin: string;
  public readonly companyName: string;

  constructor(figiId: string, isin: string, companyName: string) {
    this.isin = isin;
    this.figiId = figiId;
    this.companyName = companyName;
  }
}
