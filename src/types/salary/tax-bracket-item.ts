import { AmountWithCurrency } from '../generic/amount-with-currency';

export interface TaxBracketItem {
  readonly amountRange: AmountWithCurrency;
  readonly isInfinite: boolean;
  readonly taxRatePercent: string;
}
