import { ISINIndexItem, NullISINIndexItem } from './ISINIndexItem';
import { AppError, NullError } from '../error/AppError';
import { JSONValidator } from './JSONValidator';

enum ErrorCodes {
  EMPTY_STRING = 1,
  JSON_PARSE_EXCEPTION,
}

const CONVERTER_ERROR = 'CONVERTER_ERROR';

class Converter {
  private validator: JSONValidator = new JSONValidator();

  public ToISINIndexItem(jsonText: string) {
    const result = this.toJSON(jsonText);
    if (!result.error.isNull())
      return { error: result.error, item: new NullISINIndexItem() };

    const item: ISINIndexItem = Object.assign(ISINIndexItem, result.jsonObject);
    return { error: new NullError(), item: item };
  }

  private toJSON(jsonText: string) {
    if (!jsonText.length) {
      const desc = 'provided empty JSON string for parsing';
      return { jsonObject: null, error: new AppError(`ConverterError`, ErrorCodes.EMPTY_STRING, desc) };
    }

    const parseResult = (() => {
      try {
        return { jsonObject: JSON.parse(jsonText), error: new NullError() };
      } catch (err) {
        return { jsonObject: null, error: new AppError(CONVERTER_ERROR, ErrorCodes.JSON_PARSE_EXCEPTION, err.message) };
      }
    })();

    if (!parseResult.error.isNull())
      return { jsonObject: null, error: parseResult.error };

    const validationJSONError = this.validator.validate(parseResult.jsonObject);
    if (!validationJSONError.isNull())
      return { jsonObject: null, error: validationJSONError };

    return { jsonObject: parseResult.jsonObject, error: new NullError() };
  }
}

export {
  ErrorCodes,
  Converter,
};
