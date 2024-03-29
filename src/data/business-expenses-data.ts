import { BusinessExpenseItem } from '../types/business-expenses/business-expense-item';
import { EMPTY_INPUT_AMOUNT_WITH_VAT, ZERO_AMOUNT } from './generic-data';
import { ExpenseInterval } from '../types/generic/expense-interval';
import { BusinessExpensesSectionInputData } from '../types/business-expenses/business-expenses-section-input-data';
import { BusinessExpensesSectionOutputData } from '../types/business-expenses/business-expenses-section-output-data';
import { CurrencySelection } from '../types/generic/currency-selection';

export const DEFAULT_BUSINESS_EXPENSES_SECTION_INPUT_DATA: BusinessExpensesSectionInputData = {
  items: [
    {
      name: 'Accountant Fee',
      amount: {
        amount: {
          amount: '750.00',
          currency: CurrencySelection.HRK
        },
        isVat: true
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    },
    // {
    //   name: 'Accountant Balance Sheet Creation',
    //   amount: {
    //     amount: {
    //       amount: '500.00',
    //       currency: CurrencySelection.HRK
    //     },
    //     isVat: true
    //   },
    //   interval: ExpenseInterval.Yearly,
    //   quantity: 1
    // },
    {
      name: 'HGK Membership Fee',
      amount: {
        amount: {
          amount: '504.00',
          currency: CurrencySelection.HRK
        },
        isVat: false
      },
      interval: ExpenseInterval.Yearly,
      quantity: 1
    },
    {
      name: 'Home Rent',
      amount: {
        amount: {
          amount: '1000.00',
          currency: CurrencySelection.HRK
        },
        isVat: false
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    },
    {
      name: 'Office Rent (HUB385)',
      amount: {
        amount: {
          amount: '825.00',
          currency: CurrencySelection.HRK
        },
        isVat: true
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    },
    {
      name: 'DigitalOcean Hosting',
      amount: {
        amount: {
          amount: '14.20',
          currency: CurrencySelection.USD
        },
        isVat: false
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    },
    {
      name: 'Todoist Pro Yearly Subscription',
      amount: {
        amount: {
          amount: '36.00',
          currency: CurrencySelection.USD
        },
        isVat: false
      },
      interval: ExpenseInterval.Yearly,
      quantity: 1
    },
    {
      name: 'CISEx Membership Fee',
      amount: {
        amount: {
          amount: '500.00',
          currency: CurrencySelection.HRK
        },
        isVat: false
      },
      interval: ExpenseInterval.Yearly,
      quantity: 1
    }
  ]
};

export const EMPTY_BUSINESS_EXPENSES_SECTION_OUTPUT_DATA: BusinessExpensesSectionOutputData = {
  isValid: false,
  totalBusinessExpenses: ZERO_AMOUNT,
  totalBusinessExpensesVat: ZERO_AMOUNT,
  monthlyBusinessExpenses: ZERO_AMOUNT,
  numOutgoingTransactionsPerYear: 0
};

export const EMPTY_BUSINESS_EXPENSE_ITEM: BusinessExpenseItem = {
  name: '',
  amount: EMPTY_INPUT_AMOUNT_WITH_VAT,
  interval: ExpenseInterval.Daily,
  quantity: 1
};
