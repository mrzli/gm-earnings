import { SalaryCalculationParameters } from './salary-calculation-parameters';

export interface SalarySectionInputData {
  readonly calculationParameters: SalaryCalculationParameters;
  readonly gross1Salary: string;
  readonly numOutgoingTransactionsPerSalary: number | undefined;
}
