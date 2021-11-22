import { ISINIndexItem } from './ISINIndexItem';

class Converter {
 private readonly _propsLimit: number = 3;

  private validateObjectProperties(obj) {
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

  public ToISINIndexItem(jsonText: string): ISINIndexItem {
    if (!jsonText.length)
      throw new ConverterError(`provided json string is empty`);

    const object = JSON.parse(jsonText);
    this.validateObjectProperties(object);
    return new ISINIndexItem(object.figi, object.isin, object.companyname);
  }
}

class ConverterError extends Error{
  constructor(message: string) {
    super(message);
    this.name = "ConverterError";
  }
}

export  {
  Converter,
  ConverterError,
}

