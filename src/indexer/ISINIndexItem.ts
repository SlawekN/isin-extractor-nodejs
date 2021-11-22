export class ISINIndexItem {
  private _FIGI: string;
  private _ISIN: string;
  private _companyName: string;

  constructor(FIGI: string, ISIN: string, companyName: string) {
    this._ISIN = ISIN;
    this._FIGI = FIGI;
    this._companyName = companyName;
  }

  get ISIN(): string {
    return this._ISIN;
  }

  set ISIN(value: string) {
    this._ISIN = value;
  }

  get FIGI(): string {
    return this._FIGI;
  }

  set FIGI(value: string) {
    this._FIGI = value;
  }

  get companyName(): string {
    return this._companyName;
  }

  set companyName(value: string) {
    this._companyName = value;
  }
}
