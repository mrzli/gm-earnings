import { InputAmountWithVat } from './input-amount-with-vat';
import { ExpenseInterval } from './expense-interval';

export interface BusinessExpenseItem {
  readonly name: string;
  readonly amount: InputAmountWithVat;
  readonly interval: ExpenseInterval;
  readonly timesPerInterval: number;
}