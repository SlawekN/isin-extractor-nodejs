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
  private readonly propsLimit: number = 6;
  private readonly validJsonProps = ["documentId", "isin", "companyName", "figiId", "ticker", "foundText"];

  public ToISINIndexItem(jsonText: string): ISINIndexItem {
    const object = this.toJSON(jsonText);
    const item: ISINIndexItem = Object.assign(ISINIndexItem, object);

    const lookup = new Map();
    lookup.set('isin', item.isin);
    lookup.set('figiId', item.figiId);
    lookup.set('companyName', item.companyName);

    for (const [key, value] of lookup) {
      if (!value || value?.length === 0) {
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
    if (propsNumber > this.propsLimit) {
      const desc = `there is ${propsNumber} properties in JSON string, there should be maximum ${this.propsLimit}`;
      throw new AppError(CONVERTER_ERROR, ErrorCodes.PROPERTIES_NUMBER_EXCEEDED, desc);
    }

    const keys = Object.keys(object);
    for (const key of keys) {
      if (this.validJsonProps.indexOf(key) < 0) {
        const desc = `unknown ${key} property key in JSON string. Only allowed figiId, companyName, isin`;
        throw new AppError(CONVERTER_ERROR, ErrorCodes.UNKNOWN_PROPERTY, desc);
      }
    }

    return object;
  }
}

