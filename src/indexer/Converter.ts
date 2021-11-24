import { ISINIndexItem } from './ISINIndexItem';
import { AppError } from '../error/AppError';

enum ErrorCodes {
  EMPTY_STRING = 1,
  UNKNOWN_PROPERTY,
  PROPERTIES_NUMBER_EXCEEDED,
  INSUFFICIENT_PROPERTIES_NUMBER,
  EMPTY_PROPERTY_VALUE,
  JSON_PARSE_EXCEPTION,
  OK,
}

const CONVERTER_ERROR = 'CONVERTER_ERROR';

class Converter {
  private readonly optionalJsonProps = ['ticker', 'foundText'];
  private readonly obligatoryJsonProps = ['documentId', 'isin', 'companyName', 'figiId'];
  private readonly validJsonProps = [...this.obligatoryJsonProps, ...this.optionalJsonProps];
  private readonly propsLimit = this.obligatoryJsonProps.length + this.optionalJsonProps.length;

  public ToISINIndexItem(jsonText: string) {
    const result = this.toJSON(jsonText);
    if (result.error)
      return { error: result.error, item: null };

    return { error: null, item: Object.assign(ISINIndexItem, result.jsonObject) };
  }

  private toJSON(jsonText: string) {
    if (!jsonText.length) {
      const desc = 'provided empty JSON string for parsing';
      return { jsonObject: null, error: new AppError(`ConverterError`, ErrorCodes.EMPTY_STRING, desc) };
    }

    const parseResult = (() => {
      try {
        return { jsonObject: JSON.parse(jsonText), error: null };
      } catch (err) {
        return { jsonObject: null, error: new AppError(CONVERTER_ERROR, ErrorCodes.JSON_PARSE_EXCEPTION, err.message) };
      }
    })();

    if (parseResult.error)
      return { jsonObject: null, error: parseResult.error };

    const validationJSONError = this.validateJSON(parseResult.jsonObject);
    if (validationJSONError)
      return { jsonObject: null, error: validationJSONError };

    return {
      jsonObject: parseResult.jsonObject,
      error: null,
    };
  }

  private validateJSON(jsonObject): AppError {
    const jsonObjectKeys = Object.keys(jsonObject);

    const propertiesNumberError = this.checkJSONPropertiesNumber(jsonObjectKeys);
    if (propertiesNumberError)
      return propertiesNumberError;

    const missingPropertiesError = this.checkJSONMissingProperties(jsonObjectKeys);
    if (missingPropertiesError)
      return missingPropertiesError;

    const propertiesNamesError = this.checkJSONPropertiesNames(jsonObjectKeys);
    if (propertiesNamesError)
      return propertiesNamesError;

    const propertiesValuesError = Converter.checkJSONPropertiesValues(jsonObject);
    if (propertiesValuesError)
      return propertiesValuesError;

    return null;
  }

  private checkJSONPropertiesNames(jsonObjectKeys: string[]): AppError {
    for (const key of jsonObjectKeys) {
      if (this.validJsonProps.indexOf(key) < 0) {
        const desc = `unknown ${key} property key in JSON string. Only allowed ${this.validJsonProps}`;
        return new AppError(CONVERTER_ERROR, ErrorCodes.UNKNOWN_PROPERTY, desc);
      }
    }
    return null;
  }

  private static checkJSONPropertiesValues(jsonObject): AppError {
    const keys = Object.keys(jsonObject);
    for (const key of keys) {
      const value = jsonObject[key];
      if (!value || value?.length === 0) {
        const desc = `value of ${key} property is empty`;
        return new AppError(CONVERTER_ERROR, ErrorCodes.EMPTY_PROPERTY_VALUE, desc);
      }
    }
    return null;
  }

  private checkJSONPropertiesNumber(jsonObjectKeys: string[]): AppError {
    const propsNumber: number = jsonObjectKeys.length;
    if (propsNumber < this.obligatoryJsonProps.length) {
      const desc = `there is ${propsNumber} properties in JSON string, there should at least ${this.obligatoryJsonProps.length}`;
      return new AppError(CONVERTER_ERROR, ErrorCodes.INSUFFICIENT_PROPERTIES_NUMBER, desc);
    }
    if (propsNumber > this.propsLimit) {
      const desc = `there is ${propsNumber} properties in JSON string, there should be maximum ${this.propsLimit}`;
      return new AppError(CONVERTER_ERROR, ErrorCodes.PROPERTIES_NUMBER_EXCEEDED, desc);
    }
    return null;
  }

  private checkJSONMissingProperties(jsonObjectKeys: string[]): AppError {
    const missedProperties: string[] = [];
    for (const prop of this.obligatoryJsonProps) {
      if (jsonObjectKeys.indexOf(prop) < 0)
        missedProperties.push(prop);
    }
    if (missedProperties.length > 0) {
      const desc = `missing ${missedProperties} properties in JSON string`;
      return new AppError(CONVERTER_ERROR, ErrorCodes.INSUFFICIENT_PROPERTIES_NUMBER, desc);
    }
    return null;
  }
}

export {
  ErrorCodes,
  Converter,
};
