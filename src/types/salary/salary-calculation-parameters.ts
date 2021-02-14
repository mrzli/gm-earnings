import { TaxBracketItem } from './tax-bracket-item';

export interface SalaryCalculationParameters {
  readonly healthInsurancePercent: string;
  readonly retirementPaymentsPillar1Percent: string;
  readonly retirementPaymentsPillar2Percent: string;
  readonly taxDeduction: string;
  readonly taxBrackets: readonly TaxBracketItem[];
  readonly surtaxPercent: string;
}
