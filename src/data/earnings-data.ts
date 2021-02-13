import { BusinessExpenseItem } from '../types/business-expense-item';
import { ExpenseInterval } from '../types/expense-interval';
import { EMPTY_INPUT_AMOUNT_WITH_VAT, ZERO_AMOUNT } from './general-data';
import { EarningsSectionInputData } from '../types/earnings/earnings-section-input-data';
import { EarningsSectionOutputData } from '../types/earnings/earnings-section-output-data';
import { EarningsDisplayData } from '../types/earnings/earnings-display-data';

export const DEFAULT_EARNINGS_SECTION_INPUT_DATA: EarningsSectionInputData = {
  workingDays: 230,
  workingHours: 8,
  hourlyRate: {
    amount: '250.00',
    isVat: true
  }
};

export const EMPTY_EARNINGS_SECTION_OUTPUT_DATA: EarningsSectionOutputData = {
  isValid: false,
  totalEarnings: ZERO_AMOUNT,
  totalVat: ZERO_AMOUNT
};

export const DEFAULT_EARNINGS_DISPLAY_DATA: EarningsDisplayData = {
  earningsSectionOutputData: EMPTY_EARNINGS_SECTION_OUTPUT_DATA,
  businessExpenseItems: [],
  personalExpenseItems: []
};

export const EMPTY_BUSINESS_EXPENSE_ITEM: BusinessExpenseItem = {
  name: '',
  amount: EMPTY_INPUT_AMOUNT_WITH_VAT,
  interval: ExpenseInterval.Daily,
  quantity: 1
};
