import { AppError, NullError } from '../error/AppError';

enum ErrorCodes {
  UNKNOWN_PROPERTY = 1,
  PROPERTIES_NUMBER_EXCEEDED,
  INSUFFICIENT_PROPERTIES_NUMBER,
  EMPTY_PROPERTY_VALUE,
}

const JSON_VERIFIER_ERROR = 'JSON_VERIFIER_ERROR';

class JSONVerifier {
  private readonly optionalJsonProps = ['ticker', 'foundText'];
  private readonly obligatoryJsonProps = ['documentId', 'isin', 'companyName', 'figiId'];
  private readonly validJsonProps = [...this.obligatoryJsonProps, ...this.optionalJsonProps];
  private readonly propsLimit = this.obligatoryJsonProps.length + this.optionalJsonProps.length;

  public checkJSONObject(jsonObject): AppError {
    const jsonObjectKeys = Object.keys(jsonObject);

    const propertiesNumberError = this.checkPropertiesNumber(jsonObjectKeys);
    if (!propertiesNumberError.isNull())
      return propertiesNumberError;

    const missingPropertiesError = this.checkMissingProperties(jsonObjectKeys);
    if (!missingPropertiesError.isNull())
      return missingPropertiesError;

    const propertiesNamesError = this.checkPropertiesNames(jsonObjectKeys);
    if (!propertiesNamesError.isNull())
      return propertiesNamesError;

    const propertiesValuesError = JSONVerifier.checkPropertiesValues(jsonObject);
    if (!propertiesValuesError.isNull())
      return propertiesValuesError;

    return new NullError();
  }

  private checkPropertiesNames(jsonObjectKeys: string[]): AppError {
    for (const key of jsonObjectKeys) {
      if (this.validJsonProps.indexOf(key) < 0) {
        const desc = `unknown ${key} property key in JSON string. Only allowed ${this.validJsonProps}`;
        return new AppError(JSON_VERIFIER_ERROR, ErrorCodes.UNKNOWN_PROPERTY, desc);
      }
    }
    return new NullError();
  }

  private static checkPropertiesValues(jsonObject): AppError {
    const keys = Object.keys(jsonObject);
    for (const key of keys) {
      const value = jsonObject[key];
      if (!value || value?.length === 0) {
        const desc = `value of ${key} property is empty`;
        return new AppError(JSON_VERIFIER_ERROR, ErrorCodes.EMPTY_PROPERTY_VALUE, desc);
      }
    }
    return new NullError();
  }

  private checkPropertiesNumber(jsonObjectKeys: string[]): AppError {
    const propsNumber: number = jsonObjectKeys.length;
    if (propsNumber < this.obligatoryJsonProps.length) {
      const desc = `there is ${propsNumber} properties in JSON string, there should at least ${this.obligatoryJsonProps.length}`;
      return new AppError(JSON_VERIFIER_ERROR, ErrorCodes.INSUFFICIENT_PROPERTIES_NUMBER, desc);
    }
    if (propsNumber > this.propsLimit) {
      const desc = `there is ${propsNumber} properties in JSON string, there should be maximum ${this.propsLimit}`;
      return new AppError(JSON_VERIFIER_ERROR, ErrorCodes.PROPERTIES_NUMBER_EXCEEDED, desc);
    }
    return new NullError();
  }

  private checkMissingProperties(jsonObjectKeys: string[]): AppError {
    const missedProperties: string[] = [];
    for (const prop of this.obligatoryJsonProps) {
      if (jsonObjectKeys.indexOf(prop) < 0)
        missedProperties.push(prop);
    }
    if (missedProperties.length > 0) {
      const desc = `missing ${missedProperties} properties in JSON string`;
      return new AppError(JSON_VERIFIER_ERROR, ErrorCodes.INSUFFICIENT_PROPERTIES_NUMBER, desc);
    }
    return new NullError();
  }
}

export {
  JSONVerifier,
  ErrorCodes,
};
