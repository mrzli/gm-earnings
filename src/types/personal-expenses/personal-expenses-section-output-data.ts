export interface PersonalExpensesSectionOutputData {
  readonly isValid: boolean;
  readonly totalPersonalExpenses: string;
  readonly monthlyPersonalExpenses: string;
  readonly numOutgoingTransactionsPerYear: number;
}
