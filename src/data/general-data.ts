import { InputAmountWithVat } from '../types/generic/input-amount-with-vat';

export const ZERO_AMOUNT = '0.00';
export const VAT_PERCENT = '0.25';

export const EMPTY_INPUT_AMOUNT_WITH_VAT: InputAmountWithVat = {
  amount: ZERO_AMOUNT,
  isVat: true
};
