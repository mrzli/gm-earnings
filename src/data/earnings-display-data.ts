import { EarningsDisplayData } from '../types/earnings/earnings-display-data';
import { EMPTY_BUSINESS_EXPENSES_SECTION_OUTPUT_DATA } from './business-expenses-data';
import { EMPTY_EARNINGS_SECTION_OUTPUT_DATA } from './earnings-data';
import { EMPTY_BANK_EXPENSES_SECTION_OUTPUT_DATA } from './bank-expenses-data';
import { EMPTY_SALARY_SECTION_OUTPUT_DATA } from './salary-data';

export const DEFAULT_EARNINGS_DISPLAY_DATA: EarningsDisplayData = {
  earnings: EMPTY_EARNINGS_SECTION_OUTPUT_DATA,
  businessExpenses: EMPTY_BUSINESS_EXPENSES_SECTION_OUTPUT_DATA,
  bankExpenses: EMPTY_BANK_EXPENSES_SECTION_OUTPUT_DATA,
  salary: EMPTY_SALARY_SECTION_OUTPUT_DATA
};
