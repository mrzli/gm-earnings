export function isValidText(value: string): boolean {
  return value.length >= 1 && value.length <= 100;
}

export function isValidMoneyString(moneyString: string): boolean {
  return /^-?(?:0|[1-9]\d*)\.\d{2}$/.test(moneyString);
}

export function isValidPercentString(percentString: string): boolean {
  return /^(?:0|[1-9]\d*)\.\d{2}$/.test(percentString);
}

export function isInNumericRange(
  value: number,
  min: number,
  max: number
): boolean {
  return value >= min && value <= max;
}
