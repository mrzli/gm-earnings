export interface BankExpensesSectionInputData {
  readonly bankMonthlyFee: string;
  readonly incomingTransactionFee: string;
  readonly numIncomingTransactionsPerYear: number | undefined;
  readonly outgoingTransactionFee: string;
  readonly numOutgoingTransactionsPerYear: number;
}
