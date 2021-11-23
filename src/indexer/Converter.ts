import { ISINIndexItem } from './ISINIndexItem';
import { AppError } from '../error/AppError';

enum ErrorCodes {
  EMPTY_STRING = 1,
  UNKNOWN_PROPERTY,
  PROPERTIES_NUMBER_EXCEEDED,
  EMPTY_PROPERTY_VALUE,
}

const CONVERTER_ERROR = 'CONVERTER_ERROR';

export class Converter {
  private readonly _propsLimit: number = 3;

  public ToISINIndexItem(jsonText: string): ISINIndexItem {
    const object = this.toJSON(jsonText);
    const item: ISINIndexItem = Object.assign(ISINIndexItem, object);

    const lookup = new Map();
    lookup.set('ISIN', item.ISIN.length);
    lookup.set('FIGI', item.ISIN.length);
    lookup.set('companyName', item.companyName.length);

    for (const [key, value] of lookup) {
      if (value.length == 0) {
        const desc = `value of ${key} property is empty`;
        throw new AppError(CONVERTER_ERROR, ErrorCodes.EMPTY_PROPERTY_VALUE, desc);
      }
    }
    return item;
  }

  private toJSON(jsonText: string) {
    if (!jsonText.length) {
      const desc = 'provided empty JSON string for parsing';
      throw new AppError(`ConverterError`, ErrorCodes.EMPTY_STRING, desc);
    }

    const object = JSON.parse(jsonText);
    const propsNumber: number = Object.keys(object).length;
    if (this._propsLimit != propsNumber) {
      const desc = `there is ${propsNumber} properties in JSON string, there should be maximum ${this._propsLimit}`;
      throw new AppError(CONVERTER_ERROR, ErrorCodes.PROPERTIES_NUMBER_EXCEEDED, desc);
    }

    const keys = Object.keys(object);
    for (const key of keys) {
      if (key != 'FIGI' && key != 'ISIN' && key != 'companyName') {
        const desc = `unknown ${key} property key in JSON string. Only allowed figi, companyname, isin`;
        throw new AppError(CONVERTER_ERROR, ErrorCodes.UNKNOWN_PROPERTY, desc);
      }
    }
    return object;
  }
}

