import { mapGetOrThrow } from '../utils/generic-utils';
import { Tuple } from './generic/generic-types';

export enum ExpenseInterval {
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  Yearly = 'Yearly'
}

export const EXPENSE_INTERVAL_VALUE_DISPLAY_PAIRS: readonly Tuple<
  ExpenseInterval,
  string
>[] = [
  [ExpenseInterval.Daily, 'Daily'],
  [ExpenseInterval.Weekly, 'Weekly'],
  [ExpenseInterval.Monthly, 'Monthly'],
  [ExpenseInterval.Yearly, 'Yearly']
];

const EXPENSE_INTERVAL_TO_DISPLAY_MAP = new Map<ExpenseInterval, string>(
  EXPENSE_INTERVAL_VALUE_DISPLAY_PAIRS
);

export function toExpenseIntervalDisplay(value: ExpenseInterval): string {
  return mapGetOrThrow(EXPENSE_INTERVAL_TO_DISPLAY_MAP, value);
}
