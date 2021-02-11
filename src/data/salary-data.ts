import { TaxBracketItem } from '../types/salary/tax-bracket-item';
import { ZERO_AMOUNT } from './general-data';
import { SalaryDeductionData } from '../types/salary/salary-deduction-data';
import { SalaryBreakdownYearlyData } from '../types/salary/salary-breakdown-yearly-data';

export const EMPTY_TAX_BRACKET_ITEM: TaxBracketItem = {
  amountRange: ZERO_AMOUNT,
  isInfinite: false,
  taxRatePercent: ZERO_AMOUNT
};

export const EMPTY_SALARY_DEDUCTION_DATA: SalaryDeductionData = {
  retirementPaymentsPillar1Percent: ZERO_AMOUNT,
  retirementPaymentsPillar2Percent: ZERO_AMOUNT,
  taxDeduction: ZERO_AMOUNT,
  taxBrackets: [],
  surtaxPercent: ZERO_AMOUNT,
  healthInsurancePercent: ZERO_AMOUNT
};

export const EMPTY_SALARY_BREAKDOWN_YEARLY_DATA: SalaryBreakdownYearlyData = {
  healthInsurance: ZERO_AMOUNT,
  retirementPayments: ZERO_AMOUNT,
  tax: ZERO_AMOUNT,
  gross2Salary: ZERO_AMOUNT,
  netSalary: ZERO_AMOUNT
};
