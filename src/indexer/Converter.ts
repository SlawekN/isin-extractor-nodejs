import {
  ConverterErrorEmptyJSONString,
  ConverterErrorMissingProperties,
  ConverterErrorEmptyPropertyValue,
} from './Error';
import { IsInIndexItem } from './IsInIndexItem';

interface JSONBody {
  figi: string;
  isin: string;
  companyname: string;
}

class Converter {
  private static validateProperties(obj: JSONBody) {
    if (Converter.JSONUndefinedProperties(obj)) {
      throw ConverterErrorMissingProperties;
    }
    if (Converter.JSONEmptyPropertiesValue(obj)) {
      throw ConverterErrorEmptyPropertyValue;
    }
  }

  private static JSONEmptyPropertiesValue(obj: JSONBody): boolean {
    return (!obj.figi) || (!obj.isin) || (!obj.companyname)
  }

  private static JSONUndefinedProperties(obj: JSONBody) {
    const missingISIN = obj.isin === undefined;
    const missingFigi = obj.figi === undefined;
    const missingCompanyName = obj.companyname === undefined;
    return missingISIN || missingFigi || missingCompanyName;
  }

  public ToIsInIndexItem(jsonText: string): IsInIndexItem {
    if (!jsonText.length)
      throw ConverterErrorEmptyJSONString;

    const obj: JSONBody = JSON.parse(jsonText);
    Converter.validateProperties(obj);
    return new IsInIndexItem(obj.figi, obj.isin, obj.companyname);
  }
}

export {
  Converter,
}
