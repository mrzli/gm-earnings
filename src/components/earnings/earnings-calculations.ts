import { EarningsInputData } from '../../types/earnings-input-data';
import { EarningsData } from '../../types/earnings-data';
import { EMPTY_EARNINGS_DATA, VAT_PERCENT } from '../../data/earnings-data';
import {
  currencyToMoneyString,
  moneyStringToCurrency
} from '../../utils/currency-utils';
import {
  isInNumericRange,
  isValidMoneyString
} from '../../utils/validation-utils';

export function getEarningsData(input: EarningsInputData): EarningsData {
  if (!isEarningsInputValid(input)) {
    return EMPTY_EARNINGS_DATA;
  }

  const totalEarnings = moneyStringToCurrency(input.hourlyRate.amount)
    .multiply(input.workingHours)
    .multiply(input.workingDays);
  const totalVat = input.hourlyRate.isVat
    ? totalEarnings.multiply(VAT_PERCENT)
    : totalEarnings;

  return {
    totalEarnings: currencyToMoneyString(totalEarnings),
    totalVat: currencyToMoneyString(totalVat)
  };
}

function isEarningsInputValid(earningsInput: EarningsInputData): boolean {
  return (
    isInNumericRange(earningsInput.workingDays, 0, 365) &&
    isInNumericRange(earningsInput.workingHours, 0, 24) &&
    isValidMoneyString(earningsInput.hourlyRate.amount)
  );
}
