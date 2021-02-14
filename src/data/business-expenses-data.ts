import { BusinessExpenseItem } from '../types/business-expenses/business-expense-item';
import {
  DOLLAR_TO_KUNA,
  EMPTY_INPUT_AMOUNT_WITH_VAT,
  ZERO_AMOUNT
} from './general-data';
import { ExpenseInterval } from '../types/generic/expense-interval';
import { BusinessExpensesSectionInputData } from '../types/business-expenses/business-expenses-section-input-data';
import { BusinessExpensesSectionOutputData } from '../types/business-expenses/business-expenses-section-output-data';
import {
  currencyToMoneyString,
  moneyStringToCurrency
} from '../utils/currency-utils';
import { BankExpensesSectionInputData } from '../types/business-expenses/bank-expenses-section-input-data';
import { BankExpensesSectionOutputData } from '../types/business-expenses/bank-expenses-section-output-data';

export const DEFAULT_BUSINESS_EXPENSES_SECTION_INPUT_DATA: BusinessExpensesSectionInputData = {
  items: [
    {
      name: 'Accountant Fee',
      amount: {
        amount: '400.00',
        isVat: true
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    },
    {
      name: 'Accountant Balance Sheet Creation',
      amount: {
        amount: '500.00',
        isVat: true
      },
      interval: ExpenseInterval.Yearly,
      quantity: 1
    },
    {
      name: 'HGK Membership Fee',
      amount: {
        amount: '504.00',
        isVat: false
      },
      interval: ExpenseInterval.Yearly,
      quantity: 1
    },
    {
      name: 'Home Rent',
      amount: {
        amount: '1000.00',
        isVat: false
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    },
    {
      name: 'Office Rent (HUB385)',
      amount: {
        amount: '825.00',
        isVat: true
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    },
    {
      name: 'DigitalOcean Hosting ($7.00)',
      amount: {
        amount: currencyToMoneyString(
          moneyStringToCurrency('7.00').multiply(DOLLAR_TO_KUNA)
        ),
        isVat: false
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    },
    {
      name: 'RBA Bank Account Fixed Fee',
      amount: {
        amount: '60.00',
        isVat: false
      },
      interval: ExpenseInterval.Monthly,
      quantity: 1
    },
    {
      name: 'CISEx Membership Fee',
      amount: {
        amount: '500.00',
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

export const DEFAULT_BANK_EXPENSES_SECTION_INPUT_DATA: BankExpensesSectionInputData = {
  bankMonthlyFee: '60.00',
  incomingTransactionFee: '1.00',
  numIncomingTransactionsPerYear: 12,
  outgoingTransactionFee: '2.80',
  numOutgoingTransactionsPerYear: 0
};

export const EMPTY_BANK_EXPENSES_SECTION_OUTPUT_DATA: BankExpensesSectionOutputData = {
  isValid: false,
  totalBankExpenses: ZERO_AMOUNT
};
