import { EarningsDisplayData } from '../types/earnings/earnings-display-data';
import { EMPTY_BUSINESS_EXPENSES_SECTION_OUTPUT_DATA } from './business-expenses-data';
import { EMPTY_EARNINGS_SECTION_OUTPUT_DATA } from './earnings-data';

export const DEFAULT_EARNINGS_DISPLAY_DATA: EarningsDisplayData = {
  earningsSectionOutputData: EMPTY_EARNINGS_SECTION_OUTPUT_DATA,
  businessExpensesSectionOutputData: EMPTY_BUSINESS_EXPENSES_SECTION_OUTPUT_DATA
};
