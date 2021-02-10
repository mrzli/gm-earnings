import Currency from 'currency.js';

// const FORMATTER = new Intl.NumberFormat('en-US', {
//   style: 'currency',
//   currency: 'HRK'
//
//   // These options are needed to round to whole numbers if that's what you want.
//   //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
//   //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
// });

export function formatAsMoney(cents: number): string {
  return centsToCurrency(cents).format();
}

export function moneyStringToCents(moneyString: string): number {
  return currencyToCents(moneyStringToCurrency(moneyString));
}

export function centsToMoneyString(cents: number): string {
  return currencyToMoneyString(centsToCurrency(cents));
}

export function isValidMoneyString(moneyString: string): boolean {
  return /^(?:0|[1-9]\d*)\.\d{2}$/.test(moneyString);
}

export function moneyStringToCurrency(moneyString: string): Currency {
  return Currency(moneyString, {
    symbol: 'kn',
    pattern: '# !',
    errorOnInvalid: true
  });
}

export function currencyToMoneyString(currency: Currency): string {
  return currency.format({ pattern: '#' });
}

export function centsToCurrency(cents: number): Currency {
  return Currency(cents, {
    symbol: 'kn',
    pattern: '# !',
    fromCents: true,
    errorOnInvalid: true
  });
}

export function currencyToCents(currency: Currency): number {
  return currency.intValue;
}
