import { EarningsData, EarningsInputData } from '../types/earnings-data';

export const VAT_MULTIPLIER = '1.25';

export const DEFAULT_EARNINGS_INPUT_DATA: EarningsInputData = {
  workingDays: 0,
  workingHours: 0,
  hourlyRate: {
    amount: '0.00',
    isVat: true
  }
};

export const DEFAULT_EARNINGS_DATA: EarningsData = {
  totalEarnings: 0,
  totalEarningsWithVat: 0
};
