import { AmountWithCurrency } from './amount-with-currency';

export interface InputAmountWithVat {
  readonly amount: AmountWithCurrency;
  readonly isVat: boolean;
}
