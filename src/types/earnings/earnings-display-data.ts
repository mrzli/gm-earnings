import { EarningsSectionOutputData } from './earnings-section-output-data';
import { BusinessExpensesSectionOutputData } from '../business-expenses/business-expenses-section-output-data';
import { BankExpensesSectionOutputData } from '../bank-expenses/bank-expenses-section-output-data';
import { SalarySectionOutputData } from '../salary/salary-section-output-data';

export interface EarningsDisplayData {
  readonly earningsSectionOutputData: EarningsSectionOutputData;
  readonly businessExpensesSectionOutputData: BusinessExpensesSectionOutputData;
  readonly bankExpensesSectionOutputData: BankExpensesSectionOutputData;
  readonly salarySectionOutputData: SalarySectionOutputData;
}
