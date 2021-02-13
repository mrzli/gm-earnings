import { InputAmountWithVat } from '../generic/input-amount-with-vat';
import { ExpenseInterval } from '../generic/expense-interval';

export interface BusinessExpenseItem {
  readonly name: string;
  readonly amount: InputAmountWithVat;
  readonly interval: ExpenseInterval;
  readonly quantity: number | undefined;
}
