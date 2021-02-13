import { BusinessExpenseItem } from '../types/business-expenses/business-expense-item';
import { EMPTY_INPUT_AMOUNT_WITH_VAT, ZERO_AMOUNT } from './general-data';
import { ExpenseInterval } from '../types/generic/expense-interval';
import { BusinessExpensesSectionInputData } from '../types/business-expenses/business-expenses-section-input-data';
import { BusinessExpensesSectionOutputData } from '../types/business-expenses/business-expenses-section-output-data';

export const DEFAULT_BUSINESS_EXPENSES_SECTION_INPUT_DATA: BusinessExpensesSectionInputData = {
  items: []
};

export const EMPTY_BUSINESS_EXPENSES_SECTION_OUTPUT_DATA: BusinessExpensesSectionOutputData = {
  isValid: false,
  totalBusinessExpenses: ZERO_AMOUNT,
  totalBusinessExpensesVat: ZERO_AMOUNT,
  monthlyBusinessExpenses: ZERO_AMOUNT
};

export const EMPTY_BUSINESS_EXPENSE_ITEM: BusinessExpenseItem = {
  name: '',
  amount: EMPTY_INPUT_AMOUNT_WITH_VAT,
  interval: ExpenseInterval.Daily,
  quantity: 1
};
