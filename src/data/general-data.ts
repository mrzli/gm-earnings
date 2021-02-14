import { ZERO_AMOUNT } from './generic-data';
import { GeneralSectionInputData } from '../types/general/general-section-input-data';
import { GeneralSectionOutputData } from '../types/general/general-section-output-data';

export const DEFAULT_GENERAL_SECTION_INPUT_DATA: GeneralSectionInputData = {
  exchangeRateEurToHrk: '7.57',
  exchangeRateUsdToHrk: '6.25',
  surtaxPercent: '10.00'
};

export const EMPTY_GENERAL_SECTION_OUTPUT_DATA: GeneralSectionOutputData = {
  isValid: false,
  exchangeRateEurToHrk: ZERO_AMOUNT,
  exchangeRateUsdToHrk: ZERO_AMOUNT,
  surtaxPercent: ZERO_AMOUNT
};
