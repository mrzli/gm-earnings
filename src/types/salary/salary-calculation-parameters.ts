import { TaxBracketItem } from './tax-bracket-item';
import { AmountWithCurrency } from '../generic/amount-with-currency';

export interface SalaryCalculationParameters {
  readonly healthInsurancePercent: string;
  readonly retirementPaymentsPillar1Percent: string;
  readonly retirementPaymentsPillar2Percent: string;
  readonly taxDeduction: AmountWithCurrency;
  readonly taxBrackets: readonly TaxBracketItem[];
}
