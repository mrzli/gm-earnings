import { CurrencySelection } from './currency-selection';

export interface AmountWithCurrency {
  readonly amount: string;
  readonly currency: CurrencySelection;
}
