import { InputAmountWithVat } from './input-amount-with-vat';
import { BusinessExpenseItem } from './business-expense-item';
import { PersonalExpenseItem } from './personal-expense-item';

export interface EarningsInputData {
  readonly workingDays: number;
  readonly workingHours: number;
  readonly hourlyRate: InputAmountWithVat;
  readonly businessExpenseItems: readonly BusinessExpenseItem[];
  readonly personalExpenseItems: readonly PersonalExpenseItem[];
}
