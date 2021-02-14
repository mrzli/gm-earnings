import { mapGetOrThrow } from '../../utils/generic-utils';
import { Tuple } from './generic-types';

export enum CurrencySelection {
  HRK = 'HRK',
  EUR = 'EUR',
  USD = 'USD'
}

export const CURRENCY_SELECTION_VALUE_DISPLAY_PAIRS: readonly Tuple<
  CurrencySelection,
  string
>[] = [
  [CurrencySelection.HRK, 'HRK'],
  [CurrencySelection.EUR, 'EUR'],
  [CurrencySelection.USD, 'USD']
];

const CURRENCY_SELECTION_TO_DISPLAY_MAP = new Map<CurrencySelection, string>(
  CURRENCY_SELECTION_VALUE_DISPLAY_PAIRS
);

export function toCurrencySelectionDisplay(value: CurrencySelection): string {
  return mapGetOrThrow(CURRENCY_SELECTION_TO_DISPLAY_MAP, value);
}
