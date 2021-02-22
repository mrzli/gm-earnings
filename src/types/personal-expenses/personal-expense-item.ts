import { ExpenseInterval } from '../generic/expense-interval';
import { AmountWithCurrency } from '../generic/amount-with-currency';

export interface PersonalExpenseItem {
  readonly name: string;
  readonly amount: AmountWithCurrency;
  readonly interval: ExpenseInterval;
  readonly quantity: number | undefined;
}
