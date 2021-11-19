import { IsInIndexItem} from '../IsInIndexItem';
import { ParserErrorEmptyJSONString, ParserErrorMissingProperties } from './Error';

interface JSONBody {
  figi: string;
  isin: string;
  companyname: string;
}

class Parser {
  static hasUndefinedProperties(obj: JSONBody): boolean {
    const missingISIN = obj.isin === undefined;
    const missingFigi = obj.figi ===  undefined;
    const missingCompanyName = obj.companyname === undefined;
    return missingISIN || missingFigi ||  missingCompanyName;
  }

  static ToIsInIndexItem(_jsonText: string): IsInIndexItem {
    // validation will be extracted to separate private func
    if (!_jsonText.length)
      throw ParserErrorEmptyJSONString;

    const obj: JSONBody = JSON.parse(_jsonText);
    const missingProperties: boolean = this.hasUndefinedProperties(obj)
    if (missingProperties) {
      throw ParserErrorMissingProperties;
    }

    return new IsInIndexItem(obj.figi, obj.isin, obj.companyname)
  }
}

export {
  Parser,
}
