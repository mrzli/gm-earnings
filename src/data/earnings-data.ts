import { ZERO_AMOUNT } from './generic-data';
import { EarningsSectionInputData } from '../types/earnings/earnings-section-input-data';
import { EarningsSectionOutputData } from '../types/earnings/earnings-section-output-data';
import { CurrencySelection } from '../types/generic/currency-selection';

export const DEFAULT_EARNINGS_SECTION_INPUT_DATA: EarningsSectionInputData = {
  workingDays: 230,
  workingHours: 8,
  hourlyRate: {
    amount: {
      amount: ZERO_AMOUNT,
      currency: CurrencySelection.HRK
    },
    isVat: true
  }
};

export const EMPTY_EARNINGS_SECTION_OUTPUT_DATA: EarningsSectionOutputData = {
  isValid: false,
  totalEarnings: ZERO_AMOUNT,
  totalVat: ZERO_AMOUNT
};
