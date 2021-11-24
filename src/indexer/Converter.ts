import { ISINIndexItem } from './ISINIndexItem';
import { AppError } from '../error/AppError';

enum ErrorCodes {
  EMPTY_STRING = 1,
  UNKNOWN_PROPERTY,
  PROPERTIES_NUMBER_EXCEEDED,
  INSUFFICIENT_PROPERTIES_NUMBER,
  EMPTY_PROPERTY_VALUE,
  JSON_PARSE_EXCEPTION,
}

const CONVERTER_ERROR = 'CONVERTER_ERROR';

export class Converter {
  private readonly optionalJsonProps = ['ticker', 'foundText'];
  private readonly obligatoryJsonProps = ['documentId', 'isin', 'companyName', 'figiId'];
  private readonly validJsonProps = [...this.obligatoryJsonProps, ...this.optionalJsonProps];
  private readonly propsLimit = this.obligatoryJsonProps.length + this.optionalJsonProps.length;

  public ToISINIndexItem(jsonText: string): ISINIndexItem {
    const object = this.toJSON(jsonText);
    const item: ISINIndexItem = Object.assign(ISINIndexItem, object);

    const keys = Object.keys(object);

    for (const key of keys) {
      const value = object[key];
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

    const jsonObject = (() => {
      try {
        return JSON.parse(jsonText);
      } catch (err) {
        throw new AppError(CONVERTER_ERROR, ErrorCodes.JSON_PARSE_EXCEPTION, err.message);
      }
    })();

    // validation will be extracted to separate function
    const jsonObjectKeys = Object.keys(jsonObject);
    const propsNumber: number = jsonObjectKeys.length;

    if (propsNumber < this.obligatoryJsonProps.length) {
      const desc = `there is ${propsNumber} properties in JSON string, there should at least ${this.obligatoryJsonProps.length}`;
      throw new AppError(CONVERTER_ERROR, ErrorCodes.INSUFFICIENT_PROPERTIES_NUMBER, desc);
    }

    if (propsNumber > this.propsLimit) {
      const desc = `there is ${propsNumber} properties in JSON string, there should be maximum ${this.propsLimit}`;
      throw new AppError(CONVERTER_ERROR, ErrorCodes.PROPERTIES_NUMBER_EXCEEDED, desc);
    }

    const missedProperties: string[] = [];
    for (const prop of this.obligatoryJsonProps) {
      if (jsonObjectKeys.indexOf(prop) < 0)
        missedProperties.push(prop);
    }

    if (missedProperties.length > 0) {
      const desc = `there are missing properties in JSON string ${missedProperties}`;
      throw new AppError(CONVERTER_ERROR, ErrorCodes.INSUFFICIENT_PROPERTIES_NUMBER, desc);
    }

    for (const key of jsonObjectKeys) {
      if (this.validJsonProps.indexOf(key) < 0) {
        const desc = `unknown ${key} property key in JSON string. Only allowed ${this.validJsonProps}`;
        throw new AppError(CONVERTER_ERROR, ErrorCodes.UNKNOWN_PROPERTY, desc);
      }
      const value = jsonObject[key];
      if (!value.length || value?.length === 0) {
        const desc = `value of ${key} property is empty`;
        throw new AppError(CONVERTER_ERROR, ErrorCodes.EMPTY_PROPERTY_VALUE, desc);
      }
    }

    return jsonObject;
  }
}

