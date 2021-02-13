import { ZERO_AMOUNT } from './general-data';
import { EarningsSectionInputData } from '../types/earnings/earnings-section-input-data';
import { EarningsSectionOutputData } from '../types/earnings/earnings-section-output-data';

export const DEFAULT_EARNINGS_SECTION_INPUT_DATA: EarningsSectionInputData = {
  workingDays: 230,
  workingHours: 8,
  hourlyRate: {
    amount: '250.00',
    isVat: true
  }
};

export const EMPTY_EARNINGS_SECTION_OUTPUT_DATA: EarningsSectionOutputData = {
  isValid: false,
  totalEarnings: ZERO_AMOUNT,
  totalVat: ZERO_AMOUNT
};
