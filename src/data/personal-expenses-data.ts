import { EMPTY_AMOUNT_WITH_CURRENCY, ZERO_AMOUNT } from './generic-data';
import { ExpenseInterval } from '../types/generic/expense-interval';
import { CurrencySelection } from '../types/generic/currency-selection';
import { PersonalExpenseItem } from '../types/personal-expenses/personal-expense-item';
import { PersonalExpensesSectionOutputData } from '../types/personal-expenses/personal-expenses-section-output-data';
import { PersonalExpensesSectionInputData } from '../types/personal-expenses/personal-expenses-section-input-data';

export const DEFAULT_PERSONAL_EXPENSES_SECTION_INPUT_DATA: PersonalExpensesSectionInputData = {
  items: [
    {
      name: 'Rent',
      amount: {
        amount: '2300.00',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    },
    {
      name: 'Utilities',
      amount: {
        amount: '700.00',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    },
    {
      name: 'Utilities (additional per year)',
      amount: {
        amount: '300.00',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Yearly,
      quantity: 1
    },
    {
      name: 'Personal Trainer',
      amount: {
        amount: '180.00',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Weekly,
      quantity: 3
    },
    {
      name: 'Gym Membership',
      amount: {
        amount: '200.00',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    },
    {
      name: "Wok 'n' Walk Orders",
      amount: {
        amount: '69.00',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Weekly,
      quantity: 3
    },
    {
      name: 'Lunch.hr Orders',
      amount: {
        amount: '39.50',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Weekly,
      quantity: 5
    },
    {
      name: 'Netflix',
      amount: {
        amount: '9.99',
        currency: CurrencySelection.EUR
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    },
    {
      name: 'Youtube Premium',
      amount: {
        amount: '71.99',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    },
    {
      name: 'Gas (estimate)',
      amount: {
        amount: '600.00',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    },
    {
      name: 'Protein Bars',
      amount: {
        amount: '7.90',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Daily,
      quantity: 1
    },
    {
      name: 'Dance Classes',
      amount: {
        amount: '800.00',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    },
    {
      name: 'Weekend Food Orders (estimate)',
      amount: {
        amount: '120.00',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Weekly,
      quantity: 1
    },
    {
      name: 'Highway Tolls (estimate)',
      amount: {
        amount: '80.00',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    },
    {
      name: 'Mobile Subscription (estimate)',
      amount: {
        amount: '100.00',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    },
    {
      name: 'Internet Subscription',
      amount: {
        amount: '179.00',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    },
    {
      name: 'JetBrains Package',
      amount: {
        amount: '186.25',
        currency: CurrencySelection.EUR
      },
      interval: ExpenseInterval.Yearly,
      quantity: 1
    },
    {
      name: 'Supplementary Health Insurance',
      amount: {
        amount: '70.00',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    },
    {
      name: 'Pan-Pek Protein Crackers',
      amount: {
        amount: '14.50',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Monthly,
      quantity: 7
    },
    {
      name: 'Therapy',
      amount: {
        amount: '150.00',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Weekly,
      quantity: 1
    },
    {
      name: 'Tuna Can',
      amount: {
        amount: '16.00',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Weekly,
      quantity: 5
    },
    {
      name: 'Protein Pudding',
      amount: {
        amount: '7.50',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Weekly,
      quantity: 2
    },
    {
      name: 'Bread',
      amount: {
        amount: '12.50',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Weekly,
      quantity: 1
    },
    {
      name: 'Cheese',
      amount: {
        amount: '32.00',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Weekly,
      quantity: 1
    },
    {
      name: 'Bananas',
      amount: {
        amount: '10.00',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Weekly,
      quantity: 3
    },
    {
      name: 'Apples',
      amount: {
        amount: '9.00',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Weekly,
      quantity: 2
    },
    {
      name: 'Pickles',
      amount: {
        amount: '14.50',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Weekly,
      quantity: 1
    },
    {
      name: 'Eggs',
      amount: {
        amount: '12.00',
        currency: CurrencySelection.HRK
      },
      interval: ExpenseInterval.Weekly,
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
