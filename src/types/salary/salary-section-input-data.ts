import { SalaryCalculationParameters } from './salary-calculation-parameters';
import { AmountWithCurrency } from '../generic/amount-with-currency';

export interface SalarySectionInputData {
  readonly calculationParameters: SalaryCalculationParameters;
  readonly gross1Salary: AmountWithCurrency;
  readonly numOutgoingTransactionsPerSalary: number | undefined;
}
