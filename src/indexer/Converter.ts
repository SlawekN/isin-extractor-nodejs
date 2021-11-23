import { ISINIndexItem } from './ISINIndexItem';
import { AppError } from '../error/AppError';

enum ErrorCodes {
  EMPTY_STRING = 1,
  UNKNOWN_PROPERTY,
  PROPERTIES_NUMBER_EXCEEDED,
  EMPTY_PROPERTY_VALUE,
  UNDEFINED_PROPERTY_VALUE,
}

const CONVERTER_ERROR = 'CONVERTER_ERROR';

export class Converter {
  private readonly _propsLimit: number = 3;

  private validateObjectProperties(obj) {
    const propsNumber: number = Object.keys(obj).length;
    if (this._propsLimit != propsNumber) {
      const desc = `there is ${propsNumber} properties in JSON string, there should be maximum ${this._propsLimit}`;
      throw new AppError(CONVERTER_ERROR, ErrorCodes.PROPERTIES_NUMBER_EXCEEDED, desc);
    }

    Object.keys(obj).forEach((key: string) => {
      const val = obj[key];
      if (key != 'figi' && key != 'isin' && key != 'companyname') {
        const desc = `unknown ${key} property key in JSON string. Only allowed figi, companyname, isin`;
        throw new AppError(CONVERTER_ERROR, ErrorCodes.UNKNOWN_PROPERTY, desc);
      }
      if (val === undefined) {
        const desc = `value of ${key} is undefined`;
        throw new AppError(CONVERTER_ERROR, ErrorCodes.UNDEFINED_PROPERTY_VALUE, desc);
      }
      if (val.length == 0) {
        const desc = `value of ${key} property is empty`;
        throw new AppError(CONVERTER_ERROR, ErrorCodes.EMPTY_PROPERTY_VALUE, desc);
      }
    });
  }

  public ToISINIndexItem(jsonText: string): ISINIndexItem {
    if (!jsonText.length) {
      const desc = 'provided empty JSON string for parsing';
      throw new AppError(`ConverterError`, ErrorCodes.EMPTY_STRING, desc);
    }

    const object = JSON.parse(jsonText);
    this.validateObjectProperties(object);
    return new ISINIndexItem(object.figi, object.isin, object.companyname);
  }
}

