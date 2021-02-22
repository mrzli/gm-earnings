import { BankExpensesSectionOutputData } from '../types/bank-expenses/bank-expenses-section-output-data';
import { ZERO_AMOUNT } from './generic-data';
import { BankExpensesSectionInputData } from '../types/bank-expenses/bank-expenses-section-input-data';
import { CurrencySelection } from '../types/generic/currency-selection';

export const DEFAULT_BANK_EXPENSES_SECTION_INPUT_DATA: BankExpensesSectionInputData = {
  bankMonthlyFee: {
    amount: '60.00',
    currency: CurrencySelection.HRK
  },
  incomingTransactionFee: {
    amount: '1.00',
    currency: CurrencySelection.HRK
  },
  numIncomingTransactionsPerYear: 12,
  outgoingTransactionFee: {
    amount: '2.80',
    currency: CurrencySelection.HRK
  }
};

export const EMPTY_BANK_EXPENSES_SECTION_OUTPUT_DATA: BankExpensesSectionOutputData = {
  isValid: false,
  totalBankExpenses: ZERO_AMOUNT,
  monthlyBankExpenses: ZERO_AMOUNT
};
