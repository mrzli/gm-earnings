import { AmountWithCurrency } from '../generic/amount-with-currency';

export interface BankExpensesSectionInputData {
  readonly bankMonthlyFee: AmountWithCurrency;
  readonly incomingTransactionFee: AmountWithCurrency;
  readonly numIncomingTransactionsPerYear: number | undefined;
  readonly outgoingTransactionFee: AmountWithCurrency;
}
