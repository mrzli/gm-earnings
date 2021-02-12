import { EarningsSectionOutputData } from './earnings-section-output-data';
import { BusinessExpenseItem } from '../business-expense-item';
import { PersonalExpenseItem } from '../personal-expense-item';

export interface EarningsDisplayData {
  readonly earningsSectionOutputData: EarningsSectionOutputData;
  readonly businessExpenseItems: readonly BusinessExpenseItem[];
  readonly personalExpenseItems: readonly PersonalExpenseItem[];
}
