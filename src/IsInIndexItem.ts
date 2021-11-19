export class IsInIndexItem {
  private _figi: string;
  private _isIn: string;
  private _companyName: string;

  constructor(figi: string, isIn: string, companyName: string) {
    this._isIn = isIn;
    this._figi = figi;
    this._companyName = companyName;
  }

  get isIn(): string {
    return this._isIn;
  }

  set isIn(value: string) {
    this._isIn = value;
  }

  get figi(): string {
    return this._figi;
  }

  set figi(value: string) {
    this._figi = value;
  }

  get companyName(): string {
    return this._companyName;
  }

  set companyName(value: string) {
    this._companyName = value;
  }
}
