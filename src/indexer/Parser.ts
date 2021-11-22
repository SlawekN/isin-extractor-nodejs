import { IsInIndexItem} from './IsInIndexItem';
import { ParserErrorEmptyJSONString, ParserErrorMissingProperties } from './Error';

interface JSONBody {
  figi: string;
  isin: string;
  companyname: string;
}

class Parser {
  private static hasUndefinedProperties(obj: JSONBody): boolean {
    const missingISIN = obj.isin === undefined;
    const missingFigi = obj.figi ===  undefined;
    const missingCompanyName = obj.companyname === undefined;
    return missingISIN || missingFigi ||  missingCompanyName;
  }

  public ConvertToIsInIndexItem(jsonText: string): IsInIndexItem {
    if (!jsonText.length)
      throw ParserErrorEmptyJSONString;

    const obj: JSONBody = JSON.parse(jsonText);
    const missingProperties: boolean = Parser.hasUndefinedProperties(obj)
    if (missingProperties) {
      throw ParserErrorMissingProperties;
    }

    return new IsInIndexItem(obj.figi, obj.isin, obj.companyname)
  }
}

export {
  Parser,
}
