import { EarningsSectionOutputData } from './earnings/earnings-section-output-data';
import { BusinessExpensesSectionOutputData } from './business-expenses/business-expenses-section-output-data';
import { BankExpensesSectionOutputData } from './bank-expenses/bank-expenses-section-output-data';
import { SalarySectionOutputData } from './salary/salary-section-output-data';
import { GeneralSectionOutputData } from './general/general-section-output-data';
import { PersonalIncomeSectionOutputData } from './personal-income/personal-income-section-output-data';

export interface EarningsDisplayData {
  readonly general: GeneralSectionOutputData;
  readonly earnings: EarningsSectionOutputData;
  readonly businessExpenses: BusinessExpensesSectionOutputData;
  readonly bankExpenses: BankExpensesSectionOutputData;
  readonly salary: SalarySectionOutputData;
  readonly personalIncome: PersonalIncomeSectionOutputData;
}
