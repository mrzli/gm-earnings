import { InputAmountWithVat } from '../types/generic/input-amount-with-vat';

export const ZERO_AMOUNT = '0.00';
export const VAT_PERCENT = '0.25';
export const DOLLAR_TO_KUNA = '6.25';
export const EURO_TO_KUNA = '7.57';

export const EMPTY_INPUT_AMOUNT_WITH_VAT: InputAmountWithVat = {
  amount: ZERO_AMOUNT,
  isVat: true
};
