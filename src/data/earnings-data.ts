import { EarningsData } from '../types/earnings-data';
import { InputAmountWithVat } from '../types/input-amount-with-vat';
import { BusinessExpenseItem } from '../types/business-expense-item';
import { EarningsInputData } from '../types/earnings-input-data';
import { ExpenseInterval } from '../types/expense-interval';

export const VAT_MULTIPLIER = '1.25';

export const EMPTY_INPUT_AMOUNT_WITH_VAT: InputAmountWithVat = {
  amount: '0.00',
  isVat: true
};

export const EMPTY_EARNINGS_INPUT_DATA: EarningsInputData = {
  workingDays: 0,
  workingHours: 0,
  hourlyRate: EMPTY_INPUT_AMOUNT_WITH_VAT,
  businessExpenseItems: [],
  personalExpenseItems: []
};

export const DEFAULT_EARNINGS_INPUT_DATA: EarningsInputData = {
  workingDays: 230,
  workingHours: 8,
  hourlyRate: {
    amount: '250.00',
    isVat: true
  },
  businessExpenseItems: [],
  personalExpenseItems: []
};

export const EMPTY_EARNINGS_DATA: EarningsData = {
  totalEarnings: 0,
  totalEarningsWithVat: 0
};

export const EMPTY_BUSINESS_EXPENSE_ITEM: BusinessExpenseItem = {
  name: '',
  amount: EMPTY_INPUT_AMOUNT_WITH_VAT,
  interval: ExpenseInterval.Daily,
  timesPerInterval: 1
};
