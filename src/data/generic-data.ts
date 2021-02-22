import { InputAmountWithVat } from '../types/generic/input-amount-with-vat';
import { ExchangeRates } from '../types/generic/exchange-rates';
import { AmountWithCurrency } from '../types/generic/amount-with-currency';
import { CurrencySelection } from '../types/generic/currency-selection';

export const ZERO_AMOUNT = '0.00';
export const VAT_PERCENT = '25.00';
export const PERCENT_TO_FRACTION_MULTIPLIER = '0.01';
export const DOLLAR_TO_KUNA = '6.25';
export const EURO_TO_KUNA = '7.57';

export const MONTHS_PER_YEAR = 12;
export const WEEKS_PER_YEAR = 52;
export const DAYS_PER_YEAR = 365;

export const EMPTY_AMOUNT_WITH_CURRENCY: AmountWithCurrency = {
  amount: ZERO_AMOUNT,
  currency: CurrencySelection.HRK
};

export const EMPTY_INPUT_AMOUNT_WITH_VAT: InputAmountWithVat = {
  amount: EMPTY_AMOUNT_WITH_CURRENCY,
  isVat: true
};

export const EMPTY_EXCHANGE_RATES: ExchangeRates = {
  eurToHrk: ZERO_AMOUNT,
  usdToHrk: ZERO_AMOUNT
};
