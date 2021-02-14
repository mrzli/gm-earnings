import { TaxBracketItem } from '../types/salary/tax-bracket-item';
import { ZERO_AMOUNT } from './general-data';
import { SalarySectionInputData } from '../types/salary/salary-section-input-data';
import { SalarySectionOutputData } from '../types/salary/salary-section-output-data';

export const DEFAULT_SALARY_SECTION_INPUT_DATA: SalarySectionInputData = {
  calculationParameters: {
    retirementPaymentsPillar1Percent: ZERO_AMOUNT,
    retirementPaymentsPillar2Percent: ZERO_AMOUNT,
    taxDeduction: ZERO_AMOUNT,
    taxBrackets: [],
    surtaxPercent: ZERO_AMOUNT,
    healthInsurancePercent: ZERO_AMOUNT
  },
  gross1Salary: ZERO_AMOUNT
};

export const EMPTY_TAX_BRACKET_ITEM: TaxBracketItem = {
  amountRange: ZERO_AMOUNT,
  isInfinite: false,
  taxRatePercent: ZERO_AMOUNT
};

export const EMPTY_SALARY_SECTION_OUTPUT_DATA: SalarySectionOutputData = {
  isValid: false,
  retirementPayments1: ZERO_AMOUNT,
  retirementPayments2: ZERO_AMOUNT,
  taxDeduction: ZERO_AMOUNT,
  taxableIncome: ZERO_AMOUNT,
  totalTax: ZERO_AMOUNT,
  totalSurtax: ZERO_AMOUNT,
  totalTaxAndSurtax: ZERO_AMOUNT,
  healthInsurance: ZERO_AMOUNT,
  gross2Salary: ZERO_AMOUNT,
  gross1Salary: ZERO_AMOUNT,
  netSalary: ZERO_AMOUNT,
  yearlyData: {
    healthInsurance: ZERO_AMOUNT,
    retirementPayments: ZERO_AMOUNT,
    tax: ZERO_AMOUNT,
    gross2Salary: ZERO_AMOUNT,
    netSalary: ZERO_AMOUNT
  }
};
