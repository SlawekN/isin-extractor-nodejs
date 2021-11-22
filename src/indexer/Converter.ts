import { ConverterError } from './Error';
import { IsInIndexItem } from './IsInIndexItem';

interface JSONBody {
  figi: string;
  isin: string;
  companyname: string;
}

class Converter {
  private readonly _propsLimit: number = 3;

  private validateProperties(obj: JSONBody) {
    const propsNumber: number = Object.keys(obj).length;
    if (this._propsLimit != propsNumber) {
      throw new ConverterError(`there is ${propsNumber} properties in JSON string, there should be maximum ${this._propsLimit}`);
    }

    Object.keys(obj).forEach((key: string) => {
      const val = obj[key];
      if (key != 'figi' && key != 'isin' && key != 'companyname')
        throw new ConverterError(`invalid ${key} property key in JSON string`);
      if (val === undefined)
        throw new ConverterError(`value of ${key} is undefined`);
      if (!val)
        throw new ConverterError(`value of ${key} is empty`);
    });
  }

  public ToIsInIndexItem(jsonText: string): IsInIndexItem {
    if (!jsonText.length)
      throw new ConverterError(`provided json string is empty`);

    const obj: JSONBody = JSON.parse(jsonText);
    this.validateProperties(obj);
    return new IsInIndexItem(obj.figi, obj.isin, obj.companyname);
  }
}

export {
  Converter,
};
