import { ExpenseInterval } from '../types/generic/expense-interval';
import {
  DAYS_PER_YEAR,
  MONTHS_PER_YEAR,
  WEEKS_PER_YEAR
} from '../data/generic-data';
import { AmountWithCurrency } from '../types/generic/amount-with-currency';
import { ExchangeRates } from '../types/generic/exchange-rates';
import Currency from 'currency.js';
import { CurrencySelection } from '../types/generic/currency-selection';
import { currencyToMoneyString, moneyStringToCurrency } from './currency-utils';

export function getYearlyMultiplierForInterval(
  interval: ExpenseInterval
): number {
  switch (interval) {
    case ExpenseInterval.Daily:
      return DAYS_PER_YEAR;
    case ExpenseInterval.Weekly:
      return WEEKS_PER_YEAR;
    case ExpenseInterval.Monthly:
      return MONTHS_PER_YEAR;
    case ExpenseInterval.Yearly:
      return 1;
    default:
      throw new Error(`Invalid interval '${interval}'`);
  }
}

export function toHrkAmount(
  amountWithCurrency: AmountWithCurrency,
  exchangeRates: ExchangeRates
): string {
  const amount = toHrkAmountInternal(amountWithCurrency, exchangeRates);
  return currencyToMoneyString(amount);
}

function toHrkAmountInternal(
  amountWithCurrency: AmountWithCurrency,
  exchangeRates: ExchangeRates
): Currency {
  const amount = moneyStringToCurrency(amountWithCurrency.amount);
  switch (amountWithCurrency.currency) {
    case CurrencySelection.HRK:
      return amount;
    case CurrencySelection.EUR:
      return amount.multiply(exchangeRates.eurToHrk);
    case CurrencySelection.USD:
      return amount.multiply(exchangeRates.usdToHrk);
    default:
      throw new Error(
        `Conversions not implemented for currency: '${amountWithCurrency.currency}'`
      );
  }
}
