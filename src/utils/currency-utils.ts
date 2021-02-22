import Currency from 'currency.js';
import { ZERO_AMOUNT } from '../data/generic-data';

// const FORMATTER = new Intl.NumberFormat('en-US', {
//   style: 'currency',
//   currency: 'HRK'
//
//   // These options are needed to round to whole numbers if that's what you want.
//   //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
//   //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
// });

interface CurrencyOptions {
  readonly symbol: string;
  readonly pattern: string;
  readonly negativePattern: string;
  readonly errorOnInvalid: boolean;
}

const DEFAULT_CURRENCY_OPTIONS: CurrencyOptions = {
  symbol: 'kn',
  pattern: '#', //'# !',
  negativePattern: '-#', //'-# !',
  errorOnInvalid: true
};

export const ZERO_MONEY = moneyStringToCurrency(ZERO_AMOUNT);

export function formatAsMoney(moneyString: string): string {
  return moneyStringToCurrency(moneyString).format();
}

// export function moneyStringToCents(moneyString: string): number {
//   return currencyToCents(moneyStringToCurrency(moneyString));
// }
//
// export function centsToMoneyString(cents: number): string {
//   return currencyToMoneyString(centsToCurrency(cents));
// }

export function moneyStringToCurrency(moneyString: string): Currency {
  return Currency(moneyString, DEFAULT_CURRENCY_OPTIONS);
}

export function currencyToMoneyString(currency: Currency): string {
  return currency.format({ pattern: '#' });
}

// export function centsToCurrency(cents: number): Currency {
//   return Currency(cents, {
//     ...DEFAULT_CURRENCY_OPTIONS,
//     fromCents: true
//   });
// }
//
// export function currencyToCents(currency: Currency): number {
//   return currency.intValue;
// }
