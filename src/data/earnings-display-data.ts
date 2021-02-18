import { EarningsDisplayData } from '../types/earnings-display-data';
import { EMPTY_GENERAL_SECTION_OUTPUT_DATA } from './general-data';
import { EMPTY_BUSINESS_EXPENSES_SECTION_OUTPUT_DATA } from './business-expenses-data';
import { EMPTY_EARNINGS_SECTION_OUTPUT_DATA } from './earnings-data';
import { EMPTY_BANK_EXPENSES_SECTION_OUTPUT_DATA } from './bank-expenses-data';
import { EMPTY_SALARY_SECTION_OUTPUT_DATA } from './salary-data';
import { EMPTY_PERSONAL_INCOME_SECTION_OUTPUT_DATA } from './personal-income-data';

export const DEFAULT_EARNINGS_DISPLAY_DATA: EarningsDisplayData = {
  general: EMPTY_GENERAL_SECTION_OUTPUT_DATA,
  earnings: EMPTY_EARNINGS_SECTION_OUTPUT_DATA,
  businessExpenses: EMPTY_BUSINESS_EXPENSES_SECTION_OUTPUT_DATA,
  bankExpenses: EMPTY_BANK_EXPENSES_SECTION_OUTPUT_DATA,
  salary: EMPTY_SALARY_SECTION_OUTPUT_DATA,
  personalIncome: EMPTY_PERSONAL_INCOME_SECTION_OUTPUT_DATA
};
