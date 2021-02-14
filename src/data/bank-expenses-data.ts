import { BankExpensesSectionOutputData } from '../types/bank-expenses/bank-expenses-section-output-data';
import { ZERO_AMOUNT } from './general-data';
import { BankExpensesSectionInputData } from '../types/bank-expenses/bank-expenses-section-input-data';

export const DEFAULT_BANK_EXPENSES_SECTION_INPUT_DATA: BankExpensesSectionInputData = {
  bankMonthlyFee: '60.00',
  incomingTransactionFee: '1.00',
  numIncomingTransactionsPerYear: 12,
  outgoingTransactionFee: '2.80'
};

export const EMPTY_BANK_EXPENSES_SECTION_OUTPUT_DATA: BankExpensesSectionOutputData = {
  isValid: false,
  totalBankExpenses: ZERO_AMOUNT,
  monthlyBankExpenses: ZERO_AMOUNT
};
