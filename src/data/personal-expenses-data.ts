import { EMPTY_AMOUNT_WITH_CURRENCY, ZERO_AMOUNT } from './generic-data';
import { ExpenseInterval } from '../types/generic/expense-interval';
import { CurrencySelection } from '../types/generic/currency-selection';
import { PersonalExpenseItem } from '../types/personal-expenses/personal-expense-item';
import { PersonalExpensesSectionOutputData } from '../types/personal-expenses/personal-expenses-section-output-data';
import { PersonalExpensesSectionInputData } from '../types/personal-expenses/personal-expenses-section-input-data';

export const DEFAULT_PERSONAL_EXPENSES_SECTION_INPUT_DATA: PersonalExpensesSectionInputData = {
  items: [
    {
      name: 'Accountant Fee',
      amount: {
        amount: '400.00',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    }
  ]
};

export const EMPTY_PERSONAL_EXPENSES_SECTION_OUTPUT_DATA: PersonalExpensesSectionOutputData = {
  isValid: false,
  totalPersonalExpenses: ZERO_AMOUNT,
  monthlyPersonalExpenses: ZERO_AMOUNT,
  numOutgoingTransactionsPerYear: 0
};

export const EMPTY_PERSONAL_EXPENSE_ITEM: PersonalExpenseItem = {
  name: '',
  amount: EMPTY_AMOUNT_WITH_CURRENCY,
  interval: ExpenseInterval.Daily,
  quantity: 1
};
