import { mapGetOrThrow } from '../utils/generic-utils';

export enum ExpenseInterval {
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  Yearly = 'Yearly'
}

const EXPANSE_INTERVAL_TO_DISPLAY_MAP = new Map<ExpenseInterval, string>([
  [ExpenseInterval.Daily, 'Daily'],
  [ExpenseInterval.Weekly, 'Weekly'],
  [ExpenseInterval.Monthly, 'Monthly'],
  [ExpenseInterval.Yearly, 'Yearly']
]);

export function toExpenseIntervalDisplay(value: ExpenseInterval): string {
  return mapGetOrThrow(EXPANSE_INTERVAL_TO_DISPLAY_MAP, value);
}
