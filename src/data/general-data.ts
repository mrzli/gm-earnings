import { InputAmountWithVat } from '../types/generic/input-amount-with-vat';

export const ZERO_AMOUNT = '0.00';
export const VAT_PERCENT = '25.00';
export const PERCENT_TO_FRACTION_MULTIPLIER = '0.01';
export const DOLLAR_TO_KUNA = '6.25';
export const EURO_TO_KUNA = '7.57';

export const MONTHS_PER_YEAR = 12;
export const WEEKS_PER_YEAR = 52;
export const DAYS_PER_YEAR = 365;

export const EMPTY_INPUT_AMOUNT_WITH_VAT: InputAmountWithVat = {
  amount: ZERO_AMOUNT,
  isVat: true
};
