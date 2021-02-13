import { EarningsSectionOutputData } from './earnings-section-output-data';
import { BusinessExpensesSectionOutputData } from '../business-expenses/business-expenses-section-output-data';

export interface EarningsDisplayData {
  readonly earningsSectionOutputData: EarningsSectionOutputData;
  readonly businessExpensesSectionOutputData: BusinessExpensesSectionOutputData;
}
