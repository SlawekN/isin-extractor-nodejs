export class ISINIndexItem {
  public readonly FIGI: string;
  public readonly ISIN: string;
  public readonly companyName: string;

  constructor(FIGI: string, ISIN: string, companyName: string) {
    this.ISIN = ISIN;
    this.FIGI = FIGI;
    this.companyName = companyName;
  }
}
