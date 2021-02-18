import { PersonalIncomeSectionInputData } from '../types/personal-income/personal-income-section-input-data';
import { PersonalIncomeSectionOutputData } from '../types/personal-income/personal-income-section-output-data';
import { ZERO_AMOUNT } from './generic-data';

export const DEFAULT_PERSONAL_INCOME_SECTION_INPUT_DATA: PersonalIncomeSectionInputData = {
  corporateTaxPercent: '10.00',
  personalCapitalIncomeTaxPercent: '10.00'
};

export const EMPTY_PERSONAL_INCOME_SECTION_OUTPUT_DATA: PersonalIncomeSectionOutputData = {
  isValid: false,
  corporateTax: ZERO_AMOUNT,
  businessAfterTaxEarnings: ZERO_AMOUNT,
  personalCapitalIncomeTax: ZERO_AMOUNT,
  personalCapitalIncomeSurtax: ZERO_AMOUNT,
  personalCapitalIncomeTaxAndSurtax: ZERO_AMOUNT,
  totalTax: ZERO_AMOUNT,
  personalCapitalIncome: ZERO_AMOUNT,
  totalPersonalIncome: ZERO_AMOUNT,
  percentIncomeOfTotalEarnings: ZERO_AMOUNT,
  monthlyPersonalIncome: ZERO_AMOUNT
};
